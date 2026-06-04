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

function getParam(req, key) {
  const url = new URL(req.url || '/', 'http://localhost')
  return url.searchParams.get(key)
}

const EMPTY = { prices: {}, hidden: [], custom: [], customCategories: [] }

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const location = getParam(req, 'location') || 'bellegems'
    const cacheKey = `menu_state_cache_${location}`
    const stateKey = `menu_state_${location}`

    try {
      const cached = await redis('GET', cacheKey)
      if (cached) return res.status(200).json(JSON.parse(cached))

      let stored = await redis('GET', stateKey)
      let state

      if (stored) {
        state = { ...EMPTY, ...JSON.parse(stored) }
      } else if (location === 'bellegems') {
        const old = await redis('GET', 'menu_price_overrides')
        state = { ...EMPTY, prices: old ? JSON.parse(old) : {} }
      } else {
        state = { ...EMPTY }
      }

      await redis('SETEX', cacheKey, 300, JSON.stringify(state))
      return res.status(200).json(state)
    } catch {
      return res.status(200).json(EMPTY)
    }
  }

  if (req.method === 'POST') {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
    if (!ADMIN_PASSWORD || req.headers.authorization !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { location, prices, hidden, custom, customCategories } = req.body ?? {}
    if (!location) return res.status(400).json({ error: 'Missing location' })

    const stateKey = `menu_state_${location}`
    const cacheKey = `menu_state_cache_${location}`

    try {
      const state = { prices: prices ?? {}, hidden: hidden ?? [], custom: custom ?? [], customCategories: customCategories ?? [] }
      await redis('SET', stateKey, JSON.stringify(state))
      await redis('DEL', cacheKey)
      return res.status(200).json({ success: true })
    } catch {
      return res.status(500).json({ error: 'Storage error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
