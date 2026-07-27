<script setup>
import { ref, onMounted } from 'vue'
import MediaGallery from '@/components/reusables/mansory_gallery.vue'
import MediaModal   from '@/components/reusables/media_modal.vue'


const funnyModules = import.meta.glob('@/assets/img/funny/*.{png,jpg,jpeg,svg,webp,gif,mp4}', {
  eager: true,
  import: 'default'
})

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
  }
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
const isModalOpen = ref(false)
const currentIndex = ref(0)

const openModal = (item) => {
  const index = sampleMediaItems.value.findIndex(m => m.src === item.src)
  if (index !== -1) {
    currentIndex.value = index
    isModalOpen.value = true
  }
}

const closeModal = () => {
  isModalOpen.value = false
}

const nextMedia = () => {
  currentIndex.value = (currentIndex.value + 1) % sampleMediaItems.value.length
}

const prevMedia = () => {
  currentIndex.value = (currentIndex.value - 1 + sampleMediaItems.value.length) % sampleMediaItems.value.length
}

onMounted(() => {
  sessionStorage.setItem('unlocked_dogten', 'false')
})
</script>

<template>
  <div class="galery-container">

    <MediaGallery :items="sampleMediaItems" @select="openModal" />

    <MediaModal 
      :isOpen="isModalOpen" 
      :mediaItem="sampleMediaItems[currentIndex]" 
      :showNav="sampleMediaItems.length > 1"
      @close="closeModal"
      @next="nextMedia"
      @prev="prevMedia"
    />
  </div>
</template>

<style scoped>
.galery-container {
  max-width             : 900px;
  margin                : 0 auto;
  padding               : 40px 20px;
  display               : flex;
  flex-direction        : column;
  gap                   : 12px;
}
</style>