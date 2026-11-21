import { GRID_SIZE } from './model'

import type { Cell, Grid } from './model'

export interface CellPosition {
  row: number
  column: number
}

export interface ValidationResult {
  isComplete: boolean
  isValid: boolean
  isSolved: boolean
  invalidCells: CellPosition[]
}

export function validateGrid(grid: Grid): ValidationResult {
  const invalidIndexes = new Set<number>()
  const markDuplicates = (cells: Cell[]): void => {
    const seen = new Map<number, number>()

    cells.forEach((cell) => {
      if (cell.value === null) {
        return
      }

      const priorIndex = seen.get(cell.value)
      const index = cell.row * GRID_SIZE + cell.column

      if (priorIndex !== undefined) {
        invalidIndexes.add(priorIndex)
        invalidIndexes.add(index)
      } else {
        seen.set(cell.value, index)
      }
    })
  }

  grid.forEach((row) => markDuplicates(row))
  Array.from({ length: GRID_SIZE }, (_, column) => {
    const cells = grid
      .map((row) => row[column])
      .filter((cell): cell is Cell => cell !== undefined)

    markDuplicates(cells)
  })

  for (let blockRow = 0; blockRow < GRID_SIZE; blockRow += 3) {
    for (let blockColumn = 0; blockColumn < GRID_SIZE; blockColumn += 3) {
      const block = grid
        .slice(blockRow, blockRow + 3)
        .flatMap((row) => row.slice(blockColumn, blockColumn + 3))
      markDuplicates(block)
    }
  }

  grid.flat().forEach((cell) => {
    if (cell.value !== null && (!Number.isInteger(cell.value) || cell.value < 1 || cell.value > GRID_SIZE)) {
      invalidIndexes.add(cell.row * GRID_SIZE + cell.column)
    }
  })

  const invalidCells = [...invalidIndexes].map((index) => ({
    row: Math.floor(index / GRID_SIZE),
    column: index % GRID_SIZE
  }))
  const isComplete = grid.every((row) => row.every((cell) => cell.value !== null))
  const isValid = invalidCells.length === 0

  return {
    isComplete,
    isValid,
    isSolved: isComplete && isValid,
    invalidCells
  }
}
