import { ref, computed } from 'vue'
import Papa from 'papaparse'

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
  const loadTranslations = () => {
    if (isLoaded.value) return

    try {
      const languageMap = {}

      const csvModules = import.meta.glob('@/assets/csv/*.csv', {
        query: '?raw',
        eager: true,
        import: 'default'
      })

      for (const filePath in csvModules) {
        const csvText = csvModules[filePath]
        debugLog(`Processing bundled CSV: ${filePath}`)
        
        if (!csvText) {
          console.warn(`File is empty: ${filePath}`)
          continue
        }

        const hasCsvStructure = csvText.includes(';')
        if (!hasCsvStructure) {
          console.warn(`Skipping ${filePath}: Not a valid CSV format.`)
          continue
        }

        Papa.parse(csvText, {
          header: true,
          delimiter: ';', 
          skipEmptyLines: true,
          complete: (results) => {
            results.data.forEach((row) => {
              const rawKey = row.Key || row.key
              if (!rawKey) return

              const keyName = String(rawKey).trim()

              for (const [colName, value] of Object.entries(row)) {
                const trimmedCol = colName.trim()
                
                if (trimmedCol.toLowerCase() === 'key' || trimmedCol === '__parsed_extra' || !trimmedCol) continue

                const lang = trimmedCol
                const stringValue = value !== undefined && value !== null ? String(value) : ''

                if (!languageMap[lang]) {
                  languageMap[lang] = {}
                }

                languageMap[lang][keyName] = stringValue.trim()
              }
            })
          }
        })
      }

      translations.value = languageMap
      isLoaded.value = true

      debugLog('--- TRANSLATIONS DEBUG ---')
      debugLog('Loaded Languages:', Object.keys(translations.value))
      debugLog('Full Translation Dictionary:', translations.value)
      debugLog('--------------------------')

    } catch (error) {
      console.error('Failed to process translation CSVs:', error)
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