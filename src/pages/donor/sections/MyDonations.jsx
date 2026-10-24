import { useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600";

function MyDonations() {
  const { currentUser, donations = [], users = [] } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get donations belonging to the logged-in donor
  const myDonations = useMemo(() => {
    return donations.filter(
      (donation) => donation.donorId === currentUser?.id
    );
  }, [donations, currentUser?.id]);

  // Get NGO name
  function getNgoName(ngoId) {
    if (!ngoId) return null;

    const ngo = users.find((user) => user.id === ngoId);

    return ngo ? ngo.name : "Unknown NGO";
  }

  // Search and filter donations
  const filteredDonations = useMemo(() => {
    return myDonations.filter((donation) => {
      const foodName =
        donation.foodItems?.[0]?.name || "";

      const matchesSearch = foodName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        donation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [myDonations, search, statusFilter]);

  // Calculate statistics
  const totalDonations = myDonations.length;

  const availableDonations = myDonations.filter(
    (donation) => donation.status === "available"
  ).length;

  const claimedDonations = myDonations.filter(
    (donation) => Boolean(donation.requestedBy)
  ).length;

  // Get unique statuses from existing donation data
  const availableStatuses = [
    ...new Set(
      myDonations
        .map((donation) => donation.status)
        .filter(Boolean)
    ),
  ];

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

  return (
    <div className="w-full space-y-8">

      {/* HEADER SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        {/* Decoration */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            📦 Donation Management
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            My Food Donations
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            View and track all the food donations you have
            shared with the FoodShare community.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">💚</span>

            <div>
              <p className="text-xs text-green-100">
                Your Contributions
              </p>

              <p className="font-bold">
                {totalDonations} Total Donations
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid sm:grid-cols-3 gap-5">

        {/* TOTAL */}
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

          <div className="flex items-center justify-between">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              🍱
            </div>

            <span className="text-green-500 text-xl">↗</span>

          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Total Donations
          </p>

          <h3 className="mt-2 text-4xl font-extrabold text-green-800">
            {totalDonations}
          </h3>

        </div>

        {/* AVAILABLE */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

          <div className="flex items-center justify-between">

            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
              🌱
            </div>

            <span className="text-emerald-500 text-xl">↗</span>

          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Available Donations
          </p>

          <h3 className="mt-2 text-4xl font-extrabold text-emerald-700">
            {availableDonations}
          </h3>

        </div>

        {/* CLAIMED */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

          <div className="flex items-center justify-between">

            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              🤝
            </div>

            <span className="text-orange-500 text-xl">↗</span>

          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Claimed Donations
          </p>

          <h3 className="mt-2 text-4xl font-extrabold text-orange-600">
            {claimedDonations}
          </h3>

        </div>

      </div>

      {/* SEARCH AND FILTER */}
      <div className="bg-white border border-green-100 rounded-2xl p-5 sm:p-6 shadow-sm">

        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}
          <div className="flex-1">

            <label
              htmlFor="donationSearch"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Search Donations
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                id="donationSearch"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by food name..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              />

            </div>

          </div>

          {/* Status Filter */}
          <div className="w-full md:w-60">

            <label
              htmlFor="donationStatus"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Filter by Status
            </label>

            <select
              id="donationStatus"
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

        {/* Results */}
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

      {/* DONATION LIST */}
      {filteredDonations.length === 0 ? (

        /* EMPTY STATE */
        <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto">
            📦
          </div>

          <h3 className="mt-7 text-2xl font-extrabold text-green-950">

            {totalDonations === 0
              ? "No Donations Yet"
              : "No Matching Donations"}

          </h3>

          <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">

            {totalDonations === 0
              ? "You haven't posted any food donations yet. Start sharing surplus food to make a difference."
              : "We couldn't find any donations matching your search or selected status."}

          </p>

          {totalDonations > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="mt-7 px-7 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-all"
            >
              Clear Filters
            </button>
          )}

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

          {filteredDonations.map((donation) => (

            <div
              key={donation.id}
              className="group bg-white border border-green-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* FOOD IMAGE */}
              <div className="relative h-52 overflow-hidden bg-gray-100">

                <img
                  src={donation.foodImage || fallbackImage}
                  alt={donation.foodItems?.[0]?.name || "Food Donation"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* CATEGORY */}
                {donation.category && (
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-green-800 shadow-sm">
                    {donation.category}
                  </span>
                )}

              </div>

              {/* CARD CONTENT */}
              <div className="p-6">

                {/* TITLE + STATUS */}
                <div className="flex items-start justify-between gap-3">

                  <h3 className="text-lg font-extrabold text-green-950 leading-snug">
                    {donation.foodItems?.[0]?.name || "Food Donation"}
                  </h3>

                  <div className="shrink-0">
                    <StatusBadge status={donation.status} />
                  </div>

                </div>

                {/* DETAILS */}
                <div className="mt-6 space-y-4">

                  {/* QUANTITY */}
                  <div className="flex items-start gap-3">

                    <div className="w-10 h-10 shrink-0 bg-green-50 rounded-xl flex items-center justify-center text-lg">
                      🍱
                    </div>

                    <div>

                      <p className="text-xs text-gray-400">
                        Quantity
                      </p>

                      <p className="text-sm font-semibold text-gray-700 mt-1">
                        {donation.totalQuantity || "Not specified"}
                      </p>

                    </div>

                  </div>

                  {/* PICKUP */}
                  <div className="flex items-start gap-3">

                    <div className="w-10 h-10 shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">
                      📍
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-400">
                        Pickup Location
                      </p>

                      <p className="text-sm font-semibold text-gray-700 mt-1 break-words">
                        {donation.pickupLocation || "Not specified"}
                      </p>

                    </div>

                  </div>

                  {/* EXPIRY */}
                  {donation.expiryTime && (
                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-lg">
                        ⏰
                      </div>

                      <div>

                        <p className="text-xs text-gray-400">
                          Expiry Time
                        </p>

                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          {donation.expiryTime}
                        </p>

                      </div>

                    </div>
                  )}

                </div>

                {/* NGO INFORMATION */}
                {donation.requestedBy && (
                  <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-4">

                    <p className="text-xs text-green-600 font-semibold">
                      🤝 Claimed By
                    </p>

                    <p className="mt-2 text-sm font-bold text-green-900">
                      {getNgoName(donation.requestedBy)}
                    </p>

                  </div>
                )}

                {/* FOOTER */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between gap-3">

                  <div>

                    <p className="text-xs text-gray-400">
                      Posted On
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {formatDate(donation.createdAt)}
                    </p>

                  </div>

                  <span className="inline-flex items-center gap-1 text-green-700 text-xs font-bold">
                    💚 FoodShare
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyDonations;