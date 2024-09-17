<?php

// Configuration de la base de données
$host = 'localhost';
$dbname = 'plateforme';
$user = 'root';
$pass = '';
header('Content-Type: application/json');

// Connexion à la base de données
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    sendResponse(['status' => 'error', 'message' => 'Erreur de connexion à la base de données']);
    exit();
}

// Vérification de la méthode de la requête
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $ticket_id = $data['ticket_id'] ?? '';
    $new_status = $data['new_status'] ?? '';

    // Validation des données
    if (empty($ticket_id) || empty($new_status)) {
        sendResponse(['status' => 'error', 'message' => 'ID Ticket et nouveau statut sont requis']);
        exit();
    }

    // Mettre à jour le statut du ticket dans la base de données
    $sql = "UPDATE tickets SET statut = :new_status WHERE ticket_id = :ticket_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':new_status', $new_status);
    $stmt->bindParam(':ticket_id', $ticket_id);

    try {
        if ($stmt->execute()) {
            sendResponse(['status' => 'success', 'message' => 'Statut du ticket mis à jour avec succès']);
        } else {
            $errorInfo = $stmt->errorInfo();
            sendResponse(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du statut', 'error' => $errorInfo]);
        }
    } catch (PDOException $e) {
        sendResponse(['status' => 'error', 'message' => 'Erreur lors de la mise à jour du statut', 'error' => $e->getMessage()]);
    }
} else {
    sendResponse(['status' => 'error', 'message' => 'Méthode de requête non autorisée']);
}

// Fonction pour envoyer une réponse JSON
function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

?>
