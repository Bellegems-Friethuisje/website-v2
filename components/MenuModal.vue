<template>
  <Teleport to="body" :disabled="!isMounted">
    <Transition name="backdrop">
      <div
        v-if="item"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-950/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >

        <!-- Modal -->
        <Transition name="modal" appear>
          <div
            v-if="item"
            class="relative z-10 w-full sm:max-w-lg bg-white sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          >
            <!-- Image header -->
            <div class="relative h-56 shrink-0 bg-gray-100">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="name"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-6xl"
                style="background: #fff7ed"
              >
                {{ item.emoji ?? "🍽️" }}
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent"
              />

              <!-- Close button -->
              <button
                @click="$emit('close')"
                class="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
                aria-label="Sluiten"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <!-- Price badge -->
              <div class="absolute bottom-4 left-4">
                <span
                  class="bg-orange-500 text-white font-extrabold text-xl px-4 py-1.5 rounded-full shadow-lg"
                >
                  €{{ item.price.toFixed(2) }}
                </span>
              </div>

              <!-- Popular badge -->
              <div v-if="item.popular" class="absolute top-3 left-3">
                <span
                  class="bg-white text-orange-500 font-bold text-xs px-3 py-1 rounded-full shadow"
                >
                  ⭐ {{ t({ nl: "Populair", fr: "Populaire" }) }}
                </span>
              </div>
            </div>

            <!-- Content (scrollable) -->
            <div class="overflow-y-auto">
              <div class="p-6">
                <!-- Title & location -->
                <div class="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 class="text-2xl font-extrabold text-gray-900 leading-tight">
                      {{ name }}
                    </h2>
                    <span
                      v-if="item.childVersion"
                      class="inline-flex items-center gap-1 mt-1.5 text-xs bg-blue-50 border border-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full"
                    >
                      👶 {{ t({ nl: 'Kinderportie beschikbaar', fr: 'Portion enfant disponible' }) }}
                    </span>
                  </div>
                  <span
                    v-if="locationName"
                    class="shrink-0 text-xs bg-gray-100 text-gray-500 font-semibold px-2.5 py-1 rounded-full mt-1"
                  >
                    📍 {{ locationName }}
                  </span>
                </div>

                <p
                  v-if="description"
                  class="text-gray-500 text-sm leading-relaxed mb-4"
                >
                  {{ description }}
                </p>

                <!-- Sides -->
                <div v-if="itemSides.length" class="mb-6">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    {{ t({ nl: 'Bijgerecht naar keuze', fr: 'Accompagnement au choix' }) }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="side in itemSides"
                      :key="side.key"
                      class="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full"
                    >
                      {{ side.emoji }} {{ side.label }}
                    </span>
                  </div>
                </div>

                <!-- Allergens -->
                <div>
                  <h3
                    class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3"
                  >
                    {{ t({ nl: "Allergenen", fr: "Allergènes" }) }}
                  </h3>

                  <div
                    v-if="itemAllergens.length > 0"
                    class="flex flex-wrap gap-2 mb-4"
                  >
                    <span
                      v-for="a in itemAllergens"
                      :key="a.key"
                      class="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <span>{{ a.emoji }}</span>
                      <span>{{ lang === "nl" ? a.nl : a.fr }}</span>
                    </span>
                  </div>

                  <p v-else class="text-gray-400 text-xs mb-4 italic">
                    {{
                      t({
                        nl: "Geen bekende allergenen.",
                        fr: "Aucun allergène connu.",
                      })
                    }}
                  </p>

                  <p
                    class="text-gray-400 text-xs leading-relaxed border-t border-gray-100 pt-4"
                  >
                    {{
                      t({
                        nl: "* Allergenen omvatten niet de garniuren. Voor m eer gedetailleerde informatie over allergenen, neem contact op met ons personeel.",
                        fr: "* Les allergènes n'incluent pas les garnitures. Pour des informations plus détaillées sur les allergènes, veuillez contacter notre personnel.",
                      })
                    }}
                  </p>
                </div>

                <!-- Goes well with -->
                <div
                  v-if="pairedItems.length"
                  class="mt-6 border-t border-gray-100 pt-5"
                >
                  <h3
                    class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3"
                  >
                    {{
                      t({ nl: "Gaat goed samen met", fr: "Se marie bien avec" })
                    }}
                  </h3>
                  <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button
                      v-for="paired in pairedItems"
                      :key="paired.id"
                      @click="$emit('select', paired)"
                      class="shrink-0 flex items-center gap-2.5 bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-xl p-2.5 transition-all text-left"
                    >
                      <span
                        v-if="!paired.image"
                        class="text-2xl leading-none"
                        >{{ paired.emoji ?? "🍽️" }}</span
                      >
                      <img
                        v-else
                        :src="paired.image"
                        :alt="lang === 'nl' ? paired.nl.name : paired.fr.name"
                        class="h-10 w-10 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <p
                          class="text-sm font-semibold text-gray-900 whitespace-nowrap leading-tight"
                        >
                          {{ lang === "nl" ? paired.nl.name : paired.fr.name }}
                        </p>
                        <p class="text-orange-500 font-bold text-xs mt-0.5">
                          €{{ paired.price.toFixed(2) }}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer action -->
            <div class="p-4 pt-0 shrink-0">
              <button
                @click="$emit('close')"
                class="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                {{ t({ nl: "Sluiten", fr: "Fermer" }) }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { useLang } from "../composables/useLang";
import allergensData from "../data/allergens.json";

const { lang, t } = useLang();

const props = defineProps<{
  item: Record<string, any> | null;
  locationName?: string;
  menu?: Record<string, any>[];
}>();

const emit = defineEmits<{ close: []; select: [item: Record<string, any>] }>();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const name = computed(() =>
  props.item
    ? lang.value === "nl"
      ? props.item.nl.name
      : props.item.fr.name
    : "",
);

const description = computed(() =>
  props.item
    ? lang.value === "nl"
      ? props.item.nl.description
      : props.item.fr.description
    : "",
);

const itemAllergens = computed(() => {
  if (!props.item) return [];
  const keys: string[] = props.item.allergens ?? [];
  const legend = allergensData._legend as Record<
    string,
    { emoji: string; nl: string; fr: string }
  >;
  return keys.map((key) => ({ key, ...legend[key] })).filter((a) => a.emoji);
});

const SIDES_MAP: Record<string, { nl: string; fr: string; emoji: string }> = {
  friet: { nl: 'Friet', fr: 'Frites', emoji: '🍟' },
  puree: { nl: 'Puree', fr: 'Purée', emoji: '🥔' },
  pasta: { nl: 'Pasta', fr: 'Pâtes', emoji: '🍝' },
}

const itemSides = computed(() => {
  const sides = props.item?.sides as string[] | undefined
  if (!sides?.length) return []
  return sides.map(key => {
    const s = SIDES_MAP[key]
    if (!s) return null
    return { key, emoji: s.emoji, label: lang.value === 'nl' ? s.nl : s.fr }
  }).filter(Boolean) as { key: string; emoji: string; label: string }[]
})

const pairedItems = computed(() => {
  if (!props.item?.pairsWith?.length || !props.menu) return [];
  return (props.item.pairsWith as number[])
    .map((id) => props.menu!.find((m) => m.id === id))
    .filter(Boolean);
});

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") emit("close");
}

watch(
  () => props.item,
  (item) => {
    if (item) {
      document.addEventListener("keydown", onKeydown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    }
  },
);

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-enter-active {
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
}
.modal-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.modal-enter-from {
  transform: translateY(40px) scale(0.96);
  opacity: 0;
}
.modal-leave-to {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}

@media (max-width: 639px) {
  .modal-enter-from {
    transform: translateY(100%);
  }
  .modal-leave-to {
    transform: translateY(100%);
  }
  .modal-enter-active,
  .modal-leave-active {
    transition:
      transform 0.3s cubic-bezier(0.32, 0.72, 0, 1),
      opacity 0.2s ease;
  }
}
</style>
