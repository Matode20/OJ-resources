import express from "express";
import { createAdmin, getDashboardStats, getSalesData } from "../controllers/adminController.js";
import { protect, superAdminOnly } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/stats", getDashboardStats);
adminRouter.get("/sales-data", getSalesData);
// Super Admin can create new admins
adminRouter.post("/create", protect, superAdminOnly, createAdmin);

export default adminRouter;
