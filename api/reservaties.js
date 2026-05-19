export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, date, time, quantity, notes } = req.body ?? {}

  if (!name || !email || !date || !time || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Log reservation — replace with email/database integration as needed
  console.log('[Reservatie]', { name, email, date, time, quantity, notes })

  return res.status(200).json({ success: true })
}
