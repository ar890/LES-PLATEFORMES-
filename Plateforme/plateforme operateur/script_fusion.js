document.addEventListener('DOMContentLoaded', function () {
    // --- ELEMENTS DOM ---
    const notification = document.getElementById('notification');
    
    // Forms
    const clientForm = document.getElementById('new-client-form');
    const ticketForm = document.getElementById('new-ticket-form');
    const activationForm = document.getElementById('new-activation-form');
    const maintenanceForm = document.getElementById('new-maintenance-form');
    const reclamationForm = document.getElementById('new-reclamation-form');
    const declarationForm = document.getElementById('new-declaration-form');
    const historiqueForm = document.getElementById('search-historique-form');

    // Tables
    const clientTableBody = document.getElementById('client-table-body');
    const ticketTableBody = document.getElementById('ticket-table-body');
    const activationTableBody = document.getElementById('activation-table-body');
    const maintenanceTableBody = document.getElementById('maintenance-table-body');
    const reclamationTableBody = document.getElementById('reclamation-table-body');
    const declarationTableBody = document.getElementById('declaration-table-body');
    const historiqueTableBody = document.getElementById('historique-table-body');

    // --- NOTIFICATIONS ---
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // --- GESTION DES FORMULAIRES ---
    function handleFormSubmission(formElement, endpoint) {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch(endpoint, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    showNotification(data.message || 'Operation successful!');
                })
                .catch(error => {
                    showNotification('Error: ' + error.message, 'error');
                });
        });
    }

    // Assignation des formulaires aux fonctions de soumission
    handleFormSubmission(clientForm, 'api.php');
    handleFormSubmission(ticketForm, 'api.php');
    handleFormSubmission(activationForm, 'api.php');
    handleFormSubmission(maintenanceForm, 'api.php');
    handleFormSubmission(reclamationForm, 'api.php');
    handleFormSubmission(declarationForm, 'api.php');

    // --- RECHERCHE ET AFFICHAGE DES DONNÉES ---
    function searchTable(tableId, event) {
        const searchValue = event.target.value.toLowerCase();
        const rows = document.querySelectorAll(`#${tableId} tr`);
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? '' : 'none';
        });
    }

    document.getElementById('client-search').addEventListener('input', searchTable.bind(null, 'client-table-body'));
    document.getElementById('ticket-search').addEventListener('input', searchTable.bind(null, 'ticket-table-body'));
    document.getElementById('activation-search').addEventListener('input', searchTable.bind(null, 'activation-table-body'));
    document.getElementById('maintenance-search').addEventListener('input', searchTable.bind(null, 'maintenance-table-body'));
    document.getElementById('reclamation-search').addEventListener('input', searchTable.bind(null, 'reclamation-table-body'));
    document.getElementById('declaration-search').addEventListener('input', searchTable.bind(null, 'declaration-table-body'));
    document.getElementById('historique-search').addEventListener('input', searchTable.bind(null, 'historique-table-body'));

    // --- FONCTIONS POUR RÉCUPÉRER ET AFFICHER LES DONNÉES ---
    function fetchData(action, tableBodyId) {
        fetch(`api.php?action=${action}`)
            .then(response => response.json())
            .then(data => {
                populateTable(tableBodyId, data);
            })
            .catch(error => {
                showNotification('Error fetching data: ' + error.message, 'error');
            });
    }

    function populateTable(tableBodyId, data) {
        const tableBody = document.getElementById(tableBodyId);
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }

    // --- BOUTONS POUR AFFICHER LES LISTES ---
    document.getElementById('view-clients-btn').addEventListener('click', () => {
        fetchData('get_clients', 'client-table-body');
        showClientList();
    });

    document.getElementById('view-tickets-btn').addEventListener('click', () => {
        fetchData('get_tickets_installation', 'ticket-table-body');
        showTicketList();
    });

    document.getElementById('view-activations-btn').addEventListener('click', () => {
        fetchData('get_activations_service', 'activation-table-body');
        showActivationList();
    });

    document.getElementById('view-maintenance-btn').addEventListener('click', () => {
        fetchData('get_tickets_maintenance', 'maintenance-table-body');
        showMaintenanceList();
    });

    document.getElementById('view-reclamations-btn').addEventListener('click', () => {
        fetchData('get_reclamations', 'reclamation-table-body');
        showReclamationList();
    });

    document.getElementById('view-declarations-btn').addEventListener('click', () => {
        fetchData('get_declarations_panne', 'declaration-table-body');
        showDeclarationList();
    });

    // --- FONCTIONS POUR AFFICHER LES FORMULAIRES ---
    function showForm(formElement) {
        const forms = document.querySelectorAll('.main-content > div');
        forms.forEach(form => form.classList.add('hidden'));
        formElement.classList.remove('hidden');
    }

    document.getElementById('add-client-btn').addEventListener('click', () => {
        showForm(clientForm);
    });

    document.getElementById('add-ticket-btn-list').addEventListener('click', () => {
        showForm(ticketForm);
    });

    document.getElementById('add-activation-btn-list').addEventListener('click', () => {
        showForm(activationForm);
    });

    document.getElementById('add-maintenance-btn-list').addEventListener('click', () => {
        showForm(maintenanceForm);
    });

    document.getElementById('add-reclamation-btn-list').addEventListener('click', () => {
        showForm(reclamationForm);
    });

    document.getElementById('add-declaration-btn-list').addEventListener('click', () => {
        showForm(declarationForm);
    });

    document.getElementById('add-historique-btn-list').addEventListener('click', () => {
        showForm(historiqueForm);
    });

    // --- GESTION DES VUES DES LISTES ---
    function showClientList() {
        showForm(document.getElementById('client-list'));
    }

    function showTicketList() {
        showForm(document.getElementById('ticket-list'));
    }

    function showActivationList() {
        showForm(document.getElementById('activation-list'));
    }

    function showMaintenanceList() {
        showForm(document.getElementById('maintenance-list'));
    }

    function showReclamationList() {
        showForm(document.getElementById('reclamation-list'));
    }

    function showDeclarationList() {
        showForm(document.getElementById('declaration-list'));
    }

    function showHistoriqueList() {
        showForm(document.getElementById('historique-list'));
    }

    // --- REINITIALISATION DES FORMULAIRES ---
    function generateDossierID() {
        return Math.floor(Math.random() * 1000);
    }

    document.getElementById('new-client-form').addEventListener('reset', function () {
        document.getElementById('idDossier').value = generateDossierID();
    });

    function generateTicketID() {
        return Math.floor(Math.random() * 10000);
    }

    document.getElementById('new-ticket-form').addEventListener('reset', function () {
        document.getElementById('ticket-id').value = generateTicketID();
    });

    function generateActivationID() {
        return Math.floor(Math.random() * 10000);
    }

    document.getElementById('new-activation-form').addEventListener('reset', function () {
        document.getElementById('activation-id').value = generateActivationID();
    });

    function generateMaintenanceID() {
        return Math.floor(Math.random() * 10000);
    }

    document.getElementById('new-maintenance-form').addEventListener('reset', function () {
        document.getElementById('maintenance-id').value = generateMaintenanceID();
    });

    function generateReclamationID() {
        return Math.floor(Math.random() * 10000);
    }

    document.getElementById('new-reclamation-form').addEventListener('reset', function () {
        document.getElementById('reclamation-id').value = generateReclamationID();
    });

    function generateDeclarationID() {
        return 'DPC' + Math.floor(Math.random() * 10000);
    }

    document.getElementById('new-declaration-form').addEventListener('reset', function () {
        document.getElementById('declaration-id').value = generateDeclarationID();
    });

    // --- POPULATE HISTORIQUE ---
    historiqueForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('api.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    populateHistoriqueData(data);
                } else {
                    showNotification('No historical data found', 'error');
                }
            })
            .catch(error => {
                showNotification('Error: ' + error.message, 'error');
            });
    });

    function populateHistoriqueData(data) {
        document.getElementById('historique-creation-dossier-date').value = data.dossier.creation_date || '';
        document.getElementById('historique-creation-dossier').checked = !!data.dossier;

        document.getElementById('historique-installation-client-date').value = data.installation.installation_date || '';
        document.getElementById('historique-installation-client').checked = !!data.installation;

        document.getElementById('historique-maintenance-step-1-date').value = data.maintenance.step1_date || '';
        document.getElementById('historique-maintenance-step-1').checked = !!data.maintenance;
    }

    // --- SEARCH FUNCTIONALITY FOR HISTORIQUE ---
    document.getElementById('historique-search').addEventListener('input', searchTable.bind(null, 'historique-table-body'));
});
