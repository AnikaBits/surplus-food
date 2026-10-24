import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function AvailableFoodTab() {
  const {
    currentUser,
    donations = [],
    setDonations,
    users = [],
  } = useAuth();

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [successMsg, setSuccessMsg] = useState("");

  // All available food donations
  const allAvailableFood = donations.filter(
    (donation) => donation.status === "available"
  );

  // Dynamic food categories
  const categories = [
    ...new Set(
      allAvailableFood
        .map((donation) => donation.category)
        .filter(Boolean)
    ),
  ];

  // Search and filter available food
  const availableFood = allAvailableFood.filter((donation) => {
    const foodName = donation.foodItems?.[0]?.name || "";
    const location = donation.pickupLocation || "";
    const category = donation.category || "";

    const matchesSearch = foodName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation = location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      category === categoryFilter;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory
    );
  });

  function getDonorName(donorId) {
    const donor = users.find((user) => user.id === donorId);

    return donor ? donor.name : "Unknown Donor";
  }

  // Preserve existing request functionality
  function handleRequest(donationId) {
    if (!currentUser?.id) return;

    const donation = donations.find(
      (item) => item.id === donationId
    );

    if (!donation || donation.status !== "available") {
      return;
    }

    setDonations((previousDonations) =>
      previousDonations.map((item) =>
        item.id === donationId && item.status === "available"
          ? {
              ...item,
              status: "requested",
              requestedBy: currentUser.id,
            }
          : item
      )
    );

    setSuccessMsg(
      "Food request submitted successfully! Waiting for donor approval."
    );
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

  function clearFilters() {
    setSearch("");
    setLocationFilter("");
    setCategoryFilter("all");
  }

  const inputStyle =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all";

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            🍱 Food Discovery
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Explore Available Food
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Discover surplus food shared by generous donors.
            Browse available listings, find suitable food,
            and send requests to support your community.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">🥗</span>

            <div>
              <p className="text-xs text-green-100">
                Currently Available
              </p>

              <p className="font-bold">
                {allAvailableFood.length} Food Listings
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid sm:grid-cols-3 gap-5">

        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
            🍱
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Total Available Food
          </p>

          <h3 className="mt-2 text-3xl font-extrabold text-green-800">
            {allAvailableFood.length}
          </h3>

        </div>

        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
            🥗
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Food Categories
          </p>

          <h3 className="mt-2 text-3xl font-extrabold text-emerald-700">
            {categories.length}
          </h3>

        </div>

        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
            🔍
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Matching Listings
          </p>

          <h3 className="mt-2 text-3xl font-extrabold text-blue-700">
            {availableFood.length}
          </h3>

        </div>

      </div>

      {/* SUCCESS MESSAGE */}
      {successMsg && (
        <div
          role="status"
          className="flex items-start justify-between gap-4 bg-green-50 border border-green-200 rounded-2xl p-5"
        >

          <div className="flex items-start gap-3">

            <span className="text-xl">✅</span>

            <div>
              <p className="font-bold text-green-800">
                Request Submitted!
              </p>

              <p className="mt-1 text-sm text-green-700">
                {successMsg}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setSuccessMsg("")}
            className="text-green-700 hover:text-green-900 font-bold"
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
              🔍 Find Food
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search and filter available food listings
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

        <div className="grid md:grid-cols-3 gap-5">

          {/* SEARCH BY FOOD NAME */}
          <div>

            <label
              htmlFor="foodSearch"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Food Name
            </label>

            <input
              id="foodSearch"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food..."
              className={inputStyle}
            />

          </div>

          {/* LOCATION FILTER */}
          <div>

            <label
              htmlFor="foodLocation"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Pickup Location
            </label>

            <input
              id="foodLocation"
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Search location..."
              className={inputStyle}
            />

          </div>

          {/* CATEGORY FILTER */}
          <div>

            <label
              htmlFor="foodCategory"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Food Category
            </label>

            <select
              id="foodCategory"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={inputStyle}
            >

              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-green-800">
              {availableFood.length}
            </span>
            {" "}of{" "}
            <span className="font-bold text-green-800">
              {allAvailableFood.length}
            </span>
            {" "}available listings
          </p>

        </div>

      </div>

      {/* FOOD LISTINGS */}
      {availableFood.length === 0 ? (

        <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto">
            📭
          </div>

          <h3 className="mt-6 text-2xl font-extrabold text-green-950">
            {allAvailableFood.length === 0
              ? "No Available Food Right Now"
              : "No Matching Food Found"}
          </h3>

          <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">
            {allAvailableFood.length === 0
              ? "There are currently no available food listings. Please check again later for new donations."
              : "No food listings match your search or filters. Try changing your search criteria."}
          </p>

          {allAvailableFood.length > 0 && (
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

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {availableFood.map((donation) => (

            <div
              key={donation.id}
              className="bg-white border border-green-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >

              {/* FOOD IMAGE */}
              <div className="relative h-52 overflow-hidden bg-green-50">

                {donation.foodImage ? (
                  <img
                    src={donation.foodImage}
                    alt={donation.foodItems?.[0]?.name || "Food"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🍱
                  </div>
                )}

                <div className="absolute top-4 left-4">

                  <span className="inline-block px-3 py-1.5 bg-white/95 rounded-full text-xs font-bold text-green-800 shadow-sm">
                    {donation.category || "Food"}
                  </span>

                </div>

              </div>

              {/* FOOD DETAILS */}
              <div className="p-6 flex-1 flex flex-col">

                <div className="flex items-start justify-between gap-3">

                  <h3 className="text-xl font-extrabold text-green-950 break-words">
                    {donation.foodItems?.[0]?.name || "Food Donation"}
                  </h3>

                  <StatusBadge status={donation.status} />

                </div>

                {/* DONOR */}
                <div className="mt-4 flex items-center gap-3">

                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                    👤
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400">
                      Donated By
                    </p>

                    <p className="text-sm font-bold text-gray-800 truncate">
                      {getDonorName(donation.donorId)}
                    </p>

                  </div>

                </div>

                {/* DETAILS */}
                <div className="mt-5 space-y-3">

                  <div className="flex items-start gap-3 text-sm">

                    <span className="text-lg">📦</span>

                    <div>
                      <p className="text-xs text-gray-400">
                        Available Quantity
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {donation.totalQuantity || "Not specified"}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3 text-sm">

                    <span className="text-lg">📍</span>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">
                        Pickup Location
                      </p>

                      <p className="mt-1 font-semibold text-gray-800 break-words">
                        {donation.pickupLocation || "Not specified"}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3 text-sm">

                    <span className="text-lg">⏰</span>

                    <div>
                      <p className="text-xs text-gray-400">
                        Food Expiry
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {formatDate(donation.expiryTime)}
                      </p>
                    </div>

                  </div>

                </div>

                {/* DESCRIPTION */}
                {donation.description && (
                  <div className="mt-5 bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-400 font-semibold">
                      Description
                    </p>

                    <p className="mt-2 text-sm text-gray-600 leading-6">
                      {donation.description}
                    </p>

                  </div>
                )}

                {/* REQUEST BUTTON */}
                <div className="mt-auto pt-6">

                  <button
                    type="button"
                    onClick={() => handleRequest(donation.id)}
                    className="w-full py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    🤝 Request Food →
                  </button>

                </div>

              </div>

            </div>

          ))}

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
              How Food Requests Work
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Select an available food listing and click
              Request Food. Your request will be sent to
              the donor for approval. Once approved,
              you can continue the collection process
              through your dashboard.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AvailableFoodTab;