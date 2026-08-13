<template>
  <div 
    ref="rootRef" 
    class="foldable-item" 
    :class="{ 'is-open': internalOpen }"
    :style="{ backgroundColor: bodyBg }"
  >
    <button 
      type="button" 
      class="foldable-header" 
      :style="{ backgroundColor: headerBg }"
      @click="toggleFold"
    >
      <span 
        class="foldable-title" 
        :style="{ color: titleColor }"
      >
        {{ title }}
      </span>
      <span 
        class="icon-wrapper" 
        :style="{ backgroundColor: arrowBgColor }"
      >
        <span 
          class="arrow-wrapper" 
          :class="{ open: internalOpen }"
        >
          <span 
            class="arrow-icon arrow-outline" 
            :style="{ backgroundColor: outlineColor }"
          ></span>
          <span 
            class="arrow-icon" 
            :style="{ backgroundColor: arrowColor }"
          ></span>
        </span>
      </span>
    </button>

    <div class="foldable-collapse">
      <div class="foldable-body-wrapper">
        <div class="foldable-body">
          <ContentSection
            :text                 ="content"
            :header-position      ="headerPosition"
            :heading-color        ="headingColor"
            :heading-align        ="headingAlign"
            :text-color           ="textColor"
            :content-bg           ="contentBg"
            :border-radius        ="borderRadius"
            :border               ="border"
            :header-border        ="headerBorder"
            :text-border          ="textBorder"
            :media-border         ="mediaBorder"
            :media-border-radius  ="mediaBorderRadius"
            :text-align           ="textAlign"
            :section-padding      ="sectionPadding"
            :text-padding         ="textPadding"
            :media-src            ="mediaSrc"
            :media-alt            ="mediaAlt"
            :media-caption        ="mediaCaption"
            :media-width          ="mediaWidth"
            :media-height         ="mediaHeight"
            :media-type           ="mediaType"
            :media-position       ="mediaPosition"
            :layout               ="layout"
            :image-openable       ="imageOpenable"
            :media-shadow         ="mediaShadow"
            :shadow               ="shadow"
          >
            <template #media>
              <slot name="media"></slot>
            </template>
          </ContentSection>
          
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import ContentSection from '@/components/reusables/content_section.vue'

const props = defineProps({
  // Foldable Props
  title: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  headerBg: {
    type: String,
    default: 'var(--foldable-header-bg)'
  },
  titleColor: {
    type: String,
    default: 'var(--foldable-title-color)'
  },
  bodyBg: {
    type: String,
    default: 'var(--foldable-body-bg)'
  },
  arrowBgColor: {
    type: String,
    default: 'var(--foldable-icon-bg)'
  },
  arrowColor: {
    type: String,
    default: 'var(--foldable-icon-color)'
  },
  outlineColor: {
    type: String,
    default: 'var(--foldable-icon-outline)'
  },
  shadow: {
    type: String,
    default: 'var(--foldable-content-shadow)'
  },

  // ContentSection Stuff =============================================================================================================
  content: {
    type: [String, Array],
    default: () => []
  },
  headerPosition: {
    type: String,
    default: 'top'
  },
  headingColor: {
    type: String,
    default: ''
  },
  headingAlign: {
    type: String,
    default: 'center'
  },
  textColor: {
    type: String,
    default: 'var(--foldable-text-color)'
  },
  contentBg: {
    type: String,
    default: '#202020'
  },
  borderRadius: {
    type: String,
    default: '8px'
  },
  border: {
    type: String,
    default: '3px solid #7a6c86'
  },
  headerBorder: {
    type: String,
    default: 'transparent'
  },
  textBorder: {
    type: String,
    default: 'none'
  },
  mediaBorder: {
    type: String,
    default: ''
  },
  mediaBorderRadius: {
    type: String,
    default: ''
  },
  textAlign: {
    type: String,
    default: 'left'
  },
  sectionPadding: {
    type: String,
    default: '16px 20px'
  },
  textPadding: {
    type: String,
    default: '0px'
  },
  mediaSrc: {
    type: String,
    default: ''
  },
  mediaAlt: {
    type: String,
    default: ''
  },
  mediaCaption: {
    type: String,
    default: ''
  },
  mediaWidth: {
    type: String,
    default: '535px'
  },
  mediaHeight: {
    type: String,
    default: 'auto'
  },
  mediaType: {
    type: String,
    default: 'text'
  },
  mediaPosition: {
    type: String,
    default: 'right'
  },
  layout: {
    type: String,
    default: 'horizontal'
  },
  imageOpenable: {
    type: Boolean,
    default: true
  },
  mediaShadow: {
    type: String,
    default: 'var(--content-section-media-shadow)'
  }
})

const emit = defineEmits(['update:modelValue', 'toggle'])

const rootRef = ref(null)
const internalOpen = ref(false)

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
  border-radius       : 8px;
  box-sizing          : border-box;
  background-color    : var(--foldable-body-bg);
  border              : var(--foldable-body-border);
}

.foldable-header {
  width               : 100%;
  display             : flex;
  justify-content     : space-between;
  align-items         : center;
  border              : none;
  padding             : 20px 24px;
  cursor              : pointer;
  text-align          : left;
  box-sizing          : border-box;
  background-color    : var(--foldable-header-bg);
  border-radius       : inherit;
}

.foldable-title {
  color               : var(--foldable-title-color);
  font-family         : var(--font-h2);
  font-size           : var(--font-h2-size);
  font-weight         : 500;
}

.icon-wrapper {
  display             : flex;
  align-items         : center;
  justify-content     : center;
  width               : 40px;
  height              : 40px;
  border-radius       : 50%;
  background-color    : var(--foldable-icon-bg);
  flex-shrink         : 0;
  position            : relative;
}

.arrow-wrapper {
  position            : relative;
  width               : 20px;
  height              : 22px;
  pointer-events      : none;
  z-index             : 2;
  transition          : transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-wrapper.open {
  transform           : rotate(90deg) translateX(-30%);;
}

.arrow-icon {
  position            : absolute;
  left                : 0;
  top                 : 50%;
  width               : 30px;
  height              : 30px;
  transform           : translateY(-50%);
  z-index             : 2;
  
  -webkit-mask-image  : url('@/assets/svg/triangle-right-12-filled.svg');
  mask-image          : url('@/assets/svg/triangle-right-12-filled.svg');
  -webkit-mask-size   : contain;
  mask-size           : contain;
  -webkit-mask-repeat : no-repeat;
  mask-repeat         : no-repeat;
}

.arrow-outline {
  width               : 30px;
  height              : 30px;
  left                : 0;
  top                 : 50%;
  transform           : translateY(-50%) scale(1.3);
  z-index             : 1;
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
</style>