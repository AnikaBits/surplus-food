import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function AllDonations() {
  const { donations = [], users = [] } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get user name from user ID
  function getUserName(id) {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "—";
  }

  // Get food name
  function getFoodName(donation) {
    return donation.foodItems?.[0]?.name || "Food Donation";
  }

  // Statistics
  const totalDonations = donations.length;

  const availableDonations = donations.filter(
    (donation) => donation.status === "available"
  ).length;

  const deliveredDonations = donations.filter(
    (donation) => donation.status === "delivered"
  ).length;

  const inProgressDonations = donations.filter(
    (donation) =>
      donation.status !== "available" &&
      donation.status !== "delivered"
  ).length;

  // Get unique statuses from existing donation data
  const availableStatuses = [
    ...new Set(
      donations
        .map((donation) => donation.status)
        .filter(Boolean)
    ),
  ];

  // Search and filter donations
  const filteredDonations = donations.filter((donation) => {
    const searchText = search.toLowerCase().trim();

    const foodName = getFoodName(donation).toLowerCase();

    const donorName = getUserName(
      donation.donorId
    ).toLowerCase();

    const ngoName = donation.requestedBy
      ? getUserName(donation.requestedBy).toLowerCase()
      : "";

    const matchesSearch =
      foodName.includes(searchText) ||
      donorName.includes(searchText) ||
      ngoName.includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  function formatStatus(status) {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: "🍱",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Available Food",
      value: availableDonations,
      icon: "🥗",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "In Progress",
      value: inProgressDonations,
      icon: "🚚",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Delivered",
      value: deliveredDonations,
      icon: "✅",
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            🍱 Food Donation Monitoring
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            All Donations
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Monitor all food donations, track their
            progress, and view donor and NGO
            information across the FoodShare platform.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              💚
            </span>

            <div>

              <p className="text-xs text-green-100">
                FoodShare Community
              </p>

              <p className="font-bold">
                {totalDonations} Total Food Donations
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >

            <div
              className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>

            <p className="mt-5 text-sm font-semibold text-gray-500">
              {stat.title}
            </p>

            <h3
              className={`mt-2 text-3xl font-extrabold ${stat.color}`}
            >
              {stat.value}
            </h3>

          </div>

        ))}

      </div>

      {/* DONATION MANAGEMENT */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* SECTION TITLE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              📋 Food Donation Records
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search and monitor donation activities
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold">
            {filteredDonations.length} Records
          </span>

        </div>

        {/* SEARCH AND FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">

          {/* SEARCH */}
          <div className="md:col-span-2 relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search food, donor or NGO..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
          >

            <option value="all">
              All Statuses
            </option>

            {availableStatuses.map((status) => (

              <option key={status} value={status}>
                {formatStatus(status)}
              </option>

            ))}

          </select>

        </div>

        {/* EMPTY STATE */}
        {filteredDonations.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-10 sm:p-14 text-center">

            <div className="text-5xl mb-5">
              {donations.length === 0 ? "📭" : "🔍"}
            </div>

            <h4 className="text-xl font-extrabold text-green-900">
              {donations.length === 0
                ? "No Donations Yet"
                : "No Matching Donations"}
            </h4>

            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-7">

              {donations.length === 0
                ? "Food donations will appear here when donors add them to the platform."
                : "No donations match your current search or selected status."}

            </p>

            {donations.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition"
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="overflow-x-auto rounded-2xl border border-green-100">

            <table className="w-full min-w-[850px] text-sm">

              {/* TABLE HEADER */}
              <thead className="bg-green-50 text-green-900">

                <tr>

                  <th className="px-6 py-5 text-left font-bold">
                    Food Donation
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Donor
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    NGO / Volunteer
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Quantity
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Status
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-gray-100">

                {filteredDonations.map((donation) => (

                  <tr
                    key={donation.id}
                    className="hover:bg-green-50/50 transition"
                  >

                    {/* FOOD */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                          🍱
                        </div>

                        <div>

                          <p className="font-bold text-green-950">
                            {getFoodName(donation)}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Food Donation
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* DONOR */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <span className="text-lg">
                          👤
                        </span>

                        <span className="font-semibold text-gray-700">
                          {getUserName(donation.donorId)}
                        </span>

                      </div>

                    </td>

                    {/* NGO */}
                    <td className="px-6 py-5">

                      {donation.requestedBy ? (

                        <div className="flex items-center gap-2">

                          <span className="text-lg">
                            🏢
                          </span>

                          <span className="font-semibold text-gray-700">
                            {getUserName(donation.requestedBy)}
                          </span>

                        </div>

                      ) : (

                        <span className="text-gray-400">
                          Not Requested
                        </span>

                      )}

                    </td>

                    {/* QUANTITY */}
                    <td className="px-6 py-5">

                      <span className="inline-flex px-4 py-2 bg-green-50 text-green-800 rounded-lg font-bold">
                        {donation.totalQuantity ?? "—"}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">

                      <StatusBadge status={donation.status} />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* INFORMATION CARD */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💡
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              Donation Monitoring Guidelines
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              This section provides an overview of
              food donations across the platform.
              You can search records, filter by
              donation status, and monitor which
              donors and NGOs are involved.
              Donation details are displayed
              for monitoring purposes only.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AllDonations;