import { describe, expect, it } from 'vitest'
import {
  createSolvedGrid,
  generatePuzzle,
  getSolutionCount,
  isValidEntry
} from '../src/game/sudoku.js'

describe('Sudoku generation and validation', () => {
  it('creates a complete valid grid', () => {
    const grid = createSolvedGrid(() => 0.4)

    expect(grid).toHaveLength(9)
    expect(grid.every((row) => row.length === 9 && row.every((cell) => cell !== null))).toBe(true)
    expect(getSolutionCount(grid)).toBe(1)
  })

  it('generates a puzzle with one solution and preserves its answer', () => {
    const { puzzle, solution } = generatePuzzle('easy')

    expect(getSolutionCount(puzzle)).toBe(1)
    expect(puzzle.flat().some((cell) => cell === null)).toBe(true)
    expect(solution.flat().every((cell) => cell !== null)).toBe(true)
  })

  it('detects duplicates in rows, columns, and boxes', () => {
    const grid = [
      [1, null, null, null, null, null, null, null, null],
      [null, 1, null, null, null, null, null, null, null],
      ...Array.from({ length: 7 }, () => Array<number | null>(9).fill(null))
    ]

    expect(isValidEntry(grid, 0, 1, 1)).toBe(false)
    expect(isValidEntry(grid, 1, 0, 1)).toBe(false)
    expect(isValidEntry(grid, 1, 1, 1)).toBe(false)
    expect(isValidEntry(grid, 1, 1, 2)).toBe(true)
  })
})
