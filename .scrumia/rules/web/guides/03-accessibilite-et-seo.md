# 03 — Accessibilité et SEO

- Plancher **WCAG 2.2 AA**. L'élément natif avant le rôle ARIA (`scrumia-html-css`).
- Tout champ a un `<label>` (le composant `TextField` l'impose). Une erreur se lie au champ
  (`aria-describedby`, fourni par Ark Field).
- Image : `alt` toujours présent (vide si décorative), `width` et `height` renseignés.
- Glyphe décoratif : `aria-hidden="true"`.
- Lien d'évitement et landmarks (`header`, `nav` nommé, `main`, `footer`) fournis par `Base.astro`.
- Contraste : vérifié sur la page réelle avec axe dans un navigateur, car jsdom ne le calcule pas.
- **SEO** : une page passe par `Base.astro` (titre, description, canonical, Open Graph, JSON-LD
  via `src/lib/seo.ts`). Un seul `h1` par page. Une page non indexable passe `isIndexable={false}`.
  `robots.txt` et `sitemap-index.xml` sont générés au build. Données structurées métier
  (boutique, producteurs) : ajouter des entrées JSON-LD `LocalBusiness`/`Product` dans `seo.ts`.
- `scripts/audit-built-site.mjs` contrôle le HTML produit (lang, title, description, canonical,
  h1 unique, alt, noms de champs, JSON-LD valide, poids des assets).
