import { createCard } from '@sudoku/ui'

export function renderHomePage(): HTMLElement {
  const page = document.createElement('main')
  page.className = 'page home-page'
  const intro = createCard({
    title: 'Судоку — логика в каждой клетке',
    description: 'Тренируйте внимание и решайте новые головоломки без регистрации и рекламы.'
  })
  intro.classList.add('hero-card')

  const features = document.createElement('ul')
  features.className = 'feature-list'
  for (const feature of [
    'Уникальное решение для каждой головоломки',
    'Три уровня сложности',
    'Удобное управление мышью и клавиатурой'
  ]) {
    const item = document.createElement('li')
    item.textContent = feature
    features.append(item)
  }

  const start = document.createElement('a')
  start.href = '/game/easy'
  start.className = 'button button--primary start-link'
  start.textContent = 'Начать игру'
  intro.append(features, start)
  page.append(intro)
  return page
}
