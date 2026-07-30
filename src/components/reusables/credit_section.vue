<template>
  <CreditsComponent 
    :credits="formattedCredits" 
    :linksMap="linksMap" 
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import CreditsComponent from '@/components/reusables/credits.vue'

import rolesCSVText from '@/assets/csv/credits_roles.csv?raw'
import linksCSVText from '@/assets/csv/credits_links.csv?raw'

const { t } = useI18n()

const props = defineProps({
  act: {
    type: String,
    default: 'all'
  }
})

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
      } else if (current === ';') { 
        row.push('')
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

const linksMap = computed(() => {
  const map = {}
  const rawLinks = parseCSV(linksCSVText)
  rawLinks.forEach(item => {
    const nameKey = item['Name'] || item['name'] || ''
    const linkVal = item['External Link'] || item['link'] || item['External_Link'] || ''
    if (nameKey) {
      map[nameKey.trim().toLowerCase()] = linkVal.trim()
    }
  })
  return map
})

const formattedCredits = computed(() => {
  const rawRoles = parseCSV(rolesCSVText)
  
  const groups = rawRoles.map(row => {
    const roleKey = row['key'] || row['Translation Key'] || row['Role']
    let rawNames = ''
    
    if (props.act === 'all') {
      rawNames = row['en'] || row['ALL ACTS'] || ''
    } else {
      rawNames = row[`ACT ${props.act}`] || ''
    }

    const namesList = rawNames ? rawNames.split(';').map(n => n.trim()) : []
    
    const processedNames = namesList.map(name => {
      const matchKey = name.toLowerCase()
      return {
        name: name,
        link: linksMap.value[matchKey] || null
      }
    })

    return {
      subtitle: t(roleKey),
      names: processedNames
    }
  }).filter(group => group.names.length > 0)

  return [
    {
      title: '',
      groups: groups
    }
  ]
})
</script>