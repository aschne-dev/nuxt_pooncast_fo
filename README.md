# Le Pooncast — front office

Site public du Pooncast, podcast éducatif et participatif destiné aux enfants et à leurs parents : <https://lepooncast.com>.

## Architecture vérifiée

- Nuxt `3.12.4`, Vue `3.4.35`, Nitro `2.9.7`, rendu SSR.
- npm avec `package-lock.json` v3 ; Node 20 est la version de référence (`.nvmrc`, `engines`).
- Pinia et le SDK Firebase Web Lite lisent les collections Firestore `seasons`, `pooncasts`, `blogs`, `faq` et `recommendations`.
- Firebase Hosting sert `.output/public` et réécrit les autres requêtes vers la Cloud Function Gen 2 `server_fo`, région `europe-west1`.
- Les formulaires appellent trois Cloud Functions externes : `handleFormSubmission`, `handleNewsletterSignup` et `handleUnsubscribe`.
- Firebase Analytics et Meta Pixel ne sont initialisés qu'après consentement.
- Le sitemap dynamique est rendu par `server/routes/sitemap.xml.ts` à partir de Firestore.

Nuxt 3 est arrivé en fin de vie le 31 juillet 2026. Les correctifs de ce chantier restent volontairement sur Nuxt 3 afin de ne pas mêler SEO et migration majeure. Une migration Nuxt 4 séparée est à planifier ; voir `SEO-AUDIT.md`.

## Prérequis

- Node.js 20.x recommandé (20 à 22 accepté par `engines`)
- npm 10+
- accès en lecture aux contenus Firestore pour afficher le site
- Firebase CLI pour les émulateurs et les déploiements

```bash
nvm use
npm ci
cp .env.example .env
```

Compléter `.env` avec la configuration de l'application web Firebase. Ces identifiants client sont publics par nature, mais ils ne remplacent pas des règles Firestore et Storage sûres. Ne jamais ajouter de clé de compte de service à Git.

## Variables d'environnement

| Variable | Usage |
| --- | --- |
| `NUXT_FIREBASE_API_KEY` | configuration de l'application web Firebase |
| `NUXT_FIREBASE_AUTH_DOMAIN` | domaine Firebase Auth |
| `NUXT_FIREBASE_PROJECT_ID` | identifiant Firebase lu par le SDK Web Lite et le sitemap |
| `NUXT_FIREBASE_STORAGE_BUCKET` | bucket associé à l'application web |
| `NUXT_FIREBASE_MESSAGING_SENDER_ID` | identifiant d'expéditeur Firebase |
| `NUXT_FIREBASE_APP_ID` | identifiant de l'application web |
| `NUXT_META_PIXEL_ID` | Meta Pixel optionnel, après consentement |
| `NUXT_FUNCTIONS_BASE_URL` | base URL publique des Functions de formulaires, sans slash final |
| `NUXT_HCAPTCHA_SITEKEY` | sitekey publique hCaptcha injectée au build (la production reste la valeur par défaut) |

Le modèle complet est dans `.env.example`. Les fichiers `.env*` réels sont ignorés par Git.

## Commandes locales

```bash
# développement
npm run dev

# contrôle TypeScript
npm run typecheck

# tests unitaires
npm test

# build SSR Node et aperçu local
npm run build
npm run preview

# artefacts Firebase Hosting + Function
npm run build -- --preset=firebase
firebase emulators:start --only hosting,functions --project lepooncast-aec97
```

Il n'existe pas encore de configuration ESLint, donc aucun script `lint` n'est annoncé artificiellement. `npm run preview` vise le build Node standard ; pour le preset Firebase, utiliser les émulateurs.

## Structure utile

```text
assets/                 styles Tailwind, polices et images locales
components/             UI, cartes, lecteurs, formulaires et navigation
composables/            métadonnées SEO et événements Analytics différés
layouts/                layout, consentement et JSON-LD du site
pages/                  routes statiques et routes dynamiques blog/épisodes
plugins/                initialisation Firebase, Analytics et Meta Pixel côté client
server/routes/          sitemap XML dynamique
stores/                 lectures Firestore et état Pinia
tests/                  tests Node des transformations de contenu
utils/                  slug, texte, dates et sérialisation Firestore
public/                 robots.txt, manifest et icônes
firebase.json           Hosting, rewrite SSR, runtime et headers
```

## Modèle de contenu observé

| Collection | Champs consommés |
| --- | --- |
| `seasons` | `title`, `participationFormVisible` ; l'ID du document représente la saison |
| `pooncasts` | `titre`, `description` texte, `visuel`, `saison`, `episodeNumber`, `audio`, `createdAt` |
| `blogs` | `title`, `intro`, `chapters`, `visuel`, `order`, `createdAt` |
| `faq` | `question`, `reponse` |
| `recommendations` | identité, fonction, avatar et texte de recommandation |

Les images éditoriales sont des URL stockées dans Firestore ; les images d'interface sont dans `assets/` et `public/`.

## Publication d'un contenu

Le back office et ses règles ne sont pas présents dans ce dépôt. Une publication devient visible lorsque le document Firestore possède les champs attendus. Le sitemap et le HTML SSR lisent les mêmes collections : vérifier après publication l'URL canonique, la date, l'image, les liens d'écoute et la présence de la nouvelle URL dans `/sitemap.xml`.

## Documentation

- `DEPLOYMENT.md` : préflight, preview, production et retour arrière Firebase.
- `SEO-AUDIT.md` : constats, corrections, priorités et feuille de route SEO/GEO.
