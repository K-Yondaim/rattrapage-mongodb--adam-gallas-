const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET /api/tasks - Récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
});

// POST /api/tasks - Créer une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Données invalides', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
    }
  }
});

// PUT /api/tasks/:id - Modifier une tâche
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    res.json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Données invalides', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Erreur lors de la modification' });
    }
  }
});

// DELETE /api/tasks/:id - Supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

module.exports = router;
