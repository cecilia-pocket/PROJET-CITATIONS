# Projet 2021 - Duels de citations

Ceci est un projet réalisé dans le cadre de l'enseignement Programmation Fonctionnelle à l'université Claude Bernard Lyon 1, au printemps 2021.
Ce projet consiste à concevoir la partie client d'une application de classement des meilleures citations issues de séries et de films, entièrement en *JavaScript*.

## Lien des consignes

http://emmanuel.coquery.pages.univ-lyon1.fr/enseignement/lifap5/projet_2021p/

## Étudiants

- Cécilia NGUYEN  
- K. C.

## Fonctionnalités implémentées

**1. Affichage de l’ensemble des citations du serveur** : toutes les citations du serveur sont récupérées puis affichées sous forme de tableau dans l'onglet "Toutes les citations" avec pour seulement visibles à vue d'oeil la citation et le personnage qui a dit cette citation.  

**2. Affichage d’un duel aléatoire** : deux citations sont tirées au hasard parmi toutes celles présentes sur le serveur et elles sont ensuite affichées dans l'onglet "Voter". Les images sont orientées de sorte à se confronter pour chaque duel. Un tirage est fait à chaque fois que la page est rafraîchie ou que l'utilisateur vote.

**3. Vote** : l'utilisateur peut voter pour sa citation préférée à chaque duel. La citation choisie gagne un point de victoire zéro point de défaite. La citation adverse gagne un point de défaite et zéro point de victoire. Les scores sont comptabilisés sur le serveur.

**4. Détails d'une citation** : les détails d'une citation (image, citation, personnage, direction du personnage, origine, contributeur) sont récupérés et affichés dans une fenêtre modale après avoir cliqué sur "Détails" à côté d'une citation du tableau.

**5. Filtre de citation** : dans l'onglet "Toutes les citations", une barre de recherche permet de filtrer toutes les citations avec un personnage précis (ex: Bart Simpson) ou de chercher une citation particulière (ex: They taste like...burning.).

**6. Tri de citation** : les citations peuvent être triées par ordre alphabétique ou inversement en cliquant sur la flèche correspondante à côté du nom de la colonne.

## Fonctions non-terminées

**1. Connexion** : l'utilisateur peut saisir sa clé d'API dans la fenêtre modale de connexion, cette clé est ensuite vérifiée en utilisant les données du serveur. Si la clé n'est pas correcte ou si elle est vide, le bouton "Connexion" reste, sinon il est remplacé par le bouton "Déconnexion" et le login de l'utilisateur est aussi affiché à côté.

**2. Tableau des scores** : dans la fenêtre modale des détails, un tableau des scores est également ajouté. Chaque ligne représente le nombre de victoires et de défaites contre une citation adverse.
