<script setup lang="ts">
  import { computed } from 'vue'
  import { Line } from 'vue-chartjs'

  // Components
  import Checkbox from 'primevue/checkbox'
  import Splitter from 'primevue/splitter'
  import SplitterPanel from 'primevue/splitterpanel'
  import 'chartjs-adapter-date-fns'

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    type ChartData
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  )

  import { useTransformersChart } from '@/composables/useTransformersChart'
  const { transformers, toggleTransformer, isTransformerSelected } =
    useTransformersChart()

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0'
  ]

  const chartData = computed<ChartData<'line'>>(() => ({
    datasets:
      transformers.value
        ?.filter((t) => isTransformerSelected(t.assetId))
        .map((transformer, index) => ({
          label: transformer.name,
          data: transformer.lastTenVoltgageReadings.map((reading) => ({
            x: new Date(reading.timestamp).getTime(),
            y: parseInt(reading.voltage)
          })),
          borderColor: colors[index % colors.length],
          tension: 0.1
        })) || []
  }))

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Voltage'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  }

  function getTransformerColor(assetId: number): string {
    const index = transformers.value.findIndex((t) => t.assetId === assetId)
    return `border-[${colors[index % colors.length]}]`
  }
</script>

<template>
  <Suspense>
    <Splitter style="height: 700px">
      <SplitterPanel
        :size="25"
        :minSize="20"
        class="flex flex-column items-center justify-center p-3">
        <div
          v-for="transformer in transformers"
          :key="transformer.assetId"
          class="flex items-center">
          <Checkbox
            :binary="true"
            :model-value="isTransformerSelected(transformer.assetId)"
            @update:modelValue="() => toggleTransformer(transformer.assetId)"
            :class="getTransformerColor(transformer.assetId)" />
          <label class="ml-2">{{ transformer.name }}</label>
        </div>
      </SplitterPanel>
      <SplitterPanel
        :size="75"
        :minSize="70"
        class="flex items-center justify-center">
        <Line :data="chartData" :options="chartOptions" />
      </SplitterPanel>
    </Splitter>
    <template #fallback> Loading ... </template>
  </Suspense>
</template>
