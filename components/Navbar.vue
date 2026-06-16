<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div class="max-w-5xl mx-auto px-4 lg:px-0">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 group">
          <span class="text-2xl transition-transform group-hover:scale-110 inline-block" aria-hidden="true">🍟</span>
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
            @click="mobileOpen = true"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="mobileOpen"
      class="lg:hidden fixed inset-0 z-50 bg-gray-950/50 backdrop-blur-sm"
      @click="mobileOpen = false"
    />
  </Transition>

  <!-- Flyout card -->
  <Transition name="flyout">
    <div
      v-if="mobileOpen"
      class="lg:hidden fixed top-0 right-0 h-full w-72 z-50 bg-white shadow-2xl flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
        <a href="/" class="flex items-center gap-2" @click="mobileOpen = false">
          <span class="text-xl" aria-hidden="true">🍟</span>
          <div class="leading-tight">
            <span class="font-extrabold text-gray-900 text-sm block">Bellegems</span>
            <span class="font-extrabold text-orange-500 text-sm block -mt-1">Friethuisje</span>
          </div>
        </a>
        <button
          @click="mobileOpen = false"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Nav links -->
      <div class="flex-1 px-4 py-4 flex flex-col gap-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="mobileOpen = false"
          :class="[
            'flex items-center px-4 py-3.5 rounded-xl font-semibold text-sm transition-colors',
            isActive(link.href)
              ? 'bg-orange-50 text-orange-500'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Language toggle -->
      <div class="px-5 py-5 border-t border-gray-100 shrink-0">
        <p class="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
          {{ lang === 'nl' ? 'Taal' : 'Langue' }}
        </p>
        <div class="flex items-center bg-gray-100 rounded-full p-0.5 w-fit">
          <button
            @click="setLang('nl')"
            :class="lang === 'nl' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'"
            class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
          >NL</button>
          <button
            @click="setLang('fr')"
            :class="lang === 'fr' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'"
            class="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
          >FR</button>
        </div>
      </div>
    </div>
  </Transition>
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
  { href: '/reservaties', label: t({ nl: 'Reservatie', fr: 'Réservation' }) },
  { href: '/sollicitatie', label: t({ nl: 'Solliciteer', fr: 'Postuler' }) },
])

function isActive(href: string): boolean {
  const path = pageContext.urlPathname
  if (href === '/') return path === '/'
  return path.startsWith(href)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.flyout-enter-active, .flyout-leave-active { transition: transform 0.25s ease; }
.flyout-enter-from, .flyout-leave-to { transform: translateX(100%); }
</style>
