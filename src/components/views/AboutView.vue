<template>
  <div class="about-page-container">
    <div class="main-content">
   
      <ContentSection 
        v-for="(section, index) in infoSections" 
        :key          ="index"
        :heading      ="section.title"
        :text         ="section.text" 
        :mediaSrc     ="section.image"
        :mediaType    ="section.content_type"
        :mediaPosition="index % 2 === 0 ? 'right' : 'left'"
        :redBorder    ="section.redBorder ?? true"
        :imageOpenable="section.imageOpenable ?? true"
        headerPosition="inside"
        mediaWidth    ="700px" 
        mediaHeight   ="400px"
        textAlign     ="left"
        :headingAlign  ="section.headingAlign ?? 'left'"
      />

  
    </div>
    <MusicPlayer 
      playlistId="PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63" 
      footerBehavior="stay" 
      volumeLayout="bar"
    />
    <div class="godot_foot_note">

      <SocialMediaButton 
      platform     ="github" 
      variant      ="black" 
      hoverVariant ="colored" 
      tooltipText  ="MOTHER-Encore-Demo-Source-Code"
      />
   
    </div>
   
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n }  from '@/composables/useI18n'
import ContentSection     from '@/components/reusables/content_section.vue'
import SocialMediaButton  from '@/components/reusables/social_media_button.vue'
import MusicPlayer        from '@/components/reusables/music_player.vue'


import imgSc1 from '@/assets/img/screenshots/sc1.png'
import imgSc2 from '@/assets/img/screenshots/sc2.png'
import imgSc3 from '@/assets/img/screenshots/sc3.png'
import imgSc4 from '@/assets/img/screenshots/sc4.png'

import imgGodotLogo from '@/assets/img/logos/goto_logo_large_color_light.png'

const { t } = useI18n()


const infoSections = computed(() => [
  {
    title       : t('SITE_ABOUT_OVERVIEW_TITLE'),
    text        : [t('SITE_ABOUT_OVERVIEW_P1'), t('SITE_ABOUT_OVERVIEW_P2')],
    content_type: "text",
    headingAlign: "center"
  },
  {
    title       : t('SITE_ABOUT_COMBAT_TITLE'),
    text        : t('SITE_ABOUT_COMBAT_P1'),
    image       : imgSc4,
    content_type: "image",
    
  },
  {
    title       : t('SITE_ABOUT_VISUALS_TITLE'),
    text        : t('SITE_ABOUT_VISUALS_P1'),
    image       : imgSc3,
    content_type: "image"
  },
  {
    title       : t('SITE_ABOUT_MUSIC_TITLE'),
    text        : t('SITE_ABOUT_MUSIC_P1'),
    image       : imgSc1,
    content_type: "image"
  },  
  {
    title       : t('SITE_ABOUT_OPENSOURCE_TITLE'),
    text        : t('SITE_ABOUT_OPENSOURCE_P1'),
    image       : imgGodotLogo,
    content_type: "image",
    redBorder   : false,
    imageOpenable: false
  }
])


</script>

<style scoped>
.about-page-container {
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  width             : 100%;
}

.main-content {
  width             : 100%;
  max-width         : 1240px;
  display           : flex;
  flex-direction    : column;
  gap               : 20px;
  padding           : 10px;
}

.godot_foot_note {
  width             : 100%;
  max-width         : 1240px;
  margin-bottom     : 50px;
  padding           : 10px;
  box-sizing        : border-box;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
}
</style>