<template>
  <div v-if="active" class="floating-notes" :style="wrapperStyles">
    <span 
      v-for="(color, index) in noteColors" 
      :key="index" 
      :class="['note', `note-${index + 1}`]"
      :style="{ backgroundColor: color }"
    ></span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: true
  },
  isRandomColor: {
    type: Boolean,
    default: true
  },
  colors: {
    type: Array,
    default: () => [
      'var(--color-place-holder-green)'
    ]
  },
  fallbackColor: {
    type: String,
    default: 'var(--color-place-holder-green)'
  },
  distance: {
    type: [String, Number],
    default: '-50px'
  },
  speed: {
    type: [String, Number],
    default: '2s'
  }
})

const noteColors = ref([])

const getRandomColor = () => {
  if (!props.isRandomColor || !props.colors || props.colors.length === 0) {
    return props.fallbackColor
  }
  const randomIndex = Math.floor(Math.random() * props.colors.length)
  return props.colors[randomIndex]
}

const refreshColors = () => {
  noteColors.value = [getRandomColor(), getRandomColor(), getRandomColor()]
}

watch(
  [() => props.active, () => props.isRandomColor, () => props.colors],
  () => {
    refreshColors()
  },
  { immediate: true }
)

const wrapperStyles = computed(() => {
  const dist = typeof props.distance === 'number' ? `${props.distance}px` : props.distance
  const spd = typeof props.speed === 'number' ? `${props.speed}s` : props.speed
  
  return {
    '--note-float-distance': dist,
    '--note-speed': spd
  }
})
</script>

<style scoped>
@keyframes floatNote {
  0% {
    opacity   : 0;
    transform : translateY(0) scale(0.5) rotate(-10deg);
  }
  30% {
    opacity   : 1;
  }
  100% {
    opacity   : 0;
    transform : translateY(var(--note-float-distance, -50px)) translateX(12px) scale(1.1) rotate(15deg);
  }
}

.floating-notes {
  position       : absolute;
  top            : 0;
  left           : 0;
  width          : 100%;
  height         : 100%;
  pointer-events : none;
  z-index        : 5;
}

.note {
  position             : absolute;
  display              : inline-block;
  
  --note-size          : 28px;
  
  width                : var(--note-size);
  height               : var(--note-size);
  opacity              : 0;

  -webkit-mask-size    : contain;
  mask-size            : contain;
  -webkit-mask-repeat  : no-repeat;
  mask-repeat          : no-repeat;
  -webkit-mask-position: center;
  mask-position        : center;

  animation            : floatNote var(--note-speed, 2s) infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter               : drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
  pointer-events       : none;
}

.note-1 {
  left                 : 20%;
  animation-delay      : 0s;
  -webkit-mask-image   : url('@/assets/svg/beam-musical-note.svg');
  mask-image           : url('@/assets/svg/beam-musical-note.svg');
}

.note-2 {
  left                 : 50%;
  animation-delay      : calc(var(--note-speed, 2s) * 0.325);
  -webkit-mask-image   : url('@/assets/svg/crotchet-musical-note.svg');
  mask-image           : url('@/assets/svg/crotchet-musical-note.svg');
}

.note-3 {
  left                 : 75%;
  animation-delay      : calc(var(--note-speed, 2s) * 0.65);
  -webkit-mask-image   : url('@/assets/svg/quaver-musical-note.svg');
  mask-image           : url('@/assets/svg/quaver-musical-note.svg');
}

@media (max-width: 480px) {
  .note {
    --note-size: 18px;  
  }

  .note-1 { left: 1%; }
  .note-2 { left: 5%; }
  .note-3 { left: 10%; }
}
</style>