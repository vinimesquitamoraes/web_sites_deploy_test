<template>
  <Transition :name="transitionName">
    <div 
      v-if="visible" 
      class="toaster-notification"
      :class="[positionClass, typeClass]"
      :style="{ '--toaster-duration': `${duration}ms` }"
      role="alert"
    >
      <div class="toaster-content">
        <div v-if="icon || $slots.icon" class="toaster-icon-wrap">
          <slot name="icon">
            <img :src="icon" alt="Toast Icon" class="toaster-icon-img" />
          </slot>
        </div>
        <div class="toaster-text-wrap">
          <slot>
            <p class="toaster-message">{{ message }}</p>
          </slot>
        </div>
        <button v-if="dismissible" class="toaster-dismiss-btn" @click="closeToast" aria-label="Close Notification">
          &times;
        </button>
      </div>
      <div v-if="showProgressBar" class="toaster-progress-bar">
        <div class="toaster-progress-fill"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type    : Boolean,
    required: true
  },
  message: {
    type    : String,
    default : 'Default toaster notification!'
  },
  icon: {
    type    : String,
    default : '@/assets/img/characters/ninten_head_sprite.png'
  },
  position: {
    type    : String,
    default : 'top-right',
    validator: (val) => ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'].includes(val)
  },
  type: {
    type    : String,
    default : 'info',
    validator: (val) => ['info', 'success', 'warning', 'error'].includes(val)
  },
  duration: {
    type    : Number,
    default : 4000
  },
  showProgressBar: {
    type    : Boolean,
    default : true
  },
  dismissible: {
    type    : Boolean,
    default : true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

let timer = null

const startTimer = () => {
  if (props.duration > 0) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      closeToast()
    }, props.duration)
  }
}

const closeToast = () => {
  clearTimeout(timer)
  visible.value = false
  emit('close')
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    startTimer()
  }
}, { immediate: true })

const positionClass = computed(() => `toaster-${props.position}`)
const typeClass     = computed(() => `toaster-${props.type}`)

const transitionName = computed(() => {
  if (props.position.includes('top')) return 'slide-down'
  return 'slide-up'
})
</script>

<style scoped>
.toaster-notification {
  position              : fixed;
  z-index               : 9999;
  display               : flex;
  flex-direction        : column;
  background            : var(--toaster-bg-main, #ffffff);
  border                : 2px solid var(--toaster-border-color, #000000);
  border-radius         : 10px;
  box-shadow            : var(--toaster-shadow, 4px 4px 0px #000000);
  padding               : 12px 16px;
  max-width             : 380px;
  box-sizing            : border-box;
  overflow              : hidden;
  font-family           : system-ui, -apple-system, sans-serif;
}

.toaster-content {
  display               : flex;
  align-items           : center;
  gap                   : 12px;
  width                 : 100%;
}

.toaster-icon-wrap {
  display               : flex;
  align-items           : center;
  justify-content       : center;
  flex-shrink           : 0;
}

.toaster-icon-img {
  width                 : 60px;
  height                : 60px;
  object-fit            : contain;
  display               : block;
}

.toaster-text-wrap {
  display               : flex;
  align-items           : center;
  flex                  : 1;
  min-width             : 0;
}

.toaster-message {
  margin                : 0;
  font-size             : var(--toaster-font-size, 0.85rem);
  font-weight           : 600;
  color                 : var(--toaster-text-color, #000000);
  word-break            : break-word;
}

.toaster-dismiss-btn {
  background            : transparent;
  border                : none;
  font-size             : 1.25rem;
  font-weight           : 700;
  line-height           : 1;
  cursor                : pointer;
  color                 : var(--toaster-text-color, #000000);
  opacity               : 0.6;
  padding               : 0;
  margin-left           : 4px;
  flex-shrink           : 0;
  transition            : opacity 0.15s ease;
}

.toaster-dismiss-btn:hover {
  opacity               : 1;
}

.toaster-progress-bar {
  position              : absolute;
  bottom                : 0;
  left                  : 0;
  width                 : 100%;
  height                : 3px;
  background            : var(--toaster-progress-bg, rgba(0, 0, 0, 0.1));
}

.toaster-progress-fill {
  height                : 100%;
  width                 : 100%;
  background            : var(--toaster-accent, #ff6b6b);
  animation             : progress-shrink linear var(--toaster-duration) forwards;
}

@keyframes progress-shrink {
  from { width: 100%; }
  to { width: 0%; }
}

.toaster-top-right {
  top                   : 20px;
  right                 : 20px;
}

.toaster-top-left {
  top                   : 20px;
  left                  : 20px;
}

.toaster-top-center {
  top                   : 20px;
  left                  : 50%;
  transform             : translateX(-50%);
}

.toaster-bottom-right {
  bottom                : 20px;
  right                 : 20px;
}

.toaster-bottom-left {
  bottom                : 20px;
  left                  : 20px;
}

.toaster-bottom-center {
  bottom                : 20px;
  left                  : 50%;
  transform             : translateX(-50%);
}

.toaster-success {
  background            : var(--toaster-success-bg, #e8f8f5);
  border-color          : var(--toaster-success-border, #27ae60);
}

.toaster-success .toaster-progress-fill {
  background            : var(--toaster-success-border, #27ae60);
}

.toaster-warning {
  background            : var(--toaster-warning-bg, #fef9e7);
  border-color          : var(--toaster-warning-border, #f39c12);
}

.toaster-warning .toaster-progress-fill {
  background            : var(--toaster-warning-border, #f39c12);
}

.toaster-error {
  background            : var(--toaster-error-bg, #f5b7b1);
  border-color          : var(--toaster-error-border, #c0392b);
}

.toaster-error .toaster-progress-fill {
  background            : var(--toaster-error-border, #c0392b);
}

.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active {
  transition            : all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity               : 0;
  transform             : translateY(-20px);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity               : 0;
  transform             : translateY(20px);
}

.toaster-top-center.slide-down-enter-from,
.toaster-top-center.slide-down-leave-to {
  transform             : translate(-50%, -20px);
}

.toaster-bottom-center.slide-up-enter-from,
.toaster-bottom-center.slide-up-leave-to {
  transform             : translate(-50%, 20px);
}
</style>