import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import excelUrl from '@/assets/xlsx/translations.xlsx?url'

const translations = ref({})
const currentLang = ref('en')
const isLoaded = ref(false)

const ENABLE_DEBUG_LOGS = false

const debugLog = (...args) => {
  if (ENABLE_DEBUG_LOGS) {
    console.log(...args)
  }
}

export const setLanguage = (lang) => {
  currentLang.value = lang
}

export function useI18n() {
  const loadTranslations = async () => {
    if (isLoaded.value) return

    try {
      const languageMap = {}

      const response = await fetch(excelUrl)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch translations.xlsx: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()

      const workbook  = XLSX.read(arrayBuffer, { type: 'array' })
      
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]

      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

      rows.forEach((row) => {
        const keyField = Object.keys(row).find(k => k.toLowerCase() === 'key')
        const rawKey = keyField ? row[keyField] : null
        
        if (!rawKey) return

        const keyName = String(rawKey).trim()

        for (const [colName, value] of Object.entries(row)) {
          const trimmedCol = colName.trim()
          
          if (trimmedCol.toLowerCase() === 'key' || !trimmedCol) continue

          const lang = trimmedCol
          const stringValue = value !== undefined && value !== null ? String(value) : ''

          if (!languageMap[lang]) {
            languageMap[lang] = {}
          }

          languageMap[lang][keyName] = stringValue.trim()
        }
      })

      translations.value = languageMap
      isLoaded.value = true

      debugLog('--- TRANSLATIONS DEBUG ---')
      debugLog('Loaded Languages:', Object.keys(translations.value))
      debugLog('Full Translation Dictionary:', translations.value)
      debugLog('--------------------------')

    } catch (error) {
      console.error('Failed to process translation Excel file:', error)
    }
  }

  const t = (key) => {
    const langDict = translations.value[currentLang.value]
    if (!langDict || langDict[key] === undefined) {
      const fallbackDict = translations.value['en']
      if (fallbackDict && fallbackDict[key] !== undefined) {
        return fallbackDict[key]
      }
      console.warn(`Translation key not found: "${key}"`)
      return key 
    }
    return langDict[key]
  }

  const availableLanguages = computed(() => {
    return Object.keys(translations.value)
  })

  return {
    loadTranslations,
    t,
    setLanguage,
    currentLang,
    isLoaded,
    availableLanguages
  }
}