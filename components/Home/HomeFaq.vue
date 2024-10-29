<template>
    <div class="flex flex-col items-center mt-20">
        <h2>FAQ</h2>
        <div v-if="loading">
            <Loading fillColor="fill-secondary" />
        </div>
        <div v-else class="bg-secondary p-5 mt-5 rounded-xl lg:w-3/4 lg:px-10 shadow-xl">
            <div v-for="faq in faqs" :key="faq.id">
                <FaqDetails :faq="faq" :open-faq-id="openFaqId" @toggleFaq="toggleFaq"
                data-aos="fade-up"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFaqStore } from '@/stores/FAQ/faq';

const faqStore = useFaqStore();
const { faqs, loading } = storeToRefs(faqStore);

faqStore.fetchFaqs();

// Gestion centralisée fermeture des FAQ ouvertes/fermées
const openFaqId = ref(null); 
const toggleFaq = (id) => {
    openFaqId.value = openFaqId.value === id ? null : id;
};

</script>

<style scoped>

</style>