/* *************************************************************************
 * Constantes de configuration
 * ************************************************************************* */

const apiKey = "bd9e0df6-a7d1-4f91-8f4c-6e1f189cd3e4";
const serverUrl = "https://lifap5.univ-lyon1.fr";
const citationsUrl = `${serverUrl}/citations`;
const duelsUrl = `${citationsUrl}/duels`;

/* *************************************************************************
 * Gestion des tabs "Voter" et "Toutes les citations"
 * ************************************************************************* */

/**
 * Affiche/masque les divs "div-duel" et "div-tout"
 * selon le tab indiqué dans l'état courant.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majTab(etatCourant) {
  console.log("CALL majTab");
  const dDuel = document.getElementById("div-duel");
  const dTout = document.getElementById("div-tout");
  const tDuel = document.getElementById("tab-duel");
  const tTout = document.getElementById("tab-tout");
  if (etatCourant.tab === "duel") {
    dDuel.style.display = "flex";
    tDuel.classList.add("is-active");
    dTout.style.display = "none";
    tTout.classList.remove("is-active");
  } else {
    dTout.style.display = "flex";
    tTout.classList.add("is-active");
    dDuel.style.display = "none";
    tDuel.classList.remove("is-active");
  }
}

/**
 * Mets au besoin à jour l'état courant lors d'un click sur un tab.
 * En cas de mise à jour, déclenche une mise à jour de la page.
 *
 * @param {String} tab le nom du tab qui a été cliqué
 * @param {Etat} etatCourant l'état courant
 */
function clickTab(tab, etatCourant) {
  console.log(`CALL clickTab(${tab},...)`);
  if (etatCourant.tab !== tab) {
    etatCourant.tab = tab;
    majPage(etatCourant);
  }
}

/**
 * Enregistre les fonctions à utiliser lorsque l'on clique
 * sur un des tabs.
 *
 * @param {Etat} etatCourant l'état courant
 */
function registerTabClick(etatCourant) {
  console.log("CALL registerTabClick");
  document.getElementById("tab-duel").onclick = () =>
    clickTab("duel", etatCourant);
  document.getElementById("tab-tout").onclick = () =>
    clickTab("tout", etatCourant);
}

/* *************************************************************************
 * Affichage de l'ensemble des citations du serveur
 * ************************************************************************* */

/**
 * Charge les citations depuis le serveur.
 */
function recupeCitations(url, callback) {
  console.log("CALL recupCitations");
  return fetch(url)
    .then((response) => response.json())
    .then(callback);
}

/**
 * Affiche une ligne avec un numéro de classement
 * un personnage et une citation.
 * @param {Object} citations une citation
 * @param {Int} i numéro de classement
 *
 * @returns affiche un tableau HTML présentant un numéro de classement
 * un personnage et une citation.
 */
function afficheCitations(citations, i) {
  i++;
  return `<tr>
            <td>${i}</td>
            <td>${citations.character}</td>
            <td>${citations.quote}</td>
            <td><a id="btn-open-detail-modal" class="button is-light"
            onclick="recupeIdCitation('${citations._id}');">Détails</a></td>
          </tr>`;
}

/**
 * Affiche tout le tableau de citations.
 * @param {Object} tabCitations tableau de citations
 *
 * @returns un nouveau tableau HTML contenant les informations du
 * tableau de citations
 */
function mapCitations(tabCitations) {
  const nouveauTab = tabCitations.map(afficheCitations).join('');
  return nouveauTab;
}

/* *************************************************************************
 * Filtre des Citations
 * ************************************************************************* */

/**
 * Filtre les citations selon la valeur du champ texte search.
 * @param {Object} citations une citation
 * @param {Int} i numéro de classement
 *
 * @returns un nouveau tableau HTML contenant les informations du
 * tableau de citations
 */
function filtreCitations(citations, i) {
  const search = document.getElementById("search").value;
  if (search == citations.character || search == citations.quote ||
    search == "") {
    return afficheCitations(citations, i);
  }
}

