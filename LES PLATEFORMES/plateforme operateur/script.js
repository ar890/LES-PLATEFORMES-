document.addEventListener('DOMContentLoaded', function () {
    
    const viewClientsBtn = document.getElementById('view-clients-btn');
    const viewTicketsBtn = document.getElementById('view-tickets-btn');
    const viewActivationsBtn = document.getElementById('view-activations-btn');
    const viewMaintenanceBtn = document.getElementById('view-maintenance-btn');
    const viewReclamationsBtn = document.getElementById('view-reclamations-btn');
    const viewDeclarationsBtn = document.getElementById('view-declarations-btn');
    const viewHistoriquesBtn = document.getElementById('view-historiques-btn');

    const clientList = document.getElementById('client-list');
    const clientForm = document.getElementById('client-form');
    const ticketForm = document.getElementById('ticket-form');
    const activationForm = document.getElementById('activation-form');
    const maintenanceForm = document.getElementById('maintenance-form');
    const reclamationForm = document.getElementById('reclamation-form');
    const declarationForm = document.getElementById('declaration-form');
    const historiqueForm = document.getElementById('historique-form');
    
    // Fonction pour afficher des notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }


    // Event listeners for view buttons
    viewClientsBtn.addEventListener('click', showClientList);
    viewTicketsBtn.addEventListener('click', showTicketList);
    viewActivationsBtn.addEventListener('click', showActivationList);
    viewMaintenanceBtn.addEventListener('click', showMaintenanceList);
    viewReclamationsBtn.addEventListener('click', showReclamationList);
    viewDeclarationsBtn.addEventListener('click', showDeclarationList);
    viewHistoriquesBtn.addEventListener('click', showHistoriqueList);

    // Event listeners for form submissions
    clientForm.addEventListener('submit', handleClientForm);
    ticketForm.addEventListener('submit', handleTicketForm);
    activationForm.addEventListener('submit', handleActivationForm);
    maintenanceForm.addEventListener('submit', handleMaintenanceForm);
    reclamationForm.addEventListener('submit', handleReclamationForm);
    declarationForm.addEventListener('submit', handleDeclarationForm);

    // Handle form submission
    function handleFormSubmission(event, action) {
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
                switch (action) {
                    case 'create_client':
                        fetchClients();
                        break;
                    case 'create_ticket':
                        fetchTicketsInstallation();
                        break;
                    case 'create_activation':
                        fetchActivationsService();
                        break;
                    case 'create_maintenance':
                        fetchMaintenanceTickets();
                        break;
                    case 'create_reclamation':
                        fetchReclamations();
                        break;
                    case 'create_declaration':
                        fetchDeclarationsPanne();
                        break;
                }
            })
            .catch(error => {
                showNotification(`Erreur lors de l'exécution de ${action} : ` + error.message, 'error');
                console.error('Erreur :', error);
            });
    }

    function handleClientForm(event) {
        handleFormSubmission(event, 'create_client');
    }

    function handleTicketForm(event) {
        handleFormSubmission(event, 'create_ticket');
    }

    function handleActivationForm(event) {
        handleFormSubmission(event, 'create_activation');
    }

    function handleMaintenanceForm(event) {
        handleFormSubmission(event, 'create_maintenance');
    }

    function handleReclamationForm(event) {
        handleFormSubmission(event, 'create_reclamation');
    }

    function handleDeclarationForm(event) {
        handleFormSubmission(event, 'create_declaration');
    }

    // Fetch and display data functions
    function fetchClients() {
        fetch('api.php?action=get_clients')
            .then(response => response.json())
            .then(data => {
                renderClientList(data);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des clients', 'error');
                console.error('Erreur :', error);
            });
    }

    function fetchTicketsInstallation() {
        fetch('api.php?action=get_tickets_installation')
            .then(response => response.json())
            .then(data => {
                renderTicketList(data);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des tickets d\'installation', 'error');
                console.error('Erreur :', error);
            });
    }

    function fetchActivationsService() {
        fetch('api.php?action=get_activations_service')
            .then(response => response.json())
            .then(data => {
                renderActivationList(data);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des activations de service', 'error');
                console.error('Erreur :', error);
            });
    }

    function fetchMaintenanceTickets() {
        fetch('api.php?action=get_tickets_maintenance')
            .then(response => response.json())
            .then(data => {
                renderMaintenanceList(data);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des tickets de maintenance', 'error');
                console.error('Erreur :', error);
            });
    }

    function fetchReclamations() {
        fetch('api.php?action=get_reclamations')
            .then(response => response.json())
            .then(data => {
                renderReclamationList(data);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des réclamations', 'error');
                console.error('Erreur :', error);
            });
    }

    function fetchDeclarationsPanne() {
        fetch('api.php?action=get_declarations_panne')
            .then(response => response.json())
            .then(data => {
                renderDeclarationList(data);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des déclarations de panne', 'error');
                console.error('Erreur :', error);
            });
    }

    const ticketList = document.getElementById('ticket-list');
    const activationList = document.getElementById('activation-list');
    const maintenanceList = document.getElementById('maintenance-list');
    const reclamationList = document.getElementById('reclamation-list');
    const declarationList = document.getElementById('declaration-list');
    const historiqueList = document.getElementById('historique-list');

    const newClientForm = document.getElementById('new-client-form');
    const newTicketForm = document.getElementById('new-ticket-form');
    const newActivationForm = document.getElementById('new-activation-form');
    const newMaintenanceForm = document.getElementById('new-maintenance-form');
    const newReclamationForm = document.getElementById('new-reclamation-form');
    const newDeclarationForm = document.getElementById('new-declaration-form');
    

    const clientTableBody = document.getElementById('client-table-body');
    const ticketTableBody = document.getElementById('ticket-table-body');
    const activationTableBody = document.getElementById('activation-table-body');
    const maintenanceTableBody = document.getElementById('maintenance-table-body');
    const reclamationTableBody = document.getElementById('reclamation-table-body');
    const declarationTableBody = document.getElementById('declaration-table-body');
    const historiqueTableBody = document.getElementById('historique-table-body');

    const addClientBtn = document.getElementById('add-client-btn');
    const addTicketBtnList = document.getElementById('add-ticket-btn-list');
    const addActivationBtnList = document.getElementById('add-activation-btn-list');
    const addMaintenanceBtnList = document.getElementById('add-maintenance-btn-list');
    const addReclamationBtnList = document.getElementById('add-reclamation-btn-list');
    const addDeclarationBtnList = document.getElementById('add-declaration-btn-list');
    const addHistoriqueBtnList = document.getElementById('add-historique-btn-list');

    const notification = document.getElementById('notification');
    const clientSearch = document.getElementById('client-search');
    const ticketSearch = document.getElementById('ticket-search');
    const activationSearch = document.getElementById('activation-search');
    const maintenanceSearch = document.getElementById('maintenance-search');
    const reclamationSearch = document.getElementById('reclamation-search');
    const declarationSearch = document.getElementById('declaration-search');
    const historiqueSearch = document.getElementById('historique-search');

    const priseEnMainCount = document.getElementById('prise-en-main-count');
    const enCoursCount = document.getElementById('en-cours-count');
    const problemeCount = document.getElementById('probleme-count');
    const clotureCount = document.getElementById('cloture-count');

    const ouvertCount = document.getElementById('ouvert-count');
    const enCoursCountTicket = document.getElementById('en-cours-count-ticket');
    const resoluCount = document.getElementById('resolu-count');

    const ouvertCountActivation = document.getElementById('ouvert-count-activation');
    const enCoursCountActivation = document.getElementById('en-cours-count-activation');
    const resoluCountActivation = document.getElementById('resolu-count-activation');

    const ouvertCountMaintenance = document.getElementById('ouvert-count-maintenance');
    const enCoursCountMaintenance = document.getElementById('en-cours-count-maintenance');
    const resoluCountMaintenance = document.getElementById('resolu-count-maintenance');

    const ouvertCountReclamation = document.getElementById('ouvert-count-reclamation');
    const enCoursCountReclamation = document.getElementById('en-cours-count-reclamation');
    const resoluCountReclamation = document.getElementById('resolu-count-reclamation');

    const ouvertCountDeclaration = document.getElementById('ouvert-count-declaration');
    const enCoursCountDeclaration = document.getElementById('en-cours-count-declaration');
    const resoluCountDeclaration = document.getElementById('resolu-count-declaration');

    let clients = [];
    let tickets = [];
    let activations = [];
    let maintenances = [];
    let reclamations = [];
    let declarations = [];
    let historiques = [];

    
    viewClientsBtn.addEventListener('click', showClientList);
    
    viewTicketsBtn.addEventListener('click', showTicketList);
    
    viewActivationsBtn.addEventListener('click', showActivationList);
    
    viewMaintenanceBtn.addEventListener('click', showMaintenanceList);
    
    viewReclamationsBtn.addEventListener('click', showReclamationList);
    
    viewDeclarationsBtn.addEventListener('click', showDeclarationList);
    
    viewHistoriquesBtn.addEventListener('click', showHistoriqueList);

    addClientBtn.addEventListener('click', showClientForm);
    addTicketBtnList.addEventListener('click', showTicketForm);
    addActivationBtnList.addEventListener('click', showActivationForm);
    addMaintenanceBtnList.addEventListener('click', showMaintenanceForm);
    addReclamationBtnList.addEventListener('click', showReclamationForm);
    addDeclarationBtnList.addEventListener('click', showDeclarationForm);
    addHistoriqueBtnList.addEventListener('click', showHistoriqueForm);

    clientSearch.addEventListener('input', filterClients);
    ticketSearch.addEventListener('input', filterTickets);
    activationSearch.addEventListener('input', filterActivations);
    maintenanceSearch.addEventListener('input', filterMaintenances);
    reclamationSearch.addEventListener('input', filterReclamations);
    declarationSearch.addEventListener('input', filterDeclarations);
    historiqueSearch.addEventListener('input', filterHistoriques);

    newClientForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newClient = {
            id: document.getElementById('idDossier').value,
            date: document.getElementById('date').value,
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            contact: document.getElementById('contact').value,
            localisation: document.getElementById('localisation').value,
            service: document.getElementById('service').value,
            forfait: document.getElementById('forfait').value,
            statut: document.getElementById('statut').value,
            problemes: document.getElementById('problemes').value,
            historique: document.getElementById('historique').value,
            interaction: document.getElementById('interaction').value,
            observation: document.getElementById('observation').value,
        };

        clients.push(newClient);
        newClientForm.reset();
        showNotification('Client ajouté avec succès');
        showClientList();
    });

    newTicketForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newTicket = {
            id: document.getElementById('ticket-id').value,
            date: document.getElementById('ticket-date').value,
            nom: document.getElementById('ticket-nom').value,
            prenom: document.getElementById('ticket-prenom').value,
            contact: document.getElementById('ticket-contact').value,
            localisation: document.getElementById('ticket-localisation').value,
            service: document.getElementById('ticket-service').value,
            forfait: document.getElementById('ticket-forfait').value,
            edl: document.getElementById('ticket-edl').value,
            statut: document.getElementById('ticket-statut').value,
            techniciens: document.getElementById('ticket-techniciens').value,
            reference: document.getElementById('ticket-reference').value,
            sn: document.getElementById('ticket-sn').value,
            brin: document.getElementById('ticket-brin').value,
            materiel: document.getElementById('ticket-materiel').value,
            observation: document.getElementById('ticket-observation').value,
        };

        tickets.push(newTicket);
        newTicketForm.reset();
        showNotification('Ticket d\'installation ajouté avec succès');
        showTicketList();
    });

    newActivationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newActivation = {
            id: document.getElementById('activation-id').value,
            date: document.getElementById('activation-date').value,
            nom: document.getElementById('activation-nom').value,
            prenom: document.getElementById('activation-prenom').value,
            contact: document.getElementById('activation-contact').value,
            localisation: document.getElementById('activation-localisation').value,
            service: document.getElementById('activation-service').value,
            forfait: document.getElementById('activation-forfait').value,
            edl: document.getElementById('activation-edl').value,
            statut: document.getElementById('activation-statut').value,
            techniciens: document.getElementById('activation-techniciens').value,
            reference: document.getElementById('activation-reference').value,
            fiberbox: document.getElementById('activation-fiberbox').value,
            brin: document.getElementById('activation-brin').value,
            activationDate: document.getElementById('activation-activation-date').value,
            sn: document.getElementById('activation-sn').value,
            observation: document.getElementById('activation-observation').value,
        };

        activations.push(newActivation);
        newActivationForm.reset();
        showNotification('Activation de service ajoutée avec succès');
        showActivationList();
    });

    newMaintenanceForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newMaintenance = {
            id: document.getElementById('maintenance-id').value,
            date: document.getElementById('maintenance-date').value,
            nomPrenom: document.getElementById('maintenance-nom-prenom').value,
            contact: document.getElementById('maintenance-contact').value,
            localisation: document.getElementById('maintenance-localisation').value,
            probleme: document.getElementById('maintenance-probleme').value,
            rdv: document.getElementById('maintenance-rdv').value,
            statut: document.getElementById('maintenance-statut').value,
            actions: document.getElementById('maintenance-actions').value,
            techInstallateurs: document.getElementById('maintenance-tech-installateurs').value,
            edlInstallateur: document.getElementById('maintenance-edl-installateur').value,
            edlMaintenancier: document.getElementById('maintenance-edl-maintenancier').value,
            techMaintenanciers: document.getElementById('maintenance-tech-maintenanciers').value,
            materiel: document.getElementById('maintenance-materiel').value,
            observation: document.getElementById('maintenance-observation').value,
        };

        maintenances.push(newMaintenance);
        newMaintenanceForm.reset();
        showNotification('Ticket de maintenance ajouté avec succès');
        showMaintenanceList();
    });

    newReclamationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newReclamation = {
            id: document.getElementById('reclamation-id').value,
            date: document.getElementById('reclamation-date').value,
            idTicket: document.getElementById('reclamation-id-ticket').value,
            nomPrenom: document.getElementById('reclamation-nom-prenom').value,
            contact: document.getElementById('reclamation-contact').value,
            localisation: document.getElementById('reclamation-localisation').value,
            service: document.getElementById('reclamation-service').value,
            forfait: document.getElementById('reclamation-forfait').value,
            sn: document.getElementById('reclamation-sn').value,
            statut: document.getElementById('reclamation-statut').value,
            observation: document.getElementById('reclamation-observation').value,
        };

        reclamations.push(newReclamation);
        newReclamationForm.reset();
        showNotification('Réclamation client ajoutée avec succès');
        showReclamationList();
    });

    newDeclarationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newDeclaration = {
            id: document.getElementById('declaration-id').value,
            date: document.getElementById('declaration-date').value,
            nomPrenom: document.getElementById('declaration-nom-prenom').value,
            contact: document.getElementById('declaration-contact').value,
            localisation: document.getElementById('declaration-localisation').value,
            probleme: document.getElementById('declaration-probleme').value,
            statut: document.getElementById('declaration-statut').value,
            observation: document.getElementById('declaration-observation').value,
        };

        declarations.push(newDeclaration);
        newDeclarationForm.reset();
        showNotification('Déclaration de panne ajoutée avec succès');
        showDeclarationList();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const newHistoriqueForm = document.getElementById('search-historique-form');
    
        newHistoriqueForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const newHistorique = {
                id: document.getElementById('historique-id').value,
                date: document.getElementById('historique-date').value,
                nomPrenom: document.getElementById('historique-nom-prenom').value,
                contact: document.getElementById('historique-contact').value,
                localisation: document.getElementById('historique-localisation').value,
                service: document.getElementById('historique-service').value,
                forfait: document.getElementById('historique-forfait').value,
                statut: document.getElementById('historique-statut').value,
                edl: document.getElementById('historique-edl').value,
                observation: document.getElementById('historique-observation').value,
                installation: {
                    dateA: document.getElementById('installation-date-a').value,
                    dateB: document.getElementById('installation-date-b').value,
                    dateC: document.getElementById('installation-date-c').value,
                    dateD: document.getElementById('installation-date-d').value,
                    dateE: document.getElementById('installation-date-e').value,
                    dateF: document.getElementById('installation-date-f').value
                },
                maintenance: {
                    dateA: document.getElementById('maintenance-date-a').value,
                    dateB: document.getElementById('maintenance-date-b').value,
                    dateC: document.getElementById('maintenance-date-c').value,
                    dateD: document.getElementById('maintenance-date-d').value
                }
            };
    
            // Supposons que vous avez une variable globale `historiques` pour stocker les données.
            historiques.push(newHistorique);
            newHistoriqueForm.reset();
            showNotification('Historique dossier ajouté avec succès');
            showHistoriqueList();
        });
    });
    

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    function filterClients() {
        const searchTerm = clientSearch.value.toLowerCase();
        const filteredClients = clients.filter(client =>
            client.nom.toLowerCase().includes(searchTerm) ||
            client.prenom.toLowerCase().includes(searchTerm) ||
            client.id.toLowerCase().includes(searchTerm)
        );
        renderClientList(filteredClients);
    }

    function filterTickets() {
        const searchTerm = ticketSearch.value.toLowerCase();
        const filteredTickets = tickets.filter(ticket =>
            ticket.nom.toLowerCase().includes(searchTerm) ||
            ticket.prenom.toLowerCase().includes(searchTerm) ||
            ticket.id.toLowerCase().includes(searchTerm)
        );
        renderTicketList(filteredTickets);
    }

    function filterActivations() {
        const searchTerm = activationSearch.value.toLowerCase();
        const filteredActivations = activations.filter(activation =>
            activation.nom.toLowerCase().includes(searchTerm) ||
            activation.prenom.toLowerCase().includes(searchTerm) ||
            activation.id.toLowerCase().includes(searchTerm)
        );
        renderActivationList(filteredActivations);
    }

    function filterMaintenances() {
        const searchTerm = maintenanceSearch.value.toLowerCase();
        const filteredMaintenances = maintenances.filter(maintenance =>
            maintenance.nomPrenom.toLowerCase().includes(searchTerm) ||
            maintenance.id.toLowerCase().includes(searchTerm)
        );
        renderMaintenanceList(filteredMaintenances);
    }

    function filterReclamations() {
        const searchTerm = reclamationSearch.value.toLowerCase();
        const filteredReclamations = reclamations.filter(reclamation =>
            reclamation.nomPrenom.toLowerCase().includes(searchTerm) ||
            reclamation.id.toLowerCase().includes(searchTerm)
        );
        renderReclamationList(filteredReclamations);
    }

    function filterDeclarations() {
        const searchTerm = declarationSearch.value.toLowerCase();
        const filteredDeclarations = declarations.filter(declaration =>
            declaration.nomPrenom.toLowerCase().includes(searchTerm) ||
            declaration.id.toLowerCase().includes(searchTerm)
        );
        renderDeclarationList(filteredDeclarations);
    }

    function filterHistoriques() {
        const searchTerm = historiqueSearch.value.toLowerCase();
        const filteredHistoriques = historiques.filter(historique =>
            historique.nomPrenom.toLowerCase().includes(searchTerm) ||
            historique.id.toLowerCase().includes(searchTerm)
        );
        renderHistoriqueList(filteredHistoriques);
    }

    function renderClientList(clientData = clients) {
        clientTableBody.innerHTML = '';
        let priseEnMain = 0, enCours = 0, probleme = 0, cloture = 0;
    
        clientData.forEach((client, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.idDossier}</td>
                <td>${client.nom}</td>
                <td>${client.prenom}</td>
                <td>${client.forfait}</td>
                <td class="client-statut">${client.statut}</td>
                <td>
                    <select data-index="${index}" class="status-select">
                        <option value="prise en main" ${client.statut === 'prise en main' ? 'selected' : ''}>Prise en main</option>
                        <option value="en cours" ${client.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="dossier à problème" ${client.statut === 'dossier à problème' ? 'selected' : ''}>Dossier à problème</option>
                        <option value="traité/clôturé" ${client.statut === 'traité/clôturé' ? 'selected' : ''}>Traité/Clôturé</option>
                    </select>
                </td>
            `;
    
            // Compter les différents statuts
            switch (client.statut.toLowerCase()) {
                case 'prise en main':
                    priseEnMain++;
                    break;
                case 'en cours':
                    enCours++;
                    break;
                case 'dossier à problème':
                    probleme++;
                    break;
                case 'traité/clôturé':
                    cloture++;
                    break;
            }
    
            clientTableBody.appendChild(row);
        });
    
        // Mise à jour des compteurs de catégories
        priseEnMainCount.textContent = priseEnMain;
        enCoursCount.textContent = enCours;
        problemeCount.textContent = probleme;
        clotureCount.textContent = cloture;
    
        // Ajouter les événements de changement pour les statuts
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                const idDossier = clientData[index].idDossier;
                const newStatut = this.value;
    
                // Envoi des données au serveur PHP via fetch
                fetch('update_status.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idDossier: idDossier,
                        statut: newStatut
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        // Mise à jour du statut dans la table
                        document.querySelectorAll('.client-statut')[index].innerText = newStatut;
                        console.log('Statut mis à jour avec succès');
                    } else {
                        console.error('Erreur lors de la mise à jour du statut:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Erreur réseau ou serveur:', error);
                });
            });
        });
    }
    
    
    

    function renderTicketList(ticketData = tickets) {
        ticketTableBody.innerHTML = '';
        let ouvert = 0, enCours = 0, resolu = 0;
    
        ticketData.forEach((ticket, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticket.ticket_id}</td>
                <td>${ticket.nom}</td>
                <td>${ticket.prenom}</td>
                <td>${ticket.service}</td>
                <td class="ticket-statut">${ticket.statut}</td>
                <td>
                    <select data-index="${index}" class="status-select">
                        <option value="ouvert" ${ticket.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                        <option value="en cours" ${ticket.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="résolu" ${ticket.statut === 'résolu' ? 'selected' : ''}>Résolu</option>
                    </select>
                </td>
            `;
    
            // Compter les différents statuts
            switch (ticket.statut.toLowerCase()) {
                case 'ouvert':
                    ouvert++;
                    break;
                case 'en cours':
                    enCours++;
                    break;
                case 'résolu':
                    resolu++;
                    break;
            }
    
            ticketTableBody.appendChild(row);
        });
    
        // Mise à jour des compteurs de catégories
        ouvertCount.textContent = ouvert;
        enCoursCountTicket.textContent = enCours;
        resoluCount.textContent = resolu;
    
        // Ajouter les événements de changement pour les statuts
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                const ticketId = ticketData[index].ticket_id;
                const newStatut = this.value;
    
                // Envoi des données au serveur PHP via fetch
                fetch('update_ticket_status.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ticket_id: ticketId,
                        new_status: newStatut
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        // Mise à jour du statut dans la table
                        document.querySelectorAll('.ticket-statut')[index].innerText = newStatut;
                        console.log('Statut mis à jour avec succès');
                    } else {
                        console.error('Erreur lors de la mise à jour du statut:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Erreur réseau ou serveur:', error);
                });
            });
        });
    }
    
    

    function renderActivationList(activationData = activations) {
        activationTableBody.innerHTML = '';
        let ouvert = 0, enCours = 0, resolu = 0;

        activationData.forEach((activation, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${activation.activation_id}</td>
                <td>${activation.nom}</td>
                <td>${activation.prenom}</td>
                <td>${activation.service}</td>
                <td>${activation.statut}</td>
                <td>
                    <select data-index="${index}" class="activation-status-select">
                        <option value="ouvert" ${activation.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                        <option value="en cours" ${activation.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="résolu" ${activation.statut === 'résolu' ? 'selected' : ''}>Résolu</option>
                    </select>
                </td>
            `;

            switch (activation.statut.toLowerCase()) {
                case 'ouvert':
                    ouvert++;
                    break;
                case 'en cours':
                    enCours++;
                    break;
                case 'résolu':
                    resolu++;
                    break;
            }
            activationTableBody.appendChild(row);
        });

        ouvertCountActivation.textContent = ouvert;
        enCoursCountActivation.textContent = enCours;
        resoluCountActivation.textContent = resolu;

        document.querySelectorAll('.activation-status-select').forEach(select => {
            select.addEventListener('change', updateActivationStatus);
        });
    }

    function renderMaintenanceList(maintenanceData = maintenances) {
        maintenanceTableBody.innerHTML = '';
        let ouvert = 0, enCours = 0, resolu = 0;

        maintenanceData.forEach((maintenance, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${maintenance.maintenance_id}</td>
                <td>${maintenance.nomPrenom}</td>
                <td>${maintenance.contact}</td>
                <td>${maintenance.probleme}</td>
                <td>${maintenance.statut}</td>
                <td>
                    <select data-index="${index}" class="maintenance-status-select">
                        <option value="ouvert" ${maintenance.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                        <option value="en cours" ${maintenance.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="résolu" ${maintenance.statut === 'résolu' ? 'selected' : ''}>Résolu</option>
                    </select>
                </td>
            `;

            switch (maintenance.statut.toLowerCase()) {
                case 'ouvert':
                    ouvert++;
                    break;
                case 'en cours':
                    enCours++;
                    break;
                case 'résolu':
                    resolu++;
                    break;
            }
            maintenanceTableBody.appendChild(row);
        });

        ouvertCountMaintenance.textContent = ouvert;
        enCoursCountMaintenance.textContent = enCours;
        resoluCountMaintenance.textContent = resolu;

        document.querySelectorAll('.maintenance-status-select').forEach(select => {
            select.addEventListener('change', updateMaintenanceStatus);
        });
    }

    function renderReclamationList(reclamationData = reclamations) {
        reclamationTableBody.innerHTML = '';
        let ouvert = 0, enCours = 0, resolu = 0;

        reclamationData.forEach((reclamation, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reclamation.reclamation_id}</td>
                <td>${reclamation.nomPrenom}</td>
                <td>${reclamation.contact}</td>
                <td>${reclamation.service}</td>
                <td>${reclamation.statut}</td>
                <td>
                    <select data-index="${index}" class="reclamation-status-select">
                        <option value="ouvert" ${reclamation.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                        <option value="en cours" ${reclamation.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="résolu" ${reclamation.statut === 'résolu' ? 'selected' : ''}>Résolu</option>
                    </select>
                </td>
            `;

            switch (reclamation.statut.toLowerCase()) {
                case 'ouvert':
                    ouvert++;
                    break;
                case 'en cours':
                    enCours++;
                    break;
                case 'résolu':
                    resolu++;
                    break;
            }
            reclamationTableBody.appendChild(row);
        });

        ouvertCountReclamation.textContent = ouvert;
        enCoursCountReclamation.textContent = enCours;
        resoluCountReclamation.textContent = resolu;

        document.querySelectorAll('.reclamation-status-select').forEach(select => {
            select.addEventListener('change', updateReclamationStatus);
        });
    }

    function renderDeclarationList(declarationData = declarations) {
        declarationTableBody.innerHTML = '';
        let ouvert = 0, enCours = 0, resolu = 0;

        declarationData.forEach((declaration, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${declaration.declaration_id}</td>
                <td>${declaration.nomPrenom}</td>
                <td>${declaration.contact}</td>
                <td>${declaration.probleme}</td>
                <td>${declaration.statut}</td>
                <td>
                    <select data-index="${index}" class="declaration-status-select">
                        <option value="ouvert" ${declaration.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                        <option value="en cours" ${declaration.statut === 'en cours' ? 'selected' : ''}>En cours</option>
                        <option value="résolu" ${declaration.statut === 'résolu' ? 'selected' : ''}>Résolu</option>
                    </select>
                </td>
            `;

            switch (declaration.statut.toLowerCase()) {
                case 'ouvert':
                    ouvert++;
                    break;
                case 'en cours':
                    enCours++;
                    break;
                case 'résolu':
                    resolu++;
                    break;
            }
            declarationTableBody.appendChild(row);
        });

        ouvertCountDeclaration.textContent = ouvert;
        enCoursCountDeclaration.textContent = enCours;
        resoluCountDeclaration.textContent = resolu;

        document.querySelectorAll('.declaration-status-select').forEach(select => {
            select.addEventListener('change', updateDeclarationStatus);
        });
    }

    function renderHistoriqueList(historiqueData = historiques) {
        historiqueTableBody.innerHTML = '';
        historiqueData.forEach((historique, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${historique.id}</td>
                <td>${historique.nomPrenom}</td>
                <td>${historique.service}</td>
                <td>${historique.statut}</td>
                <td>${historique.date}</td>
                <td>
                    <button class="view-historique-btn" data-index="${index}">Voir</button>
                </td>
            `;
            historiqueTableBody.appendChild(row);
        });

        document.querySelectorAll('.view-historique-btn').forEach(button => {
            button.addEventListener('click', viewHistoriqueDetails);
        });
    }

    

    function updateTicketStatus(event) {
        const select = event.target;
        const index = select.dataset.index;
        tickets[index].statut = select.value;
        renderTicketList();
    }

    function updateActivationStatus(event) {
        const select = event.target;
        const index = select.dataset.index;
        activations[index].statut = select.value;
        renderActivationList();
    }

    function updateMaintenanceStatus(event) {
        const select = event.target;
        const index = select.dataset.index;
        maintenances[index].statut = select.value;
        renderMaintenanceList();
    }

    function updateReclamationStatus(event) {
        const select = event.target;
        const index = select.dataset.index;
        reclamations[index].statut = select.value;
        renderReclamationList();
    }

    function updateDeclarationStatus(event) {
        const select = event.target;
        const index = select.dataset.index;
        declarations[index].statut = select.value;
        renderDeclarationList();
    }

    function showClientList() {
        clientForm.classList.add('hidden');
        clientList.classList.remove('hidden');
        ticketForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        document.getElementById('client-categories').classList.remove('hidden');
        document.getElementById('ticket-categories').classList.add('hidden');
        document.getElementById('activation-categories').classList.add('hidden');
        document.getElementById('maintenance-categories').classList.add('hidden');
        document.getElementById('reclamation-categories').classList.add('hidden');
        document.getElementById('declaration-categories').classList.add('hidden');
        renderClientList();
        fetchClients();
    }

    function showTicketList() {
        ticketForm.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.remove('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        document.getElementById('ticket-categories').classList.remove('hidden');
        document.getElementById('activation-categories').classList.add('hidden');
        document.getElementById('maintenance-categories').classList.add('hidden');
        document.getElementById('reclamation-categories').classList.add('hidden');
        document.getElementById('declaration-categories').classList.add('hidden');
        renderTicketList();
        fetchTicketsInstallation();
    }

    function showActivationList() {
        activationForm.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationList.classList.remove('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        document.getElementById('ticket-categories').classList.add('hidden');
        document.getElementById('activation-categories').classList.remove('hidden');
        document.getElementById('maintenance-categories').classList.add('hidden');
        document.getElementById('reclamation-categories').classList.add('hidden');
        document.getElementById('declaration-categories').classList.add('hidden');
        renderActivationList();
        fetchActivationsService();
    }

    function showMaintenanceList() {
        maintenanceForm.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceList.classList.remove('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        document.getElementById('ticket-categories').classList.add('hidden');
        document.getElementById('activation-categories').classList.add('hidden');
        document.getElementById('maintenance-categories').classList.remove('hidden');
        document.getElementById('reclamation-categories').classList.add('hidden');
        document.getElementById('declaration-categories').classList.add('hidden');
        renderMaintenanceList();
        fetchMaintenanceTickets();
    }

    function showReclamationList() {
        reclamationForm.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationList.classList.remove('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        document.getElementById('ticket-categories').classList.add('hidden');
        document.getElementById('activation-categories').classList.add('hidden');
        document.getElementById('maintenance-categories').classList.add('hidden');
        document.getElementById('reclamation-categories').classList.remove('hidden');
        document.getElementById('declaration-categories').classList.add('hidden');
        renderReclamationList();
        fetchReclamations();
    }

    function showDeclarationList() {
        declarationForm.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationList.classList.remove('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        document.getElementById('ticket-categories').classList.add('hidden');
        document.getElementById('activation-categories').classList.add('hidden');
        document.getElementById('maintenance-categories').classList.add('hidden');
        document.getElementById('reclamation-categories').classList.add('hidden');
        document.getElementById('declaration-categories').classList.remove('hidden');
        renderDeclarationList();
        fetchDeclarationsPanne();
    }

    function showHistoriqueList() {
        historiqueForm.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueList.classList.remove('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        document.getElementById('ticket-categories').classList.add('hidden');
        document.getElementById('activation-categories').classList.add('hidden');
        document.getElementById('maintenance-categories').classList.add('hidden');
        document.getElementById('reclamation-categories').classList.add('hidden');
        document.getElementById('declaration-categories').classList.add('hidden');
        renderHistoriqueList();
    }

    function showClientForm() {
        clientList.classList.add('hidden');
        document.getElementById('client-categories').classList.add('hidden');
        ticketForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
        clientForm.classList.remove('hidden');
        
    }

    function showTicketForm() {
        ticketList.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketForm.classList.remove('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
    }

    function showActivationForm() {
        activationList.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.remove('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
    }

    function showMaintenanceForm() {
        maintenanceList.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.remove('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
    }

    function showReclamationForm() {
        reclamationList.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.remove('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
    }

    function showDeclarationForm() {
        declarationList.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.remove('hidden');
        historiqueForm.classList.add('hidden');
        historiqueList.classList.add('hidden');
    }

    function showHistoriqueForm() {
        historiqueList.classList.add('hidden');
        clientList.classList.add('hidden');
        clientForm.classList.add('hidden');
        ticketList.classList.add('hidden');
        ticketForm.classList.add('hidden');
        activationForm.classList.add('hidden');
        activationList.classList.add('hidden');
        maintenanceForm.classList.add('hidden');
        maintenanceList.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationForm.classList.add('hidden');
        declarationList.classList.add('hidden');
        historiqueForm.classList.remove('hidden');
    }

    showClientList();
});
document.getElementById("lienDeconnexion").onclick = function() {
    window.location.href = "index_acceuil.html";
};

function generateDossierID() {
    return Math.floor(Math.random() * 1000);
}

// Fonction pour afficher le formulaire et générer un nouvel ID de dossier
function showClientForm() {
    // Génère un nouvel ID de dossier
    document.getElementById('idDossier').value = generateDossierID();
    // Affiche le formulaire (enlever la classe 'hidden')
    document.getElementById('client-form').classList.remove('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Créer un nouveau client"
document.getElementById('add-client-btn').addEventListener('click', function() {
    // Réinitialise le formulaire pour qu'il soit prêt pour un nouveau client
    document.getElementById('new-client-form').reset();
    // Affiche le formulaire et génère un nouvel ID
    showClientForm();
});

// Génère un nouvel ID chaque fois que le formulaire est réinitialisé
document.getElementById('new-client-form').addEventListener('reset', function() {
    document.getElementById('idDossier').value = generateDossierID();
});
function generateTicketID() {
    return Math.floor(Math.random() * 10000);
}

// Fonction pour afficher le formulaire et générer un nouvel ID de ticket
function showTicketForm() {
    // Génère un nouvel ID de ticket
    document.getElementById('ticket-id').value = generateTicketID();
    // Affiche le formulaire (enlever la classe 'hidden')
    document.getElementById('ticket-form').classList.remove('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Créer un nouveau ticket d'installation"
document.getElementById('add-ticket-btn-list').addEventListener('click', function() {
    // Réinitialise le formulaire pour qu'il soit prêt pour un nouveau ticket
    document.getElementById('new-ticket-form').reset();
    // Affiche le formulaire et génère un nouvel ID
    showTicketForm();
});

// Génère un nouvel ID chaque fois que le formulaire est réinitialisé
document.getElementById('new-ticket-form').addEventListener('reset', function() {
    document.getElementById('ticket-id').value = generateTicketID();
});
function generateActivationID() {
    return Math.floor(Math.random() * 10000);
}

// Fonction pour afficher le formulaire et générer un nouvel ID de ticket d'activation
function showActivationForm() {
    // Génère un nouvel ID de ticket d'activation
    document.getElementById('activation-id').value = generateActivationID();
    // Affiche le formulaire (enlever la classe 'hidden')
    document.getElementById('activation-form').classList.remove('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Créer une nouvelle activation de service"
document.getElementById('add-activation-btn-list').addEventListener('click', function() {
    // Réinitialise le formulaire pour qu'il soit prêt pour une nouvelle activation
    document.getElementById('new-activation-form').reset();
    // Affiche le formulaire et génère un nouvel ID
    showActivationForm();
});

// Génère un nouvel ID chaque fois que le formulaire est réinitialisé
document.getElementById('new-activation-form').addEventListener('reset', function() {
    document.getElementById('activation-id').value = generateActivationID();
});

function generateMaintenanceID() {
    return Math.floor(Math.random() * 10000); // Génère un nombre aléatoire à 4 chiffres
}

// Fonction pour afficher le formulaire et générer un nouvel ID de ticket de maintenance
function showMaintenanceForm() {
    // Génère un nouvel ID de ticket de maintenance
    document.getElementById('maintenance-id').value = generateMaintenanceID();
    // Affiche le formulaire (enlever la classe 'hidden')
    document.getElementById('maintenance-form').classList.remove('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Créer un nouveau ticket de maintenance"
document.getElementById('add-maintenance-btn-list').addEventListener('click', function() {
    // Réinitialise le formulaire pour qu'il soit prêt pour un nouveau ticket de maintenance
    document.getElementById('new-maintenance-form').reset();
    // Affiche le formulaire et génère un nouvel ID
    showMaintenanceForm();
});

// Génère un nouvel ID chaque fois que le formulaire est réinitialisé
document.getElementById('new-maintenance-form').addEventListener('reset', function() {
    document.getElementById('maintenance-id').value = generateMaintenanceID();
});
function generateReclamationID() {
    return Math.floor(Math.random() * 10000); // Génère un nombre aléatoire à 4 chiffres
}

// Fonction pour afficher le formulaire et générer un nouvel ID de réclamation
function showReclamationForm() {
    // Génère un nouvel ID de réclamation
    document.getElementById('reclamation-id').value = generateReclamationID();
    // Affiche le formulaire (enlever la classe 'hidden')
    document.getElementById('reclamation-form').classList.remove('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Créer une nouvelle réclamation client"
document.getElementById('add-reclamation-btn-list').addEventListener('click', function() {
    // Réinitialise le formulaire pour qu'il soit prêt pour une nouvelle réclamation
    document.getElementById('new-reclamation-form').reset();
    // Affiche le formulaire et génère un nouvel ID
    showReclamationForm();
});

// Génère un nouvel ID chaque fois que le formulaire est réinitialisé
document.getElementById('new-reclamation-form').addEventListener('reset', function() {
    document.getElementById('reclamation-id').value = generateReclamationID();
});

function generateDeclarationID() {
    return 'DPC' + Math.floor(Math.random() * 10000); // Génère un ID préfixé avec 'DPC' suivi d'un nombre aléatoire à 4 chiffres
}

// Fonction pour afficher le formulaire et générer un nouvel ID de déclaration de panne
function showDeclarationForm() {
    // Génère un nouvel ID de déclaration de panne
    document.getElementById('declaration-id').value = generateDeclarationID();
    // Affiche le formulaire (enlever la classe 'hidden')
    document.getElementById('declaration-form').classList.remove('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Créer une nouvelle déclaration de panne client"
document.getElementById('add-declaration-btn-list').addEventListener('click', function() {
    // Réinitialise le formulaire pour qu'il soit prêt pour une nouvelle déclaration
    document.getElementById('new-declaration-form').reset();
    // Affiche le formulaire et génère un nouvel ID
    showDeclarationForm();
});

// Génère un nouvel ID chaque fois que le formulaire est réinitialisé
document.getElementById('new-declaration-form').addEventListener('reset', function() {
    document.getElementById('declaration-id').value = generateDeclarationID();
});