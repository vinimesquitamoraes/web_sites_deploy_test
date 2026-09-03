<template>
  <div v-if="!isLoaded" class="loading-screen">
    <p>Loading...</p>
  </div>

  <div v-else class="app-container">
    <AppHeader />
    
    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>

  
    <BackToTop 
      footerBehavior="stay" 
    />

    <MusicPlayer 
      v-if="!route.meta.hideMusicPlayer"
      playlistId        ="PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63" 
      footerBehavior    ="stay" 
      volumeLayout      ="bar"
      minimizedBehavior = "compact"
    />

    <div ref="footerRef" class="footer-container">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from '@/composables/useI18n'

  import AppHeader      from '@/components/reusables/app_header.vue'
  import AppFooter      from '@/components/reusables/app_footer.vue'
  import BackToTop      from '@/components/reusables/back_to_top_button.vue'
  import MusicPlayer    from '@/components/reusables/music_player.vue'
  
  const route = useRoute()
  const { loadTranslations, isLoaded } = useI18n()

  onMounted(() => {
    loadTranslations()
  })
</script>

<style>
@font-face {
  font-family: "Motherish";
  src: url('/src/assets/fonts/Motherish/Motherish-Regular.otf');
}
:root {
  /*Default Styles ==========================================================================================================================================================*/
  --color-primary             : #E50012;
  --color-secondary           : #fdd268;
  --color-tertiary            : #b425e1;
  --color-black               : #000000;
  --color-place-holder-green  : #25D366;
  --color-default-text-color  : #FFFFFF;

  --color-h1                  : var(--color-primary);
  --color-h2                  : var(--color-primary);
  --color-hyperlinks          : var(--color-secondary);

  --default-border            : 3px solid #000000;
  --default-border-radius     : 10px;
  --color-default-background  : #FFFFFF;

  --font-default              : 'Motherish', sans-serif;

  --font-navbar               : var(--font-default);
  --font-h1                   : var(--font-default);
  --font-h2                   : var(--font-default);
  --font-h3                   : var(--font-default);
  --font-h4                   : var(--font-default);
  --font-body                 : var(--font-default);
  --font-button               : var(--font-default);
  --font-p                    : var(--font-default);
  --font-dropdown             : var(--font-default);
  --font-credits-title        : var(--font-default);
  --font-credits-role         : var(--font-default);
  --font-credits-name         : var(--font-default);

  --font-navbar-size          : 25px;
  --font-h1-size              : 60px;
  --font-h2-size              : 32px;
  --font-h3-size              : 28px;
  --font-h4-size              : 24px;
  --font-p-size               : 20px;
  --font-body-size            : 16px;

  --font-dropdown-size        : 20px;
  
  --font-credits-title-size   : 24px;
  --font-credits-role-size    : 20px;
  --font-credits-name-size    : 16px;

  --font-mobile-navbar        : var(--font-default);
  --font-mobile-h1            : var(--font-default);
  --font-mobile-h2            : var(--font-default);
  --font-mobile-h3            : var(--font-default);
  --font-mobile-h4            : var(--font-default);
  --font-mobile-body          : var(--font-default);
  --font-mobile-button        : var(--font-default);
  --font-mobile-p             : var(--font-default);
  
  --font-mobile-navbar-size   : 60px;
  --font-mobile-h1-size       : 60px;
  --font-mobile-h2-size       : 25px;
  --font-mobile-h3-size       : 20px;
  --font-mobile-h4-size       : 18px;
  --font-mobile-body-size     : 16px;
  --font-mobile-button-size   : 16px;
  --font-mobile-p-size        : 16px;

  /*Foorter Syles =========================================================================================================*/
  --color-footer-bg                   : var(--color-primary);
  --color-footer-text                 : var(--color-default-text-color);
  --color-footer-divider              : var(--color-default-background);
  --color-footer-link                 : var(--color-default-text-color);
  --color-footer-link-hover           : var(--color-hover);
  --color-footer-hyperlink            : var(--color-hyperlinks);
  --color-footer-vue-link             : #42b883;

  /* Custom Button Stuff ===================================================================================================*/
  --color-custom-button-background    : var(--color-default-background);
  --color-custom-button-hover         : var(--color-primary);
  
  --color-custom-button-text          : var(--color-black);
  --color-custom-button-text-hover    : var(--color-default-text-color);

  --color-custom-icon                 : var(--color-black);
  --color-custom-icon-hover           : var(--color-custom-button-background);

  --custom-button-border              : var(--default-border);
  --custom-button-border-radius       : var(--default-border-radius);

  --custom-button-font                : var(--font-default);
  --custom-button-font-size           : 16px;

  /* Itch.io Button Stuff ================================================================================================== */
    --color-itchio-button-icon             : var(--color-black);
    --color-itchio-button-bg               : var(--color-default-background);
    
    --color-itchio-button-icon-hover       : #ffffff;
    --color-itchio-button-bg-hover         : var(--color-primary);

  /* Back to Top Button Stuff ==============================================================================================*/
  --back-to-top-button-bg-color              : var(--color-default-background);
  --back-to-top-button-icon-color            : var(--color-primary);
  --back-to-top-button-bg-color-hover        : var(--color-primary);
  --back-to-top-button-icon-color-hover      : var(--color-default-background);
  --back-to-top-button-border                : var(--default-border);
  --back-to-top-button-border-radius         : var(--default-border-radius);
  --back-to-top-button-size                  : 56px;
  --back-to-top-button-icon-size             : 95%;


  /* Character Card Stuff ==================================================================================================*/
  --character-card-title-color      : var(--color-default-text-color);
  --character-card-title-font       : var(--font-h3, var(--font-h1));
  --character-card-title-size       : 60px;
  --character-card-title-size-mobile: var(--font-mobile-h3-size);
  --character-card-title-weight     : 600;

  --character-card-body-color       : var(--color-default-text-color);
  --character-card-body-font        : var(--font-p, var(--font-body-family));
  --character-card-body-size        : 24px;
  --character-card-body-weight      : 500;
  --character-card-body-line-height : 1.5;

  --character-card-separator-color  : var(--color-default-background);
  --character-card-separator-height : 4px;
  
/* Gallery Stuff ========================================================================================================= */
  --gallery-title-color         : var(--color-h2);
  --gallery-title-size          : var(--font-h2-size);
  --gallery-title-font          : var(--font-h2);

  --gallery-viewport-bg         : var(--color-black);
  --gallery-border              : var(--default-border);
  --gallery-timer-bg            : rgba(112, 3, 3, 0.144);
  --gallery-accent-color        : var(--color-primary);
  --gallery-dot-bg              : var(--color-default-background);
  --gallery-dot-border          : none;
  --gallery-thumb-bg            : var(--color-default-background);
  --gallery-thumb-tint-bg       : rgba(255, 71, 87, 0.3);

  --gallery-button-icon         : var(--color-primary);
  --gallery-button-bg           : var(--color-default-background);
  --gallery-button-icon-hover   : var(--color-default-background);
  --gallery-button-bg-hover     : var(--color-primary);
  
  --gallery-button-icon-size    : 95%;
  --gallery-button-size         : 50px;

  /* Music Player Stuff ====================================================================================================*/

  --music-player-color-bg-main                 : #272526;
  --music-player-color-bg-secondary            : var(--color-default-background);
  --music-player-color-bg-dark                 : #000000;
  --music-player-color-surface                 : #361c21;

  --music-player-border                        : var(--default-border);
  --music-player-border-radius                 : var(--default-border-radius);
    
  --music-player-color-text-muted              : var(--color-text-muted);
  --music-player-color-white                   : var(--color-white);
  --music-player-color-accent                  : #ef4444;
  --music-player-color-accent-light            : #fca5a5;
  
  --music-player-color-accent-special          : #7729bb;
  --music-player-color-primary                 : var(--color-primary);
  
  --music-player-color-playbt-playing          : var(--color-primary);
  --music-player-color-playbt-playing-pressed  : #8539d1;
  --music-player-color-playbt-paused           : #ef4444;
  --music-player-color-playbt-paused-pressed   : #240046;
  --music-player-color-placeholder-green       : var(--color-placeholder-green);

  --music_player-compact-button-color-bg        : var(--color-default-background);
  --music_player-compact-button-color-bg-hover  : var(--color-primary);
  --music_player-compact-button-color-icon      : var(--music_player-compact-button-color-bg-hover);
  --music_player-compact-button-color-icon-hover: var(--music_player-compact-button-color-bg);
  --music_player-compact-button-size            : 56px;
  --music_player-compact-button-icon-size       : 95%;

  --music_player-font-h1                       : var(--font-h1);
  --music_player-font-p                        : var(--font-p);
  --music_player-font-p-size                   : var(--font-p-size);
  --music_player-font-track-names-size         : 15px;

  /* Toaster Stuff ========================================================================================================= */
  --toaster-bg-main           : #ffffff;
  --toaster-border-color      : #000000;
  --toaster-font-size         : 0.85rem;
  --toaster-icon-color        : #ff6b6b;
  --toaster-text-color        : #000000;
  --toaster-progress-bg       : rgba(0, 0, 0, 0.1);
  --toaster-accent            : #ff6b6b;
  --toaster-success-bg        : #e8f8f5;
  --toaster-success-border    : #27ae60;
  --toaster-warning-bg        : #fef9e7;
  --toaster-warning-border    : #f39c12;
  --toaster-error-bg          : #f5b7b1;
  --toaster-error-border      : #c0392b;

  /* Credits Stuff ========================================================================================================= */
  --color-credits-background  : #000000;
  --color-credits-title       : #e67e22; 
  --color-credits-role        : #e67e22;
  --color-credits-name        : #ffffff;

  /* Operational System Icons Stuff ======================================================================================== */
  --color-operational-system-icons-color       : #E50012;
  --color-operational-system-icons-hover-color : #E50012;

  /* Requirements Stuff =====================================================================================================*/
  --color-requiriments-key-background           : #E50012;
  --color-requiriments-value-background         : #ffffff;
  --color-requiriments-key-text                 : #ffffff;
  --color-requiriments-value-text               : #000000;
  --color-requiriments-container-border         : 3px solid #000000;
  --color-requiriments-key-border-bottom        : 3px solid #000000;
  --color-requiriments-value-border-bottom      : 3px solid #E50012;
  --color-requiriments-mobile-row-border-bottom : 3px solid #E50012;


  /* Dropdown Stuff ======================================================================================================== */
  --color-dropdown-border             : 3px solid currentColor;
  --color-dropdown-trigger-bg         : #ff9900;
  --color-dropdown-trigger-text       : #000000;
  --color-dropdown-trigger-hover-bg   : #E50012;
  --color-dropdown-trigger-hover-text : #ffffff;
  --color-dropdown-arrow              : #000000;
  --color-dropdown-arrow-hover        : #ffffff;
  --color-dropdown-list-bg            : #ff9900;
  --color-dropdown-list-border        : 2px solid #000000;
  --color-dropdown-option-text        : #000000;
  --color-dropdown-option-hover-bg    : #E50012;
  --color-dropdown-option-hover-text  : #ffffff;
  --color-dropdown-option-active-bg   : #E50012;
  --color-dropdown-option-active-text : #ffffff;
  --color-dropdown-active-arrow       : #ffffff;

  --color-lang-dropdown-border             : 3px solid currentColor;
  --color-lang-dropdown-trigger-text       : var(--color-default-text-color);
  --color-lang-dropdown-trigger-bg         : #000000;
  --color-lang-dropdown-trigger-hover-bg   : var(--color-tertiary);
  --color-lang-dropdown-arrow              : #ffffff;
  --color-lang-dropdown-arrow-hover        : #ffffff;
  --color-lang-dropdown-list-bg            : #000000;
  --color-lang-dropdown-list-border        : 6px double  #000000;
  --color-lang-dropdown-option-text        : #ffffff;
  --color-lang-dropdown-option-hover-bg    : var(--color-tertiary);
  --color-lang-dropdown-option-hover-text  : #ffffff;
  --color-lang-dropdown-option-active-bg   : var(--color-tertiary);
  --color-lang-dropdown-option-active-text : #ffffff;
  --color-lang-dropdown-active-arrow       : #ffffff;  

  
  /* Foldable Stuff ===================================================================================================*/
  --foldable-header-bg     : transparent;
  --foldable-title-color   : #202020;
  --foldable-body-bg       : #ffffff;
  --foldable-text-color    : #ffffff;
  --foldable-icon-color    : #ffffff;
  --foldable-icon-outline  : #202020;
  --foldable-icon-bg       : transparent;
  --foldable-body-border   : 3px solid #202020;

  /* Content Section Stuff ===================================================================================================*/
  --content-section-font-h2             : var(--font-default);
  --content-section-font-h2-size        : var(--font-h2-size);
  --content-section-color-h2            : var(--color-primary);
  --content-section-font-p              : var(--font-default);
  --content-section-font-p-size         : var(--font-p-size);
  --content-section-color-p             : var(--color-black);
  --content-section-media-border        : var(--default-border);
  --content-section-media-radius        : var(--default-border-radius);

/* Media Modal Cstuff ========================================================================================== */
--media-modal-overlay-bg       : rgba(68, 9, 9, 0.534);
--media-modal-border           : var(--default-border);
--media-modal-border-radius    : var(--default-border-radius);
--media-modal-media-bg         : var(--color-black);
--media-modal-button-size      : 40px;
--media-modal-button-bg        : var(--color-default-background);
--media-modal-button-bg-hover  : var(--color-primary);
--media-modal-button-icon-size : 95%;
--media-modal-close-top        : -50px;
--media-modal-close-right      : 0;
--media-modal-arrow-icon       : var(--color-primary);
--media-modal-arrow-icon-hover : var(--media-modal-button-bg);
--media-modal-arrow-offset     : -60px;

/*Banner stuff ===============================================================================================================*/
--color-banner-button-border             : 6px double var(--color-default-text-color);
--color-banner-button-bg                 : #000000;
--color-banner-button-hover-bg           : var(--color-tertiary);
--color-banner-button-icon               : #ffffff;
--color-banner-text                      : #ffffff; 
}


body {
  margin                : 0;
  background            : var(--color-default-background) ;
  overflow-x            : hidden;
}

.loading-screen {
  display               : flex;
  justify-content       : center;
  align-items           : center;
  height                : 100vh;
  background-color      : #111;
  color                 : #fff;
  font-size             : 24px;
}

.app-container {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  min-height            : 100vh;
  box-sizing            : border-box;
}

.content-wrapper {
  flex                  : 1;
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  width                 : 100%;
  margin-bottom         : 140px;
}

.footer-container {
  width                 : 100%;
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  margin-top            : auto;

}

.main-content {
  width                 : 100%;
  max-width             : 1240px;
  display               : flex;
  flex-direction        : column;  
  
}

.section-title {
  color                 : var(--color-black);
  font-size             : 60px;
  font-family           : var(--font-navbar);
  text-align            : center;
  margin                : 40px 0 20px;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition            : opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity               : 0;
  transform             : translateY(10px);
}

.page-fade-leave-to {
  opacity               : 0;
  transform             : translateY(-10px);
}
</style>