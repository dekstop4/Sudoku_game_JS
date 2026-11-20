export type Cell = number | null
export type Grid = Cell[][]
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Puzzle {
  puzzle: Grid
  solution: Grid
}

const SIZE = 9

function candidatesFor(grid: Grid, row: number, column: number): number[] {
  const used = new Set<number>()

  for (let index = 0; index < SIZE; index += 1) {
    const rowValue = grid[row][index]
    const columnValue = grid[index][column]
    if (rowValue !== null) used.add(rowValue)
    if (columnValue !== null) used.add(columnValue)
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxColumn = Math.floor(column / 3) * 3
  for (let rowOffset = 0; rowOffset < 3; rowOffset += 1) {
    for (let columnOffset = 0; columnOffset < 3; columnOffset += 1) {
      const value = grid[boxRow + rowOffset][boxColumn + columnOffset]
      if (value !== null) used.add(value)
    }
  }

  return Array.from({ length: SIZE }, (_, index) => index + 1)
    .filter((value) => !used.has(value))
}

function findBestCell(grid: Grid): { row: number; column: number; candidates: number[] } | null {
  let best: { row: number; column: number; candidates: number[] } | null = null

  for (let row = 0; row < SIZE; row += 1) {
    for (let column = 0; column < SIZE; column += 1) {
      if (grid[row][column] !== null) continue
      const candidates = candidatesFor(grid, row, column)
      if (best === null || candidates.length < best.candidates.length) {
        best = { row, column, candidates }
        if (candidates.length === 0) return best
      }
    }
  }

  return best
}

function countSolutions(grid: Grid, limit: number): number {
  const next = findBestCell(grid)
  if (next === null) return 1
  if (next.candidates.length === 0) return 0

  let count = 0
  for (const value of next.candidates) {
    grid[next.row][next.column] = value
    count += countSolutions(grid, limit - count)
    grid[next.row][next.column] = null
    if (count >= limit) return count
  }

  return count
}

export function getSolutionCount(grid: Grid, limit = 2): number {
  return countSolutions(grid.map((row) => [...row]), limit)
}

export function createSolvedGrid(random: () => number = Math.random): Grid {
  const grid: Grid = Array.from({ length: SIZE }, () => Array<Cell>(SIZE).fill(null))

  function fill(): boolean {
    const next = findBestCell(grid)
    if (next === null) return true
    if (next.candidates.length === 0) return false

    const candidates = [...next.candidates].sort(() => random() - 0.5)
    for (const value of candidates) {
      grid[next.row][next.column] = value
      if (fill()) return true
      grid[next.row][next.column] = null
    }
    return false
  }

  fill()
  return grid
}

export function generatePuzzle(
  difficulty: Difficulty,
  random: () => number = Math.random
): Puzzle {
  const solution = createSolvedGrid(random)
  const puzzle = solution.map((row) => [...row])
  const clueTargets: Record<Difficulty, number> = {
    easy: 40,
    medium: 34,
    hard: 29
  }
  const positions = Array.from({ length: SIZE * SIZE }, (_, index) => index)
    .sort(() => random() - 0.5)
  let clues = SIZE * SIZE

  for (const position of positions) {
    if (clues <= clueTargets[difficulty]) break
    const row = Math.floor(position / SIZE)
    const column = position % SIZE
    const value = puzzle[row][column]
    puzzle[row][column] = null
    if (getSolutionCount(puzzle) === 1) {
      clues -= 1
    } else {
      puzzle[row][column] = value
    }
  }

  return { puzzle, solution }
}

export function isValidEntry(grid: Grid, row: number, column: number, value: number): boolean {
  for (let index = 0; index < SIZE; index += 1) {
    if (index !== column && grid[row][index] === value) return false
    if (index !== row && grid[index][column] === value) return false
  }

  const boxRow = Math.floor(row / 3) * 3
  const boxColumn = Math.floor(column / 3) * 3
  for (let rowOffset = 0; rowOffset < 3; rowOffset += 1) {
    for (let columnOffset = 0; columnOffset < 3; columnOffset += 1) {
      const currentRow = boxRow + rowOffset
      const currentColumn = boxColumn + columnOffset
      if (
        (currentRow !== row || currentColumn !== column) &&
        grid[currentRow][currentColumn] === value
      ) {
        return false
      }
    }
  }

  return true
}
