<template>
    <div>
        <div v-if="loading">
            <Loading fillColor="fill-secondary" />
        </div>
        <div v-else class="flex flex-col justify-center items-center">
            <Carousel 
            :items-to-show="3" 
            :transition="500"
            :wrap-around="true"
            v-model="currentSlide"
            class="md:w-1/2 sm:w-[60%] w-full h-full hidden"
            >
                <Slide v-for="(recommendation, index) in recommendations" :key="recommendation.id">
                    <div class="flex items-center justify-center h-52 cursor-pointer" @click="slideTo(index)">
                        <img :src="recommendation.avatar" :alt="recommendation.name" 
                            class="lg:size-28 md:size-24 size-20 rounded-full bg-secondary transition-all ease-in duration-150"
                        />
                    </div>
                </Slide>

                
            </Carousel>

            <div class="md:grid md:grid-cols-3 md:mt-5 mt-0 flex justify-center gap-10 items-center">
                <div class="lg:col-span-1 lg:block hidden">
                </div>

                <div class="md:col-span-2 lg:col-span-1 text-center relative flex justify-center items-center sm:ps-0 ps-5">
                    
                    <div :key="activeRecommendation.id" class="">
                        <p class="font-syne font-medium capitalize lg:text-3xl text-2xl">{{ activeRecommendation.name }}</p>
                        <p class="font-nunito">{{ activeRecommendation.profession }}</p>                    
                    </div>
                </div>

                <div class="md:col-span-1 flex items-center justify-start sm:ps-6">
                    <button @click="slideTo(currentSlide + 1)" aria-label="Prochaine recommandation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="65" viewBox="0 0 64 65" fill="none" class="hover:fill-secondary transition-colors ease-in duration-150 lg:size-18 md:size-14 size-12">
                        <circle cx="32" cy="32.5977" r="31.5" stroke="black"/>
                        <path d="M37.8325 32.1691C37.9398 32.2829 38 32.4366 38 32.5967C38 32.7568 37.9398 32.9105 37.8325 33.0243L32.6911 38.4251C32.5814 38.5352 32.4357 38.597 32.284 38.5977C32.2082 38.5973 32.1331 38.582 32.0627 38.5526C31.9587 38.5067 31.87 38.4295 31.8077 38.3307C31.7454 38.232 31.7124 38.116 31.7128 37.9976V33.1968H26.5713C26.4198 33.1968 26.2745 33.1336 26.1673 33.021C26.0602 32.9085 26 32.7558 26 32.5967C26 32.4375 26.0602 32.2849 26.1673 32.1724C26.2745 32.0598 26.4198 31.9966 26.5713 31.9966H31.7128V27.1958C31.7124 27.0773 31.7454 26.9614 31.8077 26.8626C31.87 26.7638 31.9587 26.6866 32.0627 26.6407C32.1682 26.5975 32.2832 26.5865 32.3944 26.6091C32.5056 26.6317 32.6085 26.6868 32.6911 26.7683L37.8325 32.1691Z" fill="black"/>
                        </svg>
                    </button>
                </div>
            </div>  
         </div>

         <div class="xl:mx-52 lg:mt-5 mt-10 pb-5 relative sm:flex hidden items-center justify-center">   
            <img class="w-[90%]" src="@/assets/img/home/reco_bg-white.svg" :alt="activeRecommendation.recommendation" />

            <div class="absolute lg:top-1/4 top-[45px] md:flex items-center justify-center hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="36" viewBox="0 0 38 36" class="xl:size-10 lg:size-8 size-8 fill-secondary">
                <path d="M11.5031 0.4646L14.7371 3.6986C13.1691 6.4426 11.7971 9.1866 10.6211 11.9306C9.44511 14.5766 8.75911 17.1736 8.56311 19.7216L15.9131 21.3386V35.5976H0.0371094L0.0371094 25.3076C0.0371094 19.2316 1.21311 14.3316 3.56511 10.6076C6.01511 6.7856 8.66111 3.4046 11.5031 0.4646ZM33.5531 0.4646L36.7871 3.6986C35.2191 6.4426 33.8471 9.1866 32.6711 11.9306C31.4951 14.5766 30.8091 17.1736 30.6131 19.7216L37.9631 21.3386V35.5976H22.0871L22.0871 25.3076C22.0871 19.2316 23.2631 14.3316 25.6151 10.6076C28.0651 6.7856 30.7111 3.4046 33.5531 0.4646Z"/>
                </svg>
            </div>

            <div class="absolute lg:top-1/3 md:top-[60px] sm:top-[15px] top-0 flex items-center justify-center mx-10 px-20 w-full">                
                <p class="text-center mt-10 px-5 lg:text-base text-sm font-nunito">{{ activeRecommendation.recommendation }}</p>
            </div>            
        </div>

        <div class="sm:hidden border-tertiary bg-primary border-2 rounded-xl px-5 mx-5 py-2 mt-5 font-nunito">
            <p class="text-center">{{ activeRecommendation.recommendation }}</p>
        </div>        
  
    </div>
</template>

<script setup>
import { useRecommendationsStore } from '@/stores/Reco/Recommendation'

const recommendationsStore = useRecommendationsStore()
const { recommendations, loading } = storeToRefs(recommendationsStore);

const activeRecommendation = ref('')

const currentSlide = ref(0);
const slideTo = (index) => { 
    currentSlide.value = index;
    updateActiveRecommendation()
}

const updateActiveRecommendation = () => {
    const currentIndex = currentSlide.value % recommendations.value.length
    //console.log("Current = "+ currentIndex)
    activeRecommendation.value = recommendations.value[currentIndex]
}

onMounted(async () => {
    await recommendationsStore.fetchRecommendations()
    await nextTick()
    slideTo(1)
})

</script>

<style scoped>
.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide--active {
    transform: scale(1.4);
}  

</style>