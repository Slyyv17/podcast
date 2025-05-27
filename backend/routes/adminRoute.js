const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const { getAllUsers, getNumberOfUsers, getNumberOfSubscribers, getNumberOfEpisodes } = require('../controller/adminController');


router.get('/get-users', verifyAdmin, getAllUsers);
router.get('/get-num-users', verifyAdmin, getNumberOfUsers);
router.get('/get-num-subscribers', verifyAdmin, getNumberOfSubscribers);
router.get('/get-num-episodes', verifyAdmin, getNumberOfEpisodes);

module.exports = router;