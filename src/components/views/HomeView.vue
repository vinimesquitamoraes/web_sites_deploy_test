<template>
  <div class="main-content">
    <Banner
      sessionKey                ="replace_banner_for_map_renders"
      :alternativeImages        ="mapRenderImagesArray"
      alternativeScrollDirection="both"
      :subtitle                 ="t('SITE_HOME_BANNER_TEXT')"
      vignetteStyle             = "style_1"
    />

    <ContentSection 
      :heading        ="t('SITE_HOME_HEADLINE')"
      :text           ="[t('SITE_HOME_INTRO_1'), t('SITE_HOME_INTRO_2'), t('SITE_HOME_INTRO_3')]" 
      mediaType       ="video" 
      mediaSrc        ="https://www.youtube-nocookie.com/embed/rVubWY0Ubzs"
      text-align      ="left"
    />
    
    <GaleryCarrousel 
      :image-modules="homeImages" 
      :interval-time="10000"
    />
    
    <CastList 
      view-type="list" 
      transition-type="fade" 
    />
  </div>
</template>

<script setup>
/**
  * @file        HomeView.vue
  * @brief       The primary home page view component containing the main banner, introduction video, gallery carousel, and cast list showcase.
  * @displayName Home View
*/

import { useI18n }     from '@/composables/useI18n'

import Banner          from '@/components/reusables/banner.vue'
import ContentSection  from '@/components/reusables/content_section.vue'
import GaleryCarrousel from '@/components/reusables/galery_carousel.vue'
import CastList        from '@/components/reusables/cast_list.vue'

const { t } = useI18n()

/**
  * Glob import for map render images used as alternative banner backgrounds.
  * @private
  */
const mapRenderImagesGlob = import.meta.glob('@/assets/img/map_renders/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})
const mapRenderImagesArray = Object.values(mapRenderImagesGlob)

/**
  * Glob import for home page screenshot images passed to the gallery carousel.
  * @private
  */
const homeImages = import.meta.glob('@/assets/img/screenshots/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})
</script>