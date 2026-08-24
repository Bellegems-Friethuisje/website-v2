<template>
  <!-- Header -->
  <div class="bg-gradient-to-b from-orange-50 to-white py-16">
    <div class="max-w-5xl mx-auto px-4 lg:px-0 text-center">
      <h1 class="text-5xl font-extrabold text-gray-900 mb-4">
        {{ t({ nl: "Ons menu", fr: "Notre menu" }) }}
      </h1>
      <p class="text-gray-500 text-lg max-w-lg mx-auto mb-6">
        {{
          t({
            nl: "Vers bereid, elke dag opnieuw.",
            fr: "Préparé frais, chaque jour.",
          })
        }}
      </p>
      <button
        @click="handleStartOrder"
        class="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 active:bg-gray-800 text-white font-bold px-6 py-3 min-h-11 rounded-xl transition-colors"
      >
        <span aria-hidden="true">🧾</span>
        {{
          orderCount > 0
            ? t({ nl: `Bekijk bestelling (${orderCount})`, fr: `Voir ma commande (${orderCount})` })
            : t({ nl: "Start bestelling", fr: "Commencer ma commande" })
        }}
      </button>
      <p class="text-gray-400 text-xs mt-3">
        {{
          t({
            nl: "Voeg gerechten toe en lees ze voor aan de kassa — deel de link en bestel samen met je familie.",
            fr: "Ajoutez des plats et lisez-les à la caisse — partagez le lien et commandez ensemble en famille.",
          })
        }}
        <button
          @click="openInfo"
          class="text-orange-500 hover:text-orange-600 font-bold underline underline-offset-2 ml-1"
        >
          {{ t({ nl: 'Hoe werkt dit?', fr: 'Comment ça marche ?' }) }}
        </button>
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
    <div class="max-w-5xl mx-auto px-4 lg:px-0 relative">
      <!-- Left arrow -->
      <button
        v-if="canScrollLeft"
        @click="scrollCategories(-1)"
        class="hidden sm:flex absolute left-0 top-0 bottom-0 z-10 items-center px-1.5 bg-gradient-to-r from-white via-white to-transparent"
        :aria-label="t({ nl: 'Scroll naar links', fr: 'Défiler vers la gauche' })"
      >
        <span class="h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
      </button>

      <!-- Right arrow -->
      <button
        v-if="canScrollRight"
        @click="scrollCategories(1)"
        class="hidden sm:flex absolute right-0 top-0 bottom-0 z-10 items-center px-1.5 bg-gradient-to-l from-white via-white to-transparent"
        :aria-label="t({ nl: 'Scroll naar rechts', fr: 'Défiler vers la droite' })"
      >
        <span class="h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </button>

      <div ref="categoryScroller" class="flex gap-2 py-3 overflow-x-auto category-scroll" @scroll="updateScrollState">
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

      <!-- Mobile scroll arrows -->
      <div v-if="canScrollLeft || canScrollRight" class="flex sm:hidden justify-between pb-2">
        <button
          @click="scrollCategories(-1)"
          :disabled="!canScrollLeft"
          class="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 transition-colors disabled:opacity-30"
          :aria-label="t({ nl: 'Scroll naar links', fr: 'Défiler vers la gauche' })"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          @click="scrollCategories(1)"
          :disabled="!canScrollRight"
          class="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 transition-colors disabled:opacity-30"
          :aria-label="t({ nl: 'Scroll naar rechts', fr: 'Défiler vers la droite' })"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
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
          <div class="flex items-center gap-2 ml-2 shrink-0">
            <span class="text-orange-500 font-bold text-sm"
              >€{{ item.price.toFixed(2) }}</span
            >
            <button
              @click.stop="addToOrder(item, 'sauce_list')"
              class="h-11 w-11 rounded-full bg-orange-50 hover:bg-orange-500 active:bg-orange-500 text-orange-500 hover:text-white active:text-white font-extrabold text-lg transition-colors flex items-center justify-center shrink-0"
              :aria-label="t({ nl: 'Toevoegen aan bestelling', fr: 'Ajouter à la commande' })"
            >
              +
            </button>
          </div>
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
            @add="addToOrder(item, 'card')"
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
    @add="addToOrder($event, 'modal')"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useLang } from "../../composables/useLang";
