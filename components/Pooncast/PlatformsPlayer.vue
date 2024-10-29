<template>
  <div class="border-primary border-solid border rounded-lg px-5  py-2 font-syne font-bold w-full">
    <div class="flex items-center justify-center space-x-5 lg:space-x-8">
      <a
      :href="pooncastAudio.spotify"
      target="_blank"
      title="Spotify"
      rel="noopener noreferrer"
      class="cursor-pointer"
      @click="trackClick('Spotify')"
    >
      <img src="@/assets/img/home/logo_spotify.svg" class="size-14" :alt="'Lien Spotify du pooncast ' + pooncastTitle" />
    </a>

    <a
      :href="pooncastAudio.apple"
      target="_blank"
      title="Apple Podcast"
      rel="noopener noreferrer"
      class="cursor-pointer"
      @click="trackClick('Apple Podcast')"
    >
      <img src="@/assets/img/home/logo_applepodcast.svg" class="size-14" :alt="'Lien Apple Podcast du pooncast ' + pooncastTitle" />
    </a>

    <a
      :href="pooncastAudio.amazon"
      target="_blank"
      title="Amazon Music"
      rel="noopener noreferrer"
      class="cursor-pointer"
      @click="trackClick('Amazon Music')"
    >
      <img src="@/assets/img/home/logo_amazon.svg" class="size-14" :alt="'Lien Amazon Music du pooncast ' + pooncastTitle" />
    </a>

    <a
      :href="pooncastAudio.podcastaddict"
      target="_blank"
      title="Podcast Addict"
      rel="noopener noreferrer"
      class="cursor-pointer"
      @click="trackClick('Podcast Addict')"
    >
      <img src="@/assets/img/home/logo_podcastaddict.svg" class="size-14" :alt="'Lien Podcast Addict du pooncast ' + pooncastTitle" />
    </a>
     
    </div>   
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { logEvent } from 'firebase/analytics';

const props = defineProps({
  pooncastAudio: {
    type: Object,
    default: () => ({
      spotify: '',
      apple: '',
      podcastaddict: '',
      amazon: ''
    })
  },
  pooncastTitle: String
});


const { $analytics } = useNuxtApp();

const trackClick = (platform) => {
  if ($analytics) {
    logEvent($analytics, 'select_content', {
      content_type: 'external_link',
      item_id: platform,
      pooncast_title: props.pooncastTitle
    });
  } else {
    console.error('Firebase Analytics is not initialized or logEvent is not a function.');
  }
};

</script>

<style scoped>

</style>
