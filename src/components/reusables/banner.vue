<template>
  <section class="hero-banner">
    <div class="hero-image-wrapper">
      <transition name="bg-fade">
        <div 
          class       ="hero-bg-image"
          :key        ="activeImageSrc"
          :class      ="(isScrollableActive === true || isScrollableActive === 'true') && activeScrollDirection !== 'none' ? `scroll-${activeScrollDirection}` : ''"
          :style      ="{ backgroundImage: `url(${activeImageSrc})` }"
          :aria-label ="imageAlt"
          role="img"
        ></div>
      </transition>
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content center">
      <!-- 
        @slot content - Custom content slot for replacing or extending the default hero inner content blocks.
      -->
      <slot name="content">
        <div class="hero-logo-wrapper" v-if="showLogo">
          <img :src="logoSrc" alt="Game Logo" class="hero-logo-image" />
        </div>

        <p class="hero-subtitle" v-if="subtitle && subtitle.trim() !== ''">{{ subtitle }}</p>
        
        <CustomButton 
          v-if="showCtaButton"
          :text         ="ctaText || t('SITE_NAV_DOWNLOAD')" 
          :to           ="ctaLink" 
          @click        ="$emit('cta-click')" 
          :icon-src     ="dowload_icon"
          icon-color    ="var(--color-black)"
          icon-size     ="40px"
          icon-position ="left"
          icon-margin   ="0   -5px 0 0"
          text-margin   ="4px 10px 0 0"
          fontSize      ="var(--font-h2-size)" 
          width         ="200px"
          height        ="60px"
          :autoAdaptSize = true
        />
      </slot>
    </div>

    <div class="timer-bar-wrapper" v-if="props.alternativeImages.length > 1 && isScrollableActive">
      <div 
        class="timer-bar" 
        :key="timerKey" 
        :style="{ animationDuration: `${props.imageChangeInterval}ms` }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n }  from '@/composables/useI18n'

import CustomButton from '@/components/reusables/custom_button.vue'

import img_gameLogo       from '@/assets/img/logos/Encore_Logo.png'
import img_defaultBanner  from '@/assets/img/funny/ninten_Dough.png'
import dowload_icon       from '@/assets/svg/download.svg'

/**
  * Hero banner component featuring background image, logo display and a secret directional scrolling animation defined via session variable.
  * 
  * @displayName Hero Banner
  */

const { t } = useI18n()

const logoSrc = img_gameLogo

const props = defineProps({
  /**
    * Default background image source URL.
    */
  imageSrc: {
    type    : String,
    required: false,
    default : ''
  },
  /**
    * Accessibility description text for the background image.
    */
  imageAlt: {
    type    : String,
    required: false,
    default : 'Hero banner background'
  },
  /**
    * Subtitle tha appears below logo.
    */
  subtitle: {
    type    : String,
    required: false,
    default : '[Default Banner Text]'
  },
  /**
    * Determine if scrolling background animations are enabled.
    */
  isScrollable: {
    type    : [Boolean, String],
    required: false,
    default : false
  },
  /**
    * Direction trajectory for background scrolling animation.
    * @values none, horizontal, vertical, both
    */
  scrollDirection: {
    type    : String,
    required: false,
    default : 'horizontal',
    validator: (value) => ['none', 'horizontal', 'vertical', 'both'].includes(value)
  },
  /**
    * Browser session storage lookup key for conditional alternative asset displays.
    */
  sessionKey: {
    type    : String,
    required: false,
    default : ''
  },
  /**
    * List of alternative background images for active session rotation.
    * @default []
    */
  alternativeImages: {
    type    : Array,
    required: false,
    default : () => []
  },
  /**
    * Scroll animation direction when an alternative session state is active.
    */
  alternativeScrollDirection: {
    type    : String,
    required: false,
    default : 'both'
  },
  /**
    * Time interval in milliseconds between background image transitions.
    */
  imageChangeInterval: {
    type    : Number,
    required: false,
    default : 25000
  },
  /**
    * Controls whether the brand logo image container is visible.
    */
  showLogo: {
    type    : Boolean,
    required: false,
    default : true
  },
  /**
    * Controls whether the call-to-action button element is visible.
    */
  showCtaButton: {
    type    : Boolean,
    required: false,
    default : true
  },
  /**
    * Custom text label override string for the call-to-action button.
    */
  ctaText: {
    type    : String,
    required: false,
    default : ''
  },
  /**
    * Target routing link destination path for the call-to-action button.
    */
  ctaLink: {
    type    : String,
    required: false,
    default : '/download'
  }
})

/**
  * Selects a random alternative background image from the configured array.
  * 
  * @returns {string|undefined} The selected alternative image source URL or undefined.
  */
const getRandomAlternative = () => {
  const AlternativeBuilder = {
    hasImages(images) {
      return images.length > 0
    },
    getRandomIndex(length) {
      return Math.floor(Math.random() * length)
    }
  }

  if (AlternativeBuilder.hasImages(props.alternativeImages)) {
    const randomIndex = AlternativeBuilder.getRandomIndex(props.alternativeImages.length)
    return props.alternativeImages[randomIndex]
  }
  return undefined
}

