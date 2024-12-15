const express = require('express')
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/room.controller')
const router = express.Router()

router.get('/', getAllRooms)
router.get('/:id', getRoomById)
router.post('/create', createRoom)
router.put('/:id', updateRoom)
router.delete('/:id', deleteRoom)


module.exports = router