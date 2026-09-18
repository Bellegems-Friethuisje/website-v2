<template>
  <Teleport to="body" :disabled="!isMounted">
    <Transition name="backdrop">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-950/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition name="modal" appear>
          <div
            v-if="open"
            class="relative z-10 w-full sm:max-w-lg bg-white sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div>
                <h2 class="text-xl font-extrabold text-gray-900">
                  {{ t({ nl: 'Jouw bestelling', fr: 'Votre commande' }) }}
                </h2>
                <p v-if="locationName" class="text-gray-400 text-xs mt-0.5">
                  📍 {{ locationName }}
                </p>
                <p v-if="shareId" class="text-green-600 text-xs mt-0.5 font-semibold flex items-center gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>
                  {{ t({ nl: 'Gedeeld met familie', fr: 'Partagé avec la famille' }) }}
                </p>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <button
                  @click="openInfo"
                  class="h-11 w-11 -m-2 rounded-full hover:bg-gray-100 active:bg-gray-100 transition-colors text-gray-400 flex items-center justify-center shrink-0"
                  :aria-label="t({ nl: 'Hoe werkt dit?', fr: 'Comment ça marche ?' })"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="9" />
                    <path stroke-linecap="round" d="M12 16v-5" />
                    <path stroke-linecap="round" d="M12 8.25h.01" />
                  </svg>
                </button>
                <button
                  @click="$emit('close')"
                  class="h-11 w-11 -m-2 rounded-full hover:bg-gray-100 active:bg-gray-100 transition-colors text-gray-400 flex items-center justify-center shrink-0"
                  :aria-label="t({ nl: 'Sluiten', fr: 'Fermer' })"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="!items.length" class="p-10 text-center">
              <p class="text-5xl mb-4" aria-hidden="true">🧾</p>
              <p class="text-gray-500 font-medium mb-1">
                {{ t({ nl: 'Je bestelling is nog leeg.', fr: 'Votre commande est encore vide.' }) }}
              </p>
              <p class="text-gray-400 text-sm mb-6">
                {{
                  t({
                    nl: 'Voeg gerechten toe via het menu en lees je bestelling straks voor aan de kassa.',
                    fr: 'Ajoutez des plats depuis le menu et lisez votre commande à la caisse.',
                  })
                }}
              </p>
              <a
                href="/menu"
                @click="trackEvent('preorder_view_menu', { source: 'empty_drawer' }); $emit('close')"
                class="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white font-bold py-3 min-h-11 rounded-xl transition-colors"
              >
                {{ t({ nl: 'Bekijk het menu', fr: 'Voir le menu' }) }}
              </a>
              <button
                @click="handleShare"
                class="w-full mt-3 flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white font-bold py-3 min-h-11 rounded-xl transition-colors text-sm"
              >
                <span aria-hidden="true">👨‍👩‍👧</span>
                {{ t({ nl: 'Bestel samen', fr: 'Commander ensemble' }) }}
              </button>
              <p v-if="shareError" class="text-red-500 text-xs font-semibold mt-2">
                {{ t({ nl: 'Delen lukte niet — probeer het nog eens.', fr: "Le partage a échoué — réessayez." }) }}
              </p>
            </div>

            <template v-else>
              <!-- Items -->
              <div class="overflow-y-auto px-5 divide-y divide-gray-100">
                <div
                  v-for="item in items"
                  :key="item.key"
                  class="flex items-center gap-3 py-3"
                >
                  <div class="h-11 w-11 rounded-lg bg-orange-50 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="lang === 'nl' ? item.name.nl : item.name.fr" class="h-full w-full object-cover" />
                    <span v-else>{{ item.emoji ?? '🍽️' }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-900 text-sm truncate">
                      {{ lang === 'nl' ? item.name.nl : item.name.fr }}
                    </p>
                    <p
                      v-for="option in item.options"
                      :key="option.groupKey"
                      class="text-gray-400 text-xs truncate pl-2"
                    >
                      {{ lang === 'nl' ? option.label.nl : option.label.fr }}
                    </p>
                  </div>
                  <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="text-orange-500 font-bold text-sm">
                      €{{ (item.price * item.qty).toFixed(2) }}
                    </span>
                    <div class="flex items-center gap-1">
                      <button
                        @click="decreaseQty(item)"
                        class="h-8 w-8 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:border-orange-300 hover:text-orange-500 active:bg-orange-50 transition-colors flex items-center justify-center"
                        :aria-label="t({ nl: 'Verminder', fr: 'Diminuer' })"
                      >
                        −
                      </button>
                      <span class="w-5 text-center font-bold text-gray-900 text-sm">{{ item.qty }}</span>
                      <button
                        @click="increaseQty(item)"
                        class="h-8 w-8 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:border-orange-300 hover:text-orange-500 active:bg-orange-50 transition-colors flex items-center justify-center"
                        :aria-label="t({ nl: 'Vermeerder', fr: 'Augmenter' })"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="p-5 pt-4 border-t border-gray-100 shrink-0 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-gray-900">{{ t({ nl: 'Totaal (geschat)', fr: 'Total (estimé)' }) }}</span>
                  <span class="font-extrabold text-orange-500 text-2xl">€{{ total.toFixed(2) }}</span>
                </div>

                <a
                  href="/menu"
                  @click="trackEvent('preorder_view_menu', { source: 'drawer_continue' }); $emit('close')"
                  class="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white font-bold py-3.5 min-h-11 rounded-xl transition-colors text-sm text-center flex items-center justify-center"
                >
                  {{ t({ nl: 'Verder kiezen', fr: 'Continuer' }) }}
                </a>

                <button
                  @click="handleShare"
                  class="w-full flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white font-bold py-3 min-h-11 rounded-xl transition-colors text-sm"
                >
                  <span aria-hidden="true">👨‍👩‍👧</span>
                  {{ t({ nl: 'Bestel samen', fr: 'Commander ensemble' }) }}
                </button>
                <p v-if="shareError" class="text-red-500 text-xs font-semibold text-center">
                  {{ t({ nl: 'Delen lukte niet — probeer het nog eens.', fr: "Le partage a échoué — réessayez." }) }}
                </p>

                <button
                  @click="handleClear"
                  class="w-full text-center text-gray-400 hover:text-gray-600 font-semibold underline underline-offset-2 text-xs"
                >
                  {{ t({ nl: 'Bestelling wissen', fr: 'Effacer la commande' }) }}
                </button>
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>

  <!-- Copied-to-clipboard confirmation -->
  <Teleport to="body" :disabled="!isMounted">
    <Transition name="share-toast">
      <div
        v-if="shareCopied"
        class="fixed left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-sm font-bold pl-3 pr-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 pointer-events-none max-w-[85vw]"
        style="bottom: max(1.5rem, calc(env(safe-area-inset-bottom) + 1.25rem))"
        role="status"
        aria-live="polite"
      >
        <span class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span class="truncate">
          {{ t({ nl: 'Link gekopieerd — stuur hem door naar je familie!', fr: 'Lien copié — envoyez-le à votre famille !' }) }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useLang } from '../composables/useLang'
import { trackEvent } from '../composables/useAnalytics'
import { useOrder, type OrderItem } from '../composables/useOrder'

const { lang, t } = useLang()
const { items, locationName, shareId, introSeen, setQty, removeItem, clearOrder, shareOrder, openIntro } = useOrder()

const shareCopied = ref(false)
const shareError = ref(false)

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && !introSeen.value) {
      openIntro('order_drawer')
    }
  },
)

