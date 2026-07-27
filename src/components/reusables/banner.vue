<template>
  <section class="hero-banner">
    
    <div class="hero-image-wrapper">
      <img 
        :src="imageSrc" 
        :alt="imageAlt" 
        class="hero-bg-image"
      />
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content center">
      <slot>
  
        <div class="hero-logo-wrapper">
          <img :src="logoSrc" alt="Game Logo" class="hero-logo-image" />
        </div>

        <p class="hero-subtitle" v-if="subtitle && subtitle.trim() !== ''">{{ subtitle }}</p>
        
        <CustomButton 
          :text="t('SITE_NAV_DOWNLOAD')"
          fontSize = "var(--font-h2-size)"
          to="/download"
        />
      </slot>
    </div>
  </section>
</template>

<script setup>
import { useI18n }  from '@/composables/useI18n'
import CustomButton from './custom_button.vue'
import img_gameLogo from '@/assets/img/logos/Encore_Logo.png'
import img_defaultBanner from '@/assets/img/funny/ninten_Dough.png'

const { t } = useI18n()

const logoSrc = img_gameLogo

defineProps({
  imageSrc: {
    type    : String,
    required: false,
    default : img_defaultBanner
  },
  imageAlt: {
    type    : String,
    required: false,
    default : 'Hero banner background'
  },
  subtitle: {
    type    : String,
    required: false,
    default : '[Default Banner Text]'
  }
})

defineEmits(['cta-click'])
</script>

<style scoped>
.hero-banner {
  position            : relative;
  width               : 100vw;
  height              : 500px;
  left                : 50%;
  right               : 50%;
  margin-left         : -50vw;
  margin-right        : -50vw;
  display             : flex;
  align-items         : center;
  overflow            : hidden;
  box-sizing          : border-box;
}

.hero-image-wrapper {
  position            : absolute;
  top                 : 0;
  left                : 0;
  width               : 100%;
  height              : 100%;
  z-index             : 1;
}

.hero-bg-image {
  width               : 100%;
  height              : 100%;
  object-fit          : cover;
  object-position     : center;
}

.hero-overlay {
  position            : absolute;
  top                 : 0;
  left                : 0;
  width               : 100%;
  height              : 100%;
  background-color    : #000000;
  opacity             : 0.4;
  z-index             : 2;
}

.hero-content {
  position            : relative;
  z-index             : 3;
  width               : 100%;
  max-width           : 1200px;
  margin              : 0 auto;
  padding             : 0 2rem;
  display             : flex;
  flex-direction      : column;
  align-items         : center;
  text-align          : center;
}

.hero-logo-wrapper {
  margin-bottom       : 1.5rem;
}

.hero-logo-image {
  max-width           : 400px;
  width               : 100%;
  height              : auto;
  object-fit          : contain;
}

.hero-subtitle {
  max-width           : 600px;
  margin-bottom       : 2rem;
  opacity             : 0.9;
  font                : var(--font-h2);
  font-size           : var(--font-h2-size);
  color               : var(--color-default-text-color);
}

@media (max-width: 768px) {
  .hero-logo-image {
    max-width         : 250px;
  }
  
  .hero-subtitle {
    font              : var(--font-mobile-h2);
    font-size         : var(--font-mobile-h2-size);
  }
}
</style>