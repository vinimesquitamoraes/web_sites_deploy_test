<template>
  <Transition appear name="fade-bounce">
    <button 
      class="custom-btn" 
      :class="[
        { 'icon-only': !text }, 
        { 'auto-adapt': autoAdaptSize },
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
        <!-- 
          @slot Override the default button text content is ignored if the text prop is empty.
        -->
        <slot name="overriden-text">{{ text }}</slot>
      </span>
    </button>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/**
  * Customizable button component supporting icons, dynamic coloring, Vue Router navigation, external links, and press animations.
  * 
  * @displayName Custom Button
  */

const props = defineProps({
  /**
    * Disables interactions and reduces opacity when set to true.
    */
  disabled: {
    type                       : Boolean,
    default                    : false
  },
  /**
    * Automatically adapts the button size to wrap or fit text when it becomes long.
    */
  autoAdaptSize: {
    type                       : Boolean,
    default                    : false
  },
  /**
    * Label text displayed inside the button.
    */
  text: {
    type                       : String,
    default                    : ''
  },
  /**
    * Image URL or raw inline SVG string for the button icon.
    */
  iconSrc: {
    type                       : String,
    default                    : '' 
  },
  /**
    * Position of the icon relative to the text.
    * @values left, right, top, bottom
    */
  iconPosition: {
    type                       : String,
    default                    : 'left',
    validator                  : (value) => ['left', 'right', 'top', 'bottom'].includes(value)
  },
  /**
    * Custom margin/spacing applied specifically to the icon (e.g., '0 10px 0 0', '5px').
    */
  iconMargin: {
    type                       : [Number, String],
    default                    : null
  },
  /**
    * Custom margin/spacing applied specifically to the text (e.g., '0 0 0 5px', '2px').
    */
  textMargin: {
    type                       : [Number, String],
    default                    : null
  },
  /**
    * Width and height dimension for the icon container (e.g., `24`, `'2rem'`, `'var(--icon-size)'`).
    */
  iconSize: {
    type                       : [Number, String],
    default                    : null
  },
  /**
    * Fill color for CSS mask-based icons.
    */
  iconColor: {
    type                       : String,
    default                    : "var(--color-custom-icon)"
  },
  /**
    * Hover fill color for CSS mask-based icons.
    */
  hoverIconColor: {
    type                       : String,
    default                    : "var(--color-custom-icon-hover)"
  },
  /**
    * Inner padding spacing for the button container.
    */
  padding: {
    type                       : String,
    default                    : 'clamp(0.35rem, 1vw, 0.5rem)'
  },
  /**
    * Custom width applied to the button layout.
    */
  width: {
    type                       : [Number, String],
    default                    : 'fit-content'
  },
  /**
    * Custom height applied to the button layout.
    */
  height: {
    type                       : [Number, String],
    default                    : 'auto'
  },
  /**
    * Font size applied to the text string inside the button.
    */
  fontSize: {
    type                       : [Number, String],
    default                    : 'var(--custom-button-font-size)'
  },
  /**
    * Background color of the button in default state.
    */
  bgColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-background)'
  },
  /**
    * Background color when hovering over the button.
    */
  hoverBgColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-hover)'
  },
  /**
    * Text color of the button in default state.
    */
  textColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-text)'
  },
  /**
    * Text color when hovering over the button.
    */
  hoverTextColor: {
    type                       : String,
    default                    : 'var(--color-custom-button-text-hover)'
  },
  /**
    * Vue Router target location for internal SPA navigation.
    */
  to: {
    type                       : [String, Object],
    default                    : null
  },
  /**
    * External URL to navigate to via window location.
    */
  externalUrl: {
    type                       : String,
    default                    : null
  },
  /**
    * Active press animation transform style.
    * @values scale, lift, push, none
    */
  pressAnimation: {
    type                       : String,
    default                    : 'push',
    validator                  : (value) => ['scale', 'lift', 'push', 'none'].includes(value)
  },
})

/**
  * Triggered when the button is clicked by the user.
  * 
  * @event click
  * @type {MouseEvent}
  * @property {MouseEvent} event - Native click event object
  */
const emit = defineEmits(['click'])
const router = useRouter()

/**
  * Formats raw inline SVG strings to data URIs or returns raw image paths.
  * @private
  */
