const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Ajoutez ici vos nouveaux champs
  firstName: {
    type: String,
    required: false // ou true si obligatoire
  },
  lastName: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);