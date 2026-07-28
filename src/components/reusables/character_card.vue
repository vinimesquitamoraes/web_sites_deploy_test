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
        width: imageSize, 
        height: imageSize,
        minWidth: imageSize,
        minHeight: imageSize,
        maxWidth: imageSize,
        maxHeight: imageSize
      }"
    >
      <img 
        :src="image" 
        :alt="name" 
        class="character-image" 
        :style="{ transform: `scale(${imageScale})` }"
      />
    </div>

    <div class="character-info">
      <h3>{{ name }}</h3>
      <div class="separator-line"></div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name        : { type: String, required: true },
  description : { type: String, required: true },
  image       : { type: String, required: true },
  isReversed  : { type: Boolean, default: false },
  orientation : { type: String, default: 'horizontal', validator: (val) => ['horizontal', 'vertical'].includes(val) },
  imageShape  : { type: String, default: 'circle', validator: (val) => ['circle', 'square'].includes(val) },
  imageBgColor: { type: String, default: 'transparent' },
  imageSize   : { type: String, default: '340px' },
  imageScale  : { type: [Number, String], default: 1 }
});

const imageShapeClass = computed(() => {
  return `shape-${props.imageShape}`;
});
</script>

<style scoped>
.character-card {
  width          : 100%;
  max-width      : 100%;
  min-height     : 380px;
  background     : var(--color-primary);
  border-radius  : 30px;
  padding        : 30px 40px;
  display        : flex;
  align-items    : center;
  gap            : 40px;
  box-sizing     : border-box;
  overflow       : hidden;
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
  overflow       : hidden; 
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
  object-fit     : contain; /* Changed from cover to contain to prevent cropping */
  display        : block;
}

.character-card.is-vertical .image-wrapper {
  margin-bottom  : 10px;
}

.character-info {
  flex           : 1.2;
  display        : flex;
  flex-direction : column;
  align-items    : center;
  gap            : 15px;
}

.character-card.is-vertical .character-info {
  width          : 100%;
}

.character-info h3 {
  color          : var(--color-default-text-color);
  font-size      : var(--font-h3-size);
  font-family    : var(--font-h3-family, sans-serif);
  font-weight    : 600;
  margin         : 0;
  text-align     : center;
}

.separator-line {
  width          : 100%;
  height         : 3px;
  background     : #ffffff;
  border-radius  : 2px;
  margin-bottom  : 10px;
}

.character-info p {
  color          : var(--color-default-text-color);
  font-size      : var(--font-p-size);
  font-family    : var(--font-body-family, var(--font-body));
  margin         : 0;
  line-height    : 1.5;
  text-align     : left;
  width          : 100%;
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

  .character-info p {
    text-align     : center;
  }
}
</style>