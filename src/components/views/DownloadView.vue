<template>
    <div class="main-content">

        <ContentSection 
            :heading    ="t('SITE_DOWNLOAD_TITLE')"
            :text       ="t('SITE_DOWNLOAD_P1')" 
            mediaType   ="text" 
        />

        <ContentSection 
            :text       ="t('SITE_DOWNLOAD_P2')" 
            mediaType   ="text" 
        />

        <div class="platforms-grid">
            <PlatformButton platform="windows" size="100px" :clickable="false"/>
            <PlatformButton platform="linux"   size="100px" :clickable="false"/>
            <PlatformButton platform="macos"   size="100px" :clickable="false"/>
        </div>

        <div class="download-action-group">
            <h2 class="itchio-about-heading">{{ t('SITE_ABOUT_DL_ITCHIO') }}</h2>
            <div class="button-container">
                <CustomButton 
                    text            ="" 
                    iconSize        ="100%" 
                    width           ="280px"
                    height          ="100px"
                    iconColor       =var(--color-itchio-button-icon)
                    bgColor         =var(--color-itchio-button-bg)
                    hoverIconColor  =var(--color-itchio-button-icon-hover)
                    hoverBgColor    =var(--color-itchio-button-bg-hover)
                    :iconSrc        ="iconItchio" 
                    externalUrl="https://mother-encore.itch.io/mother-encore"
                />
            </div>
        </div>

        <div class="page-character-container">
            <img :src="img_lloydDad" alt="Lloyd Dad" class="page-character" />
        </div>
        <Requirements />

    </div>
</template>

<script setup>
/**
    * @file        DownloadView.vue
    * @brief       The download view page displaying download info text, unclickable OS platform icons, Itch.io action button, character illustration, and system requirements.
    * @displayName Download View
*/

import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import ContentSection   from '@/components/reusables/content_section.vue'
import PlatformButton   from '@/components/reusables/so_buttons.vue'
import CustomButton     from '@/components/reusables/custom_button.vue'
import Requirements     from '@/components/reusables/requeriments.vue'
import img_lloydDad     from '@/assets/img/characters/Lloyd_Dad.png'
import iconItchio       from '@/assets/svg/itchio.svg?url'

const { t } = useI18n()
</script>

<style scoped>
.platforms-grid {
    width             : 100%;
    display           : flex;
    justify-content   : center;
    align-items       : center;
    gap               : clamp(12px, 2.5vw, 24px); 
    flex-wrap         : wrap;
    box-sizing        : border-box;
}

.download-action-group {
    display           : flex;
    flex-direction    : column;
    align-items       : center;
    gap               : 8px;
    margin-top        : clamp(1.5rem, 3vw, 2rem);
    box-sizing        : border-box;
}

.itchio-about-heading {
    text-align        : center;
    font-family       : var(--font-h2);
    font-size         : var(--font-h2-size);
    color             : 'var(--color-primary)';
    margin            : 0;
    box-sizing        : border-box;
}

.button-container {
    width             : 100%;
    max-width         : 100%;
    display           : flex;
    justify-content   : center;
    margin            : 0;
    box-sizing        : border-box;
}

.page-character-container {
    width             : 100%;
    display           : flex;
    justify-content   : center;
    margin-top        : clamp(30px, 6vw, 60px);
    margin-bottom     : -20px;
    pointer-events    : none;
    box-sizing        : border-box;
}

.page-character {
    width             : clamp(140px, 20vw, 240px);
    height            : auto;
    object-fit        : contain;
    display           : block;
}

@media screen and (max-width: 768px) {
    .platforms-grid {
    flex-direction    : row;
    justify-content   : center;
    gap               : 16px;
    }

    .platforms-grid > * {
    max-width         : 100%;
    display           : flex;
    justify-content   : center;
    }
}
</style>