<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('close')" aria-label="Close Modal">&times;</button>
      
      <button v-if="showNav" class="modal-arrow left" @click="$emit('prev')" aria-label="Previous Media">
        <img :src="img_left_arrow" alt="Previous" class="arrow-icon" />
      </button>

      <img 
        v-if="mediaItem?.type === 'image'" 
        :src="mediaItem.src" 
        :alt="mediaItem.alt || 'Enlarged gallery preview'" 
        class="modal-media" 
      />
      <video 
        v-else-if="mediaItem?.type === 'video'" 
        :src="mediaItem.src" 
        controls 
        autoplay 
        playsinline
        class="modal-media"
      ></video>

      <button v-if="showNav" class="modal-arrow right" @click="$emit('next')" aria-label="Next Media">
        <img :src="img_right_arrow" alt="Next" class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import img_left_arrow   from '@/assets/svg/triangle-left-12-filled.svg'
import img_right_arrow  from '@/assets/svg/triangle-right-12-filled.svg'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  mediaItem: {
    type: Object,
    required: true,
  },
  showNav: {
    type: Boolean,
    default: true
  }
})

defineEmits(['close', 'next', 'prev'])
</script>

<style scoped>
.modal-overlay {
  position         : fixed;
  top              : 0;
  left             : 0;
  width            : 100vw;
  height           : 100vh;
  background       : var(--color-modal-overlay);
  display          : flex;
  justify-content  : center;
  align-items      : center;
  z-index          : 1000;
  padding          : 20px;
  box-sizing       : border-box;
}

.modal-content {
  position         : relative;
  max-width        : 90vw;
  max-height       : 90vh;
  display          : flex;
  align-items      : center;
  justify-content  : center;
}

.modal-media {
  max-width        : 100%;
  max-height       : 85vh;
  display          : block;
  object-fit       : contain;
  border           : 4px solid var(--color-modal-overlay-border);
  border-radius    : 4px;
}

.close-btn {
  position         : absolute;
  top              : -45px;
  right            : 0;
  background       : transparent;
  color            : #FFFFFF;
  border           : none;
  font-size        : 36px;
  cursor           : pointer;
  line-height      : 1;
}

.modal-arrow {
  position         : absolute;
  top              : 50%;
  transform        : translateY(-50%);
  background       : rgba(0, 0, 0, 0.6);
  border           : none;
  padding          : 12px 10px;
  cursor           : pointer;
  z-index          : 10;
  display          : flex;
  align-items      : center;
  justify-content  : center;
  transition       : background 0.2s;
  border-radius    : 4px;
}

.arrow-icon {
  width            : 20px;
  height           : 20px;
  object-fit       : contain;
  display          : block;
  pointer-events   : none;
}

.modal-arrow img {
  filter           : brightness(0) invert(1);
}

.modal-arrow:hover {
  background       : rgba(0, 0, 0, 0.9);
}

.modal-arrow.left { 
  left             : -60px; 
}

.modal-arrow.right { 
  right            : -60px; 
}

@media (max-width: 768px) {
  .modal-arrow.left {
    left           : 10px;
  }
  
  .modal-arrow.right {
    right          : 10px;
  }

  .close-btn {
    top            : -40px;
    right          : 5px;
  }
}
</style>