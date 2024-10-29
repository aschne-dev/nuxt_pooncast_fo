<template>
    <div class="flex flex-col items-center pt-5">
        <h2 class="invisible absolute -left-full">Bienvenue dans le Pooncast</h2>

        <div class="flex sm:flex-row flex-col items-center justify-center sm:gap-3 mt-5">
            <p class="h2" data-aos="fade-right">Bienvenue dans</p>
            <img class="h-20 lg:h-28 w-auto sm:mb-10"  data-aos="fade-left" src="@/assets/img/logo/logo.svg" alt="Bienvenue sur le pooncast: podcasts pour enfants">
        </div>

        <div class="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="bg-secondary rounded-2xl p-5 flex flex-col items-center justify-between w-72 lg:w-56 shadow-xl"
            data-aos="fade-up">
                <img src="@/assets/img/home/welcome_eveil.svg" class="w-20 md:pt-5" alt="Éveille la curiosité et stimule l'imagination" />
                <p class="font-syne font-bold text-primary text-center text-lg mt-2">Éveille la curiosité et stimule l'imagination</p>
            </div>
            <div class="bg-secondary rounded-2xl p-5 flex flex-col items-center justify-between w-72 lg:w-56 shadow-xl"
            data-aos="fade-up">
                <img src="@/assets/img/home/welcome_abc.svg" class="w-20 md:pt-5" alt="Renforce le vocabulaire et l'apprentissage" />
                <p class="font-syne font-bold text-primary text-center text-lg mt-2">Renforce le vocabulaire et l'apprentissage</p>
            </div>
            <div class="bg-secondary rounded-2xl p-5 flex flex-col items-center justify-between w-72 lg:w-56 shadow-xl"
            data-aos="fade-up">
                <img src="@/assets/img/home/welcome_concentration.svg" class="w-20 md:pt-5" alt="Favorise la concentration et l'écoute active" />
                <p class="font-syne font-bold text-primary text-center text-lg mt-2">Favorise la concentration et l'écoute active</p>
            </div>
            <div class="bg-secondary rounded-2xl p-5 flex flex-col items-center justify-between w-72 lg:w-56 shadow-xl"
            data-aos="fade-up">
                <img src="@/assets/img/home/welcome_plaisir.svg" class="w-20 md:pt-5" alt="Offre des moments de détente et de plaisir" />
                <p class="font-syne font-bold text-primary text-center text-lg mt-2">Offre des moments de détente et de plaisir</p>
            </div>
        </div>

        <div class="mx-5 mt-5">
            <div class="grid grid-cols-1 lg:grid-cols-2 mt-10 md:gap-16 gap-5 sm:mx-10">
                <div class="p-0.5 rounded-xl bg-gradient-to-b from-transparent to-poonblack shadow-xl" data-aos="fade">
                    <div class="h-full w-full p-8  bg-primary rounded-xl border-poonblack ">
                        <h3 class="xl:text-2xl text-xl font-syne font-bold mb-4 text-center">Le Pooncast: l'aventure éducative</h3>
                        <p class="font-nunito text-justify text-base xl:text-lg">
                            Le Pooncast, c'est bien plus qu'une simple distraction. C'est un outil éducatif ludique qui aide les enfants à comprendre le monde. Nos histoires sont élaborées avec soin pour offrir des explications claires, tout en captivant les jeunes esprits grâce à des récits pleins de magie et d'aventures.
                        </p>
                        
                    </div>
                </div>

                <div class="p-0.5 rounded-xl bg-gradient-to-b from-transparent to-poonblack shadow-xl" data-aos="fade">
                    <div class="h-full w-full p-8 relative bg-primary rounded-xl border-poonblack ">
                        <h3 class="xl:text-2xl text-xl font-syne font-bold mb-4 text-center">Mission</h3>
                        <p class="font-nunito text-justify text-base xl:text-lg">
                            Eveiller la curiosité et l'imagination des enfants grâce à des histoires amusantes et enrichissantes. Nous voulons stimuler l'apprentissage, encourager la découverte, et renforcer les liens familiaux avec des moments partagés autour de nos récits.
                        </p>
                    </div>
                </div>

                <div class="p-0.5 rounded-xl bg-gradient-to-b from-transparent to-poonblack shadow-xl z-20" data-aos="fade">
                    <div class="h-full w-full p-8 relative bg-primary rounded-xl border-poonblack ">
                        <h3 class="xl:text-2xl text-xl font-syne font-bold mb-4 text-center">Un podcast participatif</h3>
                        <p class="font-nunito text-justify text-base xl:text-lg">
                            Au Pooncast, les enfants sont au cœur de l'action ! Nous invitons nos jeunes auditeurs à poser leurs propres questions, qui deviennent le point de départ de chaque épisode. Chaque question, envoyée par message audio, rend l'histoire personnelle et unique. Une aventure interactive où chaque enfant se sent écouté et valorisé.
                        </p>
                        <div class="absolute -right-5 -bottom-16 lg:-right-5 lg:-bottom-7 hidden sm:block">
                            <NuxtLink class="block pt-20" to="/participez-au-pooncast" title="Participez au Pooncast">
                                <button aria-label="Participez au pooncast" class="bg-secondary rounded-full py-8 px-3 lg:px-5 flex flex-col items-center gap-3 border border-secondary text-primary hover:bg-primary hover:text-secondary transition-colors ease-in duration-150 group">
                                    <svg class="size-4 lg:size-6 animate-pulse group-hover:fill-secondary fill-primary stroke-primary group-hover:stroke-secondary transition-colors ease-in duration-150" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                        <title>Participez au pooncast</title>
                                        <path d="M22.3117 1.53127L1.53213 21.7257L22.3117 1.53127Z"/>
                                        <path d="M22.0923 19.9424L22.3117 1.53127M22.3117 1.53127L3.02765 2.07451M22.3117 1.53127L1.53213 21.7257" stroke="" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    <span class="font-syne text-sm lg:text-base leading-3 font-bold">Participez<br/>au pooncast</span>
                                </button>
                            </NuxtLink>
                        </div>
                        <div class="sm:hidden">
                            <NuxtLink class="block pt-5" to="/participez-au-pooncast" title="Participez au Pooncast">
                                <button aria-label="Participez au pooncast" class="bg-secondary w-full rounded-full py-3 mt-5 text-primary hover:bg-primary border border-secondary hover:text-secondary transition-colors ease-in duration-150">
                                    <span class="font-syne text-sm leading-3 font-bold">Participez au pooncast</span>
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <div class="p-0.5 rounded-xl bg-gradient-to-b from-transparent to-poonblack shadow-xl" data-aos="fade">
                    <div class="h-full w-full p-8 relative bg-primary rounded-xl border-poonblack ">
                        <h3 class="xl:text-2xl text-xl font-syne font-bold mb-4 text-center">D’une question à une aventure</h3>
                        <p class="font-nunito text-justify text-base xl:text-lg">
                            Tout a commencé avec une question de Thelma, une petite fille curieuse. Son grand-père, "Poon", avait toujours une histoire prête à satisfaire sa curiosité. De là est né le Pooncast, un podcast où chaque épisode est une nouvelle aventure dans l’imaginaire des enfants.<br/>Aujourd'hui, produit par la fille de Poon, Anaëlle, le Pooncast est bien plus qu'un simple podcast pour enfants. C'est un symbole d'amour familial, de partage et d'histoires magiques qui éveillent l'esprit. Chaque question d'enfant devient une aventure extraordinaire. 
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>