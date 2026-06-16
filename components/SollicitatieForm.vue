<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
    <!-- Success -->
    <div v-if="submitted" class="text-center py-10">
      <p class="text-4xl mb-4">🎉</p>
      <h2 class="text-2xl font-extrabold text-gray-900 mb-2">Sollicitatie verstuurd!</h2>
      <p class="text-gray-500 mb-6">We nemen zo snel mogelijk contact met je op.</p>
      <button
        @click="reset"
        class="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
      >
        Nieuwe sollicitatie
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submit" novalidate class="space-y-8">

      <!-- Persoonlijke gegevens -->
      <section>
        <h3 class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Persoonlijke gegevens</h3>
        <div class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Voornaam</label>
              <input v-model="form.voornaam" type="text" autocomplete="given-name" placeholder="Jouw voornaam" :class="inputClass('voornaam')" />
              <p v-if="errors.voornaam" class="text-red-400 text-xs mt-1">{{ errors.voornaam }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Naam</label>
              <input v-model="form.naam" type="text" autocomplete="family-name" placeholder="Jouw achternaam" :class="inputClass('naam')" />
              <p v-if="errors.naam" class="text-red-400 text-xs mt-1">{{ errors.naam }}</p>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Geboortedatum</label>
              <input v-model="form.geboortedatum" type="date" :class="inputClass('geboortedatum')" />
              <p v-if="errors.geboortedatum" class="text-red-400 text-xs mt-1">{{ errors.geboortedatum }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Geboorteplaats</label>
              <input v-model="form.geboorteplaats" type="text" placeholder="Bijv. Kortrijk" :class="inputClass('geboorteplaats')" />
              <p v-if="errors.geboorteplaats" class="text-red-400 text-xs mt-1">{{ errors.geboorteplaats }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Adres</label>
            <input v-model="form.adres" type="text" autocomplete="street-address" placeholder="Straat en huisnummer, postcode, gemeente" :class="inputClass('adres')" />
            <p v-if="errors.adres" class="text-red-400 text-xs mt-1">{{ errors.adres }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">E-mailadres</label>
            <input v-model="form.email" type="email" autocomplete="email" placeholder="jouw@email.be" :class="inputClass('email')" />
            <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">GSM-nummer</label>
              <input v-model="form.gsm" type="tel" autocomplete="tel" placeholder="04xx xx xx xx" :class="inputClass('gsm')" />
              <p v-if="errors.gsm" class="text-red-400 text-xs mt-1">{{ errors.gsm }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Burgerlijke staat</label>
              <select v-model="form.burgerlijkeStaat" :class="inputClass('burgerlijkeStaat')">
                <option value="" disabled>Kies een optie</option>
                <option value="ongehuwd">Ongehuwd</option>
                <option value="gehuwd">Gehuwd</option>
                <option value="samenwonend">Wettelijk samenwonend</option>
                <option value="gescheiden">Gescheiden</option>
                <option value="weduwnaar">Weduwnaar / weduwe</option>
              </select>
              <p v-if="errors.burgerlijkeStaat" class="text-red-400 text-xs mt-1">{{ errors.burgerlijkeStaat }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Administratieve gegevens -->
      <section>
        <h3 class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Administratieve gegevens</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Rijksregisternummer</label>
            <input v-model="form.rijksregister" type="text" placeholder="YY.MM.DD-XXX.CC" :class="inputClass('rijksregister')" />
            <p v-if="errors.rijksregister" class="text-red-400 text-xs mt-1">{{ errors.rijksregister }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Bankrekeningnummer</label>
            <input v-model="form.bankrekening" type="text" placeholder="BExx xxxx xxxx xxxx" :class="inputClass('bankrekening')" />
            <p v-if="errors.bankrekening" class="text-red-400 text-xs mt-1">{{ errors.bankrekening }}</p>
          </div>
        </div>
      </section>

      <!-- Taalkennis -->
      <section>
        <h3 class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Taalkennis</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Kennis Nederlands</label>
            <select v-model="form.kennisNederlands" :class="inputClass('kennisNederlands')">
              <option value="" disabled>Kies niveau</option>
              <option value="geen">Geen</option>
              <option value="basis">Basis</option>
              <option value="goed">Goed</option>
              <option value="zeer goed">Zeer goed</option>
              <option value="moedertaal">Moedertaal</option>
            </select>
            <p v-if="errors.kennisNederlands" class="text-red-400 text-xs mt-1">{{ errors.kennisNederlands }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Kennis Frans</label>
            <select v-model="form.kennisFrans" :class="inputClass('kennisFrans')">
              <option value="" disabled>Kies niveau</option>
              <option value="geen">Geen</option>
              <option value="basis">Basis</option>
              <option value="goed">Goed</option>
              <option value="zeer goed">Zeer goed</option>
              <option value="moedertaal">Moedertaal</option>
            </select>
            <p v-if="errors.kennisFrans" class="text-red-400 text-xs mt-1">{{ errors.kennisFrans }}</p>
          </div>
        </div>
      </section>

      <!-- Motivatie & bijlagen -->
      <section>
        <h3 class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Motivatie & bijlagen</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Hobby's
              <span class="text-gray-400 font-normal ml-1">(optioneel)</span>
            </label>
            <textarea
              v-model="form.hobbys"
              rows="3"
              placeholder="Vertel iets over je interesses en vrijetijdsbesteding..."
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Motivatie</label>
            <textarea
              v-model="form.motivatie"
              rows="5"
              placeholder="Waarom wil je bij Bellegems Friethuisje werken?"
              :class="[
                'w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none',
                errors.motivatie ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white',
              ]"
            />
            <p v-if="errors.motivatie" class="text-red-400 text-xs mt-1">{{ errors.motivatie }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">CV</label>
            <label
              :class="[
                'flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm cursor-pointer transition-colors',
                errors.cv
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 bg-gray-50 hover:border-orange-400 hover:bg-orange-50/30',
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span :class="cvFileName ? 'text-gray-900' : 'text-gray-400'">
                {{ cvFileName || 'Kies een bestand (PDF of Word)' }}
              </span>
              <input type="file" accept=".pdf,.doc,.docx" class="sr-only" @change="onFileChange" />
            </label>
            <p v-if="errors.cv" class="text-red-400 text-xs mt-1">{{ errors.cv }}</p>
          </div>
        </div>
      </section>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 22 6.477 22 12h-4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        {{ loading ? 'Verzenden...' : 'Sollicitatie versturen' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  voornaam: '',
  naam: '',
  geboortedatum: '',
  geboorteplaats: '',
  adres: '',
  gsm: '',
  email: '',
  burgerlijkeStaat: '',
  rijksregister: '',
  bankrekening: '',
  kennisNederlands: '',
  kennisFrans: '',
  hobbys: '',
  motivatie: '',
})

const cvFile = ref<File | null>(null)
const cvFileName = ref('')
const errors = ref<Record<string, string>>({})
const loading = ref(false)
const submitted = ref(false)

function inputClass(field: string) {
  const base = 'w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400'
  return errors.value[field]
    ? `${base} border-red-300 bg-red-50`
    : `${base} border-gray-200 bg-gray-50 focus:bg-white`
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null
  cvFile.value = file
  cvFileName.value = file?.name ?? ''
  if (errors.value.cv) delete errors.value.cv
}

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!form.value.voornaam.trim()) e.voornaam = 'Voornaam is verplicht'
  if (!form.value.naam.trim()) e.naam = 'Naam is verplicht'
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) e.email = 'Geldig e-mailadres vereist'
  if (!form.value.geboortedatum) e.geboortedatum = 'Geboortedatum is verplicht'
  if (!form.value.geboorteplaats.trim()) e.geboorteplaats = 'Geboorteplaats is verplicht'
  if (!form.value.adres.trim()) e.adres = 'Adres is verplicht'
  if (!form.value.gsm.trim()) e.gsm = 'GSM-nummer is verplicht'
  if (!form.value.burgerlijkeStaat) e.burgerlijkeStaat = 'Burgerlijke staat is verplicht'
  if (!form.value.rijksregister.trim()) e.rijksregister = 'Rijksregisternummer is verplicht'
  if (!form.value.bankrekening.trim()) e.bankrekening = 'Bankrekeningnummer is verplicht'
  if (!form.value.kennisNederlands) e.kennisNederlands = 'Kies een niveau'
  if (!form.value.kennisFrans) e.kennisFrans = 'Kies een niveau'
  if (!form.value.motivatie.trim()) e.motivatie = 'Motivatie is verplicht'
  if (!cvFile.value) e.cv = 'Voeg je CV toe'
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return
  loading.value = true
  try {
    const data = new FormData()
    Object.entries(form.value).forEach(([k, v]) => data.append(k, v))
    data.append('cv', cvFile.value!)
    await fetch('https://ordermailing.bellegemsfriethuisje.be/api/sollicitaties', {
      method: 'POST',
      body: data,
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
  form.value = {
    voornaam: '',
    naam: '',
    geboortedatum: '',
    geboorteplaats: '',
    adres: '',
    gsm: '',
    email: '',
    burgerlijkeStaat: '',
    rijksregister: '',
    bankrekening: '',
    kennisNederlands: '',
    kennisFrans: '',
    hobbys: '',
    motivatie: '',
  }
  cvFile.value = null
  cvFileName.value = ''
  errors.value = {}
}
</script>
