<template>
  <div class="top-buttons-bar">
    <CustomButton
      class            = "top-mech-btn"
      :icon-src        = "prevSvg"
      icon-size        = "16px"
      icon-color       = "var(--music-player-color-bg-secondary)"
      hover-icon-color = "var(--music-player-color-bg-secondary)"
      padding          = "0"
      width            = "100%"
      height           = "34px"
      title            = "Rewind"
      aria-label       = "Rewind"
      @click           = "$emit('prev')"
    />

    <CustomButton
      class            = "top-mech-btn play-mech-btn"
      :class           = "{ 'is-playing': isPlaying }"
      :icon-src        = "isPlaying ? pauseSvg : playSvg"
      icon-size        = "16px"
      icon-color       = "var(--music-player-color-bg-secondary)"
      hover-icon-color = "var(--music-player-color-bg-secondary)"
      padding          = "0"
      width            = "100%"
      height           = "34px"
      :title           = "isPlaying ? 'Pause' : 'Play'"
      :aria-label      = "isPlaying ? 'Pause' : 'Play'"
      @click           = "$emit('togglePlay')"
    />

    <CustomButton
      class            = "top-mech-btn"
      :icon-src        = "stopSvg"
      icon-size        = "16px"
      icon-color       = "var(--music-player-color-bg-secondary)"
      hover-icon-color = "var(--music-player-color-bg-secondary)"
      padding          = "0"
      width            = "100%"
      height           = "34px"
      title            = "Stop"
      aria-label       = "Stop"
      @click           = "$emit('stop')"
    />

    <CustomButton
      class            = "top-mech-btn"
      :icon-src        = "nextSvg"
      icon-size        = "16px"
      icon-color       = "var(--music-player-color-bg-secondary)"
      hover-icon-color = "var(--music-player-color-bg-secondary)"
      padding          = "0"
      width            = "100%"
      height           = "34px"
      title            = "Load / Next"
      aria-label       = "Load / Next"
      @click           = "$emit('next')"
    />

    <CustomButton
      class            = "top-mech-btn rec-mech-btn"
      :class           = "{ active: isRecording }"
      :icon-src        = "recSvg"
      icon-size        = "16px"
      icon-color       = "var(--music-player-color-bg-secondary)"
      hover-icon-color = "var(--music-player-color-bg-secondary)"
      padding          = "0"
      width            = "100%"
      height           = "34px"
      title            = "Record"
      aria-label       = "Record"
      @click           = "$emit('record')"
    />
  </div>
</template>

<script setup>
import CustomButton from '@/components/reusables/custom_button.vue'

import prevSvg      from '@/assets/svg/player-prev.svg'
import playSvg      from '@/assets/svg/player-play.svg'
import pauseSvg     from '@/assets/svg/player-pause.svg'
import stopSvg      from '@/assets/svg/player-stop.svg'
import nextSvg      from '@/assets/svg/player-next.svg'
import recSvg       from '@/assets/svg/player-rec.svg'

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
  border                : var(--music-player-border);
  border-radius         : 8px;
  box-sizing            : border-box;
  overflow              : visible;
}

.top-mech-btn {
  flex                  : 1;
  min-width             : 0;
  --color-custom-button-background: var(--music-player-color-surface);
}

.play-mech-btn {
  --color-custom-button-background: var(--music-player-color-playbt-paused);
}

.play-mech-btn:not(:disabled):active {
  --color-custom-button-background: var(--music-player-color-playbt-paused-pressed);
}

.play-mech-btn.is-playing {
  --color-custom-button-background: var(--music-player-color-playbt-playing); 
}

.play-mech-btn.is-playing:not(:disabled):active {
  --color-custom-button-background: var(--music-player-color-playbt-playing-pressed); 
}

.rec-mech-btn {
  --color-custom-button-background: #e74c3c;
}
</style>