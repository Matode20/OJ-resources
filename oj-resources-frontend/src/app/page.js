"use client";

import Link from "next/link";
import Button from "@/components/ui/Button.jsx";
import { motion } from "framer-motion";
import Features from "@/components/Features";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="h-[80vh] flex flex-col justify-center items-center text-center bg-green-600 text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Fresh From the Farm to Your Doorstep
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          High-quality organic produce delivered fast & fresh. Shop now and
          enjoy healthy living!
        </p>
        <Link href="/shop">
          <Button className="mt-6 bg-white text-green-600 hover:bg-green-500 hover:text-white px-6 py-3 text-lg font-semibold rounded-xl">
            Shop Now
          </Button>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 shadow-md rounded-lg">
              <div className="h-40 bg-gray-300 rounded-md"></div>
              <h3 className="mt-4 text-lg font-medium">Product {item}</h3>
              <p className="text-gray-600">Fresh and organic.</p>
              <Button className="mt-3 w-full bg-green-600 text-white hover:bg-green-500">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </section>
      <Categories />

      {/* Why Choose Us */}
      <Features />

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; 2025 Fresh Farm Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
