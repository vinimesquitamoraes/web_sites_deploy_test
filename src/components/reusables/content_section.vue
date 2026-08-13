<template>
  <div 
    class="content-section-wrapper"
    :style="{ padding: sectionPadding }"
  >
    <h2 
      v-if="showHeader && heading && headerPosition === 'top'" 
      class="heading top-heading" 
      :style="{ color: headingColor, textAlign: headingAlign }"
      v-html="heading"
    ></h2>

    <div 
      class="content-section" 
      :class="[layout, mediaPosition, { 'text-only': mediaType === 'text', 'image-centered': textParagraphs.length === 0 }]"
    >
      <div 
        v-if="textParagraphs.length || (showHeader && heading && headerPosition === 'inside')" 
        class="text-container"
        :style="{ padding: textPadding }"
      >
        <h2 
          v-if="showHeader && heading && headerPosition === 'inside'" 
          class="heading inside-heading" 
          :style="{ color: headingColor, textAlign: headingAlign }"
          v-html="heading"
        ></h2>

        <p 
          v-for="(paragraph, index) in textParagraphs" 
          :key="index" 
          class="body-text" 
          :style="{ color: textColor, textAlign: textAlign }"
          v-html="paragraph"
        ></p>
      </div>

      <div 
        v-if="mediaType !== 'text'" 
        class="media-wrapper"
        :style="{ width: mediaWidth }"
      >
        <div 
          class="media-container" 
          :class="{ 
            'red-border': redBorder, 
            'clickable-media': mediaType === 'image' && mediaSrc && !hasError,
            'no-shadow': !hasShadow 
          }"
          :style="{ height: mediaHeight !== 'auto' ? mediaHeight : 'auto' }"
          @click="openImageModal"
        >
          <slot name="media">
            <iframe 
              v-if="mediaType === 'video' && mediaSrc"
              :src="mediaSrc" 
              :title="mediaAlt || heading"
              class="video-iframe"
              :style="{ height: mediaHeight !== 'auto' ? mediaHeight : '322px' }"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>

            <img 
              v-else-if="mediaType === 'image' && mediaSrc"
              :src="mediaSrc" 
              :alt="mediaAlt || heading"
              class="media-img"
              :style="{ color: textColor, maxHeight: mediaHeight !== 'auto' ? mediaHeight : 'none' }"
              @error="hasError = true"
            />
          </slot>
        </div>
        <span v-if="mediaCaption" class="media-caption" :style="{ color: textColor }">
          {{ mediaCaption }}
        </span>
      </div>
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
import { ref, computed, watch } from 'vue'
import MediaModal from './media_modal.vue'

const props = defineProps({
  heading: {
    type: String,
    default: ''
  },
  text: {
    type: [String, Array],
    default: () => []
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  headerPosition: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'inside'].includes(value)
  },
  headingColor: {
    type: String,
    default: ''
  },
  headingAlign: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  },
  textColor: {
    type: String,
    default: ''
  },
  textAlign: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  },
  sectionPadding: {
    type: String,
    default: '0px'
  },
  textPadding: {
    type: String,
    default: '0px'
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
  mediaWidth: {
    type: String,
    default: '535px'
  },
  mediaHeight: {
    type: String,
    default: 'auto'
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
  },
  hasShadow: {
    type: Boolean,
    default: true
  }
})

const isModalOpen = ref(false)
const hasError = ref(false)

const textParagraphs = computed(() => {
  if (Array.isArray(props.text)) {
    return props.text.filter(p => Boolean(p))
  }
  return props.text ? [props.text] : []
})

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
.content-section-wrapper {
  width                 : 100%;
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  box-sizing            : border-box;
  margin                : 20px 0 0 0;
}

.heading {
  width                 : 100%;
  font-family           : var(--font-h2);
  font-size             : var(--font-h2-size);
  color                 : var(--color-h2);
  margin                : 0;
}

.heading.top-heading {
  margin-bottom         : 24px;
}

.heading.inside-heading {
  margin-bottom         : 16px;
}

.heading :deep(i),
.heading :deep(em) {
  font-style            : italic;
}

.content-section {
  display               : flex;
  align-items           : center;
  justify-content       : center;
  gap                   : 30px;
  width                 : 100%;
  box-sizing            : border-box;
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

.text-container {
  width                 : 675px;
  max-width             : 100%;
  display               : flex;
  justify-content       : center;
  align-items           : center;
  flex-direction        : column;
  gap                   : 12px;
  box-sizing            : border-box;
}

.body-text {
  align-self            : stretch;
  font-family           : var(--font-p);
  font-size             : var(--font-p-size);
  color                 : var(--color-p, #1F1F1F);
  font-weight           : 500;
  margin                : 0;
  line-height           : 1.4;
}

.body-text :deep(i),
.body-text :deep(em) {
  font-style            : italic;
}

.media-wrapper {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  gap                   : 8px;
  max-width             : 100%;
  flex-shrink           : 0;
  padding               : 0 8px 8px 0;
  box-sizing            : border-box;
}

.media-caption {
  font-family           : var(--font-p);
  font-size             : 14px;
  text-align            : center;
}

.media-container {
  width                 : 100%;
  max-width             : 100%;
  overflow              : hidden;
  border-radius         : 12px; 
  border                : 3px solid #000000;
  box-shadow            : var(--color-custom-button-shadow, 8px 8px 0px #000000);
  background            : #ffffff;
  box-sizing            : border-box;
  display               : flex;
  align-items           : center;
  justify-content       : center;
  transition            : transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
}

.media-container.no-shadow {
  box-shadow            : none !important;
  border                : none !important;
  border-radius         : 0;
  background            : transparent;
}

.clickable-media {
  cursor                : pointer;
}

.clickable-media:hover {
  transform             : translateY(-3px) translateX(-3px);
  box-shadow            : var(--color-custom-button-active-shadow, 11px 11px 0px #000000);
}

.clickable-media.no-shadow:hover {
  transform             : none;
  box-shadow            : none !important;
  border                : none !important;
}

.media-container.red-border {
  border                : 3px solid #E50012;
  box-shadow            : var(--color-custom-button-shadow, 8px 8px 0px #E50012);
  padding               : 8px;
}

.media-container.red-border.clickable-media:hover {
  transform             : translateY(-3px) translateX(-3px);
  box-shadow            : var(--color-custom-button-active-shadow, 11px 11px 0px #E50012);
}

.media-container.red-border.no-shadow,
.media-container.red-border.no-shadow.clickable-media:hover {
  box-shadow            : none !important;
  border                : none !important;
  transform             : none;
  padding               : 0;
}

.media-img {
  width                 : 100%;
  height                : auto;
  object-fit            : contain;
  display               : block;
}

.video-iframe {
  width                 : 100%;
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

  .heading.top-heading {
    margin-bottom       : 16px;
  }

  .media-wrapper {
    width               : 100% !important;
  }
  
  .video-iframe {
    height              : 220px !important;
  }
}
</style>