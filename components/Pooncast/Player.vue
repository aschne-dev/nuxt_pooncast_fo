<template>
  <div class="border-primary border-solid border rounded-lg px-5 py-2 font-syne font-bold w-full bg-secondary">
    <div class="flex items-center justify-center relative">
      <!-- Bouton pour lire/pauser l'audio -->
      <button v-if="!isPlaying" @click="handleAudio" aria-label="Lecture">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="size-8 ml-2 hover:fill-primary transition-colors ease-in duration-150">
          <path d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM23.447 16.895L11.447 22.895C11.2945 22.9712 11.1251 23.0072 10.9548 22.9994C10.7845 22.9917 10.619 22.9406 10.474 22.8509C10.329 22.7613 10.2093 22.636 10.1264 22.4871C10.0434 22.3381 9.99993 22.1705 10 22V10C10.0001 9.82961 10.0437 9.66207 10.1268 9.51327C10.2098 9.36448 10.3294 9.23936 10.4744 9.14981C10.6194 9.06025 10.7848 9.00921 10.955 9.00155C11.1252 8.99388 11.2946 9.02984 11.447 9.106L23.447 15.106C23.6129 15.1891 23.7524 15.3168 23.8498 15.4747C23.9473 15.6326 23.9989 15.8145 23.9989 16C23.9989 16.1855 23.9473 16.3674 23.8498 16.5253C23.7524 16.6832 23.6129 16.8109 23.447 16.894"/>
        </svg>
      </button>

      <button v-else @click="handleAudio" aria-label="Pause">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 ml-2 hover:fill-primary transition-colors ease-in duration-150">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      <!-- Bouton de partage -->
      <button class="absolute right-0 p-5" @click="handleShare" aria-label="Partager l'épisode du pooncast">
        <img class="size-5" src="@/assets/img/pooncast/share.svg" alt="Partager l'épisode du pooncast" />
      </button>
    </div>

    <div class="flex items-center justify-center gap-3 mt-2">
      <span class="w-8 font-nunito text-xs font-normal">{{ formattedCurrentTime }}</span>
      <input
        type="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        @input="seekAudio"
        class="range-slider mx-2"
        aria-label="Contrôle de la progression de l'audio"
      />
      <span class="w-8 font-nunito text-xs font-normal">{{ formattedDuration }}</span>
      <audio ref="audioPlayer" :src="fluxRss" @timeupdate="updateProgress" @loadedmetadata="setDuration" />
    </div>   
  </div>
</template>

<script setup>
import { useSharePooncastStore } from '@/stores/Pooncast/SharePooncast';
import { usePooncastStore } from '@/stores/Pooncast/Pooncast';
import { logEvent } from 'firebase/analytics';

const sharePooncastStore = useSharePooncastStore();

const props = defineProps({
  fluxRss: String,
  idPooncast: String
});

const isPlaying = ref(false);
const audioPlayer = ref(null);
const currentTime = ref(0);
const duration = ref(0);

const pooncastStore = usePooncastStore();
const currentPooncast = computed(() => pooncastStore.pooncastById(props.idPooncast));

