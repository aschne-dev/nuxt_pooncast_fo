# Déploiement Firebase

## Architecture

La production repose sur Firebase Hosting classique et une Cloud Function Nitro :

```text
navigateur
  -> Firebase Hosting (site pooncast-fo, fichiers .output/public)
  -> rewrite **
  -> Cloud Function Gen 2 server_fo (europe-west1, Node 20, .output/server)
  -> Firestore pour le contenu SSR
```

Configuration vérifiée dans le dépôt :

| Élément | Valeur |
| --- | --- |
| Projet par défaut | `lepooncast-aec97` |
| Site Hosting | `pooncast-fo` |
| Function SSR | `server_fo` |
| Génération | Gen 2 |
| Région | `europe-west1` |
| Runtime | Node.js 20 |
| Build | `npm run build -- --preset=firebase` |
| Sorties | `.output/public` et `.output/server` |

Deux configurations Firebase sont versionnées : `firebase.json` pour la production et `firebase.staging.json` pour le projet isolé `lepooncast-staging`. Aucun workflow CI/CD n'est configuré.

## Accès et identité du projet

Avant toute action distante :

```bash
firebase --version
firebase login --reauth
firebase projects:list
firebase use
```

Pour la production, le projet actif et `NUXT_FIREBASE_PROJECT_ID` doivent tous deux être `lepooncast-aec97`. Pour le staging, ne jamais changer le projet par défaut : passer explicitement `--config firebase.staging.json --project lepooncast-staging` et utiliser uniquement les variables publiques de l'application web staging.

Ne jamais afficher ni committer un compte de service. Le fichier local de ce type est ignoré et n'est pas nécessaire au build client actuel.

## Préflight obligatoire

```bash
git status --short
node --version
npm --version
npm ci
npm run typecheck
npm test
npm run build -- --preset=firebase
git diff --check
```

Contrôler aussi :

- `.env.production` cible bien le projet attendu, sans imprimer ses valeurs ;
- `.output/public` et `.output/server` existent ;
- le HTML initial contient les cartes et les liens de détail ;
- `/robots.txt`, `/sitemap.xml` et une fausse URL répondent correctement ;
- aucun secret n'apparaît dans `git status` ou les fichiers suivis ;
- la console Firebase n'annonce pas de règle Firestore/Storage ou de quota problématique.

## Preview locale complète

Pour vérifier le preset Firebase et la rewrite SSR :

```bash
npm run build -- --preset=firebase
firebase emulators:start --only hosting,functions --project lepooncast-aec97
```

Les contenus sont actuellement lus dans le projet Firestore configuré par l'environnement : l'émulateur Firestore n'est pas configuré dans ce dépôt. Éviter toute action d'écriture pendant ce contrôle.

Pour un contrôle rapide du serveur Nitro sans Firebase :

```bash
npm run build
npm run preview
```

## Staging distant isolé

`firebase.staging.json` cible uniquement le site `lepooncast-staging`, épingle la Function SSR Gen 2 avec `pinTag` et ajoute `X-Robots-Tag: noindex, nofollow`. Le build staging doit aussi définir `NUXT_STAGING_NOINDEX=true` afin que le middleware SSR et le `robots.txt` généré restent cohérents. Les canoniques demeurent volontairement sur `https://lepooncast.com`.

Toute opération staging doit utiliser les deux garde-fous explicites suivants :

```bash
firebase <commande> --config firebase.staging.json --project lepooncast-staging
```

Ne jamais réutiliser cette configuration ou les variables staging contre `lepooncast-aec97`.

## Contrôles de preview

- accueil, catalogue des épisodes, PoonBlog et deux routes dynamiques ;
- participation, newsletter et désinscription sans envoyer de données réelles ;
- statut 404 sur une URL inexistante ;
- titres, descriptions, canoniques, robots, OG/Twitter et JSON-LD ;
- contenu des cartes dans la source HTML ;
- sitemap complet et XML valide ;
- clavier, menu mobile, carrousels et affichage 375/768/1440 px ;
- console navigateur, requêtes Firestore, hCaptcha et logs de Function ;
- consentement Analytics : aucun appel avant accord.

## Production — uniquement après confirmation explicite

Le SSR et Hosting doivent être publiés ensemble :

```bash
npm run build -- --preset=firebase
firebase deploy --only hosting,functions --project lepooncast-aec97
```

Un déploiement `--only hosting` ne publierait pas le nouveau code de `server_fo` et ne suffit donc pas pour ce chantier.

Après déploiement :

```bash
firebase functions:log --only server_fo --project lepooncast-aec97
```

Puis contrôler les statuts HTTP, le HTML initial, les métadonnées, le sitemap, les formulaires, Analytics après consentement et les métriques Firebase/Google Cloud.

## Retour arrière

1. Identifier le commit précédemment déployé et reconstruire exactement ses artefacts avec Node 20.
2. Redéployer Hosting **et** Functions depuis ce commit avec le project ID explicite.
3. La console Firebase Hosting peut restaurer une release Hosting, mais sans `pinTag` cela ne restaure pas automatiquement le code de la Function.
4. Vérifier immédiatement les logs et les routes principales.

Ne pas supprimer une Function pour revenir en arrière : cela interromprait toutes les routes SSR.

## Actions manuelles requises

- réauthentifier la Firebase CLI et confirmer l'accès au projet ;
- vérifier les règles Firestore et Storage, absentes de ce dépôt ;
- vérifier la mémoire, le timeout, la concurrence, les quotas et les alertes de `server_fo` dans Google Cloud ;
- maintenir la documentation et les variables publiques de l'environnement staging isolé ;
- vérifier que les futurs déploiements staging conservent `pinTag` sans réutiliser cette configuration en production ;
- vérifier CORS, validation serveur, limitation de débit et rétention des Functions de formulaires ;
- conserver un journal des commits et dates réellement déployés.
