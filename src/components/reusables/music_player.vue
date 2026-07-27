<template>
  <div class="music-player-container">
    <div 
      class="music-player-wrapper" 
      :class="{ 'is-open': isOpen, 'is-ready': isReady }"
      :style="{ 
        bottom: playerBottom + 'px',
        left: (isCentered || footerBehavior === 'center') ? '50%' : '16px',
        right: 'auto',
        transform: (isCentered || footerBehavior === 'center') ? 'translateX(-50%)' : 'none',
        opacity: isHidden ? 0 : undefined,
        visibility: isHidden ? 'hidden' : 'visible'
      }"
    >
      <div class="hidden-player">
        <div id="youtube-player"></div>
      </div>

      <div class="player-outer-layout">
        <div class="player-card" :class="{ 'is-collapsed-height': !isOpen }">
  
          <div class="player-control-bar">
            <button class="expand-toggle-btn" @click="toggleOpen" :aria-label="isOpen ? 'Collapse Player' : 'Expand Player'">
              <span class="expand-icon-span" :class="{ 'is-expanded': isOpen }"></span>
            </button>

            <div class="top-buttons-bar">
              <button class="top-mech-btn" @click="prevTrack" title="Rewind" aria-label="Rewind">
                <span class="control-icon-span prev-svg"></span>
              </button>

              <button class="top-mech-btn play-mech-btn" :class="{ 'is-playing': isPlaying }" @click="togglePlay" :title="isPlaying ? 'Pause' : 'Play'" :aria-label="isPlaying ? 'Pause' : 'Play'">
                <span v-if="!isPlaying" class="control-icon-span play-svg"></span>
                <span v-else class="control-icon-span pause-svg"></span>
              </button>

              <button class="top-mech-btn" @click="stopPlayer" title="Stop" aria-label="Stop">
                <span class="control-icon-span stop-svg"></span>
              </button>

              <button class="top-mech-btn" @click="nextTrack" title="Load / Next" aria-label="Load / Next">
                <span class="control-icon-span next-svg"></span>
              </button>

              <button class="top-mech-btn rec-mech-btn" @click="handleRecClick" :class="{ active: isRecording }" title="Record" aria-label="Record">
                <span class="control-icon-span rec-svg"></span>
              </button>
            </div>
          </div>

          <div class="player-collapsible-content">
            <div class="music-player walkman-device">
              <div class="walkman-chassis">
                <div class="walkman-top-panel">
                  <div class="model-badge">
                    <span class="brand-name">WALKMAN</span>
                  </div>
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
                        type="range" 
                        min="0" 
                        :max="duration || 0" 
                        step="0.1"
                        :value="currentTime" 
                        @input="onSeek"
                        class="lcd-progress-slider"
                      />
                    </div>
                  </div>
                </div>

                <div class="cassette-door" :class="{ spinning: isPlaying }">
                  <div class="cassette-shell">
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

            <div class="playlist-container">
              <div class="playlist-header">
                <h3 class="playlist-title">Track List</h3>
              </div>

              <div class="playlist-content">
                <div class="playlist-body-area">
                  <div v-if="isLoadingTracks" class="loading-state">
                    Loading...
                  </div>

                  <ul class="track-list" v-else>
                    <li 
                      v-for="(track, index) in paginatedTracks" 
                      :key="track.id"
                      class="track-item"
                      :class="{ active: currentTrackIndex === getGlobalIndex(index) }"
                      @click="playTrack(index)"
                    >
                      <span class="track-number">{{ getGlobalIndex(index) + 1 }}</span>
                      <span class="track-name">{{ track.title }}</span>
                    </li>
                  </ul>
                </div>

                <div class="pagination-controls" :style="{ opacity: (!isLoadingTracks && totalPages > 1) ? 1 : 0, pointerEvents: (!isLoadingTracks && totalPages > 1) ? 'auto' : 'none' }">
                  <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">PREV</button>
                  <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
                  <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">NEXT</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="external-side-volume" :class="`layout-${volumeLayout}`">
          <div class="volume-control-container">
            <span class="control-label">VOL</span>
            
            <div v-if="volumeLayout === 'wheel'" class="thumbwheel" @wheel.prevent="onWheelVolume">
              <div class="wheel-ridges"></div>
            </div>

            <div v-else-if="volumeLayout === 'bar'" class="vertical-slider-track">
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                :value="volume" 
                @input="onVolumeChange"
                class="vertical-range-input"
                :style="{ '--volume-percent': volume + '%' }"
              />
            </div>

            <div class="mobile-slider-track">
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                :value="volume" 
                @input="onVolumeChange"
                class="mobile-range-input"
                :style="{ '--volume-percent': volume + '%' }"
              />
            </div>
          </div>

          <button class="mute-btn" @click="toggleMute" :class="{ active: isMuted }" :title="isMuted ? 'Unmute' : 'Mute'" :aria-label="isMuted ? 'Unmute' : 'Mute'">
            {{ isMuted ? 'OFF' : 'MUT' }}
          </button>
        </div>
      </div>
    </div>

    <ToasterNotification 
      v-model   ="showToast"
      :message  ="toastMessage"
      :icon     ="toastIcon"
      type      ="info"
      position  ="top-left"
      :duration ="4000"
      @close    ="handleToastClose"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ToasterNotification from '../reusables/notification_toaster.vue'

