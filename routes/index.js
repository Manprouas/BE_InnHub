const express = require('express');
const route = express.Router();
const userRoute = require('./user'); 
const orderRoute = require('./oder.routes')

route.get('/', (req, res) => {
    res.json("express mongoose halo");
});

route.use('/users', userRoute);
route.use('/orders', orderRoute)

module.exports = route;
