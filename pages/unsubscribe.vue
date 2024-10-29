<template>
  <div>
    <UnsubscribeForm />
  </div>
</template>

<script setup>
import UnsubscribeForm from '~/components/Newsletter/UnsubscribeForm.vue';

const domainUrl = 'https://lepooncast.com';
useHead({
    title: "Participez au PoonCast - Partagez vos idées et rejoignez l'aventure",
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: "Rejoignez l'aventure du PoonCast en participant à nos épisodes ! Proposez vos idées, posez vos questions, et contribuez à créer des contenus éducatifs captivants pour les enfants. Participez dès maintenant !"
        },
        { hid: 'og:title', property: 'og:title', content: "Participez au PoonCast - Partagez vos idées et rejoignez l'aventure" },
        { hid: 'og:description', property: 'og:description', content: "Rejoignez l'aventure du PoonCast en participant à nos épisodes ! Proposez vos idées, posez vos questions, et contribuez à créer des contenus éducatifs captivants pour les enfants. Participez dès maintenant !" },
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
            page_title: 'Unsubsribe',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});
</script>

<style>

</style>