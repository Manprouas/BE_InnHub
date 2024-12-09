const express = require('express');
const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint } = require('../controllers/complaint.controller')
const router = express.Router();

router.get('/', getAllComplaints)
router.get('/:id', getComplaintById)
router.post('/create', createComplaint)
router.put('/:id', updateComplaint)
router.delete('/:id', deleteComplaint)

module.exports = router;