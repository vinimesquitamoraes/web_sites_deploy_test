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
  >
    <img
      :src="currentIcon"
      :alt="`${platformInfo.label} Icon`"
      :width="size"
      :height="size"
      class="social-icon"
    />
    <transition name="tooltip-fade">
      <span v-if="showTooltip" class="social-tooltip" role="tooltip">
        {{ props.tooltipText || platformInfo.label }}
      </span>
    </transition>
  </a>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

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
	position         : absolute;
	bottom           : calc(100% + 12px);
	left             : 50%;
	transform        : translateX(-50%);
	background-color : #ffffff;
	border           : 3px solid #000000;
	border-radius    : 12px;
	box-shadow       : var(--color-back-to-top-button-shadow);
	color            : var(--color-primary);
	font-family      : var(--font-p, sans-serif);
	font-weight      : bold;
	font-size        : 14px;
	padding          : 8px 16px;
	white-space      : nowrap;
	pointer-events   : none;
	z-index          : 11;
}

.social-tooltip::after {
	content          : '';
	position         : absolute;
	top              : 100%;
	left             : 50%;
	transform        : translateX(-50%);
	border-width     : 8px;
	border-style     : solid;
	border-color     : #000000 transparent transparent transparent;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
	transition       : opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tooltip-fade-enter-from {
	opacity          : 0;
	transform        : translateX(-50%) translateY(10px) scale(0.95);
}

.tooltip-fade-leave-to {
	opacity          : 0;
	transform        : translateX(-50%) translateY(5px);
}

@media (max-width: 768px) {
	.social-tooltip {
		font-size     : 12px;
		padding       : 6px 12px;
		border-radius : 8px;
		border-width  : 2px;
	}
	
	.social-tooltip::after {
		border-width  : 6px;
	}
}
</style>