const express = require('express');
const router = express.Router();

const { newPodcast } = require('../controller/podcastController');
const verifyAdmin = require('../middleware/verifyAdmin');
const upload = require('../middleware/multer');

// POST /admin/podcast
router.post('/podcast', verifyAdmin, upload.single('coverImg'), newPodcast);

module.exports = router;