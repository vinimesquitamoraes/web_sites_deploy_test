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
      :class="imageShapeClass"
      :style="{ 
        backgroundColor: imageBgColor, 
        width     : imageSize, 
        height    : imageSize,
        minWidth  : imageSize,
        minHeight : imageSize,
        maxWidth  : imageSize,
        maxHeight : imageSize,
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
import { computed } from 'vue';

const props = defineProps({
  name        : { type: String, required: true },
  description : { type: [String, Array], required: true },
  image       : { type: String, required: true },
  isReversed  : { type: Boolean, default: false },
  orientation : { type: String, default: 'horizontal', validator: (val) => ['horizontal', 'vertical'].includes(val) },
  imageShape  : { type: String, default: 'circle', validator: (val) => ['circle', 'square'].includes(val) },
  imageBgColor: { type: String, default: 'transparent' },
  imageSize   : { type: String, default: '340px' },
  imageScale  : { type: [Number, String], default: 1},
  imagePadding: { type: String, default: "0 0 70px 0"},
});

const imageShapeClass = computed(() => {
  return `shape-${props.imageShape}`;
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
}

.image-wrapper.shape-circle {
  aspect-ratio   : 1 / 1;
  border-radius  : 50%;
  margin         : 0 auto;
}

.image-wrapper.shape-square {
  aspect-ratio   : 1 / 1;
  border-radius  : 20px;
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
  color          : var(--character-card-title-color, var(--color-default-text-color));
  font-family    : var(--character-card-title-font, var(--font-h3, var(--font-h1)));
  font-size      : var(--character-card-title-size, var(--font-h3-size, var(--font-h1-size)));
  font-weight    : var(--character-card-title-weight, 600);
  margin         : 0;
  text-align     : center;
}

.separator-line {
  width          : 100%;
  height         : var(--character-card-separator-height, 3px);
  background     : var(--character-card-separator-color, #ffffff);
  border-radius  : 2px;
  margin-bottom  : 3px;
}

.character-info p {
  color          : var(--character-card-body-color, var(--color-default-text-color));
  font-family    : var(--character-card-body-font, var(--font-p, var(--font-body-family)));
  font-size      : var(--character-card-body-size, var(--font-p-size));
  font-weight    : var(--character-card-body-weight, 500);
  line-height    : var(--character-card-body-line-height, 1.5);
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
    font-size      : var(--character-card-title-size-mobile, var(--font-mobile-h3-size, var(--character-card-title-size)));
  }

  .character-info p {
    text-align     : center;
  }
}
</style>