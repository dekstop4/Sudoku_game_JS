export function GamePage(difficulty: string): string {
  const labels: Record<string, string> = {
    easy: 'Лёгкий',
    medium: 'Средний',
    hard: 'Сложный'
  }
  const label = labels[difficulty] || 'Лёгкий'

  return `
    <section class="page">
      <h1>Игровое поле</h1>
      <p>Уровень сложности: ${label}</p>
      <div class="sudoku-placeholder" aria-label="Заглушка игрового поля">
        Игровая логика будет добавлена позже
      </div>
    </section>
  `
}
