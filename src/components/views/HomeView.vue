<script setup>
import { computed }    from 'vue'
import { useI18n }     from '@/composables/useI18n'
import Banner          from '@/components/reusables/banner.vue'
import ContentSection  from '@/components/reusables/content_section.vue'
import GaleryCarrousel from '@/components/reusables/galery_carousel.vue'
import Features        from '@/components/reusables/list_text_carroulsel.vue'
import CastList        from '@/components/reusables/cast_list.vue'

const { t } = useI18n()

const homeImages = import.meta.glob('@/assets/img/screenshots/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})

const screenshots = computed(() => Object.values(homeImages))
</script>

<template>
  <div class="main-content">
    <Banner
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
      :interval-time="10000"
    />
    
    <Features />
    
    <CastList 
      view-type="tab" 
      transition-type="fade" 
    />
  </div>
</template>