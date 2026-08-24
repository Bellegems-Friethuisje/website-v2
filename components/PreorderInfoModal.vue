<template>
  <Teleport to="body" :disabled="!isMounted">
    <Transition name="info-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-950/60 backdrop-blur-sm"
        @click.self="close"
      >
        <Transition name="info-modal" appear>
          <div
            v-if="open"
            class="relative w-full sm:max-w-sm bg-white sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          >
            <div class="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <h2 class="text-lg font-extrabold text-gray-900">
                {{ t({ nl: "Hoe werkt 'bestelling'?", fr: "Comment fonctionne la commande ?" }) }}
              </h2>
              <button
                @click="close"
                class="h-11 w-11 -m-2 rounded-full hover:bg-gray-100 active:bg-gray-100 transition-colors text-gray-400 flex items-center justify-center shrink-0"
                :aria-label="t({ nl: 'Sluiten', fr: 'Fermer' })"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="overflow-y-auto p-5 space-y-4">
              <div
                v-for="point in points"
                :key="point.emoji"
                class="flex items-start gap-3"
              >
                <span class="text-2xl shrink-0" aria-hidden="true">{{ point.emoji }}</span>
                <p class="text-gray-600 text-sm leading-relaxed">{{ point.text }}</p>
              </div>
            </div>

            <div class="p-5 pt-3 border-t border-gray-100 shrink-0">
              <button
                @click="close"
                class="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white font-bold py-3 min-h-11 rounded-xl transition-colors text-sm"
              >
                {{ t({ nl: 'Begrepen', fr: "Compris" }) }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useLang } from '../composables/useLang'
import { trackEvent } from '../composables/useAnalytics'

const { t } = useLang()

const props = defineProps<{ open: boolean; source?: string }>()
const emit = defineEmits<{ close: [] }>()

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

function close() {
  trackEvent('preorder_info_dismiss', { source: props.source ?? 'unknown' })
  emit('close')
}

const points = computed(() => [
  {
    emoji: '📝',
    text: t({
      nl: 'Dit is een persoonlijk lijstje — geen betaling, geen automatische melding aan de zaak.',
      fr: "C'est une liste personnelle — pas de paiement, pas de notification automatique au commerce.",
    }),
  },
  {
    emoji: '🗣️',
    text: t({
      nl: 'Lees je bestelling gewoon voor aan de kassa wanneer je er bent.',
      fr: 'Lisez simplement votre commande à la caisse.',
    }),
  },
  {
    emoji: '👨‍👩‍👧',
    text: t({
      nl: "Tik op 'Deel met familie' om samen één lijstje te vullen — wat iedereen toevoegt verschijnt meteen bij de rest.",
      fr: "Appuyez sur « Partager avec la famille » pour remplir une liste ensemble — ce que chacun ajoute apparaît immédiatement chez les autres.",
    }),
  },
  {
    emoji: '💶',
    text: t({
      nl: 'Prijzen zijn richtprijzen en kunnen verschillen tussen ter plaatse eten en afhalen.',
      fr: 'Les prix sont indicatifs et peuvent différer entre manger sur place et à emporter.',
    }),
  },
])
</script>

<style scoped>
.info-backdrop-enter-active,
.info-backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.info-backdrop-enter-from,
.info-backdrop-leave-to {
  opacity: 0;
}

.info-modal-enter-active {
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
}
.info-modal-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.info-modal-enter-from,
.info-modal-leave-to {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}
</style>
