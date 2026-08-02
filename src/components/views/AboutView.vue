<template>
  <div class="about-page-container">
    <div class="main-content">
   
      <ContentSection 
        v-for="(section, index) in infoSections" 
        :key="index"
        :heading="section.title"
        :text="section.text" 
        :mediaSrc="section.image"
        :mediaType="section.content_type"
        :mediaPosition="index % 2 === 0 ? 'right' : 'left'"
        :redBorder="section.redBorder ?? true"
        :imageOpenable="section.imageOpenable ?? true"
      />

  
    </div>
    <MusicPlayer 
      playlistId="PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63" 
      footerBehavior="stay" 
      volumeLayout="bar"
    />
    <div class="godot_foot_note">
      <ContentSection  
        heading=""
        :text="footnoteText"
        mediaType="text"
      />
      <SocialMediaButton platform="github" variant="black" hoverVariant="colored" />
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

const footnoteText = computed(() => t('SITE_ABOUT_OPEN_SOURCE_FOOTNOTE'))

const infoSections = computed(() => [
  {
    title       : t('SITE_ABOUT_TITLE_1'),
    text        : t('SITE_ABOUT_BODY_1'),
    content_type: "text"
  },
  {
    title       : t('SITE_ABOUT_TITLE_2'),
    text        : t('SITE_ABOUT_BODY_2'),
    image       : imgSc1,
    content_type: "image"
  },
  {
    title       : t('SITE_ABOUT_TITLE_3'),
    text        : t('SITE_ABOUT_BODY_3'),
    image       : imgSc2,
    content_type: "image"
  },
  {
    title       : t('SITE_ABOUT_TITLE_4'),
    text        : t('SITE_ABOUT_BODY_4'),
    image       : imgSc3,
    content_type: "image"
  },
  {
    title       : t('SITE_ABOUT_TITLE_5'),
    text        : t('SITE_ABOUT_BODY_5'),
    image       : imgSc4,
    content_type: "image"
  },  
  {
    title       : t('SITE_ABOUT_TITLE_6'),
    text        : t('SITE_ABOUT_BODY_6'),
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