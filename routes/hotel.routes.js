const express = require('express')
const { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel } = require('../controllers/hotel.controller')
const router = express.Router()

router.get('/', getAllHotels)
router.get('/:id', getHotelById)
router.post('/create', createHotel)
router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)

module.exports = router
