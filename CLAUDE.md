# hautpres-website

Site vitrine commercial d'une boutique et de ses producteurs, avec un back-end de collecte de
dossiers (bénévolat, adhésions).

| Dossier | Contenu |
|---|---|
| `web/` | Astro (statique) + îlots SolidJS + Ark UI/Zag + PandaCSS. Biome, Vitest. |
| `api/` | AdonisJS 6 (TypeScript), Lucid, MySQL. ESLint, Prettier, Japa. |
| `design/` | Jetons et identité : la seule source des valeurs visuelles. |
| `features/` | Specs (module `scrumia-specs`). |
| `.scrumia/` | Composition ScrumIA et règles de projet (`rules/web`, `rules/api`). |

## Commandes

```bash
make install        # dépendances web + api
make up             # MySQL + Mailpit (podman ; RUNTIME=docker pour Docker)
make web-dev        # http://localhost:4321 — catalogue des composants sur /styleguide/
make api-migrate   # migrations Lucid
make quality        # lint + types + tests + build + audits, web et api
```

## Avant d'écrire du code

- Web : lire `.scrumia/rules/web/00-index.md`. Aucune valeur visuelle en clair : un jeton de
  `design/tokens.css`. Composant interactif = Ark UI/Zag, jamais réécrit à la main.
- API : lire `.scrumia/rules/api/00-index.md`. Toute donnée personnelle suit `guides/03-rgpd.md`.
- Un test accompagne chaque comportement ; `make quality` doit rester vert.
- Pas d'état de projet dans le dépôt (pas de backlog ni de statut de sprint en fichier).

<!-- scrumia:start -->
## ScrumIA composition

Composition déclarée dans `.scrumia/config.yaml`. Lancer `/scrumia-core:scrumia-init` après
redémarrage de la session pour installer les plugins listés dans `.claude/settings.json` et
régénérer ce bloc.

| Module | À savoir |
|---|---|
| `tibs245/scrumia:scrumia-specs` | Specs dans `features/`, une par feature (`index.md`, `business.md`, `qa.md`, `CHANGELOG.md`). |
| `tibs245/scrumia:scrumia-teams` | Rôles : manager, business, tech, designer. |
| `tibs245/scrumia:scrumia-discovery` | Une idée passe par le cadrage avant de devenir un ticket. |
| `tibs245/scrumia:scrumia-design` | Identité, jetons et composants dans `design/`. Jamais de valeur en clair. |
| `tibs245/scrumia:scrumia-rules` | Règles de projet dans `.scrumia/rules/<section>/` : `web`, `api`. |

| App | Chemin | Modules |
|---|---|---|
| `web` | `web` | `scrumia-impl-solidjs`, `scrumia-html-css`, `scrumia-solid-principles`, `scrumia-tdd` |
| `api` | `api` | `scrumia-solid-principles`, `scrumia-tdd` (règles AdonisJS : `.scrumia/rules/api/`) |

Le suivi (tickets, colonnes, PR) n'est pas encore branché : le module `scrumia-github-project`
s'ajoute quand le projet GitHub existe.
<!-- scrumia:end -->
