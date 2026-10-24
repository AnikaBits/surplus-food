import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function MyCollections() {
  const {
    currentUser,
    donations = [],
    setDonations,
    users = [],
  } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [successMsg, setSuccessMsg] = useState("");

  // Existing collection status flow
  const statusFlow = [
    "approved",
    "picked_up",
    "on_the_way",
    "delivered",
  ];

  // All food requested by the current NGO
  const myCollections = donations.filter(
    (donation) => donation.requestedBy === currentUser?.id
  );

  // Statistics
  const totalCollections = myCollections.length;

  const pendingRequests = myCollections.filter(
    (donation) => donation.status === "requested"
  ).length;

  const approvedCollections = myCollections.filter(
    (donation) => donation.status === "approved"
  ).length;

  const completedCollections = myCollections.filter(
    (donation) => donation.status === "delivered"
  ).length;

  // Available statuses for filtering
  const statuses = [
    ...new Set(myCollections.map((donation) => donation.status)),
  ];

  function getDonorName(donorId) {
    const donor = users.find((user) => user.id === donorId);

    return donor ? donor.name : "Unknown Donor";
  }

  // Search and filter collections
  const filteredCollections = myCollections.filter((donation) => {
    const foodName = donation.foodItems?.[0]?.name || "";
    const donorName = getDonorName(donation.donorId);

    const searchText = search.toLowerCase();

    const matchesSearch =
      foodName.toLowerCase().includes(searchText) ||
      donorName.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Preserve existing collection update functionality
  function advanceStatus(donation) {
    const currentIndex = statusFlow.indexOf(donation.status);

    if (
      currentIndex === -1 ||
      currentIndex === statusFlow.length - 1
    ) {
      return;
    }

    const nextStatus = statusFlow[currentIndex + 1];

    const updates = {
      status: nextStatus,
    };

    if (nextStatus === "picked_up") {
      updates.pickedUpAt = new Date().toISOString();
    }

    if (nextStatus === "delivered") {
      updates.deliveredAt = new Date().toISOString();
    }

    setDonations((previousDonations) =>
      previousDonations.map((item) => {
        if (
          item.id !== donation.id ||
          item.requestedBy !== currentUser?.id ||
          item.status !== donation.status
        ) {
          return item;
        }

        return {
          ...item,
          ...updates,
        };
      })
    );

    setSuccessMsg(
      `${donation.foodItems?.[0]?.name || "Food"} status updated to ${formatStatus(
        nextStatus
      )}.`
    );
  }

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

    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function getProgress(status) {
    if (status === "requested") return 0;

    const index = statusFlow.indexOf(status);

    if (index === -1) return 0;

    return ((index + 1) / statusFlow.length) * 100;
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  const stats = [
    {
      title: "Total Collections",
      value: totalCollections,
      icon: "📦",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: "⏳",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Approved Collections",
      value: approvedCollections,
      icon: "🤝",
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Completed Deliveries",
      value: completedCollections,
      icon: "✅",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            📦 Collection Management
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            My Food Collections
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Manage your food requests, monitor donor approvals,
            track pickups, and keep your collection activities
            organized in one place.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">🌿</span>

            <div>
              <p className="text-xs text-green-100">
                Your Collection Activity
              </p>

              <p className="font-bold">
                {totalCollections} Total Collections
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

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

      {/* SUCCESS MESSAGE */}
      {successMsg && (
        <div
          role="status"
          className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start justify-between gap-4"
        >

          <div className="flex items-start gap-3">

            <span className="text-xl">✅</span>

            <div>
              <p className="font-bold text-green-800">
                Status Updated!
              </p>

              <p className="mt-1 text-sm text-green-700">
                {successMsg}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setSuccessMsg("")}
            className="text-green-700 font-bold"
            aria-label="Dismiss message"
          >
            ✕
          </button>

        </div>
      )}

      {/* SEARCH AND FILTER */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-7 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div>

            <h3 className="text-xl font-extrabold text-green-950">
              🔍 Find Collections
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search and filter your collection records
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
              htmlFor="collectionSearch"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Search Food or Donor
            </label>

            <input
              id="collectionSearch"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collections..."
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* STATUS FILTER */}
          <div>

            <label
              htmlFor="collectionStatus"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Collection Status
            </label>

            <select
              id="collectionStatus"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
              {filteredCollections.length}
            </span>
            {" "}of{" "}
            <span className="font-bold text-green-800">
              {totalCollections}
            </span>
            {" "}collections
          </p>

        </div>

      </div>

      {/* COLLECTION LIST */}
      {filteredCollections.length === 0 ? (

        <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto">
            📭
          </div>

          <h3 className="mt-6 text-2xl font-extrabold text-green-950">
            {totalCollections === 0
              ? "No Collections Yet"
              : "No Matching Collections"}
          </h3>

          <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">
            {totalCollections === 0
              ? "You haven't requested any food yet. Explore available food listings to get started."
              : "No collections match your current search or status filter."}
          </p>

          {totalCollections > 0 && (
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

        <div className="space-y-6">

          {filteredCollections.map((donation) => {
            const currentIndex = statusFlow.indexOf(
              donation.status
            );

            const canAdvance =
              currentIndex !== -1 &&
              currentIndex < statusFlow.length - 1;

            const nextStatus = canAdvance
              ? statusFlow[currentIndex + 1]
              : null;

            const progress = getProgress(donation.status);

            return (
              <div
                key={donation.id}
                className="bg-white border border-green-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >

                <div className="flex flex-col lg:flex-row">

                  {/* FOOD IMAGE */}
                  <div className="lg:w-64 shrink-0 bg-green-50">

                    {donation.foodImage ? (
                      <img
                        src={donation.foodImage}
                        alt={
                          donation.foodItems?.[0]?.name ||
                          "Food Donation"
                        }
                        className="w-full h-56 lg:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-56 lg:h-full min-h-56 flex items-center justify-center text-6xl">
                        🍱
                      </div>
                    )}

                  </div>

                  {/* COLLECTION DETAILS */}
                  <div className="flex-1 min-w-0 p-6 sm:p-7">

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                      <div className="min-w-0">

                        <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-xs font-bold">
                          {donation.category || "Food"}
                        </span>

                        <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-green-950 break-words">
                          {donation.foodItems?.[0]?.name ||
                            "Food Donation"}
                        </h3>

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

                    {/* FOOD INFORMATION */}
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">

                      <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-400 font-semibold">
                          📦 Food Quantity
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
                          ⏰ Pickup Time
                        </p>

                        <p className="mt-2 text-sm font-bold text-gray-800">
                          {donation.pickupTimeWindow || "Not specified"}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">

                        <p className="text-xs text-gray-400 font-semibold">
                          📅 Expiry Time
                        </p>

                        <p className="mt-2 text-sm font-bold text-gray-800">
                          {formatDate(donation.expiryTime)}
                        </p>

                      </div>

                    </div>

                    {/* COLLECTION PROGRESS */}
                    <div className="mt-7">

                      <div className="flex items-center justify-between gap-3">

                        <h4 className="text-sm font-bold text-green-950">
                          Collection Progress
                        </h4>

                        <span className="text-sm font-bold text-green-700">
                          {Math.round(progress)}%
                        </span>

                      </div>

                      <div
                        className="mt-3 w-full h-3 bg-gray-100 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Collection progress"
                      >

                        <div
                          className="h-full bg-gradient-to-r from-green-700 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />

                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">

                        <span>Approved</span>
                        <span>→</span>
                        <span>Picked Up</span>
                        <span>→</span>
                        <span>On the Way</span>
                        <span>→</span>
                        <span>Delivered</span>

                      </div>

                    </div>

                    {/* STATUS INFORMATION */}
                    {donation.status === "requested" && (

                      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

                        <p className="text-sm font-semibold text-yellow-800">
                          ⏳ Waiting for Donor Approval
                        </p>

                        <p className="mt-2 text-xs text-yellow-700 leading-6">
                          Your request has been submitted.
                          The donor needs to approve it
                          before collection can begin.
                        </p>

                      </div>

                    )}

                    {donation.status === "delivered" && (

                      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">

                        <p className="text-sm font-semibold text-green-800">
                          ✅ Delivery Completed
                        </p>

                        <p className="mt-2 text-xs text-green-700">
                          Delivered on:{" "}
                          {formatDate(donation.deliveredAt)}
                        </p>

                      </div>

                    )}

                    {/* ACTION BUTTON */}
                    {canAdvance && (

                      <div className="mt-6">

                        <button
                          type="button"
                          onClick={() => advanceStatus(donation)}
                          className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                        >
                          {nextStatus === "picked_up"
                            ? "📦 Mark as Picked Up"
                            : nextStatus === "on_the_way"
                            ? "🚚 Mark as On the Way"
                            : "✅ Mark as Delivered"}
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      )}

      {/* INFORMATION CARD */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💡
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              How Collection Tracking Works
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              After a donor approves your food request,
              you can update its collection status.
              Mark the food as picked up, then on the way,
              and finally delivered. Each update helps
              keep your collection records organized.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyCollections;