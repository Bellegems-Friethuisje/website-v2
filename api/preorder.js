import Pusher from 'pusher'
import { randomUUID } from 'node:crypto'

async function redis(...args) {
  const URL = process.env.UPSTASH_REDIS_REST_URL
  const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!URL || !TOKEN) return null
  const res = await fetch(URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  })
  return (await res.json()).result
}

let pusher = null
function getPusher() {
  if (pusher) return pusher
  const { PUSHER_APP_ID, PUBLIC_ENV__PUSHER_KEY, PUSHER_SECRET, PUBLIC_ENV__PUSHER_CLUSTER } = process.env
  if (!PUSHER_APP_ID || !PUBLIC_ENV__PUSHER_KEY || !PUSHER_SECRET || !PUBLIC_ENV__PUSHER_CLUSTER) return null
  pusher = new Pusher({
    appId: PUSHER_APP_ID,
    key: PUBLIC_ENV__PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUBLIC_ENV__PUSHER_CLUSTER,
    useTLS: true
  })
  return pusher
}

function getParam(req, key) {
  const url = new URL(req.url || '/', 'http://localhost')
  return url.searchParams.get(key)
}

const TTL_SECONDS = 12 * 60 * 60
const EMPTY = { locationId: null, locationName: '', items: [] }

async function readState(id) {
  const stored = await redis('GET', `bestelling_${id}`)
  return stored ? JSON.parse(stored) : null
}

async function writeState(id, state) {
  await redis('SETEX', `bestelling_${id}`, TTL_SECONDS, JSON.stringify(state))
}

function applyAction(state, action, body) {
  const items = state.items.slice()
  if (action === 'add') {
    const item = body.item
    if (!item || !item.key) return state
    const existing = items.find((i) => i.key === item.key)
    if (existing) existing.qty += 1
    else items.push({ ...item, qty: 1 })
    return { ...state, items }
  }
  if (action === 'setQty') {
    const { key, qty } = body
    if (!key) return state
    if (qty <= 0) return { ...state, items: items.filter((i) => i.key !== key) }
    const existing = items.find((i) => i.key === key)
    if (existing) existing.qty = qty
    return { ...state, items }
  }
  if (action === 'remove') {
    const { key } = body
    return { ...state, items: items.filter((i) => i.key !== key) }
  }
  if (action === 'clear') {
    return { ...EMPTY }
  }
  return state
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const id = getParam(req, 'id')
    if (!id) return res.status(400).json({ error: 'Missing id' })
    try {
      const state = await readState(id)
      if (!state) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(state)
    } catch {
      return res.status(500).json({ error: 'Storage error' })
    }
  }

  if (req.method === 'POST') {
    const id = getParam(req, 'id')
    const action = getParam(req, 'action')
    const body = req.body ?? {}

    try {
      if (!id) {
        const newId = randomUUID().replace(/-/g, '').slice(0, 10)
        const state = {
          locationId: body.locationId ?? null,
          locationName: body.locationName ?? '',
          items: Array.isArray(body.items) ? body.items : []
        }
        await writeState(newId, state)
        return res.status(200).json({ id: newId })
      }

      if (!action) return res.status(400).json({ error: 'Missing action' })

      const current = await readState(id)
      if (!current) return res.status(404).json({ error: 'Not found' })

      const next = applyAction(current, action, body)
      await writeState(id, next)

      const client = getPusher()
      if (client) {
        await client.trigger(`bestelling-${id}`, 'update', next)
      }

      return res.status(200).json(next)
    } catch {
      return res.status(500).json({ error: 'Storage error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
