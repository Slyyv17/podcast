const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const { likePodcast, subscribeToAdmin, unsubscribeFromAdmin, dislikePodcast } = require('../controller/userController');

router.post('/:podcastId/like-podcast', verifyUser, likePodcast);
router.post('/:podcastId/dislike-podcast', verifyUser, dislikePodcast);
router.post('/:adminId/subscribe', verifyUser, subscribeToAdmin);
router.post('/:adminId/unsubscribe', verifyUser, unsubscribeFromAdmin);

module.exports = router;