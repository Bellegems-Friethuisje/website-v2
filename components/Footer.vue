<template>
  <footer class="bg-gray-50 border-t border-gray-100 mt-20">
    <div class="max-w-5xl mx-auto px-4 lg:px-0 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl" aria-hidden="true">🍟</span>
            <h3 class="font-extrabold text-gray-900 text-lg">
              Bellegems Friethuisje
            </h3>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed italic">
            "It's not only the fries that count"
          </p>
          <p class="text-gray-400 text-xs mt-4">
            {{
              t({
                nl: "Bellegem & Kortrijk, West-Vlaanderen",
                fr: "Bellegem & Courtrai, Flandre-Occidentale",
              })
            }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h4
            class="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider"
          >
            {{ t({ nl: "Navigatie", fr: "Navigation" }) }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="text-gray-500 text-sm hover:text-orange-500 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Reservation -->
        <div class="bg-orange-500 rounded-2xl p-6 text-white">
          <h4 class="font-extrabold text-lg mb-2">
            {{ t({ nl: "Reserveren?", fr: "Réserver?" }) }}
          </h4>
          <p class="text-orange-100 text-sm mb-4 leading-relaxed">
            {{
              t({
                nl: "Zin om langs te komen met een grotere groep?",
                fr: "Envie de venir avec un groupe plus grande?",
              })
            }}
          </p>
          <!-- go to reservation page -->
          <a
            href="/reservaties"
            class="inline-block bg-white text-orange-500 font-bold py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors"
            @click="trackEvent('reservation_click', { source: 'footer' })"
          >
            {{ t({ nl: "Reserveer hier", fr: "Réservez ici" }) }}
          </a>
        </div>
      </div>
    </div>

    <div class="bg-orange-500 py-2 text-center">
      <p class="text-white text-xs">© 2026 Bellegems Friethuisje</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLang } from "../composables/useLang";
import { trackEvent } from "../composables/useAnalytics";

const { t } = useLang();

const navLinks = computed(() => [
  { href: "/", label: t({ nl: "Home", fr: "Accueil" }) },
  { href: "/menu", label: t({ nl: "Ons menu", fr: "Notre menu" }) },
  { href: "/locaties", label: t({ nl: "Locaties", fr: "Emplacements" }) },
]);
</script>
