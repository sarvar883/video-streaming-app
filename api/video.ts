import express from 'express';
const router = express.Router();

const videoController = require('../controllers/video');

router.get('/:id', videoController.getVideoData);

router.post('/all', videoController.getVideosList);

router.get('/stream-video/:id', videoController.streamVideo);

module.exports = router;