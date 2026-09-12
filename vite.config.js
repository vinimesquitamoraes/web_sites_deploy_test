import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'
import prerender from '@prerenderer/rollup-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/web_sites_deploy_test/',
  assetsInclude: ['**/*.xlsx'],
  plugins: [
    vue(),
    vueDevTools(),
    Sitemap({
      hostname: 'https://vinimesquitamoraes.github.io/web_sites_deploy_test/',
      dynamicRoutes: [
        '/about',
        '/FAQ',
        '/download',
        '/credits'
      ]
    }),
    prerender({
      routes: [
        '/',
        '/about',
        '/FAQ',
        '/download',
        '/credits'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 1000, 
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})