import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
        } catch (error) {
          console.error("Auth error:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      router.push("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
