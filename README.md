# Haut-Prés — site web

Site vitrine commercial (boutique et producteurs) et API de collecte de dossiers.

## Démarrage

Prérequis : Node ≥ 22 + pnpm 11 (version épinglée par `packageManager`), Podman (ou Docker) pour MySQL et Mailpit.

```bash
cp api/.env.example api/.env && cp web/.env.example web/.env
make install
make up              # MySQL 8.4 (:3306) + Mailpit (UI :8026)
cd api && node ace generate:key && cd ..
make api-migrate
make web-dev         # http://localhost:4321
make api-dev         # http://localhost:3333/api/v1/health
```

Avec Docker : `make RUNTIME=docker …`. Ports modifiables par `HAUTPRES_MYSQL_PORT`,
`HAUTPRES_SMTP_PORT`, `HAUTPRES_MAILPIT_PORT`. `make down` arrête les conteneurs, `make reset` les
supprime avec les données locales.

## Qualité

`make quality` exécute, pour `web/` : Biome, `astro check`, Vitest (dont audit axe de chaque
story), build, audit du HTML produit ; pour `api/` (MySQL requis, `make up`) : ESLint, TypeScript,
Japa, build, audit des dépendances. La CI (`.github/workflows/ci.yml`) rejoue les deux.

## Design

Le design n'est pas figé. Les valeurs vivent dans `design/tokens.css`, les composants dans
`web/src/components/ui/` (Ark UI/Zag + recettes Panda). Le catalogue est consultable sur
`/styleguide/` en développement ; `pnpm tokens:studio` (dans `web/`) ouvre Panda Studio.

## Organisation du travail

Le projet suit une composition ScrumIA (`.scrumia/config.yaml`, `CLAUDE.md`). Les specs
vont dans `features/`, les conventions dans `.scrumia/rules/`.

## Fiche d’inscription locale

La fiche A5 et la version A4 à découper sont générées uniquement sur le poste, dans
`.private/fiche-societaire.html` et `.private/fiches-a4-a-decouper.html`.
Renseigner `BANQUIERE_EMAIL` et `ASSOCIATION_EMAIL` dans `.private/coordonnees.env`,
puis exécuter `pnpm --dir web fiche:locale`. Le fichier de configuration et la fiche sont
ignorés par Git et ne sont pas copiés dans le site construit. Les QR codes ouvrent des
courriels préremplis ; ils n’envoient rien et ne joignent aucun document automatiquement.
Toute personne qui lit la fiche ou scanne un QR code peut voir l’adresse correspondante.

Pour imprimer deux fiches, ouvrir la version A4 et choisir le papier A4 paysage, avec
une seule page du document par feuille. La ligne pointillée indique où couper.

## Déploiement (Plesk, extension Node.js)

Un seul processus Node : AdonisJS répond sur `/api/v1/…` et `/up`, et sert le site statique Astro
déposé dans `api/public/`. Le serveur web de Plesk sert aussi directement ce dossier (racine du document).

> **Node 26 LTS** partout : `.nvmrc`, `api/.nvmrc`, `api/.node-version`, `engines` des deux
> `package.json`, CI et page Node.js de Plesk. Changer de version = changer tous ces endroits ensemble.

**API — Plesk s'en charge.** Git (branche `main`) puis configuration automatique de l'application
Node.js : `pnpm install`, build, démarrage. Racine de l'application `api`, racine du document
`api/public`, **fichier de démarrage `startup.cjs`** (charge `build/bin/server.js` ; en cas d'échec, écrit
`api/startup-error.log`). « Auto-configure » le remplace par un `.plesk.startup.cjs` généré : le
remettre à `startup.cjs` après chaque auto-configuration. Variables d'environnement : `NODE_ENV=production`, `HOST=0.0.0.0`,
`LOG_LEVEL=warn`, `APP_KEY` (`node ace generate:key` en local, ne plus jamais la changer), `DB_HOST`,
`DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`.

**Maintenance** (page Node.js → *Run script*) : `db:migrate` après un déploiement qui ajoute une
migration, `db:status`, `db:rollback`. Ne pas nommer un script comme une commande de pnpm (`deploy`…).

**Site — pas encore servi.** Plesk ne construit que `api/` : `api/public/` reste vide en production
tant que la construction de `web/` n'est pas branchée sur le déploiement.

pnpm 11 et `minimumReleaseAge` (24 h) : le lockfile doit être produit par la version épinglée dans
`packageManager`, sinon Plesk le refuse. Ne pas réécrire l'historique de `main` : Plesk ne sait faire
que des pulls en avance rapide.

`PUBLIC_SITE_URL` (variable GitHub) a pour défaut `https://lacoopdeshautspres.fr`. HSTS : activer
`Strict-Transport-Security` dans `api/app/middleware/security_headers_middleware.ts` une fois le HTTPS validé.

## Contribuer, sécurité, licence

- Contribuer : [CONTRIBUTING.md](CONTRIBUTING.md) — toutes les contributions sont les
  bienvenues, on peut aussi en parler au magasin.
- Code de conduite : [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- Signaler une faille : [SECURITY.md](SECURITY.md) (thibault@kolombo.fr, pas d'issue publique).
- Licence : [LICENSE](LICENSE) — code lisible et partageable, contributions bienvenues,
  mais pas d'atteinte à l'image de la Coop ni d'usage malveillant ou concurrent.
  Ce n'est pas une licence open source au sens de l'OSI.
