import Order from "../models/order.js";

/**
 * @desc Get all orders (Admin)
 * @route GET /api/admin/orders
 * @access Private (Admin)
 */
export const getOrders = async (req, res) => {
  try {
    const { status, startDate, endDate, search } = req.query;
    let query = {};

    // Filter by order status
    if (status) {
      query.status = status;
    }

    // Filter by date range
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Search by customer name or order ID
    if (search) {
      query.$or = [
        { "customer.name": { $regex: search, $options: "i" } }, // Case-insensitive search
        { _id: search }, // Search by order ID
      ];
    }

    const orders = await Order.find(query).populate("customer", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Update order status
 * @route PATCH /api/admin/orders/:id
 * @access Private (Admin)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Delete an order
 * @route DELETE /api/admin/orders/:id
 * @access Private (Admin)
 */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
