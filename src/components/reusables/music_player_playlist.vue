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
          bg-color   = "var(--music-player-color-bg-secondary)"
          :icon-src  = "previous_icon"
          iconColor  = "var(--music-player-color-bg-dark)"
          height     = "30px"  
          width      = "30px"    
          iconSize   = "20px"
          padding    = "0"
          :disabled  = "currentPage === 1"
          @click     = "$emit('updatePage', currentPage - 1)"
        />
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <CustomButton
          bg-color   = "var(--music-player-color-bg-secondary)"
          :icon-src  = "next_icon"
          iconColor  = "var(--music-player-color-bg-dark)"
          height     = "30px"  
          width      = "30px"    
          iconSize   = "20px"
          padding    = "0"
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

import previous_icon from '@/assets/svg/triangle-left-12-filled.svg'
import next_icon     from '@/assets/svg/triangle-right-12-filled.svg'

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
  border                : var(--music-player-border);
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
  border                : var(--music-player-border);
  border-radius         : var(--music-player-border-radius);
  padding               : 8px 12px;
  user-select           : none;
}

.playlist-title {
  font-size             : 0.8rem;
  margin                : 0;
  font-weight           : 700;
  color                 : var(--music-player-color-bg-secondary);
}

.playlist-content {
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
  height                : 220px;
  max-height            : 220px;
  justify-content       : space-between;
  overflow              : visible;
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
  color                 : var(--music-player-color-bg-main);
  font-size             : 0.8rem;
  background            : var(--music-player-color-bg-secondary);
  border-radius         : 6px;
  font-family           : monospace;
}

.track-list {
  list-style            : none;
  padding               : 0;
  padding-right         : 8px;
  margin                : 0;
  display               : flex;
  flex-direction        : column;
  gap                   : 6px;
  flex                  : 1;
  overflow-y            : auto;
  font                  : var(--music_player-font-p);
  font-size             : var(--music_player-font-p-size);
  padding-bottom        : 10px;
  
  scrollbar-width       : thin;
  scrollbar-color       : var(--music-player-color-accent) var(--music-player-color-bg-main);

  -webkit-overflow-scrolling: touch;
}

.track-list::-webkit-scrollbar {
  width                 : 6px;
  -webkit-appearance    : none;
}

.track-list::-webkit-scrollbar-track {
  background            : var(--music-player-color-bg-main);
  border-radius         : 3px;
}

.track-list::-webkit-scrollbar-thumb {
  background            : var(--music-player-color-accent);
  border-radius         : 3px;
}

.track-item {
  display               : flex;
  align-items           : center;
  gap                   : 10px;
  padding               : 8px 10px;
  background            : var(--music-player-color-bg-secondary);
  border                : var(--music-player-border);
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
  padding               : 4px 2px;
  height                : 36px;
  box-sizing            : border-box;
  transition            : opacity 0.2s ease;
  overflow              : visible;
}

.pagination-controls :deep(.custom-btn) {
  overflow              : visible !important;
}

.page-info {
  font-size             : 0.75rem;
  color                 : var(--music-player-color-accent-light);
  font-family           : monospace;
}

@media (max-height: 700px) {
  .playlist-content {
    height              : 145px;
  }
}
</style>