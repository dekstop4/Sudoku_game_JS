import { createCard } from '@sudoku/ui'

export function renderNotFoundPage(): HTMLElement {
  const page = document.createElement('main')
  page.className = 'page'
  const card = createCard({
    title: 'Страница не найдена',
    description: 'Такого раздела нет. Вернитесь на главную страницу или начните новую игру.'
  })
  const link = document.createElement('a')
  link.href = '/'
  link.className = 'text-link'
  link.textContent = 'На главную'
  card.append(link)
  page.append(card)
  return page
}
