import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
    viteStaticCopy({
      targets: [
        { src: 'dist/index.html', dest: 'about' },
        { src: 'dist/index.html', dest: 'FAQ' },
        { src: 'dist/index.html', dest: 'download' },
        { src: 'dist/index.html', dest: 'credits' },
        { src: 'dist/index.html', dest: '.', rename: '404.html' }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})