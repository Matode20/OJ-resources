import { useState } from "react";
import { motion } from "framer-motion";
import useCartStore from "@/app/Store/cartStore.js";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const [hovered, setHovered] = useState(false);
  console.log(product.images[0]);

  // const transformImageUrl = (url) => {
  //   // Check if it's an unsplash.com URL that needs transformation
  //   if (url && url.includes("unsplash.com/photos/")) {
  //     // Extract the ID from the URL
  //     const id = url.split("/").pop();
  //     return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;
  //   }
  //   return url;
  // };

  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product._id}`} className="block">
        <div className="relative h-48 w-full mb-4">
          <Image
            // src={product.images[0]}
            // src={transformImageUrl(product.images[0])}
            src={""}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            // onError={(e) => {
            //   console.error("Image loading error:", e);
            //   e.target.src = "/placeholder.png"; // Fallback image
            // }}
          />
        </div>
      </Link>
      <div className="mt-2">
        <Link href={`/shop/${product._id}`}>
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
          <Link href={`/shop/${product._id}`}>
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
