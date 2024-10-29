<template>
  <nav class="absolute top-0 w-full z-30">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between lg:h-52 h-24 font-syne">
        <!-- Logo -->
        <div class="absolute inset-y-0 left-3 flex items-center lg:static lg:flex-shrink-0">
          <NuxtLink to="/" class="flex-shrink-0">
            <img class="h-16 lg:h-24 w-auto" src="@/assets/img/logo/logo.svg" alt="Les petites histoires de Poon pour répondre aux grandes questions des enfants">
          </NuxtLink>
        </div>

        <!-- Menu button for mobile -->
        <div class="absolute inset-y-0 right-0 flex gap-5 items-center lg:hidden">
          <a href="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" 
          rel="noopener noreferrer" target="_blank"
          @click="trackClick('Instagram')"><img src="@/assets/img/footer/instagram.svg" class="size-9" alt="Suivez le pooncast sur Instagram" /></a>  
          <!-- <div class="relative">
            <NuxtLink to="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank"><img src="@/assets/img/footer/instagram.svg" class="size-8" alt="Suivez le pooncast sur Instagram" /></NuxtLink>
            <svg class="absolute w-14 -top-2 -left-7 z-10" data-aos="fade-down" xmlns="http://www.w3.org/2000/svg" width="90" height="105" viewBox="0 0 90 105" fill="none">
              <path d="M32.2499 2.44975C21.0254 10.2419 16.7246 25.9018 18.8359 39.1461C21.1481 53.7733 30.4306 65.4533 40.1228 74.7951C46.7268 81.1552 53.7702 86.8591 61.2778 91.8262C63.3037 93.1582 65.4314 89.5913 63.4055 88.2593C57.0903 84.0137 51.068 79.3306 45.4353 74.1519C40.4676 69.6194 35.768 64.7297 31.7478 59.1701C24.5353 49.1879 19.8754 36.2986 23.1425 22.9597C24.8244 16.2612 28.3754 9.87764 33.8661 6.12C34.7609 5.5168 35.206 4.33404 34.7371 3.30835C34.34 2.30489 33.1447 1.84656 32.2499 2.44975Z" fill="black"/>
              <path d="M48.4684 99.6556C54.1322 97.6245 59.8428 95.6958 65.5535 93.7672C66.9508 93.3197 67.5232 91.472 66.6237 90.3129C65.3931 88.699 64.4056 86.8083 63.7798 84.7655C63.0851 82.4373 62.9456 79.8408 62.1543 77.5707C61.8538 76.5091 60.4403 76.2473 59.6421 76.7924C58.6755 77.3733 58.4457 78.6228 58.771 79.604C59.5375 81.9545 59.6522 84.6313 60.4186 86.9818C61.185 89.3323 62.363 91.3701 63.7592 93.2113C64.1076 92.0866 64.4809 90.8817 64.8293 89.757C59.1186 91.6856 53.3831 93.6945 47.7442 95.6454C45.3831 96.4107 46.0825 100.501 48.4684 99.6556Z" fill="black"/>
            </svg>
            <NuxtLink to="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" data-aos="fade-left" target="_blank" class="z-10 font-syne font-bold text-end absolute top-14 -right-24 w-[300px]">Suivez-nous<br/>pour ne rien manquer</NuxtLink>
          </div> -->


          <button type="button" @click="toggleMenu" aria-label="Menu Mobile" class="inline-flex items-center justify-center p-2 rounded-md text-poonblack hover:text-secondary transition-colors ease-in duration-100" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg  class="block size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Menu Icon</title>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Links for large screens -->
        <div class="hidden lg:ml-6 lg:space-x-8 xl:space-x-10 lg:flex items-center">            
          <NuxtLink class="link" to="/pooncast/episodes">Épisodes</NuxtLink>
          <NuxtLink class="link" to="/poonblog">PoonBlog</NuxtLink>

          <div class="relative">
            <a href="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank"
            rel="noopener noreferrer"
            @click="trackClick('Instagram')"
            ><img src="@/assets/img/footer/instagram.svg" class="size-8 xl:size-9" alt="Suivez le pooncast sur Instagram" /></a>
            <Transition name="fade">
            <div v-if="isHomepage">
              <svg class="absolute bottom-8 -left-3 z-10" data-aos="fade-down" data-aos-delay="200" xmlns="http://www.w3.org/2000/svg" width="49" height="50" viewBox="0 0 49 50" fill="none">
                <path d="M26.7675 2.37925C20.6852 2.64065 16.3976 7.6083 15.2701 13.2085C14.0165 19.3886 16.2477 26.1329 19.0182 32.0789C20.9067 36.1284 23.0875 40.0328 25.5839 43.7671C26.2588 44.7716 27.7345 43.9195 27.0595 42.915C24.9701 39.7479 23.0755 36.484 21.4267 33.1245C19.9673 30.1751 18.6795 27.1537 17.7906 24.0404C16.1969 18.4518 16.1617 12.3678 19.6416 8.04004C21.4071 5.87674 23.9364 4.28916 26.9033 4.18205C27.3854 4.16813 27.7616 3.82219 27.7161 3.31419C27.6985 2.83219 27.2497 2.36533 26.7675 2.37925Z" fill="black"/>
                <path d="M18.807 43.6568C21.5826 44.2549 24.3628 44.9037 27.1429 45.5526C27.8194 45.7207 28.3535 45.1504 28.1415 44.4864C27.8558 43.5671 27.7185 42.6007 27.7619 41.6639C27.8195 40.6007 28.1598 39.5696 28.1664 38.5052C28.1997 38.0244 27.6257 37.5799 27.1946 37.5951C26.6847 37.583 26.3919 38.0069 26.3818 38.4629C26.352 39.5521 25.9885 40.608 25.9586 41.6972C25.9288 42.7864 26.1262 43.8556 26.4488 44.9025C26.7739 44.5553 27.1222 44.1834 27.4474 43.8362C24.6672 43.1874 21.8639 42.5633 19.1115 41.9405C17.967 41.6599 17.6394 43.4011 18.807 43.6568Z" fill="black"/>
              </svg>
              <NuxtLink data-aos="fade-down" data-aos-delay="400" to="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank" class="z-10 font-syne font-bold text-center absolute -top-[70px] xl:-top-[68px] text-sm  -left-20 w-[300px]">Suivez-nous pour ne<br/>rien manquer</NuxtLink>
            </div>
            </Transition>
          </div>

          <div class="relative">
            <NuxtLink to="/participez-au-pooncast">
              <button class="btn group z-10 bg-primary" aria-label="Participez au Pooncast">
                <span>Participez au Pooncast</span>
                <svg class="xl:size-8 lg:size-7 group-hover:animate-bounce-right" xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                  <title>Participez au Pooncast Icon</title>
                  <path d="M14.6215 1.61425C15.0218 1.09888 15.8006 1.09888 16.2009 1.61425L17.1892 2.88642C17.4996 3.28609 18.0598 3.3908 18.4937 3.13027L19.8747 2.30101C20.4342 1.96506 21.1604 2.24637 21.3475 2.87156L21.8095 4.41482C21.9546 4.89966 22.4391 5.19964 22.9378 5.11345L24.5252 4.83908C25.1682 4.72794 25.7437 5.25256 25.6924 5.90314L25.5657 7.50906C25.5258 8.01359 25.8692 8.46833 26.3654 8.5681L27.9447 8.8857C28.5845 9.01436 28.9316 9.71144 28.6487 10.2995L27.9504 11.7512C27.731 12.2073 27.887 12.7554 28.3136 13.0277L29.6715 13.8943C30.2216 14.2454 30.2935 15.0208 29.8173 15.467L28.6417 16.5684C28.2724 16.9145 28.2198 17.4819 28.5192 17.8899L29.4724 19.1885C29.8585 19.7147 29.6454 20.4636 29.0402 20.7077L27.5461 21.3101C27.0767 21.4993 26.8227 22.0094 26.9546 22.498L27.3742 24.0533C27.5442 24.6834 27.075 25.3048 26.4224 25.3137L24.8117 25.3357C24.3056 25.3426 23.8845 25.7265 23.8309 26.2298L23.6604 27.8316C23.5913 28.4806 22.9292 28.8905 22.3175 28.6631L20.8076 28.1017C20.3332 27.9254 19.8019 28.1312 19.5701 28.5811L18.8325 30.0132C18.5336 30.5934 17.7682 30.7365 17.2799 30.3035L16.0747 29.2345C15.6961 28.8987 15.1263 28.8987 14.7476 29.2345L13.5425 30.3035C13.0542 30.7365 12.2888 30.5934 11.9899 30.0132L11.2523 28.5811C11.0205 28.1312 10.4892 27.9254 10.0148 28.1017L8.50484 28.6631C7.89315 28.8905 7.23106 28.4806 7.16198 27.8316L6.99146 26.2298C6.93789 25.7265 6.51678 25.3426 6.01073 25.3357L4.39997 25.3137C3.74742 25.3048 3.27814 24.6834 3.44815 24.0533L3.8678 22.498C3.99964 22.0094 3.74565 21.4993 3.27627 21.3101L1.78222 20.7077C1.17696 20.4636 0.963848 19.7146 1.34998 19.1885L2.30314 17.8899C2.60259 17.4819 2.55001 16.9145 2.18069 16.5684L1.00513 15.467C0.528901 15.0208 0.600754 14.2454 1.15087 13.8943L2.50879 13.0277C2.93541 12.7554 3.09135 12.2073 2.87197 11.7512L2.17367 10.2995C1.89078 9.71144 2.23789 9.01436 2.87768 8.8857L4.45698 8.5681C4.95315 8.46833 5.29655 8.01359 5.25673 7.50906L5.13001 5.90314C5.07867 5.25256 5.65415 4.72794 6.29722 4.83908L7.8846 5.11345C8.38331 5.19964 8.86779 4.89966 9.01292 4.41482L9.47488 2.87156C9.66202 2.24637 10.3882 1.96506 10.9477 2.30101L12.3287 3.13027C12.7626 3.3908 13.3227 3.28609 13.6332 2.88642L14.6215 1.61425Z" fill="#030211"/>
                  <path d="M20.3338 15.6637C20.4244 15.7551 20.4752 15.8786 20.4752 16.0072C20.4752 16.1359 20.4244 16.2594 20.3338 16.3508L15.9938 20.6909C15.9012 20.7794 15.7783 20.829 15.6502 20.8295C15.5862 20.8292 15.5228 20.817 15.4633 20.7933C15.3756 20.7565 15.3007 20.6944 15.2481 20.615C15.1956 20.5357 15.1677 20.4425 15.168 20.3473V16.4895H10.8279C10.7 16.4895 10.5774 16.4387 10.4869 16.3482C10.3965 16.2578 10.3457 16.1351 10.3457 16.0072C10.3457 15.8793 10.3965 15.7567 10.4869 15.6663C10.5774 15.5758 10.7 15.525 10.8279 15.525H15.168V11.6672C15.1677 11.572 15.1956 11.4788 15.2481 11.3995C15.3007 11.3201 15.3756 11.258 15.4633 11.2211C15.5524 11.1864 15.6495 11.1776 15.7434 11.1957C15.8372 11.2138 15.9241 11.2582 15.9938 11.3236L20.3338 15.6637Z" fill="white"/>
                </svg>
              </button>
            </NuxtLink>

            <Transition name="fade">
            <div v-if="isHomepage" class="">
              <svg class="absolute -right-8 -top-5 xl:-top-5 z-0 w-16" xmlns="http://www.w3.org/2000/svg" width="148" height="183" viewBox="0 0 148 183" fill="none">
                <path d="M68.9465 5.85014C86.7355 20.828 92.1109 43.4469 90.0139 63.007C88.7395 75.08 84.9253 86.4385 80.5238 97.5178C76.1224 108.597 71.486 119.565 65.9101 130.086C59.7616 141.812 51.9688 152.757 41.317 161.235C40.1571 162.161 40.7332 164.281 41.8342 165.297C43.2876 166.48 45.1264 166.246 46.2863 165.32C66.1694 149.535 75.9487 125.625 85.1296 103.276C93.9765 81.631 100.856 58.066 93.3485 33.5721C89.7451 21.7659 82.864 10.4947 72.5988 1.8004C69.5526 -0.878185 65.7352 3.21616 68.9465 5.85014Z" fill="black"/>
                <path d="M87.1488 151.135C73.3151 156.008 58.5273 158.951 43.1156 159.875C44.2864 161.046 45.4571 162.218 46.7453 163.446C49.7631 151.34 51.6285 138.932 52.0588 126.212C52.0919 124.627 51.0643 123.154 49.2292 122.774C47.6767 122.406 45.7864 123.354 45.7533 124.938C45.323 137.659 43.5751 150.122 40.4398 162.173C40.0286 163.947 42.1609 165.822 44.0695 165.744C59.9289 164.787 75.282 161.867 89.659 156.759C91.1932 156.257 92.0264 154.807 91.3292 153.245C90.6319 151.682 88.7308 150.533 87.1488 151.135Z" fill="black"/>
              </svg>              
              <NuxtLink to="/participez-au-pooncast" data-aos="fade-down" data-aos-delay="800" class="z-20 pe-5 font-syne font-bold text-center absolute top-16 right-0 text-sm">Envoyez-nous la question<br/>de votre enfant et<br/>écoutez-la prendre vie<br/>dans notre<br/>prochain épisode !</NuxtLink>
            </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div :class="{'translate-x-full': !isOpen, 'translate-x-0': isOpen}" class="fixed bg-primary h-svh inset-0 transform lg:hidden transition-transform duration-500 ease-in-out" id="mobile-menu">
      <div class="flex items-center justify-between px-4 py-4">
        <!-- Logo in mobile menu -->
        <NuxtLink to="/" class="flex-shrink-0" @click="isOpen = false" title="Accueil">
          <img class="h-16 w-auto" src="@/assets/img/logo/logo.svg" alt="Les petites histoires de Poon pour répondre aux grandes questions des enfants">
        </NuxtLink>
        <div class="flex items-center space-x-5">
          <a href="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank" 
          rel="noopener noreferrer"
          @click="trackClick('Instagram')"
          title="Instagram"><img src="@/assets/img/footer/instagram.svg" class="size-9" alt="Suivez le pooncast sur Instagram" /></a>

          <button type="button" aria-label="Fermer le menu mobile" @click="isOpen = false" class="inline-flex items-center justify-center p-2 rounded-md text-poonblack hover:text-secondary transition-colors ease-in duration-100">
            <span class="sr-only">Close menu</span>
            <!-- Close Icon -->
            <svg class="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Fermer le menu mobile</title>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="pt-10 pb-3 space-y-10 text-center flex flex-col justify-start items-center font-syne relative">
        <!-- STARS COLONNE GAUCHE -->
        <img class="absolute top-10 left-10 md:left-44 size-10 animate-pulse" src="@/assets/img/footer/star-gray.svg" alt="Étoile orange représentant la participation des enfants aux podcasts" />
        <img class="absolute top-20 left-20 md:left-24 size-6 animate-spin-reverse" src="@/assets/img/footer/star-secondary.svg" alt="Étoile grise pour le podcast éducatif des enfants" />
        <img class="absolute bottom-44 left-10 md:left-44 size-5 animate-star" src="@/assets/img/footer/star-black.svg" alt="Étoile noire illustrant les histoires pour répondre aux questions des enfants" />
        <img class="absolute bottom-28 left-24 md:left-20 size-4 animate-spin-slow" src="@/assets/img/footer/star-gray.svg" alt="Étoile orange symbolisant la participation aux podcasts des enfants" />

        <!-- STARS COLONNE DROITE -->
        <img class="absolute -top-5 right-44 md:right-44 size-6 animate-spin-slow" src="@/assets/img/footer/star-black.svg" alt="Étoile orange représentant la participation des enfants aux podcasts" />
        <img class="absolute top-14 right-2 md:right-24 size-10 animate-star" src="@/assets/img/footer/star-secondary.svg" alt="Étoile grise pour le podcast éducatif des enfants" />
        <img class="absolute top-44 right-10 md:right-44 size-4 animate-star" src="@/assets/img/footer/star-gray.svg" alt="Étoile noire illustrant les histoires pour répondre aux questions des enfants" />
        <img class="absolute bottom-24 right-32 md:right-20 size-8 animate-spin-slow" src="@/assets/img/footer/star-secondary.svg" alt="Étoile orange symbolisant la participation aux podcasts des enfants" />

        <NuxtLink class="link block text-2xl" to="/" @click="isOpen = false">Accueil</NuxtLink>
        <NuxtLink class="link block text-2xl" to="/pooncast/episodes" @click="isOpen = false">Épisodes</NuxtLink>
        <NuxtLink class="link block text-2xl" to="/poonblog" @click="isOpen = false">PoonBlog</NuxtLink>            
        <NuxtLink class="block pt-20 relative" to="/participez-au-pooncast" @click="isOpen = false">
          <button class="btn text-xl" aria-label="Participez au Pooncast">
            <span>Participez au Pooncast</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
              <path d="M14.6215 1.61425C15.0218 1.09888 15.8006 1.09888 16.2009 1.61425L17.1892 2.88642C17.4996 3.28609 18.0598 3.3908 18.4937 3.13027L19.8747 2.30101C20.4342 1.96506 21.1604 2.24637 21.3475 2.87156L21.8095 4.41482C21.9546 4.89966 22.4391 5.19964 22.9378 5.11345L24.5252 4.83908C25.1682 4.72794 25.7437 5.25256 25.6924 5.90314L25.5657 7.50906C25.5258 8.01359 25.8692 8.46833 26.3654 8.5681L27.9447 8.8857C28.5845 9.01436 28.9316 9.71144 28.6487 10.2995L27.9504 11.7512C27.731 12.2073 27.887 12.7554 28.3136 13.0277L29.6715 13.8943C30.2216 14.2454 30.2935 15.0208 29.8173 15.467L28.6417 16.5684C28.2724 16.9145 28.2198 17.4819 28.5192 17.8899L29.4724 19.1885C29.8585 19.7147 29.6454 20.4636 29.0402 20.7077L27.5461 21.3101C27.0767 21.4993 26.8227 22.0094 26.9546 22.498L27.3742 24.0533C27.5442 24.6834 27.075 25.3048 26.4224 25.3137L24.8117 25.3357C24.3056 25.3426 23.8845 25.7265 23.8309 26.2298L23.6604 27.8316C23.5913 28.4806 22.9292 28.8905 22.3175 28.6631L20.8076 28.1017C20.3332 27.9254 19.8019 28.1312 19.5701 28.5811L18.8325 30.0132C18.5336 30.5934 17.7682 30.7365 17.2799 30.3035L16.0747 29.2345C15.6961 28.8987 15.1263 28.8987 14.7476 29.2345L13.5425 30.3035C13.0542 30.7365 12.2888 30.5934 11.9899 30.0132L11.2523 28.5811C11.0205 28.1312 10.4892 27.9254 10.0148 28.1017L8.50484 28.6631C7.89315 28.8905 7.23106 28.4806 7.16198 27.8316L6.99146 26.2298C6.93789 25.7265 6.51678 25.3426 6.01073 25.3357L4.39997 25.3137C3.74742 25.3048 3.27814 24.6834 3.44815 24.0533L3.8678 22.498C3.99964 22.0094 3.74565 21.4993 3.27627 21.3101L1.78222 20.7077C1.17696 20.4636 0.963848 19.7146 1.34998 19.1885L2.30314 17.8899C2.60259 17.4819 2.55001 16.9145 2.18069 16.5684L1.00513 15.467C0.528901 15.0208 0.600754 14.2454 1.15087 13.8943L2.50879 13.0277C2.93541 12.7554 3.09135 12.2073 2.87197 11.7512L2.17367 10.2995C1.89078 9.71144 2.23789 9.01436 2.87768 8.8857L4.45698 8.5681C4.95315 8.46833 5.29655 8.01359 5.25673 7.50906L5.13001 5.90314C5.07867 5.25256 5.65415 4.72794 6.29722 4.83908L7.8846 5.11345C8.38331 5.19964 8.86779 4.89966 9.01292 4.41482L9.47488 2.87156C9.66202 2.24637 10.3882 1.96506 10.9477 2.30101L12.3287 3.13027C12.7626 3.3908 13.3227 3.28609 13.6332 2.88642L14.6215 1.61425Z" fill="#030211"/>
              <path d="M20.3338 15.6637C20.4244 15.7551 20.4752 15.8786 20.4752 16.0072C20.4752 16.1359 20.4244 16.2594 20.3338 16.3508L15.9938 20.6909C15.9012 20.7794 15.7783 20.829 15.6502 20.8295C15.5862 20.8292 15.5228 20.817 15.4633 20.7933C15.3756 20.7565 15.3007 20.6944 15.2481 20.615C15.1956 20.5357 15.1677 20.4425 15.168 20.3473V16.4895H10.8279C10.7 16.4895 10.5774 16.4387 10.4869 16.3482C10.3965 16.2578 10.3457 16.1351 10.3457 16.0072C10.3457 15.8793 10.3965 15.7567 10.4869 15.6663C10.5774 15.5758 10.7 15.525 10.8279 15.525H15.168V11.6672C15.1677 11.572 15.1956 11.4788 15.2481 11.3995C15.3007 11.3201 15.3756 11.258 15.4633 11.2211C15.5524 11.1864 15.6495 11.1776 15.7434 11.1957C15.8372 11.2138 15.9241 11.2582 15.9938 11.3236L20.3338 15.6637Z" fill="white"/>
            </svg>
          </button>
          <svg class="absolute -bottom-10 -left-5 z-10"  xmlns="http://www.w3.org/2000/svg" width="49" height="50" viewBox="0 0 49 50" fill="none">
            <path d="M26.7675 2.37925C20.6852 2.64065 16.3976 7.6083 15.2701 13.2085C14.0165 19.3886 16.2477 26.1329 19.0182 32.0789C20.9067 36.1284 23.0875 40.0328 25.5839 43.7671C26.2588 44.7716 27.7345 43.9195 27.0595 42.915C24.9701 39.7479 23.0755 36.484 21.4267 33.1245C19.9673 30.1751 18.6795 27.1537 17.7906 24.0404C16.1969 18.4518 16.1617 12.3678 19.6416 8.04004C21.4071 5.87674 23.9364 4.28916 26.9033 4.18205C27.3854 4.16813 27.7616 3.82219 27.7161 3.31419C27.6985 2.83219 27.2497 2.36533 26.7675 2.37925Z" fill="black"/>
            <path d="M18.807 43.6568C21.5826 44.2549 24.3628 44.9037 27.1429 45.5526C27.8194 45.7207 28.3535 45.1504 28.1415 44.4864C27.8558 43.5671 27.7185 42.6007 27.7619 41.6639C27.8195 40.6007 28.1598 39.5696 28.1664 38.5052C28.1997 38.0244 27.6257 37.5799 27.1946 37.5951C26.6847 37.583 26.3919 38.0069 26.3818 38.4629C26.352 39.5521 25.9885 40.608 25.9586 41.6972C25.9288 42.7864 26.1262 43.8556 26.4488 44.9025C26.7739 44.5553 27.1222 44.1834 27.4474 43.8362C24.6672 43.1874 21.8639 42.5633 19.1115 41.9405C17.967 41.6599 17.6394 43.4011 18.807 43.6568Z" fill="black"/>
          </svg>           
          <p class="z-20 font-syne font-bold text-center absolute -bottom-20 -left-5 text-sm mx-10">Envoyez-nous la question de votre enfant et écoutez-la prendre vie dans notre prochain épisode !</p>
        </NuxtLink>
   
      </div>
    </div>
  </nav>
</template>

<script setup>
import { logEvent } from 'firebase/analytics';
import { ref } from 'vue';

const isOpen = ref(false);
function toggleMenu() {
  isOpen.value = !isOpen.value;
}

// Watch for changes in isOpen to add or remove the no-scroll class on body
watch(isOpen, (newValue) => {
  if (newValue) {
    //console.log('no-scroll')
    document.body.classList.add('no-scroll');
  } else {
    //console.log('remove')
    document.body.classList.remove('no-scroll');
  }
});

// Check if the current route is the homepage
const route = useRoute();
const isHomepage = computed(() => route.path === '/');

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
.router-link-exact-active {
  @apply lg:text-secondary;
} 

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
