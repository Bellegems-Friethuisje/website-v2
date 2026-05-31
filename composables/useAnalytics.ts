type GtagFn = (...args: unknown[]) => void

function gtag(...args: unknown[]) {
  const w = window as Window & { gtag?: GtagFn }
  w.gtag?.(...args)
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag('event', name, params)
}

