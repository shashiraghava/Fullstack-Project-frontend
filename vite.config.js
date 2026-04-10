import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Fullstack-Project-frontend/'   // 🔥 VERY IMPORTANT
})