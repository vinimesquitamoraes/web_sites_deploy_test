<template>
  <div class="dropdown-container">
    <div class="dropdown-trigger" @click="isOpen = !isOpen">
      <div class="arrow-wrapper" :class="{ open: isOpen }">
        <span class="arrow-icon"></span>
      </div>
      <span class="selected-label">{{ selectedLabel }}</span>
    </div>

    <div v-if="isOpen" class="dropdown-options-list">
      <div 
        v-for="option in options" 
        :key="option.id"
        class="dropdown-option"
        :class="{ active: modelValue === option.id }"
        @click="selectOption(option.id)"
      >
        <span class="option-arrow"></span>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const current = props.options.find(opt => opt.id === props.modelValue)
  return current ? current.label : ''
})

const selectOption = (id) => {
  emit('update:modelValue', id)
  isOpen.value = false
}

const closeDropdown = (e) => {
  if (!e.target.closest('.dropdown-container')) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeDropdown))
onUnmounted(() => document.removeEventListener('click', closeDropdown))
</script>

<style scoped>
.dropdown-container {
  width             : 100%;
  max-width         : 120px;
  position          : relative;
  font-family       : inherit;
}

.dropdown-trigger {
  width             : 100%;
  box-sizing        : border-box;
  font              : var(--font-dropdown );
  font-size         : var(--font-dropdown-size );
  font-weight       : bold;
  padding           : 0.6rem 1rem 0.6rem 2.4rem;
  border            : 2px solid #000000;
  border-radius     : 6px;
  background-color  : var(--color-hover, #ff9900);
  color             : #000000;
  cursor            : pointer;
  box-shadow        : 3px 3px 0px #000000;
  text-transform    : uppercase;
  transition        : all 0.15s ease-in-out;
  position          : relative;
  display           : flex;
  align-items       : center;
}

.arrow-wrapper {
  position            : absolute;
  left                : 12px;
  top                 : 50%;
  width               : 14px;
  height              : 16px;
  transform           : translateY(-50%);
  pointer-events      : none;
  z-index             : 2;
  transition          : transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-wrapper.open {
  transform           : translateY(-50%) rotate(90deg);
}

.arrow-icon {
  position            : absolute;
  left                : 0;
  top                 : 50%;
  width               : 14px;
  height              : 16px;
  background-color    : #000000;
  transform           : translateY(-50%);
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  
  animation           : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

.dropdown-trigger:hover {
  background-color  : var(--color-primary, #E50012);
  color             : #ffffff;
  transform         : translateY(-2px);
  box-shadow        : 4px 4px 0px #000000;
}

.dropdown-trigger:hover .arrow-icon {
  background-color  : #ffffff;
}

.dropdown-options-list {
  position            : absolute;
  top                 : calc(100% + 6px);
  left                : 0;
  width               : 100%;
  background-color    : var(--color-hover);
  border              : 2px solid #000000;
  border-radius       : 6px;
  box-shadow          : 3px 3px 0px #000000;
  z-index             : 99;
  overflow            : hidden;
  box-sizing          : border-box;
}

.dropdown-option {
  padding             : 0.6rem 1rem 0.6rem 2.4rem;
  font                : var(--font-dropdown );
  font-size           : var(--font-dropdown-size );
  font-weight         : bold;
  color               : #000000;
  cursor              : pointer;
  text-transform      : uppercase;
  position            : relative;
  transition          : background-color 0.15s ease;
}

.dropdown-option:hover {
  background-color    : var(--color-primary, #E50012);
  color               : #ffffff;
}

.dropdown-option:hover .option-arrow {
  background-color    : #ffffff;
}

.dropdown-option .option-arrow {
  display             : none;
}

.dropdown-option.active {
  background-color    : #000000;
  color               : #ffffff;
}

.dropdown-option.active .option-arrow {
  display             : block;
  position            : absolute;
  left                : 12px;
  top                 : 50%;
  transform           : translateY(-50%);
  width               : 14px;
  height              : 16px;
  background-color    : #ffffff;
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
  
  animation           : choppy-horizontal 0.6s steps(3, end) infinite alternate;
}

@keyframes choppy-horizontal {
  0% {
    transform: translateY(-50%) translateX(0px);
  }
  100% {
    transform: translateY(-50%) translateX(3px);
  }
}
</style>