"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import DashboardCards from "../../components/AdminDashboardCards";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const router = useRouter();

  useEffect(() => {
    // Check for admin authentication
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      toast.error("Failed to fetch dashboard stats");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
            <DashboardCards stats={stats} />

            {/* Recent Orders */}
            <div className="mt-8">
              <h4 className="text-gray-600 text-xl font-medium">
                Recent Orders
              </h4>
              <div className="mt-4">
                <div className="bg-white shadow rounded-lg p-4">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold">
                          Order ID
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold">
                          Customer
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold">
                          Amount
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-5 py-3 border-b">{order._id}</td>
                          <td className="px-5 py-3 border-b">
                            {order.customerName}
                          </td>
                          <td className="px-5 py-3 border-b">₦{order.total}</td>
                          <td className="px-5 py-3 border-b">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                order.status === "completed"
                                  ? "bg-green-200 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
