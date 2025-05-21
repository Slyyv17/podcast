const express = require('express');
const router = express.Router();
const { addAdmin, loginAdmin, addUser, loginUser } = require('../controller/authController');

router.post('/admin/add-admin', addAdmin);
router.post('/admin/login-admin', loginAdmin);

router.post('/user/add-user', addUser);
router.post('/user/login-user', loginUser);

module.exports = router;