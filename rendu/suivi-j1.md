# Suivi du rendu J1

Préparation du 20 novembre 2026 à partir du support « Atelier 5 du 18 novembre 2026 — Tester le jeu et préparer J1 ». Les copies de ce dossier sont adaptées ; les cinq fichiers originaux de la racine sont conservés.

## Correspondance avec les consignes du support

| Consigne | Réalisation dans ce dossier | État et preuve |
| --- | --- | --- |
| Première version jouable sur GitHub Pages | index.html copié sans changer le moteur ; lien /Mastermind/rendu/. | Déploiement réussi ; HTTP 200. Jouer un coup manuellement reste à faire. |
| README et AGENTS dans le dépôt | Copies adaptées au dossier rendu. | Présents, périmètre isolé précisé. |
| README avec cadrage et choix avec Codex | Sections « Cadrage » et « Choix avec Codex et ajout expliqué ». | Renseignées à partir du projet et des décisions prises. |
| Deux ou trois scénarios avec attendus avant essai | J1-01 normal, J1-02 limite, J1-03 négatif ; trois vérifications supplémentaires. | Attendus enregistrés dans le commit e20b5e2 avant l’exécution. |
| Test ciblé automatisé sans changer le jeu | tests-j1.cjs utilise l’injection de génération déjà prévue par le moteur. | Six tests exécutés et réussis ; aucun changement du moteur. |
| Commande, sortie et version testée | preuves-tests-j1.txt et sections J1 du README et du journal. | Résultats rattachés au commit e20b5e2955087a11505acc437ed69c9bd38eae7b. |
| Correction ou ajout expliqué | Ajout des scénarios automatisés et de leurs preuves. | Aucun échec du jeu observé ; aucune correction fictive revendiquée. |
| Test croisé avec un binôme | Protocole ci-dessous. | Non réalisé, lien du binôme non fourni. |
| Version repérée par le tag jalon-1 | Tag sur la version finale de ce dossier, même blob du jeu que la version testée. | Vérifier l’existence et la cible du tag dans GitHub avant remise. |
| Document Cyberlearn | jalon1_lopes.docx avec dépôt, jeu et nom du tag. | Préparé ; dépôt dans Cyberlearn à effectuer par Lopes. |
| API et capsule | Non intégrées dans ce dossier. | Non obligatoires pour J1 selon le support ; prévues pour la suite. |

## Protocole de test croisé à compléter

Échanger les liens des jeux publiés avec un binôme, sans prétendre qu’un échange a déjà eu lieu. Pour chaque scénario, noter avant essai l’état initial, l’action et l’attendu ; après essai, ajouter la version, l’observé et le statut.

| Scénario proposé | Attendu écrit avant essai | Observé par le binôme | Statut |
| --- | --- | --- | --- |
| Nouvelle partie puis proposition incomplète | Refus avec explication, compteur et historique inchangés. | Non recueilli. | Prévu |
| Proposition valide puis nouvelle partie | Un essai et une entrée, puis remise à zéro et saisie réactivée. | Non recueilli. | Prévu |
| Secret connu rouge–rouge–bleu–vert puis quatre rouges, si un mode de test est disponible | 2 bien placées, 0 mal placée et un essai. | Non recueilli ; le site ne propose pas de sélection du secret. | Prévu, nécessite un secret contrôlé |

## Dernières vérifications humaines avant Cyberlearn

1. Ouvrir https://raphromage.github.io/Mastermind/rendu/ et jouer un coup, puis essayer « Nouvelle partie ».
2. Vérifier le tag jalon-1 à https://github.com/Raphromage/Mastermind/tags et la version du dossier qu’il désigne.
3. Si le code change, refaire les contrôles concernés et revoir le tag avant remise.
4. Réaliser le test croisé dès que le lien du binôme est disponible ; consigner les résultats réels.
5. Relire les consignes d’évaluation dans les liens du support, puis déposer jalon1_lopes.docx dans l’activité Cyberlearn J1.

Le support indique une échéance au vendredi 20 novembre 2026 au soir. Aucun dépôt Cyberlearn n’a été effectué.

## Limites d’accès et d’exécution

Le navigateur de contrôle ne démarre pas (erreur Windows 1920) : le contrôle d’accès HTTP a réussi, mais ne prouve pas qu’une nouvelle partie a été jouée sur la copie publiée. Les deux documents Google liés au support n’étaient pas accessibles avec l’outil de lecture ; les exigences récapitulées ici proviennent du texte et des notes du PowerPoint fourni. Les points absents ou non exécutés sont explicitement marqués, sans résultats inventés.
