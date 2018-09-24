/**
 * Programmation interactive client-serveur. TP2 - Bibliotheque
 * Auteur: Kravchenko Iana
 * Date: august 2018
 */

"use strict";

/**Après le chargement des pages exécuter des fonctions*/
$(document).ready(function () {

/**En cliquant sur le bouton 'voir tous les livres', la fonction ajax demande des informations sur les livres du serveur*/
    $("#voirTousLivres").click(function () {
        $("#message").text("");
        let data = {action: "VoirTousLivres"};
        $.ajax({
            url: 'api_switch_case.php',
            type: 'GET',
            data: "request=" + JSON.stringify(data),
            dataType: 'json',
            success: function (jsonLivres, statut) {
                $('#ajaxDiv').html('');
                // Construire la chaîne de résultat
                afficherLivres()
            }
        });
    });
/**En cliquant sur le bouton 'ajouter un livre', la fonction supprime le contenu du tableau et message*/
    $("#butAjouteLivre").click(function () {
        $("#message").text("");
        $('#ajaxDiv').html('')
    });
/**En cliquant sur le bouton 'ajouter un livre', la fonction transmet les valeurs de champ au serveur.*/
    $("#ajouteLivre").on('click', function () {
        $('#ajaxDiv').html('');
        $("#message").text("");
        // Si les champs sont validés
        if (validationAjouteLivre()) {
            let nouveauLivre = {
                titre: $("#titre").val(),
                auteur: $("#auteur").val(),
                annee: $("#annee").val(),
                isbn: $("#isbn").val(),
                editeur: $("#editeur").val(),
                evaluation: $("#evaluation").val(),
            };

            $("#titre").val("");
            $("#auteur").val("");
            $("#annee").val("");
            $("#isbn").val("");
            $("#editeur").val("");
            $("#evaluation").val("");

            $("#Modal").modal("hide");

            let data = {action: "AjouterLivre", nouveauLivre: nouveauLivre};
            $.ajax({
                url: 'api_switch_case.php',
                type: 'GET',
                data: "request=" + JSON.stringify(data),
                dataType: 'json',
                success: function (jsonNouveauLivre, statut) {
                    // zone de notification
                    if (jsonNouveauLivre.message !== null && jsonNouveauLivre.message === "success"){
                        $("#message").text("Le livre a été ajouté.");
                    } else {
                        $("#message").text("Erreur lors de l'ajout d'un livre.");
                    }
                },
                error: function (e) {
                    // zone de notification
                    $("#message").text("Erreur lors de l'ajout d'un livre.");
                }
            });
        }
    });
/**Par événement 'blur', la fonction envoie des données au serveur associées à la recherche de livres*/
    $("#recherche td").blur(function () {
        $("#message").text("");
        let titre = $("#tdTitre").text();
        let auteur = $("#tdAuteur").text();
        let annee = $("#tdAnnee").text();
        let isbn = $("#tdIsbn").text();
        let editeur = $("#tdEditeur").text();
        let evaluation = $("#tdEvaluation").text();
        if (titre == "" && auteur == "" && annee == "" && isbn == "" && editeur == "" && evaluation == "") {
            $('#ajaxDiv').html('');
            return;
        }
        let recherche = {};
        if (titre !== ''){
            recherche.titre = titre.toLowerCase();
        }
        if (auteur !== ''){
            recherche.auteur = auteur.toLowerCase();
        }
        if (annee !== ''){
            recherche.annee = annee.toLowerCase();
        }
        if (isbn !== ''){
            recherche.isbn = isbn.toLowerCase();
        }
        if (editeur !== ''){
            recherche.editeur = editeur.toLowerCase();
        }
        if (evaluation !== ''){
            recherche.evaluation = evaluation.toLowerCase();
        }

        let data = {action: "CharcherLivre", recherche: recherche};
        $.ajax({
            url: 'api_switch_case.php',
            type: 'GET',
            data: "request=" + JSON.stringify(data),
            dataType: 'json',
            success: function (jsonChercherLivre, statut) {
                afficher(jsonChercherLivre);
            },
            error: function (e) {
                // zone de notification
                $("#message").text("Erreur lors de la dernière action.");
            }
        });
    })

});
/**La fonction envoie des données au serveur pour supprimer le livre*/
function supprimerLivre(id) {
    let data = {
        action: "SupprimerLivre",
        idLivre: id,
    };

    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonNouveauLivre, statut) {
            // zone de notification
            if (jsonNouveauLivre.message !== null && jsonNouveauLivre.message === "success"){
                $("#message").text("Le livre a été supprimer.");
            } else {
                $("#message").text("Erreur lors de la suppression d'un livre.");
            }
            // affichage des livres après l'enlèvement
            afficherLivres();
        },
        error: function (e) {
            // zone de notification
            $("#message").text("Erreur lors de la suppression d'un livre.");
        }

    });

}

