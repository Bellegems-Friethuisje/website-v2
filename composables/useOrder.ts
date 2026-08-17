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
const shareId = ref<string | null>(null)
const drawerOpen = ref(false)
let loaded = false

let pusherClient: any = null
let channel: any = null

function persist() {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        locationId: locationId.value,
        locationName: locationName.value,
        items: items.value,
        shareId: shareId.value,
      }),
    )
  } catch {}
}

function applyServerState(state: { locationId: string | null; locationName: string; items: OrderItem[] }) {
  locationId.value = state.locationId
  locationName.value = state.locationName
  items.value = state.items
}

async function subscribeToChannel(id: string) {
  if (typeof window === 'undefined') return
  const { default: Pusher } = await import('pusher-js')
  const key = import.meta.env.PUBLIC_ENV__PUSHER_KEY as string | undefined
  const cluster = import.meta.env.PUBLIC_ENV__PUSHER_CLUSTER as string | undefined
  if (!key || !cluster) return

  if (channel) {
    channel.unbind_all()
    pusherClient?.unsubscribe(channel.name)
  }
  if (!pusherClient) pusherClient = new Pusher(key, { cluster })

  channel = pusherClient.subscribe(`bestelling-${id}`)
  channel.bind('update', applyServerState)
}

async function postAction(action: string, body: Record<string, unknown>) {
  if (!shareId.value) return
  try {
    await fetch(`/api/preorder?id=${shareId.value}&action=${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
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
        shareId.value = data.shareId ?? null
      }
    } catch {}
    watch([items, locationId, locationName, shareId], persist, { deep: true })
    if (shareId.value) subscribeToChannel(shareId.value)
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
      if (shareId.value) postAction('clear', {})
    }
    locationId.value = loc
    locationName.value = locName
    const existing = items.value.find((i) => i.key === item.key)
    if (existing) existing.qty++
    else items.value.push({ ...item, qty: 1 })
    if (shareId.value) postAction('add', { item })
    return true
  }

  function removeItem(key: string) {
    items.value = items.value.filter((i) => i.key !== key)
    if (!items.value.length) locationId.value = null
    if (shareId.value) postAction('remove', { key })
  }

  function setQty(key: string, qty: number) {
    if (qty <= 0) return removeItem(key)
    const existing = items.value.find((i) => i.key === key)
    if (existing) existing.qty = qty
    if (shareId.value) postAction('setQty', { key, qty })
  }

  function clearOrder() {
    items.value = []
    locationId.value = null
    locationName.value = ''
    if (shareId.value) postAction('clear', {})
  }

  async function shareOrder(): Promise<string | null> {
    if (typeof window === 'undefined') return null

    if (!shareId.value) {
      try {
        const res = await fetch('/api/preorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            locationId: locationId.value,
            locationName: locationName.value,
            items: items.value,
          }),
        })
        if (!res.ok) return null
        const data = await res.json()
        shareId.value = data.id
        await subscribeToChannel(data.id)
      } catch {
        return null
      }
    }

    return `${window.location.origin}/bestelling/${shareId.value}`
  }

  async function joinShared(id: string): Promise<boolean> {
    if (typeof window === 'undefined') return false
    try {
      const res = await fetch(`/api/preorder?id=${id}`)
      if (!res.ok) return false
      const data = await res.json()
      shareId.value = id
      applyServerState(data)
      await subscribeToChannel(id)
      return true
    } catch {
      return false
    }
  }

  function openDrawer() {
    drawerOpen.value = true
  }

  function closeDrawer() {
    drawerOpen.value = false
  }

  return {
    items,
    locationId,
    locationName,
    shareId,
    drawerOpen,
    load,
    addItem,
    removeItem,
    setQty,
    clearOrder,
    shareOrder,
    joinShared,
    openDrawer,
    closeDrawer,
  }
}
