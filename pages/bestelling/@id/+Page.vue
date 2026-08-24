<template>
  <section class="max-w-md mx-auto px-4 pt-20 pb-24 text-center">
    <template v-if="status === 'loading'">
      <p class="text-5xl mb-4" aria-hidden="true">⏳</p>
      <p class="text-gray-500 font-medium">
        {{ t({ nl: 'Bestelling laden…', fr: 'Chargement de la commande…' }) }}
      </p>
    </template>

    <template v-else-if="status === 'not_found'">
      <p class="text-5xl mb-4" aria-hidden="true">😕</p>
      <h1 class="text-xl font-extrabold text-gray-900 mb-2">
        {{ t({ nl: 'Deze bestelling bestaat niet meer', fr: "Cette commande n'existe plus" }) }}
      </h1>
      <p class="text-gray-400 text-sm mb-6">
        {{
          t({
            nl: 'De link is verlopen of ongeldig. Start gerust een nieuwe bestelling.',
            fr: "Le lien a expiré ou est invalide. N'hésitez pas à démarrer une nouvelle commande.",
          })
        }}
      </p>
      <a
        href="/menu"
        class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
      >
        {{ t({ nl: 'Bekijk het menu', fr: 'Voir le menu' }) }}
      </a>
    </template>

    <template v-else>
      <p class="text-5xl mb-4" aria-hidden="true">🎉</p>
      <h1 class="text-xl font-extrabold text-gray-900 mb-2">
        {{ t({ nl: 'Je bent toegevoegd aan de gedeelde bestelling', fr: 'Vous avez rejoint la commande partagée' }) }}
      </h1>
      <p class="text-gray-400 text-sm mb-6">
        {{
          t({
            nl: 'Alles wat je nu toevoegt via het menu, ziet de rest van de familie meteen verschijnen.',
            fr: "Tout ce que vous ajoutez via le menu apparaît immédiatement pour le reste de la famille.",
          })
        }}
      </p>

      <div class="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3 mb-6 text-left">
        <span class="text-2xl shrink-0" aria-hidden="true">📝</span>
        <p class="text-orange-700 text-sm font-semibold leading-snug">
          {{
            t({
              nl: 'Geen zorgen — dit is enkel een gedeeld lijstje. Er wordt niets besteld of betaald. Lees het gewoon voor aan de kassa wanneer jullie er zijn.',
              fr: "Pas d'inquiétude — ceci est juste une liste partagée. Rien n'est commandé ou payé. Lisez-la simplement à la caisse une fois sur place.",
            })
          }}
        </p>
      </div>

      <div class="flex flex-col items-center gap-3">
        <a
          href="/menu"
          class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          {{ t({ nl: 'Voeg gerechten toe', fr: 'Ajouter des plats' }) }}
        </a>
        <button
          @click="openInfo"
          class="text-gray-400 hover:text-gray-600 text-sm font-semibold underline underline-offset-2"
        >
          {{ t({ nl: 'Hoe werkt dit precies?', fr: 'Comment ça marche exactement ?' }) }}
        </button>
      </div>
    </template>
  </section>

  <PreorderInfoModal :open="showInfo" source="join_page" @close="showInfo = false" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePageContext } from 'vike-vue/usePageContext'
import { useLang } from '../../../composables/useLang'
import { useOrder } from '../../../composables/useOrder'
import { trackEvent } from '../../../composables/useAnalytics'
import PreorderInfoModal from '../../../components/PreorderInfoModal.vue'

const { t } = useLang()
const pageContext = usePageContext()
const { load, joinShared, markIntroSeen } = useOrder()

const status = ref<'loading' | 'joined' | 'not_found'>('loading')
const showInfo = ref(false)

function openInfo() {
  trackEvent('preorder_info_open', { source: 'join_page' })
  showInfo.value = true
}

onMounted(async () => {
  load()
  const id = pageContext.routeParams.id as string
  const ok = await joinShared(id)
  status.value = ok ? 'joined' : 'not_found'
  trackEvent('preorder_share_join', { share_id: id, success: ok })
  // whoever opens a shared link already gets the on-page explainer box above,
  // so don't also pop the auto-intro modal the next time they open the drawer
  if (ok) markIntroSeen()
})
</script>
