import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

export const addToCart = async (req, res) => {
  try {
    let cart =
      (await Cart.findOne({ user: req.user._id })) ||
      (await Cart.create({ user: req.user._id, items: [] }));

    const existingItem = cart.items.find(
      (item) => item.product.toString() === req.body.productId
    );
    existingItem
      ? (existingItem.quantity += req.body.quantity)
      : cart.items.push({
          product: req.body.productId,
          quantity: req.body.quantity,
        });

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart?.items.length)
      return res.status(400).json({ message: "Cart empty" });

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
      })),
      totalAmount: cart.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      ),
      paymentMethod: req.body.paymentMethod || "COD",
    });

    await Promise.all([
      ...cart.items.map((i) =>
        Product.findByIdAndUpdate(i.product._id, {
          $inc: { stock: -i.quantity },
        })
      ),
      Cart.deleteOne({ user: req.user._id }),
    ]);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    res.json(
      await Order.find({ user: req.user._id }).populate("items.product")
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
