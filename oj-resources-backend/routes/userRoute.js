import express from "express";
import authController from "../controllers/authController.js";

const UserRouter = express.Router();

// User routes
UserRouter.get("/", (req, res) => {
  res.json({ message: "User routes working" });
});

UserRouter.post("/register", authController.register);
UserRouter.post("/login", authController.login);;

UserRouter.get("/profile/:id", (req, res) => {});

UserRouter.put("/update/:id", (req, res) => {});

UserRouter.delete("/delete/:id", (req, res) => {});

export default UserRouter;
