const express = require('express');
const router = express.Router();
const { addAdmin, loginAdmin, addUser, loginUser, logoutAdmin, logoutUser, forgotPsw, resetPsw } = require('../controller/authController');

router.post('/admin/add-admin', addAdmin);
router.post('/admin/login-admin', loginAdmin);
router.post('/admin/logout-admin', logoutAdmin);
router.post('/admin/forgot-password', forgotPsw);
router.post('/admin/reset-password', resetPsw);

router.post('/user/add-user', addUser);
router.post('/user/login-user', loginUser);
router.post('/user/logout-user', logoutUser);

module.exports = router;