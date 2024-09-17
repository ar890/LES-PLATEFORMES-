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
-- Base de données : `plateforme_bd2`
--

-- --------------------------------------------------------

--
-- Structure de la table `activations_service`
--

CREATE TABLE `activations_service` (
  `id` int(11) NOT NULL,
  `activation_id` varchar(50) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `forfait` varchar(50) NOT NULL,
  `edl` varchar(255) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `techniciens` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `fiberbox` varchar(50) DEFAULT NULL,
  `brin` varchar(50) DEFAULT NULL,
  `activation_date` date DEFAULT NULL,
  `sn` varchar(50) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `id_dossier` varchar(50) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `forfait` varchar(50) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `problemes` text DEFAULT NULL,
  `historique` text DEFAULT NULL,
  `interaction` text DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `declarations`
--

CREATE TABLE `declarations` (
  `id` int(11) NOT NULL,
  `id_ticket` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `probleme` text DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `date_enregistrement` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `declarations`
--

INSERT INTO `declarations` (`id`, `id_ticket`, `nom`, `contact`, `localisation`, `probleme`, `statut`, `observation`, `date_enregistrement`) VALUES
(2, '49', 'KONE OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'CABLE ENDOMMAGE', 'ENCOURS', 'RAS', '2024-09-11 11:25:57'),
(40, '43', 'JOHSON', 'ANDREAS', 'MARCORY', 'CABLE ENDOMMAGEE', 'EN COURS', 'RAS', '2024-09-11 11:25:57');

-- --------------------------------------------------------

--
-- Structure de la table `declarations_panne`
--

CREATE TABLE `declarations_panne` (
  `id` int(11) NOT NULL,
  `declaration_id` varchar(50) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `nom_prenom` varchar(200) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `probleme` varchar(255) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `declarations_panne`
--

INSERT INTO `declarations_panne` (`id`, `declaration_id`, `date_enregistrement`, `nom_prenom`, `contact`, `localisation`, `probleme`, `statut`, `observation`) VALUES
(2, '2', '2024-08-19', 'KONE OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'CABLE ENDOMMAGE', 'EN COURS', 'RAS'),
(3, '3', '2024-09-10', 'JOHSON ANDREAS', '07 58 07 13 06', 'MARCORY', 'CABLE ENDOMMAGEE', 'URGENT', 'RAS');

-- --------------------------------------------------------

--
-- Structure de la table `dossiers`
--

CREATE TABLE `dossiers` (
  `id` int(11) NOT NULL,
  `nom_prenoms` varchar(255) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `forfait` varchar(255) NOT NULL,
  `creation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dossiers`
--

INSERT INTO `dossiers` (`id`, `nom_prenoms`, `contact`, `localisation`, `service`, `forfait`, `creation_date`) VALUES
(1, 'John Doe', '0123456789', 'Abidjan', 'Internet Haut Débit', 'Premium', '2024-08-27');

-- --------------------------------------------------------

--
-- Structure de la table `installations`
--

CREATE TABLE `installations` (
  `id` int(11) NOT NULL,
  `dossier_id` int(11) NOT NULL,
  `installation_date` date DEFAULT NULL,
  `fiberbox_configuration_date` date DEFAULT NULL,
  `service_activation_date` date DEFAULT NULL,
  `client_functional_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `installations`
--

INSERT INTO `installations` (`id`, `dossier_id`, `installation_date`, `fiberbox_configuration_date`, `service_activation_date`, `client_functional_date`) VALUES
(1, 1, '2024-08-28', '2024-08-29', '2024-08-30', '2024-09-01');

-- --------------------------------------------------------

--
-- Structure de la table `maintenances`
--

CREATE TABLE `maintenances` (
  `id` int(11) NOT NULL,
  `dossier_id` int(11) NOT NULL,
  `step1_date` date DEFAULT NULL,
  `step2_date` date DEFAULT NULL,
  `step3_date` date DEFAULT NULL,
  `step4_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `maintenances`
--

INSERT INTO `maintenances` (`id`, `dossier_id`, `step1_date`, `step2_date`, `step3_date`, `step4_date`) VALUES
(1, 1, '2024-09-10', '2024-09-11', '2024-09-12', '2024-09-13');

-- --------------------------------------------------------

--
-- Structure de la table `reclamations`
--

CREATE TABLE `reclamations` (
  `id` int(11) NOT NULL,
  `id_ticket` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `forfait` varchar(255) DEFAULT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `date_enregistrement` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reclamations`
--

INSERT INTO `reclamations` (`id`, `id_ticket`, `nom`, `contact`, `localisation`, `service`, `forfait`, `sn`, `statut`, `observation`, `date_enregistrement`) VALUES
(3, '40', 'JOHSON ANDREAS', '07 79 07 13 06 ', 'MARCORY', 'FTTH', '30000', '1234556TYU6789', 'ENCOURS', 'RAS', '2024-09-11 11:21:51'),
(9, '45', 'KONE OUSMANE', '05 66 18 82 10', 'YOPOUGON', 'FTTH', '30000', '1234567TY7890', 'ENCOURS', 'RAS', '2024-09-11 11:21:51');

-- --------------------------------------------------------

--
-- Structure de la table `reclamations_par_operateur`
--

CREATE TABLE `reclamations_par_operateur` (
  `id` int(11) NOT NULL,
  `reclamation_id` varchar(50) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `id_ticket` varchar(50) NOT NULL,
  `nom_prenom` varchar(200) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `forfait` varchar(50) NOT NULL,
  `sn` varchar(50) DEFAULT NULL,
  `statut` varchar(50) NOT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tickets_installation`
--

CREATE TABLE `tickets_installation` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(50) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `forfait` varchar(50) NOT NULL,
  `edl` varchar(255) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `techniciens` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `sn` varchar(50) DEFAULT NULL,
  `brin` varchar(50) DEFAULT NULL,
  `materiel` text DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tickets_maintenance`
--

CREATE TABLE `tickets_maintenance` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(50) NOT NULL,
  `date_enregistrement` date NOT NULL,
  `nom_prenom` varchar(200) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `probleme` varchar(255) NOT NULL,
  `rdv` datetime NOT NULL,
  `statut` varchar(50) NOT NULL,
  `actions` text DEFAULT NULL,
  `tech_installateurs` varchar(255) DEFAULT NULL,
  `edl_installateur` varchar(255) DEFAULT NULL,
  `edl_maintenancier` varchar(255) DEFAULT NULL,
  `tech_maintenanciers` varchar(255) DEFAULT NULL,
  `materiel` text DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activations_service`
--
ALTER TABLE `activations_service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `declarations`
--
ALTER TABLE `declarations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `declarations_panne`
--
ALTER TABLE `declarations_panne`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dossiers`
--
ALTER TABLE `dossiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_prenoms` (`nom_prenoms`,`contact`,`localisation`,`service`,`forfait`) USING HASH;

--
-- Index pour la table `installations`
--
ALTER TABLE `installations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dossier_id` (`dossier_id`);

--
-- Index pour la table `maintenances`
--
ALTER TABLE `maintenances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dossier_id` (`dossier_id`);

--
-- Index pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reclamations_par_operateur`
--
ALTER TABLE `reclamations_par_operateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tickets_installation`
--
ALTER TABLE `tickets_installation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tickets_maintenance`
--
ALTER TABLE `tickets_maintenance`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activations_service`
--
ALTER TABLE `activations_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `declarations`
--
ALTER TABLE `declarations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `declarations_panne`
--
ALTER TABLE `declarations_panne`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `dossiers`
--
ALTER TABLE `dossiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `installations`
--
ALTER TABLE `installations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `reclamations`
--
ALTER TABLE `reclamations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `reclamations_par_operateur`
--
ALTER TABLE `reclamations_par_operateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tickets_installation`
--
ALTER TABLE `tickets_installation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tickets_maintenance`
--
ALTER TABLE `tickets_maintenance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `installations`
--
ALTER TABLE `installations`
  ADD CONSTRAINT `installations_ibfk_1` FOREIGN KEY (`dossier_id`) REFERENCES `dossiers` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `maintenances`
--
ALTER TABLE `maintenances`
  ADD CONSTRAINT `maintenances_ibfk_1` FOREIGN KEY (`dossier_id`) REFERENCES `dossiers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
