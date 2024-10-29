import { initializeAnalytics, isSupported } from 'firebase/analytics';

export default defineNuxtPlugin(async (nuxtApp) => {
  const firebaseApp = useFirebaseApp();

  console.log('Loading analytics');

  let analytics = null;

  // Vérifiez si Firebase Analytics est supporté par le navigateur
  if (await isSupported()) {
    console.log('Firebase Analytics is supported');

    // Vérifiez si l'utilisateur a accepté les cookies de statistiques via Cookiebot
    if (window.CookieConsent && window.CookieConsent.consented && window.CookieConsent.consent) {
      console.log('Cookiebot is available');

      const consent = window.CookieConsent.consent;

      if (consent.statistics) {
        console.log('User consented to statistics cookies');
        analytics = initializeAnalytics(firebaseApp);
        console.log('Loaded analytics');
      } else {
        console.log('User did not consent to analytics cookies');
      }

      // Initialiser le Pixel Meta si l'utilisateur a consenti aux cookies marketing
      if (consent.marketing) {
        console.log('User consented to marketing cookies');
        // Initialiser le Pixel Meta
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'REMOVED');
        fbq('track', 'PageView');
        console.log('Loaded Meta Pixel');
      }
    } else {
      console.log('Cookiebot is not available or consent information is missing');
    }

  } else {
    console.log('Firebase Analytics is not supported');
  }

  return {
    provide: {
      analytics,
    },
  };
});
