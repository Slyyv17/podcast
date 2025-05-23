const express = require('express');
const router = express.Router();

const { newPodcast, getPodcasts, getPodcastById, deletePodcast, getPodcastRssFeed } = require('../controller/podcastController');
const verifyAdmin = require('../middleware/verifyAdmin');
const upload = require('../middleware/multer');

// POST /admin/podcast
router.post('/podcast/new-podcast', verifyAdmin, upload.single('coverImg'), newPodcast);
router.get('/podcast/get-podcasts', verifyAdmin, getPodcasts);
router.get('/podcast/:id', verifyAdmin, getPodcastById);

// No auth for RSS feed (generally RSS is public)
router.get('/podcast/:id/rss.xml', getPodcastRssFeed);

router.delete('/podcast/:id', verifyAdmin, deletePodcast);

module.exports = router;