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

    <MusicPlayer 
      playlistId        ="PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63" 
      footerBehavior    ="stay" 
      volumeLayout      = "wheel"
    />

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
  import MusicPlayer    from '@/components/reusables/music_player.vue'
  
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
  
  --color-default-background  : #FFFFFF;

  --font-navbar               : 'Motherish', sans-serif;
  --font-h1                   : 'Motherish', sans-serif;
  --font-h2                   : 'Motherish', sans-serif;
  --font-h3                   : 'Motherish', sans-serif;
  --font-h4                   : 'Motherish', sans-serif;
  --font-body                 : 'Motherish', sans-serif;
  --font-button               : 'Motherish', sans-serif;
  --font-p                    : 'Motherish', sans-serif;
  --font-dropdown             : 'Motherish', sans-serif;;
  
  --font-navbar-size          : 25px;
  --font-h1-size              : 60px;
  --font-h2-size              : 32px;
  --font-h3-size              : 28px;
  --font-h4-size              : 24px;
  --font-body-size            : 16px;
  --font-button-size          : 16px;
  --font-p-size               : 20px;
  --font-dropdown-size        : 20px;

  --font-mobile-navbar        : 'Motherish', sans-serif;
  --font-mobile-h1            : 'Motherish', sans-serif;
  --font-mobile-h2            : 'Motherish', sans-serif;
  --font-mobile-h3            : 'Motherish', sans-serif;
  --font-mobile-h4            : 'Motherish', sans-serif;
  --font-mobile-body          : 'Motherish', sans-serif;
  --font-mobile-button        : 'Motherish', sans-serif;
  --font-mobile-p             : 'Motherish', sans-serif;
  
  --font-mobile-navbar-size   : 60px;
  --font-mobile-h1-size       : 40px;
  --font-mobile-h2-size       : 25px;
  --font-mobile-h3-size       : 20px;
  --font-mobile-h4-size       : 18px;
  --font-mobile-body-size     : 16px;
  --font-mobile-button-size   : 16px;
  --font-mobile-p-size        : 16px;

  --color-custom-button-shadow        : 13px 13px 0px #000000;
  --color-custom-button-active-shadow : 0 2px 0px rgba(0, 0, 0, 1);

  --color-back-to-top-button-shadow        : 13px 13px 0px #000000;
  --color-back-to-top-button-active-shadow : 0 2px 0px rgba(0, 0, 0, 1);

  --font-track-names-size     : 0.8rem;
  --music-player-shadow-size  : 0 15px 0px;

  --music-player-shadow       : 13px 13px 0px #000000;

  --color-music-player-playbt-paused          :#e74c3c; 
  --color-music-player-playbt-paused-pressed  :#c0392b;
  --color-music-player-playbt-playing         :#e68a00;
  --color-music-player-playbt-playing-pressed :#e74c3c;

  --color-bg-main             : #272526;
  --color-bg-dark             : #000000;
  --color-surface             : #361c21;
  --color-border              : #522931;
  --color-accent              : #ef4444;
  --color-accent-light        : #fca5a5;
  --color-text-main           : #f8fafc;
  --color-text-muted          : #f87171;
  --color-white               : #ffffff;

  --color-modal-overlay       : rgba(0, 0, 0, 0.85);
  --color-modal-overlay-border: rgba(214, 98, 98, 0.85);

  --color-navigation-mobile-shadow: 0 10px 20px rgba(0,0,0,0.15);

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

  --color-credits-role        : #e67e22;
  --color-credits-name        : #ffffff;

  --color-custom-button-text       :#000000;
  --color-custom-button-text-hover :#FFFFFF;
  --color-custom-button-hover      : #E50012;
  --color-custom-button-background : #FFFFFF;
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