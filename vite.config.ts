import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(), 
    Sitemap({
      hostname: 'https://onecorner.iyum.app',
      // Listez ici explicitement vos pages ou sections importantes
      dynamicRoutes: [
        '/',
        '/#home',
        '/#menu',
        '/#contact'
      ]
    })
  ],
  base: '/',
})