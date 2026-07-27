<template>
  <div class="credits-container">
    <div class="credits-body">
      <div 
        v-for="(group, index) in filteredCreditsData" 
        :key="index" 
        class="credits-group"
      >
        <h3 class="credits-role">{{ t(group.roleKey) }}</h3>
        <ul class="credits-names-list">
          <li 
            v-for="(person, nameIndex) in group.names" 
            :key="nameIndex" 
            class="credits-name"
          >
            <a v-if="person.link" :href="person.link" target="_blank" rel="noopener" class="credit-link">
              {{ person.name }}
            </a>
            <span v-else>
              {{ person.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

import rolesCSVText from '@/assets/csv/credits_roles.csv?raw'
import linksCSVText from '@/assets/csv/credits_links.csv?raw'

const { t } = useI18n()

const props = defineProps({
  act: {
    type: String,
    default: 'all'
  }
})

const rawRolesData = ref([])
const linksMap = ref({})

const parseCSV = (text) => {
  const lines = []
  let row = ['']
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const current = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (current === '"') {
        if (next === '"') {
          row[row.length - 1] += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        row[row.length - 1] += current
      }
    } else {
      if (current === '"') {
        inQuotes = true
      } else if (current === ',') {
        row.push('')
      } else if (current === '\r' || current === '\n') {
        if (current === '\r' && next === '\n') {
          i++
        }
        if (row.length > 1 || row[0] !== '') {
          lines.push(row)
        }
        row = ['']
      } else {
        row[row.length - 1] += current
      }
    }
  }
  
  if (row.length > 1 || row[0] !== '') {
    lines.push(row)
  }

  if (lines.length === 0) return []

  const headers = lines[0].map(h => h.trim())
  return lines.slice(1).map(r => {
    const obj = {}
    headers.forEach((header, idx) => {
      obj[header] = r[idx] ? r[idx].trim() : ''
    })
    return obj
  })
}

const filteredCreditsData = computed(() => {
  return rawRolesData.value.map(row => {
    const roleKey = row['key'] || row['Translation Key'] || row['Role']
    let rawNames = ''
    
    if (props.act === 'all') {
      rawNames = row['en'] || row['ALL ACTS'] || ''
    } else {
      rawNames = row[`ACT ${props.act}`] || ''
    }

    const namesList = rawNames ? rawNames.split(';').map(n => n.trim()) : []
    
    const processedNames = namesList.map(name => ({
      name: name,
      link: linksMap.value[name] || null
    }))

    return {
      roleKey: roleKey,
      names: processedNames
    }
  }).filter(group => group.names.length > 0)
})

onMounted(() => {
  try {
    rawRolesData.value = parseCSV(rolesCSVText)
    const rawLinks = parseCSV(linksCSVText)

    const map = {}
    rawLinks.forEach(item => {
      if (item['Name'] && item['External Link']) {
        map[item['Name']] = item['External Link']
      }
    })
    linksMap.value = map

  } catch (error) {
    console.error('Failed to parse CSV:', error)
  }
})
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

.credits-group {
  width             : 100%;
  display           : flex;
  flex-direction    : column;
  align-items       : flex-start;
}

.credits-role {
  margin            : 0 0 0.5rem 0;
  color             : var(--color-credits-role);
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
  grid-template-columns: repeat(2, 1fr);
  gap               : 0.25rem 2rem;
}

.credits-name {
  margin            : 0;
  color             : var(--color-credits-name);
  font-family       : var(--font-body), sans-serif;
  font-size         : var(--font-p-size);
  white-space       : nowrap;
  overflow          : hidden;
  text-overflow     : ellipsis;
}

.credit-link {
  color             : #ffffff;
  text-decoration   : none;
  transition        : color 0.2s;
}

.credit-link:hover {
  color             : var(--color-hover);
  text-decoration   : underline;
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