<script setup lang="ts">
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputText from 'primevue/inputtext'
  import Select from 'primevue/select'
  import Tag from 'primevue/tag'

  import { getHealthSeverity } from '@/utils/health'
  import { useTransformersList } from '@/composables/useTransformersList'

  const { transformers, filters, regions, healths, loading } =
    useTransformersList()
</script>

<template>
  <DataTable
    :value="transformers"
    :rows="10"
    :global-filter-fields="['name', 'region', 'health']"
    :loading="loading"
    loading-icon="pi pi-list"
    striped-rows
    scrollable
    class="p-datatable-sm">
    <template #header>
      <div class="flex justify-between items-center gap-2">
        <InputText
          v-model="filters.name"
          size="small"
          clear
          placeholder="Search by name" />
        <Select
          v-model="filters.region"
          :options="regions"
          placeholder="Filter by region"
          reset-filter-on-clear
          show-clear
          size="small" />
        <Select
          v-model="filters.health"
          :options="healths"
          size="small"
          reset-filter-on-clear
          show-clear
          placeholder="Filter by health" />
      </div>
    </template>
    <Column field="name" header="Name"></Column>
    <Column field="region" header="Region"></Column>
    <Column field="health" header="Health">
      <template #body="{ data }">
        <Tag :severity="getHealthSeverity(data.health)" :value="data.health" />
      </template>
    </Column>
    <template #empty> No transformers found. </template>
    <template #loading> Loading transformers data. Please wait... </template>
  </DataTable>
</template>