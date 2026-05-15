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
  <div
    class="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
  >
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
          nl: "* Allergenen omvatten niet de garniuren. Voor m eer gedetailleerde informatie over allergenen, neem contact op met ons personeel.",
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
import { ref, computed } from "vue";
import { useLang } from "../../composables/useLang";
import MenuCard from "../../components/MenuCard.vue";
import MenuModal from "../../components/MenuModal.vue";
import bellegems from "../../data/locations/bellegems.json";
import takeaway from "../../data/locations/takeaway.json";

const { lang, t } = useLang();

const locations = [bellegems, takeaway];
const activeLocation = ref(locations[0].id);
const activeCategory = ref("all");
const selectedItem = ref<Record<string, any> | null>(null);

const currentLocation = computed(
  () => locations.find((l) => l.id === activeLocation.value) ?? locations[0],
);

const locationMenu = computed(() => currentLocation.value.menu);

const availableCategories = computed(
  () => currentLocation.value.categories ?? [],
);

const mainCategories = computed(() =>
  availableCategories.value.filter((c) => !c.sauzen),
);

const visibleMainCategories = computed(() =>
  activeCategory.value === "all"
    ? mainCategories.value
    : mainCategories.value.filter((c) => c.id === activeCategory.value),
);

const showSauzen = computed(
  () => activeCategory.value === "all" || activeCategory.value === "saus",
);

const sauzenItems = computed(() =>
  locationMenu.value.filter((i) => i.category === "saus"),
);

function catItems(catId: string) {
  return locationMenu.value.filter((i) => i.category === catId);
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
