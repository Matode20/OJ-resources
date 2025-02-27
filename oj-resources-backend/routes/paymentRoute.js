import express from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/initialize", initializePayment); // Route to start payment
paymentRouter.get("/verify/:reference", verifyPayment); // Route to verify payment

export default paymentRouter;
