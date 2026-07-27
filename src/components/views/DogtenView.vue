<script setup>
import { ref, onMounted } from 'vue'
import MediaGallery from '@/components/reusables/mansory_gallery.vue'
import MediaModal   from '@/components/reusables/media_modal.vue'


import imgDogten       from '@/assets/img/funny/dogten.jpg'
import gifNinten67     from '@/assets/img/characters/Ninten_67.gif'
import imgBreakingBad  from '@/assets/img/funny/breaking_bad.png'
import imgNintenDough  from '@/assets/img/funny/ninten_Dough.png'
import imgImage59      from '@/assets/img/funny/image-59.png'
import imgImage64      from '@/assets/img/funny/image-64.png'
import imgImage        from '@/assets/img/funny/image.png'

import videoItoi          from '@/assets/img/funny/itoi.mp4'
import videoWhatsappPippi from '@/assets/img/funny/whatsapp pippi.mp4'

const sampleMediaItems = ref([
  {
    type: 'image',
    src: imgDogten,
    alt: '???',
    caption: '???'
  },
  {
    type: 'image',
    src: gifNinten67,
    alt: 'Ninten doing 67',
    caption: '67'
  },
  {
    type: 'video',
    src: videoItoi,
    alt: '???',
    caption: '???'
  },
  {
    type: 'video',
    src: videoWhatsappPippi,
    alt: '???',
    caption: '???'
  },
  {
    type: 'image',
    src: imgBreakingBad,
    alt: 'Ninten doing 67',
    caption: ''
  },
  {
    type: 'image',
    src: imgNintenDough,
    alt: '???',
    caption: '???'
  },
  {
    type: 'image',
    src: imgImage59,
    alt: '???',
    caption: '???'
  },
  {
    type: 'image',
    src: imgImage64,
    alt: '???',
    caption: '???'
  },
  {
    type: 'image',
    src: imgImage,
    alt: '???',
    caption: '???'
  },
])

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