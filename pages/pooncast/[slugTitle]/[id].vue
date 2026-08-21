<template>
  <div class="flex flex-col mx-5 items-center justify-center mt-[120px] md:mt-[150px]">

      <div v-if="loading">
          <Loading fillColor="fill-secondary" />
      </div>
  
      <div v-else-if="currentPooncast" class="flex flex-col items-center justify-center bg-[url('@/assets/img/episodes/grid.svg')] bg-center bg-repeat-space">
          <h1 class="text-center text-secondary sm:mx-10 md:w-2/3">{{ currentPooncast.titre }}</h1>
          <time v-if="currentPooncast.createdAt" :datetime="currentPooncast.createdAt" class="mt-4 font-nunito text-sm text-poonblack">
            Publié le {{ formatFrenchDate(currentPooncast.createdAt) }}
          </time>
          <Pooncast :pooncast="currentPooncast" :show-detail-link="false" bgOpacity="bg-opacity-100" class="md:mt-10" />
      </div>

      <div v-else class="flex flex-col items-center justify-center">
          <p class="mt-7 text-secondary text-center font-bold text-2xl">Pooncast introuvable</p>
          <NuxtLink class="link mt-10 mb-10 underline" to="/pooncast/episodes" title="Tous nos épisodes">Tous nos épisodes</NuxtLink>
      </div>

  </div>
</template>

<script setup>
import { usePooncastStore } from '@/stores/Pooncast/Pooncast.js';
import { SITE_URL, formatFrenchDate, serializeJsonLd, slugify, stripHtml, truncateDescription } from '~/utils/content';

const { slugTitle, id } = useRoute().params;

const pooncastStore = usePooncastStore();
const { loading } = storeToRefs(pooncastStore);

let pooncastFetchError = null;

try {
  await callOnce(`pooncast-${id}`, () => pooncastStore.fetchPooncastById(id));
} catch (error) {
  pooncastFetchError = error;
}

const currentPooncast = computed(() => pooncastStore.pooncastById(id));

if (!currentPooncast.value) {
  if (pooncastFetchError) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      message: 'Le contenu est temporairement indisponible.',
      fatal: true
    });
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    message: 'Épisode introuvable',
    fatal: true
  });
}

if (import.meta.server) {
  useResponseHeader('cache-control').value =
    'public, max-age=0, s-maxage=300, stale-while-revalidate=3600';
}

const episodePath = computed(() => `/pooncast/${slugify(currentPooncast.value.titre)}/${currentPooncast.value.id}`);
const episodeUrl = computed(() => new URL(episodePath.value, SITE_URL).toString());
const episodeDescription = computed(() => truncateDescription(currentPooncast.value.description));
const listeningPlatforms = computed(() => Object.values(currentPooncast.value.audio || {}).filter(Boolean));

usePooncastSeo(() => ({
  title: `${currentPooncast.value.titre} - Le Pooncast`,
  description: episodeDescription.value,
  path: episodePath.value,
  image: currentPooncast.value.visuel,
  type: 'article',
  publishedTime: currentPooncast.value.createdAt
}));

useHead(() => ({
  script: [{
    key: 'podcast-episode-schema',
    type: 'application/ld+json',
    innerHTML: serializeJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'PodcastEpisode',
          '@id': `${episodeUrl.value}#episode`,
          name: currentPooncast.value.titre,
          description: stripHtml(currentPooncast.value.description),
          url: episodeUrl.value,
          image: currentPooncast.value.visuel,
          datePublished: currentPooncast.value.createdAt,
          episodeNumber: currentPooncast.value.episodeNumber,
          seasonNumber: currentPooncast.value.saison,
          inLanguage: 'fr-FR',
          partOfSeries: { '@id': `${SITE_URL}/#podcast` },
          sameAs: listeningPlatforms.value
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Épisodes', item: `${SITE_URL}/pooncast/episodes` },
            { '@type': 'ListItem', position: 3, name: currentPooncast.value.titre, item: episodeUrl.value }
          ]
        }
      ]
    })
  }]
}));

// ANALYTICS
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Episode',
            page_location: window.location.href,
            page_path: window.location.pathname,
            episode_title: currentPooncast.value.titre,
            episode_id: currentPooncast.value.id,
            episode_season: currentPooncast.value.saison
        });
    }
});
</script>

<style scoped>
</style>
