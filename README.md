# Le PoonCast – Front Office

Interface Nuxt 3 dédiée à la mise en ligne des contenus du PoonCast, un podcast éducatif qui répond aux grandes questions des enfants. Ce dépôt correspond au front office public, connecté à Firebase (Firestore, Cloud Functions et Analytics) ainsi qu’à un back office privé.

## Aperçu rapide

- Site de production : <https://lepooncast.com>
- Contenus dynamiques (épisodes, saisons, blog, FAQ, recommandations) chargés depuis Firestore
- Formulaires publics (participation, newsletter, désinscription) validés par hCaptcha et relayés par Cloud Functions
- Suivi analytique et conformité RGPD grâce au module `@dargmuesli/nuxt-cookie-control`

## Fonctionnalités principales

- Page d’accueil animée présentant le podcast, les dernières publications et les avis d’auditeurs.
- Catalogue d’épisodes avec filtrage par saison, cartes détaillées et partage multi-plateformes.
- Blog éditorial (PoonBlog) avec sommaire automatique, carrousel d’articles et options de partage.
- Formulaire de participation des enfants (upload audio ≤ 1 Mo, hCaptcha, sélection de saison).
- Parcours newsletter (inscription + désinscription) et gestion des messages de confirmation.
- Intégration de Firebase Analytics + Meta Pixel déclenchés uniquement après consentement cookie.

## Stack technique

- **Framework** : Nuxt 3 (SSR activé) + Vue 3 / Composition API
- **Gestion d’état** : Pinia (auto-import Nuxt)
- **Données & backend** : VueFire (Firestore), Firebase Cloud Functions (formulaires), Firebase Hosting/Nitro
- **UI** : Tailwind CSS, animations AOS, `vue3-carousel`, composants personnalisés
- **Accessibilité & SEO** : `@nuxtjs/fontaine`, `@nuxtjs/seo` (via dépendances), balisage OpenGraph/Twitter Cards, cookie banner

## Structure du projet

```text
pooncast_fo2-main/
├─ assets/                # Styles Tailwind, visuels et icônes
├─ components/
│  ├─ Blog/               # BlogSnapshot, BlogDetail, carrousel et modales de partage
│  ├─ Home/               # Sections de la page d’accueil (Intro, FAQ, Reco…)
│  ├─ Newsletter/         # Formulaires newsletter & désinscription
│  ├─ Pooncast/           # Cartes épisode, formulaire participation, partage
│  ├─ Reco/               # Carrousel des recommandations
│  └─ Navbar.vue, Footer.vue, Loading.vue…
├─ layouts/default.vue    # Layout principal avec CookieControl & popups de partage
├─ pages/                 # Routes Nuxt (home, pooncast, blog, formulaires, legal…)
├─ plugins/               # analytics.client.js (Firebase Analytics + Meta Pixel)
├─ stores/                # Pinia (Pooncast, Blog, FAQ, Reco, partage…)
├─ public/                # Favicon, manifest, fichiers statiques
├─ nuxt.config.ts         # Configuration Nuxt, modules, meta, cookie control
├─ tailwind.config.js     # Palette et animations custom
└─ firebase.json          # Configuration Firebase Hosting & Functions (Nitro server)
```

## Données & dépendances au back office