/**
 * Affiche/masque les divs de recherche "search"
 * et "but-search" selon le tab indiqué dans l'état courant.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majRecherche(etatCourant) {
  const search = document.getElementById("search");
  const bsearch = document.getElementById("but-search");
  if (etatCourant.tab === "duel") {
    search.style.display = "none";
    bsearch.style.display = "none";
  } else {
    search.style.display = "flex";
    bsearch.style.display = "flex";
  }
}

/**
 * Affiche tout le tableau de citations filtré.
 * @param {Object} tabCitations tableau de citations
 *
 * @returns un nouveau tableau HTML contenant les informations du
 * tableau de citations filtré
 */
function mapFiltreCitations(tabCitations) {
  const nouveauTab = tabCitations.map(filtreCitations).join('');
  return nouveauTab;
}

/* *************************************************************************
 * Détails citation
 * ************************************************************************* */

/**
 * Affiche le détail d'une citation dans la fenêtre modale.
 * @param {Object} citation une citation
 */
function afficheDetailCitation(citation) {
  console.log("CALL DETAIL");
  const detail = document.getElementById("elt-affichage-detail");
  detail.innerHTML = `<img src=\"${citation.image}\"><br>
  <u>Citation</u> : ${citation.quote}<br>
  <u>Personnage</u> : ${citation.character}<br>
  <u>Direction du personnage</u> : ${citation.characterDirection}<br>
  <u>Origine</u> : ${citation.origin}<br>
  <u>Contributeur</u> : ${citation.addedBy}<br>
  <u>Scores</u> :` + tableauScores(citation.scores);
}

/**
 * Ouvre la fenêtre modale des détails d'une citation.
 */
function openModal() {
  const modal = document.querySelector('#mdl-detail');
  modal.classList.add('is-active');
}

/**
 * Remplit la fenêtre modale avec les détails de la citation.
 * @param {String} id _id de la citation
 */
function recupeIdCitation(id) {
  console.log("CALL recupeIdCitation");
  fetch(citationsUrl + "/" + id, {
    method:'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
  })
  .then(res => res.json())
  .then(data => citat = data)
  .then(() => {
    console.log(citat);
    openModal();
    afficheDetailCitation(citat);
  })
}

/* *************************************************************************
 * Tableau de scores
 * ************************************************************************* */

/**
 * Affiche la tableau de scores.
 * @param {Object} tabScores le tableau de scores de la citation correspondante
 *
 * @returns un tableau HTML présentant les scores
 */
function tableauScores(tabScores) {
  console.log("CALL tableauScores");
  return `<table class="table is-bordered">
    <thead>
      <tr>
        <th>Citation adverse</th>
        <th>Victoires</th>
        <th>Défaites</th>
      </tr>
    </thead>
    <tbody id="tabscores">` + mapScoresCitations(tabScores) + `
    </tbody>
  </table>`
}

/*
function recupeUneCitation(id) {
  console.log("CALL recupeUneCitation");
  return fetch(citationsUrl + "/" + id, {
    method:'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
  })
  .then(res => res.json())
  .then(citation => {
    //console.log(citation.quote);
    return citation.quote;
  });
}*/

/**
 * Affiche une ligne de scores contre une citation adverse particulière.
 * @param {Object} tabScores le tableau de scores de la citation correspondante
 * @param {String} adversaire _id de la citation adverse
 *
 * @returns une ligne de tableau HTML contenant les scores
 */
function afficheScoresCitation(tabScores, adversaire) {
  return `<tr><td>${adversaire}</td><td>${tabScores[adversaire].wins}</td>
  <td>${tabScores[adversaire].looses}</td></tr>`;
}

/**
 * Affiche une ligne vide par défaut dans le tableau de scores.
 *
 * @returns une ligne de tableau HTML vide
 */
function affichePasScoresCitation() {
  return `<tr><td><i>Aucun adversaire...</i></td><td><i>Aucune...</i></td>
  <td><i>Aucune...</i></td></tr>`;
}

/**
 * Affiche le tableau de scores entier s'il n'est pas vide.
 * @param {Object} tabScores le tableau de scores de la citation correspondante
 *
 * @returns le tableau de scores entier
 */
