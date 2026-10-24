import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function NgoHistory() {
  const { currentUser, donations = [], users = [] } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // All collections requested by this NGO
  const myCollections = donations.filter(
    (donation) => donation.requestedBy === currentUser?.id
  );

  // Preserve existing statistics calculations
  const totalCollected = myCollections.length;

  const totalDelivered = myCollections.filter(
    (donation) => donation.status === "delivered"
  ).length;

  const totalPeopleHelped = myCollections.reduce(
    (sum, donation) =>
      sum +
      (Number(donation.distribution?.estimatedPeopleHelped) || 0),
    0
  );

  // Dynamic statuses
  const statuses = [
    ...new Set(myCollections.map((donation) => donation.status)),
  ];

  // Get donor name
  function getDonorName(donorId) {
    const donor = users.find((user) => user.id === donorId);

    return donor ? donor.name : "Unknown Donor";
  }

  // Search and filter history
  const filteredHistory = myCollections.filter((donation) => {
    const foodName = donation.foodItems?.[0]?.name || "";
    const donorName = getDonorName(donation.donorId);

    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      foodName.toLowerCase().includes(searchText) ||
      donorName.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function formatStatus(status) {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

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

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  const stats = [
    {
      title: "Total Food Collected",
      value: totalCollected,
      icon: "📦",
      bg: "bg-green-100",
      color: "text-green-800",
      description: "Total food requests made",
    },
    {
      title: "Total Distributed",
      value: totalDelivered,
      icon: "🚚",
      bg: "bg-blue-100",
      color: "text-blue-700",
      description: "Completed deliveries",
    },
    {
      title: "People Helped",
      value: totalPeopleHelped,
      icon: "👥",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
      description: "Estimated beneficiaries",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            📊 NGO Activity Overview
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            History & Statistics
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Review your food collection activities,
            monitor completed deliveries, and explore
            the impact your organization has made
            through FoodShare.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">💚</span>

            <div>

              <p className="text-xs text-green-100">
                Community Impact
              </p>

              <p className="font-bold">
                {totalPeopleHelped} Estimated People Helped
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >

            <div className="flex items-center justify-between">

              <div
                className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>

              <span className="text-green-400 text-lg">
                ↗
              </span>

            </div>

            <p className="mt-5 text-sm font-semibold text-gray-500">
              {stat.title}
            </p>

            <h3
              className={`mt-2 text-3xl font-extrabold ${stat.color}`}
            >
              {stat.value}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              {stat.description}
            </p>

          </div>
        ))}

      </div>

      {/* SEARCH AND FILTER */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-7 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div>

            <h3 className="text-xl font-extrabold text-green-950">
              🔍 Explore Collection History
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search and filter your previous food collection activities
            </p>

          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="px-5 py-2.5 bg-green-50 text-green-700 border border-green-100 rounded-xl text-sm font-semibold hover:bg-green-100 transition"
          >
            Clear Filters
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* SEARCH */}
          <div>

            <label
              htmlFor="historySearch"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Search Food or Donor
            </label>

            <input
              id="historySearch"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search collection history..."
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* STATUS FILTER */}
          <div>

            <label
              htmlFor="historyStatus"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Collection Status
            </label>

            <select
              id="historyStatus"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            >

              <option value="all">
                All Statuses
              </option>

              {statuses.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-green-800">
              {filteredHistory.length}
            </span>
            {" "}of{" "}
            <span className="font-bold text-green-800">
              {totalCollected}
            </span>
            {" "}collection records
          </p>

        </div>

      </div>

      {/* COLLECTION HISTORY */}
      <div>

        <div className="flex items-center justify-between gap-4 mb-6">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              📋 Collection History
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your food collection and delivery records
            </p>

          </div>

        </div>

        {filteredHistory.length === 0 ? (

          <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto">
              📭
            </div>

            <h4 className="mt-6 text-2xl font-extrabold text-green-950">
              {totalCollected === 0
                ? "No Collection History Yet"
                : "No Matching Records Found"}
            </h4>

            <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">
              {totalCollected === 0
                ? "Your food collection activities will appear here after you request food from donors."
                : "No collection records match your current search or status filter."}
            </p>

            {totalCollected > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 px-7 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition"
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="space-y-5">

            {filteredHistory.map((donation) => (

              <div
                key={donation.id}
                className="bg-white border border-green-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >

                <div className="flex flex-col md:flex-row md:items-start gap-5">

                  {/* FOOD IMAGE */}
                  <div className="w-full md:w-32 h-44 md:h-32 shrink-0 bg-green-50 rounded-2xl overflow-hidden">

                    {donation.foodImage ? (
                      <img
                        src={donation.foodImage}
                        alt={
                          donation.foodItems?.[0]?.name ||
                          "Food Donation"
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        🍱
                      </div>
                    )}

                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                      <div>

                        <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-xs font-bold">
                          {donation.category || "Food"}
                        </span>

                        <h4 className="mt-3 text-xl font-extrabold text-green-950">
                          {donation.foodItems?.[0]?.name ||
                            "Food Donation"}
                        </h4>

                        <p className="mt-2 text-sm text-gray-500">
                          Donated by{" "}
                          <span className="font-semibold text-gray-800">
                            {getDonorName(donation.donorId)}
                          </span>
                        </p>

                      </div>

                      <div className="shrink-0">
                        <StatusBadge status={donation.status} />
                      </div>

                    </div>

                    {/* INFORMATION */}
                    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

                      <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-400 font-semibold">
                          📦 Quantity
                        </p>

                        <p className="mt-2 text-sm font-bold text-gray-800">
                          {donation.totalQuantity || "Not specified"}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-400 font-semibold">
                          📍 Pickup Location
                        </p>

                        <p className="mt-2 text-sm font-bold text-gray-800 break-words">
                          {donation.pickupLocation || "Not specified"}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-400 font-semibold">
                          📅 Request / Posted Date
                        </p>

                        <p className="mt-2 text-sm font-bold text-gray-800">
                          {formatDate(donation.createdAt)}
                        </p>

                      </div>

                    </div>

                    {/* DISTRIBUTION INFORMATION */}
                    {donation.distribution && (

                      <div className="mt-5 bg-green-50 border border-green-100 rounded-2xl p-5">

                        <h5 className="font-bold text-green-900">
                          💚 Distribution Details
                        </h5>

                        <div className="mt-4 grid sm:grid-cols-3 gap-4">

                          <div>

                            <p className="text-xs text-gray-500">
                              Distribution Area
                            </p>

                            <p className="mt-1 text-sm font-bold text-green-800">
                              {donation.distribution.area ||
                                "Not specified"}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-gray-500">
                              People Helped
                            </p>

                            <p className="mt-1 text-sm font-bold text-green-800">
                              {donation.distribution.estimatedPeopleHelped ?? 0}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-gray-500">
                              Distribution Date
                            </p>

                            <p className="mt-1 text-sm font-bold text-green-800">
                              {formatDate(donation.distribution.date)}
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                    {/* DELIVERY DETAILS */}
                    {donation.status === "delivered" && (
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-700">
                        <span>✅</span>
                        <span>
                          Delivered: {formatDate(donation.deliveredAt)}
                        </span>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            ))}

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
              Understanding Your Statistics
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Total Food Collected counts all food requests
              associated with your NGO. Total Distributed
              counts completed deliveries. People Helped
              is calculated from the estimated beneficiaries
              recorded in your distribution logs.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NgoHistory;