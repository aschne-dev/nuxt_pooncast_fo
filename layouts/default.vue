<template>
    <div class="overflow-hidden lg:overflow-visible">
      <header>
        <Navbar />
      </header>
  
      <main>
        <SharePooncast />
        <ShareBlog/>
            <slot />
      </main>
  
      <footer>
        <Footer />
      </footer>
    </div>
  </template>
  
  <script setup>
  import SharePooncast from '~/components/Pooncast/SharePooncast.vue';
  import ShareBlog from '~/components/Blog/ShareBlog.vue';
  </script>

<style>
.no-scroll {
  overflow: hidden;
}
</style>

  