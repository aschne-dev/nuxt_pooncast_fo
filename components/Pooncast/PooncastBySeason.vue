<template>
  <div class="flex flex-col items-center justify-center bg-[url('@/assets/img/episodes/grid.svg')] bg-center bg-repeat-space sm:bg-none">
    <div v-if="loading" class="flex items-center justify-center">
      <Loading fillColor="fill-secondary" />
    </div>

    <div v-else-if="episodes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-2 xl:gap-5 2xl:gap-5 mt-10
    sm:bg-[url('@/assets/img/episodes/grid.svg')] sm:bg-center sm:bg-repeat-y pb-10">
      
      <div v-for="pooncast in episodes" :key="pooncast.id" class="lg:mx-2">
          <Pooncast :pooncast="pooncast" bgOpacity="bg-opacity-100" data-aos="fade-up" class="h-full" />
      </div>
    </div>

    <div v-else>
      <div class="mt-10 mx-2">
        <p class="font-nunito text-lg font-bold text-center">Cette saison est en cours de création. Envoyez-nous vos questions 
          <span class="text-nowrap"><NuxtLink to="/participez-au-pooncast" class="underline">ici</NuxtLink> !</span></p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { usePooncastStore } from '@/stores/Pooncast/Pooncast'

const props = defineProps({
    season: {
      type: Number,
      required: true
    }
});

const emit = defineEmits(['no-episodes']);

const pooncastStore = usePooncastStore();
const { episodesBySeason, loading } = storeToRefs(pooncastStore);
pooncastStore.fetchPooncasts();

const episodes = computed(() => {
  const seasonEpisodes = episodesBySeason.value(props.season);
  if (seasonEpisodes.length === 0) {
    emit('no-episodes');
  }
  return seasonEpisodes;
});

</script>
