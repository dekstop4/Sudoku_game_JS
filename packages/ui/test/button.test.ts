import { describe, expect, it } from 'vitest'

import { Button } from '../src/button'

describe('Button', () => {
  it('renders label and link', () => {
    const html = Button({
      label: 'Играть',
      href: '/game'
    })

    expect(html).toContain('Играть')
    expect(html).toContain('href="/game"')
  })
})
