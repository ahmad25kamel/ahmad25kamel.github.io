import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.spec.ts', 'tests/unit/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/source/**', '**/old/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'public/',
        'old/',
        'source/',
        'tests/',
        '**/*.d.ts',
        'vite.config.js',
        'vitest.config.ts',
        'tailwind.config.js',
        'postcss.config.js'
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src')
    }
  }
})