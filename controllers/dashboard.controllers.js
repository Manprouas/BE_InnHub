const User = require('../models/user.models');
const Transaction = require('../models/order.models');
const Hotel = require('../models/hotel.models');
const Complaint = require('../models/complaint.models');

// Controller untuk mendapatkan ringkasan dashboard
exports.getDashboardSummary = async (req, res) => {
    try {
        // Total keseluruhan
        const userCount = await User.countDocuments();
        const transactionCount = await Transaction.countDocuments();
        const hotelCount = await Hotel.countDocuments();
        const complaintCount = await Complaint.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                userCount,
                transactionCount,
                hotelCount,
                complaintCount
            }
        });
    } catch (error) {
        console.error('Dashboard Summary Error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan ringkasan dashboard',
            error: error.message
        });
    }
};