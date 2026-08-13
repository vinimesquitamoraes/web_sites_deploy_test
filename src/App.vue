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

    <div ref="footerRef" class="footer-container">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useI18n }        from '@/composables/useI18n'

  import AppHeader      from '@/components/reusables/app_header.vue'
  import AppFooter      from '@/components/reusables/app_footer.vue'
  import BackToTop      from '@/components/reusables/back_to_top_button.vue'
  
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
  --color-primary             : #E50012;
  --color-h1                  : #E50012;
  --color-h2                  : #E50012;
  --color-default-text-color  : #FFFFFF;
  --color-black               : #000000;
  --color-bg-gray             : #a3a0a0;
  --color-place-holder-green  : #25D366;
  --color-hover               : #fdd268;
  --color-hyperlinks          : #fdd268;
  --color-default-border      : 3px solid #000000;
  --color-default-background  : #FFFFFF;

  --font-navbar               : 'Motherish', sans-serif;
  --font-h1                   : 'Motherish', sans-serif;
  --font-h2                   : 'Motherish', sans-serif;
  --font-h3                   : 'Motherish', sans-serif;
  --font-h4                   : 'Motherish', sans-serif;
  --font-body                 : 'Motherish', sans-serif;
  --font-button               : 'Motherish', sans-serif;
  --font-p                    : 'Motherish', sans-serif;
  --font-dropdown             : 'Motherish', sans-serif;
  --font-credits-title        : 'Motherish', sans-serif;
  --font-credits-role         : 'Motherish', sans-serif;
  --font-credits-name         : 'Motherish', sans-serif;

  --font-navbar-size          : 25px;
  --font-h1-size              : 60px;
  --font-h2-size              : 32px;
  --font-h3-size              : 28px;
  --font-h4-size              : 24px;
  --font-p-size               : 20px;
  --font-body-size            : 16px;
  --font-button-size          : 16px;
  --font-dropdown-size        : 20px;
  
  --font-credits-title-size   : 24px;
  --font-credits-role-size    : 20px;
  --font-credits-name-size    : 16px;

  --font-mobile-navbar        : 'Motherish', sans-serif;
  --font-mobile-h1            : 'Motherish', sans-serif;
  --font-mobile-h2            : 'Motherish', sans-serif;
  --font-mobile-h3            : 'Motherish', sans-serif;
  --font-mobile-h4            : 'Motherish', sans-serif;
  --font-mobile-body          : 'Motherish', sans-serif;
  --font-mobile-button        : 'Motherish', sans-serif;
  --font-mobile-p             : 'Motherish', sans-serif;
  
  --font-mobile-navbar-size   : 60px;
  --font-mobile-h1-size       : 60px;
  --font-mobile-h2-size       : 25px;
  --font-mobile-h3-size       : 20px;
  --font-mobile-h4-size       : 18px;
  --font-mobile-body-size     : 16px;
  --font-mobile-button-size   : 16px;
  --font-mobile-p-size        : 16px;

  /* Custom Button Stuff ===================================================================================================*/
  --color-custom-button-shadow        : 13px 13px 0px #000000;
  --color-custom-button-active-shadow : 0 2px 0px rgba(0, 0, 0, 1);

  /* Back to Top Button Stuff ==============================================================================================*/
  --color-back-to-top-button-shadow        : 13px 13px 0px #000000;
  --color-back-to-top-button-active-shadow : 0 2px 0px rgba(0, 0, 0, 1);

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

  --character-card-separator-color  : #ffffff;
  --character-card-separator-height : 3px;

  /* Music Player Stuff ====================================================================================================*/
  --font-track-names-size     : 0.8rem;
  --music-player-shadow-size  : 0 15px 0px;

  --music-player-shadow       : 13px 13px 0px #000000;

  --color-music-player-playbt-paused                 :#e74c3c; 
  --color-music-player-playbt-paused-pressed         :#c0392b;
  --color-music-player-playbt-playing                :#e68a00;
  --color-music-player-playbt-playing-pressed        :#e74c3c;
  --color-music-player-pagination-btn-shadow         : 3px 3px 0px #000000;
  --color-music-player-pagination-btn-active-shadow  : 3px 3px 0px #000000;

  --color-bg-main             : #272526;
  --color-bg-dark             : #000000;
  --color-surface             : #361c21;
  --color-border              : #522931;
  --color-accent              : #ef4444;
  --color-accent-light        : #fca5a5;
  --color-text-main           : #f8fafc;
  --color-text-muted          : #f87171;
  --color-white               : #ffffff;

  --color-navigation-mobile-shadow: 0 10px 20px rgba(0,0,0,0.15);

  /* Toaster Stuff ========================================================================================================= */
  --toaster-bg-main           : #ffffff;
  --toaster-border-color      : #000000;
  --toaster-shadow            : 4px 4px 0px #000000;
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

  /* Custom Button Stuff =================================================================================================== */
  --color-custom-button-text       :#000000;
  --color-custom-button-text-hover :#FFFFFF;
  --color-custom-button-hover      : #E50012;
  --color-custom-button-background : #FFFFFF;
  
  /* Modal Stuff ========================================================================================================== */
  --color-modal-overlay       : rgba(0, 0, 0, 0.85);
  --color-modal-overlay-border: rgba(214, 98, 98, 0.85);
  --color-modal-arrow             : #ffffff;  
  --color-modal-arrow-hover       : #E50012;
  
  /* Credits Stuff ========================================================================================================= */
  --color-credits-background  : #000000;
  --color-credits-title       : #e67e22; 
  --color-credits-role        : #e67e22;
  --color-credits-name        : #ffffff;

  /* Operational System Icons Stuff ======================================================================================== */
  --color-operational-system-icons-color       : #E50012;
  --color-operational-system-icons-hover-color : #E50012;

  /* Itch.io Button Stuff ================================================================================================== */
  --color-itchio-button-color            : #ffffff;
  --color-itchio-button-hover-color      : #E50012;
  --color-itchio-button-icon-color       : #E50012;
  --color-itchio-button-icon-hover-color : #ffffff;

  /* Requirements Stuff =====================================================================================================*/
  --color-requiriments-key-background           : #E50012;
  --color-requiriments-value-background         : #ffffff;
  --color-requiriments-key-text                 : #ffffff;
  --color-requiriments-value-text               : #000000;
  --color-requiriments-shadow                   : 13px 13px 0px #000000;
  --color-requiriments-container-border         : 3px solid #000000;
  --color-requiriments-key-border-bottom        : 3px solid #000000;
  --color-requiriments-value-border-bottom      : 3px solid #E50012;
  --color-requiriments-mobile-row-border-bottom : 3px solid #E50012;

  /* Dropdown Stuff ======================================================================================================== */
  --color-dropdown-border             : 3px solid #000000;
  --color-dropdown-shadow             : 3px 3px 0px #000000;
  --color-dropdown-hover-shadow       : 4px 4px 0px #000000;
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

  /* Gallery Stuff ========================================================================================================= */
  --gallery-title-color                 : var(--color-h2, #000000);
  --gallery-title-font                  : var(--font-h2, sans-serif);
  --gallery-title-size                  : var(--font-h2-size, 32px);

  --gallery-accent-color                : #E50012;
  --gallery-border-color                : #000000;

  --gallery-viewport-bg                 : #ffffff;
  --gallery-viewport-shadow             : 6px 6px 0px #000000;
  --gallery-viewport-shadow-mobile      : 4px 4px 0px #000000;

  --gallery-timer-bg                    : rgba(0, 0, 0, 0.08);

  --gallery-dot-bg                      : rgba(0, 0, 0, 0.3);
  --gallery-dot-border-color            : #ffffff;
  --gallery-dot-border                  : 1px solid var(--gallery-dot-border-color);

  --gallery-arrow-bg                    : #ffffff;
  --gallery-arrow-icon-filter           : invert(15%) sepia(95%) saturate(6932%) hue-rotate(352deg) brightness(97%) contrast(113%);
  --gallery-arrow-shadow-right          : 4px 4px 0px #000000;
  --gallery-arrow-shadow-right-hover    : 2px 2px 0px #000000;
  --gallery-arrow-shadow-right-active   : 0px 0px 0px #000000;
  --gallery-arrow-shadow-left           : -4px 4px 0px #000000;
  --gallery-arrow-shadow-left-hover     : -2px 2px 0px #000000;
  --gallery-arrow-shadow-left-active    : 0px 0px 0px #000000;

  --gallery-thumb-bg                    : #ffffff;
  --gallery-thumb-tint-bg               : rgba(229, 0, 18, 0.35);
  --gallery-thumb-shadow                : 3px 3px 0px #000000;
  --gallery-thumb-shadow-hover          : 4px 4px 0px #000000;
  --gallery-thumb-shadow-active         : 3px 3px 0px #E50012;
  --gallery-thumb-shadow-mobile         : 2px 2px 0px #000000;
  --gallery-thumb-shadow-mobile-active  : 2px 2px 0px #E50012;

  /* Foldable Stuff ===================================================================================================*/
  --foldable-header-bg     : transparent;
  --foldable-title-color   : #202020;
  --foldable-body-bg       : #ffffff;
  --foldable-text-color    : #ffffff;
  --foldable-icon-color    : #ffffff;
  --foldable-icon-outline  : #202020;
  --foldable-icon-bg       : transparent;
  --foldable-body-border   : 3px solid #202020;
  --foldable-content-shadow: 0px 4px 0px #7a6c86;

  --content-section-font-h2          : 'Motherish', sans-serif;
  --content-section-font-h2-size     : var(--font-h2-size);
  --content-section-color-h2         : #E50012;
  --content-section-font-p           : 'Motherish', sans-serif;
  --content-section-font-p-size      : var(--font-p-size);
  --content-section-color-p          : #1f1f1f;
  --content-section-media-border        : 4px solid#000000;
  --content-section-media-radius        : 24px;
  --content-section-media-shadow        : drop-shadow(10px 10px 0px #000000);
  --content-section-media-shadow-active : drop-shadow(13px 13px 0px #000000);
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