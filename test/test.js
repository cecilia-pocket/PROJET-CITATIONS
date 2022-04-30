const a = 
    { "quote": "J'ai connu une polonaise qui en prenait au petit déjeuner...",
      "character": "Fernand Naudin",
      "image": "tonton.jpg",
      "characterDirection": "Right",
      "origin": "Les tontons flingueurs",
      "addedBy": "p132456789"
    };

const b =
    { "quote": "In theory, Communism works! In theory.",
      "character": "Homer Simpson",
      "image": "homer.jpg",
      "characterDirection": "Right",
      "origin": "Les Simpsons",
      "addedBy": "p132456789"
    };

const c =
    { "quote": "Va te faire shampouinner.",
      "character": "Bart Simpson",
      "image": "bart.jpg",
      "characterDirection": "Right",
      "origin": "Les Simpsons",
      "addedBy": "p132456789"
    };

const t = [a, b, c];

document.addEventListener('DOMContentLoaded', function(){
  // initialisation de Mocha
  mocha.setup('tdd');

  // Tests unitaires pour le projet
  suite("Tests pour la fonction triCharacter",
        function() { // la suite est mise en place via un callback
          // Un premier test
          test("On vérifie que le résultat ne contient que des noms croissants",
            function() {
              const ordre = "croissant";
              const resultat_attendu = [c, a, b];
              chai.assert.deepEqual(triCharacter(t, ordre), resultat_attendu);
            });

          test("On vérifie que le résultat ne contient que des noms décroissants",
            function() {
              const ordre = "decroissant";
              const resultat_attendu = [b, a, c];
              chai.assert.deepEqual(triCharacter(t, ordre), resultat_attendu);
            });
        });

  suite("Tests pour la fonction triCitations",
        function() {
          test("On vérifie que le résultat ne contient que des citations croissantes",
            function() {
              const ordre = "croissant";
              const resultat_attendu = [b, a, c];
              chai.assert.deepEqual(triCitations(t, ordre), resultat_attendu);
            });

          test("On vérifie que le résultat ne contient que des noms décroissants",
            function() {
              const ordre = "decroissant";
              const resultat_attendu = [c, a, b];
              chai.assert.deepEqual(triCitations(t, ordre), resultat_attendu);
            });
        });

  suite("Tests pour la fonction nombreAleatoire",
        function() {
          test("On vérifie que le résultat est bien différent de l'argument exception",
            function() {
              const nombre = nombreAleatoire(5, 0);
              chai.assert.notEqual(nombre, 0);
            });
          
          test("On vérifie que le résultat est bien compris entre 1 et 3",
            function() {
              const nombre = nombreAleatoire(3,0);
              chai.assert.isAbove(nombre, 0);
              chai.assert.isAtMost(nombre, 3);
            });
        });

  mocha.checkLeaks();
  mocha.globals(['jQuery']);
  mocha.run();

}, false);