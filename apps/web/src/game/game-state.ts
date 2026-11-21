import { validateGrid } from './validator'

import type { CellValue, Difficulty, GameState, Grid } from './model'

function matchesSolution(current: Grid, solution: Grid): boolean {
  return current.every((row, rowIndex) =>
    row.every((cell, columnIndex) => cell.value === solution[rowIndex]?.[columnIndex]?.value)
  )
}

export function createGameState(
  difficulty: Difficulty,
  puzzle: Grid,
  solution: Grid
): GameState {
  const copyGrid = (grid: Grid): Grid => grid.map((row) => row.map((cell) => ({ ...cell })))

  return {
    difficulty,
    puzzle: copyGrid(puzzle),
    solution: copyGrid(solution),
    current: copyGrid(puzzle),
    status: 'in-progress'
  }
}

export function updateCell(
  state: GameState,
  row: number,
  column: number,
  value: CellValue
): GameState {
  if (!Number.isInteger(row) || !Number.isInteger(column) || row < 0 || column < 0) {
    return state
  }

  const cell = state.current[row]?.[column]
  if (!cell || cell.isGiven) {
    return state
  }

  if (value !== null && (!Number.isInteger(value) || value < 1 || value > 9)) {
    return state
  }

  const current = state.current.map((cells) => cells.map((item) => ({ ...item })))
  const targetCell = current[row]?.[column]

  if (!targetCell) {
    return state
  }

  targetCell.value = value
  const validation = validateGrid(current)
  const isSolved = validation.isSolved && matchesSolution(current, state.solution)

  return {
    ...state,
    current,
    status: isSolved
      ? 'won'
      : validation.isValid
        ? 'in-progress'
        : 'invalid'
  }
}

export function submitGame(state: GameState): GameState {
  const validation = validateGrid(state.current)
  const isSolved = validation.isSolved && matchesSolution(state.current, state.solution)

  return {
    ...state,
    status: isSolved ? 'won' : 'invalid'
  }
}
