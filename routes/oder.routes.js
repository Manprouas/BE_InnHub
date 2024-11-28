const express = require('express')
const { login, register } = require('../controllers/user.controllers')
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/order.controller')
const router = express.Router()

router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.post('/create', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router