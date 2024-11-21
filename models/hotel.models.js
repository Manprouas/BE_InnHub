const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    hotelname: String,
    email: String,
    phone: Number,
    address: String,
    is_admin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
