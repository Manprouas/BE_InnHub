const Complaint = require('../models/complaint.models');

module.exports = {
    // Create a new complaint
    createComplaint: async (req, res) => {
        try {
            const { type, description, photo, userID, hotelID, roomID } = req.body;

            // Buat keluhan baru
            const newComplaint = new Complaint({ type, description, photo, userID, hotelID, roomID });
            const savedComplaint = await newComplaint.save();

            res.status(201).json({ message: 'Complaint created successfully', data: savedComplaint });
        } catch (error) {
            console.error("Error creating complaint:", error);
            res.status(500).json({ message: 'Error creating complaint', error: error.message || error });
        }
    },

    // Get all complaints
    getAllComplaints: async (req, res) => {
        try {
            const complaints = await Complaint.find()
                .populate('userID', 'email') // Populate user data if necessary
                .populate('hotelID', 'hotelname') // Populate hotel data if necessary
                .populate('roomID', 'roomtype'); // Populate room data if necessary

            res.status(200).json({ message: 'Complaints retrieved successfully', data: complaints });
        } catch (error) {
            console.error("Error retrieving complaints:", error);
            res.status(500).json({ message: 'Error retrieving complaints', error: error.message || error });
        }
    },

    // Get a specific complaint by ID
    getComplaintById: async (req, res) => {
        try {
            const { id } = req.params;
            const complaint = await Complaint.findById(id)
                .populate('userID', 'email') // Populate user data if necessary
                .populate('hotelID', 'hotelname') // Populate hotel data if necessary
                .populate('roomID', 'roomtype'); // Populate room data if necessary

            if (!complaint) {
                return res.status(404).json({ message: 'Complaint not found' });
            }
            res.status(200).json({ message: 'Complaint retrieved successfully', data: complaint });
        } catch (error) {
            console.error("Error retrieving complaint:", error);
            res.status(500).json({ message: 'Error retrieving complaint', error: error.message || error });
        }
    },

    // Update a complaint by ID
    updateComplaint: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedComplaint) {
                return res.status(404).json({ message: 'Complaint not found' });
            }
            res.status(200).json({ message: 'Complaint updated successfully', data: updatedComplaint });
        } catch (error) {
            console.error("Error updating complaint:", error);
            res.status(500).json({ message: 'Error updating complaint', error: error.message || error });
        }
    },

    // Delete a complaint by ID
    deleteComplaint: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedComplaint = await Complaint.findByIdAndDelete(id);
            if (!deletedComplaint) {
                return res.status(404).json({ message: 'Complaint not found' });
            }
            res.status(200).json({ message: 'Complaint deleted successfully', data: deletedComplaint });
        } catch (error) {
            console.error("Error deleting complaint:", error);
            res.status(500).json({ message: 'Error deleting complaint', error: error.message || error });
        }
    }
};
