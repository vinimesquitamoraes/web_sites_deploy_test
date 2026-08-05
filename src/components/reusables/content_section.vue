<template>
  <div class="content-section" :class="[layout, mediaPosition, { 'text-only': mediaType === 'text', 'image-centered': !text }]">
    <div v-if="text" class="text-container">
      <h2 v-if="showHeader" class="heading" :style="{ color: headingColor }">{{ heading }}</h2>
      <p class="body-text" :style="{ color: textColor }">{{ text }}</p>
    </div>

    <div 
      v-if="mediaType !== 'text'" 
      class="media-wrapper"
    >
      <div 
        class="media-container" 
        :class="{ 'red-border': redBorder, 'clickable-media': mediaType === 'image' && mediaSrc && !hasError }"
        @click="openImageModal"
      >
        <slot name="media">
          <iframe 
            v-if="mediaType === 'video' && mediaSrc"
            :src="mediaSrc" 
            :title="mediaAlt || heading"
            class="video-iframe"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <img 
            v-else-if="mediaType === 'image' && mediaSrc"
            :src="mediaSrc" 
            :alt="mediaAlt || heading"
            class="media-img"
            :style="{ color: textColor }"
            @error="hasError = true"
          />
        </slot>
      </div>
      <span v-if="mediaCaption" class="media-caption" :style="{ color: textColor }">
        {{ mediaCaption }}
      </span>
    </div>
  </div>

  <MediaModal 
    :is-open="isModalOpen" 
    :media-item="{ type: mediaType, src: mediaSrc, alt: mediaAlt || heading }" 
    :show-nav="false"
    @close="closeImageModal" 
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import MediaModal from './media_modal.vue'

const props = defineProps({
  heading: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  headingColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  mediaSrc: {
    type: String,
    default: ''
  },
  mediaAlt: {
    type: String,
    default: ''
  },
  mediaCaption: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    default: 'image',
    validator: (value) => ['image', 'video', 'text'].includes(value)
  },
  mediaPosition: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  layout: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  redBorder: {
    type: Boolean,
    default: false
  },
  imageOpenable: {
    type: Boolean,
    default: true
  }
})

const isModalOpen = ref(false)
const hasError = ref(false)

watch(() => props.mediaSrc, () => {
  hasError.value = false
})

const openImageModal = () => {
  if (props.mediaType === 'image' && props.mediaSrc && props.imageOpenable && !hasError.value) {
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closeImageModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.content-section {
  display               : flex;
  align-items           : center;
  justify-content       : center;
  gap                   : 30px;
  width                 : 100%;
  box-sizing            : border-box;
  padding               : 20px;
}

.content-section.image-centered {
  justify-content       : center;
}

.content-section.horizontal {
  flex-direction        : row;
}

.content-section.vertical {
  flex-direction        : column;
}

.content-section.horizontal.right {
  flex-direction        : row;
}

.content-section.horizontal.left {
  flex-direction        : row-reverse;
}

.content-section.vertical.right {
  flex-direction        : column;
}

.content-section.vertical.left {
  flex-direction        : column-reverse;
}

.content-section.text-only {
  flex-direction        : column;
}

.content-section.text-only .text-container {
  width                 : 100%;
  max-width             : 100%;
}

.content-section.text-only .body-text {
  text-align            : center;
}

.text-container {
  width                 : 675px;
  max-width             : 100%;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  flex-direction        : column;
}

.heading {
  align-self            : stretch;
  font-size             : 40px;
  font-family           : var(--font-h2);
  color                 : var(--color-h2);
  text-align            : center;
  font-weight           : 500;
  margin                : 0 0 15px 0;
}

.body-text {
  align-self            : stretch;
  font-family           : var(--font-p);
  font-size             : var(--font-p-size);
  color                 : var(--color-p, #1F1F1F);
  text-align            : center;
  font-weight           : 500;
  margin                : 0;
  line-height           : 1.4;
}

.media-wrapper {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  gap                   : 8px;
  width                 : 535px;
  max-width             : 100%;
  flex-shrink           : 0;
}

.media-caption {
  font-family           : var(--font-p);
  font-size             : 14px;
  text-align            : center;
}

.media-container {
  width                 : 100%;
  height                : auto;
  max-width             : 100%;
  overflow              : hidden;
  border-radius         : 8px; 
  box-sizing            : border-box;
  display               : flex;
  align-items           : center;
  justify-content       : center;
}

.clickable-media {
  cursor                : pointer;
}

.media-container.red-border {
  border                : 4px solid #ff3322;
  padding               : 8px;
}

.media-img {
  width                 : 100%;
  height                : auto;
  object-fit            : contain;
  display               : block;
  transition            : transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.clickable-media:hover .media-img {
  transform             : scale(1.08);
}

.video-iframe {
  width                 : 100%;
  height                : 322px;
  border                : none;
  display               : block;
}

@media (max-width: 1220px) {
  .content-section {
    flex-direction      : column !important; 
    gap                 : 20px;
  }

  .heading {
    font-size           : 28px; 
  }

  .body-text {
    font-size           : 18px; 
    text-align          : left; 
  }

  .content-section.text-only .body-text {
    text-align          : center;
  }

  .media-wrapper {
    width               : 100%;
  }
  
  .video-iframe {
    height              : 220px;
  }
}
</style>