<template>
  <div class="music-player walkman-device">
    <div class="walkman-chassis">
      <div class="walkman-top-panel">
        <div class="model-badge">
          <span class="brand-name">WALKMAN</span>
        </div>
        <button 
          v-if          ="hasSpecialTapeAccess" 
          class         ="tape-toggle-btn" 
          @click        ="$emit('toggleTapeStyle')"
        >
          {{ showImageTape ? 'DEFAULT' : 'SPECIAL' }}
        </button>
      </div>

      <div class="walkman-control-board">
        <div class="lcd-panel">
          <div class="lcd-screen-inner">
            <div class="lcd-top-row">
              <span class="lcd-status-tag">{{ isPlaying ? 'PLAY' : 'STOP' }}</span>
              <span class="lcd-track-num">TRK {{ currentTrackIndex + 1 }}</span>
              <span class="lcd-time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
            </div>
            <input 
              type          ="range" 
              min           ="0" 
              :max          ="duration || 0" 
              step          ="0.1"
              :value        ="currentTime" 
              @input        ="$emit('seek', $event)"
              class         ="lcd-progress-slider"
            />
          </div>
        </div>
      </div>

      <div class="cassette-door" :class="{ spinning: isPlaying }">
        <div v-if="showImageTape && hasSpecialTapeAccess" class="custom-image-tape-container">
          <img :src="specialTapeImg" alt="Custom Cassette" class="custom-cassette-img" />
        </div>
        <div v-else class="cassette-shell">
          <div class="cassette-label-header">
            <span class="label-brand">ENCORE MIXTAPE</span>
            <span class="label-type">VOL.II</span>
          </div>

          <div class="cassette-window">
            <div class="reel left-reel">
              <div class="reel-hub"></div>
            </div>
            <div class="reel right-reel">
              <div class="reel-hub"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isPlaying            : Boolean,
  hasSpecialTapeAccess : Boolean,
  showImageTape        : Boolean,
  currentTrackIndex    : Number,
  currentTime          : Number,
  duration             : Number,
  specialTapeImg       : String,
  formatTime           : Function
})

defineEmits(['toggleTapeStyle', 'seek'])
</script>

<style scoped>
.music-player.walkman-device {
  display               : flex;
  flex-direction        : column;
  width                 : 100%;
  background            : var(--music-player-color-primary);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  padding               : 12px;
  border-radius         : var(--music-player-border-radius);
  box-sizing            : border-box;
  color                 : var(--music-player-color-bg-dark);
  font-family           : system-ui, -apple-system, sans-serif;
  user-select           : none;
}

.walkman-chassis {
  background            : var(--music-player-color-bg-main);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  border-radius         : 10px;
  padding               : 12px;
  display               : flex;
  flex-direction        : column;
  gap                   : 10px;
}

.walkman-top-panel {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
}

.model-badge {
  display               : flex;
  flex-direction        : column;
  align-items           : flex-start;
}

.brand-name {
  font-weight           : 900;
  font-size             : 0.75rem;
  letter-spacing        : 2px;
  color                 : var(--music-player-color-accent-light);
  font                  : var(--music_player-font-h1);
}

.tape-toggle-btn {
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  border-radius         : 4px;
  font-size             : 0.55rem;
  font-weight           : 700;
  padding               : 2px 6px;
  cursor                : pointer;
  color                 : var(--music-player-color-text-main);
}

.tape-toggle-btn:active {
  transform             : translateY(2px);
}

.cassette-door {
  position              : relative;
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  border-radius         : 6px;
  padding               : 8px;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  height                : 80px;
  box-sizing            : border-box;
  overflow              : hidden;
}

.custom-image-tape-container {
  width                 : 100%;
  height                : 100%;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  position              : relative;
}

.custom-cassette-img {
  width                 : 100%;
  height                : 100%;
  object-fit            : cover;
  display               : block;
}

.cassette-shell {
  width                 : 100%;
  background            : var(--music-player-color-text-main);
  border-radius         : 4px;
  padding               : 8px;
  box-sizing            : border-box;
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
}

.cassette-label-header {
  display               : flex;
  justify-content       : space-between;
  font                  : var(--music_player-font-p);
  font-size             : 0.5rem;
  font-weight           : 700;
  color                 : var(--music-player-color-placeholder-green);
  border-bottom         : 1px solid var(--music-player-color-accent-light);
  padding-bottom        : 2px;
}

.cassette-window {
  background            : var(--music-player-color-bg-dark);
  height                : 42px;
  border-radius         : 4px;
  display               : flex;
  justify-content       : space-around;
  align-items           : center;
  position              : relative;
  overflow              : hidden;
}

.reel {
  width                 : 28px;
  height                : 28px;
  border                : 3px dashed var(--music-player-color-accent-light);
  border-radius         : 50%;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  animation             : spin 2s linear infinite;
  animation-play-state  : paused;
}

.cassette-door.spinning .reel {
  animation-play-state  : running;
}

.reel-hub {
  width                 : 8px;
  height                : 8px;
  background            : var(--music-player-color-bg-main);
  border-radius         : 50%;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.walkman-control-board {
  display               : flex;
  flex-direction        : column;
}

.lcd-panel {
  background            : var(--music-player-color-bg-dark);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  border-radius         : 6px;
  padding               : 6px 10px;
}

.lcd-screen-inner {
  display               : flex;
  flex-direction        : column;
  gap                   : 4px;
}

.lcd-top-row {
  display               : flex;
  justify-content       : space-between;
  font                  : var(--music_player-font-p);
  font-size             : 0.7rem;
  font-weight           : 700;
  color                 : var(--music-player-color-text-muted);
}

.lcd-status-tag, .lcd-track-num, .lcd-time-display{
  color                 : var(--music-player-color-accent);
}

.lcd-progress-slider {
  width                 : 100%;
  accent-color          : var(--music-player-color-accent);
  cursor                : pointer;
  height                : 4px;
}

@media (max-height: 700px) {
  .cassette-window {
    height              : 30px;
  }
  .reel {
    width               : 20px;
    height              : 20px;
    border-width        : 2px;
  }
}
</style>