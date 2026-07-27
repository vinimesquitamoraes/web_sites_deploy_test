<template>
  <div class="main-content">

    <ContentSection 
        :heading    ="t('SITE_ABOUT_DL_TITLE')"
        :text       ="t('SITE_ABOUT_DL_INTRO_1')" 
        mediaType   ="text" 
    />
    
    <ContentSection 
        :text       ="t('SITE_ABOUT_DL_INTRO_2')" 
        :show-header="false"
        mediaType   ="text" 
    />
    
    <div class="platforms-grid">
        <PlatformButton platform="windows" size="100px"/>
        <PlatformButton platform="linux"   size="100px"/>
        <PlatformButton platform="macos"   size="100px"/>
    </div>

    <div class="button-container">
        <CustomButton 
            text="" 
            iconSize="280" 
            height="100px"
            :iconSrc="iconItchio" 
            externalUrl="https://mother-encore.itch.io/mother-encore"
        />
    </div>

    <div class="page-character-container">
      <img :src="img_lloydDad" alt="Lloyd Dad" class="page-character" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import ContentSection from '@/components/reusables/content_section.vue'
import PlatformButton from '@/components/reusables/so_buttons.vue'
import CustomButton   from '@/components/reusables/custom_button.vue'
import img_lloydDad from '@/assets/img/characters/Lloyd_Dad.png'
import iconItchio from '@/assets/svg/itchio.svg'

const { t } = useI18n()
</script>

<style scoped>
.main-content {
  position: relative;
  display: flex;
  flex-direction: column;
}

.platforms-grid {
    width             : 100%;
    display           : flex;
    justify-content   : center;
    align-items       : center;
    gap               : 24px; 
}

.button-container {
    width             : 100%;
    display           : flex;
    justify-content   : center;
    margin-top        : 2rem; 
}

.page-character-container {
    width             : 100%;
    display           : flex;
    justify-content   : center;
    margin-top        : 60px;
    margin-bottom     : -20px;
    pointer-events    : none;
}

.page-character {
    width             : 240px;
    height            : auto;
    object-fit        : contain;
    display           : block;
}
</style>