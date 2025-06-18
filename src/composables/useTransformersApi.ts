import { ref } from 'vue'
import httpService from '@/services/httpService'

import type { Transformer } from '@/types'

export function useTransformersApi() {
  const transformers = ref<Transformer[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchTransformers = async (params?: URLSearchParams) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await httpService.get<Transformer[]>('/transformers', {
        params
      })
      transformers.value = data
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return {
    transformers,
    loading,
    error,
    fetchTransformers
  }
}