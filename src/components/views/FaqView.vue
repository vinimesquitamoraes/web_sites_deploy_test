<template>
  <div class="faq-container">
    
    <h1 class="heading" :style="{ color: headingColor }">{{ t('SITE_FAQ_TITLE') }}</h1>

    <FoldableSection 
      v-for="(section, index) in infoSections" 
      :key="index"
      :title="section.title"
    >
      <ContentSection
        :heading        ="section.title"
        :text           ="section.text"
        :mediaType      ="section.content_type"
        :mediaSrc       ="section.image || ''"
        :mediaAlt       ="section.mediaAlt || section.title"
        :redBorder      ="section.redBorder || false"
        :imageOpenable  ="section.imageOpenable !== false"
        :showHeader     ="false"
        headingColor    ="#ffffff"
        textColor       ="#ffffff"
        layout          ="horizontal"
        mediaPosition   ="right"
      />
    </FoldableSection>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n }   from '@/composables/useI18n'
import FoldableSection  from '@/components/reusables/foldable_section.vue'
import ContentSection   from '@/components/reusables/content_section.vue'

defineProps({
  headingColor: {
    type: String,
    default: ''
  }
})

const { currentLang, t } = useI18n()

const idkImages = import.meta.glob('/src/assets/img/funny/idk_*.jpeg', {
  eager: true,
  import: 'default'
})

const infoSections = computed(() => [
  {
    title         : t('SITE_FAQ_Q1'),
    text          : t('SITE_FAQ_A1'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q2'),
    text          : [t('SITE_FAQ_A2_1'), t('SITE_FAQ_A2_2')],
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q3'),
    text          : t('SITE_FAQ_A3'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q4'),
    text          : [t('SITE_FAQ_A4_1'), t('SITE_FAQ_A4_2')],
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q5'),
    text          : t('SITE_FAQ_A5'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q6'),
    text          : t('SITE_FAQ_A6'),
    content_type  : "text"
  },
  {
    title         : t('SITE_FAQ_Q7'),
    content_type  : "image",
    image         : idkImages[`/src/assets/img/funny/idk_${currentLang.value}.jpeg`] || '',
    mediaAlt      : "IDK image meme"
  },
]) 
</script>

<style scoped>
.heading {
  align-self            : stretch;
  font-size             : var(--font-h1-size);
  font-family           : var(--font-h1);
  color                 : var(--color-h1, #1F1F1F);
  text-align            : center;
  font-weight           : 500;
  margin                : 0 0 15px 0;
}

.faq-container {
  max-width             : 900px;
  margin                : 0 auto;
  padding               : 40px 20px;
  display               : flex;
  flex-direction        : column;
  gap                   : 12px;
}
</style>