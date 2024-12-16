const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/multer');
require('dotenv').config();

module.exports = {
    register: async (req, res) => {
        upload.single('gambar')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading image', error: err.message });
            }

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
                    gambar: req.file?.filename || null, // Tambahkan gambar jika ada
                });

                await newUser.save();

                res.status(201).json({ message: 'User registered successfully' });
            } catch (error) {
                console.error('Error during registration:', error);
                res.status(500).json({ message: 'Something went wrong', error });
            }
        });
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

            const token = jwt.sign(
                { userId: user._id, is_admin: user.is_admin },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    gambar: user.gambar || null,
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
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                gambar: user.gambar || null,
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error });
        }
    },

    updateProfile: async (req, res) => {
        upload.single('gambar')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading image', error: err.message });
            }

            try {
                const { username, email } = req.body;

                // Validasi email
                if (email && !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(email)) {
                    return res.status(400).json({ message: 'Invalid email format' });
                }

                // Cari user berdasarkan ID dari token
                const user = await User.findById(req.user.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Perbarui data user jika ada
                if (username) user.username = username;
                if (email) user.email = email;

                // Jika ada file gambar, perbarui gambar
                if (req.file) {
                    // Hapus gambar lama jika ada
                    if (user.gambar) {
                        const oldImagePath = path.join(__dirname, '../uploads', user.gambar);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                    user.gambar = req.file.filename;
                }

                // Simpan perubahan
                await user.save();

                res.status(200).json({
                    message: 'Profile updated successfully',
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        gambar: user.gambar,
                    },
                });
            } catch (error) {
                console.error('Error updating profile:', error);
                res.status(500).json({ message: 'Something went wrong', error });
            }
        });
    },

    verifyToken: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
        }
    },
};
