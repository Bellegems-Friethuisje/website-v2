<template>
  <!-- Hero -->
  <section
    class="relative overflow-hidden h-[90vh] min-h-[560px] max-h-[780px]"
  >
    <div class="absolute inset-0">
      <picture>
        <source srcset="/site/hero.avif" type="image/avif" />
        <source srcset="/site/hero.webp" type="image/webp" />
        <img src="/site/hero.webp" alt="Bellegems Friethuisje" fetchpriority="high" decoding="async" class="w-full h-full object-cover object-center" />
      </picture>
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"
      />
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 z-10 max-w-5xl mx-auto px-4 lg:px-0 pb-12"
    >
      <p
        class="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4"
      >
        <span aria-hidden="true">📍</span> Bellegem · Kortrijk ·
        {{ t({ nl: "Sinds 2004", fr: "Depuis 2004" }) }}
      </p>
      <h1
        class="text-5xl lg:text-7xl font-extrabold text-white leading-none mb-5 tracking-tight"
      >
        {{
          t({
            nl: "Meer dan een\nfrituur alleen.",
            fr: "Plus qu'une\nsimple friterie.",
          })
        }}
      </h1>
      <p class="text-gray-400 text-xl mb-8 max-w-md">
        {{
          t({
            nl: "Kwaliteitskeuken, verse bereidingen en goudgele frietjes. Elke dag met passie bereid.",
            fr: "Cuisine de qualité, préparations fraîches et frites dorées. Préparées avec passion chaque jour.",
          })
        }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="/menu"
          class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors text-lg"
        >
          {{ t({ nl: "Bekijk ons menu", fr: "Voir notre menu" }) }}
        </a>
        <a
          href="/locaties"
          class="border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-lg backdrop-blur-sm"
        >
          {{ t({ nl: "Locaties", fr: "Emplacements" }) }}
        </a>
      </div>
    </div>
  </section>

  <!-- Festive banner -->
  <FestiveBanner />

  <!-- Our story — timeline -->
  <section class="max-w-5xl mx-auto px-4 lg:px-0 py-20">
    <div class="grid lg:grid-cols-5 gap-12 items-start">
      <!-- Timeline -->
      <div class="lg:col-span-3">
        <span
          class="inline-block text-orange-500 text-sm font-bold tracking-widest uppercase mb-5"
        >
          {{ t({ nl: "Ons verhaal", fr: "Notre histoire" }) }}
        </span>
        <h2
          class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 leading-tight"
        >
          {{ t({ nl: "Hoe alles begon.", fr: "Comment tout a commencé." }) }}
        </h2>

        <div class="relative pl-6 border-l-2 border-orange-100 space-y-10">
          <!-- 2004 -->
          <div class="relative">
            <div
              class="absolute -left-[1.4375rem] top-1.5 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm"
            />
            <span
              class="text-orange-500 text-xs font-bold tracking-widest uppercase"
              >2004</span
            >
            <h3 class="text-lg font-extrabold text-gray-900 mt-1 mb-1">
              {{ t({ nl: "De eerste dag", fr: "Le premier jour" }) }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{
                t({
                  nl: "Patrick Huyse, vakman in de vleeshandel, opent de deuren langs de steenweg tussen Kortrijk en Doornik. Verse friet, warme maaltijden en een welkomstgevoel dat mensen doet terugkomen.",
                  fr: "Patrick Huyse, expert dans le commerce de viande, ouvre les portes sur la route entre Kortrijk et Tournai. Des frites fraîches, des plats chauds et un accueil chaleureux qui fait revenir les gens.",
                })
              }}
            </p>
          </div>

          <!-- Eerste jaren -->
          <div class="relative">
            <div
              class="absolute -left-[1.4375rem] top-1.5 w-4 h-4 rounded-full bg-orange-200 border-4 border-white shadow-sm"
            />
            <span
              class="text-orange-400 text-xs font-bold tracking-widest uppercase"
            >
              {{ t({ nl: "De eerste jaren", fr: "Les premières années" }) }}
            </span>
            <h3 class="text-lg font-extrabold text-gray-900 mt-1 mb-1">
              {{
                t({
                  nl: "Van frituur naar vaste waarde",
                  fr: "De friterie à valeur sûre",
                })
              }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{
                t({
                  nl: "De zaak groeit gestaag. Families, werklui en doorrijders vinden hun weg naar Bellegem. De eerste uitbreidingen volgen al snel, telkens gedreven door meer volk dan er plek was.",
                  fr: "L'établissement grandit régulièrement. Familles, travailleurs et voyageurs trouvent leur chemin vers Bellegem. Les premières extensions suivent rapidement, à chaque fois poussées par plus de monde qu'il n'y avait de place.",
                })
              }}
            </p>
          </div>

          <!-- 2019 -->
          <div class="relative">
            <div
              class="absolute -left-[1.4375rem] top-1.5 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm"
            />
            <span
              class="text-orange-500 text-xs font-bold tracking-widest uppercase"
              >2019</span
            >
            <h3 class="text-lg font-extrabold text-gray-900 mt-1 mb-1">
              {{
                t({
                  nl: "De vijfde uitbreiding",
                  fr: "Le cinquième agrandissement",
                })
              }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{
                t({
                  nl: "In amper twee weken tijd wordt de zaak grondig vernieuwd. De eetruimte groeit naar meer dan 550 m², met ruimte voor grote families, groepen vrienden en iedereen daartussen.",
                  fr: "En à peine deux semaines, l'établissement est entièrement rénové. L'espace repas passe à plus de 550 m², avec de la place pour les grandes familles, les groupes d'amis et tout le monde entre les deux.",
                })
              }}
            </p>
          </div>

          <!-- Vandaag -->
          <div class="relative">
            <div
              class="absolute -left-[1.4375rem] top-1.5 w-4 h-4 rounded-full bg-gray-900 border-4 border-white shadow-sm"
            />
            <span
              class="text-gray-400 text-xs font-bold tracking-widest uppercase"
            >
              {{ t({ nl: "Vandaag", fr: "Aujourd'hui" }) }}
            </span>
            <h3 class="text-lg font-extrabold text-gray-900 mt-1 mb-1">
              {{
                t({
                  nl: "Een begrip in de regio",
                  fr: "Une référence dans la région",
                })
              }}
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              {{
                t({
                  nl: "Meer dan 250 zitplaatsen, een 30-tal medewerkers en een kaart die elke dag vers wordt klaargemaakt. Hetzelfde gevoel als dag één, op veel grotere schaal.",
                  fr: "Plus de 250 places assises, une trentaine de collaborateurs et une carte préparée fraîche chaque jour. Le même esprit qu'au premier jour, à bien plus grande échelle.",
                })
              }}
            </p>
          </div>
        </div>

        <a
          href="/menu"
          class="inline-flex items-center gap-2 mt-10 bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          {{ t({ nl: "Volledige menukaart", fr: "Menu complet" }) }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>

      <!-- Images -->
      <div class="lg:col-span-2 grid grid-cols-2 gap-3 lg:sticky lg:top-24">
        <picture class="col-span-2">
          <source srcset="/site/story-exterior.avif" type="image/avif" />
          <source srcset="/site/story-exterior.webp" type="image/webp" />
          <img src="/site/story-exterior.webp" alt="Bellegems Friethuisje buiten" loading="lazy" decoding="async" class="h-52 w-full object-cover rounded-2xl" />
        </picture>
        <picture>
          <source srcset="/site/story-interior.avif" type="image/avif" />
          <source srcset="/site/story-interior.webp" type="image/webp" />
          <img src="/site/story-interior.webp" alt="Sfeer binnen" loading="lazy" decoding="async" class="h-36 w-full object-cover rounded-2xl" />
        </picture>
        <picture>
          <source srcset="/site/story-dining.avif" type="image/avif" />
          <source srcset="/site/story-dining.webp" type="image/webp" />
          <img src="/site/story-dining.webp" alt="Zaal" loading="lazy" decoding="async" class="h-36 w-full object-cover rounded-2xl" />
        </picture>
        <picture>
          <source srcset="/site/story-hall.avif" type="image/avif" />
          <source srcset="/site/story-hall.webp" type="image/webp" />
          <img src="/site/story-hall.webp" alt="Bellegems Friethuisje zaal" loading="lazy" decoding="async" class="h-36 w-full object-cover rounded-2xl" />
        </picture>
        <picture>
          <source srcset="/site/story-entrance.avif" type="image/avif" />
          <source srcset="/site/story-entrance.webp" type="image/webp" />
          <img src="/site/story-entrance.webp" alt="Ingang" loading="lazy" decoding="async" class="h-36 w-full object-cover rounded-2xl" />
        </picture>
      </div>
    </div>
  </section>

  <!-- Orange stats bar -->
  <section class="bg-orange-500 py-8">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
        <div>
          <p class="text-3xl font-extrabold">2004</p>
          <p class="text-orange-200 text-sm mt-1">
            {{ t({ nl: "Opgericht", fr: "Fondé" }) }}
          </p>
        </div>
        <div>
          <p class="text-3xl font-extrabold">250+</p>
          <p class="text-orange-200 text-sm mt-1">
            {{ t({ nl: "Zitplaatsen", fr: "Places assises" }) }}
          </p>
        </div>
        <div>
          <p class="text-3xl font-extrabold">30</p>
          <p class="text-orange-200 text-sm mt-1">
            {{ t({ nl: "Medewerkers", fr: "Collaborateurs" }) }}
          </p>
        </div>
        <div>
          <p class="text-3xl font-extrabold">550m²</p>
          <p class="text-orange-200 text-sm mt-1">
            {{ t({ nl: "Eetruimte", fr: "Espace repas" }) }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why us — 3 pillars -->
  <section class="bg-gray-50 py-20">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="text-center mb-12">
        <span
          class="text-orange-500 text-sm font-bold tracking-widest uppercase block mb-3"
        >
          {{
            t({
              nl: "Wat je kunt verwachten",
              fr: "Ce que vous pouvez attendre",
            })
          }}
        </span>
        <h2 class="text-4xl font-extrabold text-gray-900">
          {{
            t({ nl: "Meer dan friet alleen", fr: "Bien plus que des frites" })
          }}
        </h2>
      </div>
      <div class="grid sm:grid-cols-3 gap-8">
        <div
          class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
        >
          <div class="text-4xl mb-4" aria-hidden="true">🍟</div>
          <h3 class="text-lg font-extrabold text-gray-900 mb-3">
            {{
              t({
                nl: "Frieten zoals het hoort",
                fr: "Des frites comme il se doit",
              })
            }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            {{
              t({
                nl: "Goudgeel, krokant en heet van de frituur. Bereid met verse aardappelen, elke dag opnieuw.",
                fr: "Dorées, croustillantes et fraîches de la friteuse. Préparées avec des pommes de terre fraîches, chaque jour.",
              })
            }}
          </p>
        </div>
        <div
          class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
        >
          <div class="text-4xl mb-4" aria-hidden="true">🍽️</div>
          <h3 class="text-lg font-extrabold text-gray-900 mb-3">
            {{ t({ nl: "Een echte keuken", fr: "Une vraie cuisine" }) }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            {{
              t({
                nl: "Stoofvlees, vol-au-vent, verse garnaalkroketten en scampi. Gerechten die je bij oma verwacht, hier gemaakt.",
                fr: "Carbonnade, vol-au-vent, croquettes aux crevettes fraîches et scampi. Des plats que vous attendez chez mamie, préparés ici.",
              })
            }}
          </p>
        </div>
        <div
          class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
        >
          <div class="text-4xl mb-4" aria-hidden="true">🪑</div>
          <h3 class="text-lg font-extrabold text-gray-900 mb-3">
            {{
              t({ nl: "Rustig aan tafel", fr: "À table en toute tranquillité" })
            }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            {{
              t({
                nl: "Geen gehaast eten aan een toonbank. Bij ons zit je neer, ook al kom je alleen voor een portie friet.",
                fr: "Pas de repas précipité au comptoir. Ici vous vous asseyez, même si vous venez juste pour une portion de frites.",
              })
            }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular dishes -->
  <section class="max-w-5xl mx-auto px-4 lg:px-0 py-20">
    <div class="flex items-end justify-between mb-10">
      <div>
        <span
          class="text-orange-500 text-sm font-bold tracking-widest uppercase block mb-2"
        >
          {{ t({ nl: "Populair", fr: "Populaire" }) }}
        </span>
        <h2 class="text-4xl font-extrabold text-gray-900 leading-tight">
          {{
            t({
              nl: "Favorieten van onze\nklanten",
              fr: "Les favoris de\nnos clients",
            })
          }}
        </h2>
      </div>
      <a
        href="/menu"
        class="hidden sm:inline-flex items-center gap-1.5 text-gray-500 hover:text-orange-500 font-semibold text-sm transition-colors shrink-0"
      >
        {{ t({ nl: "Alles bekijken", fr: "Tout voir" }) }}
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
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </a>
    </div>

    <!-- Featured dish -->
    <div class="rounded-2xl overflow-hidden mb-5 relative h-64 group">
      <picture>
        <source srcset="/site/featured-halfhaantje.avif" type="image/avif" />
        <source srcset="/site/featured-halfhaantje.webp" type="image/webp" />
        <img src="/site/featured-halfhaantje.webp" alt="Half haantje" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </picture>
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-end p-6"
      >
        <div>
          <span
            class="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block"
          >
            <span aria-hidden="true">⭐</span>
            {{ t({ nl: "Populair", fr: "Populaire" }) }}
          </span>
          <h3 class="text-white font-extrabold text-2xl">
            {{ t({ nl: "Half haantje", fr: "Demi poulet" }) }}
          </h3>
          <p class="text-gray-300 text-sm mt-1">
            {{
              t({
                nl: "Krokant gebakken half haantje met frieten",
                fr: "Demi poulet croustillant avec frites",
              })
            }}
          </p>
          <p class="text-orange-400 font-bold text-xl mt-2">€14.70</p>
        </div>
      </div>
    </div>

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
        @add="addToOrder(item)"
      />
    </div>

    <div class="text-center mt-8 sm:hidden">
      <a
        href="/menu"
        class="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors"
      >
        {{ t({ nl: "Alles bekijken →", fr: "Tout voir →" }) }}
      </a>
    </div>
  </section>

  <!-- Ratings / social proof -->
  <section class="bg-orange-50 border-y border-orange-100 py-16">
    <div class="max-w-5xl mx-auto px-4 lg:px-0 text-center">
      <span
        class="text-orange-500 text-sm font-bold tracking-widest uppercase block mb-3"
      >
        {{ t({ nl: "Wat klanten zeggen", fr: "Ce que disent les clients" }) }}
      </span>
      <h2 class="text-4xl font-extrabold text-gray-900 mb-3">
        {{
          t({
            nl: "Wat andere gasten zeggen",
            fr: "Ce que disent les autres clients",
          })
        }}
      </h2>
      <p class="text-gray-500 max-w-lg mx-auto mb-12">
        {{
          t({
            nl: "Beoordelingen van echte bezoekers op Google, Facebook en Foursquare.",
            fr: "Avis de vrais visiteurs sur Google, Facebook et Foursquare.",
          })
        }}
      </p>
      <div class="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div
          class="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
        >
          <p class="text-4xl font-extrabold text-gray-900 mb-1">4.5</p>
          <div class="text-yellow-400 text-lg mb-1">★★★★★</div>
          <p class="text-gray-500 text-sm font-semibold">Google</p>
          <p class="text-gray-400 text-xs mt-1">
            2.854 {{ t({ nl: "beoordelingen", fr: "avis" }) }}
          </p>
        </div>
        <div
          class="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
        >
          <p class="text-4xl font-extrabold text-gray-900 mb-1">4.7</p>
          <div class="text-yellow-400 text-lg mb-1">★★★★★</div>
          <p class="text-gray-500 text-sm font-semibold">Facebook</p>
          <p class="text-gray-400 text-xs mt-1">
            423 {{ t({ nl: "beoordelingen", fr: "avis" }) }}
          </p>
        </div>
        <div
          class="bg-white rounded-2xl p-6 shadow-sm border border-orange-100"
        >
          <p class="text-4xl font-extrabold text-gray-900 mb-1">9/10</p>
          <div class="text-yellow-400 text-lg mb-1">★★★★★</div>
          <p class="text-gray-500 text-sm font-semibold">Foursquare</p>
          <p class="text-gray-400 text-xs mt-1">
            376 {{ t({ nl: "beoordelingen", fr: "avis" }) }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Locations -->
  <section class="bg-white py-20">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="mb-10">
        <span
          class="text-orange-500 text-sm font-bold tracking-widest uppercase block mb-3"
        >
          {{ t({ nl: "Kom langs", fr: "Venez nous voir" }) }}
        </span>
        <h2 class="text-4xl font-extrabold text-gray-900">
          {{ t({ nl: "Onze locaties", fr: "Nos emplacements" }) }}
        </h2>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="loc in locations"
          :key="loc.id"
          class="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all border border-gray-100"
        >
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-extrabold text-gray-900 text-xl">{{ loc.name }}</h3>
            <OpenBadge :open="isOpenMap[loc.id]" />
          </div>
          <p class="text-gray-400 text-sm mb-4">
            <span aria-hidden="true">📍</span> {{ loc.address }}
          </p>
          <div class="space-y-1.5 mb-5">
            <div
              v-for="h in loc.hours"
              :key="h.nl"
              class="flex justify-between text-sm"
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
          <div class="flex gap-3">
            <a
              :href="`tel:${loc.phone}`"
              class="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors text-sm"
            >
              📞 {{ loc.phoneDisplay }}
            </a>
            <span class="text-gray-200">|</span>
            <a
              :href="
                loc.mapsUrl ||
                `https://maps.google.com/?q=${encodeURIComponent(loc.address)}`
              "
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
            >
              {{ t({ nl: "Route →", fr: "Itinéraire →" }) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Reservation CTA -->
  <section class="relative overflow-hidden h-64 flex items-center">
    <picture>
      <source srcset="/site/cta-bg.avif" type="image/avif" />
      <source srcset="/site/cta-bg.webp" type="image/webp" />
      <img src="/site/cta-bg.webp" alt="Bellegems Friethuisje" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" />
    </picture>
    <div class="absolute inset-0 bg-orange-600/85" />
    <div class="relative z-10 max-w-5xl mx-auto px-4 lg:px-0 w-full">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div>
          <h2 class="text-3xl font-extrabold text-white mb-2">
            {{
              t({
                nl: "Grote groep? Reserveer op voorhand.",
                fr: "Grand groupe? Réservez à l'avance.",
              })
            }}
          </h2>
          <p class="text-orange-100">
            {{
              t({
                nl: "Aanbevolen vanaf 10 personen, wij zorgen voor de rest.",
                fr: "Recommandé à partir de 10 personnes, nous nous occupons du reste.",
              })
            }}
          </p>
        </div>
        <a
          href="/reservaties"
          class="shrink-0 bg-white text-orange-500 font-bold px-7 py-3.5 rounded-xl hover:bg-orange-50 transition-colors text-lg whitespace-nowrap"
          @click="trackEvent('reservation_click', { source: 'homepage_cta' })"
        >
          {{ t({ nl: "Reserveer nu", fr: "Réservez maintenant" }) }}
        </a>
      </div>
    </div>
  </section>

  <!-- Pre-order bubble -->
  <PreorderBubble />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLang } from "../../composables/useLang";
import { trackEvent } from "../../composables/useAnalytics";
import { getIsOpen } from "../../composables/useIsOpen";
import { useOrder } from "../../composables/useOrder";
import PreorderBubble from "../../components/PreorderBubble.vue";
import MenuCard from "../../components/MenuCard.vue";
import FestiveBanner from "../../components/FestiveBanner.vue";
import OpenBadge from "../../components/OpenBadge.vue";
import bellegems from "../../data/locations/bellegems.json";
import takeaway from "../../data/locations/takeaway.json";

const { lang, t } = useLang();
const { addItem } = useOrder();

const locations = [bellegems, takeaway];

const isOpenMap = computed(() => {
  const result: Record<string, boolean> = {};
  for (const loc of locations) result[loc.id] = getIsOpen(loc.hours);
  return result;
});

const popularItems = computed(() =>
  bellegems.menu.filter((i) => i.popular).slice(0, 3),
);

function addToOrder(item: Record<string, any>) {
  addItem(
    {
      key: `${bellegems.id}-${item.id}`,
      id: item.id,
      name: { nl: item.nl.name, fr: item.fr.name },
      price: item.price,
      image: item.image,
      emoji: item.emoji,
      category: item.category,
    },
    bellegems.id,
    bellegems.name,
  );
  trackEvent("add_to_preorder", {
    item_id: item.id,
    item_name: item.nl.name,
    item_category: item.category,
    price: item.price,
    location: bellegems.id,
    source: "homepage_popular",
  });
}
</script>
