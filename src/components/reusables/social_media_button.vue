<template>
  <a 
    :href="platformInfo.url" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="social-link"
    :class="[`variant-${variant}`, `hover-${hoverVariant}`]"
    :aria-label="platformInfo.label"
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
  </a>
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
    url: 'https://www.youtube.com/channel/UCQDodAgh7ckh7l3sTlsVdPA',
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

const handleMouseEnter = () => {
  currentIcon.value = hoverIcon
}

const handleMouseLeave = () => {
  currentIcon.value = defaultIcon
}
</script>

<style scoped>
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  opacity: 0.85;
}

.social-icon {
  display: block;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.variant-black .social-icon,
.hover-black:hover .social-icon {
  filter: brightness(0);
}
</style>