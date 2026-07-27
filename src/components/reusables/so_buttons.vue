<template>
  <component 
    :is="clickable ? 'a' : 'div'"
    :href="clickable ? resolvedUrl : undefined"
    :target="clickable ? '_blank' : undefined"
    :rel="clickable ? 'noopener noreferrer' : undefined"
    class="platform-link"
    :class="[
      `variant-${variant}`, 
      `hover-${hoverVariant}`,
      { 'is-clickable': clickable }
    ]"
    :aria-label="platformInfo.label"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <img
      :src="currentIcon"
      :alt="`${platformInfo.label} Icon`"
      :width="size"
      :height="size"
      class="platform-icon"
    />
  </component>
</template>

<script setup>
import { ref, computed } from 'vue'

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
  url: {
    type: String,
    default: ''
  },
  clickable: {
    type: Boolean,
    default: true
  }
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

const defaultIcon = getIconPath(props.variant, key)
const hoverIcon = getIconPath(props.hoverVariant, key)

const currentIcon = ref(defaultIcon)

const handleMouseEnter = () => {
  currentIcon.value = hoverIcon
}

const handleMouseLeave = () => {
  currentIcon.value = defaultIcon
}
</script>

<style scoped>
.platform-link {
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  text-decoration: none;
  transition:      transform 0.2s ease, opacity 0.2s ease;
}

.platform-link.is-clickable {
  cursor:          pointer;
}

.platform-link.is-clickable:hover {
  transform:       translateY(-3px);
  opacity:         0.85;
}

.platform-icon {
  display:         block;
  object-fit:      contain;
  transition:      filter 0.3s ease;
}

.variant-black .platform-icon,
.hover-black:hover .platform-icon {
  filter:          brightness(0);
}
</style>