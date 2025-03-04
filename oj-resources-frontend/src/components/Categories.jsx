"use client";
import { motion } from "framer-motion";
import Image from "next/image";
// Import your images
import Live from "../assets/live.jpg";
import Processed from "../assets/processed.jpg";
import Dry from "../assets/dry.avif";

const categories = [
  {
    name: "Live",
    image: Live,
  },
  {
    name: "Processed",
    image: Processed,
  },
  {
    name: "Dry",
    image: Dry,
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Browse Categories</h2>
        <p className="text-gray-600 mt-2">
          Explore fresh farm produce by category
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={300}
                className="w-full h-60 object-cover transition-transform group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
