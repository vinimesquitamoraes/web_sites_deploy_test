<template>
  <div ref="rootRef" class="foldable-item" :class="{ 'is-open': internalOpen }">
    
    <button type="button" class="foldable-header" @click="toggleFold">
      <span class="foldable-title">{{ title }}</span>
      <span class="icon-wrapper" :class="{ rotated: internalOpen }">
        <img src="@/assets/svg/triangle-right-12-filled.svg" alt="Toggle arrow" class="arrow-icon" />
      </span>
    </button>

    <div class="foldable-collapse">
      <div class="foldable-body-wrapper">
        <div class="foldable-body">
          <template v-if="formattedParagraphs.length">
            <p 
              v-for="(paragraph, index) in formattedParagraphs" 
              :key="index" 
              class="foldable-text-paragraph"
              :style="{ textAlign: textAlign }"
              v-html="paragraph"
            ></p>
          </template>
          <slot v-else></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: [String, Array],
    default: () => []
  },
  textAlign: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  autoScroll: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'toggle'])

const rootRef = ref(null)
const internalOpen = ref(false)

const formattedParagraphs = computed(() => {
  if (Array.isArray(props.content)) {
    return props.content.filter(item => Boolean(item))
  }
  return props.content ? [props.content] : []
})

const scrollToSelf = () => {
  if (props.autoScroll && rootRef.value) {
    nextTick(() => {
      rootRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    })
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    const wasOpen = internalOpen.value
    internalOpen.value = newVal
    if (!wasOpen && newVal) {
      scrollToSelf()
    }
  }
}, { immediate: true })

const toggleFold = () => {
  internalOpen.value = !internalOpen.value
  emit('update:modelValue', internalOpen.value)
  emit('toggle', internalOpen.value)

  if (internalOpen.value) {
    scrollToSelf()
  }
}
</script>

<style scoped>
.foldable-item {
  width               : 100%;
  background-color    : var(--color-background, #161616);
  border-radius       : 8px;
  box-sizing          : border-box;
}

.foldable-item:hover {
  border-color        : var(--color-border-hover, #383838);
}

.foldable-header {
  width               : 100%;
  display             : flex;
  justify-content     : space-between;
  align-items         : center;
  background          : transparent;
  border              : none;
  padding             : 20px 24px;
  cursor              : pointer;
  text-align          : left;
  box-sizing          : border-box;
}

.foldable-title {
  color               : #ffffff;
  font-family         : var(--font-h2, sans-serif);
  font-size           : var(--font-h2-size, 18px);
  font-weight         : 500;
}

.icon-wrapper {
  display             : flex;
  align-items         : center;
  justify-content     : center;
  width               : 32px;
  height              : 32px;
  border-radius       : 50%;
  background-color    : var(--color-icon-bg, rgba(255, 255, 255, 0.05));
  transition          : transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  flex-shrink         : 0;
}

.arrow-icon {
  width               : 16px;
  height              : 16px;
  display             : block;
  filter              : brightness(0) invert(1);
}

.icon-wrapper.rotated {
  transform           : rotate(90deg);
}

.foldable-collapse {
  display             : grid;
  grid-template-rows  : 0fr;
  transition          : grid-template-rows 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  width               : 100%;
  box-sizing          : border-box;
}

.is-open .foldable-collapse {
  grid-template-rows  : 1fr;
}

.foldable-body-wrapper {
  overflow            : hidden;
  width               : 100%;
  box-sizing          : border-box;
}

.foldable-body {
  width               : 100%;
  padding             : 0 24px 24px 24px;
  box-sizing          : border-box;
  display             : flex;
  flex-direction      : column;
  gap                 : 12px;
}

.foldable-text-paragraph {
  color               : var(--color-default-text-color, #ffffff);
  font-family         : var(--font-p, sans-serif);
  font-size           : var(--font-p-size, 16px);
  line-height         : 1.5;
  margin              : 0;
}

.foldable-text-paragraph :deep(i),
.foldable-text-paragraph :deep(em) {
  font-style          : italic;
}

.foldable-text-paragraph :deep(a) {
  color               : var(--color-hyperlinks, #fdd268);
  text-decoration     : underline;
}
</style>