import express from "express";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/adminOrderController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";

const adminOrderRouter = express.Router();

// GET all orders (Admin only)
adminOrderRouter.get("/", protect, adminAuth, getOrders);

// UPDATE order status (Admin only)
adminOrderRouter.patch("/:id", protect, adminAuth, updateOrderStatus);

// DELETE an order (Admin only)
adminOrderRouter.delete("/:id", protect, adminAuth, deleteOrder);

export default adminOrderRouter;
