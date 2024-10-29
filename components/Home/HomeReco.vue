<template>
    <div class="w-full flex flex-col items-center" aria-labelledby="recommendations-title">

        <!-- Section des recommandations d’auditeurs -->
        <div class="md:mt-10 mt-10 w-full flex flex-col items-center justify-center bg-secondary py-10 shadow-xl" data-aos="fade">
            
            <!-- Titre de la section avec id pour aria-labelledby -->
            <h2 id="recommendations-title" class="text-center text-primary mx-5" data-aos="fade-up">
                Nos auditeurs parlent de nous
            </h2>

            <!-- Carrousel de recommandations avec aria-label -->
            <RecoCarousel class="mt-10" aria-label="Carrousel de recommandations des auditeurs" />
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>