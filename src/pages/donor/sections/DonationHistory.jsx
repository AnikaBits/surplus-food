import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function DonationHistory() {
  const { currentUser, donations = [] } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Only logged-in donor's donations
  const myDonations = donations.filter(
    (donation) => donation.donorId === currentUser?.id
  );

  // Completed deliveries
  const completedDonations = myDonations.filter(
    (donation) => donation.status === "delivered"
  );

  // Statistics
  const totalDonations = myDonations.length;

  const totalMeals = myDonations.reduce((sum, donation) => {
    const num = parseInt(donation.totalQuantity, 10) || 0;
    return sum + num;
  }, 0);

  // Search and filter
  const filteredDonations = myDonations.filter((donation) => {
    const foodName = donation.foodItems?.[0]?.name || "";

    const matchesSearch = foodName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Dynamic status options
  const availableStatuses = [
    ...new Set(
      myDonations
        .map((donation) => donation.status)
        .filter(Boolean)
    ),
  ];

  // Format date
  function formatDate(dateString) {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Statistics cards
  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: "🍱",
      bg: "bg-green-100",
      color: "text-green-800",
      description: "All food donations posted",
    },
    {
      title: "Total Meals Donated",
      value: totalMeals,
      icon: "🥗",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
      description: "Estimated from posted quantities",
    },
    {
      title: "Completed Deliveries",
      value: completedDonations.length,
      icon: "✅",
      bg: "bg-blue-100",
      color: "text-blue-700",
      description: "Successfully delivered donations",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            📊 Donation History & Statistics
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Your Donation Journey
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Explore your donation history, track completed
            deliveries, and see the impact of your contributions
            to the FoodShare community.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">💚</span>

            <div>
              <p className="text-xs text-green-100">
                Your Contribution
              </p>

              <p className="font-bold">
                {totalDonations} Food Donations
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS CARDS */}
      <div className="grid sm:grid-cols-3 gap-5">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            <div className="flex items-center justify-between">

              <div
                className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>

              <span className="text-green-500 text-xl">
                ↗
              </span>

            </div>

            <p className="mt-5 text-sm font-semibold text-gray-500">
              {stat.title}
            </p>

            <h3 className={`mt-2 text-4xl font-extrabold ${stat.color}`}>
              {stat.value}
            </h3>

            <p className="mt-3 text-xs text-gray-400">
              {stat.description}
            </p>

          </div>
        ))}

      </div>

      {/* SEARCH AND FILTER */}
      <div className="bg-white border border-green-100 rounded-2xl p-5 sm:p-6 shadow-sm">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}
          <div className="flex-1">

            <label
              htmlFor="historySearch"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Search Donation History
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                id="historySearch"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by food name..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              />

            </div>

          </div>

          {/* STATUS FILTER */}
          <div className="w-full md:w-60">

            <label
              htmlFor="historyStatus"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Filter by Status
            </label>

            <select
              id="historyStatus"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
            >

              <option value="all">
                All Statuses
              </option>

              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-green-800">
              {filteredDonations.length}
            </span>
            {" "}of{" "}
            <span className="font-bold text-green-800">
              {totalDonations}
            </span>
            {" "}donations
          </p>

        </div>

      </div>

      {/* DONATION HISTORY LIST */}
      <div>

        <div className="flex items-center gap-3 mb-6">

          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
            📋
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              Donation Records
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View your food donation activities
            </p>
          </div>

        </div>

        {filteredDonations.length === 0 ? (

          /* EMPTY STATE */
          <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto">
              📭
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-green-950">
              {totalDonations === 0
                ? "No Donation History Yet"
                : "No Matching Donations"}
            </h3>

            <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">
              {totalDonations === 0
                ? "You haven't posted any donations yet. Your donation records will appear here after you start sharing food."
                : "No donation records match your search or selected status. Try changing your filters."}
            </p>

            {totalDonations > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-7 px-7 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition"
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="space-y-4">

            {filteredDonations.map((donation) => (

              <div
                key={donation.id}
                className="bg-white border border-green-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                  {/* FOOD INFORMATION */}
                  <div className="flex items-start gap-4 min-w-0">

                    <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                      🍱
                    </div>

                    <div className="min-w-0">

                      <h4 className="text-lg font-extrabold text-green-950 break-words">
                        {donation.foodItems?.[0]?.name || "Food Donation"}
                      </h4>

                      <p className="mt-2 text-sm text-gray-500">
                        🥗 {donation.category || "Food"}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        📦 Quantity:{" "}
                        <span className="font-semibold text-gray-700">
                          {donation.totalQuantity || "Not specified"}
                        </span>
                      </p>

                    </div>

                  </div>

                  {/* DATE AND STATUS */}
                  <div className="flex flex-wrap items-center gap-5 lg:justify-end">

                    <div>

                      <p className="text-xs text-gray-400">
                        Posted On
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        {formatDate(donation.createdAt)}
                      </p>

                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-2">
                        Status
                      </p>

                      <StatusBadge status={donation.status} />
                    </div>

                  </div>

                </div>

                {/* PICKUP DETAILS */}
                {donation.pickupLocation && (
                  <div className="mt-5 pt-4 border-t border-gray-100">

                    <p className="text-sm text-gray-500">
                      📍 Pickup Location:{" "}
                      <span className="font-semibold text-gray-700">
                        {donation.pickupLocation}
                      </span>
                    </p>

                  </div>
                )}

              </div>

            ))}

          </div>

        )}

      </div>

      {/* INFORMATION CARD */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💚
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              Your Contributions Matter
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Every food donation helps reduce food waste
              and supports the FoodShare community.
              Keep sharing surplus food and making a difference.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DonationHistory;