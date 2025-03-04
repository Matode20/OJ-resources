"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, Package, Users } from "lucide-react";

const menuItems = [
  { text: "Dashboard", icon: <Menu />, link: "/dashboard" },
  { text: "Orders", icon: <ShoppingCart />, link: "/dashboard/orders" },
  { text: "Products", icon: <Package />, link: "/dashboard/products" },
  { text: "Users", icon: <Users />, link: "/dashboard/users" },
];

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-md ${
          open ? "block" : "hidden"
        } md:block`}
      >
        <nav className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <Link
                  href={item.link}
                  className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  {item.icon} <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-600"
          >
            ☰
          </button>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
