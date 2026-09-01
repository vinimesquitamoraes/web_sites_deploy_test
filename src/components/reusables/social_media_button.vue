<template>
  <a 
    :href         ="platformInfo.url" 
    target        ="_blank" 
    rel           ="noopener noreferrer" 
    class         ="social-link"
    :style        ="customStyles"
    :aria-label   ="computedTooltipText"
    @mouseenter   ="handleMouseEnter"
    @mouseleave   ="handleMouseLeave"
    ref           ="linkRef"
  >
    <div class="social-icon"/>

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
  color: {
    type: String,
    default: 'var(--color-social-icons-color, inherit)'
  },
  hoverColor: {
    type: String,
    default: 'var(--color-social-icons-hover-color, inherit)'
  }
})

const linkRef = ref(null)
const key = props.platform.toLowerCase()

const platforms = {
  twitter: { url: 'https://x.com/Mother_Encore', label: 'Twitter' },
  discord: { url: 'https://discord.gg/SS4wBGDDGm', label: 'Discord' },
  youtube: { url: 'https://www.youtube.com/watch?v=6YN_okRykjw&list=PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63&index=2', label: 'YouTube' },
  github:  { url: 'https://github.com/motherencore/MOTHER-Encore-Demo-Source-Code', label: 'GitHub' },
  bluesky: { url: 'https://bsky.app/profile/motherencore.bsky.social', label: 'Bluesky' },
  itchio:  { url: 'https://mother-encore.itch.io/mother-encore', label: 'Itch.io' }
}

const platformInfo = platforms[key] || {
  url: '#',
  label: props.platform
}

const computedTooltipText = computed(() => props.tooltipText || platformInfo.label)

const socialIcons = import.meta.glob('/src/assets/svg/social_media_icons/*.svg', {
  eager: true,
  import: 'default',
})

const customStyles = computed(() => {
  const numericSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  const fullPath = `/src/assets/svg/social_media_icons/${key}.svg`
  const iconUrl = socialIcons[fullPath] || ''

  return {
    '--icon-size'       : numericSize,
    '--icon-mask'       : `url("${iconUrl}")`,
    '--icon-color'      : props.color,
    '--icon-hover-color': props.hoverColor
  }
})

const internalShow = ref(false)
let   tooltipTimer = null

const isTooltipVisible = computed(() => {
  if (props.showTooltip === false) return false
  return internalShow.value
})

const handleMouseEnter = () => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
  
  tooltipTimer = setTimeout(() => {
    internalShow.value = true
  }, 500)
}

const handleMouseLeave = () => {
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
	transition       : transform 0.15s ease, color 0.3s ease;
	color            : var(--icon-color);
}

.social-link:hover {
	transform        : translateY(-3px);
	color            : var(--icon-hover-color);
}

.social-icon {
	width            : var(--icon-size);
	height           : var(--icon-size);
	background-color : currentColor;
	display          : block;
	
	-webkit-mask-image     : var(--icon-mask);
	mask-image             : var(--icon-mask);
	-webkit-mask-repeat    : no-repeat;
	mask-repeat            : no-repeat;
	-webkit-mask-position  : center;
	mask-position          : center;
	-webkit-mask-size      : contain;
	mask-size              : contain;
}
</style>