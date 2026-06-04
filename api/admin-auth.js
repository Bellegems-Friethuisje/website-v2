const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 900 // 15 minutes

async function redis(...args) {
  const URL = process.env.UPSTASH_REDIS_REST_URL
  const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!URL || !TOKEN) return null
  const res = await fetch(URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  return (await res.json()).result
}

function getIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  return (forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress) || 'unknown'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = getIp(req)
  const key = `auth_fail_${ip}`

  const attempts = await redis('GET', key)
  if (attempts !== null && parseInt(attempts) >= MAX_ATTEMPTS) {
    const ttl = await redis('TTL', key)
    return res.status(429).json({ error: `Te veel pogingen. Probeer opnieuw over ${Math.ceil(ttl / 60)} minuten.` })
  }

  const { ADMIN_PASSWORD } = process.env
  if (!ADMIN_PASSWORD || req.headers.authorization !== `Bearer ${ADMIN_PASSWORD}`) {
    const count = await redis('INCR', key)
    if (count === 1) await redis('EXPIRE', key, LOCKOUT_SECONDS)
    const remaining = MAX_ATTEMPTS - count
    return res.status(401).json({
      error: remaining > 0
        ? `Ongeldig wachtwoord. Nog ${remaining} poging${remaining === 1 ? '' : 'en'}.`
        : `Te veel pogingen. Probeer opnieuw over ${Math.ceil(LOCKOUT_SECONDS / 60)} minuten.`
    })
  }

  await redis('DEL', key)
  return res.status(200).json({ ok: true })
}
