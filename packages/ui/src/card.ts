export interface CardProps {
  title: string
  text: string
}

export function Card(props: CardProps): string {
  return `
    <article class="card">
      <h2>${props.title}</h2>
      <p>${props.text}</p>
    </article>
  `
}
