<template>
  <section class="hero-banner">
    <div class="hero-image-wrapper">
      <div 
        class="hero-bg-image"
        :class="(isScrollable === true || isScrollable === 'true') && scrollDirection !== 'none' ? `scroll-${scrollDirection}` : ''"
        :style="{ backgroundImage: `url(${imageSrc})` }"
        :aria-label="imageAlt"
        role="img"
      ></div>
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
          fontSize="var(--font-h2-size)"
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
  },
  isScrollable: {
    type    : [Boolean, String],
    required: false,
    default : false
  },
  scrollDirection: {
    type    : String,
    required: false,
    default : 'horizontal',
    validator: (value) => ['none', 'horizontal', 'vertical', 'both'].includes(value)
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
  background-size     : cover;
  background-position : center;
  background-repeat   : no-repeat;
}

.scroll-horizontal {
  background-size     : auto 100%;
  background-position : 0 center;
  background-repeat   : repeat-x; 
  animation           : scroll-horizontal 30s linear infinite;
}

.scroll-vertical {
  background-size     : 100% auto;
  background-position : center 0;
  background-repeat   : repeat-y; 
  animation           : scroll-vertical 30s linear infinite;
}

.scroll-both {
  background-size     : auto;
  background-position : 0 0;
  background-repeat   : repeat; 
  animation           : scroll-both 30s linear infinite;
}

@keyframes scroll-horizontal {
  0% {
    background-position: 0 center;
  }
  100% {
    background-position: -2000px center; 
  }
}

@keyframes scroll-vertical {
  0% {
    background-position: center 0;
  }
  100% {
    background-position: center -2000px; 
  }
}

@keyframes scroll-both {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -2000px -2000px; 
  }
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