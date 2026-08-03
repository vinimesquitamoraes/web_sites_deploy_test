<script setup>
import { computed }    from 'vue'
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

const homeImages = import.meta.glob('@/assets/img/screenshots/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})

const gameFeaturesList = computed(() => [
  [
    t('SITE_HOME_FEATURE_1'),
    t('SITE_HOME_FEATURE_2'),
    t('SITE_HOME_FEATURE_3'),
    t('SITE_HOME_FEATURE_4'),
    t('SITE_HOME_FEATURE_5'),
    t('SITE_HOME_FEATURE_6'),
    t('SITE_HOME_FEATURE_7')
  ],

])

</script>

<template>
  <div class="main-content">
    <Banner
      sessionKey                ="replace_banner_for_map_renders"
      :alternativeImages        ="mapRenderImagesArray"
      alternativeScrollDirection="both"
      :subtitle                 ="t('SITE_HOME_BANNER_TEXT')"
    />
 
    <ContentSection 
      :heading  ="t('SITE_HOME_HEADLINE')"
      :text     ="t('SITE_HOME_INTRO_2')" 
      mediaType ="video" 
      mediaSrc  ="https://www.youtube-nocookie.com/embed/rVubWY0Ubzs"
    />
    
    <GaleryCarrousel 
      :image-modules="homeImages" 
      :interval-time="10000"
    />
    
    <Features 
      :title="t('SITE_HOME_FEATURE_TITLE')"
      :features="gameFeaturesList"
    />
    
    <CastList 
      view-type="list" 
      transition-type="fade" 
    />
  </div>
</template>