import { ref, watch } from 'vue'
import { useLang } from './useLang'

export interface OrderItem {
  key: string
  id: number | string
  name: { nl: string; fr: string }
  price: number
  qty: number
  image?: string
  emoji?: string
  category: string
}

const STORAGE_KEY = 'bf-preorder-v1'

const items = ref<OrderItem[]>([])
const locationId = ref<string | null>(null)
const locationName = ref<string>('')
let loaded = false

function persist() {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ locationId: locationId.value, locationName: locationName.value, items: items.value }),
    )
  } catch {}
}

export function useOrder() {
  const { t } = useLang()

  function load() {
    if (loaded || typeof window === 'undefined') return
    loaded = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        items.value = data.items ?? []
        locationId.value = data.locationId ?? null
        locationName.value = data.locationName ?? ''
      }
    } catch {}
    watch([items, locationId, locationName], persist, { deep: true })
  }

  function addItem(item: Omit<OrderItem, 'qty'>, loc: string, locName: string) {
    if (locationId.value && locationId.value !== loc && items.value.length) {
      const ok = window.confirm(
        t({
          nl: 'Je bestelling bevat al items van een andere locatie. Wil je je bestelling wissen en opnieuw beginnen?',
          fr: 'Votre commande contient déjà des articles d\'un autre établissement. Voulez-vous effacer votre commande et recommencer ?',
        }),
      )
      if (!ok) return false
      items.value = []
    }
    locationId.value = loc
    locationName.value = locName
    const existing = items.value.find((i) => i.key === item.key)
    if (existing) existing.qty++
    else items.value.push({ ...item, qty: 1 })
    return true
  }

  function removeItem(key: string) {
    items.value = items.value.filter((i) => i.key !== key)
    if (!items.value.length) locationId.value = null
  }

  function setQty(key: string, qty: number) {
    if (qty <= 0) return removeItem(key)
    const existing = items.value.find((i) => i.key === key)
    if (existing) existing.qty = qty
  }

  function clearOrder() {
    items.value = []
    locationId.value = null
    locationName.value = ''
  }

  return { items, locationId, locationName, load, addItem, removeItem, setQty, clearOrder }
}
