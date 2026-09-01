<template>
  <div class="music-player-container">
    <div 
      class         = "music-player-wrapper" 
      :class        = "{ 
        'is-open'       : isOpen, 
        'is-ready'      : isReady, 
        'special-theme' : showImageTape && hasSpecialTapeAccess,
        'compact-mode'  : isPlayerHidden 
      }"
      :style        = "{ 
        bottom     : playerBottom + 'px',
        left       : (isCentered || footerBehavior === 'center') ? '50%' : '16px',
        right      : 'auto',
        transform  : (isCentered || footerBehavior === 'center') ? 'translateX(-50%)' : 'none',
        opacity    : isHidden ? 0 : undefined,
        visibility : isHidden ? 'hidden' : 'visible'
      }"
    >
      <div class="hidden-player">
        <div id="youtube-player"></div>
      </div>

      <Transition name="compact-pop" @leave="onCompactLeave">
        <div v-if="isPlayerHidden" class="compact-button-wrapper">
          <CustomButton 
            :iconSrc        = "musicNoteSvg"
            class           = 'compact-button'
            iconSize        = 'var(--music_player-compact-button-icon-size)'
            width           = 'var(--music_player-compact-button-size)'
            height          = 'var(--music_player-compact-button-size)'
            bg-color        = 'var(--music_player-compact-button-color-bg)'
            hover-bg-color  = 'var(--music_player-compact-button-color-bg-hover)'
            icon-color      = 'var(--music_player-compact-button-color-icon)'
            hover-icon-color= 'var(--music_player-compact-button-color-icon-hover)'
            
            aria-label      = "Expand Music Player"
            @click          = "toggleCompactOpen"
          />

          <FloatingNotes 
            :active="isPlaying" 
            :colors="['#00cec9', '#fd79a8', '#ffeaa7']"
            speed="1.2s"
            distance="-60px"            
          />
        </div>
      </Transition>

      <Transition name="slide-out-left" @after-leave="onPlayerHiddenComplete">
        <div v-if="!isPlayerHiddenAction" class="player-outer-layout" :class="[`player-orientation-${orientation}`]">
          <div class="player-card">
            <div class="player-control-bar">
              <div class="control-bar-buttons">
                <button 
                  class         = "secondary-action-btn"
                  @click        = "handleSecondaryAction"
                  aria-label    = "Minimize Player"
                >
                  <span class="secondary-icon-span"></span>
                </button>

                <button 
                  class         = "expand-toggle-btn" 
                  @click        = "toggleOpen" 
                  :aria-label   = "isOpen ? 'Collapse Player' : 'Expand Player'"
                >
                  <span class="expand-icon-span" :class="{ 'is-expanded': isOpen }"></span>
                </button>
              </div>

              <PlayerControls 
                :playlistId   = "playlistId"
                :isPlaying    = "isPlaying" 
                :isRecording  = "isRecording"
                @prev         = "prevTrack"
                @togglePlay   = "togglePlay"
                @stop         = "stopPlayer"
                @next         = "nextTrack"
                @record       = "handleRecClick"
              />
            </div>

            <div class="player-collapsible-content">
              <WalkmanDevice 
                class="mobile-hidden-walkman"
                :isPlaying            = "isPlaying"
                :hasSpecialTapeAccess = "hasSpecialTapeAccess"
                :showImageTape        = "showImageTape"
                :currentTrackIndex    = "currentTrackIndex"
                :currentTime          = "currentTime"
                :duration             = "duration"
                :specialTapeImg       = "ferris_special_tape"
                :formatTime           = "formatTime"
                @toggleTapeStyle      = "toggleTapeStyle"
                @seek                 = "onSeek"
              />

              <PlaylistView 
                :isLoadingTracks   = "isLoadingTracks"
                :paginatedTracks   = "paginatedTracks"
                :currentTrackIndex = "currentTrackIndex"
                :currentPage       = "currentPage"
                :totalPages        = "totalPages"
                :getGlobalIndex    = "getGlobalIndex"
                @playTrack         = "playTrack"
                @updatePage        = "(val) => currentPage = val"
              />
            </div>
          </div>

          <VolumeControl 
            :volumeLayout  = "volumeLayout"
            :volume        = "volume"
            :isMuted       = "isMuted"
            :orientation   = "orientation"
            @wheelVolume   = "onWheelVolume"
            @volumeChange  = "onVolumeChange"
            @toggleMute    = "toggleMute"
          />
        </div>
      </Transition>
    </div>

    <ToasterNotification 
      v-model     = "showToast"
      :message    = "toastMessage"
      :icon       = "toastIcon"
      type        = "info"
      position    = "top-left"
      :duration   = "4000"
      @close      = "handleToastClose"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n }  from '@/composables/useI18n'
import { useRouter } from 'vue-router'

import ToasterNotification  from '@/components/reusables/notification_toaster.vue'
import CustomButton         from '@/components/reusables/custom_button.vue'

