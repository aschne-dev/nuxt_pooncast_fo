import { getApp, getApps, initializeApp } from "firebase/app";

export default defineNuxtPlugin({
  name: "firebase",
  setup() {
    const config = useRuntimeConfig().public;
    const firebaseConfig = {
      apiKey: config.firebaseApiKey,
      authDomain: config.firebaseAuthDomain,
      projectId: config.firebaseProjectId,
      storageBucket: config.firebaseStorageBucket,
      messagingSenderId: config.firebaseMessagingSenderId,
      appId: config.firebaseAppId,
    };
    const firebaseApp = getApps().some((app) => app.name === "[DEFAULT]")
      ? getApp()
      : initializeApp(firebaseConfig);

    return {
      provide: {
        firebaseApp,
      },
    };
  },
});
