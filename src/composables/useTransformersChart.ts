import { onMounted } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Transformer } from '@/types'
import { useTransformersApi } from '@/composables/useTransformersApi'
import { STORAGE_KEYS } from '@/utils/const'

export function useTransformersChart() {
  const { loading, error, fetchTransformers, transformers } =
    useTransformersApi()

  const selectedTransformers = useStorage<number[]>(
    STORAGE_KEYS.SELECTED_TRANSFORMERS,
    [],
    localStorage,
    {
      serializer: {
        read: (value: string) => {
          try {
            return JSON.parse(value)
          } catch {
            return []
          }
        },
        write: (value: number[]) => JSON.stringify(value)
      }
    }
  )

  // Helper to ensure selectedTransformers is always an array
  const ensureArray = () => {
    if (!Array.isArray(selectedTransformers.value)) {
      selectedTransformers.value = []
    }
  }

  function toggleTransformer(assetId: number) {
    ensureArray()
    const index = selectedTransformers.value.indexOf(assetId)
    if (index > -1) {
      selectedTransformers.value.splice(index, 1)
    } else {
      selectedTransformers.value.push(assetId)
    }
  }

  function isTransformerSelected(assetId: number): boolean {
    ensureArray()
    return selectedTransformers.value.includes(assetId)
  }

  onMounted(() => {
    fetchTransformers()
  })

  return {
    transformers,
    loading,
    error,
    selectedTransformers,
    toggleTransformer,
    isTransformerSelected
  }
}
