// stores/Reco/Recommendation.js
import { collection, getDocs } from 'firebase/firestore'


export const useRecommendationsStore = defineStore('recommendations', {
  state: () => ({
    recommendations: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchRecommendations() {
      this.loading = true
      this.error = null
      const firestore = useFirestore()

      try {
        const snapshot = await getDocs(collection(firestore, 'recommendations'))
        this.recommendations = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        this.loading = false
      } catch (error) {
        console.error('Error fetching recommendations:', error)
        this.error = 'Error fetching recommendations'
        this.loading = false
      }
    },
},
  getters: {
    allRecommendations: (state) => state.recommendations,
    getRecommendationById: (state) => (id) => state.recommendations.find(rec => rec.id === id)
  }
})
