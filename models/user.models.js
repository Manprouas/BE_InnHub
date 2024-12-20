const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    email: String,
    password: String,
    phone: Number,
    is_admin: {
        type: Boolean,
        default: false
    },
    gambar: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
