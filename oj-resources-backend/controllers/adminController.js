import { validateJWT } from "../middlewares/validateJWT.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";


/**
 * @desc Create a new admin (Super Admin only)
 * @route POST /api/admin/create
 * @access Super Admin Only
 */
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const admin = await User.create({ name, email, password, role: "admin" });

    if (admin) {
      res.status(201).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: validateJWT(admin.id),
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// 📌 Fetch Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalOrders,
      totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// 📌 Fetch Sales Performance Data (Last 6 Months)
export const getSalesData = async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = salesData.map((item) => ({
      month: new Date(2024, item._id - 1).toLocaleString("en-US", {
        month: "short",
      }),
      sales: item.sales,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
};
