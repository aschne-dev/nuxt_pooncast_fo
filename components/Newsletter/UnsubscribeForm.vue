<template>
  <div class="flex flex-col items-center mt-[120px] md:mt-[150px] lg:mt-[200px] mx-5 md:mx-20">
    <h1 class="font-syne text-center">Quittez la Poon Family</h1>
    <div class="mt-10">
      <p>Êtes-vous sûr de vouloir vous désinscrire de la communauté du Pooncast ?</p>
      <p class="mt-5">En nous quittant, vous perdrez également :</p>
      <ul class="list-disc list-inside mt-5 space-y-3">
        <li><span class="text-poonblack font-bold text-nowrap">Accès anticipé :</span><br/> Recevez les nouveaux épisodes du Pooncast avant tout le monde.</li>
        <li><span class="text-poonblack font-bold text-nowrap">Contenu exclusif :</span><br/>Découvrez des bonus et des surprises réservés uniquement à nos abonnés.</li>
        <li><span class="text-poonblack font-bold text-nowrap">Idées et astuces :</span><br/>Recevez des suggestions d'activités ludiques et éducatives en lien avec nos histoires.</li>
        <li><span class="text-poonblack font-bold text-nowrap">Participation interactive :</span><br/>Offrez à vos enfants l'opportunité de poser leurs questions et d'entendre leur voix dans nos futurs épisodes.</li>
        <li><span class="text-poonblack font-bold text-nowrap">Restez à l'affût :</span><br/> Soyez informé de toutes nos nouveautés.</li>
      </ul>
    </div>

    <div class="mt-10">
      <form @submit.prevent="handleSubmit">
        <div class="mt-5 relative">
          <label 
              class="label"
              :class="[isFocused['email'] ? '-top-4 left-1 font-bold' : 'top-1 left-2 invisible font-normal',
                      errors['email'] ? 'text-red-500' : 'text-tertiary']">
                  Mail
              </label>
              <input v-model="email" type="text" inputmode="email"
              placeholder="Mail" 
              name="email"
              class="input"
              size="30"
              tabindex="4"
              autocomplete="email"
              :class="[isFocused['email'] ? 'placeholder:text-opacity-0' : 'placeholder:text-opacity-100',
                          errors['email'] ? 'placeholder:text-red-500' : 'placeholder:text-tertiary']"
              @focus="isFocused['email'] = true"
              @blur="handleEmailBlur"/>
        </div>

         <!-- MESSAGES ERREUR -->
         <div v-if="errorMessages.length > 0" class="mt-5 p-4 text-red-500 bg-red-100 border border-red-500 rounded-xl">
          <ul>
            <li v-for="(message, index) in errorMessages" :key="index">
              {{ message }}
            </li>
          </ul>
        </div>


        <!-- SUBMIT -->
        <div class="w-full flex items-center justify-center mt-5">
            <button :disabled="isSubmitting" class="btn-secondary flex items-center gap-2 px-10 group" aria-label="Soumettre le formulaire">
                <span v-if="!isSubmitting">Me désinscrire</span>
                <span v-else>Désinscription...</span>
                <svg v-if="!isSubmitting" class="size-6 group-hover:fill-black fill-secondary transition-all duration-100" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M35.4701 4.37218C36.3341 1.98218 34.0181 -0.33382 31.6281 0.53218L2.41808 11.0962C0.0200843 11.9642 -0.269916 15.2362 1.93608 16.5142L11.2601 21.9122L19.5861 13.5862C19.9633 13.2219 20.4685 13.0203 20.9929 13.0248C21.5173 13.0294 22.0189 13.2397 22.3897 13.6105C22.7605 13.9814 22.9709 14.483 22.9754 15.0074C22.98 15.5318 22.7784 16.037 22.4141 16.4142L14.0881 24.7402L19.4881 34.0642C20.7641 36.2702 24.0361 35.9782 24.9041 33.5822L35.4701 4.37218Z"/>
                </svg>
                <Loading v-else fillColor="fill-poonblack" />
            </button>
        </div>

        <!-- CONFIRMATION MESSAGE -->
        <div v-if="submitSuccess" class="mt-5 text-poonblack font-bold text-center">
          <p>Vous avez été désinscrit avec succès de notre newsletter.</p>
          <p>Nous sommes désolés de vous voir partir. Si vous changez d'avis, vous pouvez vous réinscrire à tout moment sur notre site web.</p>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
const route = useRoute();
const token = ref(route.query.token);
const email = ref(route.query.email || ''); // Récupération de l'email depuis les query params
const isFocused = ref({
    email: false,
});
if (email.value !== '') {
    isFocused.value.email = true;
}

const isSubmitting = ref(false);
const submitSuccess = ref(false);

const errors = ref({
    email: false,
});
const errorMessages = ref([]); // Tableau pour stocker les messages d'erreur

// EMAIL CONTROLS
const handleEmailBlur = () => {
    isFocused.value.email = email.value !== '';
    validateEmail();    
};

const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (email.value !== '' && re.test(email.value)) {
        errors.value.email = false;
    } else {
        errors.value.email = true;
    }
};

// SUBMIT
const handleSubmit = async () => {
  
    validateEmail();

    generateErrorMessages(); // Générer les messages d'erreur avant de soumettre

    if (Object.values(errors.value).every(value => value === false)) {
        isSubmitting.value = true;
        try {
            const response = await fetch('https://europe-west1-REMOVED.cloudfunctions.net/handleUnsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    token: token.value
                }),
            });
            
            if (response.ok) {
                const result = await response.json();
                
                if (result.success) {
                    submitSuccess.value = true;
                    // ANALYTICS
                    const { $analytics } = useNuxtApp();
                    if ($analytics) { // Utilisez $analytics ici
                        logEvent($analytics, 'form_submit', {
                            form_name: 'Unsubscribe',
                            success: true
                        });
                    }
                    resetForm();
                } else {
                    console.error('Form submission failed:', result.errors || result.message);
                }
            } else if (response.status === 400) {
                const result = await response.json();
                resetForm();
                errorMessages.value.push(result.error); // Afficher tout autre message d'erreur
                
            } else {
                console.error('Error submitting form:', await response.text());
                errorMessages.value.push("Une erreur serveur est survenue. Veuillez réessayer plus tard.");
            }
        } catch (error) {
            errorMessages.value.push("Une erreur inattendue est survenue. Veuillez réessayer.");
        } finally {
            isSubmitting.value = false;
        }
    }
};


const generateErrorMessages = () => {
    errorMessages.value = [];
    
    if (errors.value.email) {
        errorMessages.value.push("Veuillez entrer un email valide.");
    }
};

const resetForm = () => {
    email.value = '';
    // Réinitialiser les états de focus et d'erreurs
    Object.keys(isFocused.value).forEach(key => {
        isFocused.value[key] = false;
    });

    Object.keys(errors.value).forEach(key => {
        errors.value[key] = false;
    });
};

</script>

<style>

</style>