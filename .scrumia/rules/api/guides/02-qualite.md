# 02 — Qualité

Depuis la racine : `make api-quality` (démarre MySQL puis lance `pnpm quality` dans `api/`).

| Outil | Commande (dans `api/`) | Rôle |
|---|---|---|
| ESLint | `pnpm lint` | règles AdonisJS + TypeScript |
| Prettier | `pnpm format` | style |
| TypeScript | `pnpm typecheck` | typage strict |
| Japa | `pnpm test` | tests `unit` et `functional` (MySQL requis : `make up`) |
| Build | `pnpm build` | compilation vers `build/` |
| Audit | `pnpm audit:deps` | vulnérabilités connues (niveau high et plus) |

- Les tests `functional` démarrent le vrai serveur ; `.env.test` ne contient que des valeurs de test.
- Tout comportement a un test. Une migration est exercée par les tests qui la touchent.
- Les secrets ne vont jamais dans le dépôt : `.env` est ignoré, `.env.example` documente.
