import express from "express";
import { createAdmin } from "../controllers/adminController.js";
import { protect, superAdminOnly } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// Super Admin can create new admins
adminRouter.post("/create", protect, superAdminOnly, createAdmin);

export default adminRouter;
