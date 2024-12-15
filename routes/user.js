const express = require('express');
const { login, register, getProfile, updateProfile, verifyToken } = require('../controllers/user.controllers');
const router = express.Router();
const upload = require('../middleware/upload'); // Middleware upload

// Routes lain...
router.post('/login', login);
router.post('/register', register);

// Gunakan middleware verifyToken untuk endpoint profil
router.get('/profile', verifyToken, getProfile);

// Endpoint untuk mengupdate profil dan upload gambar
router.put('/profile', verifyToken, upload.single('gambar'), updateProfile);

module.exports = router;
