// stores/shareStore.js
export const useShareBlogStore = defineStore('shareBlogStore', () => {
  const isVisible = ref(false);
  const idBlog = ref('');

  const showSharePopup = (id) => {
    //console.log('share store:'+ id)
    isVisible.value = true;
    idBlog.value = id;
  };

  const hideSharePopup = () => {
    isVisible.value = false;
  };

  return { isVisible, idBlog, showSharePopup, hideSharePopup };
});