function mapScoresCitations(tabScores) {
  console.log("CALL mapScoresCitations");
  if(tabScores != undefined) {
    const adversaires = Object.keys(tabScores);
    const nouveauTab = adversaires.map(x =>
      afficheScoresCitation(tabScores, x)).join('');
    return nouveauTab;
  } else {
    return affichePasScoresCitation();
  }
}

/* *************************************************************************
 * Gestion de la boîte de dialogue (a.k.a. modal) d'affichage du
 * détail d'une citation.
 * ************************************************************************* */

/**
 * Affiche ou masque la fenêtre modale du détail d'une citation en fonction
 * de l'état courant.
 * Change la valeur du texte affiché en fonction de l'état.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majModalDetail(etatCourant) {
  const modalClasses = document.getElementById("mdl-detail").classList;
  if (etatCourant.citationModal) {
    modalClasses.add("is-active");
  } else {
    modalClasses.remove("is-active");
  }
}

/**
 * Déclenche l'affichage de la boîte de dialogue du détail d'une citation.
 * @param {Etat} etatCourant
 */
function clickFermeModalDetail(etatCourant) {
  etatCourant.citationModal = false;
  majPage(etatCourant);
}
/**
 * Déclenche la fermeture de la boîte de dialogue du détail d'une citation.
 * @param {Etat} etatCourant
 */
function clickOuvreModalDetail(etatCourant) {
  etatCourant.citationModal = true;
  majPage(etatCourant);
}

/**
 * Enregistre les actions à effectuer lors d'un click sur le bouton
 * d'ouverture de la boîte de dialogue affichant le detail d'une citation.
 * @param {Etat} etatCourant
 */
function registerDetailModalClick(etatCourant) {
  document.getElementById("btn-close-detail-modal1").onclick = () =>
    clickFermeModalDetail(etatCourant);
  document.getElementById("btn-close-detail-modal2").onclick = () =>
    clickFermeModalDetail(etatCourant);
}

/* *************************************************************************
 * Vote
 * ************************************************************************* */

/**
 * Fait une requête POST vers /citations/duels.
 * @param {Url} url lien du chemin vers les duels
 * @param {String} gagnant _id de la citation gagnante
 * @param {String} perdant _id de la citation perdante
 *
 * @returns un duel avec les nouveaux scores
 */
function envoieDuel(url, gagnant, perdant) {
  console.log("CALL recupDuels");
  const init = {
    method: 'POST',
    headers: {
      'x-api-key': apiKey, 'Content-Type': 'application/json'
    },
    body: JSON.stringify({'winner': gagnant, 'looser': perdant})
  };
  return fetch(url, init)
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.status && Number(jsonData.status) != 200) {
        return {
          err: jsonData.message
        };
      }
      return jsonData;
    });
}

/**
 * Enclenche l'action de voter quand on clique sur un bouton.
 * @param {String} _idGauche _id de la citation de gauche
 * @param {String} _idDroite _id de la citation de droite
 * @param {Object} tabCitations tableau de citations
 */
function boutonsVote(_idGauche, _idDroite, tabCitations) {
  document.getElementById("vote-citation1").onclick = () =>
    vote(_idGauche, _idDroite, tabCitations);

  document.getElementById("vote-citation2").onclick = () =>
    vote(_idDroite, _idGauche, tabCitations);
}

/**
 * Envoie la requête et actualise la page avec de nouvelles citations.
 * @param {String} idGagnant _id de la citation gagnante
 * @param {String} idPerdant _id de la citation perdante
 * @param {Object} tabCitations tableau de citations
 */
function vote(idGagnant, idPerdant, tabCitations) {
  console.log("CALL vote");
  envoieDuel(duelsUrl, idGagnant, idPerdant);
  duelAleatoire(tabCitations);
}

/* *************************************************************************
 * Affichage d'un duel aléatoire
 *************************************************************************** */

/**
 * Génère un entier aléatoire entre 0 et max.
 * @param {Int} max nombre max possible
 * @param {Int} exception nombre exclu à ne pas retourner
 *
 * @returns un entier aléatoire
 */
