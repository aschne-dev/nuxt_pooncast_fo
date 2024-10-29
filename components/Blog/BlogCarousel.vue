<template>
  <div>
      <div class="flex flex-col items-center justify-center w-full mt-10">
        <Carousel 
        :items-to-show="1"
        :wrap-around="true"
        :breakpoints="breakpoints"
        :autoplay="5000"
        :transition="1000"
        class="w-full h-full">
          <Slide v-for="(blog, index) in blogs" :key="index" class="bg-transparent">
              <BlogSnapshot :blog="blog" />
          </Slide>

          <template #addons>
          <Navigation />
          <Pagination />
        </template>
          
        </Carousel>
      </div>
  </div>
</template>

<script  setup>
const props = defineProps({
  blogs: {
    type: Object,
    required: true
  }
});

const breakpoints = {
  768: { itemsToShow: 2, snapAlign: 'start' }, // Correspond à `md:`
  1024: { itemsToShow: 3 } // Correspond à `lg:`
};
</script>

<style scoped>
.carousel__slide {
  @apply pb-14 px-20;
}
</style>