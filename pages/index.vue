<template>
    <div>
        <section id="headline">
            <HomeIntro />
        </section>

        <section id="pooncast">
            <HomePooncast />
        </section>        

        <section id="blog">
            <IntroBlog />
        </section>
        
        <section id="recommendations">
            <HomeReco />
        </section> 

        <section id="about">
            <HomeWelcome />
        </section> 

        <section id="faq">
            <HomeFaq />
            
        </section> 
    </div>    

</template>

<script setup>
import IntroBlog from '~/components/Home/IntroBlog.vue';
import { useBlogStore } from '~/stores/Blog/blog';
import { useFaqStore } from '~/stores/FAQ/faq';
import { usePooncastStore } from '~/stores/Pooncast/Pooncast';
import { usepooncastsSeasonStore } from '~/stores/Pooncast/PooncastSeason';
import { useRecommendationsStore } from '~/stores/Reco/Recommendation';
import { serializeJsonLd, SITE_URL } from '~/utils/content';

const pooncastStore = usePooncastStore();
const seasonStore = usepooncastsSeasonStore();
const blogStore = useBlogStore();
const faqStore = useFaqStore();
const recommendationsStore = useRecommendationsStore();

await callOnce('seasons', () => seasonStore.fetchSeasons());
await Promise.allSettled([
    callOnce('pooncasts', () => pooncastStore.fetchPooncasts(seasonStore.seasons)),
    callOnce('blogs', () => blogStore.fetchBlogs()),
    callOnce('faqs', () => faqStore.fetchFaqs()),
    callOnce('recommendations', () => recommendationsStore.fetchRecommendations())
]);

usePooncastSeo({
    title: 'Le PoonCast - Épisodes de podcasts éducatifs pour enfants',
    description: 'Découvrez le PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie avec des histoires captivantes.',
    path: '/'
});

const faqSchema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqStore.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.reponse
        }
    }))
}));

useHead(() => ({
    script: faqStore.faqs.length > 0 ? [{
        key: 'home-faq-schema',
        type: 'application/ld+json',
        innerHTML: serializeJsonLd(faqSchema.value)
    }] : []
}));

// ANALYTICS
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Home Page',
            page_location: window.location.href,
            page_path: window.location.pathname
        });

        // Conversion
        logEvent($analytics, 'conversion_event_page_viex', {
            event_category: 'engagement',
            event_label: 'home_view',
            value: 1
        });


    }
});

</script>

<style scoped>
.underline-c {
  position: relative;
  display: inline-block;
}

.underline-c::after {
  content: "";
  position: absolute;
  right: 0;
  height: 15px; /* Adjust the height according to your image */
  background-image: url('@/assets/img/home/underline.svg'); /* Update this path to your image location */
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
  @apply xl:-bottom-0 lg:-bottom-0 lg:left-8 md:-bottom-1 md:left-5 -bottom-3 left-1;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.custom-bounce {
    animation: bounce 1s 5;
}
</style>
