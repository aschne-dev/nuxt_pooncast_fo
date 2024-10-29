<template>
    <div class="flex flex-col items-center mt-20" aria-labelledby="faq-title">
        <!-- Titre de la section FAQ -->
        <h2 id="faq-title">FAQ</h2>

        <!-- Indicateur de chargement avec aria-busy -->
        <div v-if="loading" aria-busy="true">
            <Loading fillColor="fill-secondary" />
        </div>
        
        <!-- Contenu FAQ avec aria-live pour informer des mises à jour dynamiques -->
        <div v-else class="bg-secondary p-5 mt-5 rounded-xl lg:w-3/4 lg:px-10 shadow-xl" aria-live="polite" aria-busy="false">
            <div v-for="faq in faqs" :key="faq.id">
                <!-- Composant FaqDetails avec gestion de l'ouverture et fermeture via aria-controls -->
                <FaqDetails 
                    :faq="faq" 
                    :open-faq-id="openFaqId" 
                    @toggleFaq="toggleFaq"
                    :aria-expanded="openFaqId === faq.id" 
                    data-aos="fade-up" 
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFaqStore } from '@/stores/FAQ/faq';

const faqStore = useFaqStore();
const { faqs, loading } = storeToRefs(faqStore);

faqStore.fetchFaqs();

// Gestion centralisée des états ouverts/fermés des FAQ
const openFaqId = ref(null); 
const toggleFaq = (id) => {
    openFaqId.value = openFaqId.value === id ? null : id;
};
</script>
