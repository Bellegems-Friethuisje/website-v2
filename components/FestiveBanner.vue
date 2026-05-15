<template>
  <Transition name="festive-banner">
    <section
      v-if="upcoming"
      class="relative overflow-hidden"
      :style="{ background: upcoming.bg }"
    >
      <div class="max-w-5xl mx-auto px-4 lg:px-0 py-8 flex flex-col sm:flex-row items-center gap-6">
        <!-- Emoji -->
        <div class="text-6xl shrink-0 select-none" aria-hidden="true">
          {{ upcoming.emoji }}
        </div>

        <!-- Text -->
        <div class="flex-1 text-center sm:text-left">
          <p class="text-xs font-bold uppercase tracking-widest mb-1" :style="{ color: upcoming.labelColor }">
            {{ daysLabel }}
          </p>
          <h2 class="text-2xl font-extrabold text-gray-900 mb-1">
            {{ lang === 'nl' ? upcoming.nl : upcoming.fr }}
          </h2>
          <p class="text-gray-700 text-base leading-snug">
            {{ lang === 'nl' ? upcoming.message.nl : upcoming.message.fr }}
          </p>
          <p v-if="upcoming.note" class="mt-2 text-sm font-semibold flex items-center justify-center sm:justify-start gap-1.5" :style="{ color: upcoming.labelColor }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {{ lang === 'nl' ? upcoming.note.nl : upcoming.note.fr }}
          </p>
        </div>

        <!-- Date badge -->
        <div class="shrink-0 text-center px-5 py-3 rounded-2xl" :style="{ background: upcoming.badgeBg }">
          <p class="text-3xl font-extrabold text-gray-900 leading-none">{{ upcoming.day }}</p>
          <p class="text-sm font-semibold text-gray-600 mt-0.5">{{ monthLabel }}</p>
        </div>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../composables/useLang'

const { lang, t } = useLang()

