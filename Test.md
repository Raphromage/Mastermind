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
