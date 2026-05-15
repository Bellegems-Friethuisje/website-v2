<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 group">
          <span class="text-2xl transition-transform group-hover:scale-110 inline-block">🍟</span>
          <div class="leading-tight">
            <span class="font-extrabold text-gray-900 text-base block">Bellegems</span>
            <span class="font-extrabold text-orange-500 text-base block -mt-1">Friethuisje</span>
          </div>
        </a>

        <!-- Desktop nav -->
        <div class="hidden lg:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :class="[
              'font-semibold text-sm transition-colors',
              isActive(link.href) ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
            ]"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Language toggle + mobile button -->
        <div class="flex items-center gap-3">
          <div class="flex items-center bg-gray-100 rounded-full p-0.5">
            <button
              @click="setLang('nl')"
              :class="lang === 'nl' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'"
              class="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            >NL</button>
            <button
              @click="setLang('fr')"
              :class="lang === 'fr' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'"
              class="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            >FR</button>
          </div>

          <button
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="lg:hidden bg-white border-t border-gray-100">
        <div class="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="mobileOpen = false"
            :class="[
              'px-4 py-3 rounded-xl font-semibold text-sm transition-colors',
              isActive(link.href) ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageContext } from 'vike-vue/usePageContext'
import { useLang } from '../composables/useLang'

const { lang, t, setLang } = useLang()
const pageContext = usePageContext()
const mobileOpen = ref(false)

const navLinks = computed(() => [
  { href: '/', label: t({ nl: 'Home', fr: 'Accueil' }) },
  { href: '/menu', label: t({ nl: 'Ons menu', fr: 'Notre menu' }) },
  { href: '/locaties', label: t({ nl: 'Locaties', fr: 'Emplacements' }) },
])

function isActive(href: string): boolean {
  const path = pageContext.urlPathname
  if (href === '/') return path === '/'
  return path.startsWith(href)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
