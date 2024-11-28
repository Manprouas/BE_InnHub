const express = require('express');
const route = express.Router();
const userRoute = require('./user'); 
const orderRoute = require('./oder.routes')
const roomRoute = require('./room.routes')
const hotelRoute = require('./hotel.router')

route.get('/', (req, res) => {
    res.json("express mongoose halo");
});

route.use('/users', userRoute);
route.use('/orders', orderRoute)
route.use('/rooms', roomRoute)
route.use('/hotels', hotelRoute)

module.exports = route;
