<script setup lang="ts">
  import ToggleSwitch from 'primevue/toggleswitch'
  import { useDark } from '@vueuse/core'
  const isDark = useDark()
</script>

<template>
  <ToggleSwitch v-model="isDark">
    <template #handle="{ checked }">
      <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
</template>