function easter(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

interface Holiday {
  id: string
  emoji: string
  nl: string
  fr: string
  bg: string
  badgeBg: string
  labelColor: string
  message: { nl: string; fr: string }
  note?: { nl: string; fr: string }
  date: (year: number) => Date
}

const holidays: Holiday[] = [
  {
    id: 'oudejaarsavond',
    emoji: '🥂',
    nl: 'Oudejaarsavond',
    fr: 'Saint-Sylvestre',
    bg: 'linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%)',
    badgeBg: '#fde68a',
    labelColor: '#b45309',
    message: {
      nl: 'Sluit het jaar smakelijk af bij Bellegems Friethuisje! We zijn open voor de middagdienst.',
      fr: 'Terminez l\'année en beauté chez Bellegems Friethuisje ! Nous sommes ouverts pour le service de midi.',
    },
    note: {
      nl: 'We zijn enkel open van 11u00 tot 14u30.',
      fr: 'Nous sommes uniquement ouverts de 11h00 à 14h30.',
    },
    date: (y) => new Date(y, 11, 31),
  },
  {
    id: 'nieuwjaar',
    emoji: '🎆',
    nl: 'Nieuwjaarsdag',
    fr: "Jour de l'An",
    bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    badgeBg: '#bfdbfe',
    labelColor: '#1d4ed8',
    message: {
      nl: 'Gelukkig Nieuw Jaar! We starten het jaar op en zijn open voor de avonddienst.',
      fr: 'Bonne Année ! Nous ouvrons l\'année et sommes disponibles pour le service du soir.',
    },
    note: {
      nl: 'We zijn enkel open van 17u00 tot 22u00.',
      fr: 'Nous sommes uniquement ouverts de 17h00 à 22h00.',
    },
    date: (y) => new Date(y, 0, 1),
  },
  {
    id: 'paasmaandag',
    emoji: '🐣',
    nl: 'Paasmaandag',
    fr: 'Lundi de Pâques',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    badgeBg: '#bbf7d0',
    labelColor: '#15803d',
    message: {
      nl: 'Vrolijk Pasen! We zijn open — geniet van een heerlijke maaltijd met het gezin.',
      fr: 'Joyeuses Pâques ! Nous sommes ouverts — profitez d\'un délicieux repas en famille.',
    },
    date: (y) => addDays(easter(y), 1),
  },
  {
    id: 'arbeid',
    emoji: '🌸',
    nl: 'Dag van de Arbeid',
    fr: 'Fête du Travail',
    bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    badgeBg: '#fecdd3',
    labelColor: '#be123c',
    message: {
      nl: 'Dag van de Arbeid! Verdien uw goudgele frietjes — we zijn gewoon open.',
      fr: 'Fête du Travail ! Méritez vos frites dorées — nous sommes ouverts comme d\'habitude.',
    },
    date: (y) => new Date(y, 4, 1),
  },
  {
    id: 'hemelvaart',
    emoji: '✨',
    nl: 'Hemelvaartsdag',
    fr: 'Ascension',
    bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    badgeBg: '#e9d5ff',
    labelColor: '#7c3aed',
    message: {
      nl: 'Hemelvaartsdag! We zijn open — kom genieten van onze verse gerechten.',
      fr: 'Ascension ! Nous sommes ouverts — venez profiter de nos plats frais.',
    },
    date: (y) => addDays(easter(y), 39),
  },
  {
    id: 'pinksteren',
    emoji: '🕊️',
    nl: 'Pinkstermaandag',
    fr: 'Lundi de Pentecôte',
    bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
    badgeBg: '#a5f3fc',
    labelColor: '#0e7490',
    message: {
      nl: 'Vrolijk Pinksteren! We zijn open op Pinkstermaandag — eet smakelijk!',
      fr: 'Joyeuse Pentecôte ! Nous sommes ouverts ce lundi de Pentecôte — bon appétit !',
    },
    date: (y) => addDays(easter(y), 50),
  },
  {
    id: 'nationaal',
    emoji: '🇧🇪',
    nl: 'Nationale Feestdag',
    fr: 'Fête Nationale',
    bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    badgeBg: '#fed7aa',
    labelColor: '#c2410c',
    message: {
      nl: 'Nationale Feestdag! Vier België met een portie verse goudgele frietjes.',
      fr: 'Fête Nationale ! Célébrez la Belgique avec une portion de frites bien dorées.',
    },
    date: (y) => new Date(y, 6, 21),
  },
  {
    id: 'maria_hemelvaart',
    emoji: '☀️',
    nl: 'Maria-Hemelvaart',
    fr: 'Assomption',
    bg: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
    badgeBg: '#fde68a',
    labelColor: '#a16207',
    message: {
      nl: 'Maria-Hemelvaart! We zijn open — een ideaal moment voor een zomerse maaltijd.',
      fr: 'Assomption ! Nous sommes ouverts — un moment idéal pour un repas estival.',
    },
    date: (y) => new Date(y, 7, 15),
  },
  {
    id: 'allerheiligen',
    emoji: '🕯️',
    nl: 'Allerheiligen',
    fr: 'Toussaint',
    bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    badgeBg: '#e2e8f0',
    labelColor: '#475569',
    message: {
      nl: 'Allerheiligen. We zijn open — warme soep en verse gerechten staan voor u klaar.',
      fr: 'Toussaint. Nous sommes ouverts — soupe chaude et plats frais vous attendent.',
    },
    date: (y) => new Date(y, 10, 1),
  },
  {
    id: 'wapenstilstand',
    emoji: '🎖️',
    nl: 'Wapenstilstand',
    fr: 'Armistice',
    bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    badgeBg: '#e2e8f0',
    labelColor: '#475569',
    message: {
      nl: 'Wapenstilstand. We zijn open — eet smakelijk en gedenk onze helden.',
      fr: 'Armistice. Nous sommes ouverts — bon appétit et hommage à nos héros.',
    },
    date: (y) => new Date(y, 10, 11),
  },
  {
    id: 'kerstavond',
    emoji: '🎄',
    nl: 'Kerstavond',
    fr: 'Veille de Noël',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    badgeBg: '#bbf7d0',
    labelColor: '#15803d',
    message: {
      nl: 'Kerstavond! Kom genieten voor de feestdagen — we zijn open voor de middagdienst.',
      fr: 'Veille de Noël ! Venez profiter avant les fêtes — nous sommes ouverts pour le service de midi.',
    },
    note: {
      nl: 'We zijn enkel open van 11u00 tot 14u30.',
      fr: 'Nous sommes uniquement ouverts de 11h00 à 14h30.',
    },
    date: (y) => new Date(y, 11, 24),
  },
  {
    id: 'kerstmis',
    emoji: '🎅',
    nl: 'Kerstmis',
    fr: 'Noël',
    bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    badgeBg: '#fecdd3',
    labelColor: '#be123c',
    message: {
      nl: 'Vrolijk Kerstmis! We zijn open voor de avonddienst — geniet van een feestelijke maaltijd.',
      fr: 'Joyeux Noël ! Nous sommes ouverts pour le service du soir — profitez d\'un repas de fête.',
    },
    note: {
      nl: 'We zijn enkel open van 17u00 tot 22u00.',
      fr: 'Nous sommes uniquement ouverts de 17h00 à 22h00.',
    },
    date: (y) => new Date(y, 11, 25),
  },
]

const upcoming = computed(() => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  let nearest: (Holiday & { holidayDate: Date; daysUntil: number }) | null = null

  for (const yearOffset of [0, 1]) {
    const y = today.getFullYear() + yearOffset
    for (const h of holidays) {
      const hDate = h.date(y)
      const diff = Math.round((hDate.getTime() - today.getTime()) / 86400000)
      if (diff >= 0 && diff <= 7) {
        if (!nearest || diff < nearest.daysUntil) {
          nearest = { ...h, holidayDate: hDate, daysUntil: diff }
        }
      }
    }
    if (nearest) break
  }

  return nearest
})

const daysLabel = computed(() => {
  if (!upcoming.value) return ''
  const n = upcoming.value.daysUntil
  if (n === 0) return lang.value === 'nl' ? '🎉 Vandaag' : '🎉 Aujourd\'hui'
  if (n === 1) return lang.value === 'nl' ? 'Morgen' : 'Demain'
  return lang.value === 'nl' ? `Nog ${n} dagen` : `Dans ${n} jours`
})

const monthLabel = computed(() => {
  if (!upcoming.value) return ''
  const d = upcoming.value.holidayDate
  const months = lang.value === 'nl'
    ? ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
    : ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc']
  return months[d.getMonth()]
})
</script>

<script lang="ts">
export default { name: 'FestiveBanner' }
</script>

<style scoped>
.festive-banner-enter-active,
.festive-banner-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.festive-banner-enter-from,
.festive-banner-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
