<template>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍟</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <title>{{ pageTitle }}</title>
  <meta name="description" :content="pageDescription" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" :href="canonicalUrl" />

  <meta property="og:type" content="restaurant" />
  <meta property="og:site_name" content="Bellegems Friethuisje" />
  <meta property="og:title" :content="pageTitle" />
  <meta property="og:description" :content="pageDescription" />
  <meta property="og:url" :content="canonicalUrl" />
  <meta property="og:image" content="https://www.bellegemsfriethuisje.be/site/hero.webp" />
  <meta property="og:image:alt" content="Bellegems Friethuisje – buiten" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="800" />
  <meta property="og:locale" content="nl_BE" />
  <meta property="og:locale:alternate" content="fr_BE" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" :content="pageTitle" />
  <meta name="twitter:description" :content="pageDescription" />
  <meta name="twitter:image" content="https://www.bellegemsfriethuisje.be/site/hero.webp" />

  <component :is="'script'" type="application/ld+json" v-text="jsonLd" />

  <!-- Google Analytics loader (bootstrap runs in +onCreateApp.ts) -->
  <component
    v-if="gaId"
    :is="'script'"
    :async="true"
    :src="`https://www.googletagmanager.com/gtag/js?id=${gaId}`"
  />
</template>

<script setup lang="ts">
import './tailwind.css'
import { computed } from 'vue'
import { usePageContext } from 'vike-vue/usePageContext'

const ctx = usePageContext()
const BASE_URL = 'https://www.bellegemsfriethuisje.be'

const path = computed(() => ctx.urlPathname ?? '/')
const canonicalUrl = computed(() => BASE_URL + path.value)

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Bellegems Friethuisje – Meer dan een frituur alleen',
    description: 'Bellegems Friethuisje in Bellegem – kwaliteitskeuken, verse kroketten en goudgele frietjes. Al meer dan 20 jaar langs de steenweg Kortrijk–Doornik. 250+ zitplaatsen.',
  },
  '/menu': {
    title: 'Menu – Bellegems Friethuisje',
    description: 'Bekijk het volledige menu van Bellegems Friethuisje. Verse frietjes, kroketten, maaltijden, sauzen en meer. Vers bereid, elke dag opnieuw.',
  },
  '/locaties': {
    title: 'Locaties & Openingsuren – Bellegems Friethuisje',
    description: 'Bellegems Friethuisje vind je op Doornikserijksweg 134, 8510 Bellegem. Bekijk onze openingsuren, telefoonnummer en routebeschrijving.',
  },
  '/reservaties': {
    title: 'Reserveer een tafel – Bellegems Friethuisje',
    description: 'Kom je met een grote groep? Reserveer een tafel bij Bellegems Friethuisje. Aanbevolen voor 10 of meer personen. Wij zorgen voor de rest.',
  },
}

const pageTitle = computed(() => PAGE_META[path.value]?.title ?? 'Bellegems Friethuisje')
const pageDescription = computed(() => PAGE_META[path.value]?.description ?? 'Meer dan een frituur alleen – Bellegems Friethuisje')

const _rawGaId = import.meta.env.PUBLIC_ENV__GOOGLE_ANALYTICS as string | undefined
const gaId = _rawGaId && !_rawGaId.includes('XXXX') ? _rawGaId : null

const jsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'Bellegems Friethuisje',
  alternateName: "Bellegem's Friethuisje",
  description: 'Meer dan een frituur alleen. Kwaliteitskeuken, verse kroketten en goudgele frietjes. Al meer dan 20 jaar langs de steenweg Kortrijk–Doornik.',
  url: BASE_URL,
  telephone: '+3256229995',
  image: [
    `${BASE_URL}/site/hero.webp`,
    `${BASE_URL}/site/locaties.webp`,
    `${BASE_URL}/site/story-hall.webp`,
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Doornikserijksweg 134',
    addressLocality: 'Bellegem',
    postalCode: '8510',
    addressRegion: 'West-Vlaanderen',
    addressCountry: 'BE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.7775904,
    longitude: 3.3042113,
  },
  hasMap: 'https://www.google.com/maps/place/Bellegem%27s+Friethuisje/@50.7772452,3.3040134',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '11:00', closes: '14:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '17:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday'], opens: '11:00', closes: '14:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday'], opens: '17:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '11:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:00', closes: '22:00' },
  ],
  servesCuisine: ['Belgian', 'Frituur'],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '2854',
  },
  foundingDate: '2004',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 30 },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Seating', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Takeout', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'GroupsAllowed', value: true },
  ],
}))
</script>
