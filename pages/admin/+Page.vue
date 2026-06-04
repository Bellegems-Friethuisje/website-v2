<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Login screen -->
    <div v-if="!authenticated" class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Prijsbeheer</h1>
        <p class="text-sm text-gray-400 mb-6">Voer het beheerderswachtwoord in.</p>
        <form @submit.prevent="login">
          <input
            v-model="passwordInput"
            type="password"
            placeholder="Wachtwoord"
            autocomplete="current-password"
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent mb-3"
          />
          <p v-if="loginError" class="text-red-500 text-sm mb-3">{{ loginError }}</p>
          <button
            type="submit"
            :disabled="logging"
            class="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm"
          >
            {{ logging ? 'Even wachten…' : 'Inloggen' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Editor -->
    <div v-else class="max-w-4xl mx-auto px-4 py-10">

      <!-- Top bar -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Menu beheren</h1>
          <p class="text-sm text-gray-400 mt-1">Wijzigingen zijn direct zichtbaar op de menukaart.</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="logout" class="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Uitloggen
          </button>
          <button
            @click="save"
            :disabled="saving || loading"
            class="bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm"
          >
            {{ saving ? 'Opslaan…' : 'Opslaan' }}
          </button>
        </div>
      </div>

      <!-- Save feedback -->
      <div
        v-if="saveStatus"
        :class="['mb-6 px-4 py-3 rounded-xl text-sm font-medium', saveStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100']"
      >
        {{ saveStatus === 'success' ? '✓ Opgeslagen en direct zichtbaar.' : '✕ Fout bij opslaan.' }}
      </div>

      <!-- Location tabs -->
      <div class="flex gap-2 mb-8">
        <button
          v-for="loc in allLocations"
          :key="loc.id"
          @click="switchLocation(loc.id)"
          :class="['px-4 py-2 rounded-xl text-sm font-bold transition-colors', activeLocation === loc.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
        >
          {{ loc.name }}
        </button>
      </div>

      <!-- Add product / category buttons -->
      <div class="flex gap-3 mb-8">
        <button
          @click="addProductForm.show = !addProductForm.show; addCatForm.show = false"
          :class="['px-4 py-2 rounded-xl text-sm font-bold transition-colors', addProductForm.show ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300']"
        >
          + Product toevoegen
        </button>
        <button
          @click="addCatForm.show = !addCatForm.show; addProductForm.show = false"
          :class="['px-4 py-2 rounded-xl text-sm font-bold transition-colors', addCatForm.show ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300']"
        >
          + Categorie toevoegen
        </button>
      </div>

      <!-- Add product form -->
      <div v-if="addProductForm.show" class="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
        <h3 class="text-sm font-bold text-gray-700 mb-4">Nieuw product</h3>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <input v-model="addProductForm.emoji" placeholder="Emoji" maxlength="4" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model.number="addProductForm.price" type="number" step="0.10" min="0" placeholder="Prijs (€)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model="addProductForm.nameNl" placeholder="Naam (NL)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model="addProductForm.nameFr" placeholder="Naam (FR)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model="addProductForm.descNl" placeholder="Omschrijving (NL)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model="addProductForm.descFr" placeholder="Omschrijving (FR)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <div class="flex items-center gap-2">
            <label class="flex-1 cursor-pointer">
              <span :class="['block border border-gray-200 rounded-lg px-3 py-2 text-sm truncate', addProductForm.image ? 'text-green-600' : 'text-gray-400']">
                {{ addProductForm.imageUploading ? 'Uploaden…' : addProductForm.image ? addProductForm.image : 'Afbeelding uploaden…' }}
              </span>
              <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" :disabled="addProductForm.imageUploading" />
            </label>
            <button v-if="addProductForm.image" @click="addProductForm.image = ''" type="button" class="text-gray-300 hover:text-red-400 text-xs">✕</button>
          </div>
          <select v-model="addProductForm.category" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
            <option value="">Selecteer categorie</option>
            <option v-for="cat in allCategories" :key="cat.id" :value="cat.id">{{ cat.emoji }} {{ cat.nl }}</option>
          </select>
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-600 mb-4 cursor-pointer">
          <input type="checkbox" v-model="addProductForm.childVersion" class="rounded accent-orange-500" />
          Kinderportie beschikbaar
        </label>
        <div class="flex gap-2">
          <button @click="addProduct" :disabled="!addProductForm.nameNl || !addProductForm.category" class="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-40 transition-colors">
            Toevoegen
          </button>
          <button @click="addProductForm.show = false" class="text-sm text-gray-400 hover:text-gray-600 px-4 py-2">
            Annuleren
          </button>
        </div>
      </div>

      <!-- Add category form -->
      <div v-if="addCatForm.show" class="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
        <h3 class="text-sm font-bold text-gray-700 mb-4">Nieuwe categorie</h3>
        <div class="grid grid-cols-3 gap-3 mb-3">
          <input v-model="addCatForm.emoji" placeholder="Emoji" maxlength="4" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model="addCatForm.nl" placeholder="Naam (NL)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <input v-model="addCatForm.fr" placeholder="Naam (FR)" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div class="flex gap-2">
          <button @click="addCategory" :disabled="!addCatForm.nl" class="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-40 transition-colors">
            Toevoegen
          </button>
          <button @click="addCatForm.show = false" class="text-sm text-gray-400 hover:text-gray-600 px-4 py-2">
            Annuleren
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20 text-gray-400 text-sm">Laden…</div>

      <!-- Categories -->
      <template v-else>
        <div v-for="cat in allCategories" :key="cat.id" class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xs font-bold uppercase tracking-widest text-gray-400">
              {{ cat.emoji }} {{ cat.nl }}
            </h2>
            <button
              v-if="isCustomCategory(cat.id)"
              @click="removeCategory(cat.id)"
              class="text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              Verwijder categorie
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <!-- Base items -->
            <div
              v-for="(item, idx) in baseItemsByCategory(cat.id)"
              :key="item.id"
              :class="['flex items-center gap-4 px-5 py-3.5 transition-opacity', idx > 0 || customItemsByCategory(cat.id).length > 0 ? 'border-t border-gray-50' : '', isHidden(item.id) ? 'opacity-40' : '']"
            >
              <span class="text-lg w-6 shrink-0">{{ item.emoji ?? '🍽️' }}</span>
              <span :class="['flex-1 text-sm font-medium', isHidden(item.id) ? 'line-through text-gray-400' : 'text-gray-800']">{{ item.nl.name }}</span>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-gray-400 text-sm">€</span>
                <input
                  type="number" step="0.10" min="0" max="99.99"
                  :value="getPrice(item).toFixed(2)"
                  :disabled="isHidden(item.id)"
                  @change="setPrice(item.id, $event)"
                  class="w-20 text-right border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-40"
                />
              </div>
              <button
                @click="toggleHide(item.id)"
                :title="isHidden(item.id) ? 'Tonen' : 'Verbergen'"
                :class="['text-sm transition-colors', isHidden(item.id) ? 'text-orange-400 hover:text-orange-600' : 'text-gray-300 hover:text-red-400']"
              >
                {{ isHidden(item.id) ? '👁' : '🚫' }}
              </button>
            </div>

            <!-- Custom items -->
            <div
              v-for="(item, idx) in customItemsByCategory(cat.id)"
              :key="item.id"
              :class="['flex items-center gap-4 px-5 py-3.5 bg-orange-50/40', 'border-t border-gray-50']"
            >
              <span class="text-lg w-6 shrink-0">{{ item.emoji ?? '🍽️' }}</span>
              <span class="flex-1 text-sm font-medium text-gray-800">{{ item.nl.name }}</span>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-gray-400 text-sm">€</span>
                <input
                  type="number" step="0.10" min="0" max="99.99"
                  :value="Number(item.price).toFixed(2)"
                  @change="setCustomPrice(item.id, $event)"
                  class="w-20 text-right border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <button
                @click="removeCustomItem(item.id)"
                title="Verwijderen"
                class="text-sm text-gray-300 hover:text-red-400 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import bellegems from '../../data/locations/bellegems.json'
import takeaway from '../../data/locations/takeaway.json'

const allLocations = [bellegems, takeaway]

const password = ref('')
const passwordInput = ref('')
const loginError = ref('')
const logging = ref(false)
const loading = ref(false)
const saving = ref(false)
const saveStatus = ref<'success' | 'error' | null>(null)
const authenticated = ref(false)
const activeLocation = ref(bellegems.id)

// Per-location state
const prices = ref<Record<string, number>>({})
const hiddenIds = ref<number[]>([])
const customItems = ref<any[]>([])
const customCategories = ref<any[]>([])

const addProductForm = ref({ show: false, emoji: '', nameNl: '', nameFr: '', descNl: '', descFr: '', image: '', imageUploading: false, price: '' as number | '', category: '', childVersion: false })
const addCatForm = ref({ show: false, emoji: '', nl: '', fr: '' })

const currentLoc = computed(() => allLocations.find(l => l.id === activeLocation.value) ?? allLocations[0])

const allCategories = computed(() => [
  ...(currentLoc.value.categories ?? []),
  ...customCategories.value,
])

function baseItemsByCategory(catId: string) {
  return (currentLoc.value.menu as any[]).filter(i => i.id && i.category === catId)
}

function customItemsByCategory(catId: string) {
  return customItems.value.filter(i => i.category === catId)
}

function isCustomCategory(catId: string) {
  return customCategories.value.some(c => c.id === catId)
}

function isHidden(id: number) {
  return hiddenIds.value.includes(id)
}

function toggleHide(id: number) {
  const idx = hiddenIds.value.indexOf(id)
  if (idx >= 0) hiddenIds.value.splice(idx, 1)
  else hiddenIds.value.push(id)
}

function getPrice(item: { id: number; price: number }) {
  return prices.value[String(item.id)] ?? item.price
}

function setPrice(id: number, event: Event) {
  const val = parseFloat((event.target as HTMLInputElement).value)
  if (!isNaN(val) && val >= 0) prices.value[String(id)] = Math.round(val * 100) / 100
}

function setCustomPrice(id: string, event: Event) {
  const val = parseFloat((event.target as HTMLInputElement).value)
  if (!isNaN(val) && val >= 0) {
    const item = customItems.value.find(i => i.id === id)
    if (item) item.price = Math.round(val * 100) / 100
  }
}

async function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  addProductForm.value.imageUploading = true
  try {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: { Authorization: `Bearer ${password.value}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, content: base64 }),
    })
    if (res.ok) {
      const { path } = await res.json()
      addProductForm.value.image = path
    }
  } catch {}
  addProductForm.value.imageUploading = false
}

function addProduct() {
  const f = addProductForm.value
  if (!f.nameNl || !f.category) return
  const item: any = {
    id: `c_${Date.now()}`,
    category: f.category,
    emoji: f.emoji || '🍽️',
    nl: { name: f.nameNl, ...(f.descNl && { description: f.descNl }) },
    fr: { name: f.nameFr || f.nameNl, ...(f.descFr && { description: f.descFr }) },
    price: Math.round((Number(f.price) || 0) * 100) / 100,
  }
  if (f.image) item.image = f.image
  if (f.childVersion) item.childVersion = true
  customItems.value.push(item)
  addProductForm.value = { show: false, emoji: '', nameNl: '', nameFr: '', descNl: '', descFr: '', image: '', imageUploading: false, price: '', category: '', childVersion: false }
}

function removeCustomItem(id: string) {
  customItems.value = customItems.value.filter(i => i.id !== id)
}

function addCategory() {
  const f = addCatForm.value
  if (!f.nl) return
  const id = f.nl.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
  if (allCategories.value.find(c => c.id === id)) return
  customCategories.value.push({ id, emoji: f.emoji || '📋', nl: f.nl, fr: f.fr || f.nl })
  addCatForm.value = { show: false, emoji: '', nl: '', fr: '' }
}

function removeCategory(id: string) {
  customCategories.value = customCategories.value.filter(c => c.id !== id)
  customItems.value = customItems.value.filter(i => i.category !== id)
}

onMounted(() => {
  const saved = sessionStorage.getItem('admin_pw')
  if (saved) {
    password.value = saved
    authenticated.value = true
    loadState()
  }
})

async function switchLocation(id: string) {
  activeLocation.value = id
  await loadState()
}

async function loadState() {
  loading.value = true
  try {
    const res = await fetch(`/api/menu-prices?location=${activeLocation.value}`)
    if (res.ok) {
      const data = await res.json()
      prices.value = data.prices ?? {}
      hiddenIds.value = data.hidden ?? []
      customItems.value = data.custom ?? []
      customCategories.value = data.customCategories ?? []
    }
  } catch {}
  loading.value = false
}

async function login() {
  if (!passwordInput.value) return
  logging.value = true
  loginError.value = ''
  try {
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { Authorization: `Bearer ${passwordInput.value}` }
    })
    if (res.ok) {
      password.value = passwordInput.value
      sessionStorage.setItem('admin_pw', passwordInput.value)
      passwordInput.value = ''
      authenticated.value = true
      await loadState()
    } else {
      const data = await res.json().catch(() => ({}))
      loginError.value = data.error || 'Ongeldig wachtwoord.'
    }
  } catch {
    loginError.value = 'Verbindingsfout.'
  } finally {
    logging.value = false
  }
}

function logout() {
  sessionStorage.removeItem('admin_pw')
  authenticated.value = false
  password.value = ''
  prices.value = {}
  hiddenIds.value = []
  customItems.value = []
  customCategories.value = []
}

async function save() {
  saving.value = true
  saveStatus.value = null
  try {
    const res = await fetch('/api/menu-prices', {
      method: 'POST',
      headers: { Authorization: `Bearer ${password.value}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: activeLocation.value,
        prices: prices.value,
        hidden: hiddenIds.value,
        custom: customItems.value,
        customCategories: customCategories.value,
      })
    })
    saveStatus.value = res.ok ? 'success' : 'error'
    if (res.status === 401) logout()
  } catch {
    saveStatus.value = 'error'
  } finally {
    saving.value = false
    setTimeout(() => { saveStatus.value = null }, 4000)
  }
}
</script>
