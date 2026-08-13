<template>
  <div 
    class="content-section-wrapper"
    :style="{ 
      padding: sectionPadding, 
      backgroundColor: contentBg, 
      borderRadius: borderRadius,
      border: border,
      boxShadow: shadow 
    }"
  >
    <h2 
      v-if="shouldShowHeader && headerPosition === 'top'" 
      class="content-section-heading content-section-top-heading" 
      :style="{ 
        color: headingColor, 
        textAlign: headingAlign,
        border: headerBorder 
      }"
      v-html="heading"
    ></h2>

    <div 
      class="content-section" 
      :class="[layout, mediaPosition, { 'text-only': mediaType === 'text', 'image-centered': textParagraphs.length === 0 }]"
    >
      <div 
        v-if="textParagraphs.length || (shouldShowHeader && headerPosition === 'inside')" 
        class="content-section-text-container"
        :style="{ 
          padding: textPadding,
          border: textBorder
        }"
      >
        <h2 
          v-if="shouldShowHeader && headerPosition === 'inside'" 
          class="content-section-heading content-section-inside-heading" 
          :style="{ 
            color: headingColor, 
            textAlign: headingAlign,
            border: headerBorder 
          }"
          v-html="heading"
        ></h2>

        <p 
          v-for="(paragraph, index) in textParagraphs" 
          :key="index" 
          class="content-section-body-text" 
          :style="{ color: textColor, textAlign: textAlign }"
          v-html="paragraph"
        ></p>
      </div>

      <div 
        v-if="mediaType !== 'text'" 
        class="content-section-media-wrapper"
        :style="{ '--media-width': mediaWidth }"
      >
        <div 
          class="content-section-media-container" 
          :class="{ 
            'content-section-clickable-media': mediaType === 'image' && mediaSrc && !hasError && imageOpenable
          }"
          :style="{ 
            height: mediaHeight !== 'auto' ? mediaHeight : 'auto',
            filter: mediaShadow
          }"
          @click="openImageModal"
        >
          <div 
            class="content-section-media-inner"
            :style="{ 
              border: mediaBorder,
              borderRadius: mediaBorderRadius
            }"
          >
            <slot name="media">
              <iframe 
                v-if="mediaType === 'video' && mediaSrc"
                :src="mediaSrc" 
                :title="mediaAlt || heading"
                class="content-section-video-iframe"
                :style="{ height: mediaHeight !== 'auto' ? mediaHeight : '322px' }"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <img 
                v-else-if="mediaType === 'image' && mediaSrc"
                :src="mediaSrc" 
                :alt="mediaAlt || heading"
                class="content-section-media-img"
                :style="{ 
                  color: textColor, 
                  height: mediaHeight !== 'auto' ? mediaHeight : 'auto',
                  maxHeight: mediaHeight !== 'auto' ? mediaHeight : 'none',
                  objectFit: mediaHeight !== 'auto' ? mediaFit : 'contain'
                }"
                @error="hasError = true"
              />
            </slot>
          </div>
        </div>
        <span v-if="mediaCaption" class="content-section-media-caption" :style="{ color: textColor }">
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
  contentBg: {
    type: String,
    default: 'transparent'
  },
  borderRadius: {
    type: String,
    default: '0px'
  },
  border: {
    type: String,
    default: 'transparent'
  },
  headerBorder: {
    type: String,
    default: 'transparent'
  },
  textBorder: {
    type: String,
    default: 'none'
  },
  mediaBorder: {
    type: String,
    default: ''
  },
  mediaBorderRadius: {
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
  imageOpenable: {
    type: Boolean,
    default: true
  },
  mediaShadow: {
    type: String,
    default: 'var(--content-section-media-shadow)'
  },
  mediaFit: {
    type: String,
    default: 'contain',
    validator: (value) => ['cover', 'contain', 'fill', 'scale-down'].includes(value)
  },
  shadow: {
    type: String,
    default: ''
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

const shouldShowHeader = computed(() => {
  return Boolean(props.heading) && textParagraphs.value.length > 0
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
  width                 : calc(100% - 4px);
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  box-sizing            : border-box;
  margin                : 10px 4px 4px 0;
  position              : relative;
  z-index               : 1;
}

.content-section-heading {
  width                 : 100%;
  font-family           : var(--content-section-font-h2);
  font-size             : var(--content-section-font-h2-size);
  color                 : var(--content-section-color-h2);
  margin                : 0;
  box-sizing            : border-box;
}

.content-section-heading.content-section-top-heading {
  margin-bottom         : 16px;
}

.content-section-heading.content-section-inside-heading {
  margin-bottom         : 12px;
}

.content-section {
  display               : flex;
  align-items           : center;
  justify-content       : flex-start;
  gap                   : 20px;
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

.content-section.text-only .content-section-text-container {
  width                 : 100%;
  max-width             : 100%;
}

.content-section-text-container {
  width                 : 675px;
  max-width             : 100%;
  display               : flex;
  justify-content       : flex-start;
  align-items           : flex-start;
  flex-direction        : column;
  gap                   : 8px;
  box-sizing            : border-box;
}

.content-section-body-text {
  align-self            : stretch;
  font-family           : var(--content-section-font-p);
  font-size             : var(--content-section-font-p-size);
  color                 : var(--content-section-color-p);
  margin                : 0;
  line-height           : 1.4;
}

.content-section-media-wrapper {
  width                 : var(--media-width, 535px);
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  max-width             : 100%;
  flex-shrink           : 0;
}

.content-section-media-caption {
  font-family           : var(--content-section-font-p);
  font-size             : 14px;
  text-align            : center;
  margin-top            : 6px;
}

.content-section-media-container {
  width                 : 100%;
  max-width             : 100%;
  display               : block;
  position              : relative;
  height                : auto;
}

.content-section-media-inner {
  width                 : 100%;
  height                : auto;
  overflow              : hidden;
  border                : var(--content-section-media-border);
  border-radius         : var(--content-section-media-radius);
  background-color      : #ffffff;
  display               : block;
  position              : relative;
}

.content-section-clickable-media {
  cursor                : pointer;
}

.content-section-media-img {
  width                 : 100%;
  height                : auto;
  display               : block;
}

.content-section-video-iframe {
  width                 : 100%;
  border                : none;
  display               : block;
}

/* Responsive Media Queries */
@media (max-width: 1220px) {
  .content-section-wrapper {
    width               : calc(100% - 12px);
    margin              : 12px 12px 12px 0;
    padding             : 12px 14px !important; 
  }

  .content-section {
    flex-direction      : column !important; 
    justify-content     : flex-start !important;
    align-items         : stretch !important;
    gap                 : 20px !important;
  }

  .content-section-text-container {
    width               : 100% !important;
    align-items         : flex-start !important;
  }

  .content-section-heading {
    font-size           : 28px; 
  }

  .content-section-heading.content-section-top-heading {
    margin-bottom       : 8px;
  }

  .content-section-media-wrapper {
    width               : 100% !important;
  }

  .content-section-media-container {
    height              : auto !important;
  }

  .content-section-media-inner {
    height              : auto !important;
  }

  .content-section-media-img {
    height              : auto !important;
    max-height          : none !important;
    object-fit          : contain !important;
  }
  
  .content-section-video-iframe {
    height              : 220px !important;
  }
}

@media (max-width: 768px) {
  .content-section-wrapper {
    width               : calc(100% - 12px);
    margin              : 8px 12px 8px 0;
    padding             : 10px 10px !important;
  }

  .content-section-heading {
    font-size           : 24px;
  }

  .content-section-body-text {
    font-size           : 15px;
  }
}

@media (max-width: 480px) {
  .content-section-heading {
    font-size           : 20px;
  }
  
  .content-section {
    gap                 : 16px !important;
  }
}
</style>