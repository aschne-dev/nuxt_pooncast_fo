<template>
    <div>
        <HomeBlog />
    </div>
</template>

<script setup>
import HomeBlog from '~/components/Blog/HomeBlog.vue';
useHead({
    title: "Le PoonBlog - Articles et ressources éducatives pour enfants",
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: "Découvrez des articles éducatifs et amusants pour éveiller la curiosité des enfants sur le PoonBlog."
        },
        { hid: 'og:title', property: 'og:title', content: 'Le PoonBlog - Articles et ressources éducatives pour enfants' },
        { hid: 'og:description', property: 'og:description', content: 'Découvrez des articles éducatifs et amusants pour éveiller la curiosité des enfants sur le PoonBlog.' },
        { hid: 'og:image', property: 'og:image', content: 'https://lepooncast.com/logo_og.jpeg' },
        { hid: 'og:url', property: 'og:url', content: 'https://lepooncast.com/poonblog/' }
    ],
    link: [
          { rel: 'canonical', href: 'https://lepooncast.com/inscrivez-vous-au-pooncast/' }
      ]
});

// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'PoonBlog',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});
</script>

<style scoped>

</style>