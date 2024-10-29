<template>
  <div class="flex flex-col items-center mt-10" aria-labelledby="poonblog-title">
      
      <!-- Titre de la section avec id pour aria-labelledby -->
      <div class="flex flex-col items-center mx-5">
        <h2 id="poonblog-title" class="text-center text-3xl lg:text-4xl xl:text-5xl" data-aos="fade-up">Le PoonBlog</h2>
        <p class="font-nunito text-center mt-10 xl:text-lg lg:w-2/3" data-aos="fade-up">
          Explorez le PoonBlog, un espace dédié aux articles éducatifs et aux ressources amusantes pour les enfants. Découvrez des sujets passionnants qui éveillent la curiosité des jeunes esprits et complètent les épisodes du Pooncast.
        </p> 
      </div>

      <!-- Section des articles avec aria-live pour le chargement dynamique -->
      <div class="w-full xl:w-[1200px] lg:w-[1000px]" aria-live="polite">
        <div v-if="loading" class="flex justify-center" aria-busy="true">
          <Loading fillColor="fill-secondary" />
        </div>
        <BlogCarousel :blogs="blogs" v-else aria-busy="false" />
      </div>

      <!-- Lien vers tous les articles avec aria-label pour plus de clarté -->
      <NuxtLink to="/poonblog/" class="mt-10" title="Voir tous les articles" aria-label="Voir tous les articles du PoonBlog">
          <button class="btn" data-aos="fade">Voir tous les articles</button>   
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

