# 03 — RGPD

Le site collecte des dossiers de personnes (identité, contact, parfois disponibilités ou
cotisation). Règles de socle, à préciser dans les specs de chaque formulaire :

1. **Minimisation** : ne stocker que ce que la finalité exige ; chaque champ est justifié dans la
   spec (`features/api/<feature>/`).
2. **Base légale et finalité** nommées par formulaire, avec le texte d'information affiché.
3. **Consentement** explicite et horodaté quand c'est la base légale (case non pré-cochée).
4. **Durée de conservation** définie par type de dossier, purge planifiée (commande artisan).
5. **Droits** : export et suppression d'un dossier doivent rester possibles (commande ou route
   protégée) ; prévoir `SoftDeletes` seulement si la durée légale l'exige.
6. **Sécurité** : jamais de donnée personnelle dans les logs ni les messages d'erreur ;
   chiffrement (`encrypted` cast) des champs sensibles ; HTTPS imposé en production.
7. **Sous-traitants** (hébergeur, mail) listés dans la documentation légale du site.
