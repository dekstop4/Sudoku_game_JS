import { Card } from '@sudoku/ui'

export function HomePage(): string {
  return `
    <section class="page">
      <h1>Игра Судоку</h1>
      ${Card({
    title: 'Начать игру',
    text: 'Выберите сложность и перейдите к игровому полю.'
  })}
      <div class="actions">
        <a class="button" href="/game/easy">Лёгкая игра</a>
        <a class="button" href="/game/medium">Средняя игра</a>
        <a class="button" href="/game/hard">Сложная игра</a>
      </div>
    </section>
  `
}