const isSessionActive = ref(
  props.sessionKey ? sessionStorage.getItem(props.sessionKey) === 'true' : false
)

const randomAlternativeImage = ref(getRandomAlternative())
const timerKey = ref(0)

/**
  * Checks and updates the active session state based on session storage value changes.
  */
const checkSessionState = () => {
  const SessionBuilder = {
    isValidKey(key) {
      return Boolean(key)
    },
    getStorageValue(key) {
      return sessionStorage.getItem(key) === 'true'
    }
  }

  if (!SessionBuilder.isValidKey(props.sessionKey)) return
  const latestValue = SessionBuilder.getStorageValue(props.sessionKey)
  if (latestValue !== isSessionActive.value) {
    isSessionActive.value = latestValue
    if (latestValue && props.alternativeImages.length > 0) {
      randomAlternativeImage.value = getRandomAlternative()
      timerKey.value++
    }
  }
}

let intervalId = null
let bgCycleIntervalId = null

onMounted(() => {
  if (props.sessionKey) {
    intervalId = setInterval(checkSessionState, 500)
  }

  if (props.alternativeImages.length > 1) {
    bgCycleIntervalId = setInterval(() => {
      if (isScrollableActive.value) {
        let nextImage = getRandomAlternative()
        
        while (nextImage === randomAlternativeImage.value) {
          nextImage = getRandomAlternative()
        }
        
        randomAlternativeImage.value = nextImage
        timerKey.value++
      }
    }, props.imageChangeInterval)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (bgCycleIntervalId) clearInterval(bgCycleIntervalId)
})

/**
  * Computed property that resolves the current background image URL.
  */
const activeImageSrc = computed(() => {
  const ImageSrcBuilder = {
    buildSource(isActive, altImage, defaultImg, fallbackDefault) {
      if (isActive && altImage) {
        return altImage
      }
      return defaultImg || fallbackDefault
    }
  }

  return ImageSrcBuilder.buildSource(
    isSessionActive.value,
    randomAlternativeImage.value,
    props.imageSrc,
    img_defaultBanner
  )
})

/**
  * Computed property to determine if the background scroll animation is active.
  */
const isScrollableActive = computed(() => {
  const ScrollableBuilder = {
    resolveState(isActive, defaultScrollable) {
      if (isActive) {
        return true
      }
      return defaultScrollable
    }
  }

  return ScrollableBuilder.resolveState(isSessionActive.value, props.isScrollable)
})

/**
  * Computed property that resolves the current active scroll direction style.
  */
const activeScrollDirection = computed(() => {
  const DirectionBuilder = {
    resolveDirection(isActive, altDirection, defaultDirection) {
      if (isActive) {
        return altDirection
      }
      return defaultDirection
    }
  }

  return DirectionBuilder.resolveDirection(
    isSessionActive.value,
    props.alternativeScrollDirection,
    props.scrollDirection
  )
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
  justify-content     : center;
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
  position            : absolute;
  top                 : 0;
  left                : 0;
  width               : 100%;
  height              : 100%;
  background-size     : cover;
  background-position : center;
  background-repeat   : no-repeat;
}

.bg-fade-enter-active,
.bg-fade-leave-active {
  transition          : opacity 1s ease-in-out;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity             : 0;
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
  justify-content     : center;
  text-align          : center;
  box-sizing          : border-box;
  transform           : none !important;
  left                : auto !important;
  right               : auto !important;
}

.hero-logo-wrapper {
  margin-bottom       : 1.5rem;
  display             : flex;
  justify-content     : center;
  width               : 100%;
}

.hero-logo-image {
  max-width           : 400px;
  width               : 100%;
  height              : auto;
  object-fit          : contain;
}

.hero-subtitle {
  text-align          : center !important;
  margin-left         : auto !important;
  margin-right        : auto !important;
  max-width           : min(100%, 800px);
  width               : 100%;
  margin-bottom       : 2rem;
  opacity             : 0.9;
  box-sizing          : border-box;
  display             : block !important;
  word-break          : normal;
  overflow-wrap       : break-word;
  font-family         : var(--font-h2)     !important;
  font-size           : var(--font-h2-size)!important;
  font-weight         : bold;
  color               : var(--color-default-text-color);
}

.timer-bar-wrapper {
  position            : absolute;
  bottom              : 0;
  left                : 0;
  width               : 100%;
  height              : 6px;
  background          : rgba(0, 0, 0, 0.5);
  z-index             : 1;
}

.timer-bar {
  height              : 100%;
  background          : var(--color-primary, #E50012);
  animation           : progress-anim linear infinite;
}

@keyframes progress-anim {
  0% { width: 0%; }
  100% { width: 100%; }
}

@media (max-width: 768px) {
  .hero-content {
    padding           : 0 1rem;
  }

  .hero-logo-image {
    max-width         : 250px;
  }
  
  .hero-subtitle {
    font-family       : var(--font-mobile-h2) !important;
    font-size         : clamp(0.875rem, 3.5vw, var(--font-mobile-h2-size)) !important;
  }
}
</style>