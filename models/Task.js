const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est requis']
    },
    description: {
        type: String
    },
    statut: {
        type: String,
        enum: ['a_faire', 'terminee'],
        default: 'a_faire'
    },
    dateEcheance: {
        type: Date
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
