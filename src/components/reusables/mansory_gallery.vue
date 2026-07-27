<template>
  <div class="masonry-container">
    <div 
      v-for="(item, index) in items" 
      :key="item.id || index" 
      class="masonry-item"
      @click="$emit('select', item)"
    >
      <img 
        v-if="item.type === 'image'" 
        :src="item.src" 
        :alt="item.alt || 'Gallery image'" 
        loading="lazy" 
      />

      <video 
        v-else-if="item.type === 'video'" 
        :src="item.src" 
        autoplay 
        loop 
        muted 
        playsinline
        preload="auto"
      ></video>

      <div v-if="item.caption && item.caption !== '???'" class="masonry-overlay">
        <span class="masonry-title">{{ item.caption }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  }
})

defineEmits(['select'])
</script>

<style scoped>
.masonry-container {
  column-count: 3;
  column-gap: 20px;
  width: 100%;
}

@media (max-width: 1024px) {
  .masonry-container {
    column-count: 2;
  }
}

@media (max-width: 640px) {
  .masonry-container {
    column-count: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  background-color: #ffffff;
  
  /* Hard offset solid shadow matching your reference image */
  border: 3px solid #000000;
  box-shadow: 6px 6px 0px #000000;
  
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.masonry-item:hover {
  /* Slight shift upward-left on hover for an interactive press effect */
  transform: translateY(-3px) translateX(-3px);
  box-shadow: 9px 9px 0px #000000;
}

.masonry-item img,
.masonry-item video {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.masonry-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 20px 16px 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.masonry-item:hover .masonry-overlay {
  opacity: 1;
}

.masonry-title {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
}
</style>