import PlayerControls  from '@/components/reusables/music_player_controls.vue'
import WalkmanDevice   from '@/components/reusables/music_player_walkman.vue'
import PlaylistView    from '@/components/reusables/music_player_playlist.vue'
import VolumeControl   from '@/components/reusables/music_player_volume_control.vue'
import FloatingNotes   from '@/components/reusables/music_player_floating_notes.vue'

import musicNoteSvg         from '@/assets/svg/music-note-4-svgrepo-com.svg'
import nintenBoppinIcon     from '@/assets/img/characters/Ninten_Boppin.gif'
import ninten67Icon         from '@/assets/img/funny/Ninten_67.gif'
import ferris_special_tape  from '@/assets/img/funny/ferris_special_mixtape.png'

const router = useRouter()
const { t } = useI18n()
const props = defineProps({
  playlistId: {
    type    : String,
    required: true
  },
  pageSize: {
    type    : Number,
    default : 7
  },
  footerBehavior: {
    type    : String,
    default : 'center',
    validator: (value) => ['center', 'stay', 'hide', 'overlap'].includes(value)
  },
  volumeLayout: {
    type    : String,
    default : 'wheel',
    validator: (value) => ['wheel', 'bar'].includes(value)
  },
  minimizedBehavior: {
    type    : String,
    default : 'default',
    validator: (value) => ['default', 'compact'].includes(value)
  },
  orientation: {
    type    : String,
    default : 'horizontal',
    validator: (value) => ['horizontal', 'vertical', 'horizontal-flipped', 'vertical-flipped'].includes(value)
  }
})

const isOpen              = ref(false)

const isPlayerHidden      = ref(true)
const isPlayerHiddenAction = ref(true)

const isPlaying           = ref(false)
const isRecording         = ref(false)
const recClickCount       = ref(0)
const currentTrackIndex   = ref(0)
const currentTime         = ref(0)
const duration            = ref(0)
const volume              = ref(20)
const isMuted             = ref(false)
const tracks              = ref([])
const currentPage         = ref(1)
const isLoadingTracks     = ref(true)
const showImageTape       = ref(false)

const hasSpecialTapeAccess = ref(sessionStorage.getItem('unlocked_special_tape') === 'true')

const playerBottom        = ref(16)
const isCentered          = ref(false)
const isHidden            = ref(false)
const isReady             = ref(false)

const showToast           = ref(false)
const toastMessage        = ref('')
const defaultToastIcon    = ref(nintenBoppinIcon)
const toastIcon           = ref(nintenBoppinIcon)

let player                = null
let progressInterval      = null
let lastVolume            = 80

const toggleTapeStyle = () => {
  showImageTape.value = !showImageTape.value
}

const handleSecondaryAction = () => {
  isPlayerHiddenAction.value = true
  isOpen.value = false
}

const onPlayerHiddenComplete = () => {
  isPlayerHidden.value = true
}

