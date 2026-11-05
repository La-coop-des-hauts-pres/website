# 04 — Vérifier

Depuis `web/` :

| Besoin | Commande |
|---|---|
| développer | `pnpm dev` (styleguide : `/styleguide/`) |
| lint + format (Biome) | `pnpm lint` ; `pnpm format` corrige |
| types (Astro + TS) | `pnpm typecheck` |
| tests (Vitest, jsdom) | `pnpm test` ; `pnpm test:coverage` (seuil 80 %) |
| build | `pnpm build` |
| audit du HTML produit | `pnpm audit:build` |
| tout | `pnpm quality` |

- Les tests rendent le composant et l'interrogent **par rôle et nom accessible**, jamais par
  `data-testid` ni par classe.
- Chaque story du catalogue est auditée par axe (WCAG A/AA) dans `src/styleguide/stories.test.tsx` :
  une nouvelle story est donc testée sans écrire de test.
- `astro check` exige TypeScript 6.x tant que TypeScript 7 n'expose pas son API : ne pas monter.
- Astro 7 exige Node ≥ 22.23.4 ; le projet reste en Astro 6 tant que le poste n'est pas à jour.
