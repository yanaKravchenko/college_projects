<?php
/*
* Programmation interactive client-serveur. TP2 - Bibliotheque
* Auteur: Kravchenko Iana
* Date: august 2018
*/
//ajouter le fichier "model_ajax-bd.php"
require_once("model_ajax-bd.php");
//si j'ai recu un paramètre action, je l'affecte à $action
if(isset($_REQUEST["request"])){
    $request = json_decode($_REQUEST["request"], true);
    $action = $request["action"];
//    var_dump($_REQUEST["request"]);
} else {
    $action = "Accueil";
}

//le coeur du controleur est sa structure décisionnelle - switch
switch($action)
{
    case "Accueil":
        //afficher la page d'accueil
        require_once("index.html");
        break;
    case "VoirTousLivres":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->lire();
        echo json_encode($jsonLivres);
        break;
    case "AjouterLivre":
        //var_dump($_REQUEST["request"]);
        $creationModel = new PdoMysqlModel();
        $livre = $request["nouveauLivre"];
        $idLivre = $creationModel->creer($livre['titre'], $livre['auteur'], $livre['annee'], $livre['isbn'], $livre['editeur'], $livre['evaluation'] );
        if ($idLivre > 0) {
            echo json_encode(["message" => "success"]);
        } else {
            echo json_encode(["message" => "error"]);
        }
        break;
    case "SupprimerLivre":
        //var_dump($_REQUEST["request"]);
        $creationModel = new PdoMysqlModel();
        $livre = $request["idLivre"];
        $rangeeCount = $creationModel->supprimer($livre);
        if ($rangeeCount > 0) {
            echo json_encode(["message" => "success"]);
        } else {
            echo json_encode(["message" => "error"]);
        }
        break;
    case "ModifierLivre":
        $creationModel = new PdoMysqlModel();
        $livre = $request["contenuModif"];
        $rangeeCount = $creationModel->modifier($livre['id'], $livre['titre'], $livre['auteur'], $livre['annee'], $livre['isbn'], $livre['editeur'], $livre['evaluation']);
        if ($rangeeCount >= 0) {
            echo json_encode(["message" => "success"]);
        } else {
            echo json_encode(["message" => "error"]);
        }
        break;
    case "CharcherLivre":
        $creationModel = new PdoMysqlModel();
        $chercherLivre = $request["recherche"];
        $livres = $creationModel->chercher($chercherLivre);
        echo json_encode($livres);
        break;
    case "AutocompleteTitre":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->autocompleteTitre();
        echo json_encode($jsonLivres);
        break;
    case "AutocompleteAuteur":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->autocompleteAuteur();
        echo json_encode($jsonLivres);
        break;
    case "AutocompleteAnnee":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->autocompleteAnnee();
        echo json_encode($jsonLivres);
        break;
    case "AutocompleteIsbn":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->autocompleteIsbn();
        echo json_encode($jsonLivres);
        break;
    case "AutocompleteEditeur":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->autocompleteEditeur();
        echo json_encode($jsonLivres);
        break;
    case "AutocompleteEvaluation":
        $creationModel = new PdoMysqlModel();
        $jsonLivres = $creationModel->autocompleteEvaluation();
        echo json_encode($jsonLivres);
        break;
    default:
        //action par défaut
        require_once("index.html");
        break;
}

