<template>
  <div 
    class="character-card" 
    :class="{ 
      reverse: isReversed && orientation !== 'vertical', 
      'is-vertical': orientation === 'vertical' 
    }"
  >
    <div class="image-wrapper">
      <img :src="image" :alt="name" class="character-image" />
    </div>
    <div class="character-info">
      <h3>{{ name }}</h3>
      <div class="separator-line"></div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name        : { type: String, required: true },
  description : { type: String, required: true },
  image       : { type: String, required: true },
  isReversed  : { type: Boolean, default: false },
  orientation : { type: String, default: 'horizontal', validator: (val) => ['horizontal', 'vertical'].includes(val) }
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
  flex           : 1;
  display        : flex;
  justify-content: center;
  align-items    : center;
  height         : 100%;
  min-height     : 300px;
}

.character-image {
  width          : 100%;
  height         : 100%;
  max-height     : 350px;
  object-fit     : contain;
  display        : block;
}

.character-card.is-vertical .image-wrapper {
  width          : 100%;
  min-height     : auto;
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
  font-family    : sans-serif;
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
  font-family    : var(--font-body);
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
    min-height     : 200px;
  }

  .character-image {
    max-height     : 250px;
  }

  .character-info {
    align-items    : center;
  }

  .character-info p {
    text-align     : center;
  }
}
</style>