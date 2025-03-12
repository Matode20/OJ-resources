const AdminHeader = () => {
  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <span className="text-gray-800 text-xl font-semibold">Admin Panel</span>
      </div>
      <div className="flex items-center">
        <button className="text-gray-500 hover:text-gray-600">Logout</button>
      </div>
    </header>
  );
};

export default AdminHeader;
