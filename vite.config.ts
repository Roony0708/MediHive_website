import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react-vendor'
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) return 'router'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/leaflet') || id.includes('node_modules/react-leaflet')) return 'map'
          if (id.includes('node_modules/lucide-react')) return 'icons'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/astryx') || id.includes('node_modules/@astryxdesign')) return 'astryx'
        },
      },
    },
  },
})
