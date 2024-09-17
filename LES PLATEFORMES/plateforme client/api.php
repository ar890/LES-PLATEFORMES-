<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plateforme_bd2";

// Set header to JSON
header('Content-Type: application/json');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['message' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle Reclamation form
    if (isset($_POST['reclamation-nom']) && isset($_POST['reclamation-id-ticket'])) {
        $reclamationNom = $conn->real_escape_string($_POST['reclamation-nom']);
        $reclamationIdTicket = $conn->real_escape_string($_POST['reclamation-id-ticket']);
        $reclamationContact = $conn->real_escape_string($_POST['reclamation-contact']);
        $reclamationLocalisation = $conn->real_escape_string($_POST['reclamation-localisation']);
        $reclamationService = $conn->real_escape_string($_POST['reclamation-service']);
        $reclamationForfait = $conn->real_escape_string($_POST['reclamation-forfait']);
        $reclamationSN = $conn->real_escape_string($_POST['reclamation-sn']);
        $reclamationStatut = $conn->real_escape_string($_POST['reclamation-statut']);
        $reclamationObservation = $conn->real_escape_string($_POST['reclamation-observation']);
        $reclamationDate = $conn->real_escape_string($_POST['reclamation-date']);

        $sql = "INSERT INTO reclamations (id_ticket, nom, contact, localisation, service, forfait, sn, statut, observation, date_enregistrement)
                VALUES ('$reclamationIdTicket', '$reclamationNom', '$reclamationContact', '$reclamationLocalisation', '$reclamationService', '$reclamationForfait', '$reclamationSN', '$reclamationStatut', '$reclamationObservation', '$reclamationDate')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Réclamation soumise avec succès !']);
        } else {
            echo json_encode(['message' => 'Erreur lors de la soumission : ' . $conn->error]);
        }
        exit; // Prevent further processing
    }

    // Handle Declaration form
    if (isset($_POST['declaration-nom']) && isset($_POST['declaration-id-ticket'])) {
        $declarationNom = $conn->real_escape_string($_POST['declaration-nom']);
        $declarationContact = $conn->real_escape_string($_POST['declaration-contact']);
        $declarationLocalisation = $conn->real_escape_string($_POST['declaration-localisation']);
        $declarationProbleme = $conn->real_escape_string($_POST['declaration-probleme']);
        $declarationStatut = $conn->real_escape_string($_POST['declaration-statut']);
        $declarationObservation = $conn->real_escape_string($_POST['declaration-observation']);
        $declarationDate = $conn->real_escape_string($_POST['declaration-date']);
        $declarationIdTicket = $conn->real_escape_string($_POST['ID_Ticket_DPC-id']);

        $sql = "INSERT INTO declarations (id_ticket, nom, contact, localisation, probleme, statut, observation, date_enregistrement)
                VALUES ('$declarationIdTicket', '$declarationNom', '$declarationContact', '$declarationLocalisation', '$declarationProbleme', '$declarationStatut', '$declarationObservation', '$declarationDate')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Déclaration soumise avec succès !']);
        } else {
            echo json_encode(['message' => 'Erreur lors de la soumission : ' . $conn->error]);
        }
        exit; // Prevent further processing
    }

    // Handle Consultation form
    if (isset($_POST['nomPrenoms']) && isset($_POST['contacts'])) {
        $nomPrenoms = $conn->real_escape_string($_POST['nomPrenoms']);
        $contacts = $conn->real_escape_string($_POST['contacts']);
        $localisation = $conn->real_escape_string($_POST['localisation']);
        $service = $conn->real_escape_string($_POST['service']);
        $forfait = $conn->real_escape_string($_POST['forfait']);

        $query = "SELECT * FROM dossiers WHERE nom_prenoms='$nomPrenoms' AND contact='$contacts' AND localisation='$localisation' AND service='$service' AND forfait='$forfait'";
        $result = $conn->query($query);

        $historique = [
            'dossier' => null,
            'installation' => null,
            'maintenance' => null
        ];

        if ($result->num_rows > 0) {
            // Récupérer les détails du dossier
            $historique['dossier'] = $result->fetch_assoc();

            // Requête pour obtenir l'installation et la maintenance si elles existent
            $installationQuery = "SELECT * FROM installations WHERE dossier_id=" . $historique['dossier']['id'];
            $installationResult = $conn->query($installationQuery);
            if ($installationResult->num_rows > 0) {
                $historique['installation'] = $installationResult->fetch_assoc();
            }

            $maintenanceQuery = "SELECT * FROM maintenances WHERE dossier_id=" . $historique['dossier']['id'];
            $maintenanceResult = $conn->query($maintenanceQuery);
            if ($maintenanceResult->num_rows > 0) {
                $historique['maintenance'] = $maintenanceResult->fetch_assoc();
            }
        }

        echo json_encode($historique);
        exit;
    }
}

// Handle GET requests for fetching data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'get_reclamations':
                $result = $conn->query("SELECT * FROM reclamations");
                $reclamations = [];
                
                while ($row = $result->fetch_assoc()) {
                    $reclamations[] = $row;
                }
                
                echo json_encode($reclamations);
                break;

            case 'get_declarations':
                $result = $conn->query("SELECT * FROM declarations");
                $declarations = [];
                
                while ($row = $result->fetch_assoc()) {
                    $declarations[] = $row;
                }
                
                echo json_encode($declarations);
                break;

            default:
                echo json_encode(['message' => 'Action non reconnue.']);
                break;
        }
    } else {
        echo json_encode(['message' => 'Aucune action spécifiée.']);
    }
    exit;
}

// Close connection
$conn->close();

// If no valid request type was handled, return an error
echo json_encode(['message' => 'Méthode non supportée.']);
?>
