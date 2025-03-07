"use client";
import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import NavBar from "@/components/NavBar";
import DashboardCards from "@/components/AdminDashboardCards";
import SalesChart from "@/components/AdminSalesChart";
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <div>
          <DashboardCards />
        </div>
        <div>
          <SalesChart />
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
