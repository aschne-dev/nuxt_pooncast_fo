<template>
  <aside v-if="links.length" class="mt-14 w-full font-nunito" aria-labelledby="related-content-title">
    <h2 id="related-content-title" class="font-syne text-2xl font-bold">Pour aller plus loin</h2>
    <ul class="mt-5 list-disc space-y-3 ps-6 text-lg">
      <li v-for="link in links" :key="`${link.type}:${link.id}`">
        <NuxtLink :to="link.path" class="underline hover:no-underline">
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { resolveRelatedContent } from '~/utils/content';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  blogs: {
    type: Array,
    default: () => [],
  },
  pooncasts: {
    type: Array,
    default: () => [],
  },
});

const links = computed(() => resolveRelatedContent(props.items, props.blogs, props.pooncasts));
</script>
