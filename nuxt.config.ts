export default defineNuxtConfig({
  compatibilityDate: "2024-08-15",
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {      
      htmlAttrs: {
        lang: 'fr'
      },
      script: [
        {
          hid: 'cookiebot',
          id: 'Cookiebot',
          src: 'https://consent.cookiebot.com/uc.js',
          'data-cbid': '740cab42-2799-4288-8780-7a2448bdade0',
          type: 'text/javascript',
          async: true,
        }
      ],
      
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Le PoonCast - Épisodes de podcasts éducatifs pour enfants' },
        { hid: 'og:description', property: 'og:description', content: 'Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.' },
        { hid: 'og:image', property: 'og:image', content: '/logo_og.jpeg' },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Le Pooncast' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.' },
        { hid: 'twitter:image', name: 'twitter:image', content: '/logo_og.jpeg' },
      ],
      link: [
        // Favicon pour les navigateurs
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        
        // Apple Touch Icon pour iOS
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        
        // Icône Android Chrome
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#FBF2E0' },
      ]
    }
  },
  
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        region: 'europe-west1'
      },
      serverFunctionName: "server_fo"
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-aos",
    "nuxt-vuefire",
    "@pinia/nuxt",
    "vue3-carousel-nuxt",
    "@nuxtjs/fontaine",
  ],

  // AOS
  aos: {
    duration:1000,
    once: true
  },

  // VUE FIRE
  vuefire: {
    config: {
      apiKey: "REMOVED",
      authDomain: "REMOVED",
      projectId: "REMOVED",
      storageBucket: "REMOVED.appspot.com",
      messagingSenderId: "REMOVED",
      appId: "1:REMOVED:web:208854c630f69f50299da7"
    }
  },

  // SITE
  site: {
    url: 'https://lepooncast.com',
    name: 'Le Pooncast',

  },

  // FONTAINE
  fontaine: {
    families: {
      'Fraunces': true,
      'Syne': true,
      'Nunito': true,
    },
  },

})
