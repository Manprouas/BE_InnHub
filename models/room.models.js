const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    roomtype: String,
    price: Number,
    phone: Number,
    address: String,
    hotelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    }
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
