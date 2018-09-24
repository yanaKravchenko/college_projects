<?php
/**
 * Programmation interactive client-serveur. TP2 - Bibliotheque
 * Auteur: Kravchenko Iana
 * Date: august 2018
 */

//Connexion à MySQL Server
class PdoMysqlModel
{
    private $dbhote = "localhost";
    private $dbutilisateur = "root";
    private $dbpasse = "";
    private $dbnom = "bdbibliotheque";
    private $erreur = false;

    private $pdo;
    private $stmt;

    function __construct()
    {
        if (!$this->pdo) {
            $options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ];
            $this->pdo = new PDO('mysql:host=' . $this->dbhote . ';dbname=' . $this->dbnom . ';charset=utf8', $this->dbutilisateur, $this->dbpasse, $options);
        }
    }

    // Les requêtes CRUD (Create, Read, Update, Delete)

    /**
     * choisir tous les livres de la table « livres »
     * @return array
     */
    public function lire()
    {
        $livresBD = $this->pdo->prepare("SELECT * FROM livres");
        $livresBD->execute();
        $tousLivres = [];
        return $livresBD->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * créer un nouveau livre dans la table "livres"
     * @param $titre
     * @param $auteur
     * @param $annee
     * @param $isbn
     * @param $editeur
     * @param $evaluation
     * @return string
     */
    public function creer($titre, $auteur, $annee, $isbn, $editeur, $evaluation)
    {
        $param = ["titre" => $titre, "auteur" => $auteur, "annee" => $annee, "isbn" => $isbn, "editeur" => $editeur, "evaluation" => $evaluation];
        $livresNew = $this->pdo->prepare("INSERT INTO livres(titre, auteur, annee, isbn, editeur, evaluation)
        VALUES (:titre, :auteur, :annee, :isbn, :editeur, :evaluation)");
        $livresNew->execute($param);
        return $this->pdo->lastInsertId();
    }

    /**
     * supprimer le livre dans la table "livres"
     * @param $id
     * @return int
     */
    public function supprimer($id)
    {
        $param['id'] = $id;
        $livresBD = $this->pdo->prepare("DELETE FROM livres WHERE id=:id");
        $livresBD->execute($param);
        return $livresBD->rowCount();
    }

    /**
     * modifier le livre dans la table "livres"
     * @param $id
     * @param $titre
     * @param $auteur
     * @param $annee
     * @param $isbn
     * @param $editeur
     * @param $evaluation
     * @return int
     */
    public function modifier($id, $titre, $auteur, $annee, $isbn, $editeur, $evaluation)
    {
        $param = ["id" => $id, "titre" => $titre, "auteur" => $auteur, "annee" => $annee, "isbn" => $isbn, "editeur" => $editeur, "evaluation" => $evaluation];
        $livreModif = $this->pdo->prepare("UPDATE livres SET titre = :titre, auteur = :auteur, annee = :annee, isbn = :isbn, editeur = :editeur, evaluation = :evaluation WHERE id = :id");
        $livreModif->execute($param);
        return $livreModif->rowCount();
    }

    /**
     * sélectioner de livres par paramètres
     * @param $params
     * @return array
     */
    public function chercher($params)
    {
        $reqChaines = [];

        foreach ($params as $coloumn => $donnee) {
            $reqChaines[] = " LOWER( " . $coloumn . " ) LIKE '%" . $donnee . "%'";
        }

        $champs = implode(" AND ", $reqChaines);
        $livresBD = $this->pdo->prepare("SELECT * FROM livres WHERE $champs");
        $livresBD->execute();
        $rengees = $livresBD->fetchAll(PDO::FETCH_ASSOC);
        return $rengees;
    }

//fonctions pour autocomplete

    /**
     * fonction autocomplete pour champ 'titre'
     * @return array
     */
    public function autocompleteTitre()
    {
        $livresBD = $this->pdo->prepare("SELECT titre FROM livres");
        $livresBD->execute();

        return $livresBD->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * fonction autocomplete pour champ 'auteur'
     * @return array
     */
    public function autocompleteAuteur()
    {
        $livresBD = $this->pdo->prepare("SELECT auteur FROM livres");
        $livresBD->execute();

        return $livresBD->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * fonction autocomplete pour champ 'annee'
     * @return array
     */
    public function autocompleteAnnee()
    {
        $livresBD = $this->pdo->prepare("SELECT annee FROM livres GROUP BY annee");
        $livresBD->execute();

        return $livresBD->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * fonction autocomplete pour champ 'isbn'
     * @return array
     */
    public function autocompleteIsbn()
    {
        $livresBD = $this->pdo->prepare("SELECT isbn FROM livres");
        $livresBD->execute();

        return $livresBD->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * fonction autocomplete pour champ 'editeur'
     * @return array
     */
    public function autocompleteEditeur()
    {
        $livresBD = $this->pdo->prepare("SELECT editeur FROM livres");
        $livresBD->execute();

        return $livresBD->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * fonction autocomplete pour champ 'evaluation'
     * @return array
     */
    public function autocompleteEvaluation()
    {
        $livresBD = $this->pdo->prepare("SELECT evaluation FROM livres GROUP BY evaluation");
        $livresBD->execute();

        return $livresBD->fetchAll(PDO::FETCH_COLUMN);
    }
}



























