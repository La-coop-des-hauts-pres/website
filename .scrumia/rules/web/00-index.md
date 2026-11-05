# Rules — web

Le site `web/` : Astro statique, îlots SolidJS, composants Ark UI / Zag (recettes Park UI),
PandaCSS sur les jetons de `design/`. Section project-local, format `scrumia-rules`.

`scrumia-html-css` et `scrumia-impl-solidjs` couvrent le HTML sémantique et SolidJS ; cette
section porte ce qu'ils ne portent pas : Astro, Panda sur nos jetons, l'accessibilité mesurée.

## Guides

| File | Use when you need to… |
|---|---|
| [guides/01-astro-et-ilots.md](guides/01-astro-et-ilots.md) | écrire une page, un composant `.astro`, ou décider qu'il faut un îlot Solid |
| [guides/02-design-et-jetons.md](guides/02-design-et-jetons.md) | écrire un style, ajouter un composant, changer ou brancher un design |
| [guides/03-accessibilite-et-seo.md](guides/03-accessibilite-et-seo.md) | écrire du balisage, un formulaire, une image, ou une balise `<head>` |
| [guides/04-verifier.md](guides/04-verifier.md) | lancer lint, types, tests, build, audit ou le styleguide |

## Decisions

| # | Decision |
|---|---|
| D-01 | Astro rend, Solid seulement là où le navigateur agit |
| D-02 | Toute valeur visuelle est un jeton de `design/tokens.css`, Panda n'en est que l'alias |
| D-03 | Les comportements complexes (dialogue, accordéon, menu…) viennent d'Ark UI/Zag, jamais réécrits |
| D-04 | WCAG 2.2 AA est le plancher ; chaque story est auditée par axe dans les tests |
| D-05 | `pnpm quality` est la porte : lint, types, tests, build, audit du HTML produit |
