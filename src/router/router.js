import { createRouter, createWebHistory } from 'vue-router'

import HomeView     from "@/components/views/HomeView.vue"
import AboutView    from '@/components/views/AboutView.vue'
import FaqView      from '@/components/views/FaqView.vue'
import CreditsView  from '@/components/views/CreditsView.vue'
import DownloadView from '@/components/views/DownloadView.vue'
import DogtenView   from '@/components/views/DogtenView.vue'


const SITE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://motherencore.com'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: {
      title: 'MOTHER Encore',
      description: 'A Reimagining of the original NES game. Featuring tons of fixes, additions and twists on the classic game!'
    }
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
    meta: {
      title: 'About - MOTHER Encore',
      description: 'Learn more about the MOTHER Encore project, its history, and what makes this fan reimagining unique.'
    }
  },
  { 
    path: '/FAQ', 
    name: 'Faq', 
    component: FaqView,
    meta: {
      title: 'FAQ - MOTHER Encore',
      description: 'Find answers to common questions about MOTHER Encore, compatibility, gameplay, and release details.'
    }
  },
  { 
    path: '/download', 
    name: 'Download', 
    component: DownloadView,
    meta: {
      title: 'Download - MOTHER Encore',
      description: 'Download the latest version of MOTHER Encore and get started on your journey.'
    }
  },
  { 
    path: '/credits', 
    name: 'Credits', 
    component: CreditsView,
    meta: {
      title: 'Credits - MOTHER Encore',
      description: 'Meet the team, contributors, and artists behind the creation of MOTHER Encore.'
    }
  },
  { 
    path: '/dogten', 
    name: 'Dogten', 
    component: DogtenView,
    meta: {
      title: 'Dogten - MOTHER Encore',
      description: 'A secret area in MOTHER Encore.'
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

router.afterEach((to) => {
  if (to.name === 'Dogten') {
    sessionStorage.removeItem('unlocked_dogten')
  }

  // Fallbacks
  const defaultTitle = 'MOTHER Encore'
  const defaultDescription = 'A Reimagining of the original NES game. Featuring tons of fixes, additions and twists on the classic game!'

  const title = to.meta.title || defaultTitle
  const description = to.meta.description || defaultDescription
  const currentUrl = `${SITE_URL}${to.fullPath}`

  document.title = title

  const setMeta = (selector, attribute, value) => {
    let el = document.querySelector(selector)
    if (el) {
      el.setAttribute(attribute, value)
    }
  }


  setMeta('meta[name="description"]', 'content', description)
  setMeta('link[rel="canonical"]', 'href', currentUrl)

  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', currentUrl)

  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
})

export default router