import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const useFaqStore = defineStore({
  id: 'FaqStore',
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
      this.loading = true;

      const firestore = useFirestore();

      try {
        const faqQuery = query(collection(firestore, 'faq'), orderBy('order'));
        const snapshot = await getDocs(faqQuery);
        this.faqs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.loading = false;
      } catch (error) {
        console.error('Error fetching faq:', error);
        this.error = 'Error fetching faq';
        this.loading = false;
      }
    },
  }
});
