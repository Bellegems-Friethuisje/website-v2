<template>
  <div
    class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-[box-shadow,transform] duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col"
    @click="$emit('select')"
    style="will-change: transform"
  >
    <!-- Real photo or emoji fallback -->
    <div ref="containerEl" class="relative h-44 overflow-hidden bg-orange-50">
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :alt="name"
        decoding="async"
        @load="imgLoaded = true"
        :class="[
          'w-full h-full object-cover group-hover:scale-105 transition-all duration-500',
          imgLoaded ? 'opacity-100' : 'opacity-0',
        ]"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-5xl"
        :style="{ backgroundColor: fallbackColor }"
      >
        {{ emoji }}
      </div>

      <span
        v-if="popular"
        class="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow"
      >
        {{ popularLabel }}
      </span>
      <span
        v-if="childVersion"
        class="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow"
      >
        👶 {{ t({ nl: "Kinderportie", fr: "Portion enfant" }) }}
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-bold text-gray-900 text-base leading-snug mb-1">
        {{ name }}
      </h3>
      <p
        v-if="description"
        class="text-gray-400 text-sm leading-relaxed mb-2 line-clamp-2"
      >
        {{ description }}
      </p>
      <div v-if="resolvedSides.length" class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="side in resolvedSides"
          :key="side.key"
          class="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
          >{{ side.emoji }} {{ side.label }}</span
        >
      </div>
      <span class="text-orange-500 font-extrabold text-lg mt-auto pt-2"
        >€{{ price.toFixed(2) }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useLang } from "../composables/useLang";
import { useLazyImage } from "../composables/useLazyImage";

const { lang, t } = useLang();

defineEmits<{ select: [] }>();

const props = defineProps<{
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  emoji?: string;
  popular?: boolean;
  sides?: string[];
  childVersion?: boolean;
}>();

const containerEl = ref<HTMLElement | null>(null);
const { imgSrc, imgLoaded } = useLazyImage(containerEl, props.image);

const popularLabel = computed(() => t({ nl: "Populair", fr: "Populaire" }));

const SIDES_MAP: Record<string, { nl: string; fr: string; emoji: string }> = {
  friet: { nl: "Friet", fr: "Frites", emoji: "🍟" },
  puree: { nl: "Puree", fr: "Purée", emoji: "🥔" },
  pasta: { nl: "Pasta", fr: "Pâtes", emoji: "🍝" },
};

const resolvedSides = computed(
  () =>
    (props.sides ?? [])
      .map((key) => {
        const s = SIDES_MAP[key];
        if (!s) return null;
        return {
          key,
          emoji: s.emoji,
          label: lang.value === "nl" ? s.nl : s.fr,
        };
      })
      .filter(Boolean) as { key: string; emoji: string; label: string }[],
);

const fallbackColor = computed(() => {
  const colors: Record<string, string> = {
    friet: "#fff7ed",
    snack: "#fefce8",
    kroket: "#fdf4ff",
    saus: "#f0fdf4",
    drank: "#eff6ff",
    maaltijd: "#fef2f2",
    scampi: "#eff6ff",
    salade: "#f0fdf4",
  };
  return colors[props.category] ?? "#f9fafb";
});
</script>
