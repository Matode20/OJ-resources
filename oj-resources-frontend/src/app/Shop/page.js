"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import useCartStore from "../Store/cartStore";
import ProductCard from "@/components/ProductCard";
import { toast } from "react-hot-toast";
import { fetchProducts } from "@/utils/api.js";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
        toast.error("Failed to load products");
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;
    if (category !== "All") {
      updatedProducts = products.filter((prod) => prod.category === category);
    }
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(updatedProducts);
  }, [category, searchTerm, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto p-6">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Live">Live</option>
          <option value="Processed">Processed</option>
          <option value="Dry">Dry</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
