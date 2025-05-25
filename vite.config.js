import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hsehelperweb/', // ← ВАЖНО! Должен быть именно "/"
})
