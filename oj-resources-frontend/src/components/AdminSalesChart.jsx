import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data } = await axios.get("/api/admin/sales-data");
        setData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Sales Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
