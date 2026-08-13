<template>
  <div class="gallery-container" tabindex="-1">
    <h2 class="gallery-title">{{ t('SITE_HOME_GALLERY') }}</h2>

    <div class="carousel-main-row">
      <button 
        class="nav-arrow left" 
        @click="prevSlide(true)" 
        aria-label="Previous Slide"
      >
        <img :src="img_left_arrow" alt="Previous" class="arrow-icon" />
      </button>

      <div 
        class="main-viewport" 
        tabindex="-1"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div 
          class="slides-track" 
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="(slide, index) in slides" 
            :key="slide.id" 
            class="slide-item"
            tabindex="-1"
          >
            <img 
              :src="slide.isGif && index === currentIndex ? slide.img : (slide.staticFrame || slide.img)" 
              alt="Gallery Slide Image" 
              class="slide-img clickable" 
              @click="openModal(index)"
            />
          </div>
        </div>

        <div class="pagination-dots">
          <span 
            v-for="(slide, index) in slides" 
            :key="slide.id" 
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="selectSlide(index)"
          ></span>
        </div>
      </div>

      <button 
        class="nav-arrow right" 
        @click="nextSlide(true)" 
        aria-label="Next Slide"
      >
        <img :src="img_right_arrow" alt="Next" class="arrow-icon" />
      </button>
    </div>

    <div class="timer-bar-wrapper" v-if="!isModalOpen">
      <div 
        class="timer-bar" 
        :key="timerKey" 
        :style="{ animationDuration: `${props.intervalTime}ms` }"
      ></div>
    </div>

    <div class="thumbnails-container">
      <button 
        class="thumb-arrow left" 
        @click="scrollThumbnails('left')" 
        aria-label="Previous Thumbnails"
      >
        <img :src="img_left_arrow" alt="Previous" class="arrow-icon" />
      </button>
      
      <div class="thumbnails-track-wrapper">
        <div class="thumbnails-track" ref="thumbnailsTrackRef">
          <div 
            v-for="(slide, index) in slides" 
            :key="slide.id" 
            class="thumbnail-item"
            :class="{ 'thumb-active': index === currentIndex }"
            @click="selectSlide(index)"
          >
            <img 
              :src="slide.staticFrame || slide.thumb" 
              alt="Thumbnail Preview" 
              class="thumb-img" 
            />
            <div class="red-tint-overlay"></div>
          </div>
        </div>
      </div>

      <button 
        class="thumb-arrow right" 
        @click="scrollThumbnails('right')" 
        aria-label="Next Thumbnails"
      >
        <img :src="img_right_arrow" alt="Next" class="arrow-icon" />
      </button>
    </div>

    <MediaModal 
      :is-open="isModalOpen" 
      :media-item="currentModalMediaItem" 
      @close="closeModal" 
      @next="nextSlide(true)"
      @prev="prevSlide(true)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n }    from '@/composables/useI18n'

import MediaModal from './media_modal.vue'

import img_left_arrow   from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow  from '@/assets/svg/triangle-right-12-filled.svg'

const { t } = useI18n()

const props = defineProps({
  intervalTime: {
    type: Number,
    default: 1000
  },
  imageModules: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const slides = ref(
  Object.values(props.imageModules).map((url, index) => ({
    id: index + 1,
    img: url,
    thumb: url,
    isGif: url.toLowerCase().endsWith('.gif'),
    staticFrame: null
  }))
)

const currentIndex = ref(0)
const isModalOpen = ref(false)
const thumbnailsTrackRef = ref(null)
const timerKey = ref(0)
let slideInterval = null

const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 40
  if (touchStartX.value - touchEndX.value > swipeThreshold) {
    nextSlide(true)
  } else if (touchEndX.value - touchStartX.value > swipeThreshold) {
    prevSlide(true)
  }
}

const currentModalMediaItem = computed(() => {
  if (slides.value.length === 0) return { type: 'image', src: '' }
  return {
    type: 'image',
    src: slides.value[currentIndex.value].img,
    alt: `Gallery Image ${currentIndex.value + 1}`
  }
})

const captureFirstFrame = (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => resolve(url)
  })
}

const resetTimer = () => {
  if (slideInterval) clearInterval(slideInterval)
  timerKey.value++
  
  slideInterval = setInterval(() => {
    if (!isModalOpen.value && slides.value.length > 0) {
      nextSlide(false)
    }
  }, props.intervalTime)
}

