/**
 * Travail pratique : Vitrine commerciale
 * Auteur : Kravchenko Iana
 * Date : Avril 2018
 */
"use strict";

// Module
let MonApp = function () {
    let modeAffichage = 'vinette';// par defaut
    let nombreProduitParPage = 12;// par defaut
    let nombrePages;
    let App = {};
    let panier;
    let CurantPage = 1;

// En téléchargeant  page nous obtenons du localStorage la valeur du panier
    window.addEventListener("load", function () {
        if (localStorage.getItem('panier') === null) {
            localStorage.setItem('panier', JSON.stringify({}));
            panier = {};
        } else {
            panier = JSON.parse(localStorage.getItem('panier'));
        }
        miseAJourPanier();
    });

// Template
    let produitTemplate =
        '<article class="produit col-md-3 mb-4 mt-3">' +
        '<div class="card-body text-center">' +
        '<img class="img-fluid" src="{{imageProduit}}">' +
        '<header class="nom text-center">{{nomProduit}}</header>' +
        '<section class="description text-center">{{descriptionProduit}}</section>' +
        '<section class="prix text-center">' +
        '<span class="prix-valeur">{{prixValeurProduit}}</span>' +
        '<span class="prix-unite text-center">${{prixUniteProduit}}</span>' +
        '</section>' +
        '<section class="card-footer categorie text-center">{{categorieProduit}}</section>' +
        '<button class=" btn btn-warning" value="{{idProd}}">ajouter au panier</button>' +
        '</div>' +
        '</article>';

// Fonction met à jour le panier
    function miseAJourPanier() {
        document.getElementById('btnPanier').innerHTML = Object.keys(panier).length;
    }

// Fonction permet d'afficher des produits sur une page avec des conditions le nombre de produits par page et le type
// de vue (vinette ou liste)
    App.afficher = function () {
        let produits = document.getElementById('produits');
        produits.innerHTML = "";
        nombrePages = Math.ceil(produit.length / nombreProduitParPage);

        let dernierProd = CurantPage * nombreProduitParPage;
        let premiereProd = (CurantPage - 1) * nombreProduitParPage;
        if (nombrePages === CurantPage) {
            dernierProd = produit.length;
        }

        for (let item = premiereProd; item < dernierProd; item++) {

            let templateRemplacer = produitTemplate
                .replace(/{{nomProduit}}/, produit[item].nom)
                .replace(/{{imageProduit}}/, produit[item].image)
                .replace(/{{descriptionProduit}}/, produit[item].description)
                .replace(/{{prixValeurProduit}}/, produit[item].prix.valeur)
                .replace(/{{prixUniteProduit}}/, produit[item].prix.unite)
                .replace(/{{categorieProduit}}/, produit[item].categorie)
                .replace(/{{idProd}}/, produit[item].id);
            let elem = document.createRange().createContextualFragment(templateRemplacer);
            let prod2 = elem.querySelector(".card-body");
            let prod3 = elem.querySelector(".produit");
            if (modeAffichage === 'list') {
                produits.style = "column-reverse";
                produits.classList.remove("row");
                prod2.classList.add("d-flex", "flex-row", "align-items-center", "justify-content-between");
                prod2.firstElementChild.style.height = "100px";
                prod3.classList.remove("col-md-3");
                prod3.classList.add("col-md-12");

            } else {
                produits.style.removeProperty("column-reverse");
                produits.classList.add("row");
            }

            produits.appendChild(elem.cloneNode(true));
        }

        let buttons = produits.querySelectorAll('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (e) {
                App.ajouterProduit(e.target.value);
            })
        }

//Pagination template affichage, Pajination :
        let pagination = document.querySelector("#pagination");

        let innerPagination = "";
        if (CurantPage !== 1) {
            innerPagination =   '<li class="page-item">\n' +
                '<a id="previous" class="bg-success text-white page-link "  aria-label="Previous">\n' +
                '<span aria-hidden="true">&laquo;</span>\n' +
                '<span class="sr-only">Previous</span>\n' +
                '</a>\n' +
                '</li>'
        }
        for (let item = 0; item < nombrePages; item++) {
            innerPagination += '<li class="page-item"><a class="bg-success text-white page-link page-numeros" >' + (item + 1) + '</a></li>'
        }
        if (CurantPage !== nombrePages) {
            innerPagination +=   '<li class="page-item">\n' +
                '            <a id="next" class="bg-success text-white page-link "  aria-label="Next">\n' +
                '                <span aria-hidden="true">&raquo;</span>\n' +
                '                <span class="sr-only">Next</span>\n' +
                '            </a>\n' +
                '        </li>';
        }
        pagination.innerHTML = innerPagination;

        let children = pagination.querySelectorAll('.page-numeros');
        for (let item = 0; item < children.length; item++) {
            children[item].addEventListener('click', function (e) {
                App.changePage(parseInt(e.target.innerHTML));
            });
        }

        let previus = document.getElementById('previous');
        if (previus !== null){
            previus.addEventListener('click', function () {
                App.changePage(CurantPage - 1);

            });
        }

        let next = document.getElementById('next');
        if (next !== null){
            next.addEventListener('click', function () {
                App.changePage(CurantPage + 1);

            });
        }

    };

// Fonction de changement de la vue de site
    App.changeModeAffichage = function (mode) {
        localStorage.setItem('modeAffichage', mode);
        modeAffichage = mode;
        App.afficher();

    };

// La fonction retourne le nombre de produits sur le site
    App.getNombreProduit = function (nombre){
        return produits.length;
    };

// La fonction set le nombre de produits par page
    App.setNombreParPage = function (nombre) {
        if (nombre === "Tous") {
            nombreProduitParPage = produit.length;
        }else{
            nombreProduitParPage = parseInt(nombre);
        }
        CurantPage = 1;
        App.afficher();
    };

// La fonction ajoute des produits au panier
    App.ajouterProduit = function (id) {
        panier[id] = id;
        miseAJourPanier();
        localStorage.setItem('panier', JSON.stringify(panier));
    };

// Fonction permet de changer des pages
    App.changePage = function(page){
        CurantPage = parseInt(page);
        App.afficher();
    };
    return App;
}();











