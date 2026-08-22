<template>
  <div class="bg-primary bg-opacity-80" aria-labelledby="right-title">
    
    <div class="flex flex-col lg:grid lg:grid-cols-3 lg:gap-10 mx-5">
      
     <!-- COLONNE GAUCHE -->
    <div class="flex flex-col items-center lg:items-start lg:col-span-1">
      <div class="lg:sticky lg:top-5 lg:self-start sticky  lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
        
        <!-- TITRE -->
        <collapse-transition>
          <div v-if="showLeftTitle">
            <div class="ms-5 hidden lg:block">
              <img :src="blog.visuel" :alt="blog.title" class="rounded-xl w-40 h-auto shadow-xl" width="160" height="160" />
            </div>
            <p @click="scrollToTop" class="h1 text-center font-syne lg:text-start text-2xl lg:text-lg mt-10 lg:ms-5 cursor-pointer">{{ blog.title }}</p>
          </div>
        </collapse-transition>
        
        <!-- MENU DESKTOP -->
        <nav
          class="ms-5 flex-col hidden lg:flex lg:items-start"
          :class="{'lg:mt-20' : !showLeftTitle}"
          aria-label="Sommaire de l’article"
        >
          <!-- AUTHOR-->
          <div class="flex-col items-start justify-center mt-5 font-nunito hidden lg:flex">
            <p>Article rédigé par</p>
            <p><NuxtLink class="underline" to="https://lagencedepapaetmaman.com" target="_blank" title="Papa et Maman">Papa et Maman</NuxtLink></p>
          </div>

          <!-- CHAPITRES-->
          <p class="font-syne font-bold mt-10">Sommaire</p>
          <ul class="mt-5 font-syne text-xl lg:text-lg space-y-2 lg:mt-10">
            <li>
              <NuxtLink to="#intro">Introduction</NuxtLink>
            </li>
            <li v-for="(chapter, index) in blog.chapters" :key="index">
              <NuxtLink :to="'#chapter' + index">{{ chapter.name }}</NuxtLink>
            </li>
          </ul>
        </nav>



      </div>
    </div>

      <!-- COLONNE DROITE -->
      <div class="flex flex-col items-center lg:col-span-2">

        <!-- TITRE -->
        <h1 id="right-title" class="h1 w-full max-w-full break-words px-2 text-center font-syne lg:text-3xl" data-aos="fade">{{ blog.title }}</h1>
        
        <!-- AUTHOR-->
         <div class="flex flex-col items-center justify-center mt-5 font-nunito lg:hidden">
          <p>Article rédigé par</p>
          <p><a class="underline" href="https://lagencedepapaetmaman.com" target="_blank" title="L'agence de Papa et Maman"
            rel="noopener noreferrer"
            @click="trackClick('AgencePM')">Papa et Maman</a></p>
        </div>
        
        <!-- DATE ET PARTAGE -->
        <div class="flex items-center justify-center gap-10 w-full px-5 mt-10 font-syne" data-aos="fade">
          <time v-if="blog.updatedAt || blog.createdAt" :datetime="blog.updatedAt || blog.createdAt" class="text-lg">
            {{ blog.updatedAt ? 'Mis à jour le' : 'Publié le' }} {{ formattedDate }}
          </time>
          <div>
            <button class="" @click="handleShare(blog.id, blog.title)" aria-label="Partager cet article">
              <img class="size-5" src="@/assets/img/pooncast/share.svg" alt="Partager cet article du poonblog" width="20" height="20" />
            </button>
          </div>
        </div>

        <!-- IMAGE -->
        <img :src="blog.visuel" :alt="blog.title" class="rounded-xl mt-10 w-72 md:w-96 h-auto shadow-xl" width="384" height="384" data-aos="fade" />

        <!-- MENU MOBILE -->
        <nav class="ms-5 flex flex-col items-center lg:items-start lg:hidden" aria-label="Sommaire de l’article">
            <p class="font-syne font-bold mt-10">Sommaire</p>
            <ul class="mt-5 font-syne text-xl lg:text-lg space-y-2 lg:mt-10">
              <li data-aos="fade-up">
                <NuxtLink to="#intro">Introduction</NuxtLink>
              </li>
              <li v-for="(chapter, index) in blog.chapters" :key="index" data-aos="fade-up">
                <NuxtLink :to="'#chapter' + index">{{ chapter.name }}</NuxtLink>
              </li>
            </ul>
        </nav>

        <!-- CONTENU -->
        <section id="intro" class="font-nunito mt-10 text-lg mx-2" data-aos="fade-up">
          <div class="font-semibold">{{ blog.intro }}</div>
        </section>

        <section v-for="(chapter, index) in blog.chapters" :key="index" :id="'chapter' + index" class="font-nunito mt-10 text-lg mx-2">
          <h2 class="font-bold font-syne text-xl" data-aos="fade-up">{{ chapter.name }}</h2>
          <div v-html="sanitizeBlogHtml(chapter.text)" class="mt-5 list-disc list-decimal list-inside" data-aos="fade-up"></div>
        </section>

        <SeoContentFaq :items="blog.faq" />
        <SeoRelatedContent :items="blog.relatedContent" :blogs="blogs" :pooncasts="pooncasts" />

      </div>

    </div>

    <!-- AUTRES ARTICLES (RANDOM 2) -->
    <!-- <div class="mt-10 lg:mt-20 lg:px-10">
      <h2 data-aos="fade-up">Voir d'autres articles ...</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-48 lg:mx-20 mt-10">
        <div v-for="(blog, index) in otherBlogs" :key="index" class="flex flex-col items-center justify-between h-full" data-aos="fade-up">
          <BlogSnapshot :blog="blog" />
        </div>
      </div>
    </div> -->

    <!-- CAROUSEL D'ARTICLES -->
    <div v-if="otherBlogs.length > 0" class="mt-10 lg:mt-20">
      <h2 data-aos="fade-up" class="mx-5 lg:mx-12">À lire aussi sur le PoonBlog</h2>
      <div class=" flex justify-center">
        <div class="w-lvw">
          <BlogCarousel :blogs="otherBlogs" />
        </div>
      </div>
    </div>

    <!-- LIEN VERS HOME BLOG -->
    <div class="mt-8 flex items-center justify-center w-full lg:px-10" data-aos="fade-up">
      <NuxtLink to="/poonblog" class="btn-secondary" title="Voir tous les articles" aria-label="Voir tous les articles" data-aos="fade">
          Voir tous les articles
      </NuxtLink>  
    </div>

  </div>
