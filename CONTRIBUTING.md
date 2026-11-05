# Contribuer

Toutes les contributions sont les bienvenues : code, idées, retours d'usage, textes,
accessibilité, traductions. Il n'est pas nécessaire d'être développeuse ou développeur.

En contribuant, vous acceptez le [code de conduite](CODE_OF_CONDUCT.md) et la
[licence](LICENSE) (article 4 pour les contributions).

## Discuter d'abord

- **Une idée, une question, un sujet :** ouvrez une *issue*.
- **Plus simple encore :** venez en parler directement au magasin, ou contactez
  Thibault (thibault@kolombo.fr), qui se rend facilement disponible.
- **Une faille de sécurité ou une donnée personnelle exposée :** n'ouvrez pas d'issue,
  suivez [SECURITY.md](SECURITY.md).

Pour une nouvelle fonctionnalité, parlons-en avant d'écrire du code : cela évite un
travail qui ne pourrait pas être retenu.

## Proposer une modification (PR)

1. Créez un fork et une branche à partir de `main`.
2. Faites une modification ciblée, une idée par PR.
3. Ajoutez un test pour tout comportement nouveau ou corrigé.
4. Lancez `make quality` : il doit rester vert.
5. Ouvrez la PR en expliquant le *pourquoi*.

Les conventions techniques sont dans `.scrumia/rules/web/` et `.scrumia/rules/api/`.
Le démarrage local est décrit dans le [README](README.md). Quelques règles clés :

- aucune valeur visuelle en clair : toujours un jeton de `design/tokens.css` ;
- composant interactif = Ark UI/Zag, jamais réécrit à la main ;
- accessibilité (RGAA/WCAG) et sobriété : pas de pistage, pas de dépendance superflue ;
- messages de commit clairs, de préférence en style `type(portée): résumé`.

## La Coop décide

La Coop se réserve le droit d'accepter ou de refuser toute contribution, notamment si
elle ne correspond pas à ce qu'elle souhaite communiquer, à son image ou à ses valeurs.
Un refus n'est pas un jugement sur votre travail : nous l'expliquerons.

## Vie privée et respect des visiteurs

Le but du site est de communiquer et de faciliter la vie des coopératrices et coopérateurs.
Chaque contribution doit donc :

- respecter le RGPD : ne collecter que le nécessaire, informer, pouvoir supprimer
  (voir `.scrumia/rules/api/guides/03-rgpd.md`) ;
- n'ajouter aucun traceur ni service tiers sans accord explicite de la Coop ;
- ne jamais mettre de vraies données personnelles dans le code, les tests, les captures
  ou les issues (utilisez des données fictives) ;
- s'exprimer avec respect et bienveillance, envers les visiteurs comme entre
  contributeurs.
