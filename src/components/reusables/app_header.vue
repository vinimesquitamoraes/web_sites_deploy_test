<script setup>
  import { ref } from 'vue'

  import img_gameLogo               from '@/assets/img/logos/Encore_Logo.png'
  import img_hamburguer_icon_closed from '@/assets/svg/hamburger-button.svg'
  import img_hamburguer_icon_open   from '@/assets/svg/triangle-down-filled.svg'

  import NavigationComponent        from './navigation_component.vue'

  defineProps({
    activePage: {
      type    : String,
      default : 'Home'
    }
  })

  const isMenuOpen = ref(false)
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
      
      <button class="hamburger-btn" @click="toggleMenu" aria-label="Toggle Menu">
        <img 
          :src  ="isMenuOpen ? img_hamburguer_icon_open : img_hamburguer_icon_closed" 
          alt   ="Hamburguer Menu Icon" 
          class ="hamburger-icon" 
        />
      </button>

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
  z-index           : 100;
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
  display           : none;
  background        : none;
  border            : none;
  cursor            : pointer;
  flex-direction    : column;
  justify-content   : space-between;
  width             : 30px;
  height            : 21px;
  padding           : 0;
}

.hamburger-icon {
  width             : 30px;
  height            : 30px;
  display           : block;
  
}

@media (max-width: 900px) {
  .hamburger-btn {
    display         : flex;
  }
}
</style>