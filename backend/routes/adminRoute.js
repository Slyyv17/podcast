const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const { getAllUsers, getNumberOfUsers, getNumberOfSubscribers, getNumberOfEpisodes, recentEpisodes } = require('../controller/adminController');


router.get('/get-users', verifyAdmin, getAllUsers);
router.get('/get-num-users', verifyAdmin, getNumberOfUsers);
router.get('/get-num-subscribers', verifyAdmin, getNumberOfSubscribers);
router.get('/get-num-episodes', verifyAdmin, getNumberOfEpisodes);
router.get('/recent-episodes', verifyAdmin, recentEpisodes);

module.exports = router;