const processedIconSrc = computed(() => {
  const IconBuilder = {
    isEmpty(src) {
      return !src
    },
    clean(src) {
      return src.trim()
    },
    isRawSvg(src) {
      return src.startsWith('<svg') || src.endsWith('</svg>')
    },
    toDataUri(src) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(src)}`
    }
  }

  if (IconBuilder.isEmpty(props.iconSrc)) return ''

  const trimmed = IconBuilder.clean(props.iconSrc)

  return IconBuilder.isRawSvg(trimmed) ? IconBuilder.toDataUri(trimmed) : props.iconSrc
})

/**
  * Checks if valid dynamic icon colors exist for CSS mask rendering.
  * @private
  */
const hasValidColor = computed(() => {
  const ColorBuilder = {
    isValid(color) {
      return color && color.trim() !== ''
    }
  }

  return ColorBuilder.isValid(props.iconColor) || ColorBuilder.isValid(props.hoverIconColor)
})

/**
  * Dynamic CSS variables and style properties bound to the root element.
  * @private
*/
const buttonStyles = computed(() => {
  const ButtonStyleBuilder = {
    formatValue(val) {
      return typeof val === 'number' ? `${val}px` : val
    },
    getFlexDirection(position) {
      if (position === 'right')  return 'row-reverse'
      if (position === 'top')    return 'column'
      if (position === 'bottom') return 'column-reverse'
      return 'row'
    },
    buildStyles(props) {
      const styles = {}

      styles['--local-bg']           = props.bgColor
      styles['--local-hover-bg']     = props.hoverBgColor
      styles['--local-text']         = props.textColor
      styles['--local-hover-text']   = props.hoverTextColor
      styles['--local-icon-color']   = props.iconColor
      styles['--local-hover-icon-color'] = props.hoverIconColor
      styles.padding                 = props.padding
      styles.height                  = this.formatValue(props.height)
      styles.flexDirection           = this.getFlexDirection(props.iconPosition)
      styles.width                   = props.autoAdaptSize ? 'fit-content' : this.formatValue(props.width)

      return styles
    }
  }

  return ButtonStyleBuilder.buildStyles(props)
})

/**
  * Calculated dimensions and margins applied to the icon wrapper container.
  * @private
*/
const iconWrapperStyles = computed(() => {
  const IconLayoutBuilder = {
    formatValue(val) {
      return typeof val === 'number' ? `${val}px` : val
    },

    buildStyles(iconSize, hasText, rawMargin) {
      const styles = {}

      if (iconSize) {
        const size        = this.formatValue(iconSize)
        styles.width      = size
        styles.height     = size
        styles.maxWidth   = '100%'
        styles.maxHeight  = '100%'
      } else {
        styles.height     = hasText ? '1.2em' : '80%'
        styles.width      = hasText ? 'auto' : '80%'
      }

      if (rawMargin) {
        styles.margin     = this.formatValue(rawMargin)
      }

      return styles
    }
  }

  return IconLayoutBuilder.buildStyles(props.iconSize, Boolean(props.text), props.iconMargin)
})


/**
  * Computed CSS mask styles for recoloring SVG icons.
  * @private
  */
const maskedIconStyles = computed(() => {
  return {
    maskImage                  : `url("${processedIconSrc.value}")`,
    WebkitMaskImage            : `url("${processedIconSrc.value}")`
  }
})

/**
  * Computed typography styles and margins for text block.
  * @private
*/
const textStyles = computed(() => {
  const TextStyleBuilder = {
    formatValue(val) {
      return typeof val === 'number' ? `${val}px` : val
    },

    buildStyles(fontSize, rawMargin) {
      const styles = {}

      styles.fontSize = this.formatValue(fontSize)
      if (rawMargin) {
        styles.margin   = this.formatValue(rawMargin)
      }

      return styles
    }
  }

  return TextStyleBuilder.buildStyles(props.fontSize, props.textMargin)
})

/**
  * Handles button click, emits event, and executes internal or external routing.
  * 
  * @param {MouseEvent} event Native click event trigger.
  * @public
*/
const handleClick = (event) => {
  const ClickActionBuilder = {
    isDisabled(disabled) {
      return disabled
    },

    executeNavigation(to, externalUrl) {
      if (to) {
        router.push(to)
      } 
      else if (externalUrl) {
        window.open(externalUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  if (ClickActionBuilder.isDisabled(props.disabled)) return

  emit('click', event)

  ClickActionBuilder.executeNavigation(props.to, props.externalUrl)
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

.custom-btn.auto-adapt {
  max-width                    : 100%;
  width                        : fit-content;
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
  font-family                  : var(--custom-button-font);
  white-space                  : normal; 
  word-wrap                    : break-word;
  text-align                   : center; 
  display                      : inline-block; 
}

@media screen and (max-width: 768px) {
  .custom-btn {
    width                      : 100%;
  }
}
</style>