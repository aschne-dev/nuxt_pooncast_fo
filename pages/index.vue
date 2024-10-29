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

const domainUrl = 'https://lepooncast.com';
useHead({
    title: 'Le PoonCast - Épisodes de podcasts éducatifs pour enfants',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Découvrez le PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie avec des histoires captivantes.'
        },
        { hid: 'og:title', property: 'og:title', content: 'Le PoonCast - Épisodes de podcasts éducatifs pour enfants' },
        { hid: 'og:description', property: 'og:description', content: 'Découvrez le PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie avec des histoires captivantes.' },
        { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
        { hid: 'og:url', property: 'og:url', content: domainUrl }
    ]
})

// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Home Page',
            page_location: window.location.url,
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