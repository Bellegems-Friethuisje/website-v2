import { ref, onMounted, onUnmounted, type Ref } from 'vue'

// One observer instance shared across every card on the page.
// IntersectionObserver batches all intersection checks into a single callback,
// so N cards = same cost as 1 card, instead of N separate observers.
let _observer: IntersectionObserver | null = null
const _callbacks = new Map<Element, () => void>()

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null
  if (!_observer) {
    _observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          _callbacks.get(entry.target)?.()
          _callbacks.delete(entry.target)
          _observer!.unobserve(entry.target)
        }
      },
      { rootMargin: '500px' }, // fetch 500px before the card enters view
    )
  }
  return _observer
}

export function useLazyImage(containerEl: Ref<HTMLElement | null>, src: string | undefined) {
  const imgSrc = ref<string | undefined>(undefined)
  const imgLoaded = ref(false)

  onMounted(() => {
    if (!src || !containerEl.value) return
    const observer = getObserver()
    if (!observer) return
    _callbacks.set(containerEl.value, () => { imgSrc.value = src })
    observer.observe(containerEl.value)
  })

  onUnmounted(() => {
    if (!containerEl.value) return
    _callbacks.delete(containerEl.value)
    _observer?.unobserve(containerEl.value)
  })

  return { imgSrc, imgLoaded }
}
