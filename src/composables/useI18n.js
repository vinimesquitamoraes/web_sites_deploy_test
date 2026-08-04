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
          const stringValue = value !== undefined && value !== null ? String(value).trim() : ''

          if (!languageMap[lang]) {
            languageMap[lang] = {}
          }

          languageMap[lang][keyName] = stringValue
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
    const lang = currentLang.value
    const langDict = translations.value[lang]
    
    if (langDict && langDict[key] !== undefined && langDict[key] !== '') {
      return langDict[key]
    }

    return `MISSING_KEY:${key} in LANG:${lang}`
  }

  const availableLanguages = computed(() => {
    const langs = {}
    Object.keys(translations.value).forEach((lang) => {
      langs[lang] = translations.value[lang]?.['SITE_THIS_LANGUAGE'] 
        ? translations.value[lang]['SITE_THIS_LANGUAGE'] 
        : lang
    })
    return langs
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