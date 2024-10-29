<template>
    <div class="mt-[100px] lg:mt-[200px] mx-5 md:mx-20">
        
        <div v-if="!submitSuccess" class="flex flex-col items-center">
            <div><img src="@/assets/img/home/headphones.svg" alt="Rejoignez la Poon Family" /></div>
            <h1 class="text-center mt-10 font-syne">Rejoignez<br/>la Poon <span class="text-nowrap">Family !</span></h1>
            

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:mt-10">

                <div class="shadow-2xl py-5 px-5 rounded-xl">
                    <div class="text-primary space-y-5 pt-2 h-full flex flex-col items-center justify-center">
                        <div class="flex flex-col">
                            <p class="mt-5 font-nunito text-justify md:text-center xl:text-lg text-poonblack sm:px-10 lg:px-32 xl:px-5">
                                Soyez les premiers à découvrir nos nouveautés ! Inscrivez-vous par mail pour recevoir en exclusivité toutes les nouveautés du <span class="text-nowrap">Pooncast.</span>
                            </p>
                        </div>
                        <form @submit.prevent="handleSubmit" class="flex flex-col items-center justify-center">
                        <!-- EMAIL -->
                        <div class="relative overflow-hidden border border-poonblack rounded-full flex justify-between items-center mt-5 mx-2">
                            <div class="ms-2">
                                <input type="text"
                                inputmode="email"
                                placeholder="Mail" 
                                v-model="email"
                                name="email"
                                class="input placeholder:text-secondary font-syne bg-primary"
                                size="30"
                                tabindex="0"
                                autocomplete="email"
                                aria-label="Email pour inscription à la newsletter du Pooncast"
                                />
                            </div>                  
                        </div>

                        <!-- CAPTCHA-->
                        <div class="mt-5 flex items-center justify-center">
                            <vue-hcaptcha ref="hcaptchaRef" v-model="hcaptchaToken" @verify="onCaptchaVerified" sitekey="4b7e841c-cedc-4b32-96e0-69e06436c76e"></vue-hcaptcha>
                        </div>

                        <!-- TERMS-->
                        <div class="mt-5 mx-2 flex items-center justify-center gap-3">
                            <input
                            type="checkbox"
                            class="size-6"
                            id="terms"
                            v-model="termsAccepted"
                            />
                            <label class="font-nunito text-lg transition-all ease-in duration-150"
                            :class="errors['termsAccepted'] ? 'text-red-500 font-bold' : 'text-poonblack font-normal'" for="terms">J'accepte les <NuxtLink to="/legal/termes-et-conditions" target="_blank" class="underline">termes et conditions</NuxtLink></label>

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
                            <button :disabled="isSubmitting" class="btn-secondary-white flex items-center gap-2 px-10 group" aria-label="Soumettre le formulaire">
                                <span v-if="!isSubmitting">M'inscrire</span>
                                <span v-else>Inscription...</span>
                                <svg v-if="!isSubmitting" class="size-6 group-hover:fill-black fill-primary transition-all duration-100" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path d="M35.4701 4.37218C36.3341 1.98218 34.0181 -0.33382 31.6281 0.53218L2.41808 11.0962C0.0200843 11.9642 -0.269916 15.2362 1.93608 16.5142L11.2601 21.9122L19.5861 13.5862C19.9633 13.2219 20.4685 13.0203 20.9929 13.0248C21.5173 13.0294 22.0189 13.2397 22.3897 13.6105C22.7605 13.9814 22.9709 14.483 22.9754 15.0074C22.98 15.5318 22.7784 16.037 22.4141 16.4142L14.0881 24.7402L19.4881 34.0642C20.7641 36.2702 24.0361 35.9782 24.9041 33.5822L35.4701 4.37218Z"/>
                                </svg>
                                <Loading v-else fillColor="fill-poonblack" />
                            </button>
                        </div>

                        </form>
                    </div>
                </div>

                <div class="p-0.5 rounded-xl bg-gradient-to-b from-transparent to-poonblack shadow-xl">
                    <div class="h-full w-full p-8 relative bg-primary rounded-xl border-poonblack space-y-5">
                        
                        <h2 class="mt-5 text-center font-syne">Pourquoi  <span class="text-nowrap">s'inscrire ?</span></h2>
                        <div class="pt-5">
                            <p>Inscrivez votre adresse email pour ne rien manquer ! Très bientôt, notre plateforme vous offrira :</p>
                            <ul class="list-inside mt-5 space-y-5">
                                <li><span class="text-poonblack font-bold text-nowrap">Accès anticipé :</span><br/> Recevez les nouveaux épisodes du Pooncast avant tout le monde.</li>
                                <li><span class="text-poonblack font-bold text-nowrap">Contenu exclusif :</span><br/>Découvrez des bonus et des surprises réservés uniquement à nos abonnés.</li>
                                <li><span class="text-poonblack font-bold text-nowrap">Idées et astuces :</span><br/>Recevez des suggestions d'activités ludiques et éducatives en lien avec nos histoires.</li>
                                <li><span class="text-poonblack font-bold text-nowrap">Participation interactive :</span><br/>Offrez à vos enfants l'opportunité de poser leurs questions et d'entendre leur voix dans nos futurs épisodes.</li>
                                <li><span class="text-poonblack font-bold text-nowrap">Restez à l'affût :</span><br/> Soyez informé de toutes nos nouveautés.</li>
                            </ul>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

        <!-- CONFIRMATION MESSAGE -->
        <div v-else class="flex flex-col items-center lg:mx-32 xl:mx-52">
            <div><img src="@/assets/img/home/headphones.svg" alt="Bienvenue dans l’univers du Pooncast" /></div>
            <h1 class="text-center mt-10 font-syne">Bienvenue dans l’univers du Pooncast</h1>

            <div class="font-nunito mt-10 text-justify text-lg">
                <p>Vous êtes maintenant officiellement un membre privilégié de notre communauté !</p>
                <p class="mt-5">Nous sommes ravis de vous compter parmi nous pour cette aventure magique. En tant que premier à recevoir nos nouveautés, vous serez aux premières loges pour découvrir les derniers épisodes du Pooncast, des histoires captivantes, et des exclusivités spécialement conçues pour éveiller la curiosité de vos enfants.</p>
                <p class="mt-5">Votre inscription est confirmée !</p>
                <p class="mt-5">Tenez-vous prêt à explorer, à rêver, et à partager des moments merveilleux avec vos enfants.</p>
                <p class="mt-5 font-bold">Que faire maintenant ?</p>
                <ul class="list-disc list-inside mt-5 space-y-3">
                    <li>Explorez nos derniers épisodes du Pooncast et plongez dans des récits enchantés qui captiveront l'imagination de vos petits.</li>
                    <li>Visitez notre blog pour découvrir des articles inspirants, des astuces pour parents, et des activités éducatives à réaliser en famille.</li>
                    <li>Suivez-nous sur <a href="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank" class="underline"
                                title="Instagram"
                                rel="noopener noreferrer"
                                @click="trackClick('Instagram')">Instagram</a> pour encore plus de contenu amusant et interactif.</li>
                    <li><NuxtLink to="/participez-au-pooncast" class="underline">Participez au Pooncast !</NuxtLink> Posez vos questions, envoyez vos idées, et peut-être que la prochaine histoire sera inspirée par vos enfants !</li>
                </ul>
                <p class="mt-5">Merci de faire partie de notre aventure. Nous avons hâte de partager avec vous tous les merveilleux secrets que le Pooncast a à offrir !</p>
                <p class="mt-5 text-secondary">Poon et toute l'équipe du Pooncast</p>

                <div class="mt-10 lg:mt-0 lg:flex lg:justify-end">
                    <NuxtLink to="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank" title="Instagram"
                    class="flex flex-col items-center justify-center gap-2">
                    <img src="@/assets/img/footer/instagram.svg" class="size-10" alt="Suivez-nous sur Instagram" />
                    <p class="text-center font-bold">Suivez-nous pour ne<br/>rien manquer !</p>
                    </NuxtLink>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

