import axios from "axios";

const API_URL = "https://your-backend-url.com/api/auth";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Logout user (clear local storage)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
