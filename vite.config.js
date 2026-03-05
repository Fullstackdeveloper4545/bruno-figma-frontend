import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
const devApiTarget = process.env.VITE_DEV_API_TARGET || 'http://localhost:5000'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const brunoFrontendSrc = path.resolve(__dirname, '../bruno-frontend/src')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': brunoFrontendSrc,
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
      },
      '/uploads': {
        target: devApiTarget,
        changeOrigin: true,
      },
      '/labels': {
        target: devApiTarget,
        changeOrigin: true,
      },
    },
  },
})