import nintenBoppinIcon from '@/assets/img/characters/Ninten_Boppin.gif'
import ninten67Icon     from '@/assets/img/funny/Ninten_67.gif'

const router = useRouter()

const props = defineProps({
  playlistId: {
    type    : String,
    required: true
  },
  pageSize: {
    type    : Number,
    default : 5
  },
  footerBehavior: {
    type: String,
    default: 'center',
    validator: (value) => ['center', 'stay', 'hide', 'overlap'].includes(value)
  },
  volumeLayout: {
    type: String,
    default: 'wheel',
    validator: (value) => ['wheel', 'bar'].includes(value)
  }
})

const isOpen            = ref(false)
const isPlaying         = ref(false)
const isRecording       = ref(false)
const recClickCount     = ref(0)
const currentTrackIndex = ref(0)
const currentTime       = ref(0)
const duration          = ref(0)
const volume            = ref(80)
const isMuted           = ref(false)
const tracks            = ref([])
const currentPage       = ref(1)
const isLoadingTracks   = ref(true)

const playerBottom      = ref(16)
const isCentered        = ref(false)
const isHidden          = ref(false)
const isReady           = ref(false)

const showToast         = ref(false)
const toastMessage      = ref('')
const defaultToastIcon  = ref(nintenBoppinIcon)
const toastIcon         = ref(nintenBoppinIcon)

let player              = null
let progressInterval    = null
let lastVolume          = 80

const handle_footer_overlap = () => {
  const footerEl = document.querySelector('.footer-container')
  if (!footerEl) {
    playerBottom.value = 16
    isCentered.value = false
    isHidden.value = false
    isReady.value = true
    return
  }

  const footerRect = footerEl.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const overlap = windowHeight - footerRect.top

  isCentered.value = false
  isHidden.value = false
  playerBottom.value = 16

  if (overlap > 0) {
    switch (props.footerBehavior) {
      case 'overlap':
        break
      case 'center':
        playerBottom.value = overlap + 16
        isCentered.value = true
        break
      case 'stay':
        playerBottom.value = overlap + 16
        isCentered.value = false
        break
      case 'hide':
        isHidden.value = true
        break
    }
  }
  isReady.value = true
}

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const extractPlaylistId = (urlOrId) => {
  if (!urlOrId) return ''
  if (!urlOrId.includes('http')) return urlOrId.trim()
  try {
    const url = new URL(urlOrId)
    return url.searchParams.get('list') || urlOrId
  } catch {
    return urlOrId
  }
}

const totalPages = computed(() => {
  if (tracks.value.length === 0) return 1
  return Math.ceil(tracks.value.length / props.pageSize)
})

const paginatedTracks = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return tracks.value.slice(start, end)
})

const getGlobalIndex = (index) => {
  return (currentPage.value - 1) * props.pageSize + index
}

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds <= 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

