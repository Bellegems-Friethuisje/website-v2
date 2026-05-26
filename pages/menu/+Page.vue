<template>
  <!-- Header -->
  <div class="bg-gradient-to-b from-orange-50 to-white py-16">
    <div class="max-w-5xl mx-auto px-4 lg:px-0 text-center">
      <h1 class="text-5xl font-extrabold text-gray-900 mb-4">
        {{ t({ nl: "Ons menu", fr: "Notre menu" }) }}
      </h1>
      <p class="text-gray-500 text-lg max-w-lg mx-auto">
        {{
          t({
            nl: "Vers bereid, elke dag opnieuw.",
            fr: "Préparé frais, chaque jour.",
          })
        }}
      </p>
    </div>
  </div>

  <!-- Location selector -->
  <div class="bg-white border-b border-gray-100">
    <div class="max-w-5xl mx-auto px-4 lg:px-0 py-4 flex gap-3 flex-wrap">
      <button
        v-for="loc in locations"
        :key="loc.id"
        @click="activeLocation = loc.id"
        :class="[
          'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all',
          activeLocation === loc.id
            ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        <span>📍</span>
        <span>{{ loc.name }}</span>
      </button>
    </div>
  </div>

  <!-- Sticky category filter -->
  <div class="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="flex gap-2 py-3 overflow-x-auto no-scrollbar">
        <button
          @click="activeCategory = 'all'"
          :class="[
            'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0',
            activeCategory === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          🍽️ {{ t({ nl: "Alles", fr: "Tout" }) }}
        </button>
        <button
          v-for="cat in availableCategories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0',
            activeCategory === cat.id
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          <span>{{ cat.emoji }}</span>
          <span>{{ lang === "nl" ? cat.nl : cat.fr }}</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Menu grid -->
  <div class="max-w-5xl mx-auto px-4 lg:px-0 py-10 min-h-[400px]">

    <!-- Search -->
    <div class="relative mb-6">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="t({ nl: 'Zoek in het menu…', fr: 'Rechercher dans le menu…' })"
        class="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
      />
      <button
        v-if="searchQuery"
        @click="searchQuery = ''"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        :aria-label="t({ nl: 'Zoekopdracht wissen', fr: 'Effacer la recherche' })"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Allergen filter -->
    <div class="mb-8">
      <button
        @click="showAllergenFilter = !showAllergenFilter"
        class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <span :class="selectedAllergens.length ? 'text-red-500' : ''">🚫</span>
        <span :class="selectedAllergens.length ? 'text-red-500 font-semibold' : ''">
          {{ t({ nl: "Allergenen uitsluiten", fr: "Exclure des allergènes" }) }}
          <span v-if="selectedAllergens.length">({{ selectedAllergens.length }})</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform" :class="showAllergenFilter ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-if="showAllergenFilter" class="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(info, key) in allergenLegend"
            :key="key"
            @click="toggleAllergen(key)"
            :class="[
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
              selectedAllergens.includes(key)
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500',
            ]"
          >
            {{ info.emoji }} {{ lang === "nl" ? info.nl : info.fr }}
          </button>
          <button
            v-if="selectedAllergens.length"
            @click="selectedAllergens = []"
            class="text-xs text-gray-400 hover:text-gray-600 underline px-2"
          >
            {{ t({ nl: "Wis alles", fr: "Tout effacer" }) }}
          </button>
        </div>
      </div>
    </div>
    <!-- No search results -->
    <div v-if="searchQuery.trim() && !sauzenItems.length && !visibleMainCategories.length" class="text-center py-20">
      <p class="text-4xl mb-4" aria-hidden="true">🔍</p>
      <p class="text-gray-500 font-medium">
        {{ t({ nl: `Geen resultaten voor "${searchQuery}"`, fr: `Aucun résultat pour "${searchQuery}"` }) }}
      </p>
      <button @click="searchQuery = ''" class="mt-4 text-orange-500 font-semibold hover:text-orange-600 text-sm transition-colors">
        {{ t({ nl: 'Zoekopdracht wissen', fr: 'Effacer la recherche' }) }}
      </button>
    </div>

    <!-- Sauzen compact list -->
    <div v-if="showSauzen" class="mb-10">
      <h2
        v-if="activeCategory === 'all'"
        class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"
      >
        🫙 {{ t({ nl: "Sauzen", fr: "Sauces" }) }}
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          v-for="item in sauzenItems"
          :key="item.id"
          class="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
          @click="selectedItem = item"
        >
          <div>
            <p class="font-semibold text-gray-900 text-sm">
              {{ lang === "nl" ? item.nl.name : item.fr.name }}
            </p>
            <p
              v-if="lang === 'nl' ? item.nl.description : item.fr.description"
              class="text-gray-400 text-xs mt-0.5"
            >
              {{ lang === "nl" ? item.nl.description : item.fr.description }}
            </p>
          </div>
          <span class="text-orange-500 font-bold text-sm ml-2 shrink-0"
            >€{{ item.price.toFixed(2) }}</span
          >
        </div>
      </div>
    </div>

    <!-- Photo card categories -->
    <template v-for="cat in visibleMainCategories" :key="cat.id">
      <div class="mb-12">
        <h2
          v-if="activeCategory === 'all'"
          class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4"
        >
          {{ cat.emoji }} {{ lang === "nl" ? cat.nl : cat.fr }}
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <MenuCard
            v-for="item in catItems(cat.id)"
            :key="item.id"
            :image="item.image"
            :emoji="item.emoji"
            :name="lang === 'nl' ? item.nl.name : item.fr.name"
            :description="
              lang === 'nl' ? item.nl.description : item.fr.description
            "
            :price="item.price"
            :category="item.category"
            :popular="item.popular ?? false"
            :sides="item.sides"
            :child-version="item.childVersion ?? false"
            @select="selectedItem = item"
          />
        </div>
      </div>
    </template>
  </div>

  <!-- Allergens note -->
  <div class="max-w-5xl mx-auto px-4 lg:px-0 pb-10">
    <p class="text-gray-400 text-xs border-t border-gray-100 pt-6">
      {{
        t({
          nl: "* Allergenen omvatten niet de garniuren. Voor meer gedetailleerde informatie over allergenen, neem contact op met ons personeel.",
          fr: "* Les allergènes n'incluent pas les garnitures. Pour des informations plus détaillées sur les allergènes, veuillez contacter notre personnel.",
        })
      }}
    </p>
  </div>

  <!-- Item modal -->
  <MenuModal
    :item="selectedItem"
    :location-name="currentLocation.name"
    :menu="locationMenu"
    @close="selectedItem = null"
    @select="selectedItem = $event"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLang } from "../../composables/useLang";
