<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { currentLang, setLanguage, availableLanguages } = useI18n()
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (code) => {
  setLanguage(code)
  isOpen.value = false
}

const closeOnClickOutside = (event) => {
  if (!event.target.closest('.lang-selector-container')) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))
</script>

<template>
  <div class="lang-selector-container">
    <button 
      type="button"
      @click="toggleDropdown" 
      class="lang-button"
    >
      <span>{{ currentLang.toUpperCase() }}</span>
      <span class="arrow">▼</span>
    </button>

    <ul v-if="isOpen" class="lang-menu">
      <li 
        v-for="(label, code) in availableLanguages" 
        :key="code" 
        @click="selectLanguage(code)"
        :class="{ active: currentLang === code }"
        class="lang-option"
      >
        {{ label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang-selector-container {
  font-family       : var(--font-navbar);
  font-size         : var(--font-navbar-size);
  color             : var(--color-default-text-color);
  display           : inline-flex;
  position          : relative;
}

.lang-button {
  background        : transparent;
  color             : inherit;
  border            : 1px solid currentColor;
  padding           : 4px 8px;
  border-radius     : 4px;
  cursor            : pointer;
  font-family       : var(--font-navbar);
  font-size         : var(--font-navbar-size);
  display           : inline-flex;
  align-items       : center;
  gap               : 6px;
  text-transform    : uppercase;
  white-space       : nowrap;
}

.arrow {
  font-size         : 0.7em;
}

.lang-menu {
  position          : absolute;
  top               : 100%;
  right             : 0;
  margin            : 4px 0 0 0;
  padding           : 0;
  list-style        : none;
  background        : #222;
  border            : 1px solid currentColor;
  border-radius     : 4px;
  box-shadow        : 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index           : 99999;
  min-width         : max-content;
  white-space       : nowrap;
}

.lang-option {
  padding           : 6px 12px;
  color             : #fff;
  cursor            : pointer;
  font-family       : var(--font-navbar);
  font-size         : var(--font-navbar-size);
}

.lang-option:hover {
  background        : rgba(255, 255, 255, 0.1);
}

.lang-option.active {
  background        : #007bff;
  color             : #fff;
}

@media (max-width: 900px) {
  .lang-selector-container {
    width           : 100%;
    justify-content : flex-end;
  }
  
  .lang-menu {
    top             : 100%;
    right           : 0;
  }
}
</style>