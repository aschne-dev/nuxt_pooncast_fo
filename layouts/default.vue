<template>
    <div class="overflow-hidden lg:overflow-visible">
      <ClientOnly>
      <CookieControl locale="fr">
        <template #bar>
          <h2 class="text-primary">Ce site utilise des cookies et vous donne le contrôle sur leur activation.</h2>
          <p class="text-primary">Nous utilisons des cookies pour mesurer et analyser notre trafic, et pour sécuriser les informations
            transmises via notre formulaire de participation au Pooncast.</p>
        </template>
      </CookieControl>
    </ClientOnly>
    
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

  