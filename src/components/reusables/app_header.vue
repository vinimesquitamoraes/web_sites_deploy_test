<script setup>
/**
  * @file        app_header.vue
  * @brief       Application header component containing the logo, navigation links, and a responsive custom hamburger menu button.
  * @displayName App Header
*/

import { ref } from 'vue'

import img_gameLogo               from '@/assets/img/logos/Encore_Logo.png'
import img_hamburguer_icon_closed from '@/assets/svg/hamburger-button.svg'
import img_hamburguer_icon_open   from '@/assets/svg/triangle-down-filled.svg'

import NavigationComponent        from './navigation_component.vue'
import CustomButton               from '@/components/reusables/custom_button.vue'

defineProps({
  /** The currently active navigation page name. */
  activePage: {
    type    : String,
    default : 'Home'
  }
})

/**
  * Tracks whether the mobile hamburger menu is open.
  * @private
  */
const isMenuOpen = ref(false)

/**
  * Toggles the mobile menu open/closed state.
  * @private
  */
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header-container">
    <div class="header-inner">
      
      <router-link to="/" class="logo-container">
        <img :src="img_gameLogo" alt="Logo placeholder" class="logo" />
      </router-link>
      
      <CustomButton
        class          = "hamburger-btn"
        text           = ""
        iconSize       = "30px"
        width          = "50px"
        height         = "50px"
        bgColor        = "transparent"
        
        iconColor      = "var(--color-default-text-color)"
        hoverIconColor = "#ffffff"
        border         = "none"
        pressAnimation = "scale"
        :iconSrc       = "isMenuOpen ? img_hamburguer_icon_open : img_hamburguer_icon_closed"
        @click         = "toggleMenu"
        aria-label     = "Toggle Menu"
      />

      <NavigationComponent :activePage="activePage" :isMenuOpen="isMenuOpen" />
      
    </div>
  </header>
</template>

<style scoped>
.header-container {
  width             : 100%;
  height            : 92px;
  display           : flex;
  justify-content   : flex-start;
  align-items       : center;
  flex-direction    : column;
}

.header-inner {
  width             : 100%;
  height            : 100%;
  display           : flex;
  justify-content   : space-between;
  align-items       : center;
  flex-direction    : row;
  padding-right     : 5vw;
  padding-left      : 5vw;
  background        : var(--color-primary);
  box-sizing        : border-box;
  position          : relative;
  z-index           : 20;
}

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

.hamburger-btn {
  display           : none !important;
}

@media (max-width: 900px) {
  .hamburger-btn {
    display         : flex !important;
  }
}
</style>