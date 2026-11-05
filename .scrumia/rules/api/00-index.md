# Rules — api

L'API `api/` : AdonisJS 6, TypeScript, Lucid, MySQL. Elle collecte des dossiers structurés
(inscription au bénévolat, adhésions) et sert du contenu à `web/`. Elle sert aussi le site
statique construit (`api/public/`). Aucun module ScrumIA ne couvre AdonisJS : cette section porte
les conventions.

## Guides

| File | Use when you need to… |
|---|---|
| [guides/01-architecture.md](guides/01-architecture.md) | ajouter une route, un contrôleur, un validateur, une règle métier, une migration |
| [guides/02-qualite.md](guides/02-qualite.md) | lancer ou configurer ESLint, Prettier, Japa, l'audit des dépendances |
| [guides/03-rgpd.md](guides/03-rgpd.md) | stocker ou exposer toute donnée personnelle |

## Decisions

| # | Decision |
|---|---|
| D-01 | TypeScript strict ; imports par alias `#controllers/*`, `#models/*`… (voir `package.json`) |
| D-02 | Pas de logique dans les contrôleurs : validateur VineJS → service → réponse |
| D-03 | Tests Japa : `unit` sans I/O, `functional` contre le vrai serveur et MySQL |
| D-04 | Une migration déployée n'est jamais modifiée : en ajouter une nouvelle |
| D-05 | Toute donnée personnelle suit `guides/03-rgpd.md` |
