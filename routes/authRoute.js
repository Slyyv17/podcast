const express = require('express');
const router = express.Router();
const { addAdmin, loginAdmin } = require('../controller/authController');

router.post('/add-admin', addAdmin);
router.post('/login-admin', loginAdmin);

module.exports = router;