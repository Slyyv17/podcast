const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const { likePodcast, subscribeToAdmin, unsubscribeFromAdmin, dislikePodcast, deleteUserAcct } = require('../controller/userController');

router.post('/:podcastId/like-podcast', verifyUser, likePodcast);
router.post('/:podcastId/dislike-podcast', verifyUser, dislikePodcast);
router.post('/:adminId/subscribe', verifyUser, subscribeToAdmin);
router.post('/:adminId/unsubscribe', verifyUser, unsubscribeFromAdmin);
router.delete('/delete-account', verifyUser, deleteUserAcct);

module.exports = router;