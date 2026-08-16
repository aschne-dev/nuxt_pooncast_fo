import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore/lite';
import { normalizeContentDocument } from '~/utils/content';
import { fetchBlogDocumentById } from '~/utils/firestore-content';

export const useBlogStore = defineStore({
  id: 'Blog',
  state: () => ({ 
    blogs: [],
    allBlogsLoaded: false,
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
        if (this.allBlogsLoaded) {
          this.loading = false;
          return this.blogs;
        }

        this.loading = true;
        this.error = null;
        const firestore = getFirestore(useNuxtApp().$firebaseApp);

        try {
            const blogsQuery = query(collection(firestore, 'blogs'), orderBy('order', 'desc'));
            const snapshot = await getDocs(blogsQuery);
            this.blogs = snapshot.docs.map(doc => normalizeContentDocument({ ...doc.data(), id: doc.id }));
            this.allBlogsLoaded = true;
            this.loading = false;
            return this.blogs;
          } catch (error) {
            console.error('Error fetching blogs: ', error);
            this.error = 'Error fetching blogs';
            this.loading = false;
            throw error;
          }
        },
    async fetchBlogById(id) {
      const existingBlog = this.blogById(String(id));

      if (existingBlog) {
        this.loading = false;
        return existingBlog;
      }

      this.loading = true;
      this.error = null;
      const firestore = getFirestore(useNuxtApp().$firebaseApp);

      try {
        const blog = await fetchBlogDocumentById(firestore, id);

        if (blog) {
          this.blogs.push(blog);
        }

        this.loading = false;
        return blog;
      } catch (error) {
        console.error('Error fetching blog: ', error);
        this.error = 'Error fetching blog';
        this.loading = false;
        throw error;
      }
    },
    },
});
