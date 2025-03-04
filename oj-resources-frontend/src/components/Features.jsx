"use client";
import { motion } from "framer-motion";
import { LucideIcon, ShoppingBag, Truck, Leaf } from "lucide-react";

/**
 * @typedef {Object} Feature
 * @property {import('lucide-react').LucideIcon} icon
 * @property {string} title
 * @property {string} description
 */

/** @type {Feature[]} */
const features = [
  {
    icon: ShoppingBag,
    title: "Fresh Farm Produce",
    description:
      "Get high-quality, organic farm produce directly from local farmers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery to your doorstep, ensuring freshness.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Packaging",
    description:
      "Sustainable and biodegradable packaging for a greener future.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2">
          The best quality and service for your agricultural needs.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <feature.icon className="w-12 h-12 text-green-600 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
