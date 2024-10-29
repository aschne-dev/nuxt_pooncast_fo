<template>
    <div>
        <header>
            <Navbar/>
        </header>
        <main>
            <div class="flex flex-col items-center justify-center pt-[120px] md:pt-[150px] mx-auto">
                <h1 class="mt-7 text-secondary">Page Introuvable</h1>
                
                
                <NuxtLink class="link mt-10 mb-10 underline" to="/" title="Accueil">Accueil</NuxtLink>
            </div>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  </template>
  
<script setup>
defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>