const nextSlide = (isUserAction = true) => {
  if (slides.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
  if (isUserAction) resetTimer()
}

const prevSlide = (isUserAction = true) => {
  if (slides.value.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
  if (isUserAction) resetTimer()
}

const selectSlide = (index) => {
  if (currentIndex.value === index) {
    resetTimer()
  } else {
    currentIndex.value = index
  }
}

const scrollThumbnails = (direction) => {
  if (!thumbnailsTrackRef.value) return
  const scrollAmount = thumbnailsTrackRef.value.clientWidth
  thumbnailsTrackRef.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
  resetTimer()
}

watch(currentIndex, (newIndex) => {
  resetTimer()
  if (!thumbnailsTrackRef.value) return
  const track = thumbnailsTrackRef.value
  const activeItem = track.children[newIndex]
  if (activeItem) {
    const trackRect = track.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    if (itemRect.left < trackRect.left || itemRect.right > trackRect.right) {
      const scrollLeftTarget = activeItem.offsetLeft - (track.clientWidth / 2) + (activeItem.clientWidth / 2)
      track.scrollTo({
        left: scrollLeftTarget,
        behavior: 'smooth'
      })
    }
  }
})

const openModal = (index) => {
  currentIndex.value = index
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
  resetTimer()
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
  resetTimer()
}

onMounted(async () => {
  resetTimer()
  for (let slide of slides.value) {
    if (slide.isGif) {
      slide.staticFrame = await captureFirstFrame(slide.img)
    }
  }
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.gallery-container {
  width          : 100%;
  max-width      : 1240px;
  height         : auto;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  gap            : 15px;
  padding        : 0 15px;
  box-sizing     : border-box;
  margin         : 0 auto;
}

.gallery-title {
  width       : 100%;
  margin      : 0 0 10px 0;
  text-align  : center;
  color       : var(--gallery-title-color);
  font-size   : var(--gallery-title-size);
  font-family : var(--gallery-title-font);
}

.carousel-main-row {
  width       : 100%;
  display     : flex;
  align-items : center;
  gap         : 12px;
  box-sizing  : border-box;
}

.main-viewport {
  flex          : 1;
  aspect-ratio  : 16 / 9;
  max-height    : 611px;
  background    : var(--gallery-viewport-bg);
  overflow      : hidden;
  position      : relative;
  display       : flex;
  align-items   : center;
  border-radius : 14px;
  border        : 3px solid var(--gallery-border-color);
  box-shadow    : var(--gallery-viewport-shadow);
  touch-action  : pan-y;
}

.slides-track {
  display    : flex;
  width      : 100%;
  height     : 100%;
  transition : transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-item {
  min-width   : 100%;
  height      : 100%;
  flex-shrink : 0;
  overflow    : hidden;
}

.slide-img {
  width         : 100%;
  height        : 100%;
  object-fit    : cover;
  display       : block;
  border-radius : inherit;
}

.slide-img.clickable {
  cursor: zoom-in;
}

.timer-bar-wrapper {
  width         : 100%;
  height        : 4px;
  background    : var(--gallery-timer-bg);
  border-radius : 2px;
  overflow      : hidden;
}

.timer-bar {
  height     : 100%;
  background : var(--gallery-accent-color);
  animation  : progress-anim linear infinite;
}

@keyframes progress-anim {
  0% { width: 0%; }
  100% { width: 100%; }
}

.nav-arrow,
.thumb-arrow {
  position        : relative;
  background      : var(--gallery-arrow-bg);
  border          : 3px solid var(--gallery-border-color);
  border-radius   : 12px;
  padding         : 10px;
  cursor          : pointer;
  z-index         : 10;
  display         : flex;
  align-items     : center;
  justify-content : center;
  outline         : none;
  transition      : transform 0.15s ease, box-shadow 0.15s ease;
  flex-shrink     : 0;
  min-width       : 42px;
  min-height      : 42px;
  box-sizing      : border-box;
}

.nav-arrow.right,
.thumb-arrow.right {
  box-shadow: var(--gallery-arrow-shadow-right);
}

.nav-arrow.right:hover,
.thumb-arrow.right:hover {
  transform : translate(2px, 2px);
  box-shadow: var(--gallery-arrow-shadow-right-hover);
}

.nav-arrow.right:active,
.thumb-arrow.right:active {
  transform : translate(4px, 4px);
  box-shadow: var(--gallery-arrow-shadow-right-active);
}

.nav-arrow.left,
.thumb-arrow.left {
  box-shadow: var(--gallery-arrow-shadow-left);
}

.nav-arrow.left:hover,
.thumb-arrow.left:hover {
  transform : translate(-2px, 2px);
  box-shadow: var(--gallery-arrow-shadow-left-hover);
}

.nav-arrow.left:active,
.thumb-arrow.left:active {
  transform : translate(-4px, 4px);
  box-shadow: var(--gallery-arrow-shadow-left-active);
}

.arrow-icon {
  width          : 20px;
  height         : 20px;
  object-fit     : contain;
  display        : block;
  pointer-events : none; 
  filter         : var(--gallery-arrow-icon-filter);
}

.pagination-dots {
  position  : absolute;
  bottom    : 12px;
  left      : 50%;
  transform : translateX(-50%);
  display   : flex;
  gap       : 6px;
  z-index   : 10;
}

.dot {
  width         : 8px;
  height        : 8px;
  border-radius : 50%;
  background    : var(--gallery-dot-bg);
  border        : var(--gallery-dot-border);
  cursor        : pointer;
  transition    : background 0.2s, transform 0.2s;
}

.dot.active {
  background : var(--gallery-accent-color);
  transform  : scale(1.25);
}

.thumbnails-container {
  width           : 100%;
  display         : flex;
  align-items     : center;
  justify-content : space-between;
  gap             : 12px;
  position        : relative;
  padding         : 5px 0 0 0;
  box-sizing      : border-box;
}

.thumbnails-track-wrapper {
  position : relative;
  flex     : 1;
  overflow : hidden;
}

.thumbnails-track {
  display         : flex;
  gap             : 10px;
  width           : 100%;
  overflow-x      : auto;
  scroll-behavior : smooth;
  scrollbar-width : none;
  padding         : 4px 4px 6px 2px;
  box-sizing      : border-box;
}

.thumbnails-track::-webkit-scrollbar {
  display : none;
}

.thumbnail-item {
  position        : relative;
  flex            : 0 0 calc(20% - 8px);
  aspect-ratio    : 16 / 9;
  opacity         : 0.75;
  cursor          : pointer;
  transition      : opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  overflow        : hidden;
  box-sizing      : border-box;
  border-radius   : 8px;
  border          : 2px solid var(--gallery-border-color);
  box-shadow      : var(--gallery-thumb-shadow);
  background      : var(--gallery-thumb-bg);
}

.red-tint-overlay {
  position         : absolute;
  top              : 0;
  left             : 0;
  width            : 100%;
  height           : 100%;
  background-color : var(--gallery-thumb-tint-bg);
  pointer-events   : none;
  opacity          : 0;
  transition       : opacity 0.2s ease;
}

.thumbnail-item:hover {
  opacity   : 1;
  transform : translate(-1px, -1px);
  box-shadow: var(--gallery-thumb-shadow-hover);
}

.thumbnail-item.thumb-active {
  opacity   : 1;
  border    : 3px solid var(--gallery-accent-color);
  box-shadow: var(--gallery-thumb-shadow-active);
}

.thumbnail-item.thumb-active .red-tint-overlay {
  opacity: 1;
}

.thumb-img {
  width      : 100%;
  height     : 100%;
  object-fit : cover;
  display    : block;
  transition : filter 0.2s ease;
}

.thumbnail-item.thumb-active .thumb-img {
  filter: grayscale(100%);
}

@media (max-width: 1024px) {
  .thumbnail-item {
    flex: 0 0 calc(25% - 8px);
  }
}

@media (max-width: 768px) {
  .gallery-container {
    padding : 0 10px;
    gap     : 10px;
  }

  .carousel-main-row {
    gap: 8px;
  }

  .main-viewport {
    border-width  : 2px;
    box-shadow    : var(--gallery-viewport-shadow-mobile, 4px 4px 0px #000000);
    border-radius : 10px;
  }

  .nav-arrow,
  .thumb-arrow {
    padding       : 8px;
    min-width     : 36px;
    min-height    : 36px;
    border-width  : 2px;
    border-radius : 8px;
  }

  .arrow-icon {
    width  : 16px;
    height : 16px;
  }

  .thumbnail-item {
    flex         : 0 0 calc(33.333% - 7px);
    border-width : 2px;
    box-shadow   : var(--gallery-thumb-shadow-mobile, 2px 2px 0px #000000);
  }
  
  .thumbnail-item.thumb-active {
    border-width : 2px;
    box-shadow   : var(--gallery-thumb-shadow-mobile-active, 2px 2px 0px #E50012);
  }
}

@media (max-width: 480px) {
  .carousel-main-row {
    gap: 4px;
  }

  .thumbnails-container {
    gap: 6px;
  }

  .nav-arrow,
  .thumb-arrow {
    padding    : 6px;
    min-width  : 30px;
    min-height : 30px;
  }

  .arrow-icon {
    width  : 14px;
    height : 14px;
  }

  .thumbnail-item {
    flex: 0 0 calc(50% - 5px);
  }

  .pagination-dots {
    bottom: 8px;
  }

  .dot {
    width  : 6px;
    height : 6px;
  }
}
</style>