<template>
    <div class="h-svh flex flex-col items-center justify-center px-8 text-center relative">
        <h1 class="sr-only">Les petites histoires de Poon pour répondre aux grandes questions des enfants</h1>
        
        <!-- DESKTOP -->
         <div class="hidden lg:block relative">
            <div class="relative">
                <p data-aos="fade-down" class="h1">Les <span class="text-secondary underline-c">petites histoires</span> de Poon</p>
                <!-- HAUT-->
                <img class="absolute xl:-left-44 -left-28 -top-5 size-10 animate-spin-reverse" src="@/assets/img/footer/star-black.svg" alt="Étoile noire symbolisant les petites histoires pour les enfants" role="presentation" />
                <img class="absolute -top-12 left-20 size-6 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange illustrant la participation aux podcasts pour enfants" role="presentation" />
                <img class="absolute -top-10 left-1/3 size-8 animate-spin-slow" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise représentant le podcast éducatif pour enfants" role="presentation" />
                <img class="absolute right-1/3 -top-5 size-4 animate-star" src="@/assets/img/footer/star-black.svg" alt="Étoile noire évoquant les histoires captivantes pour enfants" role="presentation" />
                <img class="absolute -top-12 right-20 size-4 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange illustrant les questions des enfants pour les podcasts" role="presentation" />
                <!-- GAUCHE-->
                <img class="absolute top-32 -left-5 size-4" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange représentant la participation des enfants aux podcasts" role="presentation" />
                <img class="absolute top-10 -left-40 size-6 animate-spin-reverse" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise pour le podcast éducatif des enfants" role="presentation" />
                <!-- DROITE-->
                <img class="absolute top-28  right-0 size-10 animate-spin-reverse" src="@/assets/img/footer/star-black.svg" alt="Étoile orange symbolisant la participation aux podcasts éducatifs des enfants" role="presentation" />
                <img class="absolute top-20 -right-20 size-4 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise illustrant le contenu éducatif pour les enfants" role="presentation" />
            </div>

            <p data-aos="fade" data-aos-delay="200" class="h1">pour répondre aux</p>
            <div class="relative">
                <p data-aos="fade-up" data-aos-delay="400" class="h1"><span class="text-secondary underline-c">grandes questions</span> des enfants</p>
                <p class="text-secondary font-bold text-2xl font-fraunces
                absolute right-0 top-16 xl:top-20"
                data-aos="fade-left" data-aos-delay="600" >de 3 à 99 ans</p>

                <img class="absolute -left-32 -bottom-10 size-9" src="@/assets/img/footer/star-black.svg" alt="Étoile noire illustrant les histoires pour répondre aux questions des enfants" />
                <img class="absolute top-20 -right-20 size-4 animate-star" src="@/assets/img/footer/star-secondary.svg" alt="Étoile grise illustrant le contenu éducatif pour les enfants" />
            </div>

            <div class="flex flex-row items-center gap-5 mt-10 -bottom-30 lg:w-full lg:justify-center z-10 relative">
                <div class="relative">
                    <div class="relative overflow-hidden border border-poonblack rounded-full flex justify-between items-center"
                    data-aos="fade" data-aos-delay="600">
                    <label for="email-input" id="newsletter-label" class="sr-only">Inscription à la newsletter</label>
                        <div class="ms-2">
                            <input type="text"
                            id="email-input"
                            inputmode="email"
                            placeholder="Mail" 
                            v-model="email"
                            name="email"
                            class="input placeholder:text-secondary font-syne bg-primary"
                            size="30"
                            tabindex="0"
                            autocomplete="email"
                            aria-label="Email pour inscription à la newsletter du Pooncast"
                            aria-labelledby="newsletter-label"
                            />
                        </div>

                        <div>
                            <NuxtLink :to="{ path: '/inscrivez-vous-au-pooncast', query: { email: email } }" title="Inscrivez vous au Pooncast" aria-label="Envoyer l'email pour s'inscrire">
                                <button class="btn bg-poonblack text-primary">Envoyer</button>
                            </NuxtLink>
                        </div>                         
                    </div>

                    <svg class="absolute bottom-0 -left-12" data-aos="fade-down" data-aos-delay="600" xmlns="http://www.w3.org/2000/svg" width="55" height="50" viewBox="0 0 55 50" fill="none">
                        <path d="M53.0487 14.989C48.9051 8.75473 40.7068 6.98165 33.8138 8.86892C26.201 10.9417 20.1747 16.9778 15.3709 23.1416C12.1003 27.3413 9.17523 31.768 6.63762 36.4323C5.95723 37.6906 7.8327 38.7708 8.51309 37.5125C10.6828 33.5857 13.0828 29.8103 15.744 26.2402C18.0728 23.0934 20.5899 20.0871 23.4612 17.4486C28.6166 12.7145 35.3064 9.34299 42.2868 10.6198C45.7924 11.2853 49.1471 13.0672 51.1459 16.1195C51.4668 16.6174 52.0869 16.8221 52.6185 16.4961C53.1391 16.2134 53.3697 15.4869 53.0487 14.989Z" fill="black"/>
                        <path d="M2.46306 29.2662C3.56258 32.5043 4.60895 35.775 5.6553 39.0457C5.89862 39.8472 6.86636 40.0947 7.46456 39.5084C8.2976 38.705 9.27678 38.0314 10.3378 37.5635C11.5473 37.0411 12.9005 36.8328 14.079 36.2563C14.6305 36.0277 14.7571 35.1822 14.4671 34.7385C14.1573 34.1972 13.5039 34.1225 12.9945 34.3619C11.7739 34.9276 10.3786 35.1252 9.15805 35.6909C7.93752 36.2566 6.88301 37.0496 5.93254 37.9616C6.52161 38.1122 7.15274 38.2736 7.74181 38.4243C6.69545 35.1535 5.60704 31.8721 4.5496 28.6447C4.13373 27.2909 2.00512 27.9016 2.46306 29.2662Z" fill="black"/>
                    </svg>
                    <p class="font-syne font-bold -mt-3 absolute top-12 -left-40 text-sm"
                    data-aos="fade-right" data-aos-delay="600">Soyez les premiers<br/>à découvrir nos<br/>nouveautés !</p>
                </div>
                


                <NuxtLink class="block" to="/pooncast/episodes" data-aos="fade" data-aos-delay="600" title="Épisodes" aria-label="Écouter les épisodes">
                    <button class="btn-secondary-white w-60 lg:w-auto group">
                        <span>Écouter les épisodes</span>
                        <svg class="size-7 group-hover:animate-bounce-right fill-primary group-hover:fill-black" xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path d="M16 2.59766C13.2311 2.59766 10.5243 3.41874 8.22202 4.95708C5.91973 6.49542 4.12532 8.68192 3.06569 11.2401C2.00607 13.7983 1.72882 16.6132 2.26901 19.3289C2.80921 22.0447 4.14258 24.5392 6.10051 26.4972C8.05845 28.4551 10.553 29.7885 13.2687 30.3286C15.9845 30.8688 18.7994 30.5916 21.3576 29.532C23.9157 28.4723 26.1022 26.6779 27.6406 24.3756C29.1789 22.0734 30 19.3666 30 16.5977C30 12.8846 28.525 9.32367 25.8995 6.69816C23.274 4.07265 19.713 2.59766 16 2.59766ZM23.447 17.4927L11.447 23.4927C11.2945 23.5689 11.1251 23.6048 10.9548 23.5971C10.7845 23.5894 10.619 23.5383 10.474 23.4486C10.329 23.3589 10.2093 23.2337 10.1264 23.0847C10.0434 22.9358 9.99993 22.7681 10 22.5977V10.5977C10.0001 10.4273 10.0437 10.2597 10.1268 10.1109C10.2098 9.96213 10.3294 9.83702 10.4744 9.74746C10.6194 9.6579 10.7848 9.60687 10.955 9.5992C11.1252 9.59154 11.2946 9.62749 11.447 9.70366L23.447 15.7037C23.6129 15.7868 23.7524 15.9144 23.8498 16.0723C23.9473 16.2302 23.9989 16.4121 23.9989 16.5977C23.9989 16.7832 23.9473 16.9651 23.8498 17.123C23.7524 17.2809 23.6129 17.4085 23.447 17.4917"/>
                        </svg>
                    </button>
                </NuxtLink>

                <!-- <NuxtLink class="block" to="#" data-aos="fade" data-aos-delay="800">
                    <button class="btn flex items-center justify-between gap-3 w-60 relative group">                
                        <span class="text-default group-hover:hidden">Télécharger l'app</span>
                        <span class="text-default hidden group-hover:inline-block">Prochainement</span>
                        <img class="w-7" src="@/assets/img/home/apple.svg" alt="Télécharger l'application iPhone du Pooncast" />
                    </button>
                </NuxtLink>

                <NuxtLink class="block" to="#" data-aos="fade" data-aos-delay="1000">
                    <button class="btn flex items-center justify-between gap-3 w-60 relative group">
                        <span class="text-default group-hover:hidden">Télécharger l'app</span>
                        <span class="text-default hidden group-hover:inline-block">Prochainement</span>
                        <img class="w-7" src="@/assets/img/home/android.svg" alt="Télécharger l'application Android du Pooncast" />
                    </button>
                </NuxtLink> -->

                <img class="absolute left-0 top-32 size-10 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise illustrant le podcast éducatif pour enfants" role="presentation" />
                <img class="absolute left-1/3 top-20 size-4 animate-spin-slow" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange représentant la participation aux podcasts pour enfants" role="presentation"/>
                <img class="absolute right-1/3 top-24 size-5 animate-pulse" src="@/assets/img/footer/star-black.svg" alt="Étoile noire évoquant les petites histoires captivantes pour enfants" role="presentation"/>
                <img class="absolute right-0 top-16 size-10 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise pour les podcasts éducatifs des enfants" role="presentation" />

            </div>

            <!-- STARS LIGNE DU HAUT -->
            <!-- <img class="absolute xl:-left-44 -left-32 -top-16 size-10 animate-spin-reverse" src="@/assets/img/footer/star-black.svg" alt="Étoile noire symbolisant les petites histoires pour les enfants" />
            <img class="absolute -top-12 left-20 size-6 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange illustrant la participation aux podcasts pour enfants" />
            <img class="absolute -top-20 left-1/3 size-8 animate-spin-slow" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise représentant le podcast éducatif pour enfants" />
            <img class="absolute right-1/3 -top-20 size-4 animate-star" src="@/assets/img/footer/star-black.svg" alt="Étoile noire évoquant les histoires captivantes pour enfants" />
            <img class="absolute -top-12 right-20 size-4 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange illustrant les questions des enfants pour les podcasts" />
            <img class="absolute xl:-right-44 -right-32 top-5 size-6 animate-spin-slow" src="@/assets/img/footer/star-black.svg" alt="Étoile noire pour les petites histoires éducatives des enfants" /> -->

            <!-- STARS COLONNE GAUCHE -->
            <!-- <img class="absolute top-20 -left-32 size-4" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange représentant la participation des enfants aux podcasts" />
            <img class="absolute bottom-20 -left-40 size-6 animate-spin-reverse" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise pour le podcast éducatif des enfants" />
            <img class="absolute -left-32 -bottom-10 size-9" src="@/assets/img/footer/star-black.svg" alt="Étoile noire illustrant les histoires pour répondre aux questions des enfants" />
            <img class="absolute -bottom-32 -left-52 size-4 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange symbolisant la participation aux podcasts des enfants" /> -->

            <!-- STARS LIGNE DU BAS -->
            <!-- <img class="absolute -bottom-52 left-52 size-10 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise illustrant le podcast éducatif pour enfants" />
            <img class="absolute -bottom-52 right-52 size-4 animate-spin-slow" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange représentant la participation aux podcasts pour enfants" />
            <img class="absolute right-20 -bottom-32 size-5 animate-pulse" src="@/assets/img/footer/star-black.svg" alt="Étoile noire évoquant les petites histoires captivantes pour enfants" />
            <img class="absolute -bottom-52 -right-52 size-10 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise pour les podcasts éducatifs des enfants" /> -->

            <!-- STARS COLONNE DROITE -->
            <!-- <img class="absolute bottom-20 -right-44 size-10 animate-spin-reverse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange symbolisant la participation aux podcasts éducatifs des enfants" />
            <img class="absolute top-20 -right-20 size-4 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise illustrant le contenu éducatif pour les enfants" /> -->

        </div>

        <!-- MOBILE -->
        <div class="lg:hidden relative h-svh flex flex-col justify-center z-10">
            <div class="mt-28">
                <div class="relative">
                    <p data-aos="fade-right" class="h1">Les <span class="text-secondary underline-c">petites histoires</span></p>
                    <!-- STARS LIGNE DU HAUT -->
                    <img class="absolute left-12 bottom-20 size-10 animate-spin-reverse" src="@/assets/img/footer/star-black.svg" alt="Étoile noire symbolisant les petites histoires pour les enfants" role="presentation" />
                    <img class="absolute -left-5 md:-left-20 bottom-12 size-6 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange illustrant la participation aux podcasts pour enfants" role="presentation" />
                    <img class="absolute left-1/2 bottom-20 size-8 animate-spin-slow" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise représentant le podcast éducatif pour enfants" role="presentation" />
                    <img class="absolute right-10 bottom-24 size-4 animate-pulse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange illustrant les questions des enfants pour les podcasts" role="presentation" /> 
                    <img class="absolute right-0 md:-right-16 bottom-14 size-6 animate-spin-slow" src="@/assets/img/footer/star-black.svg" alt="Étoile noire pour les petites histoires éducatives des enfants" role="presentation" />
                </div>

                <div class="relative">
                    <p data-aos="fade-right" data-aos-delay="100" class="h1">de Poon</p>
                    <img class="absolute left-0 top-0 size-6 animate-pulse" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise pour le podcast éducatif des enfants" role="presentation" />
                    <img class="absolute right-0 bottom-0 size-4" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange symbolisant la participation aux podcasts des enfants" role="presentation" />
                </div>


                <div class="relative">
                    <p data-aos="fade-right" data-aos-delay="200" class="h1">pour répondre aux</p>
                    <img class="absolute -left-5 md:-left-24 size-7" src="@/assets/img/footer/star-black.svg" alt="Étoile noire illustrant les histoires pour répondre aux questions des enfants" role="presentation" />
                </div>
                <p data-aos="fade-right" data-aos-delay="300" class="h1"><span class="text-secondary underline-c">grandes questions</span></p>
                
                <div class="relative">
                    <span class="relative">
                        <span data-aos="fade-right" data-aos-delay="400" class="h1">des enfants</span>
                        <span data-aos="fade-left" data-aos-delay="500" class="text-secondary text-lg font-fraunces font-bold
                        absolute right-0 top-5">de 3 à 99 ans</span>
                    </span>
                    <img class="absolute left-0 md:-left-16 top-20 size-10 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise illustrant le podcast éducatif pour enfants" role="presentation" />
                    <img class="absolute left-5 md:-left-5 bottom-0 size-6 animate-spin-slow" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange représentant la participation aux podcasts pour enfants" role="presentation" />
                    <img class="absolute right-0 md:-right-20 top-16 size-5 animate-pulse" src="@/assets/img/footer/star-black.svg" alt="Étoile noire évoquant les petites histoires captivantes pour enfants" role="presentation" />
                    <img class="absolute right-0 bottom-0 size-7 animate-spin-reverse" src="@/assets/img/footer/star-gray.svg" alt="Étoile grise pour les podcasts éducatifs des enfants" role="presentation" />
                </div>
            </div>

           <div class="">
                <div class="flex flex-col items-center mt-20 mb-10">

                    <div class="relative overflow-hidden border border-poonblack rounded-full flex justify-between items-center">
                        <div class="ms-2">
                            <label for="email-input-mobile" id="newsletter-mobile-label" class="sr-only">Inscription à la newsletter</label>
                            <input type="text"
                            id="email-input-mobile"
                            v-model="email"
                            inputmode="email"
                            placeholder="Mail" 
                            name="email"
                            class="input placeholder:text-secondary font-syne bg-primary"
                            size="30"
                            tabindex="0"
                            autocomplete="email"
                            aria-labelledby="newsletter-mobile-label"
                            />
                        </div>

                        <div>
                            <NuxtLink :to="{ path: '/inscrivez-vous-au-pooncast', query: { email: email } }" title="Inscrivez-vous au Pooncast" aria-label="Inscrivez-vous au Pooncast">
                                <button class="btn bg-poonblack text-primary">Envoyer</button>
                            </NuxtLink>
                        </div>  
                    </div>
                    <p class="font-syne font-bold mt-2" data-aos="fade" data-aos-delay="600">Soyez les premiers à<br/>découvrir nos nouveautés !</p>

                    
                    <NuxtLink class="block mt-5 z-10" to="/pooncast/episodes" title="Épisodes" aria-label="Écouter les épisodes">
                        <button class="btn-secondary-white w-auto group">
                            <span>Écouter les épisodes</span>
                            <svg class="xl:size-7 fill-primary group-hover:fill-black group-hover:animate-bounce-right" xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                            <path d="M16 2.59766C13.2311 2.59766 10.5243 3.41874 8.22202 4.95708C5.91973 6.49542 4.12532 8.68192 3.06569 11.2401C2.00607 13.7983 1.72882 16.6132 2.26901 19.3289C2.80921 22.0447 4.14258 24.5392 6.10051 26.4972C8.05845 28.4551 10.553 29.7885 13.2687 30.3286C15.9845 30.8688 18.7994 30.5916 21.3576 29.532C23.9157 28.4723 26.1022 26.6779 27.6406 24.3756C29.1789 22.0734 30 19.3666 30 16.5977C30 12.8846 28.525 9.32367 25.8995 6.69816C23.274 4.07265 19.713 2.59766 16 2.59766ZM23.447 17.4927L11.447 23.4927C11.2945 23.5689 11.1251 23.6048 10.9548 23.5971C10.7845 23.5894 10.619 23.5383 10.474 23.4486C10.329 23.3589 10.2093 23.2337 10.1264 23.0847C10.0434 22.9358 9.99993 22.7681 10 22.5977V10.5977C10.0001 10.4273 10.0437 10.2597 10.1268 10.1109C10.2098 9.96213 10.3294 9.83702 10.4744 9.74746C10.6194 9.6579 10.7848 9.60687 10.955 9.5992C11.1252 9.59154 11.2946 9.62749 11.447 9.70366L23.447 15.7037C23.6129 15.7868 23.7524 15.9144 23.8498 16.0723C23.9473 16.2302 23.9989 16.4121 23.9989 16.5977C23.9989 16.7832 23.9473 16.9651 23.8498 17.123C23.7524 17.2809 23.6129 17.4085 23.447 17.4917"/>
                            </svg>
                        </button>
                    </NuxtLink>
                
                </div>
                <!-- <NuxtLink class="block" to="#" data-aos="fade" data-aos-delay="800">
                    <button class="btn flex items-center justify-between gap-3 w-60 lg:w-auto">                
                        <span>Télécharger l'app</span>
                        <img class="w-7" src="@/assets/img/home/apple.svg" alt="Télécharger l'application iPhone du Pooncast" />
                    </button>
                </NuxtLink>

                <NuxtLink class="block" to="#" data-aos="fade" data-aos-delay="1000">
                    <button class="btn flex items-center justify-between gap-3 w-60 lg:w-auto">
                        <span>Télécharger l'app</span>
                        <img class="w-7" src="@/assets/img/home/android.svg" alt="Télécharger l'application Android du Pooncast" />
                    </button>
                </NuxtLink> -->
            </div>

        </div>

        <div class="absolute -bottom-2">
            <img class="xl:w-24 lg:w-20 w-16 custom-bounce" src="@/assets/img/home/headphones.svg" alt="écouter les podcasts du pooncast" role="presentation" />
        </div>
    </div>     

</template>

<script setup>
const email = ref('');
</script>

<style scoped>
.underline-c {
  position: relative;
  display: inline-block;
}

.underline-c::after {
  content: "";
  position: absolute;
  right: 0;
  height: 15px; /* Adjust the height according to your image */
  background-image: url('@/assets/img/home/underline.svg'); /* Update this path to your image location */
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
  @apply xl:-bottom-0 lg:-bottom-0 lg:left-8 md:-bottom-1 md:left-5 -bottom-3 left-1;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.custom-bounce {
    animation: bounce 1s 5;
}
</style>