<template>
  <a 
    :href         ="platformInfo.url" 
    target        ="_blank" 
    rel           ="noopener noreferrer" 
    class         ="social-link"
    :class        ="[`variant-${variant}`, `hover-${hoverVariant}`]"
    :aria-label   ="computedTooltipText"
    @mouseenter   ="handleMouseEnter"
    @mouseleave   ="handleMouseLeave"
    ref           ="linkRef"
  >
    <img
      :src        ="currentIcon"
      :alt        ="`${platformInfo.label} Icon`"
      :width      ="size"
      :height     ="size"
      class       ="social-icon"
    />
    <ToolTip 
      :show       ="isTooltipVisible" 
      :target-ref ="linkRef" 
      :text       ="computedTooltipText"
      :position   ="toolTipPosition"
    />
  </a>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import ToolTip from '@/components/reusables/tooltip.vue'

const props = defineProps({
  platform: {
    type: String,
    required: true
  },
  tooltipText: {
    type: String,
    default: null
  },
  showTooltip: {
    type: Boolean,
    default: true
  },
  toolTipPosition: {
    type: String,
    default: 'top'
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
  }
})

const linkRef = ref(null)
const key = props.platform.toLowerCase()

const platforms = {
  twitter: { url: 'https://x.com/Mother_Encore', label: 'Twitter' },
  discord: { url: 'https://discord.gg/NBR5qZsDw', label: 'Discord' },
  youtube: { url: 'https://www.youtube.com/watch?v=6YN_okRykjw&list=PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63&index=2', label: 'YouTube' },
  github:  { url: 'https://github.com/motherencore/MOTHER-Encore-Demo-Source-Code', label: 'GitHub' },
  bluesky: { url: 'https://bsky.app/profile/motherencore.bsky.social', label: 'Bluesky' }
}

const platformInfo = platforms[key] || {
  url: '#',
  label: props.platform
}

const computedTooltipText = computed(() => props.tooltipText || platformInfo.label)

const monochromeIcons = import.meta.glob('/src/assets/svg/social_media_icons_monochrome/*.svg', {
  eager: true,
  import: 'default',
})

const coloredIcons = import.meta.glob('/src/assets/svg/social_media_icons_colored/*.svg', {
  eager: true,
  import: 'default',
})

const getIconPath = (v, iconKey) => {
  if (v === 'white' || v === 'black') {
    const fullPath = `/src/assets/svg/social_media_icons_monochrome/${iconKey}.svg`
    return monochromeIcons[fullPath] || ''
  } else {
    const fullPath = `/src/assets/svg/social_media_icons_colored/${iconKey}.svg`
    return coloredIcons[fullPath] || ''
  }
}

const defaultIcon = getIconPath(props.variant, key)
const hoverIcon   = getIconPath(props.hoverVariant, key)

const currentIcon  = ref(defaultIcon)
const internalShow = ref(false)
let   tooltipTimer = null

const isTooltipVisible = computed(() => {
  if (props.showTooltip === false) return false
  return internalShow.value
})

const handleMouseEnter = () => {
  currentIcon.value = hoverIcon
  if (tooltipTimer) clearTimeout(tooltipTimer)
  
  tooltipTimer = setTimeout(() => {
    internalShow.value = true
  }, 500)
}

const handleMouseLeave = () => {
  currentIcon.value  = defaultIcon
  if (tooltipTimer) clearTimeout(tooltipTimer)
  internalShow.value = false
}

onUnmounted(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
})
</script>

<style scoped>
.social-link {
	position         : relative;
	display          : inline-flex;
	align-items      : center;
	justify-content  : center;
	text-decoration  : none;
	transition       : transform 0.15s ease;
}

.social-link:hover {
	transform        : translateY(-3px);
}

.social-icon {
	display          : block;
	object-fit       : contain;
	transition       : filter 0.3s ease;
}

.variant-black .social-icon,
.hover-black:hover .social-icon {
	filter           : brightness(0);
}
</style>