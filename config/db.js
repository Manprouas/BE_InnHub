const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL || "mongodb+srv://muhammadzidanmaulana18:zidan1234567@cluster0.gltr4.mongodb.net/manpro"

const db = mongoose.connect(DB_URL)
module.exports = db