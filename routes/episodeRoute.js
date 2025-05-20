const express = require('express');
const router = express.Router();
const { newEpisode } = require('../controller/episodeController');
const verifyAdmin = require('../middleware/verifyAdmin');
const upload = require('../middleware/audioUpload');

// Route must match exactly
router.post('/:podcastId/episodes', verifyAdmin, upload.single('audio'), newEpisode);

module.exports = router;