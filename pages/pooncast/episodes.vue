<template>
  <div>
    <section id="SaisonsTop" aria-labelledby="episodes-title">
      <div class="mx-2 mt-[150px] text-center">
        <!-- Titre principal de la page -->
        <h1 id="episodes-title" class="font-syne">Épisodes</h1>
        <h2 class="font-nunito font-normal text-lg lg:text-xl text-center mt-3 mx-10">
          Retrouvez ici tous les épisodes du Pooncast par saison.
        </h2>
        <img class="mt-10 mx-auto" src="@/assets/img/episodes/stars_pattern.svg" alt="Retrouvez ici tous les épisodes du Pooncast par saison." />

        <!-- Sélecteur de saison avec aria-label -->
        <div class="w-full mt-12 mx-auto px-5">
          <div v-if="loading" class="flex justify-center" aria-busy="true">
            <Loading fillColor="fill-secondary" />
          </div>
          <select
            v-else
            aria-label="Choisir une saison"
            v-model="selectedSeason"
            @change="onSeasonChange"
            class="block w-full md:w-2/3 lg:w-1/2 xl:w-1/3 md:mx-auto mt-1 bg-primary border border-secondary rounded-md shadow-sm px-5 py-2 font-syne text-lg md:text-xl focus:border-secondary focus:outline-none"
          >
            <option v-for="season in seasons" :key="season.id" :value="season.id">
              #{{ season.id }} . {{ season.title }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Section pour les épisodes d'une saison spécifique -->
    <section id="EpisodesBySeason" aria-labelledby="episodes-by-season">
      <h2 id="episodes-by-season" class="sr-only">Épisodes par saison sélectionnée</h2>
      <PooncastBySeason :season="selectedSeason" @no-episodes="handleNoEpisodes" />
    </section>

    <!-- Sélecteur de saison en bas de page, réutilisé pour naviguer entre saisons -->
    <section id="SaisonsBottom" v-if="!noEpisodes" aria-labelledby="choose-season-bottom">
      <div class="mx-2 mt-10 text-center">
        <h2 id="choose-season-bottom" class="sr-only">Choisissez une saison pour afficher les épisodes</h2>
        <div class="w-full mt-12 mx-auto px-5">
          <div v-if="loading" class="flex justify-center" aria-busy="true">
            <Loading fillColor="fill-secondary" />
          </div>
          <select
            v-else
            aria-label="Choisir une saison"
            v-model="selectedSeason"
            @change="onSeasonChange"
            class="block w-full md:w-2/3 lg:w-1/2 xl:w-1/3 md:mx-auto mt-1 bg-primary border border-secondary rounded-md shadow-sm px-5 py-2 font-syne text-lg md:text-xl focus:border-secondary focus:outline-none"
          >
            <option v-for="season in seasons" :key="season.id" :value="season.id">
              #{{ season.id }} . {{ season.title }}
            </option>
          </select>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
    title: 'Épisodes du PoonCast - Écoutez tous les épisodes maintenant',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Écoutez tous les épisodes du Pooncast, explorez les saisons passées, et restez à jour avec vos podcasts préférés.'
        },
        { hid: 'og:title', property: 'og:title', content: 'Épisodes du PoonCast - Écoutez tous les épisodes maintenant' },
        { hid: 'og:description', property: 'og:description', content: 'Écoutez tous les épisodes du Pooncast, explorez les saisons passées, et restez à jour avec vos podcasts préférés.' },
        { hid: 'og:image', property: 'og:image', content: 'https://lepooncast.com/logo_og.jpeg' },
        { hid: 'og:url', property: 'og:url', content: 'https://lepooncast.com/pooncast/' }
    ]
})

import { usepooncastsSeasonStore } from '@/stores/Pooncast/PooncastSeason'

const seasonStore = usepooncastsSeasonStore();
const {seasons, loading } = storeToRefs(seasonStore);
seasonStore.fetchSeasons();

const selectedSeason = ref(1);
// Variable pour indiquer s'il y a des épisodes
const noEpisodes = ref(false);

// Watcher pour réinitialiser `noEpisodes` lorsque `selectedSeason` change
watch(selectedSeason, (newSeason) => {
  noEpisodes.value = false;
  
  // Défiler la page vers le haut
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 100);  // Délai de 100ms
});

// Fonction appelée lorsque le composant PooncastBySeason émet l'événement no-episodes
function handleNoEpisodes() {
  noEpisodes.value = true;
}

// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Episodes List',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});
</script>

<style>

</style>