| Collection / ressource Firebase | Utilisation côté front                          | Champs attendus (minimum)                                                                                                                                                     |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seasons`                       | Filtrage des épisodes, formulaire participation | `id` (numérique), `title`, `participationFormVisible` (bool), `order`                                                                                                         |
| `pooncasts`                     | Cartes épisode, listes filtrées                 | `id` (Firestore), `titre`, `description` (HTML), `visuel`, `saison`, `episodeNumber`, `audio` (objets `spotify`, `apple`, `amazon`, `podcastaddict`), `createdAt` (timestamp) |
| `blogs`                         | PoonBlog & détail article                       | `title`, `intro`, `visuel`, `chapters` (array `{ name, text }`), `order`, `createdAt` (timestamp)                                                                             |
| `faq`                           | Section FAQ de la home                          | `question`, `answer`, `order`                                                                                                                                                 |
| `recommendations`               | Carrousel d’avis                                | `name`, `profession`, `avatar`, `recommendation`                                                                                                                              |

Formulaires publics (participation, newsletter, désinscription) envoient leurs données vers les Cloud Functions suivantes (URL par défaut) :

- `https://europe-west1-<votre-projet>.cloudfunctions.net/handleFormSubmission`
- `https://europe-west1-<votre-projet>.cloudfunctions.net/handleNewsletterSignup`
- `https://europe-west1-<votre-projet>.cloudfunctions.net/handleUnsubscribe`

Adaptez ces URL ou créez des proxys si vous déplacez les fonctions côté back office. Les deux formulaires utilisent hCaptcha (`sitekey` déclarée dans les composants Vue).

## Prérequis

- Node.js 18+ (recommandé par Nuxt 3) et npm 9+
- Accès à un projet Firebase (`<votre-projet>`) + Firebase CLI pour le déploiement
- Jeton hCaptcha actif pour les formulaires (voir `components/Newsletter/FormNewsletter.vue` et `components/Pooncast/ParticipationForm.vue`)
- (Optionnel) GitHub CLI / token pour CI/CD

## Variables d’environnement

Toutes les clés sensibles sont chargées depuis l’environnement (aucune valeur n’est committée).

| Nom de variable | Description | Exemple indicatif |
| --- | --- | --- |
| `NUXT_FIREBASE_API_KEY` | Clé publique Firebase pour l’app web | `votre-cle-firebase` |
| `NUXT_FIREBASE_AUTH_DOMAIN` | Domaine d’auth Firebase | `votre-projet.firebaseapp.com` |
| `NUXT_FIREBASE_PROJECT_ID` | ID du projet Firebase | `votre-projet` |
| `NUXT_FIREBASE_STORAGE_BUCKET` | Bucket Storage | `votre-projet.appspot.com` |
| `NUXT_FIREBASE_MESSAGING_SENDER_ID` | Sender ID Firebase | `000000000000` |
| `NUXT_FIREBASE_APP_ID` | Identifiant d’application Firebase | `1:XXXXXXXXXXXX:web:YYYYYYYYYYYYYYYY` |
| `NUXT_META_PIXEL_ID` | Identifiant du Meta Pixel | `000000000000000` |
| `NUXT_FUNCTIONS_BASE_URL` | Base URL des Cloud Functions | `https://europe-west1-votre-projet.cloudfunctions.net` |

1. Créez un fichier `.env` (non versionné) à la racine et renseignez les paires clé/valeur ci-dessus.  
2. Dupliquez-le en `.env.production` si vous construisez localement avant déploiement.  
3. Déclarez les mêmes variables côté Firebase Functions :  
   ```bash
   firebase functions:config:set \
     nuxt.firebase_api_key="$NUXT_FIREBASE_API_KEY" \
     nuxt.firebase_auth_domain="$NUXT_FIREBASE_AUTH_DOMAIN" \
     nuxt.firebase_project_id="$NUXT_FIREBASE_PROJECT_ID" \
     nuxt.firebase_storage_bucket="$NUXT_FIREBASE_STORAGE_BUCKET" \
     nuxt.firebase_messaging_sender_id="$NUXT_FIREBASE_MESSAGING_SENDER_ID" \
     nuxt.firebase_app_id="$NUXT_FIREBASE_APP_ID" \
     nuxt.meta_pixel_id="$NUXT_META_PIXEL_ID" \
     nuxt.functions_base_url="$NUXT_FUNCTIONS_BASE_URL"
   ```
4. Redémarrez `npm run dev` après modification des fichiers `.env`.  
5. Avant chaque déploiement, vérifiez la présence des variables (`firebase functions:config:get nuxt`), exécutez `npm run build -- --preset=firebase`, puis `firebase deploy`.

