<template>
  <Transition name="bubble">
    <div
      v-if="visible"
      class="fixed left-1/2 -translate-x-1/2 z-40 max-w-[92vw]"
      style="bottom: max(1rem, env(safe-area-inset-bottom) + 0.75rem)"
    >
      <div class="flex items-center gap-2 bg-gray-900 shadow-xl shadow-gray-900/30 rounded-full pl-4 pr-2 py-2">
        <a
          href="/menu"
          class="flex items-center gap-2 text-sm font-bold text-white hover:text-orange-400 transition-colors whitespace-nowrap"
          @click="trackEvent('preorder_click', { source: 'homepage_bubble' })"
        >
          <span aria-hidden="true">📝</span>
          <span>{{ t({ nl: "Bestel vooraf, lees voor aan de kassa", fr: "Commandez à l'avance, lisez à la caisse" }) }}</span>
        </a>
        <button
          @click="dismiss"
          class="h-8 w-8 shrink-0 rounded-full hover:bg-white/10 active:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          :aria-label="t({ nl: 'Sluiten', fr: 'Fermer' })"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useLang } from "../composables/useLang";
import { trackEvent } from "../composables/useAnalytics";
import { useOrder } from "../composables/useOrder";

const { t } = useLang();
const { items, load } = useOrder();

const STORAGE_KEY = "bf-preorder-bubble-dismissed";
const dismissed = ref(true);

onMounted(() => {
  load();
  dismissed.value = localStorage.getItem(STORAGE_KEY) === "1";
});

const hasOrder = computed(() => items.value.some((i) => i.qty > 0));
const visible = computed(() => !dismissed.value && !hasOrder.value);

function dismiss() {
  dismissed.value = true;
  trackEvent("preorder_bubble_dismiss");
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}
</script>

<style scoped>
.bubble-enter-active,
.bubble-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.bubble-enter-from,
.bubble-leave-to {
  transform: translate(-50%, 16px);
  opacity: 0;
}
</style>
