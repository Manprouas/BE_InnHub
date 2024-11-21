const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
    },
    type: {
        type: String,
        enum: ['Service Issue', 'Room Cleanliness', 'Facility Problem', 'Other'],
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    photo: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    hotelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
