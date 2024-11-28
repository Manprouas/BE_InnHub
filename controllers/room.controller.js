const Room = require('../models/room.models');
const Hotel = require('../models/hotel.models');

module.exports = {
    // Create a new room
    createRoom: async (req, res) => {
        try {
            const { roomtype, price, phone, address, hotelID } = req.body;

            // Periksa apakah hotelID valid
            const hotel = await Hotel.findById(hotelID);
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            const newRoom = new Room({ roomtype, price, phone, address, hotelID });
            const savedRoom = await newRoom.save();

            res.status(201).json({ message: 'Room created successfully', data: savedRoom });
        } catch (error) {
            console.error("Error creating room:", error);
            res.status(500).json({ message: 'Error creating room', error: error.message || error });
        }
    },

    // Get all rooms
    getAllRooms: async (req, res) => {
        try {
            const rooms = await Room.find().populate('hotelID', 'hotelname address phone');
            res.status(200).json({ message: 'Rooms retrieved successfully', data: rooms });
        } catch (error) {
            console.error("Error retrieving rooms:", error);
            res.status(500).json({ message: 'Error retrieving rooms', error: error.message || error });
        }
    },

    // Get a specific room by ID
    getRoomById: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await Room.findById(id).populate('hotelID', 'hotelname address phone');
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
            res.status(200).json({ message: 'Room retrieved successfully', data: room });
        } catch (error) {
            console.error("Error retrieving room:", error);
            res.status(500).json({ message: 'Error retrieving room', error: error.message || error });
        }
    },

    // Update a room by ID
    updateRoom: async (req, res) => {
        try {
            const { id } = req.params;
            const { hotelID } = req.body;

            // Validasi hotelID jika ada
            if (hotelID) {
                const hotel = await Hotel.findById(hotelID);
                if (!hotel) {
                    return res.status(404).json({ message: "Hotel not found" });
                }
            }

            const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedRoom) {
                return res.status(404).json({ message: 'Room not found' });
            }

            res.status(200).json({ message: 'Room updated successfully', data: updatedRoom });
        } catch (error) {
            console.error("Error updating room:", error);
            res.status(500).json({ message: 'Error updating room', error: error.message || error });
        }
    },

    // Delete a room by ID
    deleteRoom: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRoom = await Room.findByIdAndDelete(id);
            if (!deletedRoom) {
                return res.status(404).json({ message: 'Room not found' });
            }
            res.status(200).json({ message: 'Room deleted successfully', data: deletedRoom });
        } catch (error) {
            console.error("Error deleting room:", error);
            res.status(500).json({ message: 'Error deleting room', error: error.message || error });
        }
    }
};
