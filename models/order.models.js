const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    price_total: Number,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
