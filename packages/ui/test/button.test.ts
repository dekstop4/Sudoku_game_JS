import { describe, expect, it, vi } from 'vitest'
import { createButton } from '../src/button.js'
import { createCard } from '../src/card.js'

describe('createButton', () => {
  it('creates a primary button and calls its handler', () => {
    const onClick = vi.fn()
    const button = createButton({ label: 'New game', onClick })

    button.click()

    expect(button.type).toBe('button')
    expect(button.textContent).toBe('New game')
    expect(button.className).toBe('button button--primary')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('supports variants and disabled state', () => {
    const button = createButton({
      label: 'Check',
      variant: 'secondary',
      disabled: true
    })

    expect(button.className).toBe('button button--secondary')
    expect(button.disabled).toBe(true)
  })

  it('creates a button without an optional click handler', () => {
    const button = createButton({ label: 'Continue', variant: 'quiet' })

    expect(button.className).toBe('button button--quiet')
    expect(button.disabled).toBe(false)
  })
})

describe('createCard', () => {
  it('renders a heading and optional description', () => {
    const card = createCard({ title: 'Rules', description: 'Fill the grid.' })

    expect(card.className).toBe('card')
    expect(card.querySelector('h2')?.textContent).toBe('Rules')
    expect(card.querySelector('p')?.textContent).toBe('Fill the grid.')
  })

  it('omits an empty description', () => {
    const card = createCard({ title: 'About' })

    expect(card.querySelector('p')).toBeNull()
  })
})
