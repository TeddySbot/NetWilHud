const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();



// Configuration de Multer pour les uploads vidéo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Seules les vidéos sont acceptées !');
    }
  }
}).single('videoFile');

// Configuration de l'application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.render('index', { error: err });
    }
    if (!req.file) {
      return res.render('index', { error: 'Aucun fichier sélectionné' });
    }

    res.render('index', { 
      success: 'Fichier uploadé avec succès !',
      filename: req.file.filename
    });
  });
});

app.get('/videos', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.render('videos', { error: 'Impossible de lire les fichiers.', videos: [] });
    }

    const videoFiles = files.filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file));
    res.render('videos', { videos: videoFiles, error: null });
  });
});

app.get('/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send("Vidéo non trouvée");
    res.render('video', { filename });
  });
});



// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});