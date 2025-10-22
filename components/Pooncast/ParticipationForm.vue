<template>
    <div class="flex flex-col items-center justify-center mx-5 md:mx-20">
      <div v-if="step !== 3" class="mt-[120px] md:mt-[150px] lg:mt-[200px]">
        <h1 class="text-center font-syne">Devenez acteur du Pooncast</h1>
        <p class="font-nunito text-justify mt-5 lg:mt-10 lg:text-lg lg:mx-20 xl:mx-60">
          Au Pooncast, nous croyons que chaque enfant a une question à poser et une histoire à raconter. Votre curiosité est notre moteur, et c’est pourquoi nous vous invitons à participer activement à nos épisodes ! Que vous ayez une question sur les mystères de la nature, l’histoire, ou toute autre thématique, nous sommes là pour y répondre.
        </p>
      </div>
  
      <div class="mt-10 lg:mt-16 w-full flex flex-col items-center justify-center">
        <form @submit.prevent="handleSubmit" class="space-y-5">
  
          <!-- STEP 1 -->
          <div v-if="step == 1" id="step1" class="lg:grid lg:grid-cols-3">
            <div class="bg-secondary px-5 py-5 rounded-xl space-y-5 lg:mx-20 pt-2 lg:col-span-2 shadow-xl">
              <div class="mt-5">
                <h2 class="font-syne text-primary">Comment <span class="text-nowrap">participer ?</span></h2>
                <p class="text-primary font-normal mt-5 mb-10">
                  Inscrivez les informations de votre <span class="text-nowrap">enfant :</span><br />
                  Pour que nous puissions répondre à votre question et peut-être même l’intégrer dans notre podcast, veuillez remplir les champs ci-dessous.
                </p>
              </div>
              
              <!-- PRENOM -->
              <div class="relative w-full">
                <label class="label" :class="isFocused['firstName'] ? '-top-4 left-1 font-bold' : 'top-1 left-2 invisible font-normal'">
                  Prénom de l'enfant
                </label>
                <input v-model="firstName" type="text" placeholder="Prénom de l'enfant (obligatoire)" name="first-name" class="input" size="30" autocomplete="given-name" :class="[isFocused['firstName'] ? 'placeholder:text-opacity-0' : 'placeholder:text-opacity-100', errors['firstName'] ? 'placeholder:text-red-500' : 'placeholder:text-secondary']" @focus="isFocused['firstName'] = true" @blur="handleFirstNameBlur" />
              </div>
  
              <!-- AGE -->
              <div class="relative w-full">
                <label class="label" :class="isFocused['age'] ? '-top-4 left-1 font-bold' : 'top-1 left-2 invisible font-normal'">
                  Âge de l'enfant
                </label>
                <input v-model="age" type="number" inputmode="numeric" placeholder="Âge de l'enfant (obligatoire)" name="age" class="input" size="30" autocomplete="off" :class="[isFocused['age'] ? 'placeholder:text-opacity-0' : 'placeholder:text-opacity-100', errors['age'] ? 'placeholder:text-red-500' : 'placeholder:text-secondary']" @focus="isFocused['age'] = true" @blur="handleAgeBlur" />
              </div>
  
              <!-- VILLE -->
              <div class="relative w-full">
                <label class="label" :class="isFocused['city'] ? '-top-4 left-1 font-bold' : 'top-1 left-2 invisible font-normal'">
                  Ville
                </label>
                <input v-model="city" type="text" placeholder="Ville (facultatif)" name="city" class="input placeholder:text-tertiary" size="30" autocomplete="address-level2" :class="[isFocused['city'] ? 'placeholder:text-opacity-0' : 'placeholder:text-opacity-100']" @focus="isFocused['city'] = true" @blur="handleCityBlur" />
              </div>
  
              <!-- MAIL -->
              <div class="relative w-full">
                <label class="label" :class="[isFocused['email'] ? '-top-4 left-1 font-bold' : 'top-1 left-2 invisible font-normal']">
                  Mail
                </label>
                <input v-model="email" type="text" inputmode="email" placeholder="Mail (obligatoire)" name="email" class="input" size="30" autocomplete="email" :class="[isFocused['email'] ? 'placeholder:text-opacity-0' : 'placeholder:text-opacity-100', errors['email'] ? 'placeholder:text-red-500 text-red-500' : 'placeholder:text-secondary']" @focus="isFocused['email'] = true" @blur="handleEmailBlur" />
              </div>
  
              <div>
                <p class="text-primary">Pourquoi ? Pour que nous puissions vous contacter si la question de votre enfant est <span class="text-nowrap">sélectionnée !</span></p>
              </div>
  
              <!-- MESSAGES ERREUR -->
              <collapse-transition>
                <div v-if="errorMessages.length > 0" class="mt-5 p-4 text-red-500 bg-red-100 border border-red-500 rounded-xl">
                  <ul>
                    <li v-for="(message, index) in errorMessages" :key="index">
                      {{ message }}
                    </li>
                  </ul>
                </div>
              </collapse-transition>
  
              <div class="flex justify-center pb-5 pt-5">
                <button class="btn-white" type="button" aria-label="Continuer pour envoyer ma question" @click="goStep2">
                  Continuer pour envoyer ma question
                </button>
              </div>
            </div>
  
            <div class="hidden lg:block">
              <img src="@/assets/img/pooncast/bg_participationForm.png" width="200px" height="auto" alt="fond étoilé">
            </div>
          </div>
  
          <!-- STEP 2 -->
          <Transition name="fade">
            <div v-if="step == 2" id="step2" class="lg:grid lg:grid-cols-2 lg:gap-10 pt-2">
              <!-- SAISON -->
              <div class="bg-secondary px-5 py-5 rounded-xl space-y-5 lg:space-y-0 shadow-xl">
                <div>
                  <h2 class="font-syne text-primary">Choisissez un thème</h2>
                  <p class="text-primary font-normal mt-5 mb-5">Plongez votre enfant dans l'univers fascinant du Pooncast en choisissant un thème parmi nos prochaines thématiques. Sa curiosité sera notre guide pour un nouvel épisode passionnant !</p>
                </div>
  
                <div class="relative w-full flex flex-col items-start space-y-5">
                  <label class="label relative text-primary font-bold">Thème (facultatif) :</label>
                  <select aria-label="Choisir une saison" v-model="selectedSeason" class="bg-primary border border-primary rounded-md shadow-sm px-5 py-2 font-syne focus:border-primary focus:outline-none w-full">
                    <option v-for="season in pariticipationFormVisibleSeasons" :key="season.id" :value="season.id">
                      #{{ season.id }} . {{ season.title }}
                    </option>
                    <option :value="totalCount+1">Autre</option>
                  </select>
                </div>
              </div>
  
              <div class="bg-secondary px-5 py-5 rounded-xl space-y-5 mt-5 lg:mt-0 lg:row-span-2 lg:row-start-1 shadow-xl">
                <!-- FICHIER -->
                <div class="pt-5">
                  <p class="h2 font-syne text-primary">Option #1</p>
                  <h2 class="font-syne text-primary">Envoyer votre message audio</h2>
                  <p class="text-primary font-normal mt-5 mb-10">Votre enfant peut enregistrer sa question avec sa propre <span class="text-nowrap">voix !</span> C’est simple, rapide, et nous permet d’intégrer directement sa voix dans l’épisode.</p>
                </div>
  
                <div class="relative w-full flex flex-col items-center justify-center border-primary border rounded-xl p-2 cursor-pointer">
                  <label for="fileInput" class="flex items-center justify-center gap-3 cursor-pointer group">
                    <svg class="size-7 group-hover:animate-bounce fill-primary" xmlns="http://www.w3.org/2000/svg" width="36" height="43" viewBox="0 0 36 43" fill="none">
                      <path d="M29.475 15.5H25.5V3C25.5 1.625 24.375 0.5 23 0.5H13C11.625 0.5 10.5 1.625 10.5 3V15.5H6.525C4.3 15.5 3.175 18.2 4.75 19.775L16.225 31.25C17.2 32.225 18.775 32.225 19.75 31.25L31.225 19.775C32.8 18.2 31.7 15.5 29.475 15.5ZM0.5 40.5C0.5 41.875 1.625 43 3 43H33C34.375 43 35.5 41.875 35.5 40.5C35.5 39.125 34.375 38 33 38H3C1.625 38 0.5 39.125 0.5 40.5Z"/>
                    </svg>
                    <span class="font-nunito font-bold text-lg text-center transition-colors duration-150" :class="errors['file'] ? 'text-red-500' : 'text-primary'">Télécharger mon message audio</span>
                  </label>
                  <p class="text-center mt-2 font-nunito text-primary mx-5" @click="triggerFileInput">Ex : “Coucou, moi c’est Lou. Poon, pourquoi les oiseaux ont-ils des ailes ?”</p>
  
                  <input ref="fileInputRef" id="fileInput" type="file" accept="audio/x-m4a,audio/m4a,audio/*" class="hidden" @change="handleFileChange" />
                  <p v-if="isLoadingFile" class="mt-2 text-sm text-poonblack italic font-bold">Chargement en cours...</p>
                  <p v-if="!isLoadingFile && fileName" class="mt-2 text-sm text-poonblack italic font-bold">{{ fileName }}</p>
                  <p v-if="fileNameError" class="text-nunito text-red-500 italic">{{ fileNameError }}</p>
                </div>                      
  
                <!-- DESCRIPTION -->
                <div>
                  <p class="h2 font-syne text-primary">Option #2</p>
                  <h2 class="font-syne text-primary">Écrivez votre question</h2>
                  <p class="text-primary font-normal mt-5 mb-10">Si vous préférez, vous pouvez simplement écrire la question de votre enfant dans le champ ci-dessous, et Thelma se fera un plaisir de la lire.</p>
                </div>              
  
                <div class="relative w-full">
                  <label class="label" :class="isFocused['description'] ? '-top-4 left-1 font-bold' : 'top-1 left-2 invisible font-normal'">
                    Votre question
                  </label>
                  <textarea v-model="description" rows="5" placeholder="Votre question" name="description" autocomplete="off" class="input" size="30" :class="[isFocused['description'] ? 'placeholder:text-opacity-0' : 'placeholder:text-opacity-100', errors['description'] ? 'placeholder:text-red-500' : 'placeholder:text-tertiary']" @focus="isFocused['description'] = true" @blur="isFocused['description'] = description !== '' ? true : false"></textarea>
                </div>
              </div>
  
              <div class="bg-secondary px-5 py-5 rounded-xl space-y-5 mt-5 lg:mt-0 relative shadow-xl">
                <div>
                  <h2 class="font-syne text-primary">Sécurité et petites formalités</h2>
                  <p class="text-primary font-normal mt-5 mb-5">Encore quelques clics pour la sécurité et les formalités, et on embarque pour l'aventure <span class="text-nowrap">Pooncast !</span></p>
                </div>
  
                <!-- CAPTCHA -->
                <div class="mt-5 w-full flex items-center justify-center">
                  <vue-hcaptcha ref="hcaptchaRef" v-model="hcaptchaToken" @verify="onCaptchaVerified" sitekey="4b7e841c-cedc-4b32-96e0-69e06436c76e"></vue-hcaptcha>
                </div>
  
                <!-- TERMS -->
                <div class="mt-5 w-full flex items-center justify-center gap-3">
                  <input type="checkbox" class="size-6" id="terms" v-model="termsAccepted" />
                  <label class="font-nunito text-lg transition-all ease-in duration-150" :class="errors['termsAccepted'] ? 'text-red-500 font-bold' : 'text-primary font-normal'" for="terms">
                    J'accepte les <NuxtLink to="/legal/termes-et-conditions" target="_blank" class="underline">termes et conditions</NuxtLink>
                  </label>
                </div>
  
                <!-- MESSAGES ERREUR -->
                <collapse-transition>
                  <div v-if="errorMessages.length > 0" class="mt-5 p-4 text-red-500 bg-red-100 border border-red-500 rounded-xl">
                    <ul>
                      <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
                    </ul>
                  </div>
                </collapse-transition>
  
                <!-- SUBMIT -->
                <div class="w-full flex items-center justify-center">
                  <button :disabled="isSubmitting" class="btn-white flex items-center gap-2 px-10 group" aria-label="Soumettre le formulaire">
                    <span v-if="!isSubmitting">Envoyez</span>
                    <span v-else>Envoi en cours...</span>
                    <svg v-if="!isSubmitting" class="size-6 group-hover:fill-secondary fill-primary transition-all duration-100" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M35.4701 4.37218C36.3341 1.98218 34.0181 -0.33382 31.6281 0.53218L2.41808 11.0962C0.0200843 11.9642 -0.269916 15.2362 1.93608 16.5142L11.2601 21.9122L19.5861 13.5862C19.9633 13.2219 20.4685 13.0203 20.9929 13.0248C21.5173 13.0294 22.0189 13.2397 22.3897 13.6105C22.7605 13.9814 22.9709 14.483 22.9754 15.0074C22.98 15.5318 22.7784 16.037 22.4141 16.4142L14.0881 24.7402L19.4881 34.0642C20.7641 36.2702 24.0361 35.9782 24.9041 33.5822L35.4701 4.37218Z"/>
                    </svg>
                    <Loading v-else fillColor="fill-poonblack" />
                  </button>
                </div>
  
                <div class="left-0 bottom-2 w-full flex items-center justify-center mt-4" @click="backToStep1">
                  <p class="cursor-pointer font-normal text-sm text-primary">&lt; <span class="underline">Retour</span></p>
                </div>
              </div>
            </div>
          </Transition>
  
          <!-- STEP 3 : CONFIRMATION MESSAGE -->
          <div v-if="submitSuccess" id="step3" class="mt-[100px] flex flex-col items-center justify-center">                    
            <div><img src="@/assets/img/home/headphones.svg" alt="Bienvenue dans l’univers du Pooncast" /></div>
            <h1 class="text-center mt-10 font-syne md:w-[700px] lg:w-[800px]">Merci d'avoir participé au <span class="text-nowrap">Pooncast !</span></h1>
  
            <div class="lg:grid lg:grid-cols-3 mt-10 gap-10">
              <div class="hidden lg:block">
                <img src="@/assets/img/pooncast/bg_participationForm.png" width="200px" alt="fond étoilé">
              </div>
  
              <div class="lg:col-span-2">
                <ul class="mt-10 space-y-5 md:w-[500px]">
                  <li><b>Votre message a bien été envoyé</b>, et nous sommes ravis que vous ayez rejoint notre <span class="text-nowrap">aventure !</span></li>
                  <li><b>Nous avons reçu votre question</b>, et elle est désormais entre de bonnes mains. Si elle est sélectionnée, vous l'entendrez peut-être dans l'un de nos prochains épisodes.</li>
                  <li><b>Un email de confirmation</b> vient de vous être envoyé pour que vous puissiez suivre votre participation.</li>
                  <li>En attendant, n'oubliez pas de continuer à explorer, découvrir, et poser des <span class="text-nowrap">questions !</span></li>
                  <li><b>Soyez les premiers à découvrir nos nouveautés !</b> <NuxtLink :to="{ path: '/inscrivez-vous-au-pooncast', query: { email: email }}" class="underline" title="Inscrivez-vous au Pooncast">Inscrivez-vous par mail</NuxtLink> pour recevoir en exclusivité toutes les nouveautés du Pooncast.</li>
                  <li><b>Merci d'être un petit curieux du Pooncast.</b> À très bientôt pour de nouvelles aventures <span class="text-nowrap">passionnantes !</span></li>
                </ul>
  
                <p class="mt-5 text-secondary font-bold">Poon et toute l'équipe du Pooncast</p>
  
                <div class="mt-10 lg:mt-0 lg:flex lg:justify-end">
                  <NuxtLink to="https://www.instagram.com/lepooncast?igsh=dnJtcTJrZmFjcWQ0" target="_blank" title="Instagram" class="flex flex-col items-center justify-center gap-2">
                    <img src="@/assets/img/footer/instagram.svg" class="size-10" alt="Suivez-nous sur Instagram" />
                    <p class="text-center font-bold">Suivez-nous pour ne<br />rien manquer !</p>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
  
          <div v-if="!submitSuccess" @click="isOpen = !isOpen" class="cursor-pointer">
            <div class="flex items-center justify-center gap-5 mt-10">
              <p class="text-secondary font-syne text-lg font-bold underline underline-offset-4">Pourquoi participer ?</p>
              <svg :class="{ rotated: isOpen }" class="size-6 transition-transform duration-200 ease-in" xmlns="http://www.w3.org/2000/svg" width="24" height="42" viewBox="0 0 24 42" fill="none">
                <path d="M16.4669 21.1306L1.01979 5.93775C0.711067 5.66124 0.461888 5.32662 0.286999 4.95371C0.112111 4.58079 0.0150693 4.17716 0.00161851 3.7667C-0.0118323 3.35624 0.0585812 2.94729 0.208691 2.56407C0.358801 2.18085 0.585555 1.83115 0.875532 1.53566C1.16551 1.24017 1.51281 1.00491 1.89689 0.843796C2.28096 0.682678 2.69399 0.598987 3.11154 0.597671C3.52909 0.596355 3.94266 0.677444 4.32777 0.836139C4.71289 0.994835 5.06171 1.22791 5.35361 1.52156L5.42964 1.59635L23.0859 18.9578C23.6712 19.5336 24 20.3144 24 21.1285C24 21.9427 23.6712 22.7235 23.0859 23.2992L5.43387 40.6607C5.14903 40.9506 4.8089 41.1826 4.43292 41.3433C4.05694 41.504 3.65246 41.5903 3.24257 41.5972C2.83269 41.6041 2.42543 41.5316 2.04404 41.3838C1.66266 41.2359 1.31461 41.0156 1.01979 40.7355C0.724965 40.4553 0.489131 40.1208 0.325752 39.751C0.162373 39.3812 0.074649 38.9834 0.0675888 38.5802C0.0605285 38.1771 0.13427 37.7765 0.284604 37.4014C0.434937 37.0263 0.658918 36.684 0.943758 36.3941L1.01979 36.3193L16.4669 21.1306Z" fill="#FF774C"/>
              </svg>
            </div>
  
            <collapse-transition>
              <div v-if="isOpen" class="lg:mx-40 xl:mx-60 md:mx-20">
                <ul class="mt-5 space-y-5">
                  <li>
                    <p class="font-bold">Faites entendre votre voix :</p>
                    <p>Le Pooncast, c’est un espace où chaque enfant peut s’exprimer et partager ses idées. Votre voix ou celle de votre enfant pourrait bien être la prochaine à résonner dans nos épisodes !</p>
                  </li>
                  <li>
                    <p class="font-bold">Apprenez en vous amusant :</p>
                    <p>Chaque question est une porte vers une nouvelle découverte. En participant, votre enfant explore le monde, développe sa curiosité, et apprend de manière ludique.</p>
                  </li>
                  <li>
                    <p class="font-bold">Faites partie de notre communauté :</p>
                    <p>Rejoignez une communauté de petits curieux ! En posant votre question, vous faites un pas de plus dans l’aventure du Pooncast.</p>
                  </li>
                  <li>
                    <p class="font-bold">Instructions claires et simples :</p>
                    <ul class="list-decimal list-inside">
                      <li>Remplissez les informations de votre enfant.</li>
                      <li>Téléchargez un message audio ou écrivez une question.</li>
                      <li>Cliquez sur "Envoyer" et laissez la magie opérer !</li>
                    </ul>
                  </li>
                  <li>
                    <p><span class="font-bold">Note: </span>Toutes les participations sont anonymes à l’exception du prénom de l’enfant. Vos informations personnelles sont protégées et ne seront pas partagées.</p>
                  </li>
                  <li>
                    <p class="font-bold">Questions ?</p>
                    <p>Si vous avez des questions concernant la participation au Pooncast, n’hésitez pas à nous contacter à poon@lepooncast.com.<br/>
                    Nous avons hâte de découvrir les questions passionnantes de vos enfants et de les inclure dans nos prochains <span class="text-nowrap">épisodes !</span><br/>
                    Rejoignez l’aventure Pooncast dès <span class="text-nowrap">maintenant !</span></p>
                  </li>
                </ul>
              </div>
            </collapse-transition>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue';
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
  import { usepooncastsSeasonStore } from '@/stores/Pooncast/PooncastSeason';
  import { logEvent } from 'firebase/analytics';
  
  const seasonStore = usepooncastsSeasonStore();
  const { seasons, totalCount, pariticipationFormVisibleSeasons } = storeToRefs(seasonStore);
  seasonStore.fetchSeasons();
  
  const runtimeConfig = useRuntimeConfig();
  const functionsBaseUrl = computed(() => {
    const base = runtimeConfig.public.functionsBaseUrl || '';
    return base.endsWith('/') ? base.slice(0, -1) : base;
  });
  
  // STEPS DU FORM
  const step = ref(1);
  
  // POURQUOI PARTICIPER OPEN/CLOSE
  const isOpen = ref(false);
  
  // FORMULAIRE
  const firstName = ref('');
  const age = ref('');
  const city = ref('');
  const email = ref('');
  const description = ref('');
  
  const fileInputRef = ref(null);
  const isLoadingFile = ref(false);
  const fileName = ref('');
  const file = ref(null);
  const fileBase64 = ref(null);
  const fileNameError = ref('');
  
  const termsAccepted = ref(false);
  const hcaptchaToken = ref('');
  const isSubmitting = ref(false);
  const submitSuccess = ref(false);
  const hcaptchaRef = ref(null);
  const selectedSeason = ref('');
  
  watch(pariticipationFormVisibleSeasons, (newSeasons) => {
    if (newSeasons.length > 0 && !selectedSeason.value) {
      selectedSeason.value = newSeasons[0].id; // Définit l'ID de la première saison comme valeur par défaut
    }
  });
  
  const isFocused = ref({
    firstName: false,
    age: false,
    city: false,
    email: false,
    description: false
  });
  
  const errors = ref({
    firstName: false,
    age: false,
    email: false,
    file: false,
    termsAccepted: false,
    hcaptcha: true
  });
  
  const errorMessages = ref([]);
  
  // FILE CONTROLS
  const validAudioTypes = [
    'audio/mpeg',  'audio/wav',   'audio/ogg',   'audio/mp4',
    'audio/aac',   'audio/flac',  'audio/x-aiff', 'audio/x-m4a',
    'audio/x-ms-wma', 'audio/webm', 'audio/m4a'
  ];
  
  const triggerFileInput = () => {
    if (fileInputRef.value) {
      fileInputRef.value.click();
    }
  };
  
  const handleFileChange = (event) => {
    file.value = event.target.files[0];
  
    if (!file.value) {
      console.error("Aucun fichier sélectionné");
      return;
    }
  
    if (file.value) {
      isLoadingFile.value = true;
      fileName.value = '';
      setTimeout(() => {
        fileName.value = file.value.name;
  
        if (!validAudioTypes.includes(file.value.type)) {
          errors.value.file = true;
          fileNameError.value = 'Merci de sélectionner un fichier audio';
          fileBase64.value = null;
        } else if (file.value.size > 1 * 1024 * 1024) {
          errors.value.file = true;
          fileNameError.value = 'Votre fichier ne doit pas dépasser 1MB';
          fileBase64.value = null;
        } else {
          errors.value.file = false;
          fileNameError.value = '';
          convertFileToBase64(file.value);
        }
  
        isLoadingFile.value = false;
      }, 1000);
    }
  };
  
  const validateFile = () => {
    if(fileName.value) {
      if (!validAudioTypes.includes(file.value.type)) {
        errors.value.file = true;
        fileNameError.value = 'Merci de sélectionner un fichier audio';
      } else if (file.value.size > 1 * 1024 * 1024) {
        errors.value.file = true;
        fileNameError.value = 'Votre fichier ne doit pas dépasser 1MB';
      } else {
        errors.value.file = false;
      }
    }
  };
  
  const convertFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileBase64.value = reader.result.split(',')[1];
    };
    reader.onerror = (error) => {
      console.error('Error converting file to base64:', error);
    };
  };
  
  // FIRSTNAME CONTROLS
  const handleFirstNameBlur = () => {
    isFocused.value.firstName = firstName.value !== '';
    validateFirstName();
  };
  
  const validateFirstName = () => {
    if (firstName.value !== '') {
      errors.value.firstName = false;
    } else {
      errors.value.firstName = true;
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
  
  // CITY CONTROLS
  const handleCityBlur = () => {
    isFocused.value.city = city.value !== '';
  };
  
  // AGE CONTROLS
  const handleAgeBlur = () => {
    isFocused.value.age = age.value !== '';
    validateAge();    
  };
  
  const validateAge = () => {
    if (age.value !== '') {
      errors.value.age = false;
    } else {
      errors.value.age = true;
    }
  };
  
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
  
  // CAPTCHA CONTROLS
  const onCaptchaVerified = (token) => {
    hcaptchaToken.value = token;
    errors.value.hcaptcha = false;
  };
  
  const backToStep1 = () => {
    step.value = 1;
    nextTick(() => {
      const step1Element = document.getElementById('step1');
      if (step1Element) {
        step1Element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log("Step1 element not found");
      }
    });
  }
  
  const goStep2 = () => {
    validateFirstName();
    validateAge();
    validateEmail();
    generateErrorMessages();
  
    const isStep1Valid = !errors.value.firstName && !errors.value.age && !errors.value.email;
  
    if (isStep1Valid) {
      const { $analytics } = useNuxtApp();
      if ($analytics) {
        logEvent($analytics, 'form_submit', {
          form_name: 'Participation Form',
          step: '1=>2',
          success: true
        });
      }
  
      step.value = 2;
      nextTick(() => {
        const step2Element = document.getElementById('step2');
        if (step2Element) {
          step2Element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log("Step2 element not found");
        }
      });
    } else {
      //console.log("Validation failed");
      const { $analytics } = useNuxtApp();
      if ($analytics) {
        logEvent($analytics, 'form_submit', {
          form_name: 'Participation Form',
          step: '1=>2',
          success: false
        });
      }
    }
  }
  
  // SUBMIT
  const handleSubmit = async () => {
    if (step.value !== 2) {
      return;
    }
  
    validateFirstName();
    validateAge();
    validateEmail();
    validateFile();
    validateTerms();
    generateErrorMessages();
  
    if (Object.values(errors.value).every(value => value === false)) {
      isSubmitting.value = true;
      try {
        if (!functionsBaseUrl.value) {
          throw new Error("NUXT_FUNCTIONS_BASE_URL non configurée.");
        }
        const response = await fetch(`${functionsBaseUrl.value}/handleFormSubmission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName.value,
            age: age.value,
            city: city.value,
            email: email.value,
            description: description.value,
            termsAccepted: termsAccepted.value,
            hcaptchaToken: hcaptchaToken.value,
            selectedSeason: selectedSeason.value,
            file: fileBase64.value,
            fileName: fileName.value
          }),
        });
        
        if (response.ok) {
          const result = await response.json();
          
          if (result.success) {
            submitSuccess.value = true;
            step.value = 3;
            const { $analytics } = useNuxtApp();
            if ($analytics) {
              logEvent($analytics, 'form_submit', {
                form_name: 'Participation Form',
                step: '2=>3',
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
          const { $analytics } = useNuxtApp();
          if ($analytics) {
            logEvent($analytics, 'form_submit', {
              form_name: 'Participation Form',
              step: '2=>3',
              success: false
            });
          }
  
          if (result.error.includes("All fields are required.")) {
            errorMessages.value.push("Veuillez saisir tous les champs obligatoires.");
          } else if (result.error.includes("Invalid captcha. Please try again.")) {
            errorMessages.value.push("Captcha invalide. Veuillez réessayer.");
          } else {
            errorMessages.value.push(result.error);
          }
        } else {
          const { $analytics } = useNuxtApp();
          if ($analytics) {
            logEvent($analytics, 'form_submit', {
              form_name: 'Participation Form',
              step: '2=>3',
              success: false
            });
          }
  
          console.error('Error submitting form:', await response.text());
          errorMessages.value.push("Une erreur serveur est survenue. Veuillez réessayer plus tard.");
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes("NUXT_FUNCTIONS_BASE_URL")) {
          errorMessages.value.push("Configuration serveur manquante. Veuillez vérifier la variable NUXT_FUNCTIONS_BASE_URL.");
        } else {
          errorMessages.value.push("Une erreur inattendue est survenue. Veuillez réessayer.");
        }
        const { $analytics } = useNuxtApp();
        if ($analytics) {
          logEvent($analytics, 'form_submit', {
            form_name: 'Participation Form',
            step: '2=>3',
            success: false
          });
        }
      } finally {
        isSubmitting.value = false;
      }
    }
  };
  
  const generateErrorMessages = () => {
    errorMessages.value = [];
    
    if (step.value == 1) {
      if (errors.value.firstName) {
        errorMessages.value.push("Veuillez saisir un prénom.");
      }
  
      if (errors.value.age) {
        errorMessages.value.push("Veuillez saisir un âge.");
      }
  
      if (errors.value.email) {
        errorMessages.value.push("Veuillez saisir un email valide.");
      }
    }
    else {
      if (errors.value.firstName) {
        errorMessages.value.push("Veuillez saisir un prénom.");
      }
  
      if (errors.value.age) {
        errorMessages.value.push("Veuillez saisir un âge.");
      }
  
      if (errors.value.email) {
        errorMessages.value.push("Veuillez saisir un email valide.");
      }
  
      if (!description.value && !fileName.value) {
        errorMessages.value.push("Veuillez fournir soit un fichier audio, soit une question.");
      }
  
      if (errors.value.termsAccepted) {
        errorMessages.value.push("Vous devez accepter les termes et conditions.");
      }
      if (errors.value.hcaptcha) {
        errorMessages.value.push("Veuillez compléter le captcha.");
      }
    }
  };
  
  const resetForm = () => {
    firstName.value = '';
    age.value = '';
    city.value = '';
    email.value = '';
    description.value = '';
    fileName.value = '';
    file.value = null;
    fileBase64.value = null;
    termsAccepted.value = false;
    hcaptchaToken.value = '';
  
    Object.keys(isFocused.value).forEach(key => {
      isFocused.value[key] = false;
    });
  
    Object.keys(errors.value).forEach(key => {
      errors.value[key] = false;
    });
  
    resetCaptchaForm();
  };
  
  const resetCaptchaForm = () => {
    if (hcaptchaRef.value) {
      hcaptchaRef.value.reset();
    }
  }
  
  watch(submitSuccess, (newValue) => {
    if (newValue) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  </script>
  
  <style scoped>
  .rotated {
    @apply origin-center rotate-90;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  
