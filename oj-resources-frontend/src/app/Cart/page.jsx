"use client";

import useCartStore from "../Store/cartStore";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <button
            onClick={() => router.push("/Shop")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-lg font-bold text-right mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Clear Cart
            </button>
            <button
              onClick={() => router.push("/Checkout")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
