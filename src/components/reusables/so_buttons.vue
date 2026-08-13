<template>
  <component 
    :is           ="isClickable ? 'a' : 'div'"
    :href         ="isClickable ? resolvedUrl : undefined"
    :target       ="isClickable ? '_blank' : undefined"
    :rel          ="isClickable ? 'noopener noreferrer' : undefined"
    :tabindex     ="isClickable ? undefined : -1"
    :aria-disabled="!isClickable"
    class         ="platform-link"
    :class="[
      `variant-${variant}`, 
      { 
        'is-clickable': isClickable,
        'not-clickable': !isClickable,
        'has-custom-color': Boolean(color),
        'has-custom-hover-color': isClickable && Boolean(hoverColor)
      }
    ]"
    :style="customStyles"
    :aria-label="platformInfo.label"
    @click="handleClick"
  >
    <div class="platform-icon" />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  platform: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 48
  },
  variant: {
    type: String,
    default: 'colored',
    validator: (value) => ['colored', 'white', 'black'].includes(value)
  },
  hoverVariant: {
    type: String,
    default: 'colored',
    validator: (value) => ['colored', 'white', 'black'].includes(value)
  },
  color: {
    type: String,
    default: 'var(--color-operational-system-icons-color)'
  },
  hoverColor: {
    type: String,
    default: 'var(--color-operational-system-icons-hover-color)'
  },
  url: {
    type: String,
    default: ''
  },
  clickable: {
    type: [Boolean, String],
    default: true
  }
})

const isClickable = computed(() => {
  if (typeof props.clickable === 'string') {
    return props.clickable.toLowerCase() !== 'false'
  }
  return Boolean(props.clickable)
})

const platformInput = props.platform.toLowerCase()
const key = (platformInput === 'macos' || platformInput === 'mac') ? 'mac' : platformInput

const platforms = {
  windows: {
    url: 'https://mother-encore.itch.io/mother-encore#download',
    label: 'Windows'
  },
  linux: {
    url: 'https://mother-encore.itch.io/mother-encore#download',
    label: 'Linux'
  },
  mac: {
    url: 'https://mother-encore.itch.io/mother-encore#download',
    label: 'macOS'
  },
}

const platformInfo = platforms[key] || {
  url: '#',
  label: props.platform
}

const resolvedUrl = computed(() => props.url || platformInfo.url)

const monochromeIcons = import.meta.glob('/src/assets/svg/so_icons_monochrome/*.svg', {
  eager: true,
  import: 'default',
})

const coloredIcons = import.meta.glob('/src/assets/svg/so_icons_colored/*.svg', {
  eager: true,
  import: 'default',
})

const getIconPath = (v, iconKey) => {
  if (v === 'white' || v === 'black') {
    const fullPath = `/src/assets/svg/so_icons_monochrome/${iconKey}.svg`
    return monochromeIcons[fullPath] || ''
  } else {
    const fullPath = `/src/assets/svg/so_icons_colored/${iconKey}.svg`
    return coloredIcons[fullPath] || ''
  }
}

const defaultIcon = computed(() => getIconPath(props.variant, key))
const hoverIcon = computed(() => getIconPath(props.hoverVariant, key))

const customStyles = computed(() => {
  const numericSize = typeof props.size === 'number' ? `${props.size}px` : props.size

  return {
    '--icon-size'               : numericSize,
    '--icon-mask-default'       : `url("${defaultIcon.value}")`,
    '--icon-mask-hover'         : `url("${hoverIcon.value}")`,
    '--icon-color-custom'       : props.color || undefined,
    '--icon-hover-color-custom' : props.hoverColor || props.color || undefined
  }
})

const handleClick = (e) => {
  if (!isClickable.value) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }
}
</script>

<style scoped>
.platform-link {
  display                      : inline-flex;
  align-items                  : center;
  justify-content              : center;
  text-decoration              : none;
}

.platform-link.not-clickable,
.platform-link.not-clickable * {
  pointer-events               : none !important;
  cursor                       : default !important;
  user-select                  : none !important;
  transform                    : none !important;
  transition                   : none !important;
  animation                    : none !important;
}

.platform-link.not-clickable:hover,
.platform-link.not-clickable:hover * {
  transform                    : none !important;
  opacity                      : 1 !important;
  color                        : var(--icon-color-custom, inherit) !important;
  -webkit-mask-image           : var(--icon-mask-default) !important;
  mask-image                   : var(--icon-mask-default) !important;
}

.platform-link.is-clickable {
  cursor                       : pointer;
  transition                   : transform 0.2s ease, opacity 0.2s ease;
}

.platform-link.is-clickable:hover {
  transform                    : translateY(-3px);
  opacity                      : 0.85;
}

.platform-icon {
  width                        : var(--icon-size);
  height                       : var(--icon-size);
  background-color             : currentColor;
  
  -webkit-mask-image           : var(--icon-mask-default);
  mask-image                   : var(--icon-mask-default);
  -webkit-mask-repeat          : no-repeat;
  mask-repeat                  : no-repeat;
  -webkit-mask-position        : center;
  mask-position               : center;
  -webkit-mask-size            : contain;
  mask-size                    : contain;
}

.platform-link.is-clickable .platform-icon {
  transition                   : background-color 0.3s ease, -webkit-mask-image 0.3s ease, mask-image 0.3s ease;
}

.variant-white {
  color                        : #ffffff;
}

.variant-black {
  color                        : #000000;
}

.has-custom-color {
  color                        : var(--icon-color-custom);
}

.platform-link.is-clickable.has-custom-hover-color:hover {
  color                        : var(--icon-hover-color-custom);
}

.platform-link.is-clickable:hover .platform-icon {
  -webkit-mask-image           : var(--icon-mask-hover);
  mask-image                   : var(--icon-mask-hover);
}
</style>