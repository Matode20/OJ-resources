import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});;
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
