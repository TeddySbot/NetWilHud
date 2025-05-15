const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const videoController = require('../controllers/video.controller');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/upload', uploadController.uploadVideo);
router.get('/videos', videoController.listVideos);
router.get('/videos/:filename', videoController.showVideo);

module.exports = router;