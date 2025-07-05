const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import de la configuration database (√Ä COMPL√âTER PAR L'√âTUDIANT)
const connectDB = require('./config/database');

// Import des routes
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion √† la base de donn√©es
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes API
app.use('/api/tasks', taskRoutes);

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// D√©marrage du serveur
app.listen(PORT, () => {
  console.log(`Ì∫Ä Serveur d√©marr√© sur le port ${PORT}`);
  console.log(`Ì≥± Application accessible sur: http://localhost:${PORT}`);
});
