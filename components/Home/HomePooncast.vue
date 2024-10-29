<template>
    <div class="w-full bg-secondary flex flex-col items-center justify-center py-10">
        <div class="flex flex-col items-center">
            <h2 class="text-center xl:w-[600px] lg:w-[500px] w-[400px] max-[450px]:w-full text-primary pt-5"
            data-aos="fade">Disponible gratuitement sur votre plateforme préférée</h2>
            <div class="flex mt-5">
                <div v-for="index in 5" :key="index" data-aos="fade-left" :data-aos-delay="index*100">
                    <svg class="size-8 lg:size-10" xmlns="http://www.w3.org/2000/svg" width="67" height="65" viewBox="0 0 67 65" fill="none">
                        <path d="M33.4999 46.7728L50.7524 56.8748L46.1741 37.8353L61.4166 25.0248L41.3445 23.3728L33.4999 5.4165L25.6553 23.3728L5.58325 25.0248L20.8258 37.8353L16.2474 56.8748L33.4999 46.7728Z" fill="#FBF2E0"/>
                    </svg>
                </div>
            </div>
            <div class="mt-2" data-aos="fade-up">
                <p class="font-syne font-bold">5/5 sur Apple Podcast et Spotify</p>
            </div>

            <div class="grid md:grid-cols-4 grid-cols-2 mt-14 lg:gap-20 gap-10 text-primary">
                <a href="https://open.spotify.com/show/3TVuR9LXli8tGw4Weh3gc7" target="_blank" title="Spotify" rel="noopener noreferrer">
                <div class="flex flex-col items-center justify-center space-y-5"
                data-aos="fade">
                    <img class="xl:w-24 lg:w-20 w-16 h-auto" src="@/assets/img/home/logo_spotify.svg" alt="Ecoutez les épisodes du pooncast sur Spotify" />
                    <div class="font-syne xl:text-xl font-semibold text-poonblack">Spotify</div>
                </div>
                </a>

                <a href="https://podcasts.apple.com/fr/podcast/le-pooncast/id1758948593" target="_blank" title="Apple Podcast" rel="noopener noreferrer">
                <div class="flex flex-col items-center justify-center space-y-5"
                data-aos="fade" data-aos-delay="100">
                    <img class="xl:w-24 lg:w-20 w-16 h-auto" src="@/assets/img/home/logo_applepodcast.svg" alt="Ecoutez les épisodes du pooncast sur Apple Podcast" />
                    <div class="font-syne xl:text-xl font-semibold text-poonblack">Apple Podcast</div>
                </div>
                </a>

                <a href="https://music.amazon.fr/podcasts/9119c45f-cd4e-4d0a-9f0d-16c48657e8e4/le-pooncast" target="_blank" title="Amazon Music" rel="noopener noreferrer">
                <div class="flex flex-col items-center justify-center space-y-5"
                data-aos="fade" data-aos-delay="200">
                    <img class="xl:w-24 lg:w-20 w-16 h-auto" src="@/assets/img/home/logo_amazon.svg" alt="Ecoutez les épisodes du pooncast sur Amazon Music" />
                    <div class="font-syne xl:text-xl font-semibold text-poonblack">Amazon Music</div>
                </div>
                </a>

                <a href="https://podcastaddict.com/podcast/le-pooncast/5232443" target="_blank" title="Podcast Addict" rel="noopener noreferrer">
                <div class="flex flex-col items-center justify-center space-y-5"
                data-aos="fade" data-aos-delay="300">
                    <img class="xl:w-24 lg:w-20 w-16 h-auto" src="@/assets/img/home/logo_podcastaddict.svg" alt="Ecoutez les épisodes du pooncast sur Podcast Addict" />
                    <div class="font-syne xl:text-xl font-semibold text-poonblack">Podcast Addict</div>
                </div>   
                </a>         
            </div>
    
        </div>

        <div v-if="loading" class="mt-10">
            <Loading fillColor="fill-primary" />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-2 xl:gap-5 2xl:gap-5 my-10">
            <div v-for="pooncast in displayedPooncasts" :key="pooncast.id" class="lg:mx-2">
                <Pooncast :pooncast="pooncast" bgOpacity="bg-opacity-100" data-aos="fade-up" class="h-full" />
            </div>
        </div>

        <NuxtLink  to="/pooncast/episodes" class="mt-5" title="Voir tous les épisodes">
            <button class="btn-white" data-aos="fade" aria-label="Voir tous les épisodes">Voir tous les épisodes</button>   
        </NuxtLink>     
    </div>
</template>

<script setup>
import { usePooncastStore } from '@/stores/Pooncast/Pooncast.js'

const pooncastStore = usePooncastStore();
const { recentPooncasts, loading } = storeToRefs(pooncastStore);

const width = ref(null);
const updateWidth = () => {
    width.value = window.innerWidth;
}

onMounted(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
})

const displayedPooncasts = computed(() => {
    if (width.value >= 1024) {
        return recentPooncasts.value(3);
    } else {
        return recentPooncasts.value(2);
    } 
})

pooncastStore.fetchPooncasts();



</script>

<style scoped>

</style>