</template>




<script setup>
import BlogCarousel from './BlogCarousel.vue';
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import { useBlogStore } from '@/stores/Blog/blog';
import { usePooncastStore } from '@/stores/Pooncast/Pooncast';
import { useShareBlogStore } from '@/stores/Blog/ShareBlog';
import { formatFrenchDate, slugify as generateSlug } from '~/utils/content';
import { sanitizeBlogHtml } from '~/utils/sanitize-blog-html';
const shareBlogStore = useShareBlogStore();

const blogStore = useBlogStore();
const { blogs } = storeToRefs(blogStore);
const pooncastStore = usePooncastStore();
const { pooncasts } = storeToRefs(pooncastStore);

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

const otherBlogs = computed(() => blogStore.blogsExcludingId(props.blog.id));

// Formater la date
const formattedDate = computed(() => {
  return formatFrenchDate(props.blog.updatedAt || props.blog.createdAt);
});

// Gérer l'apparition du titre de la colonne gauche
const showLeftTitle = ref(false);

onMounted(() => {
  const rightTitle = document.getElementById('right-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      showLeftTitle.value = !entry.isIntersecting;
    });
  }, { threshold: 0 });

  if (rightTitle) {
    observer.observe(rightTitle);
  }

  onUnmounted(() => {
    if (rightTitle) {
      observer.unobserve(rightTitle);
    }
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Cette option ajoute un effet de défilement fluide
  });
}



// Gérer le partage
/*const handleShare = async (blogId, blogTitle) => {

  const shareUrl = 'https://lepooncast.com/poonblog' + generateSlug(blogTitle) + '/' + blogId;

  if( navigator.canShare ) {
    navigator.share( {
      title: 'Poonblog: Les ressources éducatives du Pooncast.',
      text: blogTitle,
      url: shareUrl
    })
  } else {
    console.log('Sharing:' + blogId)
    shareBlogStore.showSharePopup(blogId);
  }
};*/

// PARTAGE
const handleShare = async (blogId, blogTitle) => {
  const domainUrl = 'https://lepooncast.com';
  const shareUrl = domainUrl + '/poonblog/' + generateSlug(blogTitle) + '/' + blogId;
  if (navigator.share) {
    try {
      // ANALYTICS
      const { $analytics } = useNuxtApp();
      if ($analytics) { // Utilisez $analytics ici
            logEvent($analytics, 'share', {
              content_type: 'blog',
              share_mode: 'native',
              item_id: blogId,
              item_title: blogTitle
            });
        }
      await navigator.share({
        /*title: 'Poonblog: Les ressources éducatives du Pooncast.',
        text: blogTitle,*/
        url: shareUrl,
      });
    } catch (err) {
      console.error('Partage annulé ou erreur lors du partage:', err.message);
      // Si l'erreur est une annulation, ne faites rien
      // Sinon, affichez le popup de partage
      if (err.name !== 'AbortError' && err.message !== 'The user aborted a request.') {
          // ANALYTICS
        const { $analytics } = useNuxtApp();
        if ($analytics) { // Utilisez $analytics ici
              logEvent($analytics, 'share', {
                content_type: 'blog',
                share_mode: 'custom',
                item_id: blogId,
                item_title: blogTitle
              });
          }
          shareBlogStore.showSharePopup(blogId);
      }
    }
  } else {
    // L'API de partage n'est pas supportée, on affiche directement la popup
     // ANALYTICS
     const { $analytics } = useNuxtApp();
        if ($analytics) { // Utilisez $analytics ici
              logEvent($analytics, 'share', {
                content_type: 'blog',
                share_mode: 'custom',
                item_id: blogId,
                item_title: blogTitle
              });
          }
    shareBlogStore.showSharePopup(blogId);
  }
};

const { $analytics } = useNuxtApp();

const trackClick = (platform) => {
  if ($analytics) {
    logEvent($analytics, 'select_content', {
      content_type: 'external_link',
      item_id: platform
    });
  }
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
