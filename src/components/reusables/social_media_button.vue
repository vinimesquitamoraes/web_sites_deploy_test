<template>
  <a 
    :href="platformInfo.url" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="social-link"
    :class="[`variant-${variant}`, `hover-${hoverVariant}`]"
    :aria-label="props.tooltipText || platformInfo.label"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="linkRef"
  >
    <img
      :src="currentIcon"
      :alt="`${platformInfo.label} Icon`"
      :width="size"
      :height="size"
      class="social-icon"
    />
    <teleport to="body">
      <transition name="tooltip-fade">
        <span v-if="showTooltip" class="social-tooltip" role="tooltip" :style="tooltipStyle">
          {{ props.tooltipText || platformInfo.label }}
          <img :src="tooltipArrow" class="tooltip-arrow" alt="" />
        </span>
      </transition>
    </teleport>
  </a>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import tooltipArrow from '@/assets/svg/triangle-down-filled.svg'

const props = defineProps({
  platform: {
    type: String,
    required: true
  },
  tooltipText: {
    type: String,
    default: null
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
const tooltipStyle = ref({})

const key = props.platform.toLowerCase()

const platforms = {
  twitter: {
    url: 'https://x.com/Mother_Encore',
    label: 'Twitter'
  },
  discord: {
    url: 'https://discord.gg/NBR5qZsDw',
    label: 'Discord'
  },
  youtube: {
    url: 'https://www.youtube.com/watch?v=6YN_okRykjw&list=PLhtMNOPRVvaALJNwIWPeR3fMunIpoxt63&index=2',
    label: 'YouTube'
  },
  github: {
    url: 'https://github.com/motherencore/MOTHER-Encore-Demo-Source-Code',
    label: 'GitHub'
  },
  bluesky: {
    url: 'https://bsky.app/profile/motherencore.bsky.social',
    label: 'Bluesky'
  }
}

const platformInfo = platforms[key] || {
  url: '#',
  label: props.platform
}

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
const hoverIcon = getIconPath(props.hoverVariant, key)

const currentIcon = ref(defaultIcon)
const showTooltip = ref(false)
let tooltipTimer = null

const handleMouseEnter = () => {
  currentIcon.value = hoverIcon
  
  if (tooltipTimer) clearTimeout(tooltipTimer)
  
  tooltipTimer = setTimeout(() => {
    if (linkRef.value) {
      const rect = linkRef.value.getBoundingClientRect()
      tooltipStyle.value = {
        position: 'fixed',
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top - 12}px`,
        transform: 'translateX(-50%) translateY(-100%)'
      }
    }
    showTooltip.value = true
  }, 500)
}

const handleMouseLeave = () => {
  currentIcon.value = defaultIcon
  
  if (tooltipTimer) clearTimeout(tooltipTimer)
  showTooltip.value = false
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
	z-index          : 10;
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

.social-tooltip {
	position         : relative;
	background-color : #ffffff;
	border           : 3px solid #000000;
	border-radius    : 12px;
	color            : var(--color-primary);
	font-family      : var(--font-p, sans-serif);
	font-weight      : bold;
	font-size        : 14px;
	padding          : 8px 16px;
	white-space      : nowrap;
	pointer-events   : none;
	z-index          : 99999;
}

.tooltip-arrow {
	position         : absolute;
	top              : 100%;
	left             : 50%;
	transform        : translateX(-50%) translateY(-2px);
	width            : 14px;
	height           : auto;
	pointer-events   : none;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
	transition       : opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip-fade-enter-from {
	opacity          : 0;
	transform        : translateX(-50%) translateY(calc(-100% + 10px)) scale(0.95) !important;
}

.tooltip-fade-leave-to {
	opacity          : 0;
	transform        : translateX(-50%) translateY(calc(-100% + 5px)) !important;
}

@media (max-width: 768px) {
	.social-tooltip {
		font-size     : 12px;
		padding       : 6px 12px;
		border-radius : 8px;
		border-width  : 2px;
	}

	.tooltip-arrow {
		width         : 10px;
	}
}
</style>