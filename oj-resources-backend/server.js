import express from "express";
import dbConnection from "./db/conn.js";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import UserRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import "./jobs/orderJobs.js";

const app = express();
const port = 720;
dbConnection();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/vi/payment", paymentRouter);
app.get("/", (req, res) => {
  res.send("hello welcome to my personal api server");
});

app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
