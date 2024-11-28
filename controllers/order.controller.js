const Order = require('../models/order.models');
const Room = require('../models/room.models'); // Pastikan model Room diimpor

module.exports = {
    // Mendapatkan semua order dengan populasi user dan room
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
                .populate('userID', 'name email') // Populate userID dengan nama dan email
                .populate({
                    path: 'roomID',
                    select: 'roomtype price phone address', // Pilih field spesifik dari Room
                });

            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    },

    // Mendapatkan order berdasarkan ID
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id)
                .populate('userID', 'name email')
                .populate({
                    path: 'roomID',
                    select: 'roomtype price phone address',
                });

            if (!order) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            res.status(200).json({ success: true, data: order });
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            res.status(500).json({ message: "Error fetching order by ID", error: error.message });
        }
    },

    // Membuat order baru
    createOrder: async (req, res) => {
        try {
            const { checkin, checkout, price_total, userID, roomID } = req.body;

            const newOrder = new Order({
                checkin,
                checkout,
                price_total,
                userID,
                roomID, // RoomID tetap disimpan apa adanya
            });

            await newOrder.save();
            res.status(201).json({ success: true, data: newOrder });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: "Error creating order", error: error.message });
        }
    },

    // Mengupdate order berdasarkan ID
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });

            if (!updatedOrder) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            res.status(200).json({ success: true, data: updatedOrder });
        } catch (error) {
            console.error("Error updating order:", error);
            res.status(500).json({ message: "Error updating order", error: error.message });
        }
    },

    // Menghapus order berdasarkan ID
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedOrder = await Order.findByIdAndDelete(id);

            if (!deletedOrder) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            res.status(200).json({ success: true, message: "Order deleted successfully" });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Error deleting order", error: error.message });
        }
    },
};
