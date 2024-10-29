<template>
<div class="flex flex-col mx-5 items-center justify-center mt-[80px] md:mt-[100px] lg:mt-[200px]">

    <div v-if="loading">
      <h1 class="hidden">{{ generateTitle(slugTitle) }}</h1>
        <Loading fillColor="fill-secondary" />
    </div>

    <div v-else-if="currentBlog" class="flex flex-col items-center justify-center bg-[url('@/assets/img/episodes/grid.svg')] bg-center bg-repeat-space">
        <BlogDetail :blog="currentBlog" />
    </div>

    <div v-else class="flex flex-col items-center justify-center">
        <p class="mt-7 text-secondary text-center font-bold text-2xl">Blog introuvable</p>
        <NuxtLink class="link mt-10 mb-10 underline" to="/poonblog/" title="Tous nos articles">Tous nos articles</NuxtLink>
    </div>

</div>
</template>

<script setup>
import { useBlogStore } from '@/stores/Blog/blog.js';

const { slugTitle, id } = useRoute().params;

const blogStore = useBlogStore();
const { blogs, blogById, loading } = storeToRefs(blogStore);

// Charger les blogs si nécessaire lorsque le composant est monté
onMounted(() => {
  if (blogs.value.length === 0) {
    blogStore.fetchBlogs().finally(() => {
      loading.value = false;
    });
  } else {
    loading.value = false;
  }
});

// Utiliser `computed` pour obtenir le blog actuel en fonction de l'ID
const currentBlog = computed(() => blogById.value(id));

// Mettre à jour le head avec le titre par défaut basé sur le slug
useHead({
  title: generateTitle(slugTitle),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: "Découvrez des articles éducatifs et amusants pour éveiller la curiosité des enfants sur le PoonBlog."
    },
    { hid: 'og:title', property: 'og:title', content: generateTitle(slugTitle) },
    { hid: 'og:description', property: 'og:description', content: "Découvrez des articles éducatifs et amusants pour éveiller la curiosité des enfants sur le PoonBlog." },
    { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
    { hid: 'og:url', property: 'og:url', content: `${domainUrl}/poonblog` }
  ]
});


// Surveiller les changements de `currentBlog` pour mettre à jour les meta tags
watch(
  () => currentBlog.value,
  (newBlog) => {
    if (newBlog) {
      useHead({
        title: newBlog.title,
        meta: [
          {
            name: 'description',
            content: newBlog.intro + ' - Le blog du Pooncast'
          },
          { hid: 'og:title', property: 'og:title', content: newBlog.title },
          { hid: 'og:description', property: 'og:description', content: newBlog.intro + ' - Le blog du Pooncast' },
          { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
          { hid: 'og:url', property: 'og:url', content: domainUrl + '/poonblog/' + slugTitle + '/' + id }
        ]
      });
    }
  },
  { immediate: true }
);

// Fonction pour générer un titre à partir d'un slug
function generateTitle(slug) {
  // Remplacer les tirets par des espaces
  let title = slug.replace(/-/g, ' ');

  // Capitaliser la première lettre de la phrase
  return title.charAt(0).toUpperCase() + title.slice(1);
}
const domainUrl = 'https://lepooncast.com';


// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Blog Article',
            page_location: window.location.url,
            page_path: window.location.pathname,
            blog_title: currentBlog.title,
            blog_id: currentBlog.id
        });
    }
});
</script>


<style scoped>
</style>
