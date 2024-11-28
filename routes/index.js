const express = require('express');
const route = express.Router();
const userRoute = require('./user'); 

route.get('/', (req, res) => {
    res.json("express mongoose halo");
});

route.use('/users', userRoute);

module.exports = route;
