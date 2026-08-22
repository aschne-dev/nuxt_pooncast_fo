<template>
<div class="flex flex-col mx-5 items-center justify-center mt-[80px] md:mt-[100px] lg:mt-[200px]">

    <div v-if="loading">
        <Loading fillColor="fill-secondary" />
    </div>

    <div v-else-if="currentBlog" class="flex flex-col items-center justify-center bg-[url('@/assets/img/episodes/grid.svg')] bg-center bg-repeat-space">
        <BlogDetail :blog="currentBlog" />
    </div>

    <div v-else class="flex flex-col items-center justify-center">
        <p class="mt-7 text-secondary text-center font-bold text-2xl">Blog introuvable</p>
        <NuxtLink class="link mt-10 mb-10 underline" to="/poonblog" title="Tous nos articles">Tous nos articles</NuxtLink>
    </div>

</div>
</template>

<script setup>
import { useBlogStore } from '@/stores/Blog/blog.js';
import { usePooncastStore } from '@/stores/Pooncast/Pooncast.js';
import { SITE_URL, createFaqSchema, getMetaDescription, getSeoTitle, normalizeFaq, serializeJsonLd, slugify, stripHtml } from '~/utils/content';

const { slugTitle, id } = useRoute().params;

const blogStore = useBlogStore();
const pooncastStore = usePooncastStore();
const { loading } = storeToRefs(blogStore);

let blogFetchError = null;

try {
  await callOnce('blogs', () => blogStore.fetchBlogs());
} catch (error) {
  blogFetchError = error;
}

try {
  await callOnce('pooncasts', () => pooncastStore.fetchPooncasts());
} catch (error) {
  console.error('Related episodes are temporarily unavailable:', error);
}

const currentBlog = computed(() => blogStore.blogById(id));

if (!currentBlog.value) {
  if (blogFetchError) {
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
    message: 'Article introuvable',
    fatal: true
  });
}

if (import.meta.server) {
  useResponseHeader('cache-control').value =
    'public, max-age=0, s-maxage=300, stale-while-revalidate=3600';
}

const articlePath = computed(() => `/poonblog/${slugify(currentBlog.value.title)}/${currentBlog.value.id}`);
const articleDescription = computed(() => getMetaDescription(currentBlog.value, currentBlog.value.intro));
const articleSeoTitle = computed(() => getSeoTitle(currentBlog.value, `${currentBlog.value.title} - Le PoonBlog`));
const articleUrl = computed(() => new URL(articlePath.value, SITE_URL).toString());
const visibleFaq = computed(() => normalizeFaq(currentBlog.value.faq));
const faqSchema = computed(() => createFaqSchema(visibleFaq.value, articleUrl.value));

usePooncastSeo(() => ({
  title: articleSeoTitle.value,
  description: articleDescription.value,
  path: articlePath.value,
  image: currentBlog.value.visuel,
  type: 'article',
  publishedTime: currentBlog.value.createdAt,
  modifiedTime: currentBlog.value.updatedAt || currentBlog.value.createdAt
}));

useHead(() => ({
  script: [{
    key: 'blog-posting-schema',
    type: 'application/ld+json',
    innerHTML: serializeJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${articleUrl.value}#article`,
          headline: currentBlog.value.title,
          description: articleDescription.value,
          image: currentBlog.value.visuel,
          datePublished: currentBlog.value.createdAt,
          dateModified: currentBlog.value.updatedAt || currentBlog.value.createdAt,
          inLanguage: 'fr-FR',
          author: {
            '@type': 'Organization',
            name: 'Papa et Maman',
            url: 'https://lagencedepapaetmaman.com'
          },
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntityOfPage: articleUrl.value,
          articleBody: stripHtml([
            currentBlog.value.intro,
            ...(currentBlog.value.chapters || []).map(chapter => `${chapter.name}. ${chapter.text}`)
          ].join(' '))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'PoonBlog', item: `${SITE_URL}/poonblog` },
            { '@type': 'ListItem', position: 3, name: currentBlog.value.title, item: articleUrl.value }
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
            page_title: 'Blog Article',
            page_location: window.location.href,
            page_path: window.location.pathname,
            blog_title: currentBlog.value.title,
            blog_id: currentBlog.value.id
        });
    }
});
</script>


<style scoped>
</style>
