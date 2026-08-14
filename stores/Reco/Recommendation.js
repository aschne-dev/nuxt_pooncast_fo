// stores/Reco/Recommendation.js
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import { normalizeContentDocument } from '~/utils/content'


export const useRecommendationsStore = defineStore('recommendations', {
  state: () => ({
    recommendations: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchRecommendations() {
      if (this.recommendations.length > 0) {
        this.loading = false
        return this.recommendations
      }

      this.loading = true
      this.error = null
      const firestore = getFirestore(useNuxtApp().$firebaseApp)

      try {
        const snapshot = await getDocs(collection(firestore, 'recommendations'))
        this.recommendations = snapshot.docs.map(doc => normalizeContentDocument({ ...doc.data(), id: doc.id }))
        this.loading = false
        return this.recommendations
      } catch (error) {
        console.error('Error fetching recommendations:', error)
        this.error = 'Error fetching recommendations'
        this.loading = false
        throw error
      }
    },
},
  getters: {
    allRecommendations: (state) => state.recommendations,
    getRecommendationById: (state) => (id) => state.recommendations.find(rec => rec.id === id)
  }
})
