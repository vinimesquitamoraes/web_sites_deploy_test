<template>
  <Transition name="fade-bounce" appear>
    <button 
      class="custom-btn" 
      :class="{ 'icon-only': !text }"
      :style="buttonStyles"
      @click="handleClick"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <img 
        v-if="iconSrc" 
        :src="iconSrc" 
        class="button-icon" 
        :style="{ width: `${iconSize}px`, height: `${iconSize}px` }"
        alt="" 
      />
      
      <span v-if="text" class="button-text" :style="textStyles">
        <slot>{{ text }}</slot>
      </span>
    </button>
  </Transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type    : String,
    default : 'BUTTON'
  },
  iconSrc: {
    type    : String,
    default : '' 
  },
  iconSize: {
    type    : [Number, String],
    default : 24 
  },
  width: {
    type    : [Number, String],
    default : 'fit-content'
  },
  height: {
    type    : [Number, String],
    default : 'auto'
  },
  fontSize: {
    type    : [Number, String],
    default : 'var(--font-button-size)'
  },
  bgColor: {
    type    : String,
    default : 'var(--color-custom-button-background)'
  },
  hoverBgColor: {
    type    : String,
    default : 'var(--color-custom-button-hover)'
  },
  textColor: {
    type    : String,
    default : 'var(--color-custom-button-text)'
  },
  hoverTextColor: {
    type    : String,
    default : 'var(--color-custom-button-text-hover)'
  },
  to: {
    type    : [String, Object],
    default : null
  },
  externalUrl: {
    type    : String,
    default : null
  }
})

const emit = defineEmits(['click'])
const router = useRouter()
const isHovered = ref(false)

const buttonStyles = computed(() => ({
  backgroundColor : isHovered.value ? props.hoverBgColor : props.bgColor,
  color           : isHovered.value ? props.hoverTextColor : props.textColor,
  width           : typeof props.width === 'number' ? `${props.width}px` : props.width,
  height          : typeof props.height === 'number' ? `${props.height}px` : props.height
}))

const textStyles = computed(() => {
  const size = props.fontSize
  const finalSize = typeof size === 'number' ? `${size}px` : size
  return {
    fontSize: finalSize
  }
})

const handleClick = (event) => {
  emit('click', event)

  if (props.to) {
    router.push(props.to)
  } 
  else if (props.externalUrl) {
    window.open(props.externalUrl, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.custom-btn {
  display                     : inline-flex;
  align-items                 : center;
  justify-content             : center;
  gap                         : 10px; 
  padding                     : 0.75rem 2.5rem;
  
  max-width                   : 100%;
  text-align                  : center;
  box-sizing                  : border-box;

  border                      : 2px solid #000000;
  border-radius               : 6px;
  cursor                      : pointer;
  box-shadow                  : var(--color-custom-button-shadow);      
  
  transition                  : transform 1s cubic-bezier(0.1, 1, 0.2, 1), 
                                background-color 0.4s ease, 
                                box-shadow 1s cubic-bezier(0.1, 1, 0.2, 1), 
                                color 0.4s ease;

  -webkit-tap-highlight-color : transparent;
  -webkit-backface-visibility : hidden;
  backface-visibility         : hidden;
  -webkit-transform-style     : preserve-3d;
  transform-style             : preserve-3d;
  will-change                 : transform, box-shadow, opacity;
}

.custom-btn.icon-only {
  padding                     : 0.5rem; 
}

.custom-btn:active {
  transform                   : translateY(2px);
  box-shadow                  : var(--color-custom-button-active-shadow);      
}

.button-icon {
  width                       : 100%;
  height                      : auto;
  max-height                  : 100%;
  object-fit                  : contain;
  flex-shrink                 : 0; 
  pointer-events              : none;
}

.fade-bounce-enter-active {
  transition                  : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition                  : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from {
  opacity                     : 0;
  transform                   : scale(0.5) translateY(20px);
}

.fade-bounce-leave-to {
  opacity                     : 0;
  transform                   : scale(0.8) translateY(10px);
}

.button-text {
  font-family                 : var(--font-button);
  white-space                 : normal; 
  word-wrap                   : break-word;
  line-height                 : 1.2;
}
</style>