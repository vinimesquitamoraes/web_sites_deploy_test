<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import MediaModal from './media_modal.vue'

import img_left_arrow   from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow  from '@/assets/svg/triangle-right-12-filled.svg'

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

<template>
  <div class="gallery-container" tabindex="-1">
    <p class="gallery-title">Gallery</p>

    <div class="main-viewport" tabindex="-1">
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

      <button class="nav-arrow left" @click="prevSlide(true)" aria-label="Previous Slide">
        <img :src="img_left_arrow" alt="Previous" class="arrow-icon" />
      </button>
      <button class="nav-arrow right" @click="nextSlide(true)" aria-label="Next Slide">
        <img :src="img_right_arrow" alt="Next" class="arrow-icon" />
      </button>

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

    <div class="timer-bar-wrapper" v-if="!isModalOpen">
      <div 
        class="timer-bar" 
        :key="timerKey" 
        :style="{ animationDuration: `${props.intervalTime}ms` }"
      ></div>
    </div>

    <div class="thumbnails-container">
      <button class="thumb-arrow left" @click="scrollThumbnails('left')" aria-label="Previous Thumbnails">
        <img :src="img_left_arrow" alt="Previous" class="arrow-icon" />
      </button>
      
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
        </div>
      </div>

      <button class="thumb-arrow right" @click="scrollThumbnails('right')" aria-label="Next Thumbnails">
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

<style scoped>
.gallery-container {
  width          : 100%;
  max-width      : 1240px;
  height         : auto;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  gap            : 15px;
  margin         : 0 auto;
  padding        : 0 15px;
  box-sizing     : border-box;
}

.gallery-title {
  width       : 100%;
  color       : #FFFFFF;
  font-size   : clamp(28px, 4vw, 40px);
  font-family : 'Gothic A1', sans-serif;
  text-align  : center;
  font-weight : 500;
  margin      : 0;
}

.main-viewport {
  width         : 100%;
  aspect-ratio  : 16 / 9;
  max-height    : 611px;
  background    : #ffffff;
  overflow      : hidden;
  position      : relative;
  display       : flex;
  align-items   : center;
  border-radius : 8px;
}

.slides-track {
  display    : flex;
  width      : 100%;
  height     : 100%;
  transition : transform 0.4s ease-in-out;
}

.slide-item {
  min-width  : 100%;
  height     : 100%;
  flex-shrink: 0;
}

.slide-img {
  width     : 100%;
  height    : 100%;
  object-fit: contain;
  display   : block;
}

.slide-img.clickable {
  cursor: zoom-in;
}

.timer-bar-wrapper {
  width         : 100%;
  height        : 4px;
  background    : rgba(255, 255, 255, 0.1);
  border-radius : 2px;
  overflow      : hidden;
}

.timer-bar {
  height     : 100%;
  background : #E50012;
  animation  : progress-anim linear infinite;
}

@keyframes progress-anim {
  0% { width: 0%; }
  100% { width: 100%; }
}

.nav-arrow {
  position         : absolute;
  top              : 50%;
  transform        : translateY(-50%);
  background       : rgba(0, 0, 0, 0.5);
  border           : none;
  padding          : 12px 10px;
  cursor           : pointer;
  z-index          : 10;
  display          : flex;
  align-items      : center;
  justify-content  : center;
  transition       : background 0.2s;
  border-radius    : 4px;
}

.arrow-icon {
  width          : 20px;
  height         : 20px;
  object-fit     : contain;
  display        : block;
  pointer-events : none; 
}

.nav-arrow img,
.thumb-arrow img {
  filter         : brightness(0) invert(1); 
}

.nav-arrow:hover {
  background : rgba(0, 0, 0, 0.8);
}

.nav-arrow.left { 
  left : 10px; 
}

.nav-arrow.right { 
  right : 10px; 
}

.pagination-dots {
  position  : absolute;
  bottom    : 15px;
  left      : 50%;
  transform : translateX(-50%);
  display   : flex;
  gap       : 8px;
  z-index   : 10;
}

.dot {
  width         : 10px;
  height        : 10px;
  border-radius : 50%;
  background    : rgba(255, 255, 255, 0.5);
  cursor        : pointer;
  transition    : background 0.2s;
}

.dot.active {
  background : #FFFFFF;
}

.thumbnails-container {
  width           : 100%;
  max-width       : 1240px;
  display         : flex;
  align-items     : stretch;
  justify-content : space-between;
  gap             : 10px;
  position        : relative;
}

.thumbnails-track {
  display         : flex;
  gap             : 10px;
  flex            : 1;
  overflow-x      : auto;
  scroll-behavior : smooth;
  scrollbar-width : none;
}

.thumbnails-track::-webkit-scrollbar {
  display         : none;
}

.thumbnail-item {
  flex            : 0 0 calc(20% - 8px);
  aspect-ratio    : 16 / 9;
  opacity         : 0.5;
  cursor          : pointer;
  transition      : opacity 0.2s, transform 0.2s;
  overflow        : hidden;
  box-sizing      : border-box;
  border-radius   : 4px;
  background      : #ffffff;
}

@media (max-width: 1024px) {
  .thumbnail-item {
    flex: 0 0 calc(25% - 8px);
  }
}

@media (max-width: 768px) {
  .thumbnail-item {
    flex: 0 0 calc(33.333% - 7px);
  }
  .arrow-icon {
    width: 16px;
    height: 16px;
  }
}

.thumbnail-item:hover {
  opacity : 0.8;
}

.thumbnail-item.thumb-active {
  opacity : 1;
  border  : 2px solid #E50012;
}

.thumb-img {
  width     : 100%;
  height    : 100%;
  object-fit: contain;
  display   : block;
}

.thumb-arrow {
  background     : #A71717;
  border         : none;
  padding        : 0 10px;
  cursor         : pointer;
  z-index        : 5;
  display        : flex;
  align-items    : center;
  justify-content: center;
  transition     : background 0.2s;
  border-radius  : 4px;
}

.thumb-arrow:hover {
  background : #c81d1d;
}
</style>