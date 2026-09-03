<template>
  <div 
    class="external-side-volume" 
    :class="[`layout-${volumeLayout}`, `orientation-${orientation}`]"
  >
    <span class="control-label">VOL</span>

    <!-- Vertical / Standard Layout Elements Container -->
    <div v-if="!isCurrentHorizontal" class="volume-control-container">
      <div v-if="volumeLayout === 'wheel'" class="thumbwheel" @wheel.prevent="$emit('wheelVolume', $event)">
        <div class="wheel-ridges"></div>
      </div>

      <div v-else-if="volumeLayout === 'bar'" class="vertical-slider-track">
        <input 
          type          ="range" 
          min           ="0" 
          max           ="100" 
          step          ="1"
          :value        ="volume" 
          @input        ="$emit('volumeChange', $event)"
          class         ="vertical-range-input"
          :style        ="{ '--volume-percent': volume + '%' }"
        />
      </div>
    </div>

    <!-- Horizontal Layout Slider Track (Collinear) -->
    <div v-if="isCurrentHorizontal" class="mobile-slider-track">
      <input 
        type          ="range" 
        min           ="0" 
        max           ="100" 
        step          ="1"
        :value        ="volume" 
        @input        ="$emit('volumeChange', $event)"
        class         ="mobile-range-input"
        :style        ="{ '--volume-percent': volume + '%' }"
      />
    </div>

    <CustomButton
      class         = "mute-btn" 
      :class        = "{ active: isMuted }"
      :text         = "isMuted ? 'OFF' : 'MUT'"
      font-size     = "0.55rem"
      padding       = "0"
      @click        = "$emit('toggleMute')"
    />
  </div>
</template>

<script setup>
/**
  * @file        music_player_volume_control.vue
  * @brief       Music player volume control component supporting horizontal/vertical layouts, thumbwheels, slider bars, and mute state toggling.
  * @displayName Music Player Volume Control
*/

import { computed } from 'vue'
import CustomButton from '@/components/reusables/custom_button.vue'

const props = defineProps({
  /** Layout style of the volume control (e.g., 'wheel', 'bar'). */
  volumeLayout: {
    type: String,
    default: 'bar'
  },
  /** Current volume level percentage (0 to 100). */
  volume: {
    type: Number,
    default: 100
  },
  /** Indicates whether audio is currently muted. */
  isMuted: {
    type: Boolean,
    default: false
  },
  /** Orientation and layout direction of the volume control panel. */
  orientation: {
    type       : String,
    default    : 'horizontal',
    validator  : (value) => ['horizontal', 'vertical', 'horizontal-flipped', 'vertical-flipped'].includes(value)
  }
})

defineEmits(['wheelVolume', 'volumeChange', 'toggleMute'])

/** Checks if the current orientation is horizontal. */
const isCurrentHorizontal = computed(() => {
  return props.orientation.includes('horizontal')
})
</script>

<style scoped>
.external-side-volume {
  display               : flex;
  background            : var(--music-player-color-bg-main);
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  padding               : 6px;
  box-sizing            : border-box;
  flex-shrink           : 0;
  gap                   : 4px;
}

.external-side-volume.orientation-vertical {
  flex-direction        : column;
  align-items           : center;
}

.external-side-volume.orientation-vertical-flipped {
  flex-direction        : column-reverse;
  align-items           : center;
}

.external-side-volume.orientation-vertical.layout-wheel,
.external-side-volume.orientation-vertical-flipped.layout-wheel {
  height                : 88px;
}

.external-side-volume.orientation-vertical.layout-bar,
.external-side-volume.orientation-vertical-flipped.layout-bar {
  height                : 150px;
}

.external-side-volume.orientation-vertical .volume-control-container,
.external-side-volume.orientation-vertical-flipped .volume-control-container {
  flex-direction        : column;
  align-items           : center;
  gap                   : 2px;
  flex                  : 1;
}

/* --- HORIZONTAL ORIENTATIONS (COLLINEAR) --- */
.external-side-volume.orientation-horizontal,
.external-side-volume.orientation-horizontal-flipped {
  width                 : 100%;
  height                : auto !important;
  flex-direction        : row;
  align-items           : center;
  padding               : 8px 12px;
  gap                   : 10px;
}

