import { describe, expect, it } from 'vitest'
import { GamePage } from '../src/pages/game'
import { NotFoundPage } from '../src/pages/not-found'

describe('pages', () => {
  it('shows selected difficulty', () => {
    expect(GamePage('hard')).toContain('Сложный')
  })

  it('renders not found state', () => {
    expect(NotFoundPage()).toContain('404')
  })
})