const handle_footer_overlap = () => {
  const footerEl = document.querySelector('.footer-container')
  if (!footerEl) {
    playerBottom.value = 30
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

const toggleCompactOpen = () => {
  isPlayerHidden.value = false
  isPlayerHiddenAction.value = false
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
      onReady       : (e) => onPlayerReady(e, cleanListId),
      onStateChange : onPlayerStateChange,
      onError       : onPlayerError
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
    
    toastMessage.value = `${t('SITE_MUSIC_PLAYER_TOASTER_NOTIF')}: ${trackTitle}`
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

const onCompactLeave = (el) => {
  el.style.opacity = '0'
  el.style.visibility = 'hidden'
  el.style.transition = 'none'
}
</script>

<style scoped>
@keyframes playerEntrance {
  0% {
    opacity   : 0;
    transform : translateY(60px) scale(0.92);
  }
  100% {
    opacity   : 1;
    transform : translateY(0) scale(1);
  }
}

@keyframes floatNote {
  0% {
    opacity   : 0;
    transform : translateY(0) scale(0.5) rotate(-10deg);
  }
  30% {
    opacity   : 1;
  }
  100% {
    opacity   : 0;
    transform : translateY(var(--note-float-distance, -50px)) translateX(12px) scale(1.1) rotate(15deg);
  }
}

.music-player-container {
  box-sizing  : border-box;
  max-width   : 100vw;
  overflow-x  : hidden;
}

.music-player-wrapper {
  position       : fixed;
  max-width      : calc(100vw - 32px);
  z-index        : 3;
  display        : flex;
  flex-direction : column;
  width          : auto;
  box-sizing     : border-box;
  pointer-events : none;
  opacity        : 0;
  visibility     : hidden;
  transition     : left 0.2s ease-out, right 0.2s ease-out, opacity 0.2s ease-out, visibility 0.2s ease-out;
}

.music-player-wrapper.special-theme {
  --music-player-color-accent                  : #9d4edd;
  --music-player-color-accent-light            : #c77dff;
  --music-player-color-primary                 : #5a189a;
  --music-player-color-playbt-playing          : #7b2cbf;
  --music-player-color-playbt-playing-pressed  : #5a189a;
  --music-player-color-playbt-paused           : #3c096c;
  --music-player-color-playbt-paused-pressed   : #240046;
}

.music-player-wrapper.is-ready {
  visibility     : visible;
  animation      : playerEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.compact-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.compact-pop-enter-from,
.compact-pop-leave-to {
  opacity   : 0;
  transform : scale(0.4) translateY(20px);
}

.slide-out-left-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-out-left-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-out-left-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-out-left-leave-to {
  opacity: 0;
  transform: translateX(-120%);
}

.compact-button-wrapper {
  pointer-events : auto;
}

.compact-button {
  margin-bottom  : 0;
}

.player-outer-layout {
  pointer-events : auto;
  display     : flex;
  align-items : flex-start;
  gap         : 12px;
  width       : 100%;
  box-sizing  : border-box;
  overflow    : visible;
}

/* --- ORIENTATION CONFIGURATIONS FOR OUTER LAYOUT --- */
.player-outer-layout.player-orientation-vertical {
  flex-direction: row;
  align-items: flex-start;
}

.player-outer-layout.player-orientation-vertical-flipped {
  flex-direction: row-reverse;
  align-items: flex-start;
}

.player-outer-layout.player-orientation-horizontal,
.player-outer-layout.player-orientation-horizontal-flipped {
  width         : 100%;
  flex-direction: column;
  align-items   : stretch;
  gap           : 8px;
  box-sizing    : border-box;
}

.player-outer-layout.player-orientation-horizontal-flipped .player-card {
  flex-direction: column-reverse;
}

.player-card {
  display        : flex;
  flex-direction : column;
  background     : var(--music-player-color-bg-main);
  border         : var(--music-player-border);
  border-radius  : var(--music-player-border-radius);
  overflow       : hidden;
  width          : 360px;
  max-width      : 100%;
  box-sizing     : border-box;
  max-height     : 88px;
  transition     : max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.music-player-wrapper.is-open .player-card {
  max-height     : 800px;
}

.player-control-bar {
  display        : flex;
  flex-direction : column;
  align-items    : center;
  background     : var(--music-player-color-bg-main);
  padding        : 6px 8px 10px 8px;
  gap            : 4px;
  z-index        : 2;
  box-sizing     : border-box;
  flex-shrink    : 0;
  overflow       : hidden;
}

.control-bar-buttons {
  display         : grid;
  grid-template-columns: 1fr auto 1fr;
  align-items     : center;
  width           : 100%;
  padding         : -4px 4px;
}

.secondary-action-btn {
  justify-self   : start;
  background     : transparent;
  border         : none;
  cursor         : pointer;
  padding        : 2px 8px;
  display        : flex;
  align-items    : center;
}

.expand-toggle-btn {
  justify-self   : center;
  background     : transparent;
  border         : none;
  cursor         : pointer;
  padding        : 2px 8px;
  display        : flex;
  align-items    : center;
}

.expand-icon-span {
  width                 : 22px;
  height                : 22px;
  background-color      : var(--music-player-color-accent-light);
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
  background-color      : var(--music-player-color-white, #ffffff);
}

.secondary-icon-span {
  width                 : 22px;
  height                : 22px;
  background-color      : var(--music-player-color-accent-light);
  -webkit-mask-image    : url('@/assets/svg/triangle-left-12-filled.svg');
  mask-image            : url('@/assets/svg/triangle-left-12-filled.svg');
  -webkit-mask-size     : contain;
  mask-size             : contain;
  -webkit-mask-repeat   : no-repeat;
  mask-repeat           : no-repeat;
  -webkit-mask-position : center;
  mask-position         : center;
  transition            : background-color 0.15s;
}

.secondary-action-btn:hover .secondary-icon-span {
  background-color      : var(--music-player-color-white, #ffffff);
}

.player-collapsible-content {
  display        : flex;
  flex-direction : column;
  gap            : 12px;
  opacity        : 0;
  overflow       : visible;
  padding        : 0 12px;
  pointer-events : none;
  box-sizing     : border-box;
  width          : 100%;
  transition     : opacity 0.3s ease, padding 0.4s ease;
}

.music-player-wrapper.is-open .player-collapsible-content {
  opacity        : 1;
  padding        : 0 12px 12px 12px;
  pointer-events : auto;
}

.hidden-player {
  position       : absolute;
  width          : 1px;
  height         : 1px;
  overflow       : hidden;
  left           : -9999px;
  opacity        : 0;
  pointer-events : none;
}

@media (max-width: 480px) {
  .music-player-wrapper {
    bottom: 16px !important;
    position: fixed !important;
  }

  
  .player-card {
    display: flex;
    flex-direction: column-reverse !important;
  }

  .mobile-hidden-walkman {
    display: none !important;
  }
}
</style>