import { Header } from './components/header'
import { delegateCellInput, delegateGameSubmit } from './game/events'
import { createGameState, submitGame, updateCell } from './game/game-state'
import { generatePuzzle } from './game/generator'
import { AboutPage } from './pages/about'
import { GamePage } from './pages/game'
import { HomePage } from './pages/home'
import { NotFoundPage } from './pages/not-found'
import { RulesPage } from './pages/rules'

import type { Difficulty, GameState } from './game/model'

function isDifficulty(value: string | undefined): value is Difficulty {
  return value === 'easy' || value === 'medium' || value === 'hard'
}

export function mountRouter(root: HTMLElement): void {
  let gameState: GameState | undefined

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
      const requestedDifficulty = path.split('/')[2]
      const difficulty = isDifficulty(requestedDifficulty) ? requestedDifficulty : 'easy'

      if (!gameState || gameState.difficulty !== difficulty) {
        const generated = generatePuzzle(difficulty)
        gameState = createGameState(difficulty, generated.puzzle, generated.solution)
      }

      page = GamePage(gameState)
    } else {
      page = NotFoundPage()
    }

    root.innerHTML = `${Header()}<main>${page}</main>`
  }

  delegateCellInput(root, (row, column, value) => {
    if (gameState) {
      gameState = updateCell(gameState, row, column, value)
      render()
    }
  })
  delegateGameSubmit(root, () => {
    if (gameState) {
      gameState = submitGame(gameState)
      render()
    }
  })
  window.addEventListener('popstate', render)
  render()
}
