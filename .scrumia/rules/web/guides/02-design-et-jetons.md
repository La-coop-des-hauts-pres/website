# 02 — Design et jetons

Le design n'est pas encore choisi : le socle doit absorber n'importe lequel.

- **Source de vérité** : `design/tokens.css` (variables CSS). `web/panda.config.ts` les aliase
  en jetons Panda typés (`color: 'ink'` → `var(--ink)`). Aucune valeur brute (`#fff`, `16px`)
  dans un composant ou une page ; pour un besoin nouveau, créer d'abord le jeton.
- **Changer de design** : remplacer les valeurs de `tokens.css` ; si les formes changent, adapter
  les recettes de `web/src/components/ui/`. Les pages ne bougent pas.
- **Plusieurs thèmes** : un fichier `design/themes/<nom>.css` qui ne redéfinit que des variables
  sous `[data-theme='<nom>']`.
- **Composants `ui/`** : un composant = un fichier `.tsx` + `.stories.tsx` + un test. Ils
  encapsulent Ark UI (Zag) pour le comportement et Panda (`cva`/`sva`) pour l'apparence, dans
  l'esprit de Park UI. Ajouter un composant Park UI = copier sa recette et l'adapter à nos jetons.
- **Mouvement** : toute transition passe sous `@media (prefers-reduced-motion: no-preference)`.
- **Catalogue** : `pnpm dev` puis `/styleguide/` (dev uniquement, jamais dans le build).
  `pnpm tokens:studio` ouvre Panda Studio sur les jetons.
