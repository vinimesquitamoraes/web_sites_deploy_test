<template>
  <Transition name="fade-bounce" appear>
    <label 
      class="custom-switch" 
      :class="{ 'is-active': modelValue }"
      @click="handleClick"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <input 
        type="checkbox" 
        class="switch-input"
        :checked="modelValue" 
        readonly
      />
      
      <span class="slider" :style="sliderStyles">
        <span class="handle" :style="handleStyles">
          <span 
            v-if="processedIcon && iconColor" 
            class="switch-icon-masked" 
            :style="iconStyles"
          ></span>
          <img 
            v-else-if="processedIcon" 
            :src="processedIcon" 
            class="switch-icon" 
            :style="{ width: `${iconSize}px`, height: `${iconSize}px` }"
            alt="" 
          />
        </span>
      </span>
    </label>
  </Transition>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type    : Boolean,
    default : false
  },
  iconSrc: {
    type    : String,
    default : '' 
  },
  activeIconSrc: {
    type    : String,
    default : ''
  },
  inactiveIconSrc: {
    type    : String,
    default : ''
  },
  iconSize: {
    type    : [Number, String],
    default : 24 
  },
  iconColor: {
    type    : String,
    default : '#ffffff'
  },
  handleBgColor: {
    type    : String,
    default : 'var(--color-black)'
  },
  width: {
    type    : [Number, String],
    default : 80
  },
  height: {
    type    : [Number, String],
    default : 44
  },
  bgColor: {
    type    : String,
    default : 'var(--color-custom-button-background)'
  },
  hoverBgColor: {
    type    : String,
    default : 'var(--color-custom-button-hover)'
  },
  activeBgColor: {
    type    : String,
    default : 'var(--color-hover)'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const isHovered = ref(false)

const rawIcon = computed(() => {
  if (props.modelValue) {
    return props.activeIconSrc || props.iconSrc || props.inactiveIconSrc || ''
  }
  return props.inactiveIconSrc || props.iconSrc || props.activeIconSrc || ''
})

const processedIcon = computed(() => {
  const icon = rawIcon.value
  if (!icon) return ''
  
  if (typeof icon === 'string' && (icon.trim().startsWith('<svg') || icon.trim().endsWith('</svg>'))) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(icon.trim())}`
  }
  return icon
})

const sliderStyles = computed(() => {
  let bg = props.bgColor
  if (props.modelValue) {
    bg = props.activeBgColor
  } else if (isHovered.value) {
    bg = props.hoverBgColor
  }

  return {
    backgroundColor: bg,
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height
  }
})

const handleStyles = computed(() => {
  const h = typeof props.height === 'number' ? props.height : parseInt(props.height) || 44
  const size = h - 12
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: props.handleBgColor
  }
})

const iconStyles = computed(() => {
  const size = typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
  return {
    width: size,
    height: size,
    backgroundColor: props.iconColor,
    maskImage: `url("${processedIcon.value}")`,
    WebkitMaskImage: `url("${processedIcon.value}")`
  }
})

const handleClick = (event) => {
  event.preventDefault()
  const nextValue = !props.modelValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}
</script>

<style scoped>
.custom-switch {
  display                     : inline-flex;
  align-items                 : center;
  cursor                      : pointer;
  box-sizing                  : border-box;

  -webkit-tap-highlight-color : transparent;
  -webkit-backface-visibility : hidden;
  backface-visibility         : hidden;
  -webkit-transform-style     : preserve-3d;
  transform-style             : preserve-3d;
}

.switch-input {
  display                     : none;
}

.slider {
  position                    : relative;
  display                     : inline-flex;
  align-items                 : center;
  box-sizing                  : border-box;
  border                      : 2px solid #000000;
  border-radius               : var(--default-border-radius);
  transition                  : background-color 0.4s ease, 
                                color 0.4s ease;
}
 
.handle {
  position                    : absolute;
  left                        : 4px;
  border-radius               : 50%;
  display                     : flex;
  align-items                 : center;
  justify-content             : center;
  box-sizing                  : border-box;
  
  transition                  : transform 0.4s cubic-bezier(0.1, 1, 0.2, 1), 
                                background-color 0.4s ease;
}

.custom-switch.is-active .slider,
label.custom-switch.is-active span.slider {
  background-color            : var(--color-hover) !important;
}

.custom-switch.is-active .handle {
  transform                   : translateX(36px);
}

.custom-switch:active .handle {
  transform                   : scale(0.9);
}

.custom-switch.is-active:active .handle {
  transform                   : translateX(36px) scale(0.9);
}

.switch-icon {
  object-fit                  : contain;
  pointer-events              : none;
}

.switch-icon-masked {
  display                     : inline-block;
  mask-repeat                 : no-repeat;
  -webkit-mask-repeat         : no-repeat;
  mask-position               : center;
  -webkit-mask-position       : center;
  mask-size                   : contain;
  -webkit-mask-size           : contain;
  pointer-events              : none;
  transition                  : background-color 0.4s ease;
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
</style>