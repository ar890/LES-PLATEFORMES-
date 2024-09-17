-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 11 sep. 2024 à 13:33
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `plateforme`
--

-- --------------------------------------------------------

--
-- Structure de la table `activations`
--

CREATE TABLE `activations` (
  `activation_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `forfait` varchar(100) DEFAULT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `edl` text DEFAULT NULL,
  `techniciens` varchar(255) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `fiberbox` varchar(100) DEFAULT NULL,
  `brin` varchar(100) DEFAULT NULL,
  `activation_date` date DEFAULT NULL,
  `sn` varchar(100) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `activations`
--

INSERT INTO `activations` (`activation_id`, `date`, `nom`, `prenom`, `contact`, `localisation`, `service`, `forfait`, `statut`, `edl`, `techniciens`, `reference`, `fiberbox`, `brin`, `activation_date`, `sn`, `observation`) VALUES
(12, '2024-08-02', 'KONE ', 'OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'FTTH', '15000', 'EN COURS', 'RAS', 'LANDRY', 'NO', 'MTN', 'BLEU', '2024-08-02', '12345TY67890', 'RAS'),
(13, '2024-08-31', 'JOHSON', 'ANDREAS', '07 58 07 13 06', 'MARCORY', 'FTTH', '30000', 'URGENT', 'RAS', 'LANDRY', 'NO', 'MTN', 'BLEU', '2024-08-31', '1234356TR6790', 'RAS');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `idDossier` int(11) NOT NULL,
  `date` date NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `forfait` varchar(100) DEFAULT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `problemes` text DEFAULT NULL,
  `historique` text DEFAULT NULL,
  `interaction` text DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`idDossier`, `date`, `nom`, `prenom`, `contact`, `localisation`, `service`, `forfait`, `statut`, `problemes`, `historique`, `interaction`, `observation`) VALUES
(13, '2024-08-01', 'KONE ', 'OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'FTTH', '15000', 'EN COUR', 'RAS', 'RAS', 'RAS', 'RAS'),
(14, '2024-08-30', 'JOHSON', 'ANDREA ', '07 58 07 13 06', 'MARCORY', 'FTTH', '30000', 'EN COURS', 'RAS', 'RAS', 'RAS', 'RAS');

-- --------------------------------------------------------

--
-- Structure de la table `declarations`
--

CREATE TABLE `declarations` (
  `declaration_id` int(11) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `nomPrenom` varchar(200) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `probleme` text DEFAULT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `declarations`
--

INSERT INTO `declarations` (`declaration_id`, `date_enregistrement`, `nomPrenom`, `contact`, `localisation`, `probleme`, `statut`, `observation`) VALUES
(12, '2024-08-19', 'KONE OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'CABLE ENDOMMAGE', 'EN COURS', 'RAS'),
(13, '2024-09-10', 'JOHSON ANDREA', '07 58 07 13 06', 'MARCORY', 'CABLE ENDOMMAGE', 'URGENT', 'RAS');

-- --------------------------------------------------------

--
-- Structure de la table `maintenances`
--

CREATE TABLE `maintenances` (
  `maintenance_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `nomPrenom` varchar(200) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `probleme` text DEFAULT NULL,
  `rdv` date DEFAULT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `actions` text DEFAULT NULL,
  `techInstallateurs` varchar(255) DEFAULT NULL,
  `edlInstallateur` text DEFAULT NULL,
  `edlMaintenancier` text DEFAULT NULL,
  `techMaintenanciers` varchar(255) DEFAULT NULL,
  `materiel` text DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `maintenances`
--

INSERT INTO `maintenances` (`maintenance_id`, `date`, `nomPrenom`, `contact`, `localisation`, `probleme`, `rdv`, `statut`, `actions`, `techInstallateurs`, `edlInstallateur`, `edlMaintenancier`, `techMaintenanciers`, `materiel`, `observation`) VALUES
(12, '2024-08-19', 'KONE OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'CABLE ENDOMMAGE', '2024-08-19', 'EN COURS', 'REPARATIONS', 'CAIMAN', 'CAIMAN', 'CAIMAN', 'CAIMAN', 'CABLE FO\r\nSOUDEUSE \r\nLASER', 'RAS'),
(13, '2024-09-10', 'JOHSON ANDREA', '07 58 07 13 06', 'MARCORY', 'CABLE ENDOMMAGE', '2024-09-10', 'URGENT', 'REPARATION', 'CAIMAN', 'CAIMAN', 'CAIMAN', 'CAIMAN', 'SOUDEUSE\r\nCABLE FO\r\nLASERS', 'RAS');

-- --------------------------------------------------------

--
-- Structure de la table `reclamations`
--

CREATE TABLE `reclamations` (
  `reclamation_id` int(11) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `id_ticket` int(11) DEFAULT NULL,
  `nomPrenom` varchar(200) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `service_souhaite` varchar(100) DEFAULT NULL,
  `forfait_paye` varchar(100) DEFAULT NULL,
  `sn_client` varchar(100) DEFAULT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `forfait` varchar(100) DEFAULT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `edl` text DEFAULT NULL,
  `techniciens` varchar(255) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `sn` varchar(100) DEFAULT NULL,
  `brin` varchar(100) DEFAULT NULL,
  `materiel` text DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `type` varchar(50) DEFAULT 'installation'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `date`, `nom`, `prenom`, `contact`, `localisation`, `service`, `forfait`, `statut`, `edl`, `techniciens`, `reference`, `sn`, `brin`, `materiel`, `observation`, `type`) VALUES
(12, '2024-08-02', 'KONE', 'OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'FTTH', '15000', 'EN COURS', 'RAS', 'LANDRY', 'NO', '123456TY7890', 'BLEU', 'CABLE PTO \r\nLASERS ', 'RAS', 'installation'),
(13, '2024-08-31', 'JOHSON', 'ANDREAS', '07 58 07 13 06', 'MARCORY', 'FTTH', '30000', 'URGENT', 'RAS', 'LANDRY', 'NO', '1234567TYU7890', 'BLEU', 'PTO LASER CABLE', 'RAS', 'installation');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activations`
--
ALTER TABLE `activations`
  ADD PRIMARY KEY (`activation_id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`idDossier`);

--
-- Index pour la table `declarations`
--
ALTER TABLE `declarations`
  ADD PRIMARY KEY (`declaration_id`);

--
-- Index pour la table `maintenances`
--
ALTER TABLE `maintenances`
  ADD PRIMARY KEY (`maintenance_id`);

--
-- Index pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD PRIMARY KEY (`reclamation_id`),
  ADD KEY `id_ticket` (`id_ticket`);

--
-- Index pour la table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activations`
--
ALTER TABLE `activations`
  MODIFY `activation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `idDossier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `declarations`
--
ALTER TABLE `declarations`
  MODIFY `declaration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `reclamations`
--
ALTER TABLE `reclamations`
  MODIFY `reclamation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD CONSTRAINT `reclamations_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`ticket_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