function nombreAleatoire(max, exception) {
  const nombre = Math.floor(Math.random() * max);
  return nombre == exception ? nombreAleatoire(max, exception) : nombre;
}

/**
 * Change la direction de l'image si elle n'est pas bonne.
 * @param {String} imageCitation id HTML de l'image
 * @param {Object} idCitation une citation du tableau
 *
 * @returns une image avec la bonne direction
 */
function rotationImage(imageCitat, idCitat) {
  console.log("CALL rotationImage");
  if (imageCitat == "image1" && idCitat.characterDirection == "Right") {
      return `<img src="${idCitat.image}" style="transform: scaleX(-1)"/>`;
  } else if (imageCitat == "image2" && idCitat.characterDirection == "Left") {
      return `<img src="${idCitat.image}" style="transform: scaleX(-1)"/>`;
  } else return `<img src="${idCitat.image}"/>`;
}

/**
 * Affiche la citation, choisie au hasard, dans "Voter".
 * @param {String} coteCitation id html du bloc citation
 * @param {String} imageCitation id html de l'image
 * @param {Object} idCitation une citation du tableau
 */
function afficheDuel(coteCitation, imageCitation, idCitation) {
  console.log("CALL afficheDuel " + idCitation._id);
  document.getElementById(coteCitation).innerHTML = `<p class="title">
    "${idCitation.quote}"</p><p class="subtitle">${idCitation.character}</p>`;
  document.getElementById(imageCitation).innerHTML =
    rotationImage(imageCitation, idCitation);
}

/**
 * Choisit au hasard les deux citations et les affiche.
 * @param {Object} tabCitations tableau de citations
 */
function duelAleatoire(tabCitations) {
  let idGauche = nombreAleatoire(tabCitations.length, -1);
  let idDroite = nombreAleatoire(tabCitations.length, idGauche);
  afficheDuel("citation1", "image1", tabCitations[idGauche]);
  afficheDuel("citation2", "image2", tabCitations[idDroite]);

  let _idGauche = tabCitations[idGauche]._id;
  let _idDroite = tabCitations[idDroite]._id;

  boutonsVote(_idGauche, _idDroite, tabCitations);
}

/* *************************************************************************
 * Gestion de la boîte de dialogue (a.k.a. modal) d'affichage de
 * l'utilisateur.
 * ************************************************************************* */

/**
 * Fait une requête GET authentifiée sur /whoami
 * @returns une promesse du login utilisateur ou du message d'erreur
 */
function fetchWhoami() {
  return fetch(serverUrl + "/whoami", {
      headers: {
        "x-api-key": apiKey
      }
    })
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.status && Number(jsonData.status) != 200) {
        return {
          err: jsonData.message
        };
      }
      return jsonData;
    })
    .catch((erreur) => ({
      err: erreur
    }));
}

/**
 * Fait une requête sur le serveur et insère le login dans
 * la modale d'affichage de l'utilisateur.
 *
 * @param {Etat} etatCourant l'état courant
 * @returns Une promesse de mise à jour
 */
function lanceWhoamiEtInsereLogin(etatCourant) {
  return fetchWhoami().then((data) => {
    etatCourant.login = data.login; // qui vaut undefined en cas d'erreur
    etatCourant.errLogin = data.err; // qui vaut undefined si tout va bien
    majPage(etatCourant);
    // Une promesse doit renvoyer une valeur, mais celle-ci n'est pas
    //importante
    // ici car la valeur de cette promesse n'est pas utilisée. On renvoie
    // arbitrairement true
    return true;
  });
}

/**
 * Affiche ou masque la fenêtre modale de login en fonction de l'état courant.
 * Change la valeur du texte affiché en fonction de l'état
 *
 * @param {Etat} etatCourant l'état courant
 */
function majModalLogin(etatCourant) {
  const modalClasses = document.getElementById("mdl-login").classList;
  if (etatCourant.loginModal) {
    modalClasses.add("is-active");
    const elt = document.getElementById("elt-affichage-login");

    const ok = etatCourant.login !== undefined;
    if (!ok) {
      elt.innerHTML = `<span class="is-error">${etatCourant.errLogin}</span>`;
    } else {
      elt.innerHTML = `Bonjour ${etatCourant.login}.`;
    }
  } else {
    modalClasses.remove("is-active");
  }
}

