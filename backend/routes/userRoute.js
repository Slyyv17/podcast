const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const { subscribeToAdmin, unsubscribeFromAdmin, deleteUserAcct, getProfileData } = require('../controller/userController');

router.post('/:adminId/subscribe', verifyUser, subscribeToAdmin);
router.post('/:adminId/unsubscribe', verifyUser, unsubscribeFromAdmin);
router.delete('/delete-account', verifyUser, deleteUserAcct);
router.get('/profile', verifyUser, getProfileData);

module.exports = router;