<template>
  <div>
    <UnsubscribeForm />
  </div>
</template>

<script setup>
import UnsubscribeForm from '~/components/Newsletter/UnsubscribeForm.vue';

usePooncastSeo({
    title: "Se désinscrire de la newsletter - Le Pooncast",
    description: "Gérez votre désinscription de la newsletter du Pooncast.",
    path: '/unsubscribe',
    robots: 'noindex, nofollow'
});


// ANALYTICS
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Unsubsribe',
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
});
</script>

<style>

</style>
