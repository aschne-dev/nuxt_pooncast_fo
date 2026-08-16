<template>
    <div class="overflow-hidden lg:overflow-visible">
      <ClientOnly>
      <CookieControl locale="fr">
        <template #bar>
          <h2 class="text-primary">Ce site utilise des cookies et vous donne le contrôle sur leur activation.</h2>
          <p class="text-primary">Nous utilisons des cookies pour mesurer et analyser notre trafic, et pour sécuriser les informations
            transmises via notre formulaire de participation au Pooncast.</p>
        </template>
      </CookieControl>
    </ClientOnly>
    
      <header>
        <Navbar />
      </header>

      <main>
        <SharePooncast />
        <ShareBlog/>
            <slot />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  </template>
  
  <script setup>
  import SharePooncast from '~/components/Pooncast/SharePooncast.vue';
  import ShareBlog from '~/components/Blog/ShareBlog.vue';
  import { DEFAULT_SOCIAL_IMAGE, serializeJsonLd, SITE_URL } from '~/utils/content';

  const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Le Pooncast',
        url: SITE_URL,
        logo: DEFAULT_SOCIAL_IMAGE,
        sameAs: [
          'https://www.instagram.com/lepooncast',
          'https://www.facebook.com/profile.php?id=61562418675417',
          'https://www.linkedin.com/company/le-pooncast/'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Le Pooncast',
        url: SITE_URL,
        inLanguage: 'fr-FR',
        publisher: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'PodcastSeries',
        '@id': `${SITE_URL}/#podcast`,
        name: 'Le Pooncast',
        url: SITE_URL,
        inLanguage: 'fr-FR',
        description: 'Un podcast éducatif et participatif qui répond aux questions des enfants sous forme d’histoires.',
        image: DEFAULT_SOCIAL_IMAGE,
        publisher: { '@id': `${SITE_URL}/#organization` },
        sameAs: [
          'https://open.spotify.com/show/3TVuR9LXli8tGw4Weh3gc7',
          'https://podcasts.apple.com/fr/podcast/le-pooncast/id1758948593',
          'https://music.amazon.fr/podcasts/9119c45f-cd4e-4d0a-9f0d-16c48657e8e4/le-pooncast',
          'https://podcastaddict.com/podcast/le-pooncast/5232443'
        ]
      }
    ]
  };

  useHead({
    script: [
      {
        key: 'pooncast-site-schema',
        type: 'application/ld+json',
        innerHTML: serializeJsonLd(siteSchema)
      }
    ]
  });
  </script>

<style>
.no-scroll {
  overflow: hidden;
}
</style>