import { trackEvent } from "../../composables/useAnalytics";
import { useOrder } from "../../composables/useOrder";
import MenuCard from "../../components/MenuCard.vue";
import MenuModal from "../../components/MenuModal.vue";
import bellegems from "../../data/locations/bellegems.json";
import takeaway from "../../data/locations/takeaway.json";
import allergensData from "../../data/allergens.json";

const { lang, t } = useLang();
const { items: orderItems, shareId, addItem, openDrawer, openIntro } = useOrder();

const orderCount = computed(() => orderItems.value.reduce((sum, i) => sum + i.qty, 0));

function handleStartOrder() {
  trackEvent("preorder_click", { source: "menu_header" });
  openDrawer();
}

function openInfo() {
  openIntro("menu_header");
}

const menuStates = ref<Record<string, { prices: Record<string, number>, hidden: number[], custom: any[], customCategories: any[] }>>({});

onMounted(async () => {
  await Promise.all(locations.map(async (loc) => {
    try {
      const res = await fetch(`/api/menu-prices?location=${loc.id}`);
      if (res.ok) menuStates.value[loc.id] = await res.json();
    } catch {}
  }));
});

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

const categoryScroller = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

function updateScrollState() {
  const el = categoryScroller.value;
  if (!el) return;
  canScrollLeft.value = el.scrollLeft > 4;
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
}

function scrollCategories(direction: 1 | -1) {
  const el = categoryScroller.value;
  if (!el) return;
  el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
}

onMounted(() => {
  updateScrollState();
  window.addEventListener("resize", updateScrollState);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScrollState);
});

const currentLocation = computed(
  () => locations.find((l) => l.id === activeLocation.value) ?? locations[0],
);

function addToOrder(item: Record<string, any>, source: string = "card") {
  addItem(
    {
      key: `${currentLocation.value.id}-${item.id}`,
      id: item.id,
      name: { nl: item.nl.name, fr: item.fr.name },
      price: item.price,
      image: item.image,
      emoji: item.emoji,
      category: item.category,
    },
    currentLocation.value.id,
    currentLocation.value.name,
  );
  trackEvent("add_to_preorder", {
    item_id: item.id,
    item_name: item.nl.name,
    item_category: item.category,
    price: item.price,
    location: currentLocation.value.id,
    source,
    is_shared: !!shareId.value,
  });
}

const locationMenu = computed(() => {
  const loc = currentLocation.value;
  const state = menuStates.value[loc.id] || { prices: {}, hidden: [], custom: [], customCategories: [] };
  const base = loc.menu
    .filter((item: any) => item.id && !state.hidden.includes(item.id))
    .map((item: any) => ({ ...item, price: state.prices[String(item.id)] ?? item.price }));
  return [...base, ...(state.custom || [])];
});

const filteredMenu = computed(() => {
  if (!selectedAllergens.value.length) return locationMenu.value;
  return locationMenu.value.filter((item) => {
    const itemAllergens: string[] = item.allergens ?? [];
    return !selectedAllergens.value.some((a) => itemAllergens.includes(a));
  });
});

const availableCategories = computed(() => {
  const loc = currentLocation.value;
  const state = menuStates.value[loc.id] || {};
  const base = loc.categories ?? [];
  const custom = (state.customCategories || []).map((c: any) => ({ ...c, sauzen: false }));
  return [...base, ...custom];
});

watch([availableCategories, activeLocation], () => {
  nextTick(updateScrollState);
});

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
.category-scroll::-webkit-scrollbar {
  display: none;
}
.category-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
