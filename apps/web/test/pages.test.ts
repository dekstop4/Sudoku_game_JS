import { describe, expect, it } from 'vitest'

import { createGameState } from '../src/game/game-state'
import { generatePuzzle } from '../src/game/generator'
import { GamePage } from '../src/pages/game'
import { NotFoundPage } from '../src/pages/not-found'

describe('pages', () => {
  it('shows selected difficulty', () => {
    const { puzzle, solution } = generatePuzzle('hard')
    const state = createGameState('hard', puzzle, solution)

    expect(GamePage(state)).toContain('Сложный')
    expect(GamePage(state)).toContain('data-game-form')
    expect(GamePage(state)).toContain('Проверить решение')
  })

  it('renders not found state', () => {
    expect(NotFoundPage()).toContain('404')
  })
})
