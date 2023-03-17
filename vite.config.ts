import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  plugins: [react()],
  build: {
    target: "modules",
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'use-proxy',
    },
    rollupOptions: {
      external: ['react', 'ethers', 'suspend-react'],
      output: {
        globals: {
          react: 'React',
          ethers: 'ethers',
        },
      },
      plugins: [
        typescript()
      ]
    },

  }
})
