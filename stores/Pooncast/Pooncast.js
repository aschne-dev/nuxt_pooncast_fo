import { defineStore } from 'pinia';
import { useFirestore } from 'vuefire';
import { collection, getDocs } from 'firebase/firestore';

export const usePooncastStore = defineStore('Pooncast', {
  state: () => ({
    pooncasts: [],
    seasons: [], // Add a state property for seasons
    loading: true,
    error: null,
  }),
  actions: {
    async fetchPooncasts() {
      this.loading = true;
      this.error = null;
      const firestore = useFirestore();

      try {
        // Fetch seasons first
        const seasonsSnapshot = await getDocs(collection(firestore, 'seasons'));
        const seasons = seasonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch pooncasts
        const pooncastsSnapshot = await getDocs(collection(firestore, 'pooncasts'));
        const pooncasts = pooncastsSnapshot.docs.map(doc => {
          const pooncastData = { ...doc.data(), id: doc.id };
          const season = seasons.find(season => season.id === pooncastData.saison);
          return {
            ...pooncastData,
            seasonName: season ? season.title : 'Unknown Season',
          };
        });

        this.pooncasts = pooncasts;
        this.seasons = seasons; // Store seasons in the state
        this.loading = false;
      } catch (error) {
        console.error('Error fetching pooncasts: ', error);
        this.error = 'Error fetching pooncasts';
        this.loading = false;
      }
    },
  },
  getters: {
    episodesBySeason: (state) => {
      return (season) => state.pooncasts
        .filter(pooncast => pooncast.saison === season)
        .sort((a, b) => a.episodeNumber - b.episodeNumber);
    },
    pooncastById: (state) => {
      return (id) => state.pooncasts.find(pooncast => pooncast.id === id);
    },
    episodeCountBySeason: (state) => {
      return (season) => state.pooncasts.filter(pooncast => pooncast.saison === season).length;
    },
    recentPooncasts: (state) => {
      return (nbPooncasts) => state.pooncasts
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, nbPooncasts);
    }
  },
});
