import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/s23carapp/', // my own repository name
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