.external-side-volume.orientation-horizontal-flipped {
  flex-direction        : row-reverse;
}

.external-side-volume.orientation-horizontal .mobile-slider-track,
.external-side-volume.orientation-horizontal-flipped .mobile-slider-track {
  display               : flex;
  flex                  : 1;
  height                : 26px;
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border);
  border-radius         : 6px;
  align-items           : center;
  padding               : 0 8px;
  box-sizing            : border-box;
}

.external-side-volume.orientation-horizontal .mobile-range-input,
.external-side-volume.orientation-horizontal-flipped .mobile-range-input {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 100%;
  height                : 6px;
  background            : linear-gradient(to right, var(--music-player-color-accent) var(--volume-percent, 0%), var(--music-player-color-bg-dark) var(--volume-percent, 0%));
  border-radius         : 3px;
  outline               : none;
  cursor                : pointer;
}

.external-side-volume.orientation-horizontal .mobile-range-input::-webkit-slider-thumb,
.external-side-volume.orientation-horizontal-flipped .mobile-range-input::-webkit-slider-thumb {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--music-player-color-accent);
  border                : var(--music-player-border);
}

.external-side-volume.orientation-horizontal .mobile-range-input::-moz-range-thumb,
.external-side-volume.orientation-horizontal-flipped .mobile-range-input::-moz-range-thumb {
  width                 : 14px;
  height                : 14px;
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  background            : var(--music-player-color-accent);
}

.external-side-volume.orientation-horizontal .mute-btn,
.external-side-volume.orientation-horizontal-flipped .mute-btn {
  width                 : 60px;
  height                : 28px;
  margin-top            : 0;
}

/* --- SHARED SUB-COMPONENT STYLES --- */
.control-label {
  font-size             : 0.55rem;
  font-weight           : 700;
  color                 : var(--music-player-color-accent-light);
  letter-spacing        : 0.5px;
  flex-shrink           : 0;
}

.thumbwheel {
  width                 : 26px;
  height                : 36px;
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  cursor                : ns-resize;
  position              : relative;
  overflow              : hidden;
}

.wheel-ridges {
  position              : absolute;
  top                   : 0;
  bottom                : 0;
  left                  : 0;
  right                 : 0;
  background            : repeating-linear-gradient(0deg, var(--music-player-color-bg-main), var(--music-player-color-bg-main) 2px, var(--music-player-border-color) 3px, var(--music-player-color-bg-main) 4px);
}

.vertical-slider-track {
  width                 : 24px;
  height                : 90px;
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  position              : relative;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  overflow              : hidden;
}

.vertical-range-input {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 86px;
  height                : 6px;
  background            : linear-gradient(to right, var(--music-player-color-accent) var(--volume-percent, 0%), var(--music-player-color-bg-dark) var(--volume-percent, 0%));
  border-radius         : 3px;
  transform             : rotate(-90deg);
  cursor                : pointer;
  outline               : none;
}

.vertical-range-input::-webkit-slider-thumb {
  -webkit-appearance    : none;
  appearance            : none;
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--music-player-color-accent);
  border                : var(--music-player-border);
}

.vertical-range-input::-moz-range-thumb {
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--music-player-color-accent);
  border                : var(--music-player-border);
}

.mute-btn {
  margin-top            : auto;
  flex-shrink           : 0;
  width                 : 32px;
  height                : 22px;
  font-family           : monospace;
  font-weight           : 700;
  --color-custom-button-background: var(--music-player-color-surface);
  --color-custom-button-text: var(--music-player-color-bg-secondary);
}

.mute-btn.active {
  --color-custom-button-background: var(--music-player-color-accent);
  --color-custom-button-text: var(--music-player-color-white);
}

@media (max-width: 480px) {
  .external-side-volume:not([class*="orientation-"]) {
    width               : 100%;
    height              : auto !important;
    flex-direction      : row;
    align-items         : center;
    padding             : 8px 12px;
    box-sizing          : border-box;
    gap                 : 10px;
  }
}
</style>