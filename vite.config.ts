import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { markdownContent } from './vite-plugins/markdown-content'

export default defineConfig({
  plugins: [markdownContent(), react(), tailwindcss()],
})
