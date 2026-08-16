// stores/PooncastSeason.js
import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore/lite';
import { normalizeContentDocument } from '~/utils/content';

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
      if (this.seasons.length > 0) {
        this.loading = false;
        return this.seasons;
      }

      this.loading = true;
      this.error = null;
      const firestore = getFirestore(useNuxtApp().$firebaseApp);

      try {
        const snapshot = await getDocs(query(collection(firestore, 'seasons'), orderBy('id', 'asc')));
        this.seasons = snapshot.docs.map(doc => normalizeContentDocument({ ...doc.data(), id: doc.data().id ?? Number(doc.id) }));
        this.loading = false;
        return this.seasons;
      } catch (error) {
        console.error('Error fetching seasons: ', error);
        this.error = 'Error fetching seasons';
        this.loading = false;
        throw error;
      }
    },
  },
});
