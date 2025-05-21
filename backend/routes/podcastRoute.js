const express = require('express');
const router = express.Router();

const { newPodcast, getPodcasts, getPodcastById, deletePodcast } = require('../controller/podcastController');
const verifyAdmin = require('../middleware/verifyAdmin');
const upload = require('../middleware/multer');

// POST /admin/podcast
router.post('/podcast', verifyAdmin, upload.single('coverImg'), newPodcast);
router.get('/podcast/get-podcasts', verifyAdmin, getPodcasts);
router.get('/podcast/:id', verifyAdmin, getPodcastById);
router.delete('/podcast/:id', verifyAdmin, deletePodcast);

module.exports = router;