import { describe, expect, it } from 'vitest'

import { Card } from '../src/card'

describe('Card', () => {
  it('renders title and text', () => {
    const html = Card({
      title: 'Заголовок',
      text: 'Описание'
    })

    expect(html).toContain('Заголовок')
    expect(html).toContain('Описание')
  })
})
