document.addEventListener('DOMContentLoaded', function () {

    
    // Generic function to fetch and display data
    function fetchData(endpoint, successCallback, errorMessage = "Erreur lors de la récupération des données") {
        fetch(endpoint)
            .then(response => response.json())
            .then(successCallback)
            .catch(error => {
                showNotification(errorMessage, 'error');
                console.error('Erreur :', error);
            });
    }

    // Generic form handler
    function handleFormSubmission(event, action, fetchAction) {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('action', action);

        fetch('api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                showNotification(data.message || `${action} exécuté avec succès !`, 'success');
                fetchAction();  // Call appropriate fetch based on action
            })
            .catch(error => {
                showNotification(`Erreur lors de l'exécution de ${action} : ${error.message}`, 'error');
                console.error('Erreur :', error);
            });
    }

    // Specific form handling for each form type
    elements.forms.client.addEventListener('submit', (e) => handleFormSubmission(e, 'create_client', fetchClients));
    elements.forms.ticket.addEventListener('submit', (e) => handleFormSubmission(e, 'create_ticket', fetchTicketsInstallation));
    elements.forms.activation.addEventListener('submit', (e) => handleFormSubmission(e, 'create_activation', fetchActivationsService));
    elements.forms.maintenance.addEventListener('submit', (e) => handleFormSubmission(e, 'create_maintenance', fetchMaintenanceTickets));
    elements.forms.reclamation.addEventListener('submit', (e) => handleFormSubmission(e, 'create_reclamation', fetchReclamations));
    elements.forms.declaration.addEventListener('submit', (e) => handleFormSubmission(e, 'create_declaration', fetchDeclarationsPanne));

    // Notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Fetch clients
    function fetchClients() {
        fetchData('api.php?action=get_clients', renderClientList, 'Erreur lors de la récupération des clients');
    }

    // Fetch tickets installation
    function fetchTicketsInstallation() {
        fetchData('api.php?action=get_tickets_installation', renderTicketList, 'Erreur lors de la récupération des tickets d\'installation');
    }

    // Fetch activations
    function fetchActivationsService() {
        fetchData('api.php?action=get_activations_service', renderActivationList, 'Erreur lors de la récupération des activations');
    }

    // Fetch maintenance tickets
    function fetchMaintenanceTickets() {
        fetchData('api.php?action=get_tickets_maintenance', renderMaintenanceList, 'Erreur lors de la récupération des tickets de maintenance');
    }

    // Fetch reclamations
    function fetchReclamations() {
        fetchData('api.php?action=get_reclamations', renderReclamationList, 'Erreur lors de la récupération des réclamations');
    }

    // Fetch declarations panne
    function fetchDeclarationsPanne() {
        fetchData('api.php?action=get_declarations_panne', renderDeclarationList, 'Erreur lors de la récupération des déclarations de panne');
    }

    // Rendering functions for each list (reuse for all list types)
    function renderList(data, element, tableBody) {
        tableBody.innerHTML = '';
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            // Build the table row dynamically
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nom}</td>
                <td>${item.prenom}</td>
                <td>${item.service}</td>
                <td>${item.statut}</td>
                <td>
                    <select data-index="${index}" class="status-select">
                        <option value="ouvert" ${item.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                        <option value="en cours" ${item.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="résolu" ${item.statut === 'résolu' ? 'selected' : ''}>Résolu</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // View functions for each list
    function renderClientList(data) { renderList(data, 'client', document.getElementById('client-table-body')); }
    function renderTicketList(data) { renderList(data, 'ticket', document.getElementById('ticket-table-body')); }
    function renderActivationList(data) { renderList(data, 'activation', document.getElementById('activation-table-body')); }
    function renderMaintenanceList(data) { renderList(data, 'maintenance', document.getElementById('maintenance-table-body')); }
    function renderReclamationList(data) { renderList(data, 'reclamation', document.getElementById('reclamation-table-body')); }
    function renderDeclarationList(data) { renderList(data, 'declaration', document.getElementById('declaration-table-body')); }

    // Assign event listeners to buttons
    elements.viewButtons.clients.addEventListener('click', fetchClients);
    elements.viewButtons.tickets.addEventListener('click', fetchTicketsInstallation);
    elements.viewButtons.activations.addEventListener('click', fetchActivationsService);
    elements.viewButtons.maintenance.addEventListener('click', fetchMaintenanceTickets);
    elements.viewButtons.reclamations.addEventListener('click', fetchReclamations);
    elements.viewButtons.declarations.addEventListener('click', fetchDeclarationsPanne);
});
