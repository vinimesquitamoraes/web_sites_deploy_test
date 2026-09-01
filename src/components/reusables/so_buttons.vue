<template>
  <a 
    :href         ="isClickable ? resolvedUrl : undefined"
    :target       ="isClickable ? '_blank' : undefined"
    :rel          ="isClickable ? 'noopener noreferrer' : undefined"
    :tabindex     ="isClickable ? undefined : -1"
    :aria-disabled="!isClickable"
    class         ="platform-link"
    :class="{ 
      'is-clickable': isClickable,
      'not-clickable': !isClickable
    }"
    :style        ="customStyles"
    :aria-label   ="platformInfo.label"
    @click        ="handleClick"
  >
    <div class="platform-icon" />
  </a>
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
  color: {
    type: String,
    default: 'var(--color-operational-system-icons-color, inherit)'
  },
  hoverColor: {
    type: String,
    default: 'var(--color-operational-system-icons-hover-color, inherit)'
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

const soIcons = import.meta.glob('/src/assets/svg/so_icons/*.svg', {
  eager: true,
  import: 'default',
})

const customStyles = computed(() => {
  const numericSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  const fullPath = `/src/assets/svg/so_icons/${key}.svg`
  const iconUrl = soIcons[fullPath] || ''

  return {
    '--icon-size'       : numericSize,
    '--icon-mask'       : `url("${iconUrl}")`,
    '--icon-color'      : props.color,
    '--icon-hover-color': props.hoverColor
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
  color                        : var(--icon-color);
  transition                   : color 0.3s ease;
}

.platform-link.not-clickable {
  pointer-events               : none !important;
  cursor                       : default !important;
  user-select                  : none !important;
}

.platform-link.is-clickable {
  cursor                       : pointer;
  transition                   : transform 0.2s ease, opacity 0.2s ease, color 0.3s ease;
}

.platform-link.is-clickable:hover {
  transform                    : translateY(-3px);
  opacity                      : 0.85;
  color                        : var(--icon-hover-color);
}

.platform-icon {
  width                        : var(--icon-size);
  height                       : var(--icon-size);
  background-color             : currentColor;
  display                      : block;
  
  -webkit-mask-image           : var(--icon-mask);
  mask-image                   : var(--icon-mask);
  -webkit-mask-repeat          : no-repeat;
  mask-repeat                  : no-repeat;
  -webkit-mask-position        : center;
  mask-position                : center;
  -webkit-mask-size            : contain;
  mask-size                    : contain;
}
</style>