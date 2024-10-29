<template>
    <div class="flex items-center justify-between my-2 lg:my-5 shadow-xl">
        <div class="bg-primary py-5 px-5 rounded-xl cursor-pointer w-full"
            @click="toggleShowAnswer">
            <div class="flex justify-between items-center">
                <p class="font-syne font-bold lg:text-xl">{{ faq.question }}</p>
                <svg :class="{ rotated: isOpen }" class="size-6 transition-transform duration-200 ease-in" xmlns="http://www.w3.org/2000/svg" width="24" height="42" viewBox="0 0 24 42" fill="none">
                    <path d="M16.4669 21.1306L1.01979 5.93775C0.711067 5.66124 0.461888 5.32662 0.286999 4.95371C0.112111 4.58079 0.0150693 4.17716 0.00161851 3.7667C-0.0118323 3.35624 0.0585812 2.94729 0.208691 2.56407C0.358801 2.18085 0.585555 1.83115 0.875532 1.53566C1.16551 1.24017 1.51281 1.00491 1.89689 0.843796C2.28096 0.682678 2.69399 0.598987 3.11154 0.597671C3.52909 0.596355 3.94266 0.677444 4.32777 0.836139C4.71289 0.994835 5.06171 1.22791 5.35361 1.52156L5.42964 1.59635L23.0859 18.9578C23.6712 19.5336 24 20.3144 24 21.1285C24 21.9427 23.6712 22.7235 23.0859 23.2992L5.43387 40.6607C5.14903 40.9506 4.8089 41.1826 4.43292 41.3433C4.05694 41.504 3.65246 41.5903 3.24257 41.5972C2.83269 41.6041 2.42543 41.5316 2.04404 41.3838C1.66266 41.2359 1.31461 41.0156 1.01979 40.7355C0.724965 40.4553 0.489131 40.1208 0.325752 39.751C0.162373 39.3812 0.074649 38.9834 0.0675888 38.5802C0.0605285 38.1771 0.13427 37.7765 0.284604 37.4014C0.434937 37.0263 0.658918 36.684 0.943758 36.3941L1.01979 36.3193L16.4669 21.1306Z" fill="#FF774C"/>
                </svg>
            </div>

            <collapse-transition>
                <div v-if="isOpen">
                   <p class="font-nunito py-5">{{ faq.reponse }}</p>
                </div>
            </collapse-transition>
        </div>
    </div>
</template>

<script setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';

const props = defineProps({
  faq: Object,
  openFaqId: String,
});

const emit = defineEmits(['toggleFaq']);
const showEditFaq = ref(false);
const isOpen = computed(() => props.openFaqId === props.faq.id);

const toggleShowAnswer = () => {
  emit('toggleFaq', props.faq.id);
};


</script>

<style scoped>
.rotated {
@apply origin-center rotate-90;
}
</style>
