import { GRID_SIZE } from './model'

import type { Cell, CellValue, Difficulty, Grid } from './model'

export interface GeneratedPuzzle {
  puzzle: Grid
  solution: Grid
}

const EMPTY_CELLS: Record<Difficulty, number> = {
  easy: 30,
  medium: 40,
  hard: 50
}

function shuffled<T>(items: T[]): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = result[index]
    const swapItem = result[swapIndex]

    if (currentItem !== undefined && swapItem !== undefined) {
      result[index] = swapItem
      result[swapIndex] = currentItem
    }
  }

  return result
}

function createCell(row: number, column: number, value: CellValue, isGiven: boolean): Cell {
  return { row, column, value, isGiven }
}

export function generatePuzzle(difficulty: Difficulty): GeneratedPuzzle {
  const digits = shuffled(Array.from({ length: GRID_SIZE }, (_, index) => index + 1))
  const solution = Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, column) => {
      const digitIndex = (row * 3 + Math.floor(row / 3) + column) % GRID_SIZE
      const digit = digits[digitIndex]

      if (digit === undefined) {
        throw new Error('Failed to generate a Sudoku solution')
      }

      return digit
    })
  )

  const blankIndexes = new Set(
    shuffled(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => index))
      .slice(0, EMPTY_CELLS[difficulty])
  )

  const puzzle = solution.map((values, row) =>
    values.map((value, column) => {
      const index = row * GRID_SIZE + column
      const isGiven = !blankIndexes.has(index)

      return createCell(row, column, isGiven ? value : null, isGiven)
    })
  )
  const solvedGrid = solution.map((values, row) =>
    values.map((value, column) => {
      return createCell(row, column, value, true)
    })
  )

  return { puzzle, solution: solvedGrid }
}
