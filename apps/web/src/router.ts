import { Header } from './components/header'
import { AboutPage } from './pages/about'
import { GamePage } from './pages/game'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'
import { RulesPage } from './pages/rules'

export function mountRouter(root: HTMLElement): void {
  const render = (): void => {
    const path = window.location.pathname
    let page: string

    if (path === '/') {
      page = HomePage()
    } else if (path === '/rules') {
      page = RulesPage()
    } else if (path === '/about') {
      page = AboutPage()
    } else if (path === '/game' || path.startsWith('/game/')) {
      const difficulty = path.split('/')[2] || 'easy'
      page = GamePage(difficulty)
    } else {
      page = NotFoundPage()
    }

    root.innerHTML = `${Header()}<main>${page}</main>`
  }

  window.addEventListener('popstate', render)
  render()
}
