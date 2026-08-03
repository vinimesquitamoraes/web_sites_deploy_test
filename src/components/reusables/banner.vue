<template>
  <section class="hero-banner">
    <div class="hero-image-wrapper">
      <transition name="bg-fade">
        <div 
          class="hero-bg-image"
          :key="activeImageSrc"
          :class="(isScrollableActive === true || isScrollableActive === 'true') && activeScrollDirection !== 'none' ? `scroll-${activeScrollDirection}` : ''"
          :style="{ backgroundImage: `url(${activeImageSrc})` }"
          :aria-label="imageAlt"
          role="img"
        ></div>
      </transition>
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content center">
      <slot>
        <div class="hero-logo-wrapper" v-if="showLogo">
          <img :src="logoSrc" alt="Game Logo" class="hero-logo-image" />
        </div>

        <p class="hero-subtitle" v-if="subtitle && subtitle.trim() !== ''">{{ subtitle }}</p>
        
        <CustomButton 
          v-if="showCtaButton"
          :text="ctaText || t('SITE_NAV_DOWNLOAD')"
          fontSize="var(--font-h2-size)"
          :to="ctaLink"
          @click="$emit('cta-click')"
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
import CustomButton from './custom_button.vue'
import img_gameLogo from '@/assets/img/logos/Encore_Logo.png'
import img_defaultBanner from '@/assets/img/funny/ninten_Dough.png'

const { t } = useI18n()

const logoSrc = img_gameLogo

const props = defineProps({
  imageSrc: {
    type    : String,
    required: false,
    default : ''
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
  },
  sessionKey: {
    type    : String,
    required: false,
    default : ''
  },
  alternativeImages: {
    type    : Array,
    required: false,
    default : () => []
  },
  alternativeScrollDirection: {
    type    : String,
    required: false,
    default : 'both'
  },
  imageChangeInterval: {
    type    : Number,
    required: false,
    default : 25000
  },
  showLogo: {
    type    : Boolean,
    required: false,
    default : true
  },
  showCtaButton: {
    type    : Boolean,
    required: false,
    default : true
  },
  ctaText: {
    type    : String,
    required: false,
    default : ''
  },
  ctaLink: {
    type    : String,
    required: false,
    default : '/download'
  }
})

const getRandomAlternative = () => {
  if (props.alternativeImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * props.alternativeImages.length)
    return props.alternativeImages[randomIndex]
  }
  return undefined
}

const isSessionActive = ref(
  props.sessionKey ? sessionStorage.getItem(props.sessionKey) === 'true' : false
)

const randomAlternativeImage = ref(getRandomAlternative())
const timerKey = ref(0)

const checkSessionState = () => {
  if (!props.sessionKey) return
  const latestValue = sessionStorage.getItem(props.sessionKey) === 'true'
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

const activeImageSrc = computed(() => {
  if (isSessionActive.value && randomAlternativeImage.value) {
    return randomAlternativeImage.value
  }
  return props.imageSrc || img_defaultBanner
})

const isScrollableActive = computed(() => {
  if (isSessionActive.value) {
    return true
  }
  return props.isScrollable
})

const activeScrollDirection = computed(() => {
  if (isSessionActive.value) {
    return props.alternativeScrollDirection
  }
  return props.scrollDirection
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

.timer-bar-wrapper {
  position            : absolute;
  bottom              : 0;
  left                : 0;
  width               : 100%;
  height              : 6px;
  background          : rgba(0, 0, 0, 0.5);
  z-index             : 10;
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
  .hero-logo-image {
    max-width         : 250px;
  }
  
  .hero-subtitle {
    font              : var(--font-mobile-h2);
    font-size         : var(--font-mobile-h2-size);
  }
}
</style>