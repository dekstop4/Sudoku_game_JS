import { createCard } from '@sudoku/ui'

export function renderRulesPage(): HTMLElement {
  const page = document.createElement('main')
  page.className = 'page'
  const card = createCard({
    title: 'Правила судоку',
    description: 'Заполните сетку 9×9 цифрами от 1 до 9. Каждая цифра должна встречаться ровно один раз в каждой строке, каждом столбце и каждом квадрате 3×3.'
  })
  const tips = document.createElement('p')
  tips.textContent = 'Выберите клетку мышью и введите цифру на клавиатуре. Стрелки перемещают фокус по сетке.'
  card.append(tips)
  page.append(card)
  return page
}