/**La fonction envoie des données au serveur pour modification le livre*/
function modifierLivre(id) {
    let rangee = $(`#ajaxDiv [data-id="${id}"]`);
    let contenuModif = {
        id: id,
        titre: rangee.find(".rengeeTitre").text(),
        auteur: rangee.find(".rengeeAuteur").text(),
        annee: rangee.find(".rengeeAnnee").text(),
        isbn: rangee.find(".rengeeIsbn").text(),
        editeur: rangee.find(".rengeeEditeur").text(),
        evaluation: rangee.find(".rengeeEvaluation").text(),
    };
    let data = {action: "ModifierLivre", contenuModif: contenuModif};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonNouveauLivre, statut) {
            // zone de notification
            if (jsonNouveauLivre.message !== null && jsonNouveauLivre.message === "success"){
                $("#message").text("Le livre a été modifier.");
            } else {
                $("#message").text("Erreur lors de la modification d'un livre.");
            }
        },
        error: function (e) {
            // zone de notification
            $("#message").text("Erreur lors de la modification d'un livre..");
        }
    })
}
/**fonctions pour autocomplétion des champs*/
function autocompleteTitre() {
    let data = {action: "AutocompleteTitre"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {

            $("#tdTitre").autocomplete({
                source: jsonLivres

            });
            // console.log(jsonLivres);
        }
    });
}

function autocompleteAuteur() {
    let data = {action: "AutocompleteAuteur"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {

            $("#tdAuteur").autocomplete({
                source: jsonLivres

            });
            // console.log(jsonLivres);
        }
    });
}

function autocompleteAnnee() {
    let data = {action: "AutocompleteAnnee"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {

            $("#tdAnnee").autocomplete({
                source: jsonLivres

            });
            // console.log(jsonLivres);
        }
    });
}

function autocompleteIsbn() {
    let data = {action: "AutocompleteIsbn"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {

            $("#tdIsbn").autocomplete({
                source: jsonLivres

            });
            // console.log(jsonLivres);
        }
    });
}

function autocompleteEditeur() {
    let data = {action: "AutocompleteEditeur"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {

            $("#tdEditeur").autocomplete({
                source: jsonLivres

            });
            // console.log(jsonLivres);
        }
    });
}

