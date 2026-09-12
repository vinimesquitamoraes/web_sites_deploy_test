import { createRouter, createWebHistory } from 'vue-router'

import HomeView     from "@/components/views/HomeView.vue"
import AboutView    from '@/components/views/AboutView.vue'
import FaqView      from '@/components/views/FaqView.vue'
import CreditsView  from '@/components/views/CreditsView.vue'
import DownloadView from '@/components/views/DownloadView.vue'
import DogtenView   from '@/components/views/DogtenView.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
  },
  { 
    path: '/FAQ', 
    name: 'Faq', 
    component: FaqView,
  },
  { 
    path: '/download', 
    name: 'Download', 
    component: DownloadView,
  },
  { 
    path: '/credits', 
    name: 'Credits', 
    component: CreditsView,
  },
  { 
    path: '/dogten', 
    name: 'Dogten', 
    component: DogtenView,
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
})

export default router