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
      :headingAlign ="section.headingAlign ?? 'left'"
      :textPadding  ="section.textPadding ?? (index % 2 === 0 ? '0 0 0 21px' : '0 21px 0 21px')"
      :mediaFit     ="section.mediaFit ?? 'cover'"
      :mediaShadow  ="section.mediaShadow ?? 'var(--content-section-media-shadow)'"
      :mediaBorder  ="section.mediaBorder ?? ''"
      :border       ="section.border ?? 'transparent'"
      :shadow       ="section.shadow ?? ''"
      headerPosition="inside"
      mediaWidth    ="775px" 
      mediaHeight   ="450px"
      textAlign     ="left"
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


import combatImage  from '@/assets/img/screenshots/sc4.png'
import fieldImage   from '@/assets/img/screenshots/sc1.png'
import storyImage   from '@/assets/img/screenshots/sc2.png'
import visualImage  from '@/assets/img/screenshots/sc3.png'
import musicImage   from '@/assets/img/screenshots/sc5.png'

import imgGodotLogo from '@/assets/img/logos/goto_logo_large_color_light.png'

const { t } = useI18n()


const infoSections = computed(() => [
  {
    title       : t('SITE_ABOUT_OVERVIEW_TITLE'),
    text        : [t('SITE_ABOUT_OVERVIEW_P1'), t('SITE_ABOUT_OVERVIEW_P2')],
    content_type: "text",
    headingAlign: "center",
    textPadding  :"0 0 0 0"
  },
  {
    title       : t('SITE_ABOUT_COMBAT_TITLE'),
    text        : t('SITE_ABOUT_COMBAT_P1'),
    image       : combatImage,
    content_type: "image",
  },
  {
    title       : t('SITE_ABOUT_FIELD_SKILLS_TITLE'),
    text        : t('SITE_ABOUT_FIELD_SKILLS_P1'),
    image       : fieldImage,
    content_type: "image",
  },
  {
    title       : t('SITE_ABOUT_STORY_TITLE'),
    text        : t('SITE_ABOUT_STORY_P1'),
    image       : storyImage,
    content_type: "image",
  },
  {
    title       : t('SITE_ABOUT_VISUALS_TITLE'),
    text        : t('SITE_ABOUT_VISUALS_P1'),
    image       : visualImage,
    content_type: "image"
  },
  {
    title       : t('SITE_ABOUT_MUSIC_TITLE'),
    text        : t('SITE_ABOUT_MUSIC_P1'),
    image       : musicImage,
    content_type: "image"
  },    
  {
    title         : t('SITE_ABOUT_OPENSOURCE_TITLE'),
    text          : t('SITE_ABOUT_OPENSOURCE_P1'),
    image         : imgGodotLogo,
    content_type  : "image",
    imageOpenable : false,
    mediaFit      : 'contain',
    mediaShadow   : 'none',
    mediaBorder   : 'none',
    border        : 'none',
    shadow        : 'none'
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