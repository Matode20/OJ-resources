"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="mb-4">Thank you for your purchase.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
