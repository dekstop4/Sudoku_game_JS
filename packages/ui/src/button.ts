export interface ButtonProps {
  label: string
  href: string
}

export function Button(props: ButtonProps): string {
  return `<a class="button" href="${props.href}">${props.label}</a>`
}
