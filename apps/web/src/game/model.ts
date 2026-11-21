export const GRID_SIZE = 9

export type Difficulty = 'easy' | 'medium' | 'hard'
export type CellValue = number | null
export type GameStatus = 'in-progress' | 'invalid' | 'won'

export interface Cell {
  row: number
  column: number
  value: CellValue
  isGiven: boolean
}

export type Grid = Cell[][]

export interface GameState {
  difficulty: Difficulty
  puzzle: Grid
  solution: Grid
  current: Grid
  status: GameStatus
}
