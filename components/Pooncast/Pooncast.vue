<template>
  <div class="flex flex-col py-6 px-8 lg:px-3 relative rounded-3xl shadow-lg bg-secondary border-primary border w-80"
       :class="[bgOpacity || 'bg-opacity-100']" aria-labelledby="pooncast-title-{{ pooncast.id }}">
       
      <!-- Titre de l'épisode masqué visuellement mais accessible aux lecteurs d'écran -->
      <h3 class="sr-only" :id="'pooncast-title-' + pooncast.id">{{ pooncast.titre }}</h3>

      <!-- IMAGE -->
      <div class="flex justify-center">
          <img :src="pooncast.visuel" :alt="'Visuel de l’épisode : ' + pooncast.titre" class="w-64 h-auto rounded-2xl" />
      </div>
  
      <!-- SAISON -->
      <div class="font-syne text-primary font-bold lg:text-xl pt-5 flex gap-2 lg:px-5"> 
          <p>{{ pooncast.seasonName }}</p>   
      </div>

      <!-- NUMERO EPISODE -->
      <div class="font-syne text-primary font-bold lg:text-xl flex gap-2 lg:px-5"> 
          <p>Épisode {{ pooncast.episodeNumber }}</p>   
      </div>
  
      <!-- TITRE DE L’ÉPISODE-->
      <div class="font-syne text-poonblack font-bold lg:text-xl pt-2 lg:px-5">
          <span>{{ pooncast.titre }}</span>
      </div>
  
      <!-- DESCRIPTION -->
      <p class="font-nunito text-poonblack pt-2 leading-6 font-normal flex-grow lg:px-5">
          <span v-html="pooncast.description"></span>
      </p>
  
      <!-- PLATEFORMES DE PODCAST -->
      <div class="mt-5 mb-auto flex items-center justify-between w-full">
          <PlatformsPlayer :pooncastAudio="pooncast.audio" :pooncastTitle="pooncast.titre" />
      </div>
  </div>
</template>

  
<script setup>
import Player from './Player.vue';
import PlatformsPlayer from './PlatformsPlayer.vue';

const props = defineProps({
  pooncast: {
    type: Object,
    required: true
  },
  bgOpacity: {
    type: String,
  }
});
  
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
