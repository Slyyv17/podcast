const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const { getAllUsers, getNumberOfUsers, getNumberOfSubscribers, getNumberOfEpisodes, recentEpisodes, getProfile } = require('../controller/adminController');


router.get('/get-users', verifyAdmin, getAllUsers);
router.get('/get-num-users', verifyAdmin, getNumberOfUsers);
router.get('/get-num-subscribers', verifyAdmin, getNumberOfSubscribers);
router.get('/get-num-episodes', verifyAdmin, getNumberOfEpisodes);
router.get('/recent-episodes', verifyAdmin, recentEpisodes);
router.get('/profile', verifyAdmin, getProfile);

module.exports = router;