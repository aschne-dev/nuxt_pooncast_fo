<template>
  <div class="fixed bottom-10 md:bottom-20 z-20 w-full flex items-center justify-center">
    <transition name="slide-up">
      <div v-if="isVisible" class="bg-primary border rounded-xl shadow-xl pt-4 md:w-1/2 w-full relative">
        <div class="flex justify-center items-center pt-2">
          <p class="font-bold text-xl text-secondary px-10 text-center font-nunito" v-html="currentPooncast.titre"></p>
          <button @click="hideSharePopup" class="text-poonblack absolute right-1 top-1" aria-label="Fermer la popup de partage">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center justify-center mb-3">
          <div class="grid grid-cols-2 mt-4 gap-5">
            <!-- SHARE FACEBOOK -->
            <a :href="facebookShareUrl" target="_blank" class="flex items-center justify-center gap-2">
              <img src="@/assets/img/pooncast/facebook.svg" alt="Partager sur Facebook" class="w-10 h-10" />
            </a>

            <!-- SHARE TWITTER -->
            <a :href="twitterShareUrl" target="_blank" class="flex items-center justify-center gap-2">
              <img src="@/assets/img/pooncast/x.png" alt="Partager sur Twitter" class="w-10 h-10" />
            </a>

            <!-- SHARE WHATSAPP -->
            <a :href="whatsappShareUrl" target="_blank" class="flex items-center justify-center gap-2">
              <img src="@/assets/img/pooncast/whatsapp.png" alt="Partager sur WhatsApp" class="w-10 h-10" />
            </a>

            <!-- SHARE MESSENGER -->
            <a :href="messengerShareUrl" target="_blank" class="flex items-center justify-center gap-2">
              <img src="@/assets/img/pooncast/messenger.png" alt="Partager sur Messenger" class="w-10 h-10" />
            </a>
          </div>

          <div class="mt-5">
             <!-- COPY URL -->
             <button @click="copyToClipboard" class="flex items-center gap-3" aria-label="Copier le lien">
              <img src="@/assets/img/pooncast/link.png" alt="Copier le lien" class="w-10 h-10 text-end" />
              <span class="text-start">Copier le lien</span>
              <div class="text-secondary" v-html="headerText"></div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useSharePooncastStore } from '@/stores/Pooncast/SharePooncast';
import { usePooncastStore } from '@/stores/Pooncast/Pooncast';
import { computed } from 'vue';

const sharePooncastStore = useSharePooncastStore();
const { isVisible, idPooncast } = storeToRefs(sharePooncastStore);

const pooncastStore = usePooncastStore();
const currentPooncast = computed(() => pooncastStore.pooncastById(idPooncast.value));

// Utilisation d'une ref pour permettre la modification de headerText
const headerText = ref('');

// Mettre à jour headerText en fonction du pooncast sélectionné
watch(currentPooncast, (newPooncast) => {
  headerText.value = '';
}, { immediate: true });


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

const domainUrl = 'https://lepooncast.com';
const shareTitle = computed(() => currentPooncast.value ? generateSlug(currentPooncast.value.titre) : 'title');
const shareUrl = computed(() => `${domainUrl}/pooncast/${shareTitle.value}/${currentPooncast.value.id}`);
const shareText = computed(() => encodeURIComponent(`Découvrez : ${currentPooncast.value.titre}`));

const facebookShareUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${shareUrl.value}`);
const twitterShareUrl = computed(() => `https://twitter.com/intent/tweet?url=${shareUrl.value}&text=${shareText.value}`);
const whatsappShareUrl = computed(() => `https://wa.me/?text=${shareText.value} ${shareUrl.value}`);
const messengerShareUrl = computed(() => `https://www.messenger.com/t/?link=${encodeURIComponent(shareUrl)}`);

const copyToClipboard = () => {
  //alert('COPY');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl.value).then(() => {
      //alert('COPY OK');
      headerText.value = '&#10003;';
      setTimeout(() => {
        headerText.value = '';
      }, 2000); // Revert back after 2 seconds
    }).catch(() => {
      //alert('COPY FAILED');
      fallbackCopyTextToClipboard(shareUrl.value);
    });
  } else {
    // Fallback for older browsers or Safari on iOS
    fallbackCopyTextToClipboard(shareUrl.value);
  }
};

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Style the textarea to prevent it from being visible
  textArea.style.position = "absolute";
  textArea.style.visibility = "hidden";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    headerText.value = '&#10003;';
  } catch (err) {
    console.error('Fallback: Unable to copy', err);
    headerText.value = 'ERREUR';
  } finally {
    document.body.removeChild(textArea);
    setTimeout(() => {
      headerText.value = '';
    }, 2000); // Revert back after 2 seconds
  }
};

// Function to hide the share popup
const hideSharePopup = () => {
  sharePooncastStore.hideSharePopup();
};
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
