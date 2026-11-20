# Consignes de travail — Mastermind

## Repères

- Lire le README s’il existe, puis les fichiers utiles à la tâche.
- Prendre comme référence les règles communes du README, version `code-couleurs-1.0`. Les variantes commerciales du Mastermind ne remplacent pas ces règles.
- Identifier les sources de référence avant de modifier le contenu.
- Distinguer les faits établis, les hypothèses et les décisions.
- Le jeu est contenu dans `index.html`, à la racine du dépôt. Préserver son fonctionnement autonome en HTML, CSS et JavaScript, sans dépendance obligatoire ni connexion nécessaire pour jouer.
- Le dépôt GitHub est `Raphromage/Mastermind` ; le site GitHub Pages est https://raphromage.github.io/Mastermind/.
- Consulter `Test.md` pour connaître les tests déjà réalisés. Le script local `check-rules.cjs`, s’il est disponible, vérifie le moteur.

## Manière de travailler

- Limiter les changements à la demande en cours.
- Préserver les modifications existantes de l’utilisateur.
- Avancer par changements faciles à examiner et à annuler.
- Signaler une ambiguïté qui change le résultat attendu.
- Proposer une option motivée si une décision manque.
- Conserver les textes du jeu en français et des commandes utilisables au clavier, avec des libellés explicites.
- Ne pas utiliser uniquement les couleurs pour transmettre une information : conserver les noms ou lettres des couleurs et les indices numériques.
- Maintenir la cohérence entre le jeu et les règles du README ; ne pas changer une règle sans demande explicite.

## Règles du jeu à préserver

- Palette, dans cet ordre : `rouge`, `bleu`, `vert`, `jaune`, `orange`, `violet`. Ce sont les identifiants exacts à conserver dans les échanges de données.
- Chaque partie choisit au hasard un code de quatre couleurs, avec répétitions possibles. Le code reste fixe et caché pendant la partie.
- Chaque proposition comporte quatre couleurs ordonnées, modifiables avant validation. La limite est de dix essais.
- Refuser une proposition incomplète ou contenant une couleur interdite avec une explication, sans consommer d’essai ni modifier l’historique.
- Chaque proposition valide consomme un essai ; conserver les propositions et leurs indices jusqu’à la nouvelle partie.
- Compter d’abord les couleurs bien placées, puis les couleurs mal placées parmi les occurrences restantes. Chaque occurrence compte au maximum une fois. Les indices ne révèlent pas les positions.
- Quatre couleurs bien placées donnent la victoire, y compris au dixième essai. Dix propositions sans victoire donnent la défaite.
- Après victoire ou défaite, les propositions ne modifient plus la partie.
- « Nouvelle partie » génère un code et remet à zéro les essais, l’historique, les indices et la saisie.

## Vérification

- Choisir un contrôle pertinent pour chaque changement important.
- Exécuter les contrôles disponibles et examiner leurs résultats.
- Distinguer contrôle réussi, échec observé et contrôle non réalisé.
- Ne pas annoncer comme vérifié un résultat non contrôlé.
- Pour un changement du moteur, exécuter `node check-rules.cjs` depuis le dossier du projet si le script et Node.js sont disponibles. Vérifier que le script teste bien la version modifiée.
- Couvrir les deux exemples d’indices du README, les couleurs répétées, les propositions invalides, la victoire au dixième essai, la défaite après dix essais et le blocage après la fin.
- Pour un changement de l’interface, vérifier dans le navigateur la sélection des quatre couleurs, la validation, les messages, le compteur, l’historique et « Nouvelle partie ». Vérifier l’affichage sur petit écran si la mise en page change.
- Consigner systématiquement dans `Test.md` chaque test demandé par l’utilisateur, sans attendre une demande supplémentaire de documentation. Indiquer la date, la demande, le type (manuel ou automatisé), la version testée si connue, l’environnement, les actions, les résultats attendus et observés, le statut et les limites. Maintenir le journal du dépôt GitHub à jour dans le cadre de ces demandes, sauf instruction explicite contraire (par exemple : ne modifier aucun fichier). Si un test ne peut pas être exécuté, le noter comme non réalisé avec la raison ; ne jamais inventer de résultat. Conserver les tests précédents et éviter les doublons. Ne pas présenter un test automatisé comme une partie jouée dans le navigateur.
- Après une publication autorisée, vérifier le déploiement GitHub Pages et la page servie avant d’annoncer la mise en ligne.

## Limites

- Ne pas inclure de secrets ou de données privées dans les livrables.
- Ne pas publier ni supprimer définitivement sans autorisation. Une demande explicite de mise à jour sur GitHub autorise la publication des changements concernés ; une simple modification locale n’autorise pas à elle seule une publication.
- Ne pas écraser l’historique Git, les fichiers ou les modifications de l’utilisateur pour résoudre un conflit sans son accord.
- Signaler un besoin d’outil ou d’accès manquant.
- Ne pas ajouter de serveur, de collecte de données ou de dépendance externe sans besoin lié à la demande.

## Restitution

- Résumer ce qui a changé et pourquoi.
- Indiquer les contrôles exécutés et leurs résultats.
- Mentionner les limites non résolues et les décisions à prendre.
- Préciser si le changement est local, enregistré sur GitHub ou effectivement déployé sur GitHub Pages.
