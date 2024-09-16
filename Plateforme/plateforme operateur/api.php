<?php

// Configuration de la base de données
$host = 'localhost';
$dbname = 'plateforme';
$user = 'root';
$pass = '';

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

// Vérification de la méthode de la requête
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    handlePostRequest($action, $pdo);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';
    handleGetRequest($action, $pdo);
}

// Fonction pour gérer les requêtes POST
function handlePostRequest($action, $pdo) {
    switch ($action) {
        case 'create_client':
            createClient($pdo);
            break;
        case 'create_ticket':
            createTicket($pdo);
            break;
        case 'create_activation':
            createActivation($pdo);
            break;
        case 'create_maintenance':
            createMaintenance($pdo);
            break;
        case 'create_reclamation':
            createReclamation($pdo);
            break;
        case 'create_declaration':
            createDeclaration($pdo);
            break;
        default:
            sendResponse(['status' => 'error', 'message' => 'Action inconnue']);
            break;
    }
}

// Fonction pour gérer les requêtes GET
function handleGetRequest($action, $pdo) {
    switch ($action) {
        case 'get_clients':
            getClients($pdo);
            break;
        case 'get_tickets_installation':
            getTicketsInstallation($pdo);
            break;
        case 'get_activations_service':
            getActivationsService($pdo);
            break;
        case 'get_tickets_maintenance':
            getMaintenanceTickets($pdo);
            break;
        case 'get_reclamations':
            getReclamations($pdo);
            break;
        case 'get_declarations_panne':
            getDeclarationsPanne($pdo);
            break;
        case 'check_client':
            checkClient($pdo); // Nouvelle fonctionnalité pour vérifier l'existence d'un client
            break;
        default:
            sendResponse(['status' => 'error', 'message' => 'Action inconnue']);
            break;
    }
}

// Fonctions pour créer des enregistrements dans la base de données
function createClient($pdo) {
    $stmt = $pdo->prepare("INSERT INTO clients (nom, prenom, contact, localisation, service, forfait, statut, problemes, historique, interaction, observation, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['nom'], 
        $_POST['prenom'], 
        $_POST['contact'], 
        $_POST['localisation'], 
        $_POST['service'], 
        $_POST['forfait'], 
        $_POST['statut'], 
        $_POST['problemes'], 
        $_POST['historique'], 
        $_POST['interaction'], 
        $_POST['observation'], 
        date('Y-m-d H:i:s') // Date actuelle par défaut
    ]);
    sendResponse(['status' => 'success', 'message' => 'Client créé avec succès']);
}

function createTicket($pdo) {
    $stmt = $pdo->prepare("INSERT INTO tickets (nom, prenom, contact, localisation, service, forfait, statut, edl, techniciens, reference, sn, brin, materiel, observation, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['nom'], 
        $_POST['prenom'], 
        $_POST['contact'], 
        $_POST['localisation'], 
        $_POST['service'], 
        $_POST['forfait'], 
        $_POST['statut'], 
        $_POST['edl'], 
        $_POST['techniciens'], 
        $_POST['reference'], 
        $_POST['sn'], 
        $_POST['brin'], 
        $_POST['materiel'], 
        $_POST['observation'], 
        date('Y-m-d H:i:s') // Date actuelle par défaut
    ]);
    sendResponse(['status' => 'success', 'message' => 'Ticket créé avec succès']);
}

function createActivation($pdo) {
    $stmt = $pdo->prepare("INSERT INTO activations (nom, prenom, contact, localisation, service, forfait, statut, edl, techniciens, reference, sn, brin, materiel, observation, date, activation_date, fiberbox) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['nom'], 
        $_POST['prenom'], 
        $_POST['contact'], 
        $_POST['localisation'], 
        $_POST['service'], 
        $_POST['forfait'], 
        $_POST['statut'], 
        $_POST['edl'], 
        $_POST['techniciens'], 
        $_POST['reference'], 
        $_POST['sn'], 
        $_POST['brin'], 
        $_POST['materiel'], 
        $_POST['observation'], 
        date('Y-m-d H:i:s'), // Date actuelle par défaut
        $_POST['activation_date'], 
        $_POST['fiberbox']
    ]);
    sendResponse(['status' => 'success', 'message' => 'Activation créée avec succès']);
}

