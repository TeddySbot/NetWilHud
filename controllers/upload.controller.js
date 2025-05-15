const upload = require('../config/multer.config');

exports.uploadVideo = (req, res) => {
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
};