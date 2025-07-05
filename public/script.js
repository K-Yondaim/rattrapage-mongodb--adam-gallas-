class GestionnaireTaches {
    constructor() {
        this.taskForm = document.getElementById('taskForm');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.editingTaskId = null;
        
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.setMinDate();
    }

    bindEvents() {
        this.taskForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateEcheance').setAttribute('min', today);
    }

    async loadTasks() {
        try {
            this.showLoading();
            const response = await fetch('/api/tasks');
            
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des tâches');
            }
            
            const tasks = await response.json();
            this.displayTasks(tasks);
        } catch (error) {
            this.showError('Erreur de connexion. Vérifiez votre configuration MongoDB.');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.taskForm);
        const taskData = Object.fromEntries(formData);
        
        try {
            let response;
            if (this.editingTaskId) {
                response = await fetch(`/api/tasks/${this.editingTaskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
            } else {
                response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
            }

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erreur lors de la sauvegarde');
            }

            this.taskForm.reset();
            this.cancelEdit();
            this.loadTasks();
            this.setMinDate();
            this.showSuccess(this.editingTaskId ? 'Tâche modifiée!' : 'Tâche ajoutée!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    async deleteTask(taskId) {
        if (!confirm('Supprimer cette tâche ?')) {
            return;
        }

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            this.loadTasks();
            this.showSuccess('Tâche supprimée!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    async toggleTask(taskId, currentStatus) {
        const newStatus = currentStatus === 'a_faire' ? 'terminee' : 'a_faire';
        
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statut: newStatus })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour');
            }

            this.loadTasks();
            this.showSuccess('Statut mis à jour!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    editTask(task) {
        this.editingTaskId = task._id;
        
        document.getElementById('titre').value = task.titre;
        document.getElementById('description').value = task.description || '';
        document.getElementById('dateEcheance').value = task.dateEcheance ? task.dateEcheance.split('T')[0] : '';
        
        this.cancelBtn.style.display = 'inline-block';
        document.querySelector('.btn-primary').textContent = 'Modifier';
        document.querySelector('.form-section h2').textContent = 'Modifier la tâche';
    }

    cancelEdit() {
        this.editingTaskId = null;
        this.taskForm.reset();
        this.cancelBtn.style.display = 'none';
        document.querySelector('.btn-primary').textContent = 'Ajouter';
        document.querySelector('.form-section h2').textContent = 'Ajouter une tâche';
        this.setMinDate();
    }

    displayTasks(tasks) {
        if (tasks.length === 0) {
            this.tasksContainer.innerHTML = '<div class="loading">Aucune tâche. Ajoutez votre première tâche!</div>';
            return;
        }

        const tasksHTML = tasks.map(task => `
            <div class="task-card">
                <div class="task-header">
                    <div class="task-title">${task.titre}</div>
                    <span class="task-status status-${task.statut}">
                        ${task.statut === 'a_faire' ? 'À faire' : 'Terminée'}
                    </span>
                </div>
                
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                
                ${task.dateEcheance ? `<div style="margin-bottom: 10px; color: #6c757d; font-size: 14px;">
                    ��� ${new Date(task.dateEcheance).toLocaleDateString('fr-FR')}
                </div>` : ''}
                
                <div class="task-actions">
                    <button class="btn-toggle" onclick="app.toggleTask('${task._id}', '${task.statut}')">
                        ${task.statut === 'a_faire' ? 'Terminer' : 'Reprendre'}
                    </button>
                    <button class="btn-edit" onclick="app.editTask(${JSON.stringify(task).replace(/"/g, '&quot;')})">Modifier</button>
                    <button class="btn-delete" onclick="app.deleteTask('${task._id}')">Supprimer</button>
                </div>
            </div>
        `).join('');

        this.tasksContainer.innerHTML = tasksHTML;
    }

    showLoading() {
        this.tasksContainer.innerHTML = '<div class="loading">Chargement...</div>';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        
        document.querySelector('.container').insertBefore(errorDiv, document.querySelector('main'));
        
        setTimeout(() => errorDiv.remove(), 5000);
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        
        document.querySelector('.container').insertBefore(successDiv, document.querySelector('main'));
        
        setTimeout(() => successDiv.remove(), 3000);
    }
}

// Initialisation
const app = new GestionnaireTaches();
