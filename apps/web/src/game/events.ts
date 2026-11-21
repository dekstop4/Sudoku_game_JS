import { GRID_SIZE } from './model'

import type { CellValue } from './model'

export type CellInputHandler = (row: number, column: number, value: CellValue) => void

export function delegateCellInput(root: HTMLElement, onInput: CellInputHandler): void {
  root.addEventListener('input', (event: Event) => {
    const target = event.target
    const InputElement = root.ownerDocument.defaultView?.HTMLInputElement
    if (!InputElement || !(target instanceof InputElement) || !root.contains(target)) {
      return
    }

    const row = Number(target.dataset.row)
    const column = Number(target.dataset.column)
    if (
      !Number.isInteger(row) ||
      !Number.isInteger(column) ||
      row < 0 ||
      row >= GRID_SIZE ||
      column < 0 ||
      column >= GRID_SIZE
    ) {
      return
    }

    const input = target.value.trim()
    if (input !== '' && !/^[1-9]$/.test(input)) {
      target.value = ''

      return
    }

    onInput(row, column, input === '' ? null : Number(input))
  })
}

export function delegateGameSubmit(root: HTMLElement, onSubmit: () => void): void {
  root.addEventListener('submit', (event: Event) => {
    const target = event.target
    const FormElement = root.ownerDocument.defaultView?.HTMLFormElement
    if (!FormElement || !(target instanceof FormElement) || !target.matches('[data-game-form]')) {
      return
    }

    event.preventDefault()
    onSubmit()
  })
}
