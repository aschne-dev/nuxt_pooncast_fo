# Audit SEO, GEO, performance et maintenabilité

Audit réalisé les 6 et 7 août 2026 sur le dépôt et le build local, sans déploiement en production.

## État initial

L'application était déjà déclarée en SSR, mais les lectures Firestore étaient déclenchées sans être attendues pendant le rendu serveur. En pratique, le HTML initial des catalogues ne contenait ni cartes d'épisodes ni cartes d'articles. Le sitemap statique ne contenait que cinq routes, les canoniques étaient absentes ou erronées, les pages dynamiques n'avaient pas de JSON-LD et les timestamps Firestore n'étaient pas sérialisables de façon fiable par Pinia.

Autres constats structurants : Nuxt `3.12.4` est en fin de vie, le runtime Firebase généré ciblait historiquement Node 18, aucune suite de tests/typecheck opérationnelle ni documentation de déploiement fiable n'était présente, et `npm audit` remonte 81 vulnérabilités transitives (9 critiques, 36 élevées, 28 modérées, 8 faibles). Aucun correctif automatique risqué n'a été lancé.

Le site public observé pendant l'audit exposait bien les textes statiques de la page d'accueil, mais pas les listes Firestore ni les réponses de FAQ dans le contenu analysable.

## Pages contrôlées dans le build corrigé

| Type | Statut | HTML initial | Canonical | JSON-LD |
| --- | --- | --- | --- | --- |
| Accueil | 200 | texte, FAQ et liens vers 7 épisodes récents/articles | oui | site + FAQ |
| Liste épisodes | 200 | 30 liens de détail et cartes | oui | site |
| Épisode exemple | 200 | H1, description, date, saison, numéro, plateformes | oui | `PodcastEpisode` + fil d'Ariane |
| Liste articles | 200 | 7 articles | oui | site |
| Article exemple | 200 | H1, auteur, date, chapitres | oui | `BlogPosting` + fil d'Ariane |
| Participation | 200 | formulaire et information | oui | site |
| Mentions légales | 200 | contenu légal | oui | site |
| URL inexistante | 404 | message d'erreur | non, volontaire | `noindex, nofollow` |
| Sitemap | 200 | 45 URL lors du test : 8 statiques, 30 épisodes, 7 articles | n/a | XML |

Les comptes reflètent les données Firestore présentes le jour du test et évolueront avec les publications.

## Plan priorisé

