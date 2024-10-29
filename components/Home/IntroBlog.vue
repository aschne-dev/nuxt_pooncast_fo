<template>
  <div class="flex flex-col items-center mt-10">
      <div class="flex flex-col items-center mx-5">
        <h2 class="text-center text-3xl lg:text-4xl xl:text-5xl" data-aos="fade-up">Le PoonBlog</h2>
        <p class="font-nunito text-center mt-10 xl:text-lg lg:w-2/3" data-aos="fade-up">Explorez le PoonBlog, un espace dédié aux articles éducatifs et aux ressources amusantes pour les enfants. Découvrez des sujets passionnants qui éveillent la curiosité des jeunes esprits et complètent les épisodes du Pooncast.</p> 
      </div>
      <!-- AUTRES ARTICLES (RANDOM 2) -->
      <!-- <div class="mt-5 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 xl:gap-48 lg:mx-20 mt-10">
          <div v-for="(blog, index) in otherBlogs" :key="index" class="flex flex-col items-center justify-between h-full" data-aos="fade-up">
            <BlogSnapshot :blog="blog" />
          </div>
        </div>
      </div> -->

      <!-- CAROUSEL D'ARTICLES -->
      <div class="w-full xl:w-[1200px] lg:w-[1000px]">
        <div v-if="loading" class="flex justify-center">
          <Loading fillColor="fill-secondary" />
        </div>
        <BlogCarousel :blogs="blogs" v-else />
      </div>


      <NuxtLink  to="/poonblog/" class="mt-10" title="Voir tous les articles">
          <button class="btn" data-aos="fade" aria-label="Voir tous les articles">Voir tous les articles</button>   
      </NuxtLink>  

  </div>
</template>

<script setup>
import BlogSnapshot from '../Blog/BlogSnapshot.vue';
import { useBlogStore } from '@/stores/Blog/blog';
const blogStore = useBlogStore();
const { loading, blogs } = storeToRefs(blogStore);
blogStore.fetchBlogs();

</script>

