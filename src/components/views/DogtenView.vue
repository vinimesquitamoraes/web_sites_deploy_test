
<template>
  <div class="main-content">
    <Banner
      sessionKey                  ="replace_banner_for_map_renders"
      :alternativeImages          ="mapRenderImagesArray"
      alternativeScrollDirection  ="both"
      subtitle                    =""
      :showLogo                   ="false"
      :showCtaButton              ="false"
    />

    <div class="galery-container">
      <div class="button-wrapper">
        <CustomButton 
          :text        ="t('SITE_DOGTEN_OPTIONS_BUTTON')"
          bgColor     ="#222"
          hoverBgColor="#444"
          textColor   ="#fff"
          @click      ="isOptionsModalOpen = true"
        />
      </div>

      <OptionsModal 
        v-model   ="isOptionsModalOpen"
        :title     ="t('SITE_DOGTEN_OPTIONS_BUTTON')"
        :options  ="modalOptions"
        @change   ="handleModalChange"
      />

      <MediaGallery :items="sampleMediaItems" @select="openModal" />

      <MediaModal 
        :isOpen     ="isMediaModalOpen" 
        :mediaItem  ="sampleMediaItems[currentIndex]" 
        :showNav    ="sampleMediaItems.length > 1"
        @close      ="closeModal"
        @next       ="nextMedia"
        @prev       ="prevMedia"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

import Banner          from '@/components/reusables/banner.vue'
import MediaGallery    from '@/components/reusables/mansory_gallery.vue'
import MediaModal      from '@/components/reusables/media_modal.vue'
import CustomButton    from '@/components/reusables/custom_button.vue'
import OptionsModal    from '@/components/reusables/options_modal.vue'

const { t } = useI18n()

const funnyModules = import.meta.glob('@/assets/img/funny/*.{png,jpg,jpeg,svg,webp,gif,mp4}', {
  eager: true,
  import: 'default'
})

const mapRenderImagesGlob = import.meta.glob('@/assets/img/map_renders/*.{png,jpg,jpeg,svg,webp,gif}', { 
  eager: true, 
  import: 'default' 
})
const mapRenderImagesArray = Object.values(mapRenderImagesGlob)

const mediaOrderConfig = [
  {
    fileName: 'dogten.jpg',
    alt: '???',
    caption: '???',
    visible: true
  },
  {
    fileName: 'ninten_67.gif', 
    alt: 'Ninten doing 67',
    caption: '67',
    visible: true
  },
  {
    fileName: 'itoi.mp4',
    type: 'video',
    alt: 'Itoi video',
    caption: 'Shigesato Itoi',
    visible: true
  },
  {
    fileName: 'whatsapp pippi.mp4',
    type: 'video',
    alt: 'Whatsapp Pippi',
    caption: 'Pippi',
    visible: true
  },
  {
    fileName: 'squirrel.png',
    alt: 'Squirrel',
    caption: '',
    visible: true
  },
  {
    fileName: 'ninten_Dough.png',
    alt: 'Ninten Dough',
    caption: 'Dough',
    visible: true
  },
  {
    fileName: 'lloyd_suicide.png',
    alt: '???',
    caption: '???',
    visible: true
  },
  {
    fileName: 'found_atm_magicant.png',
    alt: '???',
    caption: '???',
    visible: true
  },
  {
    fileName: 'oh_my_full_name.png',
    alt: '???',
    caption: '???',
    visible: true
  },
  {
    fileName: 'pippi.png',
    alt: '???',
    caption: '???',
    visible: true
  },
  {
  fileName: 'ferris_special_mixtape.png',
  alt: '???',
  caption: '???',
  visible: true
}
]

const modalOptions = [
  { key: "replace_banner_for_map_renders", label: t('SITE_DOGTEN_OPTIONS_OP1') },
  { key: "unlocked_special_tape"         , label: t('SITE_DOGTEN_OPTIONS_OP2') }
]

const sampleMediaItems = ref(
  mediaOrderConfig
    .map(config => {

      const matchedPath = Object.keys(funnyModules).find(path => path.endsWith('/' + config.fileName))
      
      if (!matchedPath) return null 

      const src = funnyModules[matchedPath]
      const isVideo = config.fileName.endsWith('.mp4')

      return {
        type: config.type || (isVideo ? 'video' : 'image'),
        src: src,
        alt: config.alt || '???',
        caption: config.caption || '???',
        visible: config.visible !== undefined ? config.visible : true
      }
    })
    .filter(item => item !== null && item.visible)
)
const isOptionsModalOpen = ref(false)
const isMediaModalOpen = ref(false)
const currentIndex = ref(0)

const openModal = (item) => {
  const index = sampleMediaItems.value.findIndex(m => m.src === item.src)
  if (index !== -1) {
    currentIndex.value = index
    isMediaModalOpen.value = true
  }
}

const closeModal = () => {
  isMediaModalOpen.value = false
}

const nextMedia = () => {
  currentIndex.value = (currentIndex.value + 1) % sampleMediaItems.value.length
}

const prevMedia = () => {
  currentIndex.value = (currentIndex.value - 1 + sampleMediaItems.value.length) % sampleMediaItems.value.length
}

const handleModalChange = ({ key, value }) => {
  if (key === 'unlocked_dogten') {
    sessionStorage.setItem('unlocked_dogten', value ? 'true' : 'false')
  }
}

onMounted(() => {
  if (sessionStorage.getItem('unlocked_dogten') === null) {
    sessionStorage.setItem('unlocked_dogten', 'false')
  }
})
</script>

<style scoped>
.galery-container {
  max-width             : 900px;
  margin                : 0 auto;
  padding               : 40px 20px;
  display               : flex;
  flex-direction        : column;
  gap                   : 12px;
}

.button-wrapper {
  display               : flex;
  justify-content       : center;
  margin-bottom         : 20px;
  position              : relative;

}
</style>