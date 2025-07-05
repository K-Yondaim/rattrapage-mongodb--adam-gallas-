# Gestionnaire de Tâches Simple - Rattrapage MongoDB

Application simple de gestion de tâches pour l'évaluation de rattrapage.

## ⚠️ FICHIERS À COMPLÉTER

Il manque seulement **2 fichiers** à implémenter :

### 1. Configuration MongoDB
**Fichier :** `config/database.js`
- Connexion à MongoDB Atlas
- Gestion des erreurs

### 2. Modèle Task
**Fichier :** `models/Task.js`
- Schéma Mongoose simple
- Champs : titre, description, statut, dateEcheance
- Validations de base

## ��� Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env
cp .env.example .env
# Modifier .env avec votre URI MongoDB Atlas

# 3. Compléter les 2 fichiers manquants

# 4. Lancer l'application
npm start
```

## ��� Structure des données

```javascript
// Modèle Task à créer
{
  titre: "Ma tâche",
  description: "Description optionnelle",
  statut: "a_faire", // ou "terminee"
  dateEcheance: "2025-01-15",
  createdAt: Date,
  updatedAt: Date
}
```

## ��� Fonctionnalités

- ✅ Ajouter des tâches
- ✅ Modifier des tâches
- ✅ Supprimer des tâches
- ✅ Marquer comme terminée/à faire
- ✅ Interface simple et claire

## ��� Accès

http://localhost:3000

**Bon courage pour le rattrapage !**
