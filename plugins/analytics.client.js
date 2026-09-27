export default defineNuxtPlugin({
  name: "analytics",
  // Analytics requires the Firebase injection before reading persisted consent.
  dependsOn: ["firebase"],
  async setup(nuxtApp) {
    const { $firebaseApp: firebaseApp } = useNuxtApp();
    const runtimeConfig = useRuntimeConfig();

    let analytics = null;

    // Fonction pour initialiser le Pixel Meta
    const initializeMetaPixel = () => {
      if (!runtimeConfig.public.metaPixelId) return;

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

        window.fbq("init", runtimeConfig.public.metaPixelId);
        window.fbq("track", "PageView");
      } catch (error) {
        console.warn(
          "Meta Pixel could not be initialized due to client blocking."
        );
      }
    };

    const { cookiesEnabledIds } = useCookieControl();
    const analyticsConsentGiven = cookiesEnabledIds.value?.includes("analytics") ?? false;

    // Le SDK Analytics ne doit être téléchargé et initialisé qu'après consentement.
    if (analyticsConsentGiven) {
      const { initializeAnalytics, isSupported } = await import("firebase/analytics");

      if (await isSupported()) {
        analytics = initializeAnalytics(firebaseApp);
        initializeMetaPixel();
      }
    }

    // Recharger garantit que l'injection reflète immédiatement le nouveau consentement.
    watch(
      () => cookiesEnabledIds.value,
      (current, previous) => {
        const wasEnabled = previous?.includes("analytics") ?? false;
        const isEnabled = current?.includes("analytics") ?? false;

        if (wasEnabled !== isEnabled) {
          window.location.reload();
        }
      },
      { deep: true }
    );

    return {
      provide: {
        analytics,
      },
    };
  },
});