const termsAccepted = ref(false);
const hcaptchaToken = ref('');
const hcaptchaRef = ref(null);
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const route = useRoute();
const email = ref(route.query.email || ''); // Récupération de l'email depuis les query params

const isFocused = ref({
    email: false,
});
if (email.value !== '') {
    isFocused.value.email = true;
}

const errors = ref({
    email: false,
    termsAccepted: false,
    hcaptcha: true
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

// TERMS CONTROL
const validateTerms = () => {
    if (termsAccepted.value) { 
        errors.value.termsAccepted = false;
    } else {
        errors.value.termsAccepted = true;
    }
};

// CAPTCHA CONTROLS
const onCaptchaVerified = (token) => {
    hcaptchaToken.value = token;
    errors.value.hcaptcha = false;
};

// SUBMIT
const handleSubmit = async () => {
    validateEmail();
    validateTerms();

    generateErrorMessages(); // Générer les messages d'erreur avant de soumettre

    if (Object.values(errors.value).every(value => value === false)) {
        isSubmitting.value = true;
        try {
            const response = await fetch('https://europe-west1-REMOVED.cloudfunctions.net/handleNewsletterSignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    termsAccepted: termsAccepted.value,
                    hcaptchaToken: hcaptchaToken.value,
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
                            form_name: 'Newsletter',
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
                // Analyser les messages d'erreur retournés par le backend
                if (result.error.includes("This email is already subscribed.")) {
                    errorMessages.value.push("Vous êtes déjà membre de notre communauté");
                } else if (result.error.includes("Invalid captcha. Please try again.")) {
                    errorMessages.value.push("Captcha invalide. Veuillez réessayer.");
                } else {
                    errorMessages.value.push(result.error); // Afficher tout autre message d'erreur
                }
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
    if (errors.value.termsAccepted) {
        errorMessages.value.push("Vous devez accepter les termes et conditions.");
    }
    if (errors.value.hcaptcha) {
        errorMessages.value.push("Veuillez compléter le captcha.");
    }
};

const resetForm = () => {
    email.value = '';
    termsAccepted.value = false;
    hcaptchaToken.value = '';

    // Réinitialiser les états de focus et d'erreurs
    Object.keys(isFocused.value).forEach(key => {
        isFocused.value[key] = false;
    });

    Object.keys(errors.value).forEach(key => {
        errors.value[key] = false;
    });

    resetCaptchaForm();
};

const resetCaptchaForm =  () => {
    if (hcaptchaRef.value) {
        //console.log('captcha OK');
        hcaptchaRef.value.reset();
    }
}

// Scroll to top when submitSuccess changes to true
watch(submitSuccess, (newValue) => {
    if (newValue) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

const { $analytics } = useNuxtApp();

const trackClick = (platform) => {
  if ($analytics) {
    logEvent($analytics, 'select_content', {
      content_type: 'external_link',
      item_id: platform
    });
  }
};
</script>

<style>

</style>