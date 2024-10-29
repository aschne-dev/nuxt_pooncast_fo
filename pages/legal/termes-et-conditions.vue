<template>
    <div class="flex flex-col mt-[120px] md:mt-[150px] mx-10 space-y-10 mb-20 lg:mx-20">
      <h1 class="text-center">Termes et Conditions</h1>
      <p>En utilisant ce formulaire de participation au Pooncast et le formulaire d'inscription à la newsletter, vous acceptez les termes et conditions suivants :</p>
  
      <h2>1. Introduction</h2>
      <p>Ces termes et conditions décrivent comment nous collectons, utilisons et protégeons les informations personnelles que vous fournissez via notre formulaire de participation au Pooncast et d'inscription à la newsletter, ainsi que les droits que vous nous cédez sur les fichiers audio soumis.</p>
  
      <h2>2. Collecte de Données</h2>
      <p>Nous collectons les informations personnelles suivantes : prénom, âge, ville, adresse e-mail, thème, message audio, description. Ces données sont collectées lorsque vous remplissez et soumettez notre formulaire de participation au Pooncast ou vous inscrivez à notre newsletter.</p>
  
      <h2>3. Utilisation des Données et des Fichiers Audio</h2>
      <p>Les informations que vous fournissez seront utilisées pour répondre à vos demandes de participation au Pooncast, pour vous envoyer des newsletters et pour communiquer avec vous si besoin. Les fichiers audio soumis peuvent être utilisés, modifiés, reproduits, publiés et distribués dans le cadre de la création de podcasts et de tout autre contenu associé au Pooncast.</p>
  
      <h2>4. Droits d'Utilisation et de Propriété des Fichiers Audio</h2>
      <p>En soumettant un fichier audio via notre formulaire de participation, vous nous accordez une licence mondiale, non exclusive, transférable, sous-licenciable, gratuite et perpétuelle pour utiliser, reproduire, modifier, adapter, publier, distribuer et afficher le contenu audio soumis dans le cadre de la création de podcasts ou de tout autre contenu associé au Pooncast. Vous garantissez que vous êtes le créateur original du contenu soumis et que vous avez le droit de nous accorder ces droits sans enfreindre les droits de tiers.</p>
  
      <h2>5. Partage des Données</h2>
      <p>Nous ne partageons pas vos informations personnelles avec des tiers, sauf si cela est nécessaire pour fournir les services que vous avez demandés ou si la loi l'exige.</p>
  
      <h2>6. Sécurité des Données</h2>
      <p>Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, altération, divulgation ou destruction. Cependant, nous ne pouvons garantir la sécurité absolue des données transmises via Internet.</p>
  
      <h2>7. Droits des Utilisateurs</h2>
      <p>Vous avez le droit d'accéder, de corriger, de supprimer ou de limiter le traitement de vos données personnelles. Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail suivante : hello@lagencedepapaetmaman.com.</p>
  
      <h2>8. Cookies et Technologies de Suivi</h2>
      <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site web. Vous pouvez gérer vos préférences en matière de cookies dans les paramètres de votre navigateur.</p>
  
      <h2>9. Modifications des Termes et Conditions</h2>
      <p>Nous pouvons mettre à jour ces termes et conditions de temps en temps. Nous vous informerons de toute modification en publiant les nouveaux termes sur notre site web.</p>
  
      <h2>10. Coordonnées de Contact</h2>
      <p>Si vous avez des questions ou des préoccupations concernant ces termes et conditions ou le traitement de vos données personnelles, veuillez nous contacter à l'adresse e-mail suivante : hello@lagencedepapaetmaman.com.</p>
  
      <p>Pour plus d'informations sur la manière dont nous gérons vos données personnelles, veuillez consulter nos <NuxtLink to="/legal/" target="_blank" class="lnk underline">mentions légales</NuxtLink> et notre <NuxtLink to="/legal/politique-confidentialite" target="_blank" class="lnk underline">politique de confidentialité</NuxtLink>.</p>
  
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
            page_title: 'Termes et Conditions',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});
</script>