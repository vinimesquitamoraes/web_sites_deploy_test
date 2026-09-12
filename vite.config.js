import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function injectMeta(html, title, description) {
  return html
    .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`)
    .replace(/content="A Reimagining of the original NES game\.[^"]*"/g, `content="${description}"`)
}

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
        {
          src: 'dist/index.html',
          dest: 'about',
          transform: (contents) => injectMeta(
            contents.toString(),
            'About - MOTHER Encore',
            'Learn more about the MOTHER Encore project, its history, and development.'
          )
        },
        {
          src: 'dist/index.html',
          dest: 'FAQ',
          transform: (contents) => injectMeta(
            contents.toString(),
            'FAQ - MOTHER Encore',
            'Frequently asked questions regarding MOTHER Encore.'
          )
        },
        {
          src: 'dist/index.html',
          dest: 'download',
          transform: (contents) => injectMeta(
            contents.toString(),
            'Download - MOTHER Encore',
            'Download the latest version of MOTHER Encore.'
          )
        },
        {
          src: 'dist/index.html',
          dest: 'credits',
          transform: (contents) => injectMeta(
            contents.toString(),
            'Credits - MOTHER Encore',
            'Meet the team behind MOTHER Encore.'
          )
        },
        {
          src: 'dist/index.html',
          dest: '.',
          rename: '404.html'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})