function autocompleteEvaluation() {
    let data = {action: "AutocompleteEvaluation"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {

            $("#tdEvaluation").autocomplete({
                source: jsonLivres

            });
            // console.log(jsonLivres);
        }
    });
}
/**Fonction pour validation des champs de la fenêtre modale*/
function validationAjouteLivre() {
    let titreValid = document.getElementById('titre');
    let innerTitre = document.getElementById('innerTitre');
    let patternTitre = /^[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ ]*$/;
    if (!titreValid.value.match(patternTitre)) {
        innerTitre.innerHTML = 'seuls les caractères alphabétiques, accentués ou non, en majuscules ou minuscules, avec ou sans espace sont autorisés. La première lettre - majuscule';
        return false;
    } else {
        innerTitre.innerHTML = '';
    }

    let auteurValid = document.getElementById('auteur');
    let innerAuteur = document.getElementById('innerAuteur');
    let patternAuteur = /^[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ ]*$/;
    if (!auteurValid.value.match(patternAuteur)) {
        innerAuteur.innerHTML = 'seuls les caractères alphabétiques, accentués ou non, en majuscules ou minuscules, avec ou sans espace sont autorisés';
        return false;
    } else {
        innerAuteur.innerHTML = '';
    }

    let anneeValid = document.getElementById('annee');
    let innerAnnee = document.getElementById('innerAnnee');
    let patternAnne = /^(\d){4}$/;
    if (!anneeValid.value.match(patternAnne)) {
        innerAnnee.innerHTML = 'seuls les 4 chifres sont autorisés';
        return false
    } else {
        innerAnnee.innerHTML = '';
    }

    let isbnValid = document.getElementById('isbn');
    let innerIsbn = document.getElementById('innerIsbn');
    let patternIsbn = /^(\d){10}$/;
    if (!isbnValid.value.match(patternIsbn)) {
        innerIsbn.innerHTML = 'seuls les 10 chifres sont autorisés';
        return false
    } else {
        innerIsbn.innerHTML = '';
    }

    let editeurValid = document.getElementById('editeur');
    let innerEditeur = document.getElementById('innerEditeur');
    let patternEditeur = /^[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ ]*$/;

    if (!editeurValid.value.match(patternEditeur)) {
        innerEditeur.innerHTML = 'seuls les caractères alphabétiques, accentués ou non, en majuscules ou minuscules, avec ou sans espace sont autorisés. La première lettre - majuscule';
        return false
    } else {
        innerEditeur.innerHTML = '';
    }

    let evaluationValid = document.getElementById('evaluation');
    let innerEvaluation = document.getElementById('innerEvaluation');
    let patternEvaluation = /^(1|2|3|4|5|6|7|8|9|10)$/;

    if (!evaluationValid.value.match(patternEvaluation)) {
        innerEvaluation.innerHTML = 'seuls les chifres 1 - 10 sont autorisés';
        return false
    } else {
        innerEvaluation.innerHTML = '';
    }

    return true;

}
/**Une fonction qui envoie une requête au serveur pour afficher des livres*/
function afficherLivres() {
    $('#ajaxDiv').html('');
    let data = {action: "VoirTousLivres"};
    $.ajax({
        url: 'api_switch_case.php',
        type: 'GET',
        data: "request=" + JSON.stringify(data),
        dataType: 'json',
        success: function (jsonLivres, statut) {
            // Construire la chaîne de résultat
            // let string = "";
            afficher(jsonLivres);
        }
    })
}
/**Fonction pour affichage du tableau des livres*/
function afficher(livres) {
    $('#ajaxDiv').html('');
    for (let item of livres) {
        let string = `
                        <tr data-id='${item.id}'>
                            <td class='rengeeTitre' onblur='modifierLivre(${item.id})' contenteditable='true'>${item.titre}</td>
                            <td class='rengeeAuteur' onblur='modifierLivre(${item.id})' contenteditable='true'>${item.auteur}</td>
                            <td class='rengeeAnnee' onblur='modifierLivre(${item.id})' contenteditable='true'>${item.annee}</td>
                            <td class='rengeeIsbn' onblur='modifierLivre(${item.id})' contenteditable='true'>${item.isbn}</td>
                            <td class='rengeeEditeur' onblur='modifierLivre(${item.id})' contenteditable='true'>${item.editeur}</td>
                            <td class='rengeeEvaluation' onblur='modifierLivre(${item.id})' contenteditable='true'>${item.evaluation}</td>
                            <td><button class='btn btn-light' onclick='supprimerLivre(${item.id})'><img src='image/remove.png' width='20' height='auto' class='d-inline-block' alt='remove'></button></td>
                        </tr>
                    `;
        $('#ajaxDiv').append(string);
    }
}






