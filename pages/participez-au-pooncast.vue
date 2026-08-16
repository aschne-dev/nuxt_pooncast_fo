<template>
    <div>
        <ParticipationForm />
    </div>
</template>

<script setup>
import ParticipationForm from '~/components/Pooncast/ParticipationForm.vue';
import { usepooncastsSeasonStore } from '~/stores/Pooncast/PooncastSeason';

const seasonStore = usepooncastsSeasonStore();
await Promise.allSettled([
    callOnce('seasons', () => seasonStore.fetchSeasons())
]);

usePooncastSeo({
    title: "Participez au PoonCast - Partagez vos idées et rejoignez l'aventure",
    description: "Parents, envoyez la question de votre enfant au Pooncast par écrit ou en message audio pour inspirer une prochaine histoire éducative.",
    path: '/participez-au-pooncast'
});


// ANALYTICS
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Participation Form',
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
});

</script>

<style scoped>

</style>
