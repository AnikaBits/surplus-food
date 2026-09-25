import { useAuth } from "../../../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function AnalyticsDashboard() {
  const { users, donations, moneyDonations } = useAuth();

  const totalDonations = donations.length;
  const totalMeals = donations.reduce((sum, d) => sum + (parseInt(d.totalQuantity) || 0), 0);
  const activeDonors = users.filter((u) => u.role === "donor" && u.status === "approved").length;
  const activeVolunteers = users.filter((u) => u.role === "ngo" && u.status === "approved").length;
  const totalMoneyDonated = moneyDonations.reduce((sum, p) => sum + p.amount, 0);

  const statusCounts = ["available", "requested", "approved", "picked_up", "on_the_way", "delivered"].map(
    (status) => ({
      status,
      count: donations.filter((d) => d.status === status).length,
    })
  );

  const categoryCounts = Object.entries(
    donations.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#16a34a", "#f59e0b", "#3b82f6", "#a855f7", "#6366f1", "#6b7280"];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{totalDonations}</p>
          <p className="text-xs text-gray-500">Total Donations</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{totalMeals}</p>
          <p className="text-xs text-gray-500">Total Meals</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{activeDonors}</p>
          <p className="text-xs text-gray-500">Active Donors</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{activeVolunteers}</p>
          <p className="text-xs text-gray-500">Active Volunteers</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-700">৳{totalMoneyDonated}</p>
          <p className="text-xs text-gray-500">Money Donated</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Donations by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusCounts}>
              <XAxis dataKey="status" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Donations by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryCounts} dataKey="value" nameKey="name" outerRadius={80} label>
                {categoryCounts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;