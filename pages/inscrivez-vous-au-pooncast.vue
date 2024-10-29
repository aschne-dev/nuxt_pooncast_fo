<template>
    <div>
      <FormNewsletter />
    </div>
  </template>
  
  <script setup>
  import FormNewsletter from '~/components/Newsletter/FormNewsletter.vue';
  
  const domainUrl = 'https://lepooncast.com';
  useHead({
      title: "Inscrivez-vous au Pooncast - Rejoignez notre aventure éducative",
      meta: [
          {
              hid: 'description',
              name: 'description',
              content: "Inscrivez-vous au Pooncast pour recevoir nos nouveautés et explorer des contenus éducatifs captivants."
          },
          { hid: 'og:title', property: 'og:title', content: "Inscrivez-vous au Pooncast - Rejoignez notre aventure éducative" },
          { hid: 'og:description', property: 'og:description', content: "Inscrivez-vous au Pooncast pour recevoir nos nouveautés et explorer des contenus éducatifs captivants." },
          { hid: 'og:image', property: 'og:image', content: `${domainUrl}/logo_og.jpeg` },
          { hid: 'og:url', property: 'og:url', content: 'https://lepooncast.com/inscrivez-vous-au-pooncast/' }
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
              page_title: 'Newsletter Form',
              page_location: window.location.url,
              page_path: window.location.pathname
          });
      }
  });
  </script>
  
  