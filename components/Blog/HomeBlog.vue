<template>
  <div class="flex flex-col mx-5 items-center justify-center mt-[120px] md:mt-[150px] md:mx-20" aria-labelledby="blog-title">
    
    <!-- Titre et description du blog -->
    <div class="flex flex-col items-center justify-center">
      <h1 id="blog-title" class="text-center font-syne" data-aos="fade">PoonBlog</h1>
      <p class="font-nunito mt-5 text-center sm:w-2/3 xl:text-lg" data-aos="fade">
        Sur le PoonBlog, nous proposons une vaste gamme de ressources éducatives. Que vous soyez parent, éducateur ou simplement curieux, vous trouverez ici de quoi vous enrichir et vous inspirer.
      </p>
    </div>

    <!-- Liste des articles -->
    <section aria-labelledby="blog-list" aria-live="polite" :aria-busy="loading">
      <h2 id="blog-list" class="sr-only">Liste des articles du PoonBlog</h2>

      <div v-if="loading" class="flex justify-center">
        <Loading fillColor="fill-secondary" />
      </div>

      <!-- Grille d'articles -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-10 mt-10">
        <div 
          v-for="(blog, index) in blogs" 
          :key="index" 
          class="flex flex-col items-center justify-start" 
          data-aos="fade-up"
        >
          <BlogSnapshot :blog="blog" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useShareBlogStore } from '~/stores/Blog/ShareBlog';
import { useBlogStore } from '@/stores/Blog/blog';

const blogStore = useBlogStore();
const { loading, blogs } = storeToRefs(blogStore);
blogStore.fetchBlogs();

const shareBlogStore = useShareBlogStore();
</script>

<style scoped>
</style>
