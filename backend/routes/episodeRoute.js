const express = require('express');
const router = express.Router();
const { newEpisode, getEpisodes, getEpisodeById, deleteEpisode } = require('../controller/episodeController');
const verifyAdmin = require('../middleware/verifyAdmin');
const upload = require('../middleware/audioUpload');

// Route must match exactly
router.post('/:podcastId/new-episodes', verifyAdmin, upload.single('audio'), newEpisode);
router.get('/:podcastId/get-episodes', verifyAdmin, getEpisodes);

router.get('/:podcastId/episode/:id', verifyAdmin, getEpisodeById);
router.delete('/:podcastId/episode/:id', verifyAdmin, deleteEpisode);

module.exports = router;