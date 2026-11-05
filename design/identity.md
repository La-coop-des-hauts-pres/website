# Identité — le croquis d’abord

L’accueil se concentre sur le dessin fourni par le projet : une carotte asymétrique, ses
feuilles et petits personnages, le lettrage manuscrit, les mots « bio, local, social » et le ver.
Pas de slogan ajouté, de blocs éditoriaux ou de typographie de substitution dans le logo.

Le fichier `web/public/identite/carotte-calquee.png` est une retouche du croquis réalisée
avec l’outil d’image intégré : extraction du dessin inférieur, nettoyage du papier et des
ombres, reprise des contours au trait épais et irrégulier. La photo originale n’est pas modifiée.
Le tracé doit être relu avec l’auteur du dessin ; il ne s’agit pas d’un calque mathématique.

Deux couleurs à l’écran : un rose corail et une encre rouge terre, définis dans `tokens.css`.
Le PNG transparent sert de masque CSS afin de conserver le trait et de choisir l’encre sans
le redessiner. Aucun SVG géométrique ne remplace le dessin.

Un léger déplacement suit le curseur sur les périphériques à pointeur précis ; il est désactivé
avec la préférence système de réduction des animations et sur écran tactile.
Seuls le lieu, un lien vers la coopérative et le contact restent visibles autour du dessin.

## Variante avec balançoire

`web/public/identite/carotte-balancoire.png` ajoute trois petits enfants à droite, au-dessus
de « BIO », dont un sur une balançoire suspendue à la feuille. Cette variante est conservée pour comparaison. `carotte-calquee.png` conserve la première reprise, sans cette scène.
La favicon reprend ce dessin plus simple.

## Portique façon cure-dents

`web/public/identite/carotte-portique.png` est la variante affichée sur l’accueil : la balançoire
a son propre petit portique planté dans la terre. Les cordes ne s’attachent plus à la feuille.
Les enfants, la carotte, le lettrage et le trait à main levée sont conservés.
