import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: '.',
  server: { host: '127.0.0.1' },
  test: {
    environment: 'jsdom',
    include: ['test/**/*.test.ts']
  }
})
