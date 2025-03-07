"use client";
import { useRouter } from "next/navigation";
import useCartStore from "../Store/cartStore.js";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity } = useCartStore();

  const handleRemove = (productId) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => router.push("/Shop")}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₦{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold mb-2">
                  ₦{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-xl font-bold">
                ₦{calculateTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
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
