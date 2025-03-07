import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
    { name: "Products", icon: <Package size={20} />, path: "/admin/products" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col p-5">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
                pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
