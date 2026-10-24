import { useAuth } from "../../../context/AuthContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AnalyticsDashboard() {
  const {
    users = [],
    donations = [],
    moneyDonations = [],
  } = useAuth();

  // ==========================================
  // EXISTING STATISTICS CALCULATIONS
  // ==========================================

  const totalDonations = donations.length;

  const totalMeals = donations.reduce(
    (sum, donation) =>
      sum + (parseInt(donation.totalQuantity, 10) || 0),
    0
  );

  const activeDonors = users.filter(
    (user) =>
      user.role === "donor" &&
      user.status === "approved"
  ).length;

  const activeVolunteers = users.filter(
    (user) =>
      user.role === "ngo" &&
      user.status === "approved"
  ).length;

  const totalMoneyDonated = moneyDonations.reduce(
    (sum, payment) => sum + (Number(payment.amount) || 0),
    0
  );

  // ==========================================
  // DONATION STATUS DATA
  // ==========================================

  const statuses = [
    "available",
    "requested",
    "approved",
    "picked_up",
    "on_the_way",
    "delivered",
  ];

  const statusCounts = statuses.map((status) => ({
    status,
    count: donations.filter(
      (donation) => donation.status === status
    ).length,
  }));

  // ==========================================
  // DONATION CATEGORY DATA
  // ==========================================

  const categoryCounts = Object.entries(
    donations.reduce((acc, donation) => {
      const category = donation.category || "Uncategorized";

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // ==========================================
  // COLORS
  // ==========================================

  const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#3b82f6",
    "#a855f7",
    "#6366f1",
    "#6b7280",
  ];

  const STATUS_COLORS = {
    available: "bg-green-500",
    requested: "bg-yellow-500",
    approved: "bg-blue-500",
    picked_up: "bg-purple-500",
    on_the_way: "bg-indigo-500",
    delivered: "bg-emerald-600",
  };

  function formatStatus(status) {
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-BD", {
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // ==========================================
  // STATISTICS CARDS
  // ==========================================

  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: "🍱",
      description: "Food donation records",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Total Meals",
      value: totalMeals,
      icon: "🥗",
      description: "Total recorded quantity",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "Active Donors",
      value: activeDonors,
      icon: "👤",
      description: "Approved donor accounts",
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Active Volunteers",
      value: activeVolunteers,
      icon: "🤝",
      description: "Approved NGO accounts",
      bg: "bg-purple-100",
      color: "text-purple-700",
    },
    {
      title: "Money Donated",
      value: `৳${formatMoney(totalMoneyDonated)}`,
      icon: "💰",
      description: "Recorded monetary donations",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            📊 Platform Insights
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Analytics Dashboard
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Explore donation statistics, monitor
            community participation, and understand
            FoodShare's overall activity through
            visual reports.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              📈
            </span>

            <div>

              <p className="text-xs text-green-100">
                FoodShare Analytics
              </p>

              <p className="font-bold">
                {totalDonations} Donation Records
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
          STATISTICS CARDS
      ====================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            <div className="flex items-start justify-between gap-4">

              <div
                className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>

              <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                Overview
              </span>

            </div>

            <p className="mt-6 text-sm font-semibold text-gray-500">
              {stat.title}
            </p>

            <h3
              className={`mt-2 text-3xl font-extrabold break-words ${stat.color}`}
            >
              {stat.value}
            </h3>

            <p className="mt-3 text-xs text-gray-400">
              {stat.description}
            </p>

          </div>

        ))}

      </div>

      {/* ======================================
          CHARTS SECTION
      ====================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* DONATIONS BY STATUS */}

        <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm min-w-0">

          <div className="mb-7">

            <span className="inline-flex px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold">
              📊 Status Analysis
            </span>

            <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-green-950">
              Donations by Status
            </h3>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Number of food donations in each
              stage of the donation process.
            </p>

          </div>

          <div className="w-full h-[310px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={statusCounts}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 45,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="status"
                  tick={{
                    fontSize: 10,
                    fill: "#6b7280",
                  }}
                  tickFormatter={formatStatus}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 11,
                    fill: "#6b7280",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value) => [
                    value,
                    "Donations",
                  ]}
                  labelFormatter={formatStatus}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #dcfce7",
                  }}
                />

                <Bar
                  dataKey="count"
                  fill="#16a34a"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* DONATIONS BY CATEGORY */}

        <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm min-w-0">

          <div className="mb-7">

            <span className="inline-flex px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
              🥧 Category Analysis
            </span>

            <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-green-950">
              Donations by Category
            </h3>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Distribution of food donations
              across different food categories.
            </p>

          </div>

          {categoryCounts.length === 0 ? (

            <div className="h-[310px] flex flex-col items-center justify-center text-center">

              <span className="text-5xl">
                📭
              </span>

              <h4 className="mt-4 font-bold text-green-900">
                No Category Data
              </h4>

              <p className="mt-2 text-sm text-gray-500">
                Category statistics will appear
                when donations are available.
              </p>

            </div>

          ) : (

            <div className="w-full h-[310px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={categoryCounts}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={95}
                    innerRadius={45}
                    paddingAngle={3}
                  >

                    {categoryCounts.map((entry, index) => (

                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      value,
                      "Donations",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #dcfce7",
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{
                      fontSize: "12px",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

      </div>

      {/* ======================================
          STATUS BREAKDOWN
      ====================================== */}

      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        <div className="mb-7">

          <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
            📋 Donation Status Breakdown
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Detailed overview of donation counts
            at each tracked stage.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {statusCounts.map((item) => {

            const percentage =
              totalDonations > 0
                ? (item.count / totalDonations) * 100
                : 0;

            return (

              <div
                key={item.status}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5"
              >

                <div className="flex items-center justify-between gap-4 mb-4">

                  <div className="flex items-center gap-3">

                    <span
                      className={`w-3 h-3 rounded-full ${
                        STATUS_COLORS[item.status]
                      }`}
                    />

                    <span className="text-sm font-bold text-gray-700">
                      {formatStatus(item.status)}
                    </span>

                  </div>

                  <span className="text-sm font-extrabold text-green-800">
                    {item.count}
                  </span>

                </div>

                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      STATUS_COLORS[item.status]
                    }`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <p className="mt-3 text-xs text-gray-400">
                  {percentage.toFixed(1)}% of total donations
                </p>

              </div>

            );

          })}

        </div>

      </div>

      {/* ======================================
          COMMUNITY OVERVIEW
      ====================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DONOR COMMUNITY */}

        <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-3xl p-7 shadow-sm">

          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
            👤
          </div>

          <h3 className="mt-5 text-xl font-extrabold text-green-950">
            Donor Community
          </h3>

          <p className="mt-3 text-sm text-gray-500 leading-7">
            Approved food donors registered
            on the FoodShare platform.
          </p>

          <div className="mt-6 flex items-end gap-3">

            <span className="text-4xl font-extrabold text-green-700">
              {activeDonors}
            </span>

            <span className="text-sm font-semibold text-gray-500 pb-1">
              Active Donors
            </span>

          </div>

        </div>

        {/* NGO COMMUNITY */}

        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-3xl p-7 shadow-sm">

          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
            🤝
          </div>

          <h3 className="mt-5 text-xl font-extrabold text-green-950">
            NGO & Volunteer Community
          </h3>

          <p className="mt-3 text-sm text-gray-500 leading-7">
            Approved NGO and volunteer accounts
            helping with food collection and distribution.
          </p>

          <div className="mt-6 flex items-end gap-3">

            <span className="text-4xl font-extrabold text-emerald-700">
              {activeVolunteers}
            </span>

            <span className="text-sm font-semibold text-gray-500 pb-1">
              Active Volunteers
            </span>

          </div>

        </div>

      </div>

      {/* ======================================
          INFORMATION CARD
      ====================================== */}

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💡
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              About FoodShare Analytics
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              These analytics are calculated from
              the donation, user, and monetary
              donation records currently available
              in the application. The charts provide
              a visual overview of donation activity,
              food categories, and community participation.
            </p>

            <p className="mt-3 text-xs text-gray-500 leading-6">
              Note: Total Meals represents the sum of
              recorded donation quantities, following
              the existing calculation. Monetary
              donation figures reflect demo records
              and do not represent verified payments.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsDashboard;