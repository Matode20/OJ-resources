import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to restrict to admins
export const adminOnly = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "superadmin")
  ) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

// Super Admin Only Middleware
export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Super Admins only." });
  }
};
