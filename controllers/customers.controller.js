const User = require('../models/user.models');

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
            const { username, email, password, phone, is_admin } = req.body; // Ambil data dari request body
            const newUser = new User({
                username,
                email,
                password,
                phone,
                is_admin,
            });
            const savedUser = await newUser.save(); // Simpan user baru ke database
            res.status(201).json(savedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    },

    // Update user by ID
    updateUserById: async (req, res) => {
        try {
            const updates = req.body; // Ambil data update dari request body
            const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
                new: true,
            }); // Update user berdasarkan ID
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
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
