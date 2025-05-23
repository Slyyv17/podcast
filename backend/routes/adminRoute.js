const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const { getAllUsers } = require('../controller/adminController');


router.get('/get-users', verifyAdmin, getAllUsers);

module.exports = router;