import { ref, computed, watch, onMounted } from 'vue'
import { useDebounceFn, useStorage } from '@vueuse/core'
import { STORAGE_KEYS } from '@/utils/const'
import { useTransformersApi } from '@/composables/useTransformersApi'

import type { Transformer, TransformerFilters } from '@/types'

const defaultFilters: TransformerFilters = {
  name: '',
  region: '',
  health: ''
}

export function useTransformersList() {
  const { loading, error, fetchTransformers, transformers } =
    useTransformersApi()

  const filters = useStorage<TransformerFilters>(
    STORAGE_KEYS.APPLIED_FILTERS,
    defaultFilters,
    localStorage
  )

  // Build query params from filters
  const buildQueryParams = (filters: TransformerFilters) => {
    const params = new URLSearchParams()

    if (filters.name) params.append('name_like', filters.name)
    if (filters.region) params.append('region', filters.region)
    if (filters.health) params.append('health', filters.health)

    return params
  }

  // Fetch with current filters
  const fetchWithFilters = () => {
    fetchTransformers(buildQueryParams(filters.value))
  }

  // Debounced fetch for name changes
  const debouncedFetch = useDebounceFn(fetchWithFilters, 800)

  // Watch filters
  // Watch name with debounce to avoid unnecessary API calls
  watch(
    () => filters.value.name,
    (newName) => {
      if (newName.length === 0 || newName.length >= 2) {
        debouncedFetch()
      }
    }
  )

  // Watch region and health as soon as they change
  watch(() => [filters.value.region, filters.value.health], fetchWithFilters)

  // Computed filter options for regions and healths
  const regions = computed(() => [
    ...new Set(transformers.value.map((t) => t.region))
  ])

  const healths = computed(() => [
    ...new Set(transformers.value.map((t) => t.health))
  ])

  onMounted(fetchWithFilters)

  return {
    transformers,
    loading,
    error,
    filters,
    regions,
    healths
  }
}
