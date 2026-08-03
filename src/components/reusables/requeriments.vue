<template>
<div class="requirements-container">
<table class="requirements-table">
<tbody>
<tr v-for="item in requirements" :key="item.key">
<td class="requirement-label">{{ t(item.key) }}</td>
<td class="requirement-value">{{t(item.value) }}</td>
</tr>
</tbody>
</table>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const requirements = ref([
{ key: 'SITE_DOWNLOAD_REQ_OS',            value: 'SITE_DOWNLOAD_REQ_OS_DETAILS' },
{ key: 'SITE_DOWNLOAD_REQ_RAM',           value: 'SITE_DOWNLOAD_REQ_RAM_DETAILS' },
{ key: 'SITE_DOWNLOAD_REQ_VIDEO',         value: 'SITE_DOWNLOAD_REQ_VIDEO_DETAILS' },
{ key: 'SITE_DOWNLOAD_REQ_LANGUAGES',     value: 'SITE_DOWNLOAD_REQ_LANGUAGES_DETAILS' }
])
</script>

<style scoped>
.requirements-container {
  width           : 100%;
  max-width       : 100%;
  font-family     : var(--font-h3);
  font-size       : var(--font-h3-size);
  background-color: var(--color-requiriments-key-background);
  overflow-x      : hidden;
  box-shadow       : var(--color-requiriments-shadow);
}

.requirements-table {
  width           : 100%;
  border-collapse : collapse;
  color           : var(--color-default-text-color);
}

.requirements-table tr {
  box-shadow      : var(--color-requiriments-shadow); 
}

.requirements-table td {
  padding         : 14px 16px;
  vertical-align  : middle;
}

.requirement-label {
  width                 : 25%;
  background-color      : var(--color-requiriments-key-background);
  font-weight           : bold;
  border-color          : var(--color-keys-border-color);
  border-style          : solid;
  border-bottom-width   : 1px;
}

.requirement-value {
  width                 : 75%;
  background-color      : var(--color-requiriments-value-background);
  line-height           : 1.4;
  border-color          : var(--color-values-border-color);
  border-style          : solid;
  border-bottom-width   : 1px;
}

@media screen and (max-width: 768px) {
  .requirements-table,
  .requirements-table tbody,
  .requirements-table tr,
  .requirements-table td {
    display     : block;
    width       : 100% !important;
  }

  .requirements-table tr {
    margin-bottom: 12px;
  }

  .requirement-label {
    border-bottom-width: 0px;
  }
}
</style>
