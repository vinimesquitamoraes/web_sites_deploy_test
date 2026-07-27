import { createRouter, createWebHashHistory } from 'vue-router'
import { useHead }                        from '@unhead/vue' 

import HomeView     from "@/components/views/HomeView.vue"
import AboutView    from '@/components/views/AboutView.vue'
import FaqView      from '@/components/views/FaqView.vue'
import CreditsView  from '@/components/views/CreditsView.vue'
import DownloadView from '@/components/views/DownloadView.vue'
import DogtenView   from '@/components/views/DogtenView.vue'

import LOGO_IMAGE_URL from  '@/assets/img/logos/logobg_itch_io.png'

const SITE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://motherencore.com'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: {
      title         : 'MOTHER Encore - Home',
      description   : 'A Reimagining of the original NES game. Featuring tons of fixes, additions and twists on the classic game!',
      image         :  LOGO_IMAGE_URL, 
      themeColor    : '#c24b49',
      twitterSite   : '@Mother_Encore'
    }
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
    meta: {
      title         : 'MOTHER Encore - About',
      description   : 'A Reimagining of the classic NES game.',
      image         :  LOGO_IMAGE_URL,
      themeColor    : '#c24b49',
      twitterSite   : '@Mother_Encore'
    }
  },
  { 
    path: '/FAQ', 
    name: 'Faq', 
    component: FaqView,
    meta: {
      title         : 'MOTHER Encore - FAQ',
      description   : 'A Reimagining of the classic NES game.',
      image         :  LOGO_IMAGE_URL,
      themeColor    : '#c24b49',
      twitterSite   : '@Mother_Encore'
    }
  },
   { 
    path: '/download', 
    name: 'Download', 
    component: DownloadView,
    meta: {
      title         : 'MOTHER Encore - Download',
      description   : 'A Reimagining of the classic NES game.',
      image         :  LOGO_IMAGE_URL,
      themeColor    : '#c24b49',
      twitterSite   : '@Mother_Encore'
    }
  },
  { 
    path: '/credits', 
    name: 'Credits', 
    component: CreditsView,
    meta: {
      title         : 'MOTHER Encore - Credits',
      description   : 'A Reimagining of the classic NES game.',
      image         :  LOGO_IMAGE_URL,
      themeColor    : '#c24b49',
      twitterSite   : '@Mother_Encore'
    }
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
    meta: {
      title         : 'MOTHER Encore - Dogten',
      description   : 'A Reimagining of the classic NES game.',
      image         :  LOGO_IMAGE_URL,
      themeColor    : '#c24b49',
      twitterSite   : '@Mother_Encore'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.name === 'Dogten') {
    sessionStorage.removeItem('unlocked_dogten')
  }

  const meta = to.meta

  useHead({
    title: meta.title || 'MOTHER Encore',
    meta: [
      { name    : 'theme-color'         , content: '#c24b49' },
      { name    : 'description'         , content: meta.description || '' },
      { property: 'og:title'            , content: meta.title       || 'MOTHER Encore' },
      { property: 'og:description'      , content: meta.description || '' },
      { property: 'og:image'            , content: meta.image       || '' },
      { name    : 'twitter:card'        , content: meta.image},
      { name    : 'twitter:site'        , content: meta.twitterSite || '' },
      { name    : 'twitter:title'       , content: meta.title       || 'MOTHER Encore' },
      { name    : 'twitter:description' , content: meta.description || '' },
      { name  : 'twitter:image'         , content: meta.image       || '' },
    ]
  })
})

export default router