<template>
  <Transition name="fade-bounce" appear>
    <div v-if="modelValue" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-panel" :style="panelStyles">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <CustomButton
            :icon-src="closeIcon"
            icon-size="30"
            bg-color="transparent"
            hover-bg-color="transparent"
            @click="closeModal"
          />
        </div>

        <div class="modal-body">
          <div v-for="option in options" :key="option.key" class="option-row">
            <span class="option-label">{{ option.label }}</span>
            
            <ToggleSwitch
              :modelValue         ="sessionState[option.key]"
              @update:modelValue  ="(val) => toggleOption(option.key, val)"
              :activeIconSrc="closeIcon"
              icon-color="#FFD700"
              handle-bg-color="#1A1A1A"
              bg-color="#333333"
              active-bg-color="#4A5568"
              hover-bg-color="#2D3748"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted } from 'vue'
import ToggleSwitch from './toggle_button.vue'
import CustomButton from './custom_button.vue'

import closeIcon from '@/assets/svg/close-svgrepo-com.svg'

const props = defineProps({
  modelValue: {
    type    : Boolean,
    default : false
  },
  title: {
    type    : String,
    default : 'Settings / Options'
  },
  options: {
    type    : Array,
    required: true,
  },
  width: {
    type    : [Number, String],
    default : 400
  },
  bgColor: {
    type    : String,
    default : 'var(--color-custom-button-background)'
  },
  hoverBgColor: {
    type    : String,
    default : 'var(--color-custom-button-hover)'
  },
  activeBgColor: {
    type    : String,
    default : 'var(--color-hover)'
  },
  textColor: {
    type    : String,
    default : 'var(--color-custom-button-text)'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const sessionState = reactive({})

const syncSessionState = () => {
  props.options.forEach(opt => {
    sessionState[opt.key] = sessionStorage.getItem(opt.key) === 'true'
  })
}

syncSessionState()

const panelStyles = computed(() => {
  const w = props.width
  const widthVal = typeof w === 'number' ? `${w}px` : w
  return {
    width           : widthVal,
    maxWidth        : 'calc(100vw - 2rem)',
    backgroundColor : props.bgColor,
    color           : props.textColor
  }
})

const toggleOption = (key, nextValue) => {
  sessionState[key] = nextValue
  sessionStorage.setItem(key, nextValue ? 'true' : 'false')

  window.dispatchEvent(new Event('session-storage-updated'))

  emit('change', { key, value: nextValue, allState: sessionState })
}

const closeModal = () => {
  emit('update:modelValue', false)
}

onMounted(() => {
  window.addEventListener('session-storage-updated', syncSessionState)
  window.addEventListener('storage', syncSessionState)
})

onUnmounted(() => {
  window.removeEventListener('session-storage-updated', syncSessionState)
  window.removeEventListener('storage', syncSessionState)
})
</script>

<style scoped>
.modal-backdrop {
  position                    : fixed;
  top                         : 0;
  left                        : 0;
  width                       : 100vw;
  height                      : 100vh;
  background                  : rgba(0, 0, 0, 0.5);
  display                     : flex;
  align-items                 : center;
  justify-content             : center;
  z-index                     : 99999;
  padding                     : 1rem;
  box-sizing                  : border-box;
}

.modal-panel {
  border                      : 2px solid #000000;
  border-radius               : 12px;
  display                     : flex;
  flex-direction              : column;
  box-sizing                  : border-box;
  overflow                    : hidden;
  max-height                  : calc(100vh - 2rem);
}

.modal-header {
  display                     : flex;
  align-items                 : center;
  justify-content             : space-between;
  padding                     : 1rem 1.5rem;
  border-bottom               : 2px solid #000000;
  flex-shrink                 : 0;
}

.modal-title {
  font-family                 : var(--font-button);
  margin                      : 0;
  font-size                   : 1.25rem;
  word-break                  : break-word;
}

.modal-body {
  padding                     : 1.5rem;
  display                     : flex;
  flex-direction              : column;
  gap                         : 1rem;
  overflow-y                  : auto;
  -webkit-overflow-scrolling  : touch;
}

.option-row {
  display                     : flex;
  align-items                 : center;
  justify-content             : space-between;
  gap                         : 1rem;
}

.option-label {
  font-family                 : var(--font-button);
  font-size                   : var(--font-button-size);
  word-break                  : break-word;
}

.fade-bounce-enter-active {
  transition                  : opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-bounce-leave-active {
  transition                  : opacity 0.2s ease, transform 0.2s ease;
}

.fade-bounce-enter-from,
.fade-bounce-leave-to {
  opacity                     : 0;
  transform                   : scale(0.9);
}

@media (max-width: 480px) {
  .modal-backdrop {
    padding                   : 0.5rem;
  }
  
  .modal-body {
    padding                   : 1rem;
  }

  .modal-header {
    padding                   : 0.75rem 1rem;
  }

  .option-row {
    gap                       : 0.5rem;
  }
}
</style>