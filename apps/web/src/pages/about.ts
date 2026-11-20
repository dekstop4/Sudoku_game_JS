import { createCard } from '@sudoku/ui'

export function renderAboutPage(): HTMLElement {
  const page = document.createElement('main')
  page.className = 'page'
  page.append(createCard({
    title: 'О проекте',
    description: 'Учебный проект: браузерная настольная игра «Судоку» с клиентской генерацией головоломок, проверкой единственности решения и обратной связью.'
  }))
  return page
}
