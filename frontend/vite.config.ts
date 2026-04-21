// Vite build configuration for the AeroMetrix frontend, enabling the React plugin for JSX transform support.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
