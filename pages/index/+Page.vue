<template>
  <!-- Hero -->
  <section class="relative overflow-hidden h-[90vh] min-h-[560px] max-h-[780px]">
    <div class="absolute inset-0">
      <img
        src="https://strapi.bellegemsfriethuisje.be/uploads/20220417_104452_dea8c2695a.jpg"
        alt="Bellegems Friethuisje"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
    </div>

    <div class="absolute bottom-0 left-0 right-0 z-10 max-w-5xl mx-auto px-4 lg:px-0 pb-12">
      <p class="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">
        📍 Bellegem · Kortrijk
      </p>
      <h1 class="text-5xl lg:text-7xl font-extrabold text-white leading-none mb-5 tracking-tight">
        {{ t({ nl: 'Meer dan een\nfrituur alleen.', fr: "Plus qu'une\nsimple friterie." }) }}
      </h1>
      <p class="text-gray-400 text-xl mb-8 max-w-md">
        {{ t({
          nl: 'Kwaliteitskeuken, verse kroketten en goudgele frietjes — elke dag met passie bereid.',
          fr: 'Cuisine de qualité, croquettes fraîches et frites dorées — préparées avec passion chaque jour.'
        }) }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a href="/menu" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors text-lg">
          {{ t({ nl: 'Bekijk ons menu', fr: 'Voir notre menu' }) }}
        </a>
        <a href="/locaties" class="border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-lg backdrop-blur-sm">
          {{ t({ nl: 'Locaties', fr: 'Emplacements' }) }}
        </a>
      </div>
    </div>
  </section>

  <!-- Festive banner -->
  <FestiveBanner />

  <!-- About -->
  <section class="max-w-5xl mx-auto px-4 lg:px-0 py-20">
    <div class="grid lg:grid-cols-5 gap-12 items-center">
      <div class="lg:col-span-3">
        <span class="inline-block text-orange-500 text-sm font-bold tracking-widest uppercase mb-5">
          {{ t({ nl: 'Ons verhaal', fr: 'Notre histoire' }) }}
        </span>
        <h2 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {{ t({
            nl: 'Welkom bij Bellegems Friethuisje',
            fr: 'Bienvenue au Bellegems Friethuisje'
          }) }}
        </h2>
        <div class="space-y-4 text-gray-500 leading-relaxed text-lg">
          <p>{{ t({
            nl: 'Bij ons bent u niet gewoon bij een frituur. Wij serveren verse maaltijden, huisbereide kroketten en krokante frietjes — bereid met producten van eigen regio.',
            fr: "Chez nous, vous n'êtes pas dans une simple friterie. Nous servons des repas frais, des croquettes maison et des frites croustillantes — préparées avec des produits de la région."
          }) }}</p>
          <p>{{ t({
            nl: 'Van een eenvoudige frikandel speciaal tot een uitgebreide scampi of ons befaamd half haantje: de kaart is groot, de kwaliteit onveranderlijk.',
            fr: "D'une simple fricandelle spéciale à un scampi complet ou notre fameux demi poulet : la carte est grande, la qualité immuable."
          }) }}</p>
        </div>
        <a href="/menu" class="inline-flex items-center gap-2 mt-8 bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          {{ t({ nl: 'Volledige menukaart', fr: 'Menu complet' }) }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      <div class="lg:col-span-2 grid grid-cols-2 gap-3">
        <img
          src="https://strapi.bellegemsfriethuisje.be/uploads/small_Bellegems_Friethuisje_1_718c40142e.jpg"
          alt="Bellegems Friethuisje"
          loading="lazy"
          decoding="async"
          class="col-span-2 h-52 w-full object-cover rounded-2xl"
        />
        <img
          :src="`https://strapi.bellegemsfriethuisje.be/uploads/small_DSC_1740_Half_haantje_6b1846afc8.jpg`"
          alt="Half haantje"
          loading="lazy"
          decoding="async"
          class="h-36 w-full object-cover rounded-2xl"
        />
        <img
          :src="`https://strapi.bellegemsfriethuisje.be/uploads/small_DSC_1520_BELL_Burger_3_05731fcc44.jpg`"
          alt="BELL Burger"
          loading="lazy"
          decoding="async"
          class="h-36 w-full object-cover rounded-2xl"
        />
      </div>
    </div>
  </section>

  <!-- Orange divider with facts -->
  <section class="bg-orange-500 py-8">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
        <div>
          <p class="text-3xl font-extrabold">7/7</p>
          <p class="text-orange-200 text-sm mt-1">{{ t({ nl: 'Dagen open', fr: 'Jours ouverts' }) }}</p>
        </div>
        <div>
          <p class="text-3xl font-extrabold">2</p>
          <p class="text-orange-200 text-sm mt-1">{{ t({ nl: 'Locaties', fr: 'Emplacements' }) }}</p>
        </div>
        <div>
          <p class="text-3xl font-extrabold">50+</p>
          <p class="text-orange-200 text-sm mt-1">{{ t({ nl: 'Gerechten', fr: 'Plats' }) }}</p>
        </div>
        <div>
          <p class="text-3xl font-extrabold">10+</p>
          <p class="text-orange-200 text-sm mt-1">{{ t({ nl: 'Jaar ervaring', fr: "Ans d'expérience" }) }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular dishes -->
  <section class="max-w-5xl mx-auto px-4 lg:px-0 py-20">
    <div class="flex items-end justify-between mb-10">
      <div>
        <span class="text-orange-500 text-sm font-bold tracking-widest uppercase block mb-2">
          {{ t({ nl: 'Populair', fr: 'Populaire' }) }}
        </span>
        <h2 class="text-4xl font-extrabold text-gray-900 leading-tight">
          {{ t({ nl: 'Favorieten van onze\nklanten', fr: 'Les favoris de\nnos clients' }) }}
        </h2>
      </div>
      <a href="/menu" class="hidden sm:inline-flex items-center gap-1.5 text-gray-500 hover:text-orange-500 font-semibold text-sm transition-colors shrink-0">
        {{ t({ nl: 'Alles bekijken', fr: 'Tout voir' }) }}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </div>

    <!-- Featured dish - full width -->
    <div class="rounded-2xl overflow-hidden mb-5 relative h-64 group">
      <img
        src="https://strapi.bellegemsfriethuisje.be/uploads/small_DSC_1740_Half_haantje_6b1846afc8.jpg"
        alt="Half haantje"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-end p-6">
        <div>
          <span class="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
            {{ t({ nl: 'Populair', fr: 'Populaire' }) }}
          </span>
          <h3 class="text-white font-extrabold text-2xl">{{ t({ nl: 'Half haantje', fr: 'Demi poulet' }) }}</h3>
          <p class="text-gray-300 text-sm mt-1">
            {{ t({ nl: 'Krokant gebakken half haantje met frieten', fr: 'Demi poulet croustillant avec frites' }) }}
          </p>
          <p class="text-orange-400 font-bold text-xl mt-2">€14.70</p>
        </div>
      </div>
    </div>

    <!-- Other popular items -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <MenuCard
        v-for="item in popularItems"
        :key="item.id"
        :image="item.image"
        :name="lang === 'nl' ? item.nl.name : item.fr.name"
        :description="lang === 'nl' ? item.nl.description : item.fr.description"
        :price="item.price"
        :category="item.category"
        :popular="true"
      />
    </div>

    <div class="text-center mt-8 sm:hidden">
      <a href="/menu" class="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors">
        {{ t({ nl: 'Alles bekijken →', fr: 'Tout voir →' }) }}
      </a>
    </div>
  </section>

  <!-- Locations -->
  <section class="bg-gray-50 py-20">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <h2 class="text-4xl font-extrabold text-gray-900 mb-10">
        {{ t({ nl: 'Onze locaties', fr: 'Nos emplacements' }) }}
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="loc in locations" :key="loc.id" class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
          <h3 class="font-extrabold text-gray-900 text-xl mb-1">{{ loc.name }}</h3>
          <p class="text-gray-400 text-sm mb-4">{{ loc.address }}</p>
          <div class="space-y-1 mb-5">
            <div v-for="h in loc.hours" :key="h.nl" class="flex justify-between text-sm">
              <span class="text-gray-500">{{ lang === 'nl' ? h.nl : h.fr }}</span>
              <span :class="h.closed ? 'text-red-400 font-medium' : 'text-gray-800 font-medium'">
                {{ h.closed ? t({ nl: 'Gesloten', fr: 'Fermé' }) : h.time }}
              </span>
            </div>
          </div>
          <a :href="`tel:${loc.phone}`" class="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors text-sm">
            📞 {{ loc.phoneDisplay }}
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Reservation CTA with real photo bg -->
  <section class="relative overflow-hidden h-64 flex items-center">
    <img
      src="https://strapi.bellegemsfriethuisje.be/uploads/medium_20220417_105904_aad992e322.jpg"
      alt="Bellegems Friethuisje"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-orange-600/85" />
    <div class="relative z-10 max-w-5xl mx-auto px-4 lg:px-0 w-full">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 class="text-3xl font-extrabold text-white mb-2">
            {{ t({ nl: 'Grote groep? Bel ons.', fr: 'Grand groupe? Appelez-nous.' }) }}
          </h2>
          <p class="text-orange-100">
            {{ t({ nl: 'Reserveren vanaf 10 personen.', fr: 'Réservation à partir de 10 personnes.' }) }}
          </p>
        </div>
        <a href="tel:+3256000000" class="shrink-0 bg-white text-orange-500 font-bold px-7 py-3.5 rounded-xl hover:bg-orange-50 transition-colors text-lg">
          📞 056 00 00 00
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../../composables/useLang'
import MenuCard from '../../components/MenuCard.vue'
import FestiveBanner from '../../components/FestiveBanner.vue'
import bellegems from '../../data/locations/bellegems.json'
import takeaway from '../../data/locations/takeaway.json'

const { lang, t } = useLang()

const locations = [bellegems, takeaway]

const popularItems = computed(() =>
  bellegems.menu.filter(i => i.popular).slice(0, 3)
)
</script>

