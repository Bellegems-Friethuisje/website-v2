<template>
  <Teleport to="body" :disabled="!isMounted">
    <Transition name="backdrop">
      <div
        v-if="item"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-950/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition name="modal" appear>
          <div
            v-if="item"
            class="relative z-10 w-full sm:max-w-md bg-white sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          >
            <!-- Header -->
            <div class="p-5 pb-4 border-b border-gray-100 shrink-0">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h2 class="text-lg font-extrabold text-gray-900 leading-tight">
                    {{ name }}
                  </h2>
                  <p class="text-gray-400 text-xs mt-1">
                    {{ t({ nl: "Kies je opties", fr: "Choisissez vos options" }) }}
                  </p>
                </div>
                <button
                  @click="$emit('close')"
                  class="h-9 w-9 -m-1 rounded-full hover:bg-gray-100 active:bg-gray-100 transition-colors text-gray-400 flex items-center justify-center shrink-0"
                  :aria-label="t({ nl: 'Sluiten', fr: 'Fermer' })"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Option groups -->
            <div class="overflow-y-auto p-5 space-y-6">
              <div v-for="group in groups" :key="group.key">
                <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  {{ lang === "nl" ? group.nl : group.fr }}
                </h3>
                <div class="space-y-2">
                  <label
                    v-for="choice in group.choices"
                    :key="choice.id"
                    :class="[
                      'flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors',
                      selections[group.key] === choice.id
                        ? 'border-orange-400 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200',
                    ]"
                  >
                    <input
                      type="radio"
                      :name="group.key"
                      :value="choice.id"
                      v-model="selections[group.key]"
                      class="h-4 w-4 accent-orange-500 shrink-0"
                    />
                    <span class="text-sm font-semibold text-gray-800">
                      {{ lang === "nl" ? choice.nl : choice.fr }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 pt-0 shrink-0 flex gap-3">
              <button
                @click="$emit('close')"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                {{ t({ nl: "Annuleren", fr: "Annuler" }) }}
              </button>
              <button
                @click="confirm"
                :disabled="!allSelected"
                class="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                {{ t({ nl: "Toevoegen aan bestelling", fr: "Ajouter à la commande" }) }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted, onUnmounted } from "vue";
import { useLang } from "../composables/useLang";
import optionGroupsData from "../data/optionGroups.json";

export interface OptionSelection {
  groupKey: string;
  choiceId: string;
  label: { nl: string; fr: string };
}

const { lang, t } = useLang();

const props = defineProps<{
  item: Record<string, any> | null;
}>();

const emit = defineEmits<{ close: []; confirm: [selections: OptionSelection[]] }>();

const optionGroups = optionGroupsData as Record<
  string,
  { nl: string; fr: string; choices: { id: string; nl: string; fr: string }[] }
>;

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

const groups = computed(() => {
  const ids: string[] = props.item?.options ?? [];
  return ids
    .map((id) => {
      const def = optionGroups[id];
      return def ? { key: id, ...def } : null;
    })
    .filter(Boolean) as { key: string; nl: string; fr: string; choices: { id: string; nl: string; fr: string }[] }[];
});

const name = computed(() =>
  props.item ? (lang.value === "nl" ? props.item.nl.name : props.item.fr.name) : "",
);

const selections = reactive<Record<string, string>>({});

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") emit("close");
}

watch(
  () => props.item,
  (item) => {
    if (item) {
      for (const key of Object.keys(selections)) delete selections[key];
      for (const group of groups.value) {
        selections[group.key] = group.choices[0]?.id ?? "";
      }
      document.addEventListener("keydown", onKeydown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    }
  },
);

const allSelected = computed(() => groups.value.every((g) => selections[g.key]));

function confirm() {
  if (!allSelected.value) return;
  const result: OptionSelection[] = groups.value.map((group) => {
    const choice = group.choices.find((c) => c.id === selections[group.key])!;
    return { groupKey: group.key, choiceId: choice.id, label: { nl: choice.nl, fr: choice.fr } };
  });
  emit("confirm", result);
}

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
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
