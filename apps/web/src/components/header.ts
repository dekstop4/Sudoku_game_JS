export function Header(): string {
  return `
    <header class="header">
      <a class="brand" href="/">Судоку</a>
      <nav aria-label="Основная навигация">
        <a href="/">Главная</a>
        <a href="/game">Игра</a>
        <a href="/rules">Правила</a>
        <a href="/about">О проекте</a>
      </nav>
    </header>
  `
}
