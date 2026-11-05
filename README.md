# Haut-Prés — site web

Site vitrine commercial (boutique et producteurs) et API de collecte de dossiers.

## Démarrage

Prérequis : Node ≥ 22 + pnpm ≥ 10, Podman (ou Docker). PHP et Composer ne sont pas nécessaires
sur le poste : l'API tourne dans un conteneur.

```bash
cp api/.env.example api/.env && cp web/.env.example web/.env
make install
make up              # MySQL 8.4 (:3306) + Mailpit (UI :8026)
make api-migrate
make web-dev         # http://localhost:4321
```

Avec Docker : `make COMPOSE="docker compose" RUNTIME=docker …`. Ports modifiables par
`HAUTPRES_MYSQL_PORT`, `HAUTPRES_SMTP_PORT`, `HAUTPRES_MAILPIT_PORT`, `HAUTPRES_API_PORT`.
Serveur API : `podman compose --profile api up api` (http://localhost:8000/api/v1/health).

## Qualité

`make quality` exécute, pour `web/` : Biome, `astro check`, Vitest (dont audit axe de chaque
story), build, audit du HTML produit ; pour `api/` : Pint, PHPStan niveau max, Rector, Pest,
`composer audit`. La CI (`.github/workflows/ci.yml`) rejoue les deux.

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
