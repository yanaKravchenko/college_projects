/**
 * Travail pratique : Vitrine commerciale
 * Auteur : Kravchenko Iana
 * Date : Avril 2018
 */

// Pendant le chargement de la page, nous attrapons les événements (click) a l'aide des EventListener et établisons
// le type de vue (Vignette ou list) et le nombre de produits par page
window.addEventListener("load", function () {
    MonApp.afficher();
    document.getElementById('list').addEventListener('click', function () {
        MonApp.changeModeAffichage('list');
    });
    document.getElementById('vignette').addEventListener('click', function () {
        MonApp.changeModeAffichage('vignette');
    });

    let nombreProduitParPage = document.querySelectorAll('#produitParPage button');
    for (let i = 0; i < nombreProduitParPage.length; i++) {
        nombreProduitParPage[i].addEventListener('click', function (e) {
            MonApp.setNombreParPage(e.target.innerHTML);
        })
    }

});







