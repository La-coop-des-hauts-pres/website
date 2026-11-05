# 01 — Astro et îlots

1. **Astro rend, Solid agit.** Une page, un layout, un bloc de contenu = `.astro`, zéro JS livré.
   Un composant Solid n'existe que si le navigateur doit réagir (état, clavier, focus, réseau).
2. **Hydratation la plus tardive possible** : `client:visible` ou `client:idle`. `client:load`
   se justifie par écrit dans le ticket. `client:only` est réservé au styleguide.
3. **Données et SEO côté build** : le contenu éditorial et les appels à l'API publique de
   lecture se font dans le frontmatter Astro, pas dans un îlot.
4. **Appels à l'API Laravel** (formulaires de bénévolat, adhésion) : via `src/lib/api/client.ts`,
   dans un îlot, avec gestion de `ApiError.fieldErrors` pour afficher les erreurs de validation.
5. **Alias** : `@/` → `web/src`, `@design/` → `design/`, `styled-system/` → généré par Panda.
6. **Textes** : en français, centralisés dans `src/i18n/`. Pas de texte en dur dans un composant
   de page ; les composants de `ui/` reçoivent leurs libellés en props.
