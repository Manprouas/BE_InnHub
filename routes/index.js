const express = require('express');
const route = express.Router();
const userRoute = require('./user'); 
const orderRoute = require('./oder.routes')
const roomRoute = require('./room.routes')

route.get('/', (req, res) => {
    res.json("express mongoose halo");
});

route.use('/users', userRoute);
route.use('/orders', orderRoute)
route.use('/rooms', roomRoute)

module.exports = route;
