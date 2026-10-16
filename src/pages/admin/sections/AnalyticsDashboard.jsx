import { useAuth } from "../../../context/AuthContext";
import { Icon } from "../../../components/LiveStats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#F2B01E", "#0F2E22", "#8FD19E", "#FF7A59", "#7CC4F2", "#B9A66A"];

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "1px solid rgba(15,46,34,0.15)",
  fontSize: 13,
};

function AnalyticsDashboard() {
  const { users, donations, moneyDonations } = useAuth();

  const totalDonations = donations.length;
  const totalMeals = donations.reduce((sum, d) => sum + (parseInt(d.totalQuantity) || 0), 0);
  const activeDonors = users.filter((u) => u.role === "donor" && u.status === "approved").length;
  const activeVolunteers = users.filter((u) => u.role === "ngo" && u.status === "approved").length;
  const totalMoneyDonated = moneyDonations.reduce((sum, p) => sum + p.amount, 0);

  const statusCounts = ["available", "requested", "approved", "picked_up", "on_the_way", "delivered"].map(
    (status) => ({
      status: status.replace("_", " "),
      count: donations.filter((d) => d.status === status).length,
    })
  );

  const categoryCounts = Object.entries(
    donations.reduce((acc, d) => {
      const key = d.category || "Other";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const cards = [
    { icon: "list", value: totalDonations, label: "Total donations", bg: "bg-[#F2B01E]", ring: "text-[#0F2E22]" },
    { icon: "bowl", value: totalMeals, label: "Total meals", bg: "bg-[#FFF1CC]", ring: "text-[#8A5A00]" },
    { icon: "users", value: activeDonors, label: "Active donors", bg: "bg-[#DDF2E2]", ring: "text-[#2F7A55]" },
    { icon: "handshake", value: activeVolunteers, label: "Active NGOs", bg: "bg-[#FFE0D8]", ring: "text-[#D2542F]" },
    { icon: "wallet", value: `৳${totalMoneyDonated.toLocaleString()}`, label: "Money donated", bg: "bg-[#0F2E22]", ring: "text-[#F2B01E]", dark: true },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {cards.map((c) => (
          <div key={c.label} className={`${c.bg} rounded-2xl p-4`}>
            <span className={`w-10 h-10 rounded-full bg-white/70 flex items-center justify-center ${c.ring}`}>
              <Icon name={c.icon} className="w-5 h-5" />
            </span>
            <p className={`mt-3 text-3xl font-bold tabular-nums leading-none ${c.dark ? "text-white" : "text-[#0F2E22]"}`}>
              {c.value}
            </p>
            <p className={`mt-1.5 text-sm ${c.dark ? "text-[#A9BFB0]" : "text-[#3B4F43]"}`}>{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm p-5">
          <h2 className="font-semibold text-[#0F2E22] mb-4">Donations by status</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusCounts}>
              <XAxis dataKey="status" tick={{ fontSize: 11, fill: "#3B4F43" }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#3B4F43" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(242,176,30,0.12)" }} />
              <Bar dataKey="count" fill="#F2B01E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm p-5">
          <h2 className="font-semibold text-[#0F2E22] mb-4">Donations by category</h2>
          {categoryCounts.length === 0 ? (
            <p className="text-sm text-[#3B4F43] py-16 text-center">No donations to chart yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryCounts}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {categoryCounts.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;