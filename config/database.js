const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // TODO: Récupérer l'URI MongoDB depuis les variables d'environnement
    // const mongoURI = process.env.???
    
    // TODO: Vérifier que l'URI est définie
    // if (!mongoURI) {
    //   throw new Error('MONGODB_URI non définie dans .env');
    // }
    
    // TODO: Établir la connexion MongoDB
    // await mongoose.connect(???)
    
    // TODO: Afficher un message de succès
    // console.log('✅ Connexion MongoDB réussie');
    
  } catch (error) {
    // TODO: Gérer les erreurs de connexion
    // console.error('❌ Erreur MongoDB:', error.message);
    // process.exit(1);
  }
};

module.exports = connectDB;