| Priorité | Problème | Impact | Recommandation | Fichiers concernés | Risque | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| P0 — corrigé | Contenus Firestore absents du HTML SSR | Crawl et indexation des contenus bloqués | Attendre les lectures dans les pages et sérialiser les timestamps | `pages/**`, `stores/**`, `utils/content.js` | faible | moyen |
| P0 — corrigé | Sitemap statique incomplet | Découverte de 37 routes impossible via sitemap | Générer le XML depuis Firestore | `server/routes/sitemap.xml.ts`, `public/sitemap.xml` | faible | moyen |
| P0 — corrigé | Pages dynamiques absentes renvoyant un état ambigu | Soft 404 et gaspillage crawl | Lever de vraies erreurs 404/503 | `pages/pooncast/**`, `pages/poonblog/**`, `error.vue` | faible | faible |
| P0 — corrigé | Runtime Firebase Node 18 obsolète | Risque de déploiement/maintenance | Cibler Node 20 et documenter le build Firebase | `firebase.json`, `.nvmrc`, `package.json` | faible | faible |
| P1 — corrigé | Métadonnées génériques, canoniques manquantes et canonical blog erronée | Duplication et snippets faibles | Composable SEO unique, données par route, OG/Twitter absolus | `composables/usePooncastSeo.ts`, `pages/**`, `nuxt.config.ts` | faible | moyen |
| P1 — corrigé | Aucun schéma exploitable par type de contenu | Compréhension des entités limitée | Ajouter seulement les schémas visibles : site, podcast, épisode, blog, FAQ, fil d'Ariane | `layouts/default.vue`, pages dynamiques, `pages/index.vue` | faible | moyen |
| P1 — corrigé | Cartes sans liens de détail crawlables | Maillage interne insuffisant | Ajouter de vrais liens Nuxt vers chaque contenu | composants Blog/Pooncast/Home | faible | faible |
| P1 — corrigé | Cache statique et headers défensifs absents | Rechargements et surface navigateur | Cache immutable `_nuxt`, nosniff, referrer et permissions policy | `firebase.json` | faible | faible |
| P1 — corrigé | Pixel Meta lisait `process.env` dans le navigateur | Mesure incohérente | Lire `runtimeConfig.public`, recharger seulement lors d'un changement de consentement | `plugins/analytics.client.js` | faible | faible |
| P1 — à traiter | 81 avis de vulnérabilité npm, dont chaîne Nuxt/Vite/devtools | Sécurité build/runtime | Migrer par lots testés ; priorité au framework, Vite/Nitro/Firebase ; ne pas utiliser `npm audit fix --force` aveuglément | `package.json`, `package-lock.json` | élevé | élevé |
| P1 — à traiter | Nuxt 3 EOL depuis le 31/07/2026 | Plus de correctifs officiels | Projet séparé de migration Nuxt 4 avec matrice modules et tests visuels | ensemble du dépôt | élevé | élevé |
| P1 — à traiter | Bundle client principal ≈818 kB minifié, ≈221 kB gzip ; Firebase Database/Auth/Storage inutilisés y contribuent fortement | LCP/INP et coût d'hydratation | Déplacer les lectures publiques vers des endpoints serveur cacheables ou configurer VueFire pour ne livrer que Firestore ; charger les formulaires/hCaptcha à la demande | VueFire, Firebase, composants Form, `package.json` | moyen | moyen |
| P1 — à traiter | Code backend, règles Firestore/Storage et rétention absents | Impossible d'attester la protection des données enfants | Audit séparé du back office, des règles, Functions et données | dépôt backend / consoles Firebase | élevé | moyen |
| P1 — partiel | HTML riche éditorial exposé à une compromission du compte ou de la base | XSS si un contenu malveillant est enregistré | Le rendu applique désormais une allowlist testée et les injections inutiles ont été retirées ; compléter par un assainissement côté écriture | `components/Blog/BlogDetail.vue`, back office | moyen | moyen |
| P1 — à traiter | Chaque rendu SSR relit Firestore sans stratégie de cache HTML explicite | Latence, coût et dépendance à Firestore | Mesurer puis ajouter cache/SWR et invalidation éditoriale, ou pré-rendu piloté par publication | pages, Nitro, processus back office | moyen | moyen |
| P2 — partiel | HTML interactif et formulaires peu accessibles | Navigation clavier/lecteurs d'écran | Corrigé : labels, alertes, états ARIA, boutons/liens non imbriqués, réduction des animations ; compléter par audit automatisé et manuel | composants Navbar, FAQ, Blog, Home, formulaires, CSS | faible | moyen |
| P2 — à traiter | Hero desktop/mobile dupliqué dans le DOM | Répétition de texte et HTML plus lourd | Concevoir un balisage textuel unique avec présentation responsive sans dupliquer le contenu | `components/Home/HomeIntro.vue` | moyen, visuel | moyen |
| P2 — à traiter | Images éditoriales distantes non optimisées globalement | LCP et bande passante | Mesurer formats/dimensions, générer WebP/AVIF ou ajouter un pipeline image compatible Firebase | composants image + stockage média | moyen | moyen |
| P2 — à traiter | Pas d'ESLint, test navigateur, Lighthouse CI ni CI/CD | Régressions silencieuses | Ajouter ESLint, Vitest/Nuxt Test Utils, Playwright et budgets Lighthouse dans une PR dédiée | nouvelle configuration CI/tests | faible | moyen |
| P2 — à traiter | Packages directs non configurés ou non importés | Surface de maintenance | Confirmer puis retirer par petits lots `@nuxtjs/seo`, robots/sitemap, OG/schema/booster et outils CLI inutilisés | `package.json` | moyen | faible |
| P2 — à traiter | Maillage article ↔ épisode non modélisé | Profondeur éditoriale et navigation | Ajouter des relations explicites dans Firestore et les afficher dans les deux sens | schéma contenu, pages dynamiques | moyen | moyen |
| P3 — éditorial | Pages épisode limitées à la description et aux plateformes | Réponse GEO peu précise | Ajouter réponse courte, notions, âge, résumé, sources et contenus liés validés éditorialement | back office + page épisode | faible | élevé |
| P3 — éditorial | Pas de transcription fiable | Accessibilité et citabilité limitées | Ajouter des transcriptions relues ; ne pas en inventer depuis les descriptions | back office + page épisode | faible | élevé |
| P3 — éditorial | Peu de signaux auteur/sources/mise à jour | Confiance éditoriale | Fiches auteurs, politique éditoriale, sources et date de mise à jour | contenu + pages | faible | moyen |
| P3 — éditorial | Pas de pages thématiques | Découverte par sujets | Créer uniquement des hubs alimentés (nature, sciences, émotions…) avec sélection éditoriale | modèle de contenu + nouvelles routes | moyen | élevé |

## Modifications réalisées

### Crawl et SEO

- récupération Firestore attendue pendant le SSR et stores idempotents ;
- timestamps normalisés en ISO, tri non mutatif et correspondance saison numérique corrigée ;
- titres, descriptions, canonical, robots, Open Graph et Twitter par page ;
- `Organization`, `WebSite`, `PodcastSeries`, `PodcastEpisode`, `BlogPosting`, `BreadcrumbList` et `FAQPage` conditionnels ;
- vrais liens internes depuis les cartes ;
- sitemap dynamique cacheable et robots.txt sans blocage des assistants IA ;
- date d'épisode rendue visible lorsqu'elle alimente le JSON-LD ;
- 404 réelle et pages techniques de désinscription en `noindex`.

