const fs = require('fs');
const path = require('path');

exports.listVideos = (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.render('videos', { error: 'Impossible de lire les fichiers.', videos: [] });
    }

    const videoFiles = files.filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file));
    res.render('videos', { videos: videoFiles, error: null });
  });
};

exports.showVideo = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send("Vidéo non trouvée");
    res.render('video', { filename });
  });
};