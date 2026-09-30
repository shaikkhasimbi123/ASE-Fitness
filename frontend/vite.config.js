import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['fitness-react-71pk.onrender.com'],
  }
})