# Mastermind

## Version Jalon 1 à la racine

- Le fichier du jeu est `jalon-1.html` : [jouer au Mastermind](https://raphromage.github.io/Mastermind/jalon-1.html).
- `index.html` conserve l’accès par l’adresse habituelle en redirigeant vers le jeu renommé.
- Pour jouer hors connexion, ouvrir `jalon-1.html` directement.
- Dans les consignes, `jalon-1` est le nom d’un tag Git qui doit repérer un commit précis. Le renommage du fichier demandé ici est une opération distincte.
- [Tags du dépôt](https://github.com/Raphromage/Mastermind/tags) : vérifier que le tag `jalon-1` pointe sur la version de la racine à remettre. Le résultat de la création est indiqué dans la restitution de cette demande.
- Le dossier `rendu/` conserve sa copie indépendante et n’est pas modifié par ce renommage.

## Annexe — Règles communes

Cette variante pédagogique s’inspire du [Mastermind](https://instructions.hasbro.com/fr-fr/instruction/mastermind-board-game-for-families-and-kids-the-classic-code-cracking-game-family-gifts-family-games). Pour le projet, les règles ci-dessous font foi ; elles ne reprennent pas toutes les variantes commerciales.

1. La palette est commune : rouge, bleu, vert, jaune, orange, violet. Ce sont aussi les six identifiants exacts de l’API, en minuscules, dans cet ordre. Au début, l’application choisit au hasard quatre de ces couleurs, avec répétitions possibles. Cette combinaison reste fixe et cachée.
2. La personne dispose de dix essais. Chaque proposition comporte quatre couleurs ordonnées de gauche à droite, modifiables avant validation.
3. Une proposition incomplète ou contenant une couleur non autorisée est refusée avec une explication, sans consommer d’essai ni modifier l’historique.
4. Chaque proposition valide consomme un essai. La proposition et ses indices restent consultables jusqu’à la nouvelle partie.
5. L’indice donne deux nombres : couleurs bien placées et couleurs présentes mais mal placées. Comptez d’abord les bien placées, puis les mal placées parmi les occurrences restantes. Chaque occurrence du secret et de la proposition compte au maximum une fois. Les indices ne désignent pas les positions concernées.
6. Quatre couleurs bien placées donnent la victoire, même au dixième essai. Après dix propositions sans victoire, la partie est perdue.
7. Après victoire ou défaite, les propositions ne changent plus la partie. « Nouvelle partie » choisit un code et remet à zéro les essais, l’historique et les indices.

## Deux exemples d’indices

Secret : rouge – bleu – vert – jaune.

Proposition : rouge – vert – bleu – orange.

Résultat : 1 couleur bien placée et 2 mal placées.

Secret : rouge – rouge – bleu – vert.

Proposition : rouge – rouge – rouge – rouge.

Résultat : 2 couleurs bien placées et 0 mal placée. Les deux rouges supplémentaires ne comptent pas.

## Test automatisé — Secret rouge–rouge–bleu–vert

Test réalisé le **20 novembre 2026** sur le moteur du jeu, avec un générateur déterministe imposant le secret **rouge–rouge–bleu–vert**. Le fichier testé était identique à la version GitHub d’`index.html` (blob `01484bc4b264f3790bfe4a8f3adfaac98798cb4a`).

Chaque ligne de proposition ci-dessous correspond à une partie indépendante utilisant ce même secret.

| Proposition ou comportement vérifié | Résultat attendu | Résultat observé | Statut |
| --- | --- | --- | --- |
| rouge–rouge–rouge–rouge | 2 bien placées, 0 mal placée | 2 bien placées, 0 mal placée | Réussi |
| bleu–vert–rouge–rouge | 0 bien placée, 4 mal placées | 0 bien placée, 4 mal placées | Réussi |
| rouge–bleu–rouge–vert | 2 bien placées, 2 mal placées | 2 bien placées, 2 mal placées | Réussi |
| rouge–rouge–bleu–bleu | 3 bien placées, 0 mal placée | 3 bien placées, 0 mal placée | Réussi |
| jaune–orange–violet–jaune | 0 bien placée, 0 mal placée | 0 bien placée, 0 mal placée | Réussi |
| rouge–rouge–bleu–vert | 4 bien placées et victoire | 4 bien placées et victoire | Réussi |
| Neuf erreurs puis le code exact au dixième essai | Victoire au dixième essai | Victoire ; historique de dix essais | Réussi |
| Nouvelle proposition après cette victoire | Refus sans ajout à l’historique | Refus ; historique toujours de dix essais | Réussi |

**Portée :** tests automatisés du moteur, exécutés avec `node test-secret.cjs` en local. Il ne s’agit pas d’une partie jouée dans le navigateur. Le code secret du site GitHub Pages n’a pas été modifié.
