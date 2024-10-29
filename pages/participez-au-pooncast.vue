<template>
    <div>
        <ParticipationForm />
    </div>
</template>

<script setup>
import ParticipationForm from '~/components/Pooncast/ParticipationForm.vue';
const domainUrl = 'https://lepooncast.com';
useHead({
    title: "Participez au PoonCast - Partagez vos idées et rejoignez l'aventure",
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: "Participez au PoonCast en proposant vos idées et questions pour des contenus éducatifs captivants. Rejoignez l'aventure maintenant !"
        },
        {
            hid: 'canonical',
            rel: 'canonical',
            href: 'https://lepooncast.com/participez-au-pooncast'
        },
        { hid: 'og:title', property: 'og:title', content: "Participez au PoonCast - Partagez vos idées et rejoignez l'aventure" },
        { hid: 'og:description', property: 'og:description', content: "Participez au PoonCast en proposant vos idées et questions pour des contenus éducatifs captivants. Rejoignez l'aventure maintenant !" },
        { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
        { hid: 'og:url', property: 'og:url', content: 'https://lepooncast.com/participez-au-pooncast/' }
    ]
});


// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Participation Form',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});

</script>

<style scoped>

</style>