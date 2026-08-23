<template>
  <div class="playlist-container">
    <div class="playlist-header">
      <h3 class="playlist-title">Track List</h3>
      <SocialMediaButton 
        platform     = "youtube" 
        variant      = "white" 
        hoverVariant = "colored" 
        :tooltip-text= "tooltipText"
        size         = "30"
      />
    </div>

    <div class="playlist-content">
      <div class="playlist-body-area">
        <div v-if="isLoadingTracks" class="loading-state">Loading...</div>
        <ul class="track-list" v-else>
          <li 
            v-for        = "(track, index) in paginatedTracks" 
            :key         = "track.id"
            class        = "track-item"
            :class       = "{ active: currentTrackIndex === getGlobalIndex(index) }"
            @click       = "$emit('playTrack', index)"
          >
            <span class="track-number">{{ getGlobalIndex(index) + 1 }}</span>
            <span class="track-name">{{ track.title }}</span>
          </li>
        </ul>
      </div>

      <div 
        class        = "pagination-controls" 
        :style       = "{ opacity: (!isLoadingTracks && totalPages > 1) ? 1 : 0, pointerEvents: (!isLoadingTracks && totalPages > 1) ? 'auto' : 'none' }"
      >
        <CustomButton 
          text       = "PREV"
          class      = "page-btn"
          height     = "24px"
          fontSize   = "0.65rem"
          :disabled  = "currentPage === 1"
          @click     = "$emit('updatePage', currentPage - 1)"
        />
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <CustomButton 
          text       = "NEXT"
          class      = "page-btn"
          height     = "24px"
          fontSize   = "0.65rem"
          :disabled  = "currentPage === totalPages"
          @click     = "$emit('updatePage', currentPage + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SocialMediaButton from '@/components/reusables/social_media_button.vue'
import CustomButton      from '@/components/reusables/custom_button.vue'

defineProps({
  isLoadingTracks   : Boolean,
  paginatedTracks   : Array,
  currentTrackIndex : Number,
  currentPage       : Number,
  totalPages        : Number,
  tooltipText       : String,
  getGlobalIndex    : Function
})

defineEmits(['playTrack', 'updatePage'])
</script>

<style scoped>
.playlist-container {
  display               : flex;
  flex-direction        : column;
  gap                   : 8px;
  background            : var(--music-player-color-primary);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  padding               : 10px;
  border-radius         : var(--music-player-border-radius);
  box-sizing            : border-box;
  width                 : 100%;
  overflow              : visible;
}

.playlist-header {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
  background            : var(--music-player-color-bg-main);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  padding               : 8px 12px;
  border-radius         : 6px;
  user-select           : none;
}

.playlist-title {
  font-size             : 0.8rem;
  margin                : 0;
  font-weight           : 700;
  color                 : var(--music-player-color-text-main);
}

.playlist-content {
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
  height                : 215px;
  max-height            : 215px;
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
  color                 : var(--music-player-color-text-muted);
  font-size             : 0.8rem;
  background            : var(--music-player-color-text-main);
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
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-p-size);
  padding-bottom        : 10px;
}

.track-item {
  display               : flex;
  align-items           : center;
  gap                   : 10px;
  padding               : 8px 10px;
  background            : var(--music-player-color-text-main);
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color);
  border-radius         : 6px;
  cursor                : pointer;
  box-sizing            : border-box;
  width                 : 100%;
  max-width             : 100%;
}

.track-item:active {
  transform             : translateY(2px);
}

.track-item.active {
  background            : var(--music-player-color-accent);
  color                 : var(--music-player-color-white);
  font-weight           : 700;
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-p-size);
}

.track-number {
  color                 : var(--music-player-color-primary);
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-p-size);
  flex-shrink           : 0;
}

.track-item.active .track-number {
  color                 : var(--music-player-color-accent-light);
}

.track-name {
  white-space           : nowrap;
  overflow              : hidden;
  text-overflow         : ellipsis;
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-track-names-size);
  flex                  : 1;
  min-width             : 0;
}

.pagination-controls {
  display               : flex;
  justify-content       : space-between;
  align-items           : center;
  padding               : 4px 0;
  height                : 30px;
  box-sizing            : border-box;
  transition            : opacity 0.2s ease;
  overflow              : visible;
}

.page-btn {
  background-color      : var(--music-player-color-bg-main) !important;
  color                 : var(--music-player-color-text-main) !important;
  border                : var(--music-player-border-width) var(--music-player-border-style) var(--music-player-border-color) !important;
  border-radius         : 6px !important;
  padding               : 2px 8px !important;
  font-weight           : 700 !important;
  font-family           : var(--music_player-font-p) !important;
}

.page-info {
  font-size             : 0.75rem;
  color                 : var(--music-player-color-accent-light);
  font-family           : monospace;
}

@media (max-height: 700px) {
  .playlist-content {
    height              : 140px;
  }
}
</style>