document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const clientForm = document.getElementById('client-form'); // Formulaire de consultation
    const reclamationForm = document.getElementById('reclamation-form');
    const declarationForm = document.getElementById('declaration-form');
    const reclamationList = document.getElementById('reclamation-list');
    const declarationList = document.getElementById('declaration-list');
    const notification = document.getElementById('notification');

    // Event Listeners for Sidebar
    document.getElementById('new-reclamation-btn').addEventListener('click', () => showForm(reclamationForm));
    document.getElementById('new-declaration-btn').addEventListener('click', () => showForm(declarationForm));
    document.getElementById('view-reclamations-btn').addEventListener('click', () => fetchReclamations());
    document.getElementById('view-declarations-btn').addEventListener('click', () => fetchDeclarations());

    // Event Listener for Consultation Form
    document.getElementById('new-client-btn').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        showForm(clientForm); // Show the consultation form
    });

    // Function to show a specific form
    function showForm(formElement) {
        // Hide all forms and lists
        clientForm.classList.add('hidden');
        reclamationForm.classList.add('hidden');
        declarationForm.classList.add('hidden');
        reclamationList.classList.add('hidden');
        declarationList.classList.add('hidden');

        // Show the selected form
        formElement.classList.remove('hidden');
    }

    // Handle Reclamation Form Submission
    reclamationForm.addEventListener('submit', handleReclamationForm);

    // Handle Declaration Form Submission
    declarationForm.addEventListener('submit', handleDeclarationForm);

    // Fetch and display the list of reclamations
    function fetchReclamations() {
        fetch('api.php?action=get_reclamations')
            .then(response => {
                if (!response.ok) throw new Error('Erreur HTTP : ' + response.status);
                return response.json();
            })
            .then(data => {
                updateReclamationList(data);
                showForm(reclamationList);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des réclamations', 'error');
                console.error('Erreur :', error);
            });
    }

    // Fetch and display the list of declarations
    function fetchDeclarations() {
        fetch('api.php?action=get_declarations')
            .then(response => {
                if (!response.ok) throw new Error('Erreur HTTP : ' + response.status);
                return response.json();
            })
            .then(data => {
                updateDeclarationList(data);
                showForm(declarationList);
            })
            .catch(error => {
                showNotification('Erreur lors de la récupération des déclarations', 'error');
                console.error('Erreur :', error);
            });
    }

    // Handle Reclamation Form Submission
    function handleReclamationForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        fetch('api.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Erreur HTTP : ' + response.status);
            return response.text(); // Lire la réponse en tant que texte
        })
        .then(text => {
            if (!text) throw new Error('Réponse vide du serveur');
            try {
                const data = JSON.parse(text); // Essayer de parser la réponse en JSON
                showNotification(data.message || 'Réclamation soumise !', 'success');
                fetchReclamations(); // Rafraîchir éventuellement la liste des réclamations
            } catch (e) {
                console.error('Erreur de parsing JSON :', e);
                console.log('Réponse brute :', text);
                showNotification('Erreur de réponse : ' + text, 'error');
            }
        })
        .catch(error => {
            showNotification('Erreur lors de la soumission de la réclamation : ' + error.message, 'error');
            console.error('Erreur :', error);
        });
    }

    // Handle Declaration Form Submission
    function handleDeclarationForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        fetch('api.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Erreur HTTP : ' + response.status);
            return response.text(); // Lire la réponse en tant que texte
        })
        .then(text => {
            if (!text) throw new Error('Réponse vide du serveur');
            try {
                const data = JSON.parse(text); // Essayer de parser la réponse en JSON
                showNotification(data.message || 'Déclaration soumise !', 'success');
                fetchDeclarations(); // Rafraîchir éventuellement la liste des déclarations
            } catch (e) {
                console.error('Erreur de parsing JSON :', e);
                console.log('Réponse brute :', text);
                showNotification('Erreur de réponse : ' + text, 'error');
            }
        })
        .catch(error => {
            showNotification('Erreur lors de la soumission de la déclaration : ' + error.message, 'error');
            console.error('Erreur :', error);
        });
    }

    

    // Show notification messages
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Example function to handle actions on a ticket
    window.handleAction = function(ticketId) {
        console.log('Action for ticket:', ticketId);
        // Implement additional logic as needed
    };

    // Handle consultation form submission with debugging logs
    

    // Redirect to assistance
    document.getElementById('assistance').addEventListener('click', function() {
        window.location.href = 'https://www.chatgpt.com';
    });
    // Function to generate a unique ID with a prefix
    function generateUniqueID(prefix = "DPC-TICKET") {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

// Function to show the new declaration form and set the ID field
    function showNewDeclarationForm() {
        const form = document.getElementById('new-declaration-form');
        form.classList.remove('hidden'); // Assumes the form has a 'hidden' class to control visibility
    
        const idField = document.getElementById('ID_Ticket_DPC-id');
        idField.value = generateUniqueID(); // Automatically set the unique ID when the form is shown
    }

// Event listener for the button that shows the form
document.getElementById('new-declaration-btn').addEventListener('click', showNewDeclarationForm);

    function showNewReclamationForm() {
        const form = document.getElementById('new-reclamation-form');
        form.classList.remove('hidden'); // Affichez le formulaire
    
        // Générer un nouvel ID pour ID_Ticket_REC-id et ID_Ticket
        const idRecField = document.getElementById('ID_Ticket_REC-id');
        const idTicketField = document.getElementById('reclamation-id-ticket');
    
        idRecField.value = generateUniqueID('REC');
        idTicketField.value = generateUniqueID('TICKET');
    }
    
    // Ajoutez un écouteur d'événements pour afficher le formulaire
    document.getElementById('new-reclamation-btn').addEventListener('click', showNewReclamationForm);

    document.getElementById('reclamation-search').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll('#reclamation-table-body tr');
        
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? '' : 'none';
        });
    });
    document.getElementById('declaration-search').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll('#declaration-table-body tr');
        
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? '' : 'none';
        });
    });  
    
});