<?php

// Configuration de la base de données
$host = 'localhost';
$dbname = 'plateforme';
$user = 'root';
$pass = '';
header('Content-Type: application/json');

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    sendResponse(['status' => 'error', 'message' => 'Erreur de connexion à la base de données']);
    exit();
}

// Vérification de la méthode de la requête
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = validateInput($_POST['action'] ?? '');
    handlePostRequest($action, $pdo);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = validateInput($_GET['action'] ?? '');
    handleGetRequest($action, $pdo);
}

// Fonction pour valider et nettoyer les entrées utilisateur
function validateInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
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
    $stmt = $pdo->prepare("INSERT INTO clients (idDossier, date, nom, prenom, contact, localisation, service, forfait, statut, problemes, historique, interaction, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        validateInput($_POST['idDossier']),
        validateInput($_POST['date']),
        validateInput($_POST['nom']),
        validateInput($_POST['prenom']),
        validateInput($_POST['contact']),
        validateInput($_POST['localisation']),
        validateInput($_POST['service']),
        validateInput($_POST['forfait']),
        validateInput($_POST['statut']),
        validateInput($_POST['problemes']),
        validateInput($_POST['historique']),
        validateInput($_POST['interaction']),
        validateInput($_POST['observation'])
    ]);
    sendResponse(['status' => 'success', 'message' => 'Client créé avec succès']);
}

function createTicket($pdo) {
    $stmt = $pdo->prepare("INSERT INTO tickets (ticket_id, date, nom, prenom, contact, localisation, service, forfait, statut, edl, techniciens, reference, sn, brin, materiel, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        validateInput($_POST['ticket-id']),
        validateInput($_POST['ticket-date']),
        validateInput($_POST['ticket-nom']),
        validateInput($_POST['ticket-prenom']),
        validateInput($_POST['ticket-contact']),
        validateInput($_POST['ticket-localisation']),
        validateInput($_POST['ticket-service']),
        validateInput($_POST['ticket-forfait']),
        validateInput($_POST['ticket-statut']),
        validateInput($_POST['ticket-edl']),
        validateInput($_POST['ticket-techniciens']),
        validateInput($_POST['ticket-reference']),
        validateInput($_POST['ticket-sn']),
        validateInput($_POST['ticket-brin']),
        validateInput($_POST['ticket-materiel']),
        validateInput($_POST['ticket-observation'])
    ]);
    sendResponse(['status' => 'success', 'message' => 'Ticket créé avec succès']);
}

function createActivation($pdo) {
    $stmt = $pdo->prepare("INSERT INTO activations (activation_id, date, nom, prenom, contact, localisation, service, forfait, statut, edl, techniciens, reference, fiberbox, brin, activation_date, sn, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        validateInput($_POST['activation-id']),
        validateInput($_POST['activation-date']),
        validateInput($_POST['activation-nom']),
        validateInput($_POST['activation-prenom']),
        validateInput($_POST['activation-contact']),
        validateInput($_POST['activation-localisation']),
        validateInput($_POST['activation-service']),
        validateInput($_POST['activation-forfait']),
        validateInput($_POST['activation-statut']),
        validateInput($_POST['activation-edl']),
        validateInput($_POST['activation-techniciens']),
        validateInput($_POST['activation-reference']),
        validateInput($_POST['activation-fiberbox']),
        validateInput($_POST['activation-brin']),
        validateInput($_POST['activation-activation-date']),
        validateInput($_POST['activation-sn']),
        validateInput($_POST['activation-observation'])
    ]);
    sendResponse(['status' => 'success', 'message' => 'Activation créée avec succès']);
}

function createMaintenance($pdo) {
    $stmt = $pdo->prepare("INSERT INTO maintenances (maintenance_id, date, nomPrenom, contact, localisation, probleme, rdv, statut, actions, techInstallateurs, edlInstallateur, edlMaintenancier, techMaintenanciers, materiel, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        validateInput($_POST['maintenance-id']),
        validateInput($_POST['maintenance-date']),
        validateInput($_POST['maintenance-nom-prenom']),
        validateInput($_POST['maintenance-contact']),
        validateInput($_POST['maintenance-localisation']),
        validateInput($_POST['maintenance-probleme']),
        validateInput($_POST['maintenance-rdv']),
        validateInput($_POST['maintenance-statut']),
        validateInput($_POST['maintenance-actions']),
        validateInput($_POST['maintenance-tech-installateurs']),
        validateInput($_POST['maintenance-edl-installateur']),
        validateInput($_POST['maintenance-edl-maintenancier']),
        validateInput($_POST['maintenance-tech-maintenanciers']),
        validateInput($_POST['maintenance-materiel']),
        validateInput($_POST['maintenance-observation'])
    ]);
    sendResponse(['status' => 'success', 'message' => 'Ticket de maintenance créé avec succès']);
}

function createReclamation($pdo) {
    $stmt = $pdo->prepare("INSERT INTO reclamations (reclamation_id, date_enregistrement, id_ticket, nomPrenom, contact, localisation, service_souhaite, forfait_paye, sn_client, statut, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        validateInput($_POST['reclamation-id']),
        validateInput($_POST['reclamation-date']),
        validateInput($_POST['reclamation-id-ticket']),
        validateInput($_POST['reclamation-nom-prenom']),
        validateInput($_POST['reclamation-contact']),
        validateInput($_POST['reclamation-localisation']),
        validateInput($_POST['reclamation-service']),
        validateInput($_POST['reclamation-forfait']),
        validateInput($_POST['reclamation-sn']),
        validateInput($_POST['reclamation-statut']),
        validateInput($_POST['reclamation-observation'])
    ]);
    sendResponse(['status' => 'success', 'message' => 'Reclamation enregistrée avec succès']);
}

function createDeclaration($pdo) {
    $stmt = $pdo->prepare("INSERT INTO declarations (declaration_id, date_enregistrement, nomPrenom, contact, localisation, probleme, statut, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        validateInput($_POST['declaration-id']),
        validateInput($_POST['declaration-date']),
        validateInput($_POST['declaration-nom-prenom']),
        validateInput($_POST['declaration-contact']),
        validateInput($_POST['declaration-localisation']),
        validateInput($_POST['declaration-probleme']),
        validateInput($_POST['declaration-statut']),
        validateInput($_POST['declaration-observation'])
    ]);
    sendResponse(['status' => 'success', 'message' => 'Déclaration enregistrée avec succès']);
}

// Fonction pour vérifier l'existence d'un client
function checkClient($pdo) {
    $nom = validateInput($_POST['nom'] ?? '');
    $prenom = validateInput($_POST['prenom'] ?? '');
    
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
    $stmt = $pdo->query("SELECT idDossier, nom, prenom, forfait, statut FROM clients");
    $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse($clients);
}

function getTicketsInstallation($pdo) {
    $stmt = $pdo->query("SELECT * FROM tickets ");
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