function createMaintenance($pdo) {
    $stmt = $pdo->prepare("INSERT INTO maintenances (nomPrenom, contact, localisation, probleme, rdv, statut, actions, techInstallateurs, edlInstallateur, edlMaintenancier, techMaintenanciers, materiel, observation, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['nomPrenom'], 
        $_POST['contact'], 
        $_POST['localisation'], 
        $_POST['probleme'], 
        $_POST['rdv'], 
        $_POST['statut'], 
        $_POST['actions'], 
        $_POST['techInstallateurs'], 
        $_POST['edlInstallateur'], 
        $_POST['edlMaintenancier'], 
        $_POST['techMaintenanciers'], 
        $_POST['materiel'], 
        $_POST['observation'], 
        date('Y-m-d H:i:s') // Date actuelle par défaut
    ]);
    sendResponse(['status' => 'success', 'message' => 'Maintenance créée avec succès']);
}

function createReclamation($pdo) {
    $stmt = $pdo->prepare("INSERT INTO reclamations (nomPrenom, contact, localisation, service, forfait, statut, sn, observation, date, id_ticket) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['nomPrenom'], 
        $_POST['contact'], 
        $_POST['localisation'], 
        $_POST['service'], 
        $_POST['forfait'], 
        $_POST['statut'], 
        $_POST['sn'], 
        $_POST['observation'], 
        date('Y-m-d H:i:s'), // Date actuelle par défaut
        $_POST['id_ticket']
    ]);
    sendResponse(['status' => 'success', 'message' => 'Réclamation créée avec succès']);
}

function createDeclaration($pdo) {
    $stmt = $pdo->prepare("INSERT INTO declarations (nomPrenom, contact, localisation, probleme, statut, observation, date) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['nomPrenom'], 
        $_POST['contact'], 
        $_POST['localisation'], 
        $_POST['probleme'], 
        $_POST['statut'], 
        $_POST['observation'], 
        date('Y-m-d H:i:s') // Date actuelle par défaut
    ]);
    sendResponse(['status' => 'success', 'message' => 'Déclaration créée avec succès']);
}

// Fonction pour vérifier l'existence d'un client
function checkClient($pdo) {
    $nom = $_POST['nom'] ?? '';
    $prenom = $_POST['prenom'] ?? '';
    
    $stmt = $pdo->prepare("SELECT * FROM clients WHERE nom = ? AND prenom = ?");
    $stmt->execute([$nom, $prenom]);
    
    $client = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($client) {
        sendResponse(['status' => 'success', 'client' => $client]);
    } else {
        sendResponse(['status' => 'error', 'message' => 'Client non trouvé']);
    }
}

// Fonctions pour récupérer les données de la base de données
function getClients($pdo) {
    $stmt = $pdo->query("SELECT * FROM clients");
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($clients);
}

function getTicketsInstallation($pdo) {
    $stmt = $pdo->query("SELECT * FROM tickets WHERE type = 'installation'");
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($tickets);
}

function getActivationsService($pdo) {
    $stmt = $pdo->query("SELECT * FROM activations");
    $activations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($activations);
}

function getMaintenanceTickets($pdo) {
    $stmt = $pdo->query("SELECT * FROM maintenances");
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($tickets);
}

function getReclamations($pdo) {
    $stmt = $pdo->query("SELECT * FROM reclamations");
    $reclamations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($reclamations);
}

function getDeclarationsPanne($pdo) {
    $stmt = $pdo->query("SELECT * FROM declarations");
    $declarations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($declarations);
}

// Fonction pour envoyer une réponse JSON
function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

?>
