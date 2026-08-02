<template>
  <div class="credits-view">
    <div class="credits-header-wrapper">
      <h2 class="credits-main-title">{{ t('SITE_NAV_CREDITS') }}</h2>
      
      <CustomDropdown 
        v-model="currentAct" 
        :options="availableActs" 
      />
    </div>

    <CreditsSection :act="currentAct" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

import CreditsSection from '@/components/reusables/credit_section.vue'
import CustomDropdown from '@/components/reusables/custom_dropdown.vue'

const { t } = useI18n()

const currentAct = ref('all')

const availableActs = ref([
  { id: 'all' , label: 'All' },
  { id: '1'   , label: 'Act 1' },
  { id: '2'   , label: 'Act 2' },
])
</script>

<style scoped>
.credits-view {
  width             : 100%;
  box-sizing        : border-box;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  background-color  : var(--color-credits-background);
  padding           : 3rem ;
}

.credits-header-wrapper {
  width             : 100%;
  max-width         : 800px;
  text-align        : center;
  margin-bottom     : 2rem;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
}

.credits-main-title {
  color             : var(--color-default-text-color );
  font-family       : var(--font-h1);
  font-size         : var(--font-h2-size);
  text-transform    : uppercase;
  margin            : 0 0 1.5rem 0;
  padding-bottom    : 0.5rem;
  letter-spacing    : 2px;
  display           : inline-block;
}

@media (max-width: 768px) {
  .credits-view {
    padding-top     : 2rem;
  }
  .credits-main-title {
    font-size       : var(--font-mobile-h2-size);
    margin-bottom   : 1rem;
  }
}
</style>