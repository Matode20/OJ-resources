"use client";

const DashboardPage = () => {
  const stats = [
    { title: "Total Orders", value: 120 },
    { title: "Total Products", value: 50 },
    { title: "Total Users", value: 200 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