/**
 * Déclenche la fermeture de la boîte de dialogue du numéro de l'utilisateur.
 * @param {Etat} etatCourant
 */
function clickFermeModalLogin(etatCourant) {
  etatCourant.loginModal = false;
  majPage(etatCourant);
}
/**
 * Déclenche l'ouverture' de la boîte de dialogue du numéro de l'utilisateur.
 * @param {Etat} etatCourant
 */
function clickOuvreModalLogin(etatCourant) {
  etatCourant.loginModal = true;
  lanceWhoamiEtInsereLogin(etatCourant);
  majPage(etatCourant);
}

/**
 * Enregistre les actions à effectuer lors d'un click sur les boutons
 * d'ouverture/fermeture de la boîte de dialogue affichant l'utilisateur.
 * @param {Etat} etatCourant
 */
function registerLoginModalClick(etatCourant) {

  document.getElementById("btn-close-login-modal1").onclick = () =>
    clickFermeModalLogin(etatCourant);
  document.getElementById("btn-close-login-modal2").onclick = () =>
    clickFermeModalLogin(etatCourant);
  document.getElementById("btn-open-login-modal").onclick = () =>
    clickOuvreModalLogin(etatCourant);
  document.getElementById("valide").onclick = () =>
    connexion(etatCourant);
}

/* *************************************************************************
 * Connexion/Deconnexion
 * ************************************************************************* */

/**
 * Mets à jour la modale de connexion, lorsqu'on clique sur connexion
 * on affiche le texte et le bouton de validation.
 */
function majModalConnexion() {
  const elt = document.getElementById("elt-affichage-login");
  elt.innerHTML = `<p>Veuillez rentrer votre clé d'API présente sur Tomuss</p>
              <input id="API" type="password" placeholder="APIKey"/>
              <button id="valide" class="button is-success">Valider</button>`;
}

/**
 * Déclenche la fermeture de la boîte de dialogue de
 * connexion si l'api est incorrect.
 * Si api correct affiche le login de l'utilisateur.
 * Et remplace le nom de l'onglet connexion par déconnexion si l'api
 * est correct.
 * @param {Etat} etatCourant
 */
function connexion(etatCourant) {
  const connect = document.getElementById("btn-open-login-modal");
  const user = document.getElementById("login-user");
  if (document.getElementById("API").value == apiKey) {
    user.style.display = "flex";
    user.innerHTML = `<p>Bienvenue ${etatCourant.login}</p>`;
    connect.innerHTML = `<p>Deconnexion</p>`;
    majModalLogin(etatCourant);
  } else if (document.getElementById("API").value != apiKey ||
      document.getElementById("API").value == "") {
    user.style.display = "none";
    clickFermeModalLogin(etatCourant);
  }
}
/* *************************************************************************
 * Tri des citations
 * ************************************************************************* */

/**
 * Trie les personnages dans l'ordre indiqué.
 * @param {Object} citations une citation
 * @param {String} ordre ordre des personnages
 *
 * @returns un nouveau tableau contenant
 * des citations triées selon l'ordre indiqué
 */
function triCharacter(citations, ordre){
  console.log("CALL tri character");
  const res = Array.from(citations);
  if(ordre == "croissant") {
    res.sort((c1, c2) => c1.character > c2.character ? 1 :
      c1.character < c2.character ? -1 : 0);
    return res;
  } else if(ordre == "decroissant") {
    res.sort((c1, c2) => c1.character < c2.character ? 1 :
      c1.character > c2.character ? -1 : 0);
    return res;
  }
}

/**
 * Trie les citations dans l'ordre indiqué.
 * @param {Object} citations une citation
 * @param {String} ordre ordre des citations
<<<<<<< HEAD
 *
 * @returns un nouveau tableau contenant
 * des citaitons triées selon l'ordre indiqué
=======
 * 
 * @returns un nouveau tableau contenant 
 * des citations trié selon l'ordre indiqué
>>>>>>> 10ae049611d9ab0d14ed21e4236b54d1584be0d2
 */
