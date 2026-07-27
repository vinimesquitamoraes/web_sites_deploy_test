<script setup>
import { ref,computed } from 'vue'

import { useI18n } from '@/composables/useI18n'

import img_left_arrow   from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow  from '@/assets/svg/triangle-right-12-filled.svg'

const features = computed(() => [
  [
    t('SITE_HOME_FEATURE_1'),
    t('SITE_HOME_FEATURE_2'),
    t('SITE_HOME_FEATURE_3'),
    t('SITE_HOME_FEATURE_4'),
    t('SITE_HOME_FEATURE_5'),
    t('SITE_HOME_FEATURE_6'),
    t('SITE_HOME_FEATURE_7')
 
  ],
])

const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % features.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + features.length) % features.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const { t } = useI18n()

</script>

<template>
  <div class="game-features-container">
    <h2 class="title">GAME FEATURES</h2>

    <div class="features-wrapper">
      <div 
        class="features-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <ul 
          v-for="(list, listIdx) in features" 
          :key="listIdx" 
          class="features-list"
        >
          <li
            v-for="(text, idx) in list"
            :key="idx"
            class="feature-item"
          >
            <span class="bullet"></span>
            <p>{{ text }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="features.length > 1" class="carousel-nav">
      <button
        class="nav-btn"
        @click="prevSlide"
        aria-label="Previous slide"
      >
        <img :src="img_left_arrow" alt="Previous" class="arrow-icon" />
      </button>

      <div class="indicators">
        <span
          v-for="(_, idx) in features"
          :key="idx"
          class="dot"
          :class="{ active: currentIndex === idx }"
          @click="goToSlide(idx)"
        ></span>
      </div>

      <button
        class="nav-btn"
        @click="nextSlide"
        aria-label="Next slide"
      >
        <img :src="img_right_arrow" alt="Next" class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-features-container {
  color          : var(--color-text);

  padding        : 40px;
  width          : 100%;
  box-sizing     : border-box;
  display        : flex;
  flex-direction : column;
}

.title {
  color          : #ff3322;
  font-family    : var(--font-h1);
  font-size      : var(--font-h1-size);
  font-weight    : 900;
  letter-spacing : 1px;
  margin-bottom  : 30px;
}

.features-wrapper {
  overflow   : hidden;
  min-height : 280px;
  width      : 100%;
  
}

.features-track {
  display    : flex;
  width      : 100%;
  transition : transform 0.5s ease-in-out;
}

.features-list {
  list-style     : none;
  padding        : 0;
  margin         : 0;
  display        : flex;
  flex-direction : column;
  gap            : 20px;
  flex           : 0 0 100%;

}

.feature-item {
  display     : flex;
  align-items : flex-start;
  gap         : 15px;
  font-size   : 1.1rem;
  line-height : 1.5;
  font-family : var(--font-p);
  font-size   : var(--font-p-size);
}

.feature-item p {
  margin : 0;
}

.bullet {
  width            : 8px;
  height           : 8px;
  background-color : #8c8c8c;
  border-radius    : 50%;
  margin-top       : 8px;
  flex-shrink      : 0;
}

.carousel-nav {
  display     : flex;
  align-items : center;
  gap         : 15px;
  margin-top  : 40px;
  width       : 100%;
}

.nav-btn {
  background      : #8c8c8c;
  border          : none;
  border-radius   : 8px;
  width           : 45px;
  height          : 45px;
  display         : flex;
  align-items     : center;
  justify-content : center;
  cursor          : pointer;
  transition      : background-color 0.2s ease;
}

.nav-btn:hover {
  background-color : var(--color-primary);
}

.nav-btn:hover .arrow-icon {
  filter : brightness(0) invert(1);
}

.arrow-icon {
  width      : 14px;
  height     : 14px;
  transition : filter 0.2s ease; 
}

.indicators {
  display     : flex;
  gap         : 10px;
  align-items : center;
}

.dot {
  width         : 12px;
  height        : 12px;
  border-radius : 50%;
  background    : #5a5a5a;
  cursor        : pointer;
  transition    : background 0.2s;
}

.dot.active {
  background : #ff9900;
}
</style>