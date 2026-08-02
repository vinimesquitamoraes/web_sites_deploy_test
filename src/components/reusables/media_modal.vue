<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('close')" aria-label="Close Modal">&times;</button>
      
      <button v-if="showNav" class="modal-arrow left" @click="$emit('prev')" aria-label="Previous Media">
        <span class="arrow-icon left-arrow"></span>
      </button>

      <div class="media-wrapper">
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
      </div>

      <button v-if="showNav" class="modal-arrow right" @click="$emit('next')" aria-label="Next Media">
        <span class="arrow-icon right-arrow"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false
  },
  mediaItem: {
    type: Object,
    required: false,
    default: () => ({})
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
  width            : 70vw;
  height           : 75vh;
  max-width        : 900px;
  max-height       : 700px;
  display          : flex;
  align-items      : center;
  justify-content  : center;
}

.media-wrapper {
  width            : 100%;
  height           : 100%;
  display          : flex;
  align-items      : center;
  justify-content  : center;
  border           : 4px solid var(--color-modal-overlay-border);
  border-radius    : 4px;
  box-sizing       : border-box;
  overflow         : hidden;
  background       : #000000;
}

.modal-media {
  width            : 100%;
  height           : 100%;
  display          : block;
  object-fit       : contain;
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
  background       : transparent;
  border           : none;
  width            : 40px;
  height           : 40px;
  cursor           : pointer;
  z-index          : 10;
  display          : flex;
  align-items      : center;
  justify-content  : center;
  border-radius    : 4px;
}

.arrow-icon {
  position            : absolute;
  width               : 100%;
  height              : 100%;
  background-color    : var(--color-modal-arrow);
  top                 : 50%;
  left                : 50%;
  transform           : translate(-50%, -50%);
  padding             : 0;
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
}

.arrow-icon.left-arrow {
  transform           : translate(-50%, -50%) scaleX(-1);
  animation           : choppy-horizontal-left 0.6s steps(3, end) infinite alternate;
}

.arrow-icon.right-arrow {
  animation           : choppy-horizontal-right 0.6s steps(3, end) infinite alternate;
}

.modal-arrow:hover .arrow-icon {
  background-color  : var(--color-modal-arrow-hover);
}

.modal-arrow.left { 
  left             : -60px; 
}

.modal-arrow.right { 
  right            : -60px; 
}

@keyframes choppy-horizontal-right {
  0% {
    transform: translate(-50%, -50%) translateX(0px);
  }
  100% {
    transform: translate(-50%, -50%) translateX(3px);
  }
}

@keyframes choppy-horizontal-left {
  0% {
    transform: translate(-50%, -50%) scaleX(-1) translateX(0px);
  }
  100% {
    transform: translate(-50%, -50%) scaleX(-1) translateX(3px);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width            : 90vw;
    height           : 75vh;
    max-width        : 100%;
  }

  .modal-arrow.left {
    left             : 10px;
  }
  
  .modal-arrow.right {
    right            : 10px;
  }

  .close-btn {
    top              : -40px;
    right            : 5px;
  }
}
</style>