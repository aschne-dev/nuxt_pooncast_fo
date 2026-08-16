const isStagingNoIndex = process.env.NUXT_STAGING_NOINDEX === "true";

export default defineNuxtConfig({
  compatibilityDate: "2024-08-15",
  ssr: true,
  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
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
      functionsBaseUrl: process.env.NUXT_FUNCTIONS_BASE_URL,
      hcaptchaSiteKey:
        process.env.NUXT_HCAPTCHA_SITEKEY || "4b7e841c-cedc-4b32-96e0-69e06436c76e",
      stagingNoIndex: isStagingNoIndex,
    },
  },

  nitro: {
    externals: {
      traceInclude: ["./node_modules/firebase-functions/lib/v1/index.js"],
    },
    firebase: {
      gen: 2,
      nodeVersion: "20",
      httpsOptions: {
        region: "europe-west1",
      },
      serverFunctionName: "server_fo",
    },
  },

  routeRules: {
    "/": {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
    "/pooncast/episodes": {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
    "/poonblog": {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
    "/legal": {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
    "/legal/politique-confidentialite": {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
    "/legal/termes-et-conditions": {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-aos",
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

  // FONTAINE
  // @ts-expect-error @nuxtjs/fontaine 0.4 does not expose its Nuxt 3 config augmentation.
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
