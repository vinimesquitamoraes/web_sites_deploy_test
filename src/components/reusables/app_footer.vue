<script setup>
import { useI18n } from '@/composables/useI18n'

import img_gameLogo from '@/assets/img/logos/Encore_Logo.png'

import NavigationComponent  from './navigation_component.vue'
import SocialMediaButton    from './social_media_button.vue'

const { t } = useI18n()
</script>

<template>
  <footer class="footer-outer">
    <div class="footer-container">
      <div class="footer-content">
        
        <div class="footer-top-row">
          <router-link to="/" class="logo-container">
            <img :src="img_gameLogo" alt="Logo placeholder" class="logo" />
          </router-link>

          <NavigationComponent :showLanguageDropdown="false" />

          <div class="footer-socials">
            <SocialMediaButton platform="twitter" variant="white" hoverVariant="colored" />
            <SocialMediaButton platform="discord" variant="white" hoverVariant="colored" />
            <SocialMediaButton platform="bluesky" variant="white" hoverVariant="colored" />
            <SocialMediaButton platform="github"  variant="white" hoverVariant="colored" />
          </div>
        </div>

      </div>

      <div class="footer-bottom-section">
        <div class="footer-divider"></div>
        <p class="footer-disclaimer">
          {{ t('SITE_FOOTER_DISCLAIMER') }}
        </p>
        <p class="footer-framework">
          {{ t('SITE_FOOTER_FRAMEWORK') }}
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue</a>
        </p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.logo-container {
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : row;
  gap               : 10px;
}

.logo {
  display           : block;
  max-height        : 50px;
}


.footer-outer {
  width             : 100%;
  max-width         : 1440px;
  display           : flex;
  justify-content   : flex-end;
  align-items       : center;
  flex-direction    : column;
  gap               : 10px;
  padding           : 0 100px;
  box-sizing        : border-box;
}

.footer-container {
  width                   : 100%;
  display                 : flex;
  justify-content         : flex-start;
  align-items             : flex-start;
  flex-direction          : column;
  gap                     : 50px;
  padding                 : 55px 60px 50px 60px;
  background              : var(--color-primary);
  border-top-left-radius  : 45px;
  border-top-right-radius : 45px;
  box-sizing              : border-box;
}

.footer-content {
  width             : 100%;
  display           : flex;
  justify-content   : flex-start;
  align-items       : flex-start;
  flex-direction    : column;
  gap               : 66px;
}

.footer-top-row {
  width             : 100%;
  display           : flex;
  justify-content   : space-between;
  align-items       : center;
  flex-direction    : row;
  gap               : 42px;
}

.footer-logo img {
  display           : block;
}

.footer-nav {
  display           : flex;
  justify-content   : center;
  align-items       : center;
  flex-direction    : row;
  gap               : 40px;
  flex              : 1;
}

.footer-link {
  line-height       : 28px;
  text-decoration   : none;
  opacity           : 0.8;
  transition        : opacity 0.2s ease;
}

.footer-link:hover,
.footer-link.router-link-exact-active {
  opacity           : 1;
  font-weight       : bold;
}

.footer-socials {
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : row;
  gap               : 20px;
  flex-wrap         : wrap;
}

.footer-socials img {
  display           : block;
  border-radius     : 8px;
}

.footer-bottom-section {
  width             : 100%;
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : column;
  gap               : 10px
}

.footer-divider {
  width             : 100%;
  height            : 0px;
  border-bottom     : 1px solid #FFFFFF;
}

.footer-disclaimer {
  width             : 100%;
  color             : var(--color-default-text-color);
  font-size         : var(--font-p-size);
  font-family       : var(--font-p);
  line-height       : 28px;
  margin            : 0;
  opacity           : 0.9;
}

.footer-framework {
  width             : 100%;
  color             : var(--color-default-text-color);
  font-family       : var(--font-p);
  font-size         : var(--font-p-size);
  justify-content   : stretch;
  text-align        : center;
}
.footer-framework a {
  color             : #42b883; 
  text-decoration   : none;
  transition        : color 0.3s ease;
}

.footer-framework a:hover {
  color             :var(--color-hover);
}

@media (max-width: 1024px) {
  .footer-outer {
    padding: 0 20px;
  }
  .footer-container {
    padding: 40px 20px;
  }
  .footer-top-row {
    flex-direction: column;
    align-items   : center;
    gap           : 30px;
  }
  .footer-nav {
    flex-direction: column;
    gap           : 20px;
  }

  .footer-socials {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-socials {
    gap: 12px;
    justify-content: center;
  }
}
</style>
