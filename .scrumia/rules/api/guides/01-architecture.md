# 01 — Architecture

- Routes sous `/api/v1` (`start/routes.ts`), un contrôleur par ressource dans `app/controllers/`
  (`#controllers/*`). `/up` est la sonde de disponibilité sans base de données.
- **Validation** par un validateur VineJS (`app/validators/`) ; **règle métier** dans un service
  (`app/services/<domaine>/`) ; **réponse** composée dans le contrôleur. Le contrôleur ne fait
  que relier les trois.
- Domaines prévus : `volunteers` (bénévolat), `memberships` (adhésions), `producers`, `shop`.
  Un domaine = ses modèles, services et validateurs groupés par nom.
- Migrations Lucid (`database/migrations/`) : une table par migration, clés étrangères
  explicites, `utf8mb4`. Jamais de modification d'une migration déjà déployée.
- Erreurs de validation : le format 422 natif d'AdonisJS (`errors[]`) est celui que consomme
  `web/src/lib/api/client.ts`.
- Toute l'API répond en JSON, y compris pour une route inconnue (`app/exceptions/handler.ts`).
- CORS : désactivé hors développement (même origine). Limiter par un limiteur de débit toute
  route publique d'écriture.
- Le site statique Astro est copié dans `api/public/` au déploiement et servi par
  `@adonisjs/static` ; une page inconnue renvoie `404.html`.
- Hébergement : Plesk (extension Node.js) + MySQL. Pas de Redis ni de worker obligatoire.
