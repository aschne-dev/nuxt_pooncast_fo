<template>
    <div class="py-20 flex flex-col items-center justify-center overflow-hidden">        
        <div v-if="!isParticipationForm" class="relative">
            <NuxtLink to="/participez-au-pooncast">
                <button class="btn group" aria-label="Participez au Pooncast">
                    <span>Participez au Pooncast</span>
                    <svg class="xl:size-8 lg:size-7 group-hover:animate-bounce-right" xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                    <path d="M14.6215 1.61425C15.0218 1.09888 15.8006 1.09888 16.2009 1.61425L17.1892 2.88642C17.4996 3.28609 18.0598 3.3908 18.4937 3.13027L19.8747 2.30101C20.4342 1.96506 21.1604 2.24637 21.3475 2.87156L21.8095 4.41482C21.9546 4.89966 22.4391 5.19964 22.9378 5.11345L24.5252 4.83908C25.1682 4.72794 25.7437 5.25256 25.6924 5.90314L25.5657 7.50906C25.5258 8.01359 25.8692 8.46833 26.3654 8.5681L27.9447 8.8857C28.5845 9.01436 28.9316 9.71144 28.6487 10.2995L27.9504 11.7512C27.731 12.2073 27.887 12.7554 28.3136 13.0277L29.6715 13.8943C30.2216 14.2454 30.2935 15.0208 29.8173 15.467L28.6417 16.5684C28.2724 16.9145 28.2198 17.4819 28.5192 17.8899L29.4724 19.1885C29.8585 19.7147 29.6454 20.4636 29.0402 20.7077L27.5461 21.3101C27.0767 21.4993 26.8227 22.0094 26.9546 22.498L27.3742 24.0533C27.5442 24.6834 27.075 25.3048 26.4224 25.3137L24.8117 25.3357C24.3056 25.3426 23.8845 25.7265 23.8309 26.2298L23.6604 27.8316C23.5913 28.4806 22.9292 28.8905 22.3175 28.6631L20.8076 28.1017C20.3332 27.9254 19.8019 28.1312 19.5701 28.5811L18.8325 30.0132C18.5336 30.5934 17.7682 30.7365 17.2799 30.3035L16.0747 29.2345C15.6961 28.8987 15.1263 28.8987 14.7476 29.2345L13.5425 30.3035C13.0542 30.7365 12.2888 30.5934 11.9899 30.0132L11.2523 28.5811C11.0205 28.1312 10.4892 27.9254 10.0148 28.1017L8.50484 28.6631C7.89315 28.8905 7.23106 28.4806 7.16198 27.8316L6.99146 26.2298C6.93789 25.7265 6.51678 25.3426 6.01073 25.3357L4.39997 25.3137C3.74742 25.3048 3.27814 24.6834 3.44815 24.0533L3.8678 22.498C3.99964 22.0094 3.74565 21.4993 3.27627 21.3101L1.78222 20.7077C1.17696 20.4636 0.963848 19.7146 1.34998 19.1885L2.30314 17.8899C2.60259 17.4819 2.55001 16.9145 2.18069 16.5684L1.00513 15.467C0.528901 15.0208 0.600754 14.2454 1.15087 13.8943L2.50879 13.0277C2.93541 12.7554 3.09135 12.2073 2.87197 11.7512L2.17367 10.2995C1.89078 9.71144 2.23789 9.01436 2.87768 8.8857L4.45698 8.5681C4.95315 8.46833 5.29655 8.01359 5.25673 7.50906L5.13001 5.90314C5.07867 5.25256 5.65415 4.72794 6.29722 4.83908L7.8846 5.11345C8.38331 5.19964 8.86779 4.89966 9.01292 4.41482L9.47488 2.87156C9.66202 2.24637 10.3882 1.96506 10.9477 2.30101L12.3287 3.13027C12.7626 3.3908 13.3227 3.28609 13.6332 2.88642L14.6215 1.61425Z" fill="#030211"/>
                    <path d="M20.3338 15.6637C20.4244 15.7551 20.4752 15.8786 20.4752 16.0072C20.4752 16.1359 20.4244 16.2594 20.3338 16.3508L15.9938 20.6909C15.9012 20.7794 15.7783 20.829 15.6502 20.8295C15.5862 20.8292 15.5228 20.817 15.4633 20.7933C15.3756 20.7565 15.3007 20.6944 15.2481 20.615C15.1956 20.5357 15.1677 20.4425 15.168 20.3473V16.4895H10.8279C10.7 16.4895 10.5774 16.4387 10.4869 16.3482C10.3965 16.2578 10.3457 16.1351 10.3457 16.0072C10.3457 15.8793 10.3965 15.7567 10.4869 15.6663C10.5774 15.5758 10.7 15.525 10.8279 15.525H15.168V11.6672C15.1677 11.572 15.1956 11.4788 15.2481 11.3995C15.3007 11.3201 15.3756 11.258 15.4633 11.2211C15.5524 11.1864 15.6495 11.1776 15.7434 11.1957C15.8372 11.2138 15.9241 11.2582 15.9938 11.3236L20.3338 15.6637Z" fill="white"/>
                    </svg>
                </button>
            </NuxtLink>
            <img class="absolute -left-12 lg:-left-40 -bottom-10 animate-spin-slow" src="@/assets/img/footer/star-black.svg" alt="le pooncast, star des podcasts pour enfants" />
            <img class="absolute -right-8 -top-5 lg:-right-36 animate-star" src="@/assets/img/footer/star-secondary.svg" alt="le pooncast, histoires pour enfants à partir de 3 ans" />
        </div>

        <div class="mt-16 py-10 border-t-2 border-b-2 w-3/4 lg:w-4/5 border-tertiary relative z-10">  
            <img class="absolute right-0 top-40 lg:top-2 size-5 animate-spin-reverse" src="@/assets/img/footer/star-black.svg" alt="les petites histoires pour répondre aux grandes questions des enfants" />
            <img class="absolute -left-5 top-20 lg:top-5 size-10 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="participez aux podcast en posant vos questions" />
            <img class="absolute left-0 top-60 lg:-left-28 size-8 animate-star" src="@/assets/img/footer/star-gray.svg" alt="participez aux podcast en posant vos questions" />
            <img class="absolute right-0 bottom-10 lg:right-96 size-6 animate-pulse" src="@/assets/img/footer/star-black.svg" alt="Le pooncast pour éveiller la curiosité et l'imagination des jeunes enfant" />
            <img class="hidden lg:block lg:absolute right-0 bottom-6 size-12 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="participez aux podcast en posant vos questions" />
            
            <div class="grid grid-cols-1 lg:grid-cols-3 items-center lg:items-start justify-center relative">

                <div class="flex items-center justify-center lg:justify-start">
                    <NuxtLink to="/" class="" title="Accueil">
                        <img class="h-14 mb-10 md:h-20  w-auto" src="@/assets/img/logo/logo.svg" alt="Les petites histoires de Poon pour répondre aux grandes questions des enfants">
                    </NuxtLink>
                </div>

                <div class="flex flex-col items-center lg:items-start">
                    <p class="font-syne font-bold text-xl">PAGES</p>    
                    <ul class="mt-3 font-syne space-y-1 text-center lg:text-start">
                        <li><NuxtLink to="/" title="Accueil">Accueil</NuxtLink></li>
                        <li><NuxtLink to="/pooncast/episodes" title="Épisodes">Épisodes</NuxtLink></li>
                        <li><NuxtLink to="/poonblog" title="Poonblog">Poonblog</NuxtLink></li>
                        <li><NuxtLink to="/legal" title="Mentions légales">Mentions légales</NuxtLink></li>
                    </ul>     
                </div>

                <div class="mt-10 lg:mt-0 flex flex-col items-center lg:items-start">
                    <p class="font-syne font-bold text-xl">CONTACT</p>  
                    <ul class="mt-3 font-syne space-y-1 text-center">
                        <li>poon@lepooncast.com</li>
                        <li>
                            <div class="flex items-center justify-center gap-5 pt-2 lg:justify-start">
                                <a href="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank" 
                                title="Instagram"
                                rel="noopener noreferrer"
                                @click="trackClick('Instagram')"><img src="@/assets/img/footer/instagram.svg" class="size-8" alt="Suivez le pooncast sur Instagram" /></a>
                                <a href="https://www.facebook.com/profile.php?id=61562418675417" target="_blank" 
                                title="Facebook"
                                rel="noopener noreferrer"
                                @click="trackClick('Facebook')"><img src="@/assets/img/footer/facebook.svg" class="size-8" alt="Suivez le pooncast sur Facebook"  /></a>
                                <a href="https://www.linkedin.com/company/le-pooncast/" target="_blank" 
                                title="Linkedin"
                                rel="noopener noreferrer"
                                @click="trackClick('Linkedin')"><img src="@/assets/img/footer/linkedin.svg" class="size-8" alt="Suivez le pooncast sur Linkedin"  /></a>
                            </div>
                        </li>
                    </ul>  
                </div>

                <!-- <div class="mt-10 lg:mt-0 flex flex-col items-center lg:items-start">
                    <p class="font-syne font-bold text-xl text-center lg:text-start">Recevoir une alerte à chaque nouvelle <span class="text-nowrap">histoire !</span></p>  
                    <ul class="mt-5 font-syne space-y-1">
                        <li>
                            <div class="flex flex-col justify-center items-center lg:items-start">
                                <input type="text" placeholder="courriel" class="font-syne bg-primary border-tertiary border px-5 py-2 rounded-full" />
                                <button class="btn mt-5">Envoyer</button>
                            </div>
                        </li>
                    </ul>  
                </div> -->

            </div>
        </div>

        <div class="flex flex-col items-center justify-center font-syne mt-10 relative">
            <img class="absolute -left-5 -top-5 lg:-left-20 size-4 animate-star" src="@/assets/img/footer/star-black.svg" alt="les petites histoires pour répondre aux grandes questions des enfants" />
            <img class="absolute -right-5 -bottom-20 lg:-right-40 lg:top-5 size-10 animate-star" src="@/assets/img/footer/star-gray.svg" alt="participez aux podcast en posant vos questions" />


            <p class="relative">Copyright © 2024</p>
            <div class="flex items-center justify-center gap-2 relative">
                <span>Made with</span>
                <img class="animate-bounce" src="@/assets/img/footer/heart-secondary.svg" alt="Made with love by l'agence de Papa et Maman"/>
                <span>by</span>
                <a href="https://www.lagencedepapaetmaman.com" target="_blank" class="underline hover:no-underline" title="L'agence de Papa et Maman"
                @click="trackClick('Agence PM')" rel="noopener noreferrer">L'Agence de Papa et Maman</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { logEvent } from 'firebase/analytics';

// Check if the current route is the participation FORM
const route = useRoute();
const isParticipationForm = computed(() => route.path === '/participez-au-pooncast');

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

<style scoped>

</style>