### Maintenabilité et déploiement

- runtime Firebase Node 20, identité Firebase locale réparée, headers et cache Hosting ;
- scripts `typecheck` et `test`, dépendances TypeScript compatibles et tests unitaires ;
- `.nvmrc`, `.env.example`, `README.md` et `DEPLOYMENT.md` ;
- fonction commune de slug/texte/date en remplacement de plusieurs variantes incohérentes.
- sérialisation sûre du JSON-LD dynamique contre une fermeture de balise `script`, avec test de régression ;
- retrait des injections HTML inutiles pour les titres, messages de copie et descriptions d'épisodes.

### Accessibilité et performance à faible risque

- labels associés aux champs, type `email`, messages `role=alert`, accordéons clavier/ARIA ;
- suppression de plusieurs imbrications lien/bouton invalides ;
- menu mobile avec état `aria-expanded` réel ;
- respect global de `prefers-reduced-motion` ;
- dimensions et lazy loading ajoutés aux principales images éditoriales ;
- cache immutable des assets versionnés.

## Stratégie SEO/GEO recommandée

Le GEO repose ici sur du contenu fiable et citable, pas sur des directives destinées à un robot particulier.

1. Enrichir chaque épisode avec une réponse introductive autonome, un résumé, les notions éducatives, le public conseillé et des sources validées.
2. Publier des transcriptions relues et synchronisées avec l'audio quand les droits et le processus éditorial le permettent.
3. Ajouter aux articles l'auteur, sa présentation, les sources, `dateModified` et les épisodes associés.
4. Modéliser des thématiques contrôlées dans Firestore, puis créer un hub seulement lorsqu'il possède assez de contenus utiles.
5. Créer une page « À propos / équipe / méthode éditoriale » et une vraie page de contact pour renforcer l'attribution.
6. Évaluer `llms.txt` seulement comme convention expérimentale ; il ne remplace ni le sitemap, ni le HTML, ni les données structurées.

## Migration Nuxt 4 séparée

1. Créer une branche dédiée après publication des correctifs actuels.
2. Mettre d'abord Nuxt 3 au dernier patch disponible compatible et figer une base de tests.
3. Inventorier chaque module (VueFire, Pinia, cookie-control, Fontaine, AOS, carrousel, Nitro Firebase) et sa compatibilité Nuxt 4.
4. Retirer les dépendances directes réellement inutilisées.
5. Exécuter le guide/codemod Nuxt officiel, puis corriger structure `app/`, TypeScript et runtime.
6. Comparer HTML, payload Pinia, sitemap, 404, consentement, formulaires et artefacts Firebase.
7. Faire une preview staging complète avant toute production.

Cette migration ne doit pas être fusionnée avec une refonte, un changement de CMS ou une migration Firebase.

## Données personnelles et enfants

Le navigateur collecte pour la participation : prénom de l'enfant, âge, ville facultative, e-mail du parent, question écrite ou audio (limité côté client à 1 Mo), saison, acceptation des conditions et jeton hCaptcha. La newsletter collecte e-mail, consentement et jeton hCaptcha. Les données sont envoyées aux Functions configurées par `NUXT_FUNCTIONS_BASE_URL`.

Le dépôt ne contient ni le code de ces Functions métier, ni les règles Firestore/Storage, ni une politique de rétention vérifiable. Il est donc impossible de confirmer côté code : validation serveur, contrôle MIME réel, suppression des fichiers, limitation de débit, destinataires, chiffrement applicatif ou durée de conservation. La clé hCaptcha de site et la configuration Firebase web sont publiques et ne sont pas des secrets ; leur sécurité dépend de la validation serveur et des règles.

Actions manuelles prioritaires : audit des règles et du backend, consentement parental explicite avant envoi, information sur finalités/durée/destinataires, tests d'abus, App Check si pertinent et procédure de suppression/export.

## Google Search Console après déploiement

- soumettre `https://lepooncast.com/sitemap.xml` ;
- inspecter l'accueil, les deux catalogues, un épisode et un article ;
- demander une nouvelle exploration des pages prioritaires ;
- surveiller « Pages », Core Web Vitals, HTTPS et résultats enrichis ;
- tester les JSON-LD avec Rich Results Test et Schema Markup Validator ;
- vérifier les domaines canonical et les anciennes URL avant d'ajouter des redirections ;
- suivre les requêtes par question d'enfant et consolider le contenu, sans créer de pages pauvres.

## Limites de l'audit

- aucun accès authentifié au back office, aux règles, aux logs Cloud, à Analytics ou à Search Console ;
- aucune soumission réelle de formulaire afin de ne pas créer de données personnelles ;
- pas de déploiement ni de modification de production ;
- pas de Lighthouse terrain/CrUX ni de test visuel exhaustif ;
- les URLs média distantes et leur origine de stockage ne peuvent pas être garanties à partir des documents Firestore seuls ;
- le contenu Firestore peut changer après la date de l'audit.
