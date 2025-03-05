"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/shop");
    }, 5000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="text-lg mt-2">Thank you for your purchase.</p>
        <p className="text-sm">Redirecting to shop...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
