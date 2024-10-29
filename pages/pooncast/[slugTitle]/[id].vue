<template>
  <div class="flex flex-col mx-5 items-center justify-center mt-[120px] md:mt-[150px]">

      <div v-if="loading">
          <Loading fillColor="fill-secondary" />
      </div>
  
      <div v-else-if="currentPooncast" class="flex flex-col items-center justify-center bg-[url('@/assets/img/episodes/grid.svg')] bg-center bg-repeat-space">
          <h1 class="text-center text-secondary sm:mx-10 md:w-2/3">{{ currentPooncast.titre }}</h1>
          <Pooncast :pooncast="currentPooncast" bgOpacity="bg-opacity-100" class="md:mt-10" />
      </div>

      <div v-else class="flex flex-col items-center justify-center">
          <p class="mt-7 text-secondary text-center font-bold text-2xl">Pooncast introuvable</p>
          <NuxtLink class="link mt-10 mb-10 underline" to="/pooncast/episodes" title="Tous nos épisodes">Tous nos épisodes</NuxtLink>
      </div>

  </div>
</template>

<script setup>
import { usePooncastStore } from '@/stores/Pooncast/Pooncast.js';

const { slugTitle, id } = useRoute().params;

const pooncastStore = usePooncastStore();
const { pooncasts, pooncastById, loading } = storeToRefs(pooncastStore);

if( pooncasts.value.length == 0 ) {
  pooncastStore.fetchPooncasts();
}

// Charger les blogs si nécessaire lorsque le composant est monté
onMounted(() => {
  if (pooncasts.value.length === 0) {
    pooncastStore.fetchPooncasts().finally(() => {
      loading.value = false;
    });
  } else {
    loading.value = false;
  }
});

const currentPooncast = computed(() => pooncastById.value(id));

const domainUrl = 'https://lepooncast.com';
useHead({
  title: generateTitle(slugTitle) + ' - Le Pooncast ',
  meta: [
      {
          hid: 'description',
          name: 'description',
          content: 'Découvrez tous les épisodes du Pooncast. Écoutez les derniers épisodes, explorez les saisons passées, et restez à jour avec vos podcasts préférés.'
      },
      { hid: 'og:title', property: 'og:title', content: generateTitle(slugTitle) + ' - Le Pooncast ' },
      { hid: 'og:description', property: 'og:description', content: 'Découvrez tous les épisodes du Pooncast. Écoutez les derniers épisodes, explorez les saisons passées, et restez à jour avec vos podcasts préférés.' },
      { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
      { hid: 'og:url', property: 'og:url', content: `${domainUrl}/pooncast/episodes` }
  ]
})

watch(
  () => currentPooncast.value,
  (newPooncast) => {
    if (newPooncast) {
      useHead({
        title: newPooncast.titre + ' - Le Pooncast ',
        meta: [
          {
            name: 'description',
            content: newPooncast.description
          },
          { hid: 'og:title', property: 'og:title', content: newPooncast.titre + ' - Le Pooncast ' },
          { hid: 'og:description', property: 'og:description', content: newPooncast.description },
          { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
          { hid: 'og:url', property: 'og:url', content: domainUrl + '/pooncast/' + slugTitle + '/' + id }
        ]
      });
    }
  },
  { immediate: true }
);

function generateTitle(slug) {
  // Remplacer les tirets par des espaces
  let title = slug.replace(/-/g, ' ');

  // Capitaliser la première lettre de la phrase
  return title.charAt(0).toUpperCase() + title.slice(1);
}


// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Episode',
            page_location: window.location.url,
            page_path: window.location.pathname,
            episode_title: currentPooncast.titre,
            episode_id: currentPooncast.id,
            episode_season: currentPooncast.saison
        });
    }
});
</script>

<style scoped>
</style>
