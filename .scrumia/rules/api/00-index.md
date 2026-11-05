# Rules — api

L'API `api/` : Laravel 13, PHP 8.5, MySQL. Elle collecte des dossiers structurés (inscription
au bénévolat, adhésions) et sert du contenu à `web/`. Aucun module ScrumIA ne couvre PHP :
cette section porte les conventions.

## Guides

| File | Use when you need to… |
|---|---|
| [guides/01-architecture.md](guides/01-architecture.md) | ajouter une route, un contrôleur, une règle métier, une migration |
| [guides/02-qualite.md](guides/02-qualite.md) | lancer ou configurer Pint, PHPStan, Rector, Pest, l'audit Composer |
| [guides/03-rgpd.md](guides/03-rgpd.md) | stocker ou exposer toute donnée personnelle |

## Decisions

| # | Decision |
|---|---|
| D-01 | `declare(strict_types=1)` partout, classes `final`, PHPStan niveau max |
| D-02 | Pas de logique dans les contrôleurs : FormRequest → Action → Resource |
| D-03 | Tests en classes PHPUnit exécutées par Pest (PHPStan comprend `$this`) |
| D-04 | Rector ne touche ni aux migrations ni à `bootstrap/cache` (la réécriture des facades `Schema::` casse les migrations) |
| D-05 | Toute donnée personnelle suit `guides/03-rgpd.md` |
