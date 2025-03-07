"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import useCartStore from "../Store/cartStore.js";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: calculateTotal() * 100, // Convert to kobo
    publicKey: "your_paystack_public_key_here",
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    setIsProcessing(false);
    toast.success("Payment successful!");
    clearCart();
    router.push("/success");
  };

  const onClose = () => {
    setIsProcessing(false);
    toast.error("Payment cancelled");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setIsProcessing(true);
    initializePayment(onSuccess, onClose);
  };

  if (items.length === 0) {
    router.push("/Shop");
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₦{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₦{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full ${
              isProcessing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-3 rounded-lg`}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
