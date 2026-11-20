import './styles.css'
import { createHeader } from './components/header.js'
import { renderAboutPage } from './pages/about.js'
import { renderGamePage } from './pages/game.js'
import { renderHomePage } from './pages/home.js'
import { renderNotFoundPage } from './pages/not-found.js'
import { renderRulesPage } from './pages/rules.js'

const root = document.querySelector<HTMLDivElement>('#app')

if (root === null) {
  throw new Error('Не найден корневой элемент #app')
}

const appRoot: HTMLDivElement = root

function renderRoute(): void {
  const path = window.location.pathname
  const gameMatch = path.match(/^\/game\/([^/]+)\/?$/)
  let page: HTMLElement

  if (path === '/' || path === '') {
    page = renderHomePage()
  } else if (gameMatch) {
    page = renderGamePage(gameMatch[1])
  } else if (path === '/rules') {
    page = renderRulesPage()
  } else if (path === '/about') {
    page = renderAboutPage()
  } else {
    page = renderNotFoundPage()
  }

  appRoot.replaceChildren(createHeader(), page)
}

window.addEventListener('popstate', renderRoute)
renderRoute()
