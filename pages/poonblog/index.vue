<template>
    <div>
        <HomeBlog />
    </div>
</template>

<script setup>
import HomeBlog from '~/components/Blog/HomeBlog.vue';
import { useBlogStore } from '~/stores/Blog/blog';

const blogStore = useBlogStore();
await Promise.allSettled([
    callOnce('blogs', () => blogStore.fetchBlogs())
]);

usePooncastSeo({
    title: "Le PoonBlog - Articles et ressources éducatives pour enfants",
    description: "Découvrez des articles éducatifs et des ressources pour éveiller la curiosité des enfants et prolonger les épisodes du Pooncast.",
    path: '/poonblog'
});

// ANALYTICS
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'PoonBlog',
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
});
</script>

<style scoped>

</style>