const initPlayer = () => {
  if (!window.YT) {
    const tag               = document.createElement('script')
    tag.src                 = 'https://www.youtube.com/iframe_api'
    const firstScriptTag    = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = createPlayer
  } else {
    createPlayer()
  }
}

const createPlayer = () => {
  const cleanListId = extractPlaylistId(props.playlistId)

  player = new window.YT.Player('youtube-player', {
    height     : '200',
    width      : '200',
    playerVars : {
      autoplay   : 0,
      controls   : 0,
      enablejsapi: 1,
      origin     : window.location.origin
    },
    events     : {
      onReady    : (e) => onPlayerReady(e, cleanListId),
      onStateChange : onPlayerStateChange,
      onError    : onPlayerError
    }
  })
}

const onPlayerReady = (event, listId) => {
  if (!listId) return
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(volume.value)
  }
  player.cuePlaylist({
    list: listId,
    listType: 'playlist'
  })
  setTimeout(syncPlayerState, 800)
}

const onPlayerError = (event) => {}

const onPlayerStateChange = (event) => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    isPlaying.value = true
    startProgressInterval()
    syncPlayerState()

    const currentTrack = tracks.value[currentTrackIndex.value]
    const trackTitle = currentTrack ? currentTrack.title : 'Unknown Track'
    
    toastMessage.value = `Now Playing: ${trackTitle}`
    showToast.value = true

  } else if (event.data === window.YT.PlayerState.PAUSED) {
    showToast.value = false
    isPlaying.value = false
    stopProgressInterval()
  } else if (event.data === window.YT.PlayerState.ENDED) {
    showToast.value = false
    isPlaying.value = false
    stopProgressInterval()
    handleTrackEnded()
  }
}

const handleTrackEnded = () => {
  nextTrack()
}

