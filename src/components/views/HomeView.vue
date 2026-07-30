<script setup>
import { computed, ref } from 'vue'
import { useI18n }     from '@/composables/useI18n'
import Banner          from '@/components/reusables/banner.vue'
import ContentSection  from '@/components/reusables/content_section.vue'
import GaleryCarrousel from '@/components/reusables/galery_carousel.vue'
import Features        from '@/components/reusables/list_text_carroulsel.vue'
import CastList        from '@/components/reusables/cast_list.vue'

const { t } = useI18n()

const mapRenderImagesGlob = import.meta.glob('@/assets/img/map_renders/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})
const mapRenderImagesArray = Object.values(mapRenderImagesGlob)

const SESSION_KEY = 'replace_banner_for_map_renders'

const isMapRender = ref(sessionStorage.getItem(SESSION_KEY) === 'true')

const getRandomMapRender = () => {
  if (mapRenderImagesArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * mapRenderImagesArray.length)
    return mapRenderImagesArray[randomIndex]
  }
  return undefined
}

const randomMapRender = ref(getRandomMapRender())

const currentBannerImage = computed(() => {
  return isMapRender.value ? randomMapRender.value : undefined
})

const toggleSessionForTesting = () => {
  const nextVal = !isMapRender.value
  sessionStorage.setItem(SESSION_KEY, nextVal ? 'true' : 'false')
  isMapRender.value = nextVal
 
  if (nextVal) {
    randomMapRender.value = getRandomMapRender()
  }
}

const homeImages = import.meta.glob('@/assets/img/screenshots/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})

const screenshots = computed(() => Object.values(homeImages))
</script>

<template>
  <div class="main-content">
    <Banner
      :imageSrc="currentBannerImage"
      :isScrollable="isMapRender"
      :scrollDirection="isMapRender ? 'both' : 'horizontal'"
      :subtitle="t('SITE_HOME_HEADLINE')"
    />
 
    <ContentSection 
      :heading="t('SITE_HOME_HEADLINE')"
      :text="t('SITE_HOME_INTRO_2')" 
      mediaType="video" 
      mediaSrc="https://www.youtube-nocookie.com/embed/rVubWY0Ubzs"
    />
    
    <GaleryCarrousel 
      :image-modules="homeImages" 
      :interval-time="3000"
    />
    
    <Features />
    
    <CastList 
      view-type="list" 
      transition-type="fade" 
    />
  </div>
</template>