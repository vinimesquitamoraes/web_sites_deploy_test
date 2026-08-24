<template>
  <div class="external-side-volume" :class="`layout-${volumeLayout}`">
    <div class="volume-control-container">
      <span class="control-label">VOL</span>
      
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

      <div class="mobile-slider-track">
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
    </div>

    <button 
      class         ="mute-btn" 
      @click        ="$emit('toggleMute')" 
      :class        ="{ active: isMuted }" 
      :title        ="isMuted ? 'Unmute' : 'Mute'" 
      :aria-label   ="isMuted ? 'Unmute' : 'Mute'"
    >
      {{ isMuted ? 'OFF' : 'MUT' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  volumeLayout : String,
  volume       : Number,
  isMuted      : Boolean
})

defineEmits(['wheelVolume', 'volumeChange', 'toggleMute'])
</script>

<style scoped>
.external-side-volume {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  background            : var(--music-player-color-bg-main);
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  padding               : 6px;
  box-sizing            : border-box;
  flex-shrink           : 0;
  gap                   : 4px;
}

.external-side-volume.layout-wheel {
  height                : 88px;
}

.external-side-volume.layout-bar {
  height                : 150px;
}

.volume-control-container {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  gap                   : 2px;
  flex                  : 1;
}

.control-label {
  font-size             : 0.55rem;
  font-weight           : 700;
  color                 : var(--music-player-color-accent-light);
  letter-spacing        : 0.5px;
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

.mobile-slider-track {
  display               : none;
}

.mute-btn {
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  color                 : var(--music-player-color-bg-secondary);
  font-size             : 0.55rem;
  font-weight           : 700;
  font-family           : monospace;
  width                 : 32px;
  height                : 22px;
  cursor                : pointer;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  margin-top            : auto;
}

.mute-btn:active {
  transform             : translateY(2px);
}

.mute-btn.active {
  background            : var(--music-player-color-accent);
  color                 : var(--music-player-color-white);
}

@media (max-width: 480px) {
  .external-side-volume {
    width               : 100%;
    height              : auto !important;
    flex-direction      : row;
    justify-content     : space-between;
    align-items         : center;
    padding             : 8px 12px;
    box-sizing          : border-box;
  }

  .volume-control-container {
    flex-direction      : row;
    align-items         : center;
    gap                 : 10px;
    flex                : 1;
    margin-right        : 12px;
  }

  .thumbwheel, .vertical-slider-track {
    display             : none !important;
  }

  .mobile-slider-track {
    display             : flex;
    flex                : 1;
    height              : 26px;
    background          : var(--music-player-color-surface);
    border              : var(--music-player-border);
    border-radius       : 6px;
    align-items         : center;
    padding             : 0 8px;
    box-sizing          : border-box;
  }

  .mobile-range-input {
    -webkit-appearance  : none;
    appearance          : none;
    width               : 100%;
    height              : 6px;
    background          : linear-gradient(to right, var(--music-player-color-accent) var(--volume-percent, 0%), var(--music-player-color-bg-dark) var(--volume-percent, 0%));
    border-radius       : 3px;
    outline             : none;
    cursor              : pointer;
  }

  .mobile-range-input::-webkit-slider-thumb {
    -webkit-appearance  : none;
    appearance          : none;
    width               : 14px;
    height              : 14px;
    border-radius       : 3px;
    background          : var(--music-player-color-accent);
    border              : var(--music-player-border);
  }

  .mobile-range-input::-moz-range-thumb {
    width               : 14px;
    height              : 14px;
    border              : var(--music-player-border);
    border-radius       : var(--music-player-border-radius);
    background          : var(--music-player-color-accent);
  }

  .mute-btn {
    width               : 60px;
    height              : 28px;
    margin-top          : 0;
  }
}
</style>