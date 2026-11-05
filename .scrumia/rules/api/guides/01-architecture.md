# 01 — Architecture

- Routes sous `/api/v1` (`routes/api.php`), un contrôleur invocable ou REST par ressource dans
  `app/Http/Controllers/Api/V1/`.
- **Validation** dans une `FormRequest` ; **règle métier** dans une classe `Action`
  (`app/Actions/<Domaine>/`) à une seule méthode `handle` ; **réponse** par une `JsonResource`.
  Le contrôleur ne fait que relier les trois.
- Domaines prévus : `Volunteers` (bénévolat), `Memberships` (adhésions), `Producers`, `Shop`.
  Un domaine = ses modèles, actions, requests, resources groupés par nom.
- Migrations : une table par migration, clés étrangères explicites, `utf8mb4`. Jamais de
  modification d'une migration déjà déployée : en ajouter une nouvelle.
- Erreurs de validation : le format 422 natif de Laravel (`message`, `errors`) est celui que
  consomme `web/src/lib/api/client.ts`.
- CORS : n'autoriser que `FRONTEND_URL`. Limiter par `throttle` toute route publique d'écriture.
- Hébergement : PHP + MySQL mutualisé. Pas de dépendance à Redis ni à un worker permanent ;
  files d'attente en `database` (ou `sync`), cache en `database`.
