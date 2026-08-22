<template>
  <Transition name="fade-bounce">
    <button 
      v-show="isButtonRendered" 
      class="scroll-top-btn" 
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <span class="arrow-icon"></span>
    </button>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  footerBehavior: {
    type: String,
    default: 'stay',
    validator: (value) => ['stay', 'hide', 'overlap'].includes(value)
  }
})

const isVisible     = ref(false)
const isHidden      = ref(false)
const dynamicBottom = ref(30) 

const isButtonRendered = computed(() => isVisible.value && !isHidden.value)
const dynamicBottomCSS = computed(() => `${dynamicBottom.value}px`)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const handleFooterOverlap = () => {
  const isMobile = window.innerWidth <= 768
  
  const mobilePlayerHeight = 160
  const defaultBottom = isMobile ? (20 + mobilePlayerHeight + 12) : 30

  isHidden.value = false
  dynamicBottom.value = defaultBottom


  const footerEl = document.querySelector('.footer-container')
  if (!footerEl) return

  const footerRect = footerEl.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  const overlap = windowHeight - footerRect.top

  if (overlap > 0) {
    switch (props.footerBehavior) {
      case 'stay':

        const safetyCushion = isMobile ? (16 + mobilePlayerHeight + 12) : 16
        const targetBottom = overlap + safetyCushion
        
        if (targetBottom > defaultBottom) {
          dynamicBottom.value = targetBottom
        }
        break
      case 'hide':
        isHidden.value = true
        break
      case 'overlap':
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
  window.addEventListener('scroll', handleFooterOverlap, { passive: true })
  window.addEventListener('resize', handleFooterOverlap, { passive: true })
  
  handleFooterOverlap()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', handleFooterOverlap)
  window.removeEventListener('resize', handleFooterOverlap)
})
</script>

<style>
.scroll-top-btn {
  position            : fixed;
  bottom              : v-bind(dynamicBottomCSS); 
  right               : 30px;
  width               : 56px;
  height              : 56px;
  background-color    : var(--back-to-top-button-bg-color);
  border              : var(--back-to-top-button-border);
  border-radius       : var(--back-to-top-button-border-radius);
  cursor              : pointer;
  display             : flex;
  align-items         : center;
  justify-content     : center;
  z-index             : 99; 
  backface-visibility : hidden;
  transform-style     : preserve-3d;
  will-change         : transform, bottom;

  --default-arrow-color: var(--color-primary);
  --hover-arrow-color  : var(--color-default-text-color);
  --arrow-color        : var(--default-arrow-color);
}

.arrow-icon {
  width               : 28px;
  height              : 28px;
  display             : inline-block;
  background-color    : var(--arrow-color );
  -webkit-mask-image  : url('@/assets/svg/triangle-up-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-up-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  transition          : background-color 0.15s ease;
}

.scroll-top-btn:hover {
  background-color    : var(--back-to-top-button-bg-hover);
  transform           : translateY(-4px);
  --arrow-color       : var(--hover-arrow-color);
}

.scroll-top-btn:active {
  transform           : translateY(0px);
}

.fade-bounce-enter-active {
  transition          : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition          : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from {
  opacity             : 0;
  transform           : scale(0.5) translateY(20px);
}

.fade-bounce-leave-to {
  opacity             : 0;
  transform           : scale(0.8) translateY(10px);
}

@media (max-width: 768px) {
  .scroll-top-btn {
    right               : 20px;
    width               : 48px;
    height              : 48px;
  }
  .arrow-icon {
    width               : 24px;
    height              : 24px;
  }
}
</style>