function triCitations(citations, ordre){
  console.log("CALL tri quote");
  const res = Array.from(citations);
  if(ordre == "croissant") {
    res.sort((c1, c2) => c1.quote > c2.quote ? 1 :
      c1.quote < c2.quote ? -1 : 0);
    return res;
  } else if(ordre == "decroissant") {
    res.sort((c1, c2) => c1.quote < c2.quote ? 1 :
      c1.quote > c2.quote ? -1 : 0);
    return res;
  }
}

/**
 * Affiche tout le tableau de citations trié selon l'ordre.
 * @param {Object} tabCitations tableau de citations
 * @param {Etat} ordre ordre de tri des citations
 *
 * @returns un nouveau tableau contenant les
 * informations du tableau de citations triées selon les citations
 */
function mapTriCitations(tabCitations, ordre) {
  if(ordre == "croissant") {
    const nouveauTab = triCitations(tabCitations, ordre)
      .map(afficheCitations).join('');
    return nouveauTab;
  } else if(ordre == "decroissant"){
    const nouveauTab = triCitations(tabCitations, ordre)
      .map(afficheCitations).join('');
    return nouveauTab;
  }
}

/**
 * Affiche tout le tableau de citations triées selon l'ordre.
 * @param {Object} tabCitations tableau de citations
 * @param {Etat} ordre ordre de tri des citations
 *
 * @returns un nouveau tableau contenant les
 * informations du tableau de citations trié selon les personnages
 */
function mapTriCharacter(tabCitations, ordre) {
  if(ordre == "croissant") {
    const nouveauTab = triCharacter(tabCitations, ordre)
      .map(afficheCitations).join('');
    return nouveauTab;
  } else if(ordre == "decroissant"){
    const nouveauTab = triCharacter(tabCitations, ordre)
      .map(afficheCitations).join('');
    return nouveauTab;
  }
}

/**
 * Enregistre les actions à effectuer lors d'un click sur les boutons
 * de tri.
 * @param {Object} citations une citation
 */
function ActionTri(citations){
  document.getElementById('tr-per-up').onclick = () =>
    document.getElementById('tabcitations').innerHTML =
    mapTriCharacter(citations, "croissant");
  document.getElementById('tr-per-down').onclick = () =>
    document.getElementById('tabcitations').innerHTML =
    mapTriCharacter(citations, "decroissant");
  document.getElementById('tr-cit-up').onclick = () =>
    document.getElementById('tabcitations').innerHTML =
    mapTriCitations(citations, "croissant");
  document.getElementById('tr-cit-down').onclick = () =>
    document.getElementById('tabcitations').innerHTML =
    mapTriCitations(citations, "decroissant");
}

/* *************************************************************************
 * Initialisation de la page et fonction de mise à jour
 * globale de la page.
 * ************************************************************************* */

/**
 * Mets à jour la page (contenu et événements) en fonction d'un nouvel état.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majPage(etatCourant) {
  console.log("CALL majPage");
  majTab(etatCourant);
  majRecherche(etatCourant);
  majModalLogin(etatCourant);
  majModalConnexion(etatCourant);
  majModalDetail(etatCourant);
  registerTabClick(etatCourant);
  registerLoginModalClick(etatCourant);
  registerDetailModalClick(etatCourant);
}

/**
 * Appelé après le chargement de la page.
 * Met en place la mécanique de gestion des événements
 * en lançant la mise à jour de la page à partir d'un état initial.
 */
function initClientCitations() {
  console.log("CALL initClientCitations");
  const etatInitial = {
    tab: "duel",
    loginModal: false,
    citationModal: false,
  };
  majPage(etatInitial);
  recupeCitations(citationsUrl, (citations) => {
    document.getElementById('tabcitations').innerHTML =
      mapCitations(citations);
    document.getElementById('but-search').onclick = () =>
      document.getElementById('tabcitations').innerHTML =
      mapFiltreCitations(citations);
    ActionTri(citations);
    duelAleatoire(citations);
  });
}

// Appel de la fonction init_client_duels au après chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Exécution du code après chargement de la page");
  initClientCitations();
});
