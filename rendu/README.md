# Mastermind — Rendu J1

## Accès et lancement

- [Jouer à la version de rendu](https://raphromage.github.io/Mastermind/rendu/).
- [Consulter le dossier du rendu sur GitHub](https://github.com/Raphromage/Mastermind/tree/main/rendu).
- Ouvrir `rendu/index.html` dans un navigateur pour jouer hors connexion, sans installation.
- Depuis ce dossier, lancer les tests avec `node tests-j1.cjs` (Node.js requis uniquement pour les tests).
- Le tag prévu pour la version remise est `jalon-1`. Son existence et sa cible seront contrôlées après la préparation.
- Document pour Cyberlearn : `jalon1_lopes.docx`, à télécharger puis déposer dans l’activité J1.

## Cadrage de la première version

Projet pédagogique : réaliser un jeu de recherche de code à quatre couleurs, avec six couleurs autorisées, répétitions possibles et dix essais. L’interface est en français, garde l’historique et affiche des indices numériques. Cette version fonctionne entièrement dans le navigateur. L’API et la capsule sont prévues plus tard et ne sont pas intégrées à ce jalon.

Ce dossier part des copies des cinq fichiers présents à la racine du dépôt au commit `ce7b92133490f9d51637c2b7a1fc32f739553eaa`. Les originaux à la racine restent inchangés. Les anciens résultats ci-dessous sont un historique copié ; la session J1 propre à ce dossier est distinguée dans la section dédiée.

## Choix avec Codex et ajout expliqué

**Choix effectué :** conserver un seul fichier HTML autonome pour le jeu et tester le moteur à l’aide de sa fonction existante de génération du secret. Cela permet d’imposer un code connu dans les tests sans ajouter de mode de triche à l’interface et sans changer les règles du jeu.

**Ajout pour J1 :** le fichier `tests-j1.cjs` extrait le moteur du HTML, fixe les conditions de départ et compare les résultats à des attendus écrits à partir des règles. La commande et sa sortie seront conservées dans `preuves-tests-j1.txt`. Aucune correction du moteur ne sera annoncée si les tests ne mettent pas d’écart en évidence.

## Scénarios J1 écrits avant exécution

| ID | Type | État de départ et action | Attendu avant exécution | État initial |
| --- | --- | --- | --- | --- |
| J1-01 | Normal | Partie neuve, secret rouge–rouge–bleu–vert ; proposer rouge–bleu–rouge–vert. | 2 bien placées, 2 mal placées ; 1 essai consommé ; proposition et indices dans l’historique. | Prévu |
| J1-02 | Limite | Partie neuve, même secret ; proposer rouge–rouge–rouge–rouge. | 2 bien placées, 0 mal placée ; 1 essai consommé, aucun rouge compté deux fois. | Prévu |
| J1-03 | Négatif | Partie neuve, même secret ; proposer seulement rouge–rouge–bleu. | Refus avec explication ; 0 essai consommé ; historique inchangé. | Prévu |
| J1-04 | Limite de fin | Neuf propositions jaunes incorrectes, puis rouge–rouge–bleu–vert. | Victoire au dixième essai, puis refus d’une nouvelle proposition sans ajout d’essai. | Prévu |
| J1-05 | Fin de partie | Dix propositions jaunes incorrectes face au même secret. | Défaite, code révélé par le moteur ; nouvelle proposition refusée, historique de dix essais conservé. | Prévu |
| J1-06 | Autres entrées invalides | Partie neuve ; proposition avec une position vide, puis une couleur interdite. | Deux refus avec explication ; historique et compteur inchangés. | Prévu |

Ces attendus sont conservés tels qu’écrits avant les essais. Les observations seront ajoutées séparément après l’exécution.


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


## Session J1 du 20 novembre 2026 — Résultats propres au dossier rendu

- **Type :** automatisé, assertions Node.js sur le moteur extrait de `rendu/index.html`.
- **Version effectivement testée :** [commit e20b5e2](https://github.com/Raphromage/Mastermind/commit/e20b5e2955087a11505acc437ed69c9bd38eae7b).
- **Fichier du jeu :** blob Git `01484bc4b264f3790bfe4a8f3adfaac98798cb4a`. Le script vérifie cet identifiant avant les scénarios.
- **État initial :** nouvelle partie et secret rouge–rouge–bleu–vert, sauf la préparation explicite des essais de fin de partie. Chaque scénario crée sa propre partie.
- **Commande :** `node tests-j1.cjs e20b5e2955087a11505acc437ed69c9bd38eae7b` depuis `rendu`.
- **Exécution :** 20/11/2026 à 18:56:49, Europe/Zurich (17:56:49 UTC).
- **Preuve conservée :** [preuves-tests-j1.txt](preuves-tests-j1.txt), sortie intégrale de la commande avec six résultats et bilan `6/6 tests réussis`.
- **Antériorité des attendus :** scénarios et script enregistrés dans le commit testé avant leur exécution. Les résultats sont ajoutés après l’exécution dans un commit documentaire.

| ID | Comportement vérifié | Attendu avant le test | Observé | Statut |
| --- | --- | --- | --- | --- |
| J1-01 | Cas normal | 2 bien placées, 2 mal placées ; un essai et une entrée d’historique | 2 bien placées, 2 mal placées ; 1 essai et une entrée historique conformes | Réussi |
| J1-02 | Cas limite quatre rouges | 2 bien placées, 0 mal placée ; un essai utilisé | 2 bien placées, 0 mal placée ; 1 essai utilisé | Réussi |
| J1-03 | Cas négatif trois couleurs | Refus avec explication ; aucun essai consommé ; historique inchangé | Refus avec explication ; 0 essai utilisé et historique inchangé | Réussi |
| J1-04 | Victoire au dixième essai et blocage | Victoire au dixième essai puis refus sans modification | Victoire au dixième essai ; nouvelle proposition refusée ; dix essais conservés | Réussi |
| J1-05 | Défaite et révélation du secret | Défaite à dix essais, révélation du secret et refus après la fin | Défaite à dix essais ; secret révélé ; refus après fin sans modification historique | Réussi |
| J1-06 | Position vide et couleur interdite | Refus des deux entrées ; aucun essai consommé | Deux refus avec explication ; aucun essai consommé | Réussi |

**Conclusion :** aucun écart observé dans ces six scénarios. Aucune correction du moteur n’a été nécessaire ; l’ajout expliqué pour ce jalon est la suite de tests reproductibles et sa documentation.

### Publication et contrôle manuel

- Déploiement GitHub Pages du commit testé : terminé avec succès.
- [Jeu de rendu](https://raphromage.github.io/Mastermind/rendu/) : réponse HTTP 200 ; le contenu reçu contient le Mastermind.
- **Contrôle manuel d’un coup et de « Nouvelle partie » sur cette copie : non réalisé.** Le navigateur de contrôle ne démarre pas (erreur Windows 1920). Le contrôle HTTP ne remplace pas une partie jouée.
- Les tests manuels de novembre présents plus haut concernent les versions historiques copiées, pas une nouvelle session manuelle sur ce dossier.

### Tests prévus sans preuve d’exécution sur ce rendu

| Test prévu | Attendu | État |
| --- | --- | --- |
| Jouer un coup sur /rendu/ dans un navigateur | Une proposition valide consomme un essai et apparaît dans l’historique. | À faire manuellement avant dépôt. |
| Nouvelle partie après jeu dans le navigateur | Compteur, historique et choix réinitialisés. | À faire manuellement sur cette copie. |
| Test croisé avec un binôme | Retours reproductibles avec lien, version, étapes, attendu et observé. | Non réalisé : aucun lien de jeu de binôme fourni. |
| Petit écran et navigation au clavier | Commandes lisibles et accessibles. | Résultat non retrouvé sur cette copie. |


## Préparation de J1

Le document [jalon1_lopes.docx](jalon1_lopes.docx) contient les liens du dépôt, du jeu de rendu et le nom du tag `jalon-1`. Le détail des exigences, de leur état et des étapes humaines restantes figure dans [suivi-j1.md](suivi-j1.md).

Les fichiers du jeu et du test associés au commit testé sont conservés sans changement dans la version de remise. Les ajouts suivants portent sur les résultats et les documents. Le tag de remise doit être contrôlé dans [les tags GitHub](https://github.com/Raphromage/Mastermind/tags) et pointer vers la version finale du dossier.
