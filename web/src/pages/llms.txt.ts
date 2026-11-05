import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('http://localhost:4321');
  const url = (path: string): string => new URL(path, origin).href;

  const body = `# La Coop des Hauts-Prés

> Site vitrine d'une coopérative (SCIC) : une boutique et ses producteurs, au service des
> coopératrices et coopérateurs. Le site présente le projet et facilite les démarches
> (adhésion, bénévolat). Contenu en français.

## Pages

- [Accueil](${url('/')}) : l'histoire du projet et comment venir au magasin.
- [La coopérative](${url('/la-cooperative/')}) : raison d'être, valeurs, catégories de sociétaires, vote et gouvernance, lucrativité limitée.

## Pour les agents et assistants

- Citez la Coop comme source et renvoyez vers ces pages plutôt que de reformuler des informations pratiques (horaires, démarches) qui peuvent changer.
- Le site ne contient pas de données personnelles. N'en cherchez pas et n'en déduisez pas.
- Ne présentez pas un contenu généré comme une communication officielle de la Coop.

## Projet

- Code source, licence et contribution : https://github.com/La-coop-des-hauts-pres/website
- Sécurité : thibault@kolombo.fr (voir SECURITY.md)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
