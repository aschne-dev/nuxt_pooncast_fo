import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore/lite';
import { normalizeContentDocument } from '~/utils/content';

export const useFaqStore = defineStore('FaqStore', {
  state: () => ({ 
    faqs: [],
    loading: false,
    error: null
  }),
   
  getters: {
    totalCount: (state) => {
      return state.faqs.length;
    }
  },
   
  actions: {
    async fetchFaqs() {
      if (this.faqs.length > 0) {
        this.loading = false;
        return this.faqs;
      }

      this.loading = true;

      const firestore = getFirestore(useNuxtApp().$firebaseApp);

      try {
        const faqQuery = query(collection(firestore, 'faq'), orderBy('order'));
        const snapshot = await getDocs(faqQuery);
        this.faqs = snapshot.docs.map(doc => normalizeContentDocument({ ...doc.data(), id: doc.id }));
        this.loading = false;
        return this.faqs;
      } catch (error) {
        console.error('Error fetching faq:', error);
        this.error = 'Error fetching faq';
        this.loading = false;
        throw error;
      }
    },
  }
});
