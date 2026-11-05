# 02 — Qualité

Depuis la racine : `make api-quality` (dans le conteneur) ; depuis `api/` avec PHP local :
`composer quality`.

| Outil | Commande | Rôle |
|---|---|---|
| Pint | `composer lint` / `composer format` | style (preset Laravel + strict_types, final) |
| PHPStan + Larastan | `composer analyse` | typage statique, niveau max |
| Rector | `composer refactor` | modernisation PHP 8.5 / Laravel (dry-run en CI) |
| Pest | `composer test` | tests (classes PHPUnit exécutées par Pest, en parallèle) |
| Couverture | `composer test:coverage` | seuil 80 % (nécessite pcov/xdebug) |
| Audit | `composer security` | vulnérabilités connues des dépendances |

- Les tests `Feature` utilisent `RefreshDatabase` dès qu'une migration est en jeu : cela exécute
  les migrations sur sqlite et attrape les migrations cassées.
- `roave/security-advisories` bloque l'installation d'un paquet vulnérable.
- Les secrets ne vont jamais dans le dépôt : `.env` est ignoré, `.env.example` documente.
