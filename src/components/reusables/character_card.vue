<template>
  <div 
    class="character-card" 
    :class="{ 
      reverse: isReversed && orientation !== 'vertical', 
      'is-vertical': orientation === 'vertical' 
    }"
  >
    <div 
      class="image-wrapper"
      :style="{ 
        backgroundColor : imageBgColor, 
        width           : imageSize, 
        height          : imageSize,
        minWidth        : imageSize,
        minHeight       : imageSize,
        maxWidth        : imageSize,
        maxHeight       : imageSize,
        borderRadius    : imageShape === 'circle' ? '50%' : '20px'
      }"
    >
      <img 
        :src    ="image" 
        :alt    ="name" 
        class   ="character-image" 
      />
    </div>

    <div class="character-info">
      <h3>{{ name }}</h3>
      <div class="separator-line"></div>
      <p 
        v-for="(paragraph, index) in descriptionParagraphs" 
        :key="index"
        v-html="paragraph"
      ></p>
    </div>

  </div>
</template>

<script setup>
/**
 * @file character_card.vue
 * @brief Character card component supporting image customization, description paragraphs, and flexible orientations.
 * @displayName Character Card
 */

import { computed } from 'vue';

const props = defineProps({
  /** Character name text content. */
  name: {
    type    : String,
    required: true
  },
  /** Description text string or an array of description paragraphs. */
  description: {
    type    : [String, Array],
    required: true
  },
  /** Source URL for the character image asset. */
  image: {
    type    : String,
    required: true
  },
  /** Controls whether the card layout direction is reversed. */
  isReversed: {
    type    : Boolean,
    default : false
  },
  /** Layout orientation of the character card (horizontal, vertical). */
  orientation: {
    type    : String,
    default : 'horizontal',
    validator: (val) => ['horizontal', 'vertical'].includes(val)
  },
  /** Shape style of the character image wrapper (circle, square). */
  imageShape: {
    type    : String,
    default : 'circle',
    validator: (val) => ['circle', 'square'].includes(val)
  },
  /** Background color for the image wrapper container. */
  imageBgColor: {
    type    : String,
    default : 'transparent'
  },
  /** Custom CSS size width and height for the image wrapper. */
  imageSize: {
    type    : String,
    default : '340px'
  },
  /** Scale factor transformation applied to the character image. */
  imageScale: {
    type    : [Number, String],
    default : 1
  },
  /** Inner padding spacing applied to the character image. */
  imagePadding: {
    type    : String,
    default : "0 0 70px 0"
  },
});

const descriptionParagraphs = computed(() => {
  if (Array.isArray(props.description)) {
    return props.description.filter(p => Boolean(p));
  }
  return props.description ? [props.description] : [];
});
</script>

<style scoped>
.character-card {
  width          : 100%;
  max-width      : 100%;
  min-height     : 80px;
  background     : var(--color-primary);
  border-radius  : 30px;
  padding        : 30px 40px;
  display        : flex;
  align-items    : center;
  gap            : 40px;
  box-sizing     : border-box;
  overflow       : visible;
}

.character-card.reverse {
  flex-direction : row-reverse;
}

.character-card.is-vertical {
  flex-direction : column;
  text-align     : center;
}

.image-wrapper {
  flex           : 0 0 auto;
  display        : flex;
  justify-content: center;
  align-items    : center;
  overflow       : visible; 
  aspect-ratio   : 1 / 1;
  margin         : 0 auto;
}

.character-image {
  width          : 100%;
  height         : 100%;
  object-fit     : contain; 
  display        : block;
  transform      : scale(v-bind(imageScale));
  padding        : v-bind(imagePadding);
  filter         : drop-shadow(4px    0 0 #ffffff) 
                   drop-shadow(-4px   0 0 #ffffff) 
                   drop-shadow(0    4px 0 #ffffff) 
                   drop-shadow(0   -4px 0 #ffffff);
}

.character-card.is-vertical .image-wrapper {
  margin-bottom  : 10px;
}

.character-info {
  flex           : 1.2;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  gap            : 12px;
}

.character-card.is-vertical .character-info {
  width          : 100%;
}

.character-info h3 {
  color          : var(--character-card-title-color);
  font-family    : var(--character-card-title-font);
  font-size      : var(--character-card-title-size);
  font-weight    : var(--character-card-title-weight);
  margin         : 0;
  text-align     : center;
}

.separator-line {
  width          : 100%;
  height         : var(--character-card-separator-height);
  background     : var(--character-card-separator-color);
  border-radius  : 2px;
  margin-bottom  : 3px;
}

.character-info p {
  color          : var(--character-card-body-color);
  font-family    : var(--character-card-body-font);
  font-size      : var(--character-card-body-size);
  font-weight    : var(--character-card-body-weight);
  line-height    : var(--character-card-body-line-height);
  margin         : 0;
  text-align     : left;
  width          : 100%;
}

.character-info p :deep(i),
.character-info p :deep(em) {
  font-style     : italic;
}

@media (max-width: 768px) {
  .character-card {
    flex-direction : column !important;
    padding        : 30px 20px;
    gap            : 20px;
  }

  .image-wrapper {
    width          : 240px !important;
    height         : 240px !important;
    min-width      : 240px !important;
    min-height     : 240px !important;
    max-width      : 240px !important;
    max-height     : 240px !important;
  }

  .character-info {
    align-items    : center;
  }

  .character-info h3 {
    font-size      : var(--character-card-title-size-mobile);
  }

  .character-info p {
    text-align     : center;
  }
}
</style>