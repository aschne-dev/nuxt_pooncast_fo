// stores/PooncastSeason.js
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const usepooncastsSeasonStore = defineStore('pooncastsSeason', {
  state: () => ({
    seasons: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalCount: (state) => {
      return state.seasons.length;
    },

    pariticipationFormVisibleSeasons: (state) => {
      return state.seasons.filter(season => season.participationFormVisible === true);
    }
  },

  actions: {
    async fetchSeasons() {
      this.loading = true;
      this.error = null;
      const firestore = useFirestore();

      try {
        const snapshot = await getDocs(query(collection(firestore, 'seasons'), orderBy('id', 'asc')));
        this.seasons = snapshot.docs.map(doc => doc.data());
        this.loading = false;
      } catch (error) {
        console.error('Error fetching seasons: ', error);
        this.error = 'Error fetching seasons';
        this.loading = false;
      }
    },
  },
});
