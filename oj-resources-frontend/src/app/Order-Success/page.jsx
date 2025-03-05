"use client";

import { useRouter } from "next/navigation";

const OrderSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully!
      </h1>
      <p className="text-lg">
        Thank you for your purchase. Your order is being processed.
      </p>
      <button
        onClick={() => router.push("/shop")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccessPage;
