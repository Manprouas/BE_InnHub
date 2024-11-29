const User = require('../models/user.models');
const upload = require('../middleware/multer')
const fs = require('fs')
const path = require('path')

module.exports = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find(); // Mengambil semua data user
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id); // Cari user berdasarkan ID
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            upload.single('gambar')(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ message: 'Error uploading image', error: err.message });
                }

                const { username, email, password, phone, is_admin } = req.body;
                const gambar = req.file ? req.file.filename : null; // Ambil nama file gambar

                const newUser = new User({
                    username,
                    email,
                    password,
                    phone,
                    is_admin,
                    gambar,
                });

                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    },

    // Update user by ID
    updateUserById: async (req, res) => {
        try {
            // Middleware upload untuk mengunggah file
            upload.single('gambar')(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ message: 'Error uploading image', error: err.message });
                }

                // Cari user berdasarkan ID
                const user = await User.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Hapus gambar lama jika ada file baru diunggah
                if (req.file) {
                    const oldImagePath = path.join(__dirname, '../uploads', user.gambar);
                    if (fs.existsSync(oldImagePath)) {
                        try {
                            fs.unlinkSync(oldImagePath); // Hapus file lama
                            console.log(`Old file deleted: ${oldImagePath}`);
                        } catch (error) {
                            console.error('Error deleting old file:', error);
                        }
                    }
                }

                // Perbarui data user dengan data baru
                const updates = { ...req.body };
                if (req.file) {
                    updates.gambar = req.file.filename; // Perbarui nama file gambar
                }

                const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json(updatedUser);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating user', error });
        }
    },

    // Delete user by ID
    deleteUserById: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id); // Hapus user berdasarkan ID
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },
};
