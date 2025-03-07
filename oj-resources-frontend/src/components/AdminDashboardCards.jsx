import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <Card
        icon={<FaShoppingCart />}
        label="Total Orders"
        value={stats.totalOrders}
      />
      <Card
        icon={<FaMoneyBillWave />}
        label="Total Sales"
        value={`₦${stats.totalSales}`}
      />
      <Card
        icon={<FaBox />}
        label="Total Products"
        value={stats.totalProducts}
      />
      <Card icon={<FaUsers />} label="Total Users" value={stats.totalUsers} />
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-blue-500">{icon}</div>
    <div>
      <p className="text-gray-600">{label}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  </div>
);

export default DashboardCards;
