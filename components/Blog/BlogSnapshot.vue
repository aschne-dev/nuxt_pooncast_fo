<template>
  <div class="flex flex-col items-center justify-between h-full px-5 py-5 rounded-xl shadow-2xl">
    <NuxtLink :to="`/poonblog/${generateSlug(blog.title)}/${blog.id}`">
      <div class="flex flex-col items-center relative">
        <img :src="blog.visuel" :alt="'Visuel de' + blog.title" class="rounded-2xl w-60 h-auto" />
        <h2 class="text-base font-syne xl:text-lg font-semibold text-center lg:text-start mt-5 w-60">{{ blog.title }}</h2>               
      </div>
      </NuxtLink>

      <div class="flex items-center justify-between px-5 lg:px-0 w-60 mt-5">
        <div>
          <NuxtLink :to="`/poonblog/${generateSlug(blog.title)}/${blog.id}`" class="mt-5 group">
            <button class="btn" aria-label="Lire l'article">
              <span>Lire</span>
              <svg class="group-hover:animate-bounce-right" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM23.447 16.895L11.447 22.895C11.2945 22.9712 11.1251 23.0072 10.9548 22.9994C10.7845 22.9917 10.619 22.9406 10.474 22.8509C10.329 22.7613 10.2093 22.636 10.1264 22.4871C10.0434 22.3381 9.99993 22.1705 10 22V10C10.0001 9.82961 10.0437 9.66207 10.1268 9.51327C10.2098 9.36448 10.3294 9.23936 10.4744 9.14981C10.6194 9.06025 10.7848 9.00921 10.955 9.00155C11.1252 8.99388 11.2946 9.02984 11.447 9.106L23.447 15.106C23.6129 15.1891 23.7524 15.3168 23.8498 15.4747C23.9473 15.6326 23.9989 15.8145 23.9989 16C23.9989 16.1855 23.9473 16.3674 23.8498 16.5253C23.7524 16.6832 23.6129 16.8109 23.447 16.894" fill="black"/>
              </svg>
            </button>
          </NuxtLink>
        </div>
        <!-- Bouton de partage -->
        <button class="" @click="handleShare(blog.id, blog.title)" aria-label="Partager cet article du poonblog">
          <img class="size-6" src="@/assets/img/pooncast/share.svg" alt="Partager cet article du poonblog" />
        </button>
      </div>
  </div>
</template>

<script setup>
import { useShareBlogStore } from '@/stores/Blog/ShareBlog';
import { logEvent } from 'firebase/analytics';
const shareBlogStore = useShareBlogStore();

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
});

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


</script>
