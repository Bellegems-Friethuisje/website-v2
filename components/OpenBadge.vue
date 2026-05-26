<template>
  <span class="inline-flex items-center gap-1.5 text-xs font-semibold">
    <span
      aria-hidden="true"
      class="w-2 h-2 rounded-full shrink-0"
      :class="open ? 'bg-green-500' : 'bg-red-400'"
    />
    <span :class="open ? 'text-green-600' : 'text-red-400'">
      {{ open ? t({ nl: 'Nu open', fr: 'Ouvert' }) : t({ nl: 'Gesloten', fr: 'Fermé' }) }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { useLang } from '../composables/useLang'
const { t } = useLang()
defineProps<{ open: boolean }>()
</script>
