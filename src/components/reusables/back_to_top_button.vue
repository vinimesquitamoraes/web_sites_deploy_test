<template>
  <CustomButton 
    v-show="isVisible && !isHidden"
    class="scroll-top-btn"
    :style="{ bottom: buttonBottom + 'px' }"
    :iconSrc="triangleIcon"
    width     ='var(--back-to-top-button-size)'
    height    ='var(--back-to-top-button-size )'
    iconSize='var(--back-to-top-button-icon-size)'
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
    bottom : 20px ;

  }
}
</style>