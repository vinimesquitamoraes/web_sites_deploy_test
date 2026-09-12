import { createRouter, createWebHistory } from 'vue-router'
import { useHead } from '@unhead/vue'

import HomeView     from "@/components/views/HomeView.vue"
import AboutView    from '@/components/views/AboutView.vue'
import FaqView      from '@/components/views/FaqView.vue'
import CreditsView  from '@/components/views/CreditsView.vue'
import DownloadView from '@/components/views/DownloadView.vue'
import DogtenView   from '@/components/views/DogtenView.vue'


const DEFAULT_IMAGE = 'https://vinimesquitamoraes.github.io/web_sites_deploy_test/logobg_itch_io.png'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: {
      head: {
        title: 'MOTHER Encore',
        meta: [
          { name: 'description', content: 'A Reimagining of the original NES game. Featuring tons of fixes, additions and twists on the classic game!' },
          { property: 'og:title', content: 'MOTHER Encore' },
          { property: 'og:description', content: 'A Reimagining of the original NES game. Featuring tons of fixes, additions and twists on the classic game!' },
          { property: 'og:image', content: DEFAULT_IMAGE },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:title', content: 'MOTHER Encore' },
          { name: 'twitter:description', content: 'A Reimagining of the original NES game. Featuring tons of fixes, additions and twists on the classic game!' }
        ]
      }
    }
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
    meta: {
      head: {
        title: 'About - MOTHER Encore',
        meta: [
          { name: 'description', content: 'Learn more about MOTHER Encore.' },
          { property: 'og:title', content: 'About - MOTHER Encore' },
          { property: 'og:description', content: 'Learn more about MOTHER Encore.' },
          { property: 'og:image', content: DEFAULT_IMAGE },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:title', content: 'About - MOTHER Encore' },
          { name: 'twitter:description', content: 'Learn more about MOTHER Encore.' }
        ]
      }
    }
  },
  { 
    path: '/FAQ', 
    name: 'Faq', 
    component: FaqView,
    meta: {
      head: {
        title: 'FAQ - MOTHER Encore',
        meta: [
          { name: 'description', content: 'Frequently asked questions regarding MOTHER Encore.' },
          { property: 'og:title', content: 'FAQ - MOTHER Encore' },
          { property: 'og:description', content: 'Frequently asked questions regarding MOTHER Encore.' }
        ]
      }
    }
  },
  { 
    path: '/download', 
    name: 'Download', 
    component: DownloadView,
    meta: {
      head: {
        title: 'Download - MOTHER Encore',
        meta: [
          { name: 'description', content: 'Download the latest version of MOTHER Encore.' },
          { property: 'og:title', content: 'Download - MOTHER Encore' },
          { property: 'og:description', content: 'Download the latest version of MOTHER Encore.' }
        ]
      }
    }
  },
  { 
    path: '/credits', 
    name: 'Credits', 
    component: CreditsView,
    meta: {
      head: {
        title: 'Credits - MOTHER Encore',
        meta: [
          { name: 'description', content: 'Meet the team behind MOTHER Encore.' },
          { property: 'og:title', content: 'Credits - MOTHER Encore' },
          { property: 'og:description', content: 'Meet the team behind MOTHER Encore.' }
        ]
      }
    }
  },
  { 
    path: '/dogten', 
    name: 'Dogten', 
    component: DogtenView,
    meta: {
      head: {
        title: 'Dogten - MOTHER Encore'
      }
    },
    beforeEnter: (to, from) => {
      const isAuthorized = sessionStorage.getItem('unlocked_dogten') === 'true'
      if (!isAuthorized) {
        return { name: 'Home', path: '/' }
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to) => {
  if (to.meta.head) {
    useHead(to.meta.head)
  }
})

router.afterEach((to) => {
  if (to.name === 'Dogten') {
    sessionStorage.removeItem('unlocked_dogten')
  }
})

export default router