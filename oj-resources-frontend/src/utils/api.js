import axios from "axios";

const API_BASE_URL = "http://localhost:720/api/v1"; // Update with your backend URL

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:720/api/v1/products/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
