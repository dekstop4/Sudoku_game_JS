import { createButton, createCard } from '@sudoku/ui'
import { generatePuzzle, isValidEntry, type Difficulty, type Grid } from '../game/sudoku.js'

const difficultyNames: Record<Difficulty, string> = {
  easy: 'Лёгкая',
  medium: 'Средняя',
  hard: 'Сложная'
}

function isDifficulty(value: string | undefined): value is Difficulty {
  return value === 'easy' || value === 'medium' || value === 'hard'
}

function createGameBoard(
  puzzle: Grid,
  solution: Grid,
  onComplete: (solved: boolean) => void
): HTMLElement {
  const board = document.createElement('div')
  board.className = 'sudoku-board'
  board.setAttribute('role', 'grid')
  board.setAttribute('aria-label', 'Игровое поле судоку 9 на 9')
  const inputs: HTMLInputElement[] = []
  const current = puzzle.map((row) => [...row])

  for (let row = 0; row < 9; row += 1) {
    for (let column = 0; column < 9; column += 1) {
      const input = document.createElement('input')
      input.className = 'sudoku-cell'
      input.type = 'text'
      input.inputMode = 'numeric'
      input.maxLength = 1
      input.autocomplete = 'off'
      input.setAttribute('role', 'gridcell')
      input.setAttribute('aria-label', `Строка ${row + 1}, столбец ${column + 1}`)
      input.dataset.row = String(row)
      input.dataset.column = String(column)
      const initialValue = puzzle[row][column]
      input.value = initialValue === null ? '' : String(initialValue)
      input.readOnly = initialValue !== null
      if (column === 2 || column === 5) input.classList.add('box-right')
      if (row === 2 || row === 5) input.classList.add('box-bottom')

      input.addEventListener('input', () => {
        const digit = input.value.replace(/[^1-9]/g, '').slice(-1)
        input.value = digit
        const value = digit === '' ? null : Number(digit)
        current[row][column] = value
        input.classList.toggle(
          'is-invalid',
          value !== null && !isValidEntry(current, row, column, value)
        )
        onComplete(current.every((cells, rowIndex) =>
          cells.every((cell, columnIndex) => cell === solution[rowIndex][columnIndex])
        ))
      })

      input.addEventListener('keydown', (event: KeyboardEvent) => {
        const offsets: Record<string, [number, number]> = {
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0],
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1]
        }
        const offset = offsets[event.key]
        if (offset) {
          event.preventDefault()
          const nextRow = Math.max(0, Math.min(8, row + offset[0]))
          const nextColumn = Math.max(0, Math.min(8, column + offset[1]))
          inputs[nextRow * 9 + nextColumn].focus()
        }
      })

      inputs.push(input)
      board.append(input)
    }
  }

  return board
}

export function renderGamePage(pathDifficulty: string | undefined): HTMLElement {
  const difficulty = isDifficulty(pathDifficulty) ? pathDifficulty : 'easy'
  const page = document.createElement('main')
  page.className = 'page game-page'
  const card = createCard({
    title: 'Ваша головоломка',
    description: 'Заполните пустые клетки цифрами от 1 до 9. В каждой строке, колонке и блоке цифры не повторяются.'
  })
  card.classList.add('game-card')

  const toolbar = document.createElement('div')
  toolbar.className = 'game-toolbar'
  const difficultyLabel = document.createElement('label')
  difficultyLabel.className = 'difficulty-label'
  difficultyLabel.htmlFor = 'difficulty'
  difficultyLabel.textContent = 'Сложность'
  const select = document.createElement('select')
  select.id = 'difficulty'
  select.className = 'difficulty-select'
  for (const level of ['easy', 'medium', 'hard'] as const) {
    const option = document.createElement('option')
    option.value = level
    option.textContent = difficultyNames[level]
    option.selected = level === difficulty
    select.append(option)
  }
  select.addEventListener('change', () => {
    window.location.href = `/game/${select.value}`
  })
  toolbar.append(difficultyLabel, select)

  const result = document.createElement('p')
  result.className = 'game-result'
  result.setAttribute('aria-live', 'polite')
  result.textContent = `Уровень: ${difficultyNames[difficulty]}`
  const { puzzle, solution } = generatePuzzle(difficulty)
  const board = createGameBoard(puzzle, solution, (solved) => {
    if (solved) result.textContent = 'Отлично! Судоку решено.'
  })

  const actions = document.createElement('div')
  actions.className = 'game-actions'
  actions.append(
    createButton({
      label: 'Новая игра',
      variant: 'secondary',
      onClick: () => window.location.reload()
    }),
    createButton({
      label: 'Проверить решение',
      onClick: () => {
        const entries = Array.from(board.querySelectorAll('input'))
        const complete = entries.every((input) => input.value !== '')
        const solved = entries.every((input) => {
          const row = Number(input.dataset.row)
          const column = Number(input.dataset.column)
          return input.value === String(solution[row][column])
        })
        result.textContent = solved
          ? 'Верно! Головоломка решена.'
          : complete
            ? 'Есть ошибки. Проверьте отмеченные клетки.'
            : 'Заполните все пустые клетки, чтобы проверить решение.'
      }
    })
  )

  const keyboardHelp = document.createElement('p')
  keyboardHelp.className = 'keyboard-help'
  keyboardHelp.textContent = 'Клавиатура: цифры 1–9 для ввода, стрелки для перехода между клетками.'
  card.append(toolbar, board, actions, result, keyboardHelp)
  page.append(card)
  return page
}