const syncPlayerState = async () => {
  if (!player || typeof player.getPlaylist !== 'function') return
  
  const playlistIds = player.getPlaylist()
  if (playlistIds && playlistIds.length > 0) {
    if (tracks.value.length === 0 || tracks.value.length !== playlistIds.length) {
      tracks.value = playlistIds.map((id, idx) => ({
        id,
        title: `Track ${idx + 1}`
      }))

      isLoadingTracks.value = true
      await Promise.all(playlistIds.map(async (id, idx) => {
        try {
          const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}&format=json`)
          const data = await res.json()
          if (data && data.title) {
            tracks.value[idx].title = data.title
          }
        } catch {}
      }))
      isLoadingTracks.value = false
    }
  }

  const index = player.getPlaylistIndex()
  if (index !== undefined && index >= 0) {
    currentTrackIndex.value = index
    currentPage.value = Math.floor(index / props.pageSize) + 1
  }

  duration.value = player.getDuration() || 0
}

const startProgressInterval = () => {
  stopProgressInterval()
  progressInterval = setInterval(() => {
    if (player && typeof player.getCurrentTime === 'function' && isPlaying.value) {
      currentTime.value = player.getCurrentTime()
      const dur = player.getDuration()
      if (dur) duration.value = dur
    }
  }, 200)
}

const stopProgressInterval = () => {
  if (progressInterval) clearInterval(progressInterval)
}

const togglePlay = () => {
  if (!player) return
  const state = player.getPlayerState()
  if (state === window.YT.PlayerState.PLAYING) {
    player.pauseVideo()
  } else {
    player.playVideo()
  }
}

const stopPlayer = () => {
  if (!player) return
  if (typeof player.stopVideo === 'function') {
    player.stopVideo()
  } else {
    player.pauseVideo()
    if (typeof player.seekTo === 'function') player.seekTo(0, true)
  }
  isPlaying.value = false
  currentTime.value = 0
  stopProgressInterval()
}

const toggleRec = () => {
  isRecording.value = !isRecording.value
}

const handleRecClick = () => {
  toggleRec()
  recClickCount.value++
 
  if (recClickCount.value >= 5) {
    recClickCount.value = 0
    toastMessage.value  = '67'
    showToast.value     = true
    toastIcon.value     = ninten67Icon
    
    sessionStorage.setItem('unlocked_dogten', 'true')
    setTimeout(() => {
      router.push('/dogten')
    }, 1500)
  }
}

const handleToastClose = () => {
  toastIcon.value = defaultToastIcon.value 
}

const nextTrack = () => {
  if (player && typeof player.nextVideo === 'function') {
    player.nextVideo()
    setTimeout(syncPlayerState, 400)
  }
}

const prevTrack = () => {
  if (player && typeof player.previousVideo === 'function') {
    player.previousVideo()
    setTimeout(syncPlayerState, 400)
  }
}

const playTrack = (index) => {
  const globalIndex = getGlobalIndex(index)
  currentTrackIndex.value = globalIndex
  if (player && typeof player.playVideoAt === 'function') {
    player.playVideoAt(globalIndex)
    setTimeout(syncPlayerState, 400)
  }
}

const onSeek = (e) => {
  const val = parseFloat(e.target.value)
  currentTime.value = val
  if (player && typeof player.seekTo === 'function') {
    player.seekTo(val, true)
  }
}

const onVolumeChange = (e) => {
  const val = parseFloat(e.target.value)
  volume.value = val
  if (isMuted.value) {
    isMuted.value = false
    if (player && typeof player.unMute === 'function') player.unMute()
  }
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(val)
  }
}

const onWheelVolume = (e) => {
  let newVol = volume.value + (e.deltaY < 0 ? 5 : -5)
  newVol = Math.max(0, Math.min(100, newVol))
  volume.value = newVol
  if (isMuted.value) {
    isMuted.value = false
    if (player && typeof player.unMute === 'function') player.unMute()
  }
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(newVol)
  }
}

const toggleMute = () => {
  if (!player) return
  if (isMuted.value) {
    isMuted.value = false
    volume.value = lastVolume
    if (typeof player.unMute === 'function') player.unMute()
    if (typeof player.setVolume === 'function') player.setVolume(volume.value)
  } else {
    isMuted.value = true
    lastVolume = volume.value
    volume.value = 0
    if (typeof player.mute === 'function') player.mute()
    if (typeof player.setVolume === 'function') player.setVolume(0)
  }
}

onMounted(() => {
  initPlayer()
  window.addEventListener('scroll', handle_footer_overlap, { passive: true })
  setTimeout(handle_footer_overlap, 50)
})

onUnmounted(() => {
  stopProgressInterval()
  window.removeEventListener('scroll', handle_footer_overlap)
})
</script>

<style scoped>
@keyframes playerEntrance {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.music-player-wrapper {
  position              : fixed;
  bottom                : 16px;
  z-index               : 100;
  display               : flex;
  flex-direction        : column;
  width                 : auto;
  box-sizing            : border-box;
  pointer-events        : none;
  opacity               : 0;
  visibility            : hidden;
  transition            : bottom 0.2s ease-out, left 0.2s ease-out, opacity 0.2s ease-out, visibility 0.2s ease-out;
}

.music-player-wrapper.is-ready {
  pointer-events        : auto;
  visibility            : visible;
  /* damn animation speed here, AHHHHHHHHHHHHHHHHHHHHHHHHHHHH */
  animation             : playerEntrance 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.player-outer-layout {
  display               : flex;
  align-items           : flex-start;
  gap                   : 12px;
}

.player-card {
  display               : flex;
  flex-direction        : column;
  background            : var(--color-bg-main);
  border                : 2px solid #000000;
  border-radius         : 12px;
  box-shadow            : var(--music-player-shadow);
  overflow              : hidden;
  width                 : 360px;
  max-width             : calc(100vw - 32px);
  box-sizing            : border-box;
  transition            : height 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.player-card.is-collapsed-height {
  height                : 88px !important; 
}

.player-control-bar {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  background            : var(--color-bg-main);
  padding               : 6px 8px 10px 8px;
  gap                   : 4px;
  z-index               : 2;
  box-sizing            : border-box;
}

.expand-toggle-btn {
  background            : transparent;
  border                : none;
  cursor                : pointer;
  padding               : 2px 16px;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  width                 : 100%;
}

.expand-icon-span {
  width                 : 22px;
  height                : 22px;
  background-color      : var(--color-accent-light);
  -webkit-mask-image    : url('@/assets/svg/triangle-up-12-filled.svg');
  mask-image            : url('@/assets/svg/triangle-up-12-filled.svg');
  -webkit-mask-size     : contain;
  mask-size             : contain;
  -webkit-mask-repeat   : no-repeat;
  mask-repeat           : no-repeat;
  -webkit-mask-position : center;
  mask-position         : center;
  transition            : transform 0.3s ease, background-color 0.15s;
}

.expand-icon-span.is-expanded {
  transform             : rotate(180deg);
}

.expand-toggle-btn:hover .expand-icon-span {
  background-color      : var(--color-white);
}

.player-collapsible-content {
  display               : flex;
  flex-direction        : column;
  gap                   : 12px;
  max-height            : 0;
  opacity               : 0;
  overflow              : hidden;
  padding               : 0 12px;
  transition            : max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, padding 0.55s ease;
  pointer-events        : none;
}

.music-player-wrapper.is-open .player-collapsible-content {
  max-height            : 600px;
  opacity               : 1;
  padding               : 0 12px 12px 12px;
  pointer-events        : auto;
}

.hidden-player {
  position              : absolute;
  width                 : 1px;
  height                : 1px;
  overflow              : hidden;
  left                  : -9999px;
  opacity               : 0;
  pointer-events        : none;
}

.external-side-volume {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  background            : var(--color-bg-main);
  border                : 2px solid #000000;
  border-radius         : 12px;
  box-shadow            : var(--music-player-shadow);
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
  color                 : var(--color-accent-light);
  letter-spacing        : 0.5px;
}

.thumbwheel {
  width                 : 26px;
  height                : 36px;
  background            : var(--color-surface);
  border-radius         : 4px;
  border                : 2px solid #000000;
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
  background            : repeating-linear-gradient(0deg, var(--color-bg-main), var(--color-bg-main) 2px, #000000 3px, var(--color-bg-main) 4px);
}

.vertical-slider-track {
  width                 : 24px;
  height                : 90px;
  background            : var(--color-surface);
  border                : 2px solid #000000;
  border-radius         : 6px;
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
  background            : linear-gradient(to right, var(--color-accent) var(--volume-percent, 0%), var(--color-bg-dark) var(--volume-percent, 0%));
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
  background            : var(--color-accent);
  border                : 2px solid #000000;
  box-shadow            : 0px 1px 0px #000000;
}

.vertical-range-input::-moz-range-thumb {
  width                 : 14px;
  height                : 14px;
  border-radius         : 3px;
  background            : var(--color-accent);
  border                : 2px solid #000000;
  box-shadow            : 0px 1px 0px #000000;
}

.mobile-slider-track {
  display               : none;
}

.mute-btn {
  background            : var(--color-surface);
  border                : 2px solid #000000;
  border-radius         : 6px;
  box-shadow            : 0 3px 0 #000000;
  color                 : var(--color-text-main);
  font-size             : 0.55rem;
  font-weight           : 700;
  font-family           : monospace;
  width                 : 32px;
  height                : 22px;
  cursor                : pointer;
  transition            : transform 0.05s ease, box-shadow 0.05s ease;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  margin-top            : auto;
}

.mute-btn:active {
  transform             : translateY(2px);
  box-shadow            : 0 1px 0 #000000;
}

.mute-btn.active {
  background            : var(--color-accent);
  color                 : var(--color-white);
}

.top-buttons-bar {
  display               : flex;
  justify-content       : center;
  gap                   : 6px;
  width                 : 100%;
  background            : var(--color-bg-dark);
  border                : 2px solid #000000;
  padding               : 4px 6px; 
  border-radius         : 8px;
  box-sizing            : border-box;
  overflow              : visible;
}

.top-mech-btn {
  flex                  : 1;
  height                : 34px;
  background            : var(--color-surface);
  border                : 2px solid #000000;
  border-radius         : 6px;
  box-shadow            : 0 3px 0 #000000;
  cursor                : pointer;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  transition            : transform 0.05s ease, box-shadow 0.05s ease;
  padding               : 0;
  min-width             : 0;
}

.top-mech-btn:active, .top-mech-btn.active {
  transform             : translateY(2px);
  box-shadow            : 0 1px 0 #000000;
}

.play-mech-btn {
  background            : var(--color-music-player-playbt-paused);
}

.play-mech-btn:active {
  background            : var(--color-music-player-playbt-paused-pressed);
}

.play-mech-btn.is-playing {
  background            : var(--color-music-player-playbt-playing); 
}

.play-mech-btn.is-playing:active {
  background            : var( --color-music-player-playbt-playing-pressed); 
}

.rec-mech-btn {
  background            : #e74c3c;
}

.control-icon-span {
  display               : block;
  width                 : 16px;
  height                : 16px;
  background-color      : var(--color-text-main);
  -webkit-mask-size     : contain;
  mask-size             : contain;
  -webkit-mask-repeat   : no-repeat;
  mask-repeat           : no-repeat;
  -webkit-mask-position : center;
  mask-position         : center;
  pointer-events        : none;
}

.top-mech-btn:hover .control-icon-span {
  background-color      : #ffffff;
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

.music-player.walkman-device {
  display               : flex;
  flex-direction        : column;
  width                 : 100%;
  background            : var(--color-primary);
  border                : 2px solid #000000;
  box-shadow            : 0px 4px 0px #000000;
  padding               : 12px;
  border-radius         : 12px;
  box-sizing            : border-box;
  color                 : var(--color-bg-dark);
  font-family           : system-ui, -apple-system, sans-serif;
  user-select           : none;
}

.walkman-chassis {
  background            : var(--color-bg-main);
  border                : 2px solid #000000;
  border-radius         : 10px;
  padding               : 12px;
  display               : flex;
  flex-direction        : column;
  gap                   : 10px;
}

.walkman-top-panel {
  display               : flex;
  justify-content       : center;
  align-items           : center;
}

.model-badge {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
}

.brand-name {
  font-weight           : 900;
  font-size             : 0.75rem;
  letter-spacing        : 2px;
  color                 : var(--color-accent-light);
  font                  : var(--font-h1);
}

.cassette-door {
  position              : relative;
  background            : var(--color-surface);
  border                : 2px solid #000000;
  border-radius         : 6px;
  padding               : 8px;
  display               : flex;
  justify-content       : center;
  align-items           : center;
}

.cassette-shell {
  width                 : 100%;
  background            : var(--color-text-main);
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
  font                  : var(--font-p);
  font-size             : 0.5rem;
  font-weight           : 700;
  color                 : var(--color-placeholder-green);
  border-bottom         : 1px solid var(--color-accent-light);
  padding-bottom        : 2px;
}

.cassette-window {
  background            : var(--color-bg-dark);
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
  border                : 3px dashed var(--color-accent-light);
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
  background            : var(--color-bg-main);
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
  background            : var(--color-bg-dark);
  border                : 2px solid #000000;
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
  font                  : var(--font-p);
  font-size             : 0.7rem;
  font-weight           : 700;
  color                 : var(--color-text-muted);
}

.lcd-status-tag {
  color                 : var(--color-accent);
}

.lcd-progress-slider {
  width                 : 100%;
  accent-color          : var(--color-accent);
  cursor                : pointer;
  height                : 4px;
}

.playlist-container {
  display               : flex;
  flex-direction        : column;
  gap                   : 8px;
  background            : var(--color-primary);
  border                : 2px solid #000000;
  box-shadow            : 0px 4px 0px #000000;
  padding               : 10px;
  border-radius         : 12px;
}

.playlist-header {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
  background            : var(--color-bg-main);
  border                : 2px solid #000000;
  padding               : 8px 12px;
  border-radius         : 6px;
  user-select           : none;
}

.playlist-title {
  font-size             : 0.8rem;
  margin                : 0;
  font-weight           : 700;
  color                 : var(--color-text-main);
}

.playlist-content {
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
  height                : 215px;
  justify-content       : space-between;
  overflow              : hidden;
  box-sizing            : border-box;
}

.playlist-body-area {
  display               : flex;
  flex-direction        : column;
  flex                  : 1;
  overflow              : hidden;
}

.loading-state {
  display               : flex;
  justify-content       : center;
  align-items           : center;
  flex                  : 1;
  color                 : var(--color-text-muted);
  font-size             : 0.8rem;
  background            : var(--color-text-main);
  border-radius         : 6px;
  font-family           : monospace;
}

.track-list {
  list-style            : none;
  padding               : 0;
  margin                : 0;
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
  flex                  : 1;
  overflow-y            : auto;
  font                  : var(--font-p);
  font-size             : var(--font-p-size);
  padding-bottom        : 10px;
}

.track-item {
  display               : flex;
  align-items           : center;
  gap                   : 10px;
  padding               : 8px 10px;
  background            : var(--color-text-main);
  border                : 2px solid #000000;
  border-radius         : 6px;
  box-shadow            : 0 3px 0 #000000;
  cursor                : pointer;
  transition            : transform 0.05s ease, box-shadow 0.05s ease;
}

.track-item:active {
  transform             : translateY(2px);
  box-shadow            : 0 1px 0 #000000;
}

.track-item.active {
  background            : var(--color-accent);
  color                 : var(--color-white);
  font-weight           : 700;
  font                  : var(--font-p);
  font-size             : var(--font-p-size);
}

.track-number {
  color                 : var(--color-primary);
  font                  : var(--font-p);
  font-size             : var(--font-p-size);
}

.track-item.active .track-number {
  color                 : var(--color-accent-light);
}

.track-name {
  white-space           : nowrap;
  overflow              : hidden;
  text-overflow         : ellipsis;
  font                  : var(--font-p);
  font-size             : var(--font-track-names-size);
}

.pagination-controls {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
  padding               : 4px 0;
  height                : 30px;
  box-sizing            : border-box;
  transition            : opacity 0.2s ease;
}

.page-btn {
  background            : var(--color-bg-main);
  color                 : var(--color-text-main);
  border                : 2px solid #000000;

  padding               : 6px 12px;
  border-radius         : 6px;
  cursor                : pointer;
  font-size             : 0.7rem;
  font-weight           : 700;
  font-family           : var(--font-p);
  transition            : transform 0.05s ease, box-shadow 0.05s ease;
}

.page-btn:active:not(:disabled) {
  transform             : translateY(2px);
  box-shadow            : 0 1px 0 #000000;
}

.page-btn:disabled {
  opacity               : 0.3;
  cursor                : not-allowed;
  box-shadow            : none;
}

.page-info {
  font-size             : 0.75rem;
  color                 : var(--color-accent-light);
  font-family           : monospace;
}

@media (max-width: 480px) {
  .music-player-wrapper {
    left                : 16px !important;
    right               : 28px !important;
    transform           : none !important;
    width               : auto !important;
    max-width           : none;
  }

  .player-outer-layout {
    width               : 100%;
    flex-direction      : column;
    align-items         : stretch;
    gap                 : 8px;
    padding-bottom      : 14px;
  }

  .player-card {
    width               : 100%;
    max-width           : none;
  }

  .player-card.is-collapsed-height {
    height              : auto !important; 
  }

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
    background          : var(--color-surface);
    border              : 2px solid #000000;
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
    background          : linear-gradient(to right, var(--color-accent) var(--volume-percent, 0%), var(--color-bg-dark) var(--volume-percent, 0%));
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
    background            : var(--color-accent);
    border                : 2px solid #000000;
    box-shadow          : 0px 1px 0px #000000;
  }

  .mobile-range-input::-moz-range-thumb {
    width               : 14px;
    height              : 14px;
    border-radius       : 3px;
    background          : var(--color-accent);
    border              : 2px solid #000000;
    box-shadow          : 0px 1px 0px #000000;
  }

  .mute-btn {
    width               : 60px;
    height              : 28px;
    margin-top          : 0;
  }
}
</style>