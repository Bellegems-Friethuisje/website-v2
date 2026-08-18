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
                class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                {{ t({ nl: 'Bekijk het menu', fr: 'Voir le menu' }) }}
              </a>
            </div>

            <template v-else>
              <!-- Items -->
              <div class="overflow-y-auto p-5 space-y-3">
                <div
                  v-for="item in items"
                  :key="item.key"
                  class="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                >
                  <div class="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="lang === 'nl' ? item.name.nl : item.name.fr" class="h-full w-full object-cover" />
                    <span v-else>{{ item.emoji ?? '🍽️' }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-900 text-sm truncate">
                      {{ lang === 'nl' ? item.name.nl : item.name.fr }}
                    </p>
                    <p class="text-orange-500 font-bold text-sm">
                      €{{ (item.price * item.qty).toFixed(2) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <button
                      @click="decreaseQty(item)"
                      class="h-11 w-11 rounded-full bg-white border border-gray-200 text-gray-600 text-lg font-bold hover:border-orange-300 hover:text-orange-500 active:bg-orange-50 transition-colors flex items-center justify-center"
                      :aria-label="t({ nl: 'Verminder', fr: 'Diminuer' })"
                    >
                      −
                    </button>
                    <span class="w-6 text-center font-bold text-gray-900 text-sm">{{ item.qty }}</span>
                    <button
                      @click="increaseQty(item)"
                      class="h-11 w-11 rounded-full bg-white border border-gray-200 text-gray-600 text-lg font-bold hover:border-orange-300 hover:text-orange-500 active:bg-orange-50 transition-colors flex items-center justify-center"
                      :aria-label="t({ nl: 'Vermeerder', fr: 'Augmenter' })"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="p-5 pt-3 border-t border-gray-100 shrink-0 space-y-4">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-900">{{ t({ nl: 'Totaal (geschat)', fr: 'Total (estimé)' }) }}</span>
                    <span class="font-extrabold text-orange-500 text-2xl">€{{ total.toFixed(2) }}</span>
                  </div>
                  <p class="text-gray-400 text-xs mt-1">
                    {{
                      t({
                        nl: 'Richtprijs — prijzen voor ter plaatse en om mee te nemen kunnen verschillen.',
                        fr: 'Prix indicatif — les prix sur place et à emporter peuvent différer.',
                      })
                    }}
                  </p>
                </div>

                <div class="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
                  <span class="text-2xl shrink-0" aria-hidden="true">💬</span>
                  <p class="text-orange-700 text-sm font-semibold leading-snug">
                    {{
                      t({
                        nl: 'Lees deze bestelling gewoon voor aan de kassa.',
                        fr: 'Lisez simplement cette commande à la caisse.',
                      })
                    }}
                  </p>
                </div>

                <button
                  @click="handleShare"
                  class="w-full flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white font-bold py-3 min-h-11 rounded-xl transition-colors text-sm"
                >
                  <span aria-hidden="true">👨‍👩‍👧</span>
                  {{ shareCopied ? t({ nl: 'Link gekopieerd!', fr: 'Lien copié !' }) : t({ nl: 'Deel met familie', fr: 'Partager avec la famille' }) }}
                </button>

                <div class="flex gap-3">
                  <button
                    @click="handleClear"
                    class="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 text-gray-600 font-bold py-3.5 min-h-11 rounded-xl transition-colors text-sm"
                  >
                    {{ t({ nl: 'Bestelling wissen', fr: 'Effacer la commande' }) }}
                  </button>
                  <a
                    href="/menu"
                    @click="trackEvent('preorder_view_menu', { source: 'drawer_continue' }); $emit('close')"
                    class="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white font-bold py-3.5 min-h-11 rounded-xl transition-colors text-sm text-center flex items-center justify-center"
                  >
                    {{ t({ nl: 'Verder kiezen', fr: 'Continuer' }) }}
                  </a>
                </div>
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useLang } from '../composables/useLang'
import { trackEvent } from '../composables/useAnalytics'
import { useOrder, type OrderItem } from '../composables/useOrder'

const { lang, t } = useLang()
const { items, locationName, shareId, setQty, removeItem, clearOrder, shareOrder } = useOrder()

const shareCopied = ref(false)

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

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
  const url = await shareOrder()
  if (!url) return
  trackEvent('preorder_share', { item_count: items.value.length, total: total.value })

  if (navigator.share) {
    try {
      await navigator.share({ title: t({ nl: 'Onze bestelling', fr: 'Notre commande' }), url })
      trackEvent('preorder_share_completed', { method: 'native' })
    } catch {
      // user cancelled the native share sheet — nothing to do
    }
    return
  }
  try {
    await navigator.clipboard.writeText(url)
    shareCopied.value = true
    trackEvent('preorder_share_completed', { method: 'clipboard' })
    setTimeout(() => (shareCopied.value = false), 2500)
  } catch {}
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
</style>
