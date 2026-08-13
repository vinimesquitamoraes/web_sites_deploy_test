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
      <div v-if="iconSrc" class="icon-wrapper" :style="iconWrapperStyles">
        <!-- Masked color fill div (used when iconColor/hoverIconColor is provided) -->
        <div 
          v-if="iconColor || hoverIconColor"
          class="button-icon-masked"
          :style="maskedIconStyles"
        ></div>

        <!-- Regular image tag (used when no color tinting is requested) -->
        <img 
          v-else
          :src="iconSrc" 
          class="button-icon" 
          alt="" 
        />
      </div>
      
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
    type                       : String,
    default                    : 'BUTTON'
  },
  iconSrc: {
    type                       : String,
    default                    : '' 
  },
  iconSize: {
    type                       : [Number, String],
    default                    : null
  },
  iconColor: {
    type                       : String,
    default                    : "#000000"
  },
  hoverIconColor: {
    type                       : String,
    default                    : null
  },
  width: {
    type                       : [Number, String],
    default                    : 'fit-content'
  },
  height: {
    type                       : [Number, String],
    default                    : 'auto'
  },
  fontSize: {
    type                       : [Number, String],
    default                    : 'var(--font-button-size)'
  },
  bgColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-background)'
  },
  hoverBgColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-hover)'
  },
  textColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-text)'
  },
  hoverTextColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-text-hover)'
  },
  to: {
    type                       : [String, Object],
    default                    : null
  },
  externalUrl: {
    type                       : String,
    default                    : null
  }
})

const emit = defineEmits(['click'])
const router = useRouter()
const isHovered = ref(false)

const buttonStyles = computed(() => ({
  backgroundColor              : isHovered.value ? props.hoverBgColor : props.bgColor,
  color                        : isHovered.value ? props.hoverTextColor : props.textColor,
  width                        : typeof props.width === 'number' ? `${props.width}px` : props.width,
  height                       : typeof props.height === 'number' ? `${props.height}px` : props.height
}))

const iconWrapperStyles = computed(() => {
  if (props.iconSize) {
    const size = typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
    return {
      width                    : size,
      height                   : size,
      maxWidth                 : '100%',
      maxHeight                : '100%'
    }
  }
  return {
    height                     : props.text ? '1.2em' : '80%',
    width                      : props.text ? 'auto' : '80%'
  }
})

const maskedIconStyles = computed(() => {
  const activeColor = isHovered.value 
    ? (props.hoverIconColor || props.iconColor) 
    : (props.iconColor || props.hoverIconColor)

  return {
    backgroundColor            : activeColor,
    maskImage                  : `url(${props.iconSrc})`,
    WebkitMaskImage            : `url(${props.iconSrc})`
  }
})

const textStyles = computed(() => {
  const size = props.fontSize
  const finalSize = typeof size === 'number' ? `${size}px` : size
  return {
    fontSize                   : finalSize
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
  display                      : inline-flex;
  align-items                  : center;
  justify-content              : center;
  gap                          : 10px; 
  padding                      : 0.75rem 2.5rem;
  
  max-width                    : 100%;
  text-align                   : center;
  box-sizing                   : border-box;

  border                       : var(--color-default-border);
  border-radius                : 6px;
  cursor                       : pointer;
  box-shadow                   : var(--color-custom-button-shadow);      
  
  transition                   : transform 1s cubic-bezier(0.1, 1, 0.2, 1), 
                                 background-color 0.4s ease, 
                                 box-shadow 1s cubic-bezier(0.1, 1, 0.2, 1), 
                                 color 0.4s ease;

  -webkit-tap-highlight-color  : transparent;
  -webkit-backface-visibility  : hidden;
  backface-visibility          : hidden;
  -webkit-transform-style      : preserve-3d;
  transform-style              : preserve-3d;
  will-change                  : transform, box-shadow, opacity;
  overflow                     : hidden;
}

.custom-btn.icon-only {
  padding                      : 0.5rem; 
}

.custom-btn:active {
  transform                    : translateY(2px);
  box-shadow                   : var(--color-custom-button-active-shadow);      
}

.icon-wrapper {
  display                      : inline-flex;
  align-items                  : center;
  justify-content              : center;
  flex-shrink                  : 0;
  overflow                     : hidden;
  pointer-events               : none;
}

.button-icon {
  width                        : 100%;
  height                       : 100%;
  max-width                    : 100%;
  max-height                   : 100%;
  object-fit                   : contain;
  pointer-events               : none;
}

.button-icon-masked {
  width                        : 100%;
  height                       : 100%;
  mask-repeat                  : no-repeat;
  WebkitMaskRepeat             : no-repeat;
  mask-position                : center;
  WebkitMaskPosition           : center;
  mask-size                    : contain;
  WebkitMaskSize               : contain;
  transition                   : background-color 0.4s ease;
  pointer-events               : none;
}

.fade-bounce-enter-active {
  transition                   : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                 transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition                   : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from {
  opacity                      : 0;
  transform                    : scale(0.5) translateY(20px);
}

.fade-bounce-leave-to {
  opacity                      : 0;
  transform                    : scale(0.8) translateY(10px);
}

.button-text {
  font-family                  : var(--font-button);
  white-space                  : normal; 
  word-wrap                    : break-word;
  line-height                  : 1.2;
}
</style>