<template>
  <CustomButton 
    v-show="isVisible && !isHidden"
    class="scroll-top-btn"
    :style="{ bottom: buttonBottom + 'px' }"
    :iconSrc="triangleIcon"
    iconSize="28px"
    aria-label="Scroll to top"
    @click="scrollToTop"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'
import triangleIcon from '@/assets/svg/triangle-up-12-filled.svg'

const props = defineProps({
  footerBehavior: {
    type    : String,
    default : 'stay',
    validator: (value) => ['center', 'stay', 'hide', 'overlap'].includes(value)
  }
})

const isVisible = ref(false)
const isHidden = ref(false)
const buttonBottom = ref(30)

const handleScroll = () => {
  const scrollY = window.scrollY
  isVisible.value = scrollY > 300
  handleFooterOverlap()
}

const handleFooterOverlap = () => {
  const footerEl = document.querySelector('.footer-container')
  
  if (!footerEl) {
    buttonBottom.value = 30
    isHidden.value = false
    return
  }

  const footerRect = footerEl.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const overlap = windowHeight - footerRect.top

  buttonBottom.value = 30
  isHidden.value = false

  if (overlap > 0) {
    switch (props.footerBehavior) {
      case 'overlap':
        break
      case 'stay':
      case 'center':
        buttonBottom.value = overlap + 30
        break
      case 'hide':
        isHidden.value = true
        break
    }
  }
}

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
  position            : fixed !important;
  bottom              : 30px; 
  right               : 30px;
  width               : var(--back-to-top-button-size, 54px) !important;
  height              : var(--back-to-top-button-size, 54px) !important;
  max-width           : none !important;
  background-color    : var(--back-to-top-button-bg-color);
  border              : var(--back-to-top-button-border);
  border-radius       : var(--back-to-top-button-border-radius);
  z-index             : 2; 
  transition          : bottom 0.2s ease-out, background-color 0.15s ease, transform 0.15s ease !important;

  --local-icon-color       : var(--color-primary);
  --local-hover-icon-color : var(--color-default-text-color);
  --local-hover-bg         : var(--back-to-top-button-bg-hover);
}

.scroll-top-btn:hover {
  transform           : translateY(-4px);
}

.scroll-top-btn:active {
  transform           : translateY(0px);
}

@media (max-width: 768px) {
  .scroll-top-btn {
    right               : 20px !important;
    width               : 48px !important;
    height              : 48px !important;
  }
}
</style>