<template>
  <div class="top-buttons-bar">
    <button class="top-mech-btn" @click="$emit('prev')" title="Rewind" aria-label="Rewind">
      <span class="control-icon-span prev-svg"></span>
    </button>

    <button 
      class         ="top-mech-btn play-mech-btn" 
      :class        ="{ 'is-playing': isPlaying }" 
      @click        ="$emit('togglePlay')" 
      :title        ="isPlaying ? 'Pause' : 'Play'" 
      :aria-label   ="isPlaying ? 'Pause' : 'Play'"
    >
      <span v-if="!isPlaying" class="control-icon-span play-svg"></span>
      <span v-else class="control-icon-span pause-svg"></span>
    </button>

    <button class="top-mech-btn" @click="$emit('stop')" title="Stop" aria-label="Stop">
      <span class="control-icon-span stop-svg"></span>
    </button>

    <button class="top-mech-btn" @click="$emit('next')" title="Load / Next" aria-label="Load / Next">
      <span class="control-icon-span next-svg"></span>
    </button>

    <button 
      class         ="top-mech-btn rec-mech-btn" 
      @click        ="$emit('record')" 
      :class        ="{ active: isRecording }" 
      title         ="Record" 
      aria-label    ="Record"
    >
      <span class="control-icon-span rec-svg"></span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  isPlaying   : Boolean,
  isRecording : Boolean
})

defineEmits(['prev', 'togglePlay', 'stop', 'next', 'record'])
</script>

<style scoped>
.top-buttons-bar {
  display               : flex;
  justify-content       : center;
  gap                   : 6px;
  width                 : 100%;
  background            : var(--music-player-color-bg-dark);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  padding               : 4px 6px; 
  border-radius         : 8px;
  box-sizing            : border-box;
  overflow              : visible;
}

.top-mech-btn {
  flex                  : 1;
  height                : 34px;
  background            : var(--music-player-color-surface);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  border-radius         : 6px;
  cursor                : pointer;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  padding               : 0;
  min-width             : 0;
}

.top-mech-btn:active, .top-mech-btn.active {
  transform             : translateY(2px);
}

.play-mech-btn {
  background            : var(--music-player-color-playbt-paused);
}

.play-mech-btn:active {
  background            : var(--music-player-color-playbt-paused-pressed);
}

.play-mech-btn.is-playing {
  background            : var(--music-player-color-playbt-playing); 
}

.play-mech-btn.is-playing:active {
  background            : var(--music-player-color-playbt-playing-pressed); 
}

.rec-mech-btn {
  background            : #e74c3c;
}

.control-icon-span {
  display               : block;
  width                 : 16px;
  height                : 16px;
  background-color      : var(--music-player-color-text-main);
  -webkit-mask-size     : contain;
  mask-size             : contain;
  -webkit-mask-repeat   : no-repeat;
  mask-repeat           : no-repeat;
  -webkit-mask-position : center;
  mask-position         : center;
  pointer-events        : none;
}

.top-mech-btn:hover .control-icon-span {
  background-color      : var(--music-player-color-white);
}

.prev-svg {
  -webkit-mask-image    : url('@/assets/svg/player-prev.svg');
  mask-image            : url('@/assets/svg/player-prev.svg');
}

.play-svg {
  -webkit-mask-image    : url('@/assets/svg/player-play.svg');
  mask-image            : url('@/assets/svg/player-play.svg');
}

.pause-svg {
  -webkit-mask-image    : url('@/assets/svg/player-pause.svg');
  mask-image            : url('@/assets/svg/player-pause.svg');
}

.stop-svg {
  -webkit-mask-image    : url('@/assets/svg/player-stop.svg');
  mask-image            : url('@/assets/svg/player-stop.svg');
}

.next-svg {
  -webkit-mask-image    : url('@/assets/svg/player-next.svg');
  mask-image            : url('@/assets/svg/player-next.svg');
}

.rec-svg {
  -webkit-mask-image    : url('@/assets/svg/player-rec.svg');
  mask-image            : url('@/assets/svg/player-rec.svg');
}
</style>