<template>
  <nav class="nav-container" :class="{ 'nav-active': isMenuOpen }">
    <router-link to="/" class="nav-link">
      {{ t('SITE_NAV_HOME') }}
    </router-link>
    
    <router-link to="/about" class="nav-link">
      {{ t('SITE_NAV_ABOUT') }}
    </router-link>

    <router-link to="/faq" class="nav-link">
      {{ t('SITE_NAV_FAQ') }}
    </router-link>

    <router-link to="/credits" class="nav-link">
      {{ t('SITE_NAV_CREDITS') }}
    </router-link>
    
    <router-link to="/download" class="nav-link">
      {{ t('SITE_NAV_DOWNLOAD') }}
    </router-link>

    <CustomLanguageDropdown v-if="showLanguageDropdown" />
  </nav>
</template>


<script setup>
import { useI18n }            from '@/composables/useI18n'
import CustomLanguageDropdown from './custom_lang_dropdown.vue'

defineProps({
  isMenuOpen: {
    type    : Boolean,
    default : false
  },
  showLanguageDropdown: {
    type    : Boolean,
    default : true
  }
})


const { t } = useI18n()
</script>

<style scoped>
.nav-container {
  display           : flex;
  justify-content   : center;
  align-items       : center;
  flex-direction    : row;
  gap               : 40px;
}

.nav-link {
  color             : var(--color-default-text-color);
  font-size         : var(--font-navbar-size);
  font-family       : var(--font-navbar);
  line-height       : 28px;
  cursor            : pointer;
  opacity           : 0.7;
  position          : relative; 
  padding-left      : 0;
  transition        : padding 0.2s ease;
  text-decoration   : none;
}

.nav-link.router-link-exact-active {
  opacity           : 1;
  font-weight       : bold;
  padding-left      : 25px;
  fill:var(--color-place_holder-green);
}

.nav-link.router-link-exact-active::before {
  content             : '';
  position            : absolute;
  left                : 0;
  top                 : 45%;
  transform           : translateY(-50%);
  width               : 18px; 
  height              : 20px; 
  
  background-color    : var(--color-default-text-color); 
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;

  animation         : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

@keyframes choppy-horizontal {
  0% {
    transform: translateY(-50%) translateX(0px);
  }
  100% {
    transform: translateY(-50%) translateX(9px);
  }
}

@media (max-width: 900px) {
  .nav-container {
    position        : absolute;
    top             : 92px;
    left            : 0;
    width           : 100%;
    max-width       : 100vw;        
    box-sizing      : border-box;   
    background      : var(--color-primary);
    flex-direction  : column;
    align-items     : flex-end;     
    gap             : 25px;
    padding         : 0 clamp(20px, 8vw, 40px); 
    max-height      : 0;
    opacity         : 0;
    visibility      : hidden;
    overflow        : hidden;
    transition      : all 0.3s ease-in-out;
    box-shadow      :  var(--color-navigation-mobile-shadow);
  }

  .nav-container.nav-active {
    max-height      : 400px; 
    padding         : 30px clamp(20px, 8vw, 40px);    
    opacity         : 1;
    visibility      : visible;
    overflow-y      : auto;        
  }
}

</style>