import MenuCard from "../../components/MenuCard.vue";
import MenuModal from "../../components/MenuModal.vue";
import bellegems from "../../data/locations/bellegems.json";
import takeaway from "../../data/locations/takeaway.json";
import allergensData from "../../data/allergens.json";

const { lang, t } = useLang();

const locations = [bellegems, takeaway].filter(l => !l.hidden);
const activeLocation = ref(locations[0].id);
const activeCategory = ref("all");
const selectedItem = ref<Record<string, any> | null>(null);
const showAllergenFilter = ref(false);
const selectedAllergens = ref<string[]>([]);
const searchQuery = ref("");

watch(activeLocation, () => {
  searchQuery.value = "";
  activeCategory.value = "all";
});

const allergenLegend = allergensData._legend as Record<string, { emoji: string; nl: string; fr: string }>;

function toggleAllergen(key: string) {
  const idx = selectedAllergens.value.indexOf(key);
  if (idx >= 0) selectedAllergens.value.splice(idx, 1);
  else selectedAllergens.value.push(key);
}

const currentLocation = computed(
  () => locations.find((l) => l.id === activeLocation.value) ?? locations[0],
);

const locationMenu = computed(() => currentLocation.value.menu);

const filteredMenu = computed(() => {
  if (!selectedAllergens.value.length) return locationMenu.value;
  return locationMenu.value.filter((item) => {
    const itemAllergens: string[] = item.allergens ?? [];
    return !selectedAllergens.value.some((a) => itemAllergens.includes(a));
  });
});

const availableCategories = computed(
  () => currentLocation.value.categories ?? [],
);

const mainCategories = computed(() =>
  availableCategories.value.filter((c) => !c.sauzen),
);

const visibleMainCategories = computed(() => {
  const cats = activeCategory.value === "all"
    ? mainCategories.value
    : mainCategories.value.filter((c) => c.id === activeCategory.value);
  if (!searchQuery.value.trim()) return cats;
  return cats.filter((c) => (catItemsMap.value[c.id]?.length ?? 0) > 0);
});

const showSauzen = computed(
  () => activeCategory.value === "all" || activeCategory.value === "saus",
);

const sauzenItems = computed(() =>
  searchFilteredMenu.value.filter((i) => i.category === "saus"),
);

const searchFilteredMenu = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return filteredMenu.value;
  return filteredMenu.value.filter((item) => {
    const name = (lang.value === "nl" ? item.nl?.name : item.fr?.name) ?? "";
    const desc = (lang.value === "nl" ? item.nl?.description : item.fr?.description) ?? "";
    return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });
});

const catItemsMap = computed(() => {
  const map: Record<string, typeof locationMenu.value> = {};
  for (const item of searchFilteredMenu.value) {
    if (!item.category) continue;
    (map[item.category] ??= []).push(item);
  }
  return map;
});

function catItems(catId: string) {
  return catItemsMap.value[catId] ?? [];
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
