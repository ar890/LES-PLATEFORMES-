document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const notification = document.getElementById('notification');
    const clientForm = document.getElementById('new-client-form');
    const ticketForm = document.getElementById('new-ticket-form');
    const activationForm = document.getElementById('new-activation-form');
    const maintenanceForm = document.getElementById('new-maintenance-form');
    const reclamationForm = document.getElementById('new-reclamation-form');
    const declarationForm = document.getElementById('new-declaration-form');
    const historiqueForm = document.getElementById('search-historique-form');

    // Helper function to show notifications
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Submit handler for forms
    function handleFormSubmission(formElement, endpoint) {
        formElement.addEventListener('submit', function(event) {
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

    // Handle Client Form Submission
    handleFormSubmission(clientForm, 'api.php');

    // Handle Ticket Form Submission
    handleFormSubmission(ticketForm, 'api.php');

    // Handle Activation Form Submission
    handleFormSubmission(activationForm, 'api.php');

    // Handle Maintenance Form Submission
    handleFormSubmission(maintenanceForm, 'api.php');

    // Handle Reclamation Form Submission
    handleFormSubmission(reclamationForm, 'api.php');

    // Handle Declaration Form Submission
    handleFormSubmission(declarationForm, 'api.php');

    // Handle Historique Form Submission
    historiqueForm.addEventListener('submit', function(event) {
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

    // Function to populate historique data
    function populateHistoriqueData(data) {
        document.getElementById('historique-creation-dossier-date').value = data.dossier.creation_date || '';
        document.getElementById('historique-creation-dossier').checked = !!data.dossier;

        document.getElementById('historique-installation-client-date').value = data.installation.installation_date || '';
        document.getElementById('historique-installation-client').checked = !!data.installation;

        document.getElementById('historique-maintenance-step-1-date').value = data.maintenance.step1_date || '';
        document.getElementById('historique-maintenance-step-1').checked = !!data.maintenance;
    }

    // Search functionality for client, ticket, activation, maintenance, reclamation, and declaration lists
    document.getElementById('client-search').addEventListener('input', searchTable.bind(null, 'client-table-body'));
    document.getElementById('ticket-search').addEventListener('input', searchTable.bind(null, 'ticket-table-body'));
    document.getElementById('activation-search').addEventListener('input', searchTable.bind(null, 'activation-table-body'));
    document.getElementById('maintenance-search').addEventListener('input', searchTable.bind(null, 'maintenance-table-body'));
    document.getElementById('reclamation-search').addEventListener('input', searchTable.bind(null, 'reclamation-table-body'));
    document.getElementById('declaration-search').addEventListener('input', searchTable.bind(null, 'declaration-table-body'));

    // Generic function to search within a table
    function searchTable(tableId, event) {
        const searchValue = event.target.value.toLowerCase();
        const rows = document.querySelectorAll(`#${tableId} tr`);
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? '' : 'none';
        });
    }

    // Fetch and display clients, tickets, activations, maintenance, reclamations, declarations, or historiques
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

    // Populate a table with data
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

    // Example fetch calls to load initial data
    document.getElementById('view-clients-btn').addEventListener('click', () => {
        fetchData('get_clients', 'client-table-body');
        showForm(document.getElementById('client-list'));
    });

    document.getElementById('view-tickets-btn').addEventListener('click', () => {
        fetchData('get_tickets_installation', 'ticket-table-body');
        showForm(document.getElementById('ticket-list'));
    });

    document.getElementById('view-activations-btn').addEventListener('click', () => {
        fetchData('get_activations_service', 'activation-table-body');
        showForm(document.getElementById('activation-list'));
    });

    document.getElementById('view-maintenance-btn').addEventListener('click', () => {
        fetchData('get_tickets_maintenance', 'maintenance-table-body');
        showForm(document.getElementById('maintenance-list'));
    });

    document.getElementById('view-reclamations-btn').addEventListener('click', () => {
        fetchData('get_reclamations', 'reclamation-table-body');
        showForm(document.getElementById('reclamation-list'));
    });

    document.getElementById('view-declarations-btn').addEventListener('click', () => {
        fetchData('get_declarations_panne', 'declaration-table-body');
        showForm(document.getElementById('declaration-list'));
    });

    // Function to show a specific form
    function showForm(formElement) {
        const forms = document.querySelectorAll('.main-content > div');
        forms.forEach(form => form.classList.add('hidden'));
        formElement.classList.remove('hidden');
    }

    // Show new client form
    document.getElementById('add-client-btn').addEventListener('click', () => {
        showForm(clientForm);
    });

    // Show new ticket form
    document.getElementById('add-ticket-btn-list').addEventListener('click', () => {
        showForm(ticketForm);
    });

    // Show new activation form
    document.getElementById('add-activation-btn-list').addEventListener('click', () => {
        showForm(activationForm);
    });

    // Show new maintenance form
    document.getElementById('add-maintenance-btn-list').addEventListener('click', () => {
        showForm(maintenanceForm);
    });

    // Show new reclamation form
    document.getElementById('add-reclamation-btn-list').addEventListener('click', () => {
        showForm(reclamationForm);
    });

    // Show new declaration form
    document.getElementById('add-declaration-btn-list').addEventListener('click', () => {
        showForm(declarationForm);
    });

    // Show historique form
    document.getElementById('add-historique-btn-list').addEventListener('click', () => {
        showForm(historiqueForm);
    });

    // Search functionality for historique
    document.getElementById('historique-search').addEventListener('input', searchTable.bind(null, 'historique-table-body'));
});
