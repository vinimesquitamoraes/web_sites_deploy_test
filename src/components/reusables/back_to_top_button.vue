<template>
  <CustomButton 
    v-show="isVisible && !isHidden"
    class="scroll-top-btn"
    :style="{ bottom: buttonBottom + 'px' }"
    :iconSrc="triangleIcon"
    width     ='var(--back-to-top-button-size)'
    height    ='var(--back-to-top-button-size )'
    iconSize='var(--back-to-top-button-icon-size)'
    iconColor='var(--back-to-top-button-icon-color)'
    iconColorHover='var(--back-to-top-button-icon-color-hover)'
    @click="scrollToTop"
  />
</template>

<script setup>
/**
  * @file        back_to_top_button.vue
  * @brief       A floating back-to-top button component with dynamic footer overlap handling and smooth scrolling behavior.
  * @displayName Back To Top Button
*/

import { ref, onMounted, onUnmounted } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'
import triangleIcon from '@/assets/svg/triangle-up-12-filled.svg'

const props = defineProps({
  /** Defines how the button behaves when overlapping with the page footer ('center', 'stay', 'hide', 'overlap'). */
  footerBehavior: {
    type    : String,
    default : 'stay',
    validator: (value) => ['center', 'stay', 'hide', 'overlap'].includes(value)
  }
})

/**
  * Controls button visibility based on vertical scroll offset.
  * @private
  */
const isVisible = ref(false)

/**
  * Controls button hidden state during footer collision/overlap.
  * @private
  */
const isHidden = ref(false)

/**
  * Dynamic bottom spacing value in pixels.
  * @private
  */
const buttonBottom = ref(30)

/**
  * Handles window scroll events to toggle visibility and check footer overlap.
  * @private
  */
const handleScroll = () => {
  const scrollY = window.scrollY
  isVisible.value = scrollY > 300
  handleFooterOverlap()
}

/**
  * Computes footer bounding rectangles to adjust position when overlapping the footer.
  * @private
  */
const handleFooterOverlap = () => {
  const footerEl = document.querySelector('.footer-container')
  const baseBottom = window.innerWidth <= 768 ? 20 : 30
  
  if (!footerEl) {
    buttonBottom.value = baseBottom
    isHidden.value = false
    return
  }

  const footerRect = footerEl.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const overlap = windowHeight - footerRect.top

  buttonBottom.value = baseBottom
  isHidden.value = false

  if (overlap > 0) {
    switch (props.footerBehavior) {
      case 'overlap':
        break
      case 'stay':
      case 'center':
        buttonBottom.value = overlap + baseBottom
        break
      case 'hide':
        isHidden.value = true
        break
    }
  }
}

/**
  * Smoothly scrolls the window back to the top.
  * @private
  */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  setTimeout(handleFooterOverlap, 50)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
.scroll-top-btn {
  position            : fixed;
  right               : 30px;
  width               : var(--back-to-top-button-size);
  height              : var(--back-to-top-button-size);
  background-color    : var(--back-to-top-button-bg-color);
  border              : var(--back-to-top-button-border);
  border-radius       : var(--back-to-top-button-border-radius);
  z-index             : 2; 
  transition          : bottom 0.2s ease-out, background-color 0.15s ease, transform 0.15s ease;
}

.scroll-top-btn:hover {
  transform           : translateY(-4px);
}

.scroll-top-btn:active {
  transform           : translateY(0px);
}

@media (max-width: 768px) {
  .scroll-top-btn {
    bottom : 20px ;

  }
}
</style>