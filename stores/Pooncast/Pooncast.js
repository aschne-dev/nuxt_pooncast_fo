import { defineStore } from 'pinia';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { normalizeContentDocument } from '~/utils/content';
import { fetchPooncastDocumentById } from '~/utils/firestore-content';

export const usePooncastStore = defineStore('Pooncast', {
  state: () => ({
    pooncasts: [],
    allPooncastsLoaded: false,
    loading: true,
    error: null,
  }),
  actions: {
    async fetchPooncasts(seasons = []) {
      if (this.allPooncastsLoaded) {
        this.loading = false;
        return this.pooncasts;
      }

      this.loading = true;
      this.error = null;
      const firestore = getFirestore(useNuxtApp().$firebaseApp);

      try {
        const pooncastsSnapshot = await getDocs(collection(firestore, 'pooncasts'));
        const pooncasts = pooncastsSnapshot.docs.map(doc => {
          const pooncastData = { ...doc.data(), id: doc.id };
          const season = seasons.find(season => Number(season.id) === Number(pooncastData.saison));
          return {
            ...normalizeContentDocument(pooncastData),
            seasonName: season ? season.title : `Saison ${pooncastData.saison}`,
          };
        });

        this.pooncasts = pooncasts;
        this.allPooncastsLoaded = true;
        this.loading = false;
        return this.pooncasts;
      } catch (error) {
        console.error('Error fetching pooncasts: ', error);
        this.error = 'Error fetching pooncasts';
        this.loading = false;
        throw error;
      }
    },
    async fetchPooncastById(id) {
      const existingPooncast = this.pooncastById(String(id));

      if (existingPooncast) {
        this.loading = false;
        return existingPooncast;
      }

      this.loading = true;
      this.error = null;
      const firestore = getFirestore(useNuxtApp().$firebaseApp);

      try {
        const pooncast = await fetchPooncastDocumentById(firestore, id);

        if (pooncast) {
          this.pooncasts.push(pooncast);
        }

        this.loading = false;
        return pooncast;
      } catch (error) {
        console.error('Error fetching pooncast: ', error);
        this.error = 'Error fetching pooncast';
        this.loading = false;
        throw error;
      }
    },
  },
  getters: {
    episodesBySeason: (state) => {
      return (season) => state.pooncasts
        .filter(pooncast => Number(pooncast.saison) === Number(season))
        .sort((a, b) => a.episodeNumber - b.episodeNumber);
    },
    pooncastById: (state) => {
      return (id) => state.pooncasts.find(pooncast => pooncast.id === id);
    },
    episodeCountBySeason: (state) => {
      return (season) => state.pooncasts.filter(pooncast => Number(pooncast.saison) === Number(season)).length;
    },
    recentPooncasts: (state) => {
      return (nbPooncasts) => state.pooncasts
        .slice()
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, nbPooncasts);
    }
  },
});
