const express = require('express');
const { login, register, verifyToken, getProfile, updateProfile} = require('../controllers/user.controllers');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', verifyToken, getProfile);
router.put('/profile/update', verifyToken,updateProfile)

module.exports = router;
