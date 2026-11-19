export type ButtonVariant = 'primary' | 'secondary' | 'quiet'

export interface ButtonOptions {
  label: string
  variant?: ButtonVariant
  disabled?: boolean
  onClick?: () => void
}

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = `button button--${options.variant ?? 'primary'}`
  button.textContent = options.label
  button.disabled = options.disabled ?? false

  if (options.onClick) {
    button.addEventListener('click', options.onClick)
  }

  return button
}
