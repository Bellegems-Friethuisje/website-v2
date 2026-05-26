<template>
  <!-- Page header -->
  <section class="max-w-5xl mx-auto px-4 lg:px-0 pt-14 pb-10">
    <span class="text-orange-500 text-sm font-bold tracking-widest uppercase">
      {{ t({ nl: "Groepsreservatie", fr: "Réservation de groupe" }) }}
    </span>
    <h1
      class="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight"
    >
      {{ t({ nl: "Reserveer bij ons", fr: "Réservez chez nous" }) }}
    </h1>
    <p class="text-gray-500 text-lg max-w-xl">
      {{
        t({
          nl: "Planning voor een grote groep? Vul het formulier in en we nemen contact op ter bevestiging.",
          fr: "Vous planifiez pour un grand groupe ? Remplissez le formulaire et nous vous contacterons pour confirmer.",
        })
      }}
    </p>
  </section>

  <!-- Content: info + form -->
  <section class="max-w-5xl mx-auto px-4 lg:px-0 pb-6 lg:pb-20">
    <div class="grid lg:grid-cols-5 gap-8 items-start">
      <!-- Left: info cards -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <!-- Opening hours -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 class="font-extrabold text-gray-900 text-base mb-4">
            {{ t({ nl: "Openingsuren", fr: "Heures d'ouverture" }) }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="row in hours"
              :key="row.days.nl"
              class="flex justify-between text-sm"
            >
              <span class="text-gray-500">{{
                t({ nl: row.days.nl, fr: row.days.fr })
              }}</span>
              <span class="text-gray-800 font-medium">{{ row.time }}</span>
            </li>
          </ul>
        </div>

        <!-- Min. persons -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-start gap-4">
            <span class="text-3xl" aria-hidden="true">👥</span>
            <div>
              <p class="font-extrabold text-gray-900 text-base">
                {{
                  t({ nl: "Minimum 10 personen", fr: "Minimum 10 personnes" })
                }}
              </p>
              <p class="text-gray-400 text-sm mt-1">
                {{
                  t({
                    nl: "Reservaties zijn enkel mogelijk voor groepen.",
                    fr: "Les réservations sont uniquement possibles pour les groupes.",
                  })
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Phone — desktop only (mobile version is below the form) -->
        <div class="hidden lg:block bg-orange-500 rounded-2xl p-6 text-white">
          <p class="font-extrabold text-lg mb-1">
            {{ t({ nl: "Liever bellen?", fr: "Vous préférez appeler ?" }) }}
          </p>
          <p class="text-orange-100 text-sm mb-4">
            {{
              t({
                nl: "We helpen u graag persoonlijk verder.",
                fr: "Nous sommes heureux de vous aider personnellement.",
              })
            }}
          </p>
          <a
            href="tel:+3256229995"
            class="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors text-sm"
          >
            📞 056 22 99 95
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <div class="lg:col-span-3">
        <ReservationForm />
      </div>
    </div>
  </section>

  <!-- Phone — mobile only, below the form -->
  <section class="lg:hidden max-w-5xl mx-auto px-4 pb-16">
    <div
      class="bg-orange-500 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <p class="font-extrabold text-lg mb-1">
          {{ t({ nl: "Liever bellen?", fr: "Vous préférez appeler ?" }) }}
        </p>
        <p class="text-orange-100 text-sm">
          {{
            t({
              nl: "We helpen u graag persoonlijk verder.",
              fr: "Nous sommes heureux de vous aider personnellement.",
            })
          }}
        </p>
      </div>
      <a
        href="tel:+3256229995"
        class="shrink-0 inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors text-sm"
      >
        📞 056 22 99 95
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import ReservationForm from "../../components/ReservationForm.vue";
import { useLang } from "../../composables/useLang";

const { t } = useLang();

const hours = [
  { days: { nl: "Ma – Do", fr: "Lu – Je" }, time: "11:00–14:30 & 17:00–22:00" },
  {
    days: { nl: "Vrijdag", fr: "Vendredi" },
    time: "11:00–14:30 & 17:00–23:00",
  },
  { days: { nl: "Zaterdag", fr: "Samedi" }, time: "11:00–23:00" },
  { days: { nl: "Zondag", fr: "Dimanche" }, time: "11:00–22:00" },
];
</script>
