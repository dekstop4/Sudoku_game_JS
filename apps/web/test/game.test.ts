import { JSDOM } from 'jsdom'
import { describe, expect, it, vi } from 'vitest'

import { delegateCellInput } from '../src/game/events'
import { createGameState, submitGame, updateCell } from '../src/game/game-state'
import { generatePuzzle } from '../src/game/generator'
import { escapeHtml } from '../src/game/html'
import { validateGrid } from '../src/game/validator'

describe('Sudoku game core', () => {
  it('generates a puzzle with the requested number of empty cells', () => {
    const { puzzle, solution } = generatePuzzle('medium')
    const emptyCells = puzzle.flat().filter((cell) => cell.value === null)

    expect(puzzle).toHaveLength(9)
    expect(solution.flat().every((cell) => cell.value !== null)).toBe(true)
    expect(emptyCells).toHaveLength(40)
    expect(validateGrid(solution).isSolved).toBe(true)
  })

  it('reports a duplicate in a complete grid', () => {
    const { solution } = generatePuzzle('easy')
    const duplicateGrid = solution.map((row) => row.map((cell) => ({ ...cell })))
    const firstRow = duplicateGrid[0]
    const firstCell = firstRow?.[0]
    const secondCell = firstRow?.[1]

    if (!firstCell || !secondCell) {
      throw new Error('Generated puzzle is missing expected cells')
    }

    secondCell.value = firstCell.value

    const result = validateGrid(duplicateGrid)

    expect(result.isComplete).toBe(true)
    expect(result.isValid).toBe(false)
    expect(result.invalidCells.length).toBeGreaterThan(0)
  })

  it('does not allow changing a given clue', () => {
    const { puzzle, solution } = generatePuzzle('easy')
    const state = createGameState('easy', puzzle, solution)
    const givenCell = puzzle.flat().find((cell) => cell.isGiven)

    if (!givenCell) {
      throw new Error('Generated puzzle has no given cells')
    }

    const unchanged = updateCell(state, givenCell.row, givenCell.column, null)

    expect(unchanged).toBe(state)
  })

  it('accepts a complete generated solution as a win', () => {
    const { puzzle, solution } = generatePuzzle('easy')
    const newState = createGameState('easy', puzzle, solution)
    expect(submitGame(newState).status).toBe('invalid')

    let state = newState

    puzzle.flat().forEach((cell) => {
      if (!cell.isGiven) {
        const answer = solution[cell.row]?.[cell.column]?.value
        if (answer !== undefined && answer !== null) {
          state = updateCell(state, cell.row, cell.column, answer)
        }
      }
    })

    expect(state.status).toBe('won')
    expect(submitGame(state).status).toBe('won')
  })

  it('delegates validated cell input from the game container', () => {
    const dom = new JSDOM('<div id="game"><input data-row="2" data-column="4"></div>')
    const root = dom.window.document.querySelector<HTMLElement>('#game')
    const input = dom.window.document.querySelector<HTMLInputElement>('input')
    const onInput = vi.fn()

    if (!root || !input) {
      throw new Error('Test game input was not created')
    }

    delegateCellInput(root, onInput)
    input.value = '7'
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }))

    expect(onInput).toHaveBeenCalledWith(2, 4, 7)
  })

  it('escapes user-provided HTML before rendering', () => {
    expect(escapeHtml(`<script title="x">&'`)).toBe('&lt;script title=&quot;x&quot;&gt;&amp;&#39;')
  })
})
