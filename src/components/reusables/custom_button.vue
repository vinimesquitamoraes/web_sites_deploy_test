<template>
  <Transition appear name="fade-bounce">
    <button 
      class="custom-btn" 
      :class="[
        { 'icon-only': !text }, 
        `press-${pressAnimation}`
      ]"
      :style="buttonStyles"
      :disabled="disabled"
      @click="handleClick"
    >
      <div v-if="iconSrc" class="icon-wrapper" :style="iconWrapperStyles">
      
        <div 
          v-if="hasValidColor"
          class="button-icon-masked"
          :style="maskedIconStyles"
        ></div>

        <img 
          v-else
          :src="processedIconSrc" 
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  disabled: {
    type                       : Boolean,
    default                    : false
  },
  text: {
    type                       : String,
    default                    : ''
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
    default                    : "var(--color-custom-icon)"
  },
  hoverIconColor: {
    type                       : String,
    default                    : "var(--color-custom-icon-hover)"
  },
  padding: {
    type                       : String,
    default                    : 'clamp(0.35rem, 1vw, 0.5rem)'
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
    default                    : 'var(--custom-button-font-size)'
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
  },
  pressAnimation: {
    type                       : String,
    default                    : 'push',
    validator                  : (value) => ['scale', 'lift', 'push', 'none'].includes(value)
  },
})

const emit = defineEmits(['click'])
const router = useRouter()

const processedIconSrc = computed(() => {
  if (!props.iconSrc) return ''
  const trimmed = props.iconSrc.trim()
  if (trimmed.startsWith('<svg') || trimmed.endsWith('</svg>')) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(trimmed)}`
  }
  return props.iconSrc
})

const hasValidColor = computed(() => {
  return (props.iconColor && props.iconColor.trim() !== '') || 
         (props.hoverIconColor && props.hoverIconColor.trim() !== '')
})

const buttonStyles = computed(() => ({
  '--local-bg'                 : props.bgColor,
  '--local-hover-bg'           : props.hoverBgColor,
  '--local-text'               : props.textColor,
  '--local-hover-text'         : props.hoverTextColor,
  '--local-icon-color'         : props.iconColor,
  '--local-hover-icon-color'   : props.hoverIconColor,
  padding                      : props.padding,
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
  return {
    maskImage                  : `url("${processedIconSrc.value}")`,
    WebkitMaskImage            : `url("${processedIconSrc.value}")`
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
  if (props.disabled) return
  
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
  gap                          : clamp(6px, 1.5vw, 10px); 
  max-width                    : 100%;
  text-align                   : center;
  box-sizing                   : border-box;

  background-color             : var(--local-bg);
  color                        : var(--local-text);
  border                       : var(--custom-button-border);
  border-radius                : var(--custom-button-border-radius);
  cursor                       : pointer;
  
  transition                   : background-color 0.4s ease, 
                                 color 0.4s ease,
                                 transform 0.1s ease,
                                 opacity 0.3s ease;

  -webkit-tap-highlight-color  : transparent;
  overflow                     : hidden;
}

.custom-btn.press-scale:not(:disabled):active {
  transform                    : scale(0.95) !important;
}

.custom-btn.press-lift:not(:disabled):active {
  transform                    : translateY(-2px) !important;
}

.custom-btn.press-push:not(:disabled):active {
  transform                    : translateY(2px) !important;
}

.custom-btn.press-none:not(:disabled):active {
  transform                    : none !important;
}

.custom-btn:not(:disabled):hover {
  background-color             : var(--local-hover-bg);
  color                        : var(--local-hover-text);
}

.custom-btn:disabled {
  opacity                      : 0.5;
  cursor                       : not-allowed;
  pointer-events               : none;
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
  background-color             : var(--local-icon-color);
  mask-repeat                  : no-repeat;
  -webkit-mask-repeat          : no-repeat;
  mask-position                : center;
  -webkit-mask-position        : center;
  mask-size                    : contain;
  -webkit-mask-size            : contain;
  transition                   : background-color 0.4s ease;
  pointer-events               : none;
}

.custom-btn:not(:disabled):hover .button-icon-masked {
  background-color             : var(--local-hover-icon-color);
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
  font-family                  : var(--custom-button-font, var(--font-default));
  white-space                  : normal; 
  word-wrap                    : break-word;
  line-height                  : 1.2;
}

@media screen and (max-width: 768px) {
  .custom-btn {
    width                      : 100%;
  }
}
</style>