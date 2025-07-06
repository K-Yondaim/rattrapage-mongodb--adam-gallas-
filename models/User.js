const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        unique: true,
        validate: [validator.isEmail, 'Format d\'email invalide']
    },
    motDePasse: {
        type: String,
        required: [true, 'Le mot de passe est requis']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
