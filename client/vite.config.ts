import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: false, // 👈 Prevents xdg-open error
    host: true,  // 👈 Optional: allows access via VPS IP
    port: 3000   // 👈 You can change this port if needed
  }
})
