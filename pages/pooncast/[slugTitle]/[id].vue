<template>
  <div class="flex flex-col mx-5 items-center justify-center mt-[120px] md:mt-[150px]">

      <div v-if="loading">
          <Loading fillColor="fill-secondary" />
      </div>
  
      <div v-else-if="currentPooncast" class="flex flex-col items-center justify-center bg-[url('@/assets/img/episodes/grid.svg')] bg-center bg-repeat-space">
          <h1 class="text-center text-secondary sm:mx-10 md:w-2/3">{{ currentPooncast.titre }}</h1>
          <time v-if="currentPooncast.updatedAt || currentPooncast.createdAt" :datetime="currentPooncast.updatedAt || currentPooncast.createdAt" class="mt-4 font-nunito text-sm text-poonblack">
            {{ currentPooncast.updatedAt ? 'Mis à jour le' : 'Publié le' }} {{ formatFrenchDate(currentPooncast.updatedAt || currentPooncast.createdAt) }}
          </time>
          <Pooncast :pooncast="currentPooncast" :show-detail-link="false" :show-platforms="false" bgOpacity="bg-opacity-100" class="md:mt-10" />
          <SeoEpisodeSeoContent :value="currentPooncast.seoContent" />
          <div class="w-full max-w-3xl px-2">
            <SeoContentFaq :items="currentPooncast.faq" />
            <SeoRelatedContent :items="currentPooncast.relatedContent" :blogs="blogs" :pooncasts="pooncasts" />
          </div>
          <div class="mt-12 w-full max-w-xl">
            <PooncastPlatformsPlayer :pooncast-audio="currentPooncast.audio" :pooncast-title="currentPooncast.titre" />
          </div>
          <NuxtLink
            class="btn-secondary mt-8"
            to="/pooncast/episodes"
            title="Découvrir tous les épisodes du Pooncast"
          >
            Découvrir tous les épisodes
          </NuxtLink>
      </div>

      <div v-else class="flex flex-col items-center justify-center">
          <p class="mt-7 text-secondary text-center font-bold text-2xl">Pooncast introuvable</p>
          <NuxtLink class="link mt-10 mb-10 underline" to="/pooncast/episodes" title="Tous nos épisodes">Tous nos épisodes</NuxtLink>
      </div>

  </div>
</template>

<script setup>
import { usePooncastStore } from '@/stores/Pooncast/Pooncast.js';
import { useBlogStore } from '@/stores/Blog/blog.js';
import { SITE_URL, createFaqSchema, formatFrenchDate, getMetaDescription, getSeoTitle, normalizeFaq, serializeJsonLd, slugify, stripHtml } from '~/utils/content';

const { slugTitle, id } = useRoute().params;

const pooncastStore = usePooncastStore();
const { loading, pooncasts } = storeToRefs(pooncastStore);
const blogStore = useBlogStore();
const { blogs } = storeToRefs(blogStore);

let pooncastFetchError = null;

try {
  await callOnce(`pooncast-${id}`, () => pooncastStore.fetchPooncastById(id));
} catch (error) {
  pooncastFetchError = error;
}

try {
  await Promise.all([
    callOnce('pooncasts', () => pooncastStore.fetchPooncasts()),
    callOnce('blogs', () => blogStore.fetchBlogs()),
  ]);
} catch (error) {
  console.error('Related content is temporarily unavailable:', error);
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
const episodeDescription = computed(() => getMetaDescription(currentPooncast.value, currentPooncast.value.description));
const episodeSeoTitle = computed(() => getSeoTitle(currentPooncast.value, `${currentPooncast.value.titre} - Le Pooncast`));
const listeningPlatforms = computed(() => Object.values(currentPooncast.value.audio || {}).filter(Boolean));
const visibleFaq = computed(() => normalizeFaq(currentPooncast.value.faq));
const faqSchema = computed(() => createFaqSchema(visibleFaq.value, episodeUrl.value));

usePooncastSeo(() => ({
  title: episodeSeoTitle.value,
  description: episodeDescription.value,
  path: episodePath.value,
  image: currentPooncast.value.visuel,
  type: 'article',
  publishedTime: currentPooncast.value.createdAt,
  modifiedTime: currentPooncast.value.updatedAt || currentPooncast.value.createdAt
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
        },
        faqSchema.value
      ].filter(Boolean)
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
