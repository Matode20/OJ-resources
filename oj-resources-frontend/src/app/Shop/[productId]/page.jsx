"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import NavBar from "@/components/NavBar";
import { fetchProductById } from "@/utils/api";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen">
        <NavBar />
        <p className="text-center text-xl mt-10">Loading...</p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen">
        <NavBar />
        <p className="text-center text-xl mt-10">Product not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-md object-cover h-[400px]"
          />
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-xl font-semibold mt-4">
              ₦{product.price.toLocaleString()}
            </p>
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
