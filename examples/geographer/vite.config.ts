import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          'turf-use-proxybot': path.resolve(__dirname, '../../src/index.ts'),
        },
      }
    : {},
})