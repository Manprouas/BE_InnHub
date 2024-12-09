const Hotel = require('../models/hotel.models');

module.exports = {
    // Create a new hotel
    createHotel: async (req, res) => {
        try {
            const { hotelname, email, phone, address, is_admin, userID } = req.body;

            // Buat hotel baru
            const newHotel = new Hotel({ hotelname, email, phone, address, is_admin, userID });
            const savedHotel = await newHotel.save();

            res.status(201).json({ message: 'Hotel created successfully', data: savedHotel });
        } catch (error) {
            console.error("Error creating hotel:", error);
            res.status(500).json({ message: 'Error creating hotel', error: error.message || error });
        }
    },

    // Get all hotels
    getAllHotels: async (req, res) => {
        try {
            const hotels = await Hotel.find().populate('userID', 'name email'); // Populasi data user jika diperlukan
            res.status(200).json({ message: 'Hotels retrieved successfully', data: hotels });
        } catch (error) {
            console.error("Error retrieving hotels:", error);
            res.status(500).json({ message: 'Error retrieving hotels', error: error.message || error });
        }
    },

    // Get a specific hotel by ID
    getHotelById: async (req, res) => {
        try {
            const { id } = req.params;
            const hotel = await Hotel.findById(id).populate('userID', 'name email'); // Populasi data user jika diperlukan
            if (!hotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            res.status(200).json({ message: 'Hotel retrieved successfully', data: hotel });
        } catch (error) {
            console.error("Error retrieving hotel:", error);
            res.status(500).json({ message: 'Error retrieving hotel', error: error.message || error });
        }
    },

    // Update a hotel by ID
    updateHotel: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedHotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            res.status(200).json({ message: 'Hotel updated successfully', data: updatedHotel });
        } catch (error) {
            console.error("Error updating hotel:", error);
            res.status(500).json({ message: 'Error updating hotel', error: error.message || error });
        }
    },

    // Delete a hotel by ID
    deleteHotel: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedHotel = await Hotel.findByIdAndDelete(id);
            if (!deletedHotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            res.status(200).json({ message: 'Hotel deleted successfully', data: deletedHotel });
        } catch (error) {
            console.error("Error deleting hotel:", error);
            res.status(500).json({ message: 'Error deleting hotel', error: error.message || error });
        }
    }
};