## Installation & démarrage

```bash
git clone <url-du-repo>
cd pooncast_fo2-main
npm install

# Démarrage en mode développement
npm run dev
```

Le serveur est disponible sur <http://localhost:3000>. Les clés Firebase sont tirées de l’environnement (`process.env`) : adaptez le contenu de votre `.env` pour cibler un autre projet sans modifier `nuxt.config.ts`.

## Scripts npm disponibles

| Commande              | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`         | Lance Nuxt en mode développement avec HMR.                       |
| `npm run build`       | Compile l’application (SSR) prête pour Firebase Hosting / Nitro. |
| `npm run generate`    | Génère la version statique (si besoin d’un export SSG).          |
| `npm run preview`     | Serre la build de production localement pour vérification.       |
| `npm run postinstall` | `nuxt prepare` (génération des types auto-imports).              |

## Configuration & bonnes pratiques

- **Firebase & VueFire** : `nuxt.config.ts` initialise VueFire et Nitro Firebase (région `europe-west1`). Veillez à disposer du fichier de service Firebase Admin requis par vos fonctions (nom de type `<projet>-firebase-adminsdk-*.json`, conservé hors repo).
- **Analytics & consentement** : `plugins/analytics.client.js` vérifie les cookies acceptés via `useCookieControl()` avant d’initialiser Firebase Analytics et le Meta Pixel. Toute nouvelle métrique doit respecter cette logique.
- **Styles & design system** : `assets/css/tailwind.css` regroupe les utilitaires sur-mesure (boutons, labels, inputs). Pensez à les réutiliser pour garder la cohérence graphique.
- **Accessibilité & SEO** : les composants utilisent `aria-*`, `sr-only`, métadonnées SEO et `useHead`. Conservez ces pratiques lors de la création de nouvelles pages.
- **Partage de contenu** : les stores `SharePooncast` et `ShareBlog` servent de bus pour l’affichage des fenêtres de partage. Préférez les actions Pinia plutôt que du state local dispersé.
- **Hygiène des secrets** : `git filter-repo` a purgé les anciennes clés. Pour éviter de nouvelles fuites, scannez le dépôt (`git grep "AIza"`, `gitleaks`), activez le secret scanning GitHub et ne committez jamais de fichiers `.env` ou d’identifiants service.
- **Cloud Functions** : les formulaires front consomment `NUXT_FUNCTIONS_BASE_URL` pour joindre les endpoints `handleFormSubmission`, `handleNewsletterSignup` et `handleUnsubscribe`. Assurez-vous que la valeur pointe vers un domaine CORS-compatible (Firebase Functions ou proxy) et qu’elle est définie côté Firebase via `functions:config:set nuxt.functions_base_url`.

## Déploiement

1. Construire le projet (preset Firebase) : `npm run build -- --preset=firebase`
2. Vérifier localement : `npm run preview`
3. Déployer sur Firebase Hosting + Functions (Nitro) :
   ```bash
   firebase deploy
   ```
   Le fichier `firebase.json` redirige toutes les routes vers la fonction `server_fo` générée par Nuxt. Assurez-vous que la CLI est connectée au bon projet et que les identifiants service account sont disponibles lors du build.

## Tests & vérifications

- Pas de suite de tests automatisés pour l’instant. Effectuez des parcours manuels : lecture des épisodes, soumission des formulaires (avec hCaptcha), navigation blog/FAQ, vérification du consentement cookie.
- Pensez à valider régulièrement l’accessibilité (Lighthouse) et la réactivité des carrousels/animations sur mobiles.

## Ressources complémentaires

- [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)
- [VueFire](https://vuefire.vuejs.org/)
- [Firebase Hosting + Functions](https://firebase.google.com/docs/hosting)

Pour toute évolution côté front, gardez en tête la dépendance aux données Firestore et aux Cloud Functions fournies par le back office qui sera publié séparément.
