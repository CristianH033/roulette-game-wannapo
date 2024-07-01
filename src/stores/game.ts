import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface RoulletteSegment {
  id: number
  name: string
  value: number | null
}

export const useGameStore = defineStore('game', () => {
  const segments = ref([
    { id: 1, name: 'Para la próxima', value: null },
    { id: 2, name: 'Oxido de zinc', value: 1 },
    { id: 3, name: 'Con caléndula', value: 2 },
    { id: 4, name: 'Intentalo de nuevo', value: null },
    { id: 5, name: 'Capa transparente', value: 3 },
    { id: 6, name: 'Con nistatina', value: 4 },
    { id: 7, name: 'Intentalo de nuevo', value: null },
    { id: 8, name: 'Capa Ligera', value: 5 }
  ])

  return {
    segments: computed(() => segments.value)
  }
})
