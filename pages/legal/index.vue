<template>
  <div class="flex flex-col mt-[120px] md:mt-[150px] mx-5 space-y-10 mb-20 lg:mx-20">
    <h1 class="text-center">Mentions Légales</h1>

    <h2>Identité du Responsable du Site</h2>
    <p>
      Nom de l'entreprise : Madrea<br>
      Adresse : Traverse des Migauds 13011 Marseille<br>
      E-mail : anaelle@lagencedepapaetmaman.com<br>
      Téléphone : +33651500309<br>
      Numéro d'inscription au RCS : 899 609 010 R.C.S. Marseille
    </p>

    <h2>Hébergeur du Site</h2>
    <p>
      Nom : Firebase, une infrastructure de Google Cloud Platform <br/>
      Adresse : 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA<br/>  
      Site Web : https://firebase.google.com  <br/>
      Numéro de téléphone : +1 650-253-0000
    </p>

    <h2>Propriété Intellectuelle</h2>
    <p>
      Le contenu du site <b>www.lepooncast.com</b> est protégé par les lois en vigueur sur la propriété intellectuelle et le droit d'auteur. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
    </p>
    <p>
      En soumettant un fichier audio via notre formulaire de participation, vous accordez à Madrea le droit non exclusif, transférable, sous-licenciable, sans redevance et mondial de reproduire, distribuer, préparer des œuvres dérivées, afficher et exécuter ce fichier audio dans le cadre de la création, la publication, et la promotion du Pooncast.
    </p>

    <h2>Conditions Générales d'Utilisation</h2>
    <p>
      En utilisant ce site, l'utilisateur accepte pleinement et entièrement les conditions générales d'utilisation précisées dans ces mentions légales. Ce site est accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par Madrea, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.
    </p>

    <h2>Protection des Données Personnelles</h2>
    <p>
      Les informations collectées sur ce site via le formulaire de participation au Pooncast et le formulaire d'inscription à la newsletter sont traitées conformément à notre <NuxtLink to="/legal/politique-confidentialite" target="_blank" class="lnk underline">politique de confidentialité</NuxtLink>. Les utilisateurs disposent d'un droit d'accès, de rectification, d'effacement et de portabilité de leurs données personnelles. Ils peuvent également s'opposer au traitement de leurs données ou en demander la limitation. Pour exercer ces droits, les utilisateurs peuvent nous contacter à l'adresse suivante : hello@lagencedepapaetmaman.com.
    </p>

    <h2>Contact</h2>
    <p>
      Pour toute question relative aux mentions légales du site, vous pouvez nous contacter à l'adresse suivante : hello@lagencedepapaetmaman.com.
    </p>

    <p>
      Les informations collectées via notre formulaire de participation au Pooncast et d'inscription à la newsletter sont traitées conformément à nos <NuxtLink to="/legal/termes-et-conditions" target="_blank" class="lnk underline">termes et conditions</NuxtLink>.
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
      {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://lepooncast.com/legal/'
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
            page_title: 'Mentions légales',
            page_location: window.location.url,
            page_path: window.location.pathname
        });
    }
});
</script>
