const express = require('express');
const configureExpress = require('./config/express.config');
const routes = require('./routes');

const app = express();

// Configuration d'Express
configureExpress(app);

// Routes
app.use('/', routes);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});