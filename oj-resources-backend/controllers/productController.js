import cloudinary from "../utils/cloudinary.js";
import Product from "../models/product.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Setup multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const upload = multer({ storage });

const productController = {
  /**
   * @desc Create a new product
   * @route POST /api/products
   */
  createProduct: async (req, res) => {
    try {
      const { name, category, price, stock } = req.body;
      const image = req.file?.path; // Cloudinary returns image path

      if (!image) {
        return res.status(400).json({ error: "Image upload failed" });
      }

      // Log the image URL for debugging
      console.log("Uploaded image URL:", image);

      const newProduct = new Product({
        name,
        category,
        price,
        stock,
        image, // This should be the full Cloudinary URL
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Product creation error:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  },

  /**
   * @desc Get all products
   * @route GET /api/products
   */
  getProducts: async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products", error: error.message });
    }
  },

  /**
   * @desc Get a single product by ID
   * @route GET /api/products/:id
   */
  getProductById: async (req, res) => {
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
  },

  /**
   * @desc Update a product
   * @route PUT /api/products/:id
   */
  updateProduct: async (req, res) => {
    try {
      const { name, description, price, category, stock, images } = req.body;

      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;
      product.images = images || product.images;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  },

  /**
   * @desc Delete a product
   * @route DELETE /api/products/:id
   */
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      await product.deleteOne();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  },
};

export default productController;
