const express = require('express')
const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } = require('../controllers/customers.controller')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/create', createUser)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)

module.exports = router
