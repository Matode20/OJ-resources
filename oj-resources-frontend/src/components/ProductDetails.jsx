"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            ₦{product.price}
          </p>
          <Button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
