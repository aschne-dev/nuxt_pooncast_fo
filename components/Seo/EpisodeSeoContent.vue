<template>
  <div v-if="hasContent" class="mt-12 w-full max-w-3xl px-2 font-nunito text-lg">
    <p v-if="content.shortAnswer" class="rounded-2xl bg-primary/80 p-6 font-semibold whitespace-pre-line">
      {{ content.shortAnswer }}
    </p>

    <section v-for="(section, index) in content.sections" :key="`${index}-${section.title}`" class="mt-10">
      <h2 class="font-syne text-2xl font-bold">{{ section.title }}</h2>
      <p class="mt-4 whitespace-pre-line">{{ section.content }}</p>
    </section>

    <section v-if="content.keyFacts.length" class="mt-10" aria-labelledby="key-facts-title">
      <h2 id="key-facts-title" class="font-syne text-2xl font-bold">À retenir</h2>
      <ul class="mt-4 list-disc space-y-2 ps-6">
        <li v-for="(fact, index) in content.keyFacts" :key="`${index}-${fact}`">{{ fact }}</li>
      </ul>
    </section>

    <section v-if="content.activity.title && content.activity.content" class="mt-10">
      <h2 class="font-syne text-2xl font-bold">{{ content.activity.title }}</h2>
      <p class="mt-4 whitespace-pre-line">{{ content.activity.content }}</p>
    </section>
  </div>
</template>

<script setup>
import { hasEpisodeSeoContent, normalizeEpisodeSeoContent } from '~/utils/content';

const props = defineProps({
  value: {
    type: Object,
    default: () => ({}),
  },
});

const content = computed(() => normalizeEpisodeSeoContent(props.value));
const hasContent = computed(() => hasEpisodeSeoContent(props.value));
</script>