// Construct URLs for sharing
function generateSlug(title) {
  // Remplacer les caractères accentués par leurs équivalents non accentués
  const accentMap = {
    'à': 'a', 'â': 'a', 'ä': 'a', 'á': 'a', 'ã': 'a', 'å': 'a', 'æ': 'ae',
    'ç': 'c', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'í': 'i', 'ì': 'i',
    'î': 'i', 'ï': 'i', 'ñ': 'n', 'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o',
    'õ': 'o', 'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y',
    'æ': 'ae', 'œ': 'oe'
  };
  
  // Remplacer les accents
  title = title.replace(/[àâäáãåæçéèêëíìîïñóòôöõúùûüýÿœ]/g, (match) => accentMap[match]);

  // Générer le slug
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const domainUrl = 'https://lepooncast.com';
const shareTitle = computed(() => currentPooncast.value ? generateSlug(currentPooncast.value.titre) : 'title');
const shareUrl = computed(() => `${domainUrl}/pooncast/${shareTitle.value}/${currentPooncast.value.id}`);
const shareText = computed(() => `Découvrez : ${currentPooncast.value.titre}`);




// PARTAGE
const handleShare = async () => {

  if (navigator.share) {
    try {
      /*await navigator.share({
        title: 'Le Pooncast',
        text: shareText.value,
        url: shareUrl.value,
      });*/
      
      // ANALYTICS
      const { $analytics } = useNuxtApp();
      if ($analytics) { // Utilisez $analytics ici
          logEvent($analytics, 'share', {
            content_type: 'pooncast',
            share_mode: 'native',
            item_id: currentPooncast.value.id,
            item_title: currentPooncast.value.titre
          });
      }

      await navigator.share({
        url: shareUrl.value,
      });
    } catch (err) {
      console.error('Partage annulé ou erreur lors du partage:', err.message);
      // Si l'erreur est une annulation, ne faites rien
      // Sinon, affichez le popup de partage
      if (err.name !== 'AbortError' && err.message !== 'The user aborted a request.') {
         // ANALYTICS
         const { $analytics } = useNuxtApp();
        if ($analytics) { // Utilisez $analytics ici
            logEvent($analytics, 'share', {
              content_type: 'pooncast',
              share_mode: 'custom',
              item_id: currentPooncast.value.id,
              item_title: currentPooncast.value.titre
            });
        }
        sharePooncastStore.showSharePopup(currentPooncast.value.id);
      }
    }
  } else {
    // L'API de partage n'est pas supportée, on affiche directement la popup

    // // ANALYTICS
    const { $analytics } = useNuxtApp();
    if ($analytics) { // Utilisez $analytics ici
          logEvent($analytics, 'share', {
            content_type: 'pooncast',
            share_mode: 'custom',
            item_id: currentPooncast.value.id,
            item_title: currentPooncast.value.titre
          });
      }
    sharePooncastStore.showSharePopup(currentPooncast.value.id);
  }
};


let startTime = null;
let totalListeningTime = 0;

const handleAudio = () => {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      // L'utilisateur met en pause ou arrête l'audio
      audioPlayer.value.pause();
      
      // Enregistrer le temps de fin et calculer la durée d'écoute
      const endTime = Date.now();
      const listeningTime = endTime - startTime;
      totalListeningTime += listeningTime;

      // Loguer l'événement dans Firebase Analytics
      const { $analytics } = useNuxtApp();
      if ($analytics) {
        logEvent($analytics, 'podcast_pause', {
          podcast_title: currentPooncast.value.titre,
          podcast_id: currentPooncast.value.id,
          listening_duration: listeningTime / 1000 // en secondes
        });
      }
    } else {
      // L'utilisateur commence à lire l'audio
      audioPlayer.value.play();
      
      // Enregistrer le temps de début
      startTime = Date.now();

      const { $analytics } = useNuxtApp();
      if ($analytics) {
        logEvent($analytics, 'podcast_play', {
          podcast_title: currentPooncast.value.titre,
          podcast_id: currentPooncast.value.id,
          play_time: new Date().toISOString()
        });
      }
    }
    isPlaying.value = !isPlaying.value;
  }
};


const updateProgress = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
  }
};

const setDuration = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration;
  }
};

const seekAudio = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentTime.value;
  }
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const formattedCurrentTime = computed(() => formatTime(currentTime.value));
const formattedDuration = computed(() => formatTime(duration.value));
</script>

<style scoped>
.range-slider {
  -webkit-appearance: none;
  height: 8px;
  @apply bg-poonblack;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.range-slider:hover {
  opacity: 1;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  @apply bg-primary;
  cursor: pointer;
}

.range-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  @apply bg-primary;
  cursor: pointer;
}

.range-slider::-ms-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  @apply bg-primary;
  cursor: pointer;
}
</style>
