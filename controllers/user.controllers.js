const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
require('dotenv').config();

module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password, phone } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                phone,
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (!process.env.JWT_KEY) {
                console.error('JWT_KEY is not defined');
                return res.status(500).json({ message: 'Internal server error' });
            }

            const token = jwt.sign(
                { userId: user._id, is_admin: user.is_admin },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );

            // Mengirimkan token dan data pengguna dalam response
            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    gambar: user.gambar || null, // Pastikan gambar profil dikembalikan jika ada
                },
                message: 'Login successful'
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            // Mengambil data pengguna berdasarkan userId dari token
            const user = await User.findById(req.user._id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Mengembalikan data pengguna tanpa password
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                gambar: user.gambar || null, // Mengembalikan gambar profil jika ada
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error });
        }
    },

    verifyToken: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded; // Menyimpan informasi user ke dalam req.user
            next(); // Melanjutkan ke middleware berikutnya (getProfile)
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
        }
    }
};
