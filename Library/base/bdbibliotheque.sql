-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2018 at 01:22 AM
-- Server version: 5.7.17
-- PHP Version: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bdbibliotheque`
--

-- --------------------------------------------------------

--
-- Table structure for table `livres`
--

CREATE TABLE `livres` (
  `id` int(10) NOT NULL,
  `titre` varchar(200) COLLATE utf8_bin NOT NULL,
  `auteur` varchar(100) COLLATE utf8_bin NOT NULL,
  `annee` int(4) NOT NULL,
  `isbn` varchar(15) COLLATE utf8_bin NOT NULL,
  `editeur` varchar(200) COLLATE utf8_bin NOT NULL,
  `evaluation` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `livres`
--

INSERT INTO `livres` (`id`, `titre`, `auteur`, `annee`, `isbn`, `editeur`, `evaluation`) VALUES
(2, 'Les alliances', 'Marie-Claude Gagnon', 2016, '9782895376286', 'Vents D\'Ouest', 6),
(3, 'Je réinvente ma vie ', 'Janet S. Klosko', 2018, '9782761951104', 'Les Éditions de l’Homme', 8),
(4, 'Jamais sans mon chien', 'Jo Franklin', 2018, '9782215139942', 'Fleurus', 9),
(5, 'La séduction de Charlotte', 'Diana Quincy', 2018, '9782897863784', 'Éditions Ada', 5),
(6, 'Le Temps des seigneurs', 'Dan Bigras', 2017, '9782764434680', 'Les éditions Québec Amérique', 10),
(19, 'Desserts', 'Marilou', 2018, '9782924646', 'Cardinal', 7),
(20, 'Maisons de verre ', 'Louise Penny', 2018, '9782890777', 'Flammarion Quebec', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `livres`
--
ALTER TABLE `livres`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `livres`
--
ALTER TABLE `livres`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
