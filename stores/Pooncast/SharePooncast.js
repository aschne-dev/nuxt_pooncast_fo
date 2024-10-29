// stores/shareStore.js
export const useSharePooncastStore = defineStore('sharePooncastStore', () => {
  const isVisible = ref(false);
  const idPooncast = ref('');

  const showSharePopup = (id) => {
    //console.log('share store:'+ id)
    isVisible.value = true;
    idPooncast.value = id;
  };

  const hideSharePopup = () => {
    isVisible.value = false;
  };

  return { isVisible, idPooncast, showSharePopup, hideSharePopup };
});
