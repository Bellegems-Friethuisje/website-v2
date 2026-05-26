export interface HourEntry {
  nl: string
  fr: string
  time: string
  closed?: boolean
  days?: number[]
}

function parseMinutes(s: string): number {
  const m = s.trim().match(/(\d+)u(\d+)/)
  if (!m) return -1
  return parseInt(m[1]) * 60 + parseInt(m[2])
}

function nowInPeriod(timeStr: string, nowMins: number): boolean {
  if (timeStr === '24u/24') return true
  for (const period of timeStr.split('|')) {
    const parts = period.split('–') // en-dash
    if (parts.length < 2) continue
    const start = parseMinutes(parts[0])
    const end = parseMinutes(parts[1])
    if (start >= 0 && end >= 0 && nowMins >= start && nowMins < end) return true
  }
  return false
}

export function getIsOpen(hours: HourEntry[]): boolean {
  const now = new Date()
  const day = now.getDay()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  const entry = hours.find(h => h.days?.includes(day))
  if (!entry || entry.closed) return false
  return nowInPeriod(entry.time, nowMins)
}
