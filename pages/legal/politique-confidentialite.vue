<template>
    <div class="flex flex-col mt-[120px] md:mt-[150px] mx-10 space-y-10 mb-20 lg:mx-20">
      <h1 class="text-center">Politique de Confidentialité</h1>
  
      <h2>Types de Données Collectées</h2>
      <p> Nous collectons les informations suivantes :</p>
        <ul class="list-disc list-inside">
          <li>Informations personnelles : prénom, âge, ville, adresse e-mail, thème, message audio, description, etc.</li>
          <li>Données techniques : adresse IP, type de navigateur, etc.</li>
        </ul>
  
      <h2>Méthodes de Collecte</h2>
      <p>Les données sont collectées par les moyens suivants :</p>
        <ul class="list-disc list-inside">
          <li>Formulaires de participation au Pooncast</li>
          <li>Formulaire d'inscription à la newsletter</li>
          <li>Cookies et technologies similaires</li>
        </ul>
  
      <h2>Utilisation des Données</h2>
      <p>Les données collectées sont utilisées pour :</p>
        <ul class="list-disc list-inside">
          <li>Communiquer avec vous</li>
          <li>Créer de nouveaux podcasts répondant à vos attentes</li>
          <li>Envoyer des informations et des offres promotionnelles</li>
          <li>Utiliser les fichiers audio soumis pour créer, publier et distribuer du contenu lié au Pooncast</li>
          <li>Envoyer des newsletters et des communications marketing</li>
        </ul>
  
      <h2>Partage des Données</h2>
      <p>Nous pouvons partager vos données avec :</p>
        <ul class="list-disc list-inside">
          <li>Partenaires commerciaux</li>
          <li>Prestataires de services</li>
          <li>Autorités légales si nécessaire</li>
          <li>Plateformes de diffusion pour la publication de podcasts contenant vos fichiers audio soumis</li>
          <li>Prestataires de services d'email marketing pour l'envoi de newsletters</li>
        </ul>
  
      <h2>Protection des Données</h2>
      <p>Nous mettons en œuvre diverses mesures de sécurité pour protéger vos données :</p>
        <ul class="list-disc list-inside">
          <li>Cryptage des données</li>
          <li>Accès restreint aux données</li>
          <li>Audits réguliers de sécurité</li>
        </ul>
  
      <h2>Droits des Utilisateurs</h2>
      <p>Vous avez le droit de :</p>
        <ul class="list-disc list-inside">
          <li>Accéder à vos données</li>
          <li>Rectifier vos données</li>
          <li>Supprimer vos données</li>
          <li>Vous opposer au traitement de vos données</li>
          <li>Retirer votre consentement à l'utilisation de vos fichiers audio (sous certaines conditions)</li>
          <li>Se désinscrire de la newsletter à tout moment</li>
        </ul>
        <p>Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : hello@lagencedepapaetmaman.com</p>
  
      <h2>Contact</h2>
      <p>
        Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à : hello@lagencedepapaetmaman.com
      </p>
    </div>
  </template>
  

<script setup>
useHead({
    title: 'Le PoonCast - Épisodes de podcasts éducatifs pour enfants',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.'
        },
        { hid: 'og:title', property: 'og:title', content: 'Le PoonCast - Épisodes de podcasts éducatifs pour enfants' },
        { hid: 'og:description', property: 'og:description', content: 'Explorez tous les épisodes du PoonCast, un podcast éducatif pour enfants qui répond aux grandes questions de la vie. Découvrez des histoires captivantes et des leçons amusantes conçues pour éveiller la curiosité des jeunes esprits.' },
        { hid: 'og:image', property: 'og:image', content: 'https://lepooncast.com/logo_og.jpeg' },
        { hid: 'og:url', property: 'og:url', content: 'https://lepooncast.com/' }
    ]
})

// ANALYTICS
import { logEvent } from 'firebase/analytics';
onMounted(() => {
    const { $analytics } = useNuxtApp();

    if ($analytics) { // Utilisez $analytics ici
        logEvent($analytics, 'page_view', {
            page_title: 'Politiques Confidentialités',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});
</script>
