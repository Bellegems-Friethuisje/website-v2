<template>
  <Transition name="added-toast">
    <div
      v-if="visible"
      class="fixed left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white text-sm font-bold pl-3 pr-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 pointer-events-none max-w-[85vw]"
      style="bottom: max(6.5rem, calc(env(safe-area-inset-bottom) + 6.25rem))"
      role="status"
      aria-live="polite"
    >
      <span class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span class="truncate">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLang } from '../composables/useLang'
import { useOrder } from '../composables/useOrder'

const { lang, t } = useLang()
const { lastAdded } = useOrder()

const visible = ref(false)
const message = ref('')
let hideTimer: ReturnType<typeof setTimeout> | null = null

watch(lastAdded, (val) => {
  if (!val) return
  const name = lang.value === 'nl' ? val.name.nl : val.name.fr
  message.value = `${name} ${t({ nl: 'toegevoegd', fr: 'ajouté' })}`
  visible.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    visible.value = false
  }, 2000)
})
</script>

<style scoped>
.added-toast-enter-active {
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
}
.added-toast-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.added-toast-enter-from,
.added-toast-leave-to {
  transform: translate(-50%, 10px);
  opacity: 0;
}
</style>
