<script setup>
import {useI18n } from '@/composables/useI18n'

const { currentLang, setLanguage, availableLanguages } = useI18n()
</script>

<template>
  <div class="lang-selector-container">
    <select 
      :value="currentLang" 
      @change="setLanguage($event.target.value)"
      class="lang-dropdown"
    >
      <option 
        v-for="lang in availableLanguages" 
        :key="lang" 
        :value="lang"
      >
        {{ lang.toUpperCase() }}
      </option>
    </select>
  </div>
</template>
s
<style scoped>

.lang-selector-container {
  font-family     : var(--font-navbar);
  font-size       : var(--font-navbar-size);
  color           : var(--color-default-text-color);
  display         : flex;
  align-items     : center;
}

.lang-dropdown {
  background    : transparent;
  color         : inherit;
  border        : 1px solid currentColor;
  padding-top   : 4px;
  border-radius : 4px;
  cursor        : pointer;
  font-family   : var(--font-navbar);
  font-size     : var(--font-navbar-size);
}

.lang-dropdown option {
  background  : #222;
  color       : #fff;
  font-family : var(--font-navbar);
  font-size   : var(--font-navbar-size);
}
</style>