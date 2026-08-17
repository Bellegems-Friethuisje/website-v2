<template>
  <Transition name="order-bar">
    <button
      v-if="totalCount > 0"
      @click="handleOpen"
      class="fixed right-4 sm:right-6 z-40 bg-gray-900 hover:bg-gray-800 active:bg-gray-800 text-white font-bold pl-4 pr-5 py-3.5 min-h-12 rounded-full shadow-2xl shadow-gray-900/30 transition-colors flex items-center gap-3"
      style="bottom: max(1rem, env(safe-area-inset-bottom) + 0.75rem)"
    >
      <span class="relative">
        <span class="text-xl" aria-hidden="true">🧾</span>
        <span class="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-extrabold rounded-full h-5 w-5 flex items-center justify-center">
          {{ totalCount }}
        </span>
      </span>
      <span class="text-sm">
        {{ t({ nl: 'Mijn bestelling', fr: 'Ma commande' }) }} · ~€{{ total.toFixed(2) }}
      </span>
    </button>
  </Transition>

  <OrderDrawer :open="drawerOpen" @close="closeDrawer" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLang } from '../composables/useLang'
import { trackEvent } from '../composables/useAnalytics'
import { useOrder } from '../composables/useOrder'
import OrderDrawer from './OrderDrawer.vue'

const { t } = useLang()
const { items, load, drawerOpen, openDrawer, closeDrawer } = useOrder()

onMounted(() => {
  load()
})

const totalCount = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

function handleOpen() {
  trackEvent('view_preorder', { item_count: totalCount.value, total: total.value })
  openDrawer()
}
</script>

<style scoped>
.order-bar-enter-active,
.order-bar-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.order-bar-enter-from,
.order-bar-leave-to {
  transform: translateY(16px) scale(0.95);
  opacity: 0;
}
</style>
