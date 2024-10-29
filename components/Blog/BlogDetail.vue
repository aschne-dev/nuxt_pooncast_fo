<template>
  <div class="bg-primary bg-opacity-80">
    
    <div class="flex flex-col lg:grid lg:grid-cols-3 lg:gap-10 mx-5">
      
     <!-- COLONNE GAUCHE -->
    <div class="flex flex-col items-center lg:items-start lg:col-span-1">
      <div class="lg:sticky lg:top-5 lg:self-start sticky  lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
        
        <!-- TITRE -->
        <collapse-transition>
          <div v-if="showLeftTitle">
            <div class="ms-5 hidden lg:block">
              <img :src="blog.visuel" :alt="blog.title" class="rounded-xl w-40 h-auto shadow-xl" />
            </div>
            <p @click="scrollToTop" class="h1 text-center font-syne lg:text-start text-2xl lg:text-lg mt-10 lg:ms-5 cursor-pointer">{{ blog.title }}</p>
          </div>
        </collapse-transition>
        
        <!-- MENU DESKTOP -->
        <div 
          class="ms-5 flex-col hidden lg:flex lg:items-start"
          :class="{'lg:mt-20' : !showLeftTitle}"
        >
          <!-- AUTHOR-->
          <div class="flex-col items-start justify-center mt-5 font-nunito hidden lg:flex">
            <p>Article rédigé par</p>
            <p><NuxtLink class="underline" to="https://lagencedepapaetmaman.com" target="_blank" title="Papa et Maman">Papa et Maman</NuxtLink></p>
          </div>

          <!-- CHAPITRES-->
          <h2 class="font-syne mt-10 lg:hidden">Sommaire</h2>
          <ul class="mt-5 font-syne text-xl lg:text-lg space-y-2 lg:mt-10">
            <li>
              <NuxtLink to="#intro">Introduction</NuxtLink>
            </li>
            <li v-for="(chapter, index) in blog.chapters" :key="index">
              <NuxtLink :to="'#chapter' + index">{{ chapter.name }}</NuxtLink>
            </li>
          </ul>
        </div>



      </div>
    </div>

      <!-- COLONNE DROITE -->
      <div class="flex flex-col items-center lg:col-span-2">

        <!-- TITRE -->
        <h1 id="right-title" class="h1 text-center font-syne hidden lg:block lg:text-3xl" data-aos="fade">{{ blog.title }}</h1>
        
        <!-- AUTHOR-->
         <div class="flex flex-col items-center justify-center mt-5 font-nunito lg:hidden">
          <p>Article rédigé par</p>
          <p><a class="underline" href="https://lagencedepapaetmaman.com" target="_blank" title="L'agence de Papa et Maman"
            rel="noopener noreferrer"
            @click="trackClick('AgencePM')">Papa et Maman</a></p>
        </div>
        
        <!-- DATE ET PARTAGE -->
        <div class="flex items-center justify-center gap-10 w-full px-5 mt-10 font-syne" data-aos="fade">
          <div class="text-lg">{{ formattedDate }}</div>
          <div>
            <button class="" @click="handleShare(blog.id, blog.title)" aria-label="Partager cet article">
              <img class="size-5" src="@/assets/img/pooncast/share.svg" alt="Partager cet article du poonblog" />
            </button>
          </div>
        </div>

        <!-- IMAGE -->
        <img :src="blog.visuel" :alt="blog.title" class="rounded-xl mt-10 w-72 md:w-96 h-auto shadow-xl" data-aos="fade" />

        <!-- MENU MOBILE -->
        <div class="ms-5 flex flex-col items-center lg:items-start lg:hidden">
            <h2 class="font-syne mt-10 lg:hidden">Sommaire</h2>
            <ul class="mt-5 font-syne text-xl lg:text-lg space-y-2 lg:mt-10">
              <li data-aos="fade-up">
                <NuxtLink to="#intro">Introduction</NuxtLink>
              </li>
              <li v-for="(chapter, index) in blog.chapters" :key="index" data-aos="fade-up">
                <NuxtLink :to="'#chapter' + index">{{ chapter.name }}</NuxtLink>
              </li>
            </ul>
        </div>

        <!-- CONTENU -->
        <section id="intro" class="font-nunito mt-10 text-lg mx-2" data-aos="fade-up">
          <div class="font-semibold">{{ blog.intro }}</div>
        </section>

        <section v-for="(chapter, index) in blog.chapters" :key="index" :id="'chapter' + index" class="font-nunito mt-10 text-lg mx-2">
          <div class="font-bold font-syne text-xl" data-aos="fade-up">{{ chapter.name }}</div>
          <div v-html="chapter.text" class="mt-5 list-disc list-decimal list-inside" data-aos="fade-up"></div>
        </section>

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
    <div class="mt-10 lg:mt-20">
      <h2 data-aos="fade-up" class="mx-5 lg:mx-12">Voir d'autres articles ...</h2>
      <div class=" flex justify-center">
        <div class="w-lvw">
          <BlogCarousel :blogs="otherBlogs" />
        </div>
      </div>
    </div>

    <!-- LIEN VERS HOME BLOG -->
    <div class="mt-8 flex items-center justify-center w-full lg:px-10" data-aos="fade-up">
      <NuxtLink  to="/poonblog/" title="Voir tous le articles">
          <button class="btn-secondary" data-aos="fade" aria-label="Voir tous les articles">Voir tous les articles</button>   
      </NuxtLink>  
    </div>

  </div>
</template>




<script setup>
import BlogCarousel from './BlogCarousel.vue';
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
import { useBlogStore } from '@/stores/Blog/blog';
import { useShareBlogStore } from '@/stores/Blog/ShareBlog';
import { logEvent } from 'firebase/analytics';
const shareBlogStore = useShareBlogStore();

const blogStore = useBlogStore();

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

const otherBlogs = computed(() => blogStore.blogsExcludingId(props.blog.id));

// Formater la date
const formattedDate = computed(() => {
  const date = props.blog.createdAt.toDate();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont 0-indexés
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
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



// Construct URLs for sharing
function generateSlug(title) {
  // Remplacer les caractères accentués par leurs équivalents non accentués
  const accentMap = {
    'à': 'a', 'â': 'a', 'ä': 'a', 'á': 'a', 'ã': 'a', 'å': 'a', 'æ': 'ae',
    'ç': 'c', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'í': 'i', 'ì': 'i',
    'î': 'i', 'ï': 'i', 'ñ': 'n', 'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o',
    'õ': 'o', 'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y',
    'æ': 'ae', 'œ': 'oe'
  };
  
  // Remplacer les accents
  title = title.replace(/[àâäáãåæçéèêëíìîïñóòôöõúùûüýÿœ]/g, (match) => accentMap[match]);

  // Générer le slug
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
