<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'
  import { PrimeIcons } from '@primevue/core/api'

  import Tabs from 'primevue/tabs'
  import TabList from 'primevue/tablist'
  import Tab from 'primevue/tab'
  import TabPanels from 'primevue/tabpanels'
  import TabPanel from 'primevue/tabpanel'

  import TransformerTable from './components/TransformersTable.vue'
  import DarkModeSwitcher from './components/DarkModeSwitcher.vue'
  const VoltageChart = defineAsyncComponent(
    () => import('./components/TransformersChart.vue')
  )

  const tabs = [
    {
      title: 'Table View',
      component: TransformerTable,
      value: '0',
      icon: PrimeIcons.LIST
    },
    {
      title: 'Chart View',
      component: VoltageChart,
      value: '1',
      icon: PrimeIcons.CHART_LINE
    }
  ]
</script>

<template>
  <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex justify-content-between align-items-center">
        <h2 class="text-3xl font-bold text-gray-500">Transformers</h2>
        <DarkModeSwitcher />
      </div>
      <Tabs value="0" lazy>
        <TabList>
          <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">
            <div class="flex items-center gap-2 text-inherit">
              <i :class="tab.icon" />
              <span>{{ tab.title }}</span>
            </div>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
            <transition name="fade-slide" mode="out-in">
              <component :is="tab.component" :key="tab.value" />
            </transition>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>
<style scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.3s ease;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }

  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
</style>