const OWNER = 'Bellegems-Friethuisje'
const REPO = 'website-v2'
const BRANCH = 'master'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD || req.headers.authorization !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) return res.status(500).json({ error: 'GITHUB_TOKEN not configured' })

  const { filename, content } = req.body ?? {}
  if (!filename || !content) return res.status(400).json({ error: 'Missing filename or content' })

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filePath = `public/menu/custom/${safeName}`
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`

  // Check if file exists (need SHA to overwrite)
  let sha
  try {
    const check = await fetch(apiUrl, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } })
    if (check.ok) sha = (await check.json()).sha
  } catch {}

  const body = { message: `Upload menu image: ${safeName}`, content, branch: BRANCH }
  if (sha) body.sha = sha

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json()
    return res.status(500).json({ error: err.message ?? 'GitHub upload failed' })
  }

  return res.status(200).json({ path: `/menu/custom/${safeName}` })
}
