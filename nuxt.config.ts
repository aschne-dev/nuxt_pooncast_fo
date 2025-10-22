export default defineNuxtConfig({
  compatibilityDate: "2024-08-15",
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.",
        },
        // Open Graph
        {
          hid: "og:title",
          property: "og:title",
          content: "Le PoonCast - Épisodes de podcasts éducatifs pour enfants",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.",
        },
        { hid: "og:image", property: "og:image", content: "/logo_og.jpeg" },
        // Twitter Card
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:title", name: "twitter:title", content: "Le Pooncast" },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/logo_og.jpeg",
        },
      ],
      link: [
        // Favicon pour les navigateurs
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },

        // Apple Touch Icon pour iOS
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        // Icône Android Chrome
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#FBF2E0" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_FIREBASE_APP_ID,
      metaPixelId: process.env.NUXT_META_PIXEL_ID,
    },
  },

  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        region: "europe-west1",
      },
      serverFunctionName: "server_fo",
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-aos",
    "nuxt-vuefire",
    "@pinia/nuxt",
    "vue3-carousel-nuxt",
    "@nuxtjs/fontaine",
    "@dargmuesli/nuxt-cookie-control",
  ],

  // AOS
  aos: {
    duration: 1000,
    once: true,
  },

  // VUE FIRE
  vuefire: {
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
    },
  },

  // SITE
  site: {
    url: "https://lepooncast.com",
    name: "Le Pooncast",
  },

  // FONTAINE
  fontaine: {
    families: {
      Fraunces: true,
      Syne: true,
      Nunito: true,
    },
  },

  cookieControl: {
    barPosition: "bottom-full",
    colors: {
      barBackground: "#FF774C",
      barButtonBackground: "#FBF2E0",
      barButtonHoverBackground: "#030211",
      barButtonColor: "#030211",

      modalBackground: "#FF774C",
      modalButtonBackground: "#FBF2E0",
      modalButtonColor: "#030211",
      modalTextColor: "#030211",

      checkboxActiveBackground: "#FBF2E0",
      checkboxActiveCircleBackground: "#FF774C",

      controlButtonBackground: "#FBF2E0",
      controlButtonHoverBackground: "#030211",
      controlButtonIconColor: "#030211",
      controlButtonIconHoverColor: "#FBF2E0",
    },

    cookies: {
      necessary: [
        {
          description: {
            fr: "Les cookies nécessaires contribuent à rendre un site web utilisable en activant des fonctions de base comme la navigation de page et l'accès aux zones sécurisées du site web. Le site web ne peut pas fonctionner correctement sans ces cookies. Nous utilisons les cookies hcaptcha et firebase. ",
          },
          id: "necessary",
          name: {
            fr: "Cookies Nécessaires",
          },
        },
      ],
      optional: [
        {
          description: {
            fr: "Les cookies statistiques aident les propriétaires du site web, par la collecte et la communication d'informations de manière anonyme, à comprendre comment les visiteurs interagissent avec les sites web. Nous utilisons les cookies Meta et Google Analytics",
          },
          id: "analytics",
          name: "Statistiques",
          links: {
            "/legal/politique-confidentialite":
              "Consultez notre politique de confidentialité",
          },
        },
      ],
    },

    isAcceptNecessaryButtonEnabled: false,
    locales: ["fr"],
  },
});
