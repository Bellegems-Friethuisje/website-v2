import { ref } from 'vue'

export type Lang = 'nl' | 'fr'

const lang = ref<Lang>('nl')

export function useLang() {
  const t = (translations: Record<Lang, string>): string => translations[lang.value]
  const setLang = (l: Lang) => { lang.value = l }
  return { lang, t, setLang }
}
