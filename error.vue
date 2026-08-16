<template>
    <div>
        <header>
            <Navbar/>
        </header>
        <main>
            <div class="flex flex-col items-center justify-center pt-[120px] md:pt-[150px] mx-auto">
                <h1 class="mt-7 text-secondary text-center">{{ publicError.heading }}</h1>
                
                
                <NuxtLink class="link mt-10 mb-10 underline" to="/" title="Accueil">Accueil</NuxtLink>
            </div>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  </template>
  
<script setup>
import { getPublicErrorContent } from '~/utils/http-error';

const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
const publicError = computed(() => getPublicErrorContent(props.error?.statusCode));

useSeoMeta({
    title: () => publicError.value.title,
    description: () => publicError.value.description,
    robots: 'noindex, nofollow'
});
</script>
