<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">

    <!-- Success -->
    <div v-if="submitted" class="text-center py-10">
      <p class="text-4xl mb-4">🎉</p>
      <h2 class="text-2xl font-extrabold text-gray-900 mb-2">
        {{ t({ nl: 'Aanvraag verstuurd!', fr: 'Demande envoyée !' }) }}
      </h2>
      <p class="text-gray-500 mb-6">
        {{ t({
          nl: 'We nemen zo snel mogelijk contact met je op ter bevestiging.',
          fr: 'Nous vous contacterons dès que possible pour confirmer.'
        }) }}
      </p>
      <button @click="reset" class="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
        {{ t({ nl: 'Nieuwe reservatie', fr: 'Nouvelle réservation' }) }}
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submit" novalidate class="space-y-5">

      <!-- Name + Email -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">{{ t({ nl: 'Naam', fr: 'Nom' }) }}</label>
          <input v-model="form.name" type="text" autocomplete="name" :placeholder="t({ nl: 'Uw naam', fr: 'Votre nom' })" :class="inputClass('name')" />
          <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">{{ t({ nl: 'E-mailadres', fr: 'Adresse e-mail' }) }}</label>
          <input v-model="form.email" type="email" autocomplete="email" :placeholder="t({ nl: 'uw@email.be', fr: 'votre@email.be' })" :class="inputClass('email')" />
          <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Date & time trigger -->
      <div class="relative" ref="pickerAnchorEl">
        <label class="block text-sm font-semibold text-gray-700 mb-1.5">
          {{ t({ nl: 'Datum & tijdstip', fr: 'Date & heure' }) }}
        </label>
        <button
          type="button"
          @click="openPicker"
          :class="[
            'w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400',
            errors.date || errors.time ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
          ]"
        >
          <span :class="pickerLabel ? 'text-gray-900' : 'text-gray-400'">
            {{ pickerLabel || t({ nl: 'Kies datum en tijdstip', fr: 'Choisissez date et heure' }) }}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <p v-if="errors.date || errors.time" class="text-red-400 text-xs mt-1">{{ errors.date || errors.time }}</p>

        <!-- ── Picker (fullscreen on mobile, dropdown on sm+) ── -->
        <Transition name="picker">
          <div
            v-if="showPicker"
            class="fixed inset-0 z-50 flex flex-col bg-white sm:absolute sm:inset-auto sm:top-[calc(100%+6px)] sm:left-0 sm:right-0 sm:z-30 sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-100 sm:max-h-[520px] sm:overflow-hidden sm:flex sm:flex-col"
          >
            <!-- Mobile header -->
            <div class="flex items-center justify-between px-4 py-4 border-b border-gray-100 sm:hidden">
              <button
                type="button"
                @click="pickerStep === 'time' ? (pickerStep = 'date') : closePicker()"
                class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="pickerStep === 'time' ? 'M15 19l-7-7 7-7' : 'M6 18L18 6M6 6l12 12'" />
                </svg>
              </button>
              <span class="font-bold text-gray-900 text-sm">
                {{ pickerStep === 'date'
                  ? t({ nl: 'Kies een datum', fr: 'Choisissez une date' })
                  : t({ nl: 'Kies een tijdstip', fr: 'Choisissez une heure' }) }}
              </span>
              <div class="w-9" />
            </div>

            <!-- Step 1: Calendar -->
            <div v-if="pickerStep === 'date'" class="flex-1 overflow-auto p-4">
              <div class="flex items-center justify-between mb-3">
                <button type="button" @click="prevMonth" class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="text-sm font-bold text-gray-800 capitalize">{{ calendarMonthLabel }}</span>
                <button type="button" @click="nextMonth" class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-7 mb-1">
                <span v-for="d in weekdays" :key="d" class="text-center text-xs font-bold text-gray-400 py-1">{{ d }}</span>
              </div>
              <div class="grid grid-cols-7 gap-0.5">
                <div v-for="(day, i) in calendarDays" :key="i">
                  <button
                    v-if="day"
                    type="button"
                    :disabled="day < today"
                    @click="selectDate(day)"
                    :class="[
                      'w-full aspect-square rounded-xl text-xs font-semibold transition-colors focus:outline-none',
                      day === form.date ? 'bg-orange-500 text-white' :
                      day === today    ? 'border border-orange-300 text-orange-500 hover:bg-orange-50' :
                      day < today      ? 'text-gray-200 cursor-not-allowed' :
                                         'text-gray-700 hover:bg-gray-100'
                    ]"
                  >{{ Number(day.split('-')[2]) }}</button>
                  <div v-else />
                </div>
              </div>
            </div>

            <!-- Step 2: Time slots or no-services -->
            <div v-else class="flex-1 overflow-auto p-4 flex flex-col gap-4">
              <!-- Selected date recap -->
              <button type="button" @click="pickerStep = 'date'" class="flex items-center gap-2 text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors self-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {{ formatDateLabel(form.date) }}
              </button>

              <!-- No services warning -->
              <div v-if="isSelectedToday && !hasUpcomingService" class="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ t({
                  nl: 'Er zijn vandaag geen services meer beschikbaar. Kies een andere datum.',
                  fr: "Il n'y a plus de services disponibles aujourd'hui. Veuillez choisir une autre date."
                }) }}</span>
              </div>

              <!-- Time slot groups -->
              <div v-else v-for="group in timeSlotGroups" :key="group.nameNl" class="space-y-2">
                <p class="text-xs font-bold tracking-widest uppercase text-gray-400">
                  {{ t({ nl: group.nameNl, fr: group.nameFr }) }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="slot in group.slots"
                    :key="slot.time"
                    type="button"
                    :disabled="slot.disabled"
                    @click="selectTime(slot.time)"
                    :class="[
                      'px-3.5 py-2 rounded-xl border text-sm font-semibold transition-colors focus:outline-none',
                      form.time === slot.time
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : slot.disabled
                        ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50'
                    ]"
                  >{{ slot.time }}</button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Quantity -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1.5">
          {{ t({ nl: 'Aantal personen', fr: 'Nombre de personnes' }) }}
          <span class="text-gray-400 font-normal ml-1">{{ t({ nl: '(min. 10)', fr: '(min. 10)' }) }}</span>
        </label>
        <input v-model.number="form.quantity" type="number" min="10" :placeholder="t({ nl: 'Bijv. 15', fr: 'Ex. 15' })" :class="inputClass('quantity')" />
        <p v-if="errors.quantity" class="text-red-400 text-xs mt-1">{{ errors.quantity }}</p>
      </div>

      <!-- Notes -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1.5">
          {{ t({ nl: 'Opmerkingen', fr: 'Remarques' }) }}
          <span class="text-gray-400 font-normal ml-1">{{ t({ nl: '(optioneel)', fr: '(optionnel)' }) }}</span>
        </label>
        <textarea
          v-model="form.notes"
          rows="3"
          :placeholder="t({ nl: 'Allergieën, speciale wensen...', fr: 'Allergies, souhaits particuliers...' })"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none"
        />
      </div>

      <button
        type="submit"
        :disabled="loading || (isSelectedToday && !hasUpcomingService)"
        class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 22 6.477 22 12h-4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        {{ loading ? t({ nl: 'Verzenden...', fr: 'Envoi...' }) : t({ nl: 'Reservatie aanvragen', fr: 'Demander une réservation' }) }}
      </button>
    </form>
  </div>

  <!-- Backdrop for desktop dropdown -->
  <div v-if="showPicker" class="hidden sm:block fixed inset-0 z-20" @click="closePicker" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang'

