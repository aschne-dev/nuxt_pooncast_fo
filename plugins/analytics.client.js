import { initializeAnalytics, isSupported } from "firebase/analytics";

export default defineNuxtPlugin(async (nuxtApp) => {
  const firebaseApp = useFirebaseApp();

  console.log("Loading analytics");

  let analytics = null;

  // Fonction pour initialiser le Pixel Meta
  const initializeMetaPixel = () => {
    try {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        t.onerror = () => console.log("Meta Pixel blocked by client.");
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      fbq("init", process.env.NUXT_META_PIXEL_ID);
      fbq("track", "PageView");
      console.log("Meta Pixel loaded");
    } catch (error) {
      console.warn(
        "Meta Pixel could not be initialized due to client blocking."
      );
    }
  };

  // Vérifiez si Firebase Analytics est supporté par le navigateur
  if (await isSupported()) {
    console.log("Firebase Analytics is supported");

    // Vérifie si l'utilisateur a accepté les cookies de CookieControl
    const { cookiesEnabled, cookiesEnabledIds } = useCookieControl();

    if (
      cookiesEnabled &&
      cookiesEnabledIds.value &&
      cookiesEnabledIds.value.includes("analytics")
    ) {
      console.log("Cookie accepted by user");
      analytics = initializeAnalytics(firebaseApp);
      initializeMetaPixel(); // Initialiser le Pixel Meta si le consentement est donné
    } else {
      console.log("Cookie not accepted by user");
    }

    // Watcher pour surveiller les changements du consentement de cookie analytics
    watch(
      () => cookiesEnabledIds.value,
      (current, previous) => {
        if (!previous?.includes("analytics") && current.includes("analytics")) {
          console.log("User just accepted analytics cookie");
          analytics = initializeAnalytics(firebaseApp); // Initialiser Analytics dynamiquement
          initializeMetaPixel(); // Initialiser le Pixel Meta dynamiquement
        }
        window.location.reload();
      },
      { deep: true }
    );
  } else {
    console.log("Firebase Analytics is not supported");
  }

  return {
    provide: {
      analytics,
    },
  };
});
