<template>
  <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-[box-shadow,transform] duration-300 hover:-translate-y-1 group cursor-pointer" @click="$emit('select')"
    style="will-change: transform"
  >
    <!-- Real photo or emoji fallback -->
    <div class="relative h-44 overflow-hidden bg-gray-100">
      <img
        v-if="image"
        :src="image"
        :alt="name"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-5xl"
        :style="{ backgroundColor: fallbackColor }"
      >{{ emoji }}</div>

      <span
        v-if="popular"
        class="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow"
      >
        {{ popularLabel }}
      </span>
    </div>

    <div class="p-4">
      <h3 class="font-bold text-gray-900 text-base leading-snug mb-1">{{ name }}</h3>
      <p v-if="description" class="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">{{ description }}</p>
      <span class="text-orange-500 font-extrabold text-lg">€{{ price.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../composables/useLang'

const { t } = useLang()

defineEmits<{ select: [] }>()

const props = defineProps<{
  name: string
  description: string
  price: number
  category: string
  image?: string
  emoji?: string
  popular?: boolean
}>()

const popularLabel = computed(() => t({ nl: 'Populair', fr: 'Populaire' }))

const fallbackColor = computed(() => {
  const colors: Record<string, string> = {
    friet: '#fff7ed', snack: '#fefce8', kroket: '#fdf4ff',
    saus: '#f0fdf4', drank: '#eff6ff', maaltijd: '#fef2f2',
    scampi: '#eff6ff', salade: '#f0fdf4',
  }
  return colors[props.category] ?? '#f9fafb'
})
</script>
