<template>
  <section v-if="faq.length" id="faq" class="mt-14 w-full font-nunito" aria-labelledby="faq-title">
    <h2 id="faq-title" class="font-syne text-2xl font-bold">Questions fréquentes</h2>
    <dl class="mt-6 space-y-6">
      <div v-for="(item, index) in faq" :key="`${index}-${item.question}`">
        <dt class="font-syne text-lg font-bold">{{ item.question }}</dt>
        <dd class="mt-2 whitespace-pre-line text-lg">{{ item.answer }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
import { normalizeFaq } from '~/utils/content';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const faq = computed(() => normalizeFaq(props.items));
</script>
