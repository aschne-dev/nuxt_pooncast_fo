<template>
    <div>
      <FormNewsletter />
    </div>
  </template>

  <script setup>
  import FormNewsletter from '~/components/Newsletter/FormNewsletter.vue';

  usePooncastSeo({
      title: "Inscrivez-vous au Pooncast - Rejoignez notre aventure éducative",
      description: "Inscrivez-vous au Pooncast pour recevoir les nouveaux épisodes, les articles et les actualités du podcast éducatif pour enfants.",
      path: '/inscrivez-vous-au-pooncast'
  });
  
  // ANALYTICS
  onMounted(() => {
      const { $analytics } = useNuxtApp();
  
      if ($analytics) { // Utilisez $analytics ici
          logEvent($analytics, 'page_view', {
              page_title: 'Newsletter Form',
              page_location: window.location.href,
              page_path: window.location.pathname
          });
      }
  });
  </script>
