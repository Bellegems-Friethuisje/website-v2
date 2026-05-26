<template>
  <!-- Header -->
  <section class="relative h-56 overflow-hidden">
    <img
      src="https://strapi.bellegemsfriethuisje.be/uploads/20230520_DSC_07914_921e483a24.jpg"
      alt="Locaties"
      class="w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gray-950/65 flex items-center">
      <div class="max-w-5xl mx-auto px-4 lg:px-0 w-full">
        <p
          class="text-orange-400 text-sm font-bold tracking-widest uppercase mb-2"
        >
          📍
        </p>
        <h1 class="text-5xl font-extrabold text-white">
          {{ t({ nl: "Onze locaties", fr: "Nos emplacements" }) }}
        </h1>
      </div>
    </div>
  </section>

  <!-- Location cards -->
  <div class="max-w-5xl mx-auto px-4 lg:px-0 py-14">
    <div class="grid md:grid-cols-2 gap-8">
      <div
        v-for="loc in locations"
        :key="loc.id"
        class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
      >
        <div
          class="h-40 bg-gradient-to-br from-orange-50 to-orange-100 relative flex items-center justify-center"
        >
          <div class="text-center">
            <p class="text-4xl mb-1" aria-hidden="true">📍</p>
            <p class="text-orange-600 font-bold text-sm">{{ loc.name }}</p>
            <p class="text-orange-400 text-xs">{{ loc.address }}</p>
          </div>
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-xl font-extrabold text-gray-900">
              {{ loc.name }}
            </h2>
            <OpenBadge :open="isOpenMap[loc.id]" />
          </div>

          <!-- Address -->
          <div class="flex gap-3 mb-4">
            <span class="text-orange-500 shrink-0 mt-0.5" aria-hidden="true">📍</span>
            <div>
              <p
                class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5"
              >
                {{ t({ nl: "Adres", fr: "Adresse" }) }}
              </p>
              <p class="text-gray-700 text-sm font-medium">{{ loc.address }}</p>
            </div>
          </div>

          <!-- Hours -->
          <div class="flex gap-3 mb-4">
            <span class="text-orange-500 shrink-0 mt-0.5" aria-hidden="true">🕐</span>
            <div class="flex-1">
              <p
                class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2"
              >
                {{ t({ nl: "Openingsuren", fr: "Heures d'ouverture" }) }}
              </p>
              <div class="space-y-1.5">
                <div
                  v-for="h in loc.hours"
                  :key="h.nl"
                  class="flex justify-between gap-4 text-sm"
                >
                  <span class="text-gray-500">{{
                    lang === "nl" ? h.nl : h.fr
                  }}</span>
                  <span
                    :class="
                      h.closed
                        ? 'text-red-400 font-medium'
                        : 'text-gray-800 font-semibold'
                    "
                  >
                    {{ h.closed ? t({ nl: "Gesloten", fr: "Fermé" }) : h.time }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex gap-3 mb-6">
            <span class="text-orange-500 shrink-0 mt-0.5" aria-hidden="true">📞</span>
            <div>
              <p
                class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5"
              >
                {{ t({ nl: "Telefoon", fr: "Téléphone" }) }}
              </p>
              <a
                :href="`tel:${loc.phone}`"
                class="text-orange-500 hover:text-orange-600 font-bold text-sm transition-colors"
              >
                {{ loc.phoneDisplay }}
              </a>
            </div>
          </div>

          <a
            :href="
              loc.mapsUrl ||
              `https://maps.google.com/?q=${encodeURIComponent(loc.address)}`
            "
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-semibold py-3 rounded-xl transition-all text-sm"
          >
            {{
              t({ nl: "Open in Google Maps", fr: "Ouvrir dans Google Maps" })
            }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Reservation -->
  <section class="bg-gray-50 py-16">
    <div
      class="max-w-5xl mx-auto px-4 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-3">
          {{ t({ nl: "Een grote groep?", fr: "Un grand groupe?" }) }}
        </h2>
        <p class="text-gray-500 max-w-sm">
          {{
            t({
              nl: "Kom je met 10 of meer personen? Reserveer dan een tafeltje via onze website. Wij zorgen voor de rest.",
              fr: "Vous venez à 10 personnes ou plus? Réservez une table via notre site web. Nous nous occupons du reste.",
            })
          }}
        </p>
      </div>
      <a
        href="/reservaties"
        class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
        @click="trackEvent('reservation_click', { source: 'locaties_cta' })"
      >
        {{ t({ nl: "Reserveer nu!", fr: "Réservez maintenant!" }) }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLang } from "../../composables/useLang";
import { trackEvent } from "../../composables/useAnalytics";
import { getIsOpen } from "../../composables/useIsOpen";
import OpenBadge from "../../components/OpenBadge.vue";
import bellegems from "../../data/locations/bellegems.json";
import takeaway from "../../data/locations/takeaway.json";

const { lang, t } = useLang();
const locations = [bellegems, takeaway];

const isOpenMap = computed(() => {
  const result: Record<string, boolean> = {}
  for (const loc of locations) result[loc.id] = getIsOpen(loc.hours)
  return result
});
</script>
