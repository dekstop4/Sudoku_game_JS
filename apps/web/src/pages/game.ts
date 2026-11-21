import { escapeHtml } from '../game/html'
import { validateGrid } from '../game/validator'

import type { GameState } from '../game/model'

const DIFFICULTY_LABELS: Record<GameState['difficulty'], string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный'
}

const STATUS_LABELS: Record<GameState['status'], string> = {
  'in-progress': 'Заполните пустые клетки и проверьте решение.',
  invalid: 'Решение неверно или поле заполнено не полностью. Попробуйте ещё раз.',
  won: 'Поздравляем, головоломка решена!'
}

export function GamePage(state: GameState): string {
  const validation = validateGrid(state.current)
  const invalidIndexes = new Set(
    validation.invalidCells.map(({ row, column }) => row * 9 + column)
  )

  if (state.status === 'invalid') {
    state.current.flat().forEach((cell) => {
      const answer = state.solution[cell.row]?.[cell.column]?.value
      if (cell.value !== null && cell.value !== answer) {
        invalidIndexes.add(cell.row * 9 + cell.column)
      }
    })
  }

  const cells = state.current
    .flat()
    .map((cell, index) => {
      const value = cell.value === null ? '' : escapeHtml(String(cell.value))
      const readonly = cell.isGiven ? 'readonly' : ''
      const invalid = invalidIndexes.has(index)
      const accessibleName = `${cell.isGiven ? 'Исходная подсказка, ' : ''}строка ${cell.row + 1}, столбец ${cell.column + 1}`

      return `
        <input
          class="sudoku-cell${cell.isGiven ? ' sudoku-cell-given' : ''}${invalid ? ' sudoku-cell-error' : ''}"
          type="text"
          inputmode="numeric"
          maxlength="1"
          data-row="${cell.row}"
          data-column="${cell.column}"
          aria-label="${accessibleName}"
          ${invalid ? 'aria-invalid="true"' : ''}
          value="${value}"
          ${readonly}
        />
      `
    })
    .join('')
  const status = escapeHtml(STATUS_LABELS[state.status])
  const difficulty = escapeHtml(DIFFICULTY_LABELS[state.difficulty])

  return `
    <section class="page">
      <h1>Игровое поле</h1>
      <p>Уровень сложности: ${difficulty}</p>
      <form data-game-form>
        <div class="sudoku-grid" aria-label="Игровое поле Судоку">
          ${cells}
        </div>
        <button class="button" type="submit">Проверить решение</button>
        <p data-game-status aria-live="polite">${status}</p>
      </form>
    </section>
  `
}