const { lang, t } = useLang()

// ── Helpers ───────────────────────────────────────────────────────────────────

function toMin(s: string) {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + m
}

function formatTime(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

// ── Form state ────────────────────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0]
const form = ref({ name: '', email: '', date: '', time: '', quantity: null as number | null, notes: '' })
const errors = ref<Record<string, string>>({})
const loading = ref(false)
const submitted = ref(false)

// ── Picker state ──────────────────────────────────────────────────────────────

const showPicker = ref(false)
const pickerStep = ref<'date' | 'time'>('date')
const pickerAnchorEl = ref<HTMLElement | null>(null)

function openPicker() {
  pickerStep.value = form.value.date ? 'time' : 'date'
  showPicker.value = true
}

function closePicker() {
  showPicker.value = false
}

const pickerLabel = computed(() => {
  if (!form.value.date) return ''
  if (!form.value.time) return formatDateLabel(form.value.date)
  return `${formatDateLabel(form.value.date)} · ${form.value.time}`
})

// ── Calendar ──────────────────────────────────────────────────────────────────

const calendarCursor = ref(new Date())

const MONTHS = {
  nl: ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'],
  fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
}
const WEEKDAYS = {
  nl: ['Ma','Di','Wo','Do','Vr','Za','Zo'],
  fr: ['Lu','Ma','Me','Je','Ve','Sa','Di'],
}

const weekdays = computed(() => WEEKDAYS[lang.value])
const calendarMonthLabel = computed(() =>
  `${MONTHS[lang.value][calendarCursor.value.getMonth()]} ${calendarCursor.value.getFullYear()}`
)

const calendarDays = computed(() => {
  const y = calendarCursor.value.getFullYear()
  const m = calendarCursor.value.getMonth()
  const firstDow = new Date(y, m, 1).getDay()
  const offset = firstDow === 0 ? 6 : firstDow - 1
  const days: (string | null)[] = Array(offset).fill(null)
  for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++) {
    days.push(`${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
  }
  return days
})

function prevMonth() {
  const d = new Date(calendarCursor.value)
  d.setMonth(d.getMonth() - 1)
  calendarCursor.value = d
}

function nextMonth() {
  const d = new Date(calendarCursor.value)
  d.setMonth(d.getMonth() + 1)
  calendarCursor.value = d
}

function selectDate(dateStr: string) {
  if (dateStr < today) return
  form.value.date = dateStr
  form.value.time = ''
  pickerStep.value = 'time'
}

function selectTime(time: string) {
  form.value.time = time
  closePicker()
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return `${d.getDate()} ${MONTHS[lang.value][d.getMonth()]} ${d.getFullYear()}`
}

// ── Service schedule ──────────────────────────────────────────────────────────

interface Service { start: number; end: number; nameNl: string; nameFr: string }
type ServiceStatus = 'upcoming' | 'ongoing' | 'passed'

const schedule: Record<number, Service[]> = {
  0: [{ start: toMin('11:00'), end: toMin('17:00'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('23:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
  1: [{ start: toMin('11:00'), end: toMin('14:30'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('22:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
  2: [{ start: toMin('11:00'), end: toMin('14:30'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('22:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
  3: [{ start: toMin('11:00'), end: toMin('14:30'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('22:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
  4: [{ start: toMin('11:00'), end: toMin('14:30'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('22:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
  5: [{ start: toMin('11:00'), end: toMin('14:30'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('23:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
  6: [{ start: toMin('11:00'), end: toMin('17:00'), nameNl: 'Lunch', nameFr: 'Déjeuner' }, { start: toMin('17:00'), end: toMin('23:00'), nameNl: 'Diner', nameFr: 'Dîner' }],
}

const selectedDayServices = computed((): Service[] => {
  if (!form.value.date) return []
  return schedule[new Date(form.value.date + 'T12:00:00').getDay()] ?? []
})

const isSelectedToday = computed(() => form.value.date === today)

const currentMinutes = computed(() => {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
})

function getServiceStatus(service: Service): ServiceStatus {
  if (!isSelectedToday.value) return 'upcoming'
  const cur = currentMinutes.value
  if (cur >= service.end) return 'passed'
  if (cur >= service.start) return 'ongoing'
  return 'upcoming'
}

const hasUpcomingService = computed(() => {
  if (!isSelectedToday.value) return true
  return selectedDayServices.value.some(s => getServiceStatus(s) === 'upcoming')
})

const timeSlotGroups = computed(() =>
  selectedDayServices.value.map(service => {
    const status = getServiceStatus(service)
    const slots: { time: string; disabled: boolean }[] = []
    for (let mins = service.start; mins < service.end; mins += 30) {
      slots.push({
        time: formatTime(mins),
        disabled: status === 'passed' || status === 'ongoing' || (isSelectedToday.value && mins <= currentMinutes.value),
      })
    }
    return { nameNl: service.nameNl, nameFr: service.nameFr, slots }
  })
)

// ── Shared ────────────────────────────────────────────────────────────────────

function inputClass(field: string) {
  const base = 'w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400'
  return errors.value[field] ? `${base} border-red-300 bg-red-50` : `${base} border-gray-200 bg-gray-50 focus:bg-white`
}

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!form.value.name.trim())
    e.name = t({ nl: 'Naam is verplicht', fr: 'Le nom est requis' })
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    e.email = t({ nl: 'Geldig e-mailadres vereist', fr: 'Adresse e-mail valide requise' })
  if (!form.value.date)
    e.date = t({ nl: 'Kies een datum en tijdstip', fr: 'Choisissez une date et une heure' })
  else if (!form.value.time)
    e.time = t({ nl: 'Kies nog een tijdstip', fr: 'Choisissez encore une heure' })
  if (!form.value.quantity || form.value.quantity < 10)
    e.quantity = t({ nl: 'Minimum 10 personen', fr: 'Minimum 10 personnes' })
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return
  loading.value = true
  try {
    await fetch('/api/reservaties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        date: `${form.value.date}T${form.value.time}:00`,
        time: form.value.time,
        quantity: form.value.quantity,
        notes: form.value.notes,
      }),
    })
    submitted.value = true
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function reset() {
  submitted.value = false
  form.value = { name: '', email: '', date: '', time: '', quantity: null, notes: '' }
  errors.value = {}
}
</script>

<style scoped>
.picker-enter-active { transition: all 0.2s ease; }
.picker-leave-active { transition: all 0.15s ease; }
.picker-enter-from, .picker-leave-to { opacity: 0; transform: translateY(6px); }
/* On mobile the fullscreen slides up from bottom */
@media (max-width: 639px) {
  .picker-enter-from, .picker-leave-to { opacity: 1; transform: translateY(100%); }
}
</style>
