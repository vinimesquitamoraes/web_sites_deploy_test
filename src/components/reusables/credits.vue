<template>
  <div class="credits-container">
    <div v-for="(section, index) in credits" :key="index" class="credits-section">
      <h2 v-if="section.title" class="credits-title" :style="{ color: titleColor }">
        {{ section.title }}
      </h2>
      
      <div v-for="(group, gIndex) in section.groups" :key="gIndex" class="credits-group">
        <h3 v-if="group.subtitle" class="credits-subtitle" :style="{ color: subtitleColor }">
          {{ group.subtitle }}
        </h3>
        
        <div class="credits-names">
          <p v-for="(name, nIndex) in group.names" :key="nIndex" class="credits-name" :style="{ color: textColor }">
            {{ name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  credits: {
    type: Array,
    required: true,
  },
  titleColor: {
    type: String,
    default: '#ffffff'
  },
  subtitleColor: {
    type: String,
    default: '#ffaa44'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  }
})
</script>

<style scoped>
.credits-container {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  width                 : 100%;
  box-sizing            : border-box;
  padding               : 40px 20px;
  background-color      : var(--color-background, #1a1a1a);
  font-family           : var(--font-credits, monospace);
  text-align            : center;
  gap                   : 40px;
}

.credits-section {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  width                 : 100%;
  gap                   : 24px;
}

.credits-title {
  font-size             : 24px;
  font-weight           : bold;
  letter-spacing        : 2px;
  margin                : 0;
  text-transform        : uppercase;
  border-bottom         : 2px solid currentColor;
  padding-bottom        : 4px;
}

.credits-group {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  width                 : 100%;
  gap                   : 8px;
}

.credits-subtitle {
  font-size             : 16px;
  font-weight           : bold;
  margin                : 16px 0 4px 0;
  text-transform        : uppercase;
}

.credits-names {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  gap                   : 4px;
  width                 : 100%;
}

.credits-name {
  font-size             : 16px;
  margin                : 0;
  line-height           : 1.5;
}
</style>