# Test — Journal des tests du Mastermind

Référence des règles : **code-couleurs-1.0**.

Ce fichier consigne les tests réalisés, leurs conditions et les résultats observés. Chaque nouvelle session de test doit être ajoutée à la suite, avec sa date, la version testée, les manipulations, le résultat attendu, le résultat observé et les anomalies éventuelles.

## 11 novembre 2026 — Création du jeu

### Tests automatisés du moteur

Exécution locale : `node mastermind/check-rules.cjs`.

| Cas testé | Résultat attendu et vérifié |
| --- | --- |
| Secret rouge – bleu – vert – jaune ; proposition rouge – vert – bleu – orange | 1 bien placée et 2 mal placées. |
| Secret rouge – rouge – bleu – vert ; proposition rouge – rouge – rouge – rouge | 2 bien placées et 0 mal placée ; les rouges supplémentaires ne comptent pas. |
| Proposition vide, trop courte, avec une position vide ou une couleur interdite | Refus avec explication ; aucun essai consommé et historique inchangé. |
| Secret avant la fin de partie | Non révélé par le moteur. |
| Neuf propositions incorrectes puis le bon code au dixième essai | Victoire au dixième essai. |
| Dix propositions incorrectes | Défaite au dixième essai. |
| Proposition après victoire ou défaite | Refus ; historique inchangé. |
| Création d’une nouvelle partie | Historique vide et nouveau code généré. |
| Calcul des indices sur 6 561 paires de codes | Résultats identiques à un calcul indépendant fondé sur le nombre d’occurrences de chaque couleur. |

Les 6 561 comparaisons couvrent tous les couples de codes de quatre positions utilisant trois couleurs ; elles ne constituent pas une exploration exhaustive des six couleurs.

**Bilan : tous les tests automatisés exécutés ont réussi.**

### Essai dans le navigateur local

- Une proposition vide a été refusée avec une explication, sans consommer d’essai.
- La proposition rouge – bleu – vert – jaune a été validée.
- Le compteur est passé à 1 / 10 ; la proposition et ses indices sont apparus dans l’historique.
- Résultat observé pour cette proposition : 2 bien placées et 0 mal placée.
- L’affichage du jeu a été contrôlé visuellement.

**Bilan : aucune anomalie observée sur ces manipulations.**

## 11 novembre 2026 — Vérification de la publication

- Dépôt renommé en **Raphromage/Mastermind**.
- Fichier `index.html` publié identique au fichier local du Mastermind.
- Version du jeu publiée : commit `323272f5a494f60d74b896091f527ff48b3fe8f0`.
- Adresse vérifiée : [Mastermind sur GitHub Pages](https://raphromage.github.io/Mastermind/).
- Après le déploiement, la page affiche « Mastermind », les quatre sélecteurs de couleur, le compteur 0 / 10, l’historique vide et l’annexe des règles.

**Bilan : publication du Mastermind vérifiée.**

## 19 novembre 2026 — Test du jeu publié

### Vérification du moteur

Le fichier local testé a été comparé au fichier `index.html` de la branche `main` sur GitHub : contenus identiques. La suite automatisée décrite ci-dessus a ensuite été relancée.

**Résultat : tous les cas ont réussi, dont les 6 561 comparaisons des indices et la victoire au dixième essai.**

### Partie de test dans le navigateur

Site : [https://raphromage.github.io/Mastermind/](https://raphromage.github.io/Mastermind/).

| Étape | Action | Résultat observé |
| --- | --- | --- |
| 1 | Ouvrir le jeu | Code caché, quatre positions vides, compteur 0 / 10 et historique vide. |
| 2 | Valider sans choisir de couleurs | Message « Proposition incomplète : choisissez les quatre couleurs avant de valider. » ; compteur et historique inchangés. |
| 3 | Choisir rouge aux quatre positions et valider | Proposition acceptée ; compteur 1 / 10 ; indice 0 bien placée et 0 mal placée. |
| 4 | Valider neuf fois supplémentaires la même proposition | Dix propositions enregistrées ; compteur 10 / 10 ; défaite annoncée. |
| 5 | Examiner la fin de partie | Secret révélé : jaune – jaune – violet – orange. Les quatre sélecteurs et le bouton de validation sont désactivés. |
| 6 | Cliquer sur « Nouvelle partie » | Compteur 0 / 10 ; historique effacé ; sélections remises à « Choisir… » ; code de nouveau caché ; validation réactivée. |

**Bilan : aucune anomalie détectée dans les cas exécutés.**

### Limites de cette session

- La victoire au dixième essai et le refus des couleurs interdites ont été vérifiés par le moteur automatisé, pas par une partie gagnante dans le navigateur.
- Le contrôle ne couvre pas tous les navigateurs, toutes les tailles d’écran, ni un audit complet d’accessibilité.

## Format pour les prochaines sessions

Pour chaque nouvelle partie ou série de tests, ajouter une entrée datée contenant :

- Version ou commit testé et environnement utilisé.
- Actions et propositions effectuées.
- Résultats attendus puis observés.
- Statut : réussi, échec ou non testé.
- Anomalies constatées et éventuelles corrections à vérifier.

## 20 novembre 2026 — Secret imposé rouge–rouge–bleu–vert

**Demande :** tester le jeu avec le code secret rouge–rouge–bleu–vert.


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

