/**
 * TP 1 Programmation	interactive	client-serveur
 * Exercice	2 :	Programmer	en	Javascript	un	jeu	de	puzzle
 * Auteur : Melnyk Svitlana et Kravchenko Iana
 * Date : juin 2018
 */
"use strict";
//Déclarer les variables par défaut
let rangeeVide = 3;
let colonneVide = 3;
let coups = 0;
let nom;
let arrayLocalStorage = localStorage.getItem('donneesJoueur') ? JSON.parse(localStorage.getItem('donneesJoueur')) : [];
localStorage.setItem('donneesJoueur', JSON.stringify(arrayLocalStorage));
let solution = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
let td_liste = document.querySelector('#jeu').getElementsByTagName('td');

//Définir le style pour la dernière cellule par défaut
document.querySelector('#jeu').rows[3].cells[3].style.border = 'initial';
document.querySelector('#jeu').rows[3].cells[3].style.background = 'white';

/**
 * Fonction de l'initialisation du jeu. Il est appelé en cliquant dans la cellule.
 * @param c
 */
function init(c) {
    let rangee = c.parentElement.rowIndex;
    let colonne = c.cellIndex;
    //Calculer une cellule vide
    if ((rangee === rangeeVide && Math.abs(colonne - colonneVide) === 1) || (colonne === colonneVide && Math.abs(rangee - rangeeVide) === 1)) {
        //Appeler la fonction de movement du puzzle
        movementTuile(c);
        //Appelez la fonction pour définir les coups
        definirCoups();
    }
    //Appeler la fonction pour résoudre le puzzle
    if (resoudrePuzzle()) {

        nom = prompt('Entrez votre nom', '');
        let d = document.querySelector('#contenu');
        //Créer h2
        let h2 = document.createElement('h2');
        h2.innerHTML = 'Félicitations ' + nom + '! Vous avez réussi avec un nombre de ' + coups + ' coups!';
        d.insertBefore(h2, d.childNodes[2]);

        ajouterJoueur();

        //Table avec des enregistrements est visible
        let texteNombreDeCoups = document.querySelector('.invisible');
        texteNombreDeCoups.className = 'visible';
        //Appeler la fonction pour afficher les records
        afficherRecord();
    }
}

/**
 * Fonction pour mettre à jour la cellule vide pour avoir la valeur de cette cellule
 * @param c
 */
function movementTuile(c) {
    let vide = tdVide();
    vide.innerHTML = c.innerHTML;
    vide.style.border = "2px solid #222";
    vide.style.background = 'radial-gradient(circle, deeppink, blue, lightblue)';
    //Appeler la fonction pour définir une cellule vide
    definirTdVide(c);
}

/**
 * Fonction pour définir une cellule vide.
 * @returns td- la cellule de la cellule vide actuelle.
 */
function tdVide() {
    let tabl = document.querySelector('#jeu');
    let tr = tabl.rows[rangeeVide];
    let td = tr.cells[colonneVide];
    return td;
}

/**
 * Fonction pour mettre à jour la rangée et la colonne vides pour être cette cellule
 * @param c
 */
function definirTdVide(c) {
    let rangee = c.parentElement.rowIndex;
    let colonne = c.cellIndex;
    let td = document.querySelector('#jeu').rows[rangee].cells[colonne];
    td.innerHTML = '';
    td.style.border = "initial";
    td.style.background = 'white';
    rangeeVide = rangee;
    colonneVide = colonne;
}

/**
 * Fonction de résolution de puzzle
 * @returns {boolean}
 */
function resoudrePuzzle() {
    for (let i = 0; i < solution.length; i++) {
        if (td_liste[i].innerHTML != solution[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Fonction pour définir les coups
 */
function definirCoups() {
    coups++;
}

/**
 * Fonction pour créer le tableau  et afficher les records (nom - coups)
 */
let table = document.querySelector('#record');
function afficherRecord() {
    let data = JSON.parse(localStorage.getItem('donneesJoueur'));
    data.sort(sortGagnant);
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');


        let td = document.createElement("td");
        td.innerHTML += data[i].nom;
        tr.appendChild(td);
        let td1 = document.createElement("td");
        td1.innerHTML += data[i].coups;
        tr.appendChild(td1);

        table.appendChild(tr);
    }
}

/**
 * Fonction pour ajouter le joueur dans LocalStorage
 */
function ajouterJoueur() {
    // e.preventDefault();
    arrayLocalStorage.push({nom: nom, coups: coups});
    localStorage.setItem('donneesJoueur', JSON.stringify(arrayLocalStorage));
}

/**
 * Fonction pour trier les records
 * @param a
 * @param b
 * @returns {number}
 */
function sortGagnant(a, b) {
    return a.coups - b.coups;
}


