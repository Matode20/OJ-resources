import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/app/Store/cartStore.js";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Log the image URL for debugging
  console.log("Product image URL:", product.image);

  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative h-48 w-full mb-4">
          {imageError ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span>Image not available</span>
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </Link>
      <div className="mt-2">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold hover:text-green-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500">NGN {product.price}</p>
      </div>
      {hovered && (
        <div className="absolute bottom-18 left-0 right-0 flex justify-center gap-2">
          <motion.button
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            whileHover={{ scale: 1.1 }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </motion.button>
          <Link href={`/products/${product._id}`}>
            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              whileHover={{ scale: 1.1 }}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
