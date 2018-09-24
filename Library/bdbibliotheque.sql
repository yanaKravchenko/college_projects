-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Version du serveur :  5.7.17
-- Version de PHP :  7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Base de données :  bdbibliotheque
CREATE DATABASE IF NOT EXISTS bdbibliotheque DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE bdbibliotheque;

-- --------------------------------------------------------
-- Structure de la table livres

CREATE TABLE livres (
id int(10) NOT NULL auto_increment,
titre varchar(200) NOT NULL,
auteur varchar(100) NOT NULL,
annee int(4) NOT NULL,
isbn varchar(15) NOT NULL,
editeur varchar(200) NOT NULL,
evaluation int(2) NOT NULL,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Contenu de la table 'livres'

INSERT INTO livres (id, titre, auteur, annee, isbn, editeur, evaluation) VALUES
(1, 'Pour toujours', 'Jude Deveraux', 2018, '9782897864569', 'Éditions Ada', 8),
(2, 'Les alliances', 'Marie-Claude Gagnon', 2018, '9782895376286', 'Vents D''Ouest', 6),
(3, 'Je réinvente ma vie', 'Janet S. Klosko', 2018, '9782761951104', 'Les Éditions de l’Homme', 8),
(4, 'Jamais sans mon chien', 'Jo Franklin', 2018, '9782215139942', 'Fleurus', 9),
(5, 'La séduction de Charlotte', 'Diana Quincy', 2018, '9782897863784', 'Éditions Ada', 5),
(6, 'Le Temps des seigneurs', 'Dan Bigras', 2017, '9782764434680', 'Les éditions Québec Amérique', 10);