function openInfo() {
  openIntro('drawer_header')
}

const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

function increaseQty(item: OrderItem) {
  setQty(item.key, item.qty + 1)
  trackEvent('preorder_increase_qty', { item_id: item.id, item_name: item.name.nl, qty: item.qty + 1, is_shared: !!shareId.value })
}

function decreaseQty(item: OrderItem) {
  if (item.qty <= 1) {
    removeItem(item.key)
    trackEvent('preorder_remove_item', { item_id: item.id, item_name: item.name.nl, is_shared: !!shareId.value })
    return
  }
  setQty(item.key, item.qty - 1)
  trackEvent('preorder_decrease_qty', { item_id: item.id, item_name: item.name.nl, qty: item.qty - 1, is_shared: !!shareId.value })
}

async function handleShare() {
  shareError.value = false
  const url = await shareOrder()
  if (!url) {
    shareError.value = true
    trackEvent('preorder_share_failed', { item_count: items.value.length })
    setTimeout(() => (shareError.value = false), 4000)
    return
  }
  trackEvent('preorder_share', { item_count: items.value.length, total: total.value })

  try {
    await navigator.clipboard.writeText(url)
    shareCopied.value = true
    trackEvent('preorder_share_completed', { method: 'clipboard' })
    setTimeout(() => (shareCopied.value = false), 2500)
  } catch {
    shareError.value = true
    setTimeout(() => (shareError.value = false), 4000)
  }
}

function handleClear() {
  const ok = window.confirm(
    t({ nl: 'Weet je zeker dat je je bestelling wilt wissen?', fr: 'Voulez-vous vraiment effacer votre commande ?' }),
  )
  if (ok) {
    trackEvent('preorder_clear', { item_count: items.value.length, total: total.value, is_shared: !!shareId.value })
    clearOrder()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-enter-active {
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
}
.modal-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.modal-enter-from {
  transform: translateY(40px) scale(0.96);
  opacity: 0;
}
.modal-leave-to {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}

@media (max-width: 639px) {
  .modal-enter-from {
    transform: translateY(100%);
  }
  .modal-leave-to {
    transform: translateY(100%);
  }
  .modal-enter-active,
  .modal-leave-active {
    transition:
      transform 0.3s cubic-bezier(0.32, 0.72, 0, 1),
      opacity 0.2s ease;
  }
}

.share-toast-enter-active {
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
}
.share-toast-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.share-toast-enter-from,
.share-toast-leave-to {
  transform: translate(-50%, 10px);
  opacity: 0;
}
</style>
