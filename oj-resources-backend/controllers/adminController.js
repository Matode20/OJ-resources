import { validateJWT } from "../middlewares/validateJWT.js";
import User from "../models/user.js";

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
