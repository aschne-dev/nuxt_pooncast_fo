import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const useBlogStore = defineStore({
  id: 'Blog',
  state: () => ({ 
    blogs: [],
    loading: true,
    error: null
  }),
   
  getters: {
    totalCount: (state) => {
      return state.blogs.length;
    },
    blogById: (state) => {
        return (id) => state.blogs.find(blog => blog.id === id);
    },
    blogsExcludingId: (state) => {
      return (excludedId = null) => {
        //console.log("coucou" + excludedId)
        let filteredBlogs = state.blogs;

        if (excludedId != null ) {
          filteredBlogs = state.blogs.filter(blog => blog.id !== excludedId);
        }

        //const filteredBlogs = state.blogs.filter(blog => blog.id !== excludedId);
        //const shuffledBlogs = filteredBlogs.sort(() => 0.5 - Math.random());
        //console.log("shuffle=" + shuffledBlogs.slice(0, 2))
        return filteredBlogs
      };
    }
  },
   
  actions: {
    async fetchBlogs() {
        this.loading = true;
        this.error = null;
        const firestore = useFirestore();

        try {
            const blogsQuery = query(collection(firestore, 'blogs'), orderBy('order', 'desc'));
            const snapshot = await getDocs(blogsQuery);
            this.blogs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            this.loading = false;
          } catch (error) {
            console.error('Error fetching blogs: ', error);
            this.error = 'Error fetching blogs';
            this.loading = false;
          }
        }
    },
});
