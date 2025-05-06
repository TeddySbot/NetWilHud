const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


// Middleware obligatoire
app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json()); // Permet de lire les données JSON

// Route test
app.get('/api/test', (req, res) => {
  res.json({ message: "Le backend répond !" });
});



// Démarrer le serveur
app.listen(5000, () => {
  console.log("Backend démarré sur http://localhost:5000");
});