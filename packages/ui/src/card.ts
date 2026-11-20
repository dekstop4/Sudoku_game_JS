export interface CardOptions {
  title: string
  description?: string
}

export function createCard(options: CardOptions): HTMLElement {
  const card = document.createElement('section')
  card.className = 'card'
  const heading = document.createElement('h2')
  heading.textContent = options.title
  card.append(heading)

  if (options.description) {
    const description = document.createElement('p')
    description.textContent = options.description
    card.append(description)
  }

  return card
}
