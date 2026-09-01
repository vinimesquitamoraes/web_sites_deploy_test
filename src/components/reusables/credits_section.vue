<template>
  <div class="credits-container">
    <div class="credits-body">
      <div v-for="(section, sIndex) in credits" :key="sIndex" class="credits-section-block">
        <h2 v-if="section.title" class="credits-main-title" :style="{ color: titleColor }">
          {{ section.title }}
        </h2>
        
        <div 
          v-for="(group, index) in section.groups" 
          :key="index" 
          class="credits-group"
        >
          <h3 v-if="group.subtitle" class="credits-role" :style="{ color: subtitleColor }">
            {{ group.subtitle }}
          </h3>
          <ul class="credits-names-list">
            <li 
              v-for="(person, nameIndex) in group.names" 
              :key="nameIndex" 
              class="credits-name"
              @mouseenter="activeTooltipIndex = `${sIndex}-${index}-${nameIndex}`"
              @mouseleave="activeTooltipIndex = null"
            >
              <a 
                v-if="getPersonLink(person)" 
                :href="getPersonLink(person)" 
                target="_blank" 
                rel="noopener" 
                class="credit-link" 
                :style="{ color: textColor }"
              >
                {{ resolveName(person) }}
              </a>
              
              <span 
                v-else 
                :style="{ color: textColor }"
                class="credit-text-fallback"
              >
                {{ resolveName(person) }}
              </span>

              <CustomTooltip 
                :show="activeTooltipIndex === `${sIndex}-${index}-${nameIndex}`"
                :text="getPersonLink(person) || 'No link available'"
                position="top"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomTooltip from '@/components/reusables/tooltip.vue'

const props = defineProps({
  credits: {
    type: Array,
    required: true,
  },
  linksMap: {
    type: Object,
    default: () => ({})
  },
  titleColor: {
    type: String,
    default: 'var(--color-credits-title)'
  },
  subtitleColor: {
    type: String,
    default: 'var(--color-credits-role)'
  },
  textColor: {
    type: String,
    default: 'var(--color-credits-name)'
  },
  columns: {
    type: [Number, String],
    default: 2
  },
  textAlign: {
    type: String,
    default: 'left'
  },
})

const activeTooltipIndex = ref(null)

const resolveName = (person) => {
  if (typeof person === 'object' && person !== null) {
    return person.name
  }
  return person
}

const resolveLink = (person) => {
  const nameStr = resolveName(person)
  if (!nameStr) return null
  const targetKey = nameStr.trim().toLowerCase()
  
  // Case-insensitive search through linksMap keys
  const foundKey = Object.keys(props.linksMap).find(
    k => k.trim().toLowerCase() === targetKey
  )
  return foundKey ? props.linksMap[foundKey] : null
}

const getPersonLink = (person) => {
  if (typeof person === 'object' && person !== null && person.link) {
    return person.link
  }
  return resolveLink(person)
}
</script>

<style scoped>
.credits-container {
  width             : 100%;
  max-width         : 1240px;
  margin-bottom     : 50px;
  padding           : 10px;
  box-sizing        : border-box;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
}

.credits-body {
  width             : 100%;
  max-width         : 600px;
  display           : flex;
  flex-direction    : column;
  align-self        : center;
  gap               : 2.5rem;
}

.credits-section-block {
  width             : 100%;
  display           : flex;
  flex-direction    : column;
  align-items       : center;
  gap               : 2.5rem;
}

.credits-main-title {
  text-decoration   : none;
  font-size         : var(--font-credits-title-size);
  font-family       : var(--font-credits-title);
  font-weight       : bold;
  letter-spacing    : 2px;
  margin            : 0;
  text-transform    : uppercase;
  padding-bottom    : 4px;
}

.credits-group {
  width             : 100%;
  display           : flex;
  flex-direction    : column;
  align-items       : flex-start;
}

.credits-role {
  margin            : 0 0 0.5rem 0;
  font-family       : var(--font-h3);
  font-size         : var(--font-h4-size);
  text-transform    : uppercase;
  letter-spacing    : 1px;
}

.credits-names-list {
  width             : 100%;
  margin            : 0;
  padding           : 0;
  list-style        : none;
  display           : grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap               : 0.25rem 2rem;
}

.credits-name {
  margin            : 0;
  font-family       : var(--font-body), sans-serif;
  font-size         : var(--font-p-size);
  overflow          : visible;
  text-align        : v-bind(textAlign);
  justify-content   : v-bind(textAlign);
  display           : flex;
  position          : relative;
  width             : fit-content;
  max-width         : 100%;
}

.credit-link {
  text-decoration   : none;
  transition        : color 0.2s;
  display           : inline-block;
  pointer-events    : auto;
  cursor            : pointer;
}

.credit-link:hover {
  color             : var(--color-secondary) !important;
  text-decoration   : underline;
}

.credit-text-fallback {
  display           : inline-block;
  cursor            : not-allowed;
}

@media (max-width: 768px) {
  .credits-role {
    font-size       : var(--font-mobile-h4-size);
  }
  .credits-name {
    font-size       : var(--font-mobile-p-size);
  }
}

@media (max-width: 480px) {
  .credits-names-list {
    grid-template-columns: 1fr;
  }
}
</style>