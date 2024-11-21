const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.json("express mongoose halo")
})

module.exports = route