import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function DonorRequests() {
  const {
    currentUser,
    donations = [],
    setDonations,
    users = [],
  } = useAuth();

  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Only requested donations belonging to the current donor
  const pendingRequests = donations.filter(
    (donation) =>
      donation.donorId === currentUser?.id &&
      donation.status === "requested"
  );

  // Search requests by food name or NGO name
  const filteredRequests = pendingRequests.filter((donation) => {
    const foodName = donation.foodItems?.[0]?.name || "";
    const ngoName = getNgoName(donation.requestedBy);

    const query = search.toLowerCase();

    return (
      foodName.toLowerCase().includes(query) ||
      ngoName.toLowerCase().includes(query)
    );
  });

  function getNgoName(ngoId) {
    if (!ngoId) return "Unknown NGO";

    const ngo = users.find((user) => user.id === ngoId);

    return ngo ? ngo.name : "Unknown NGO";
  }

  function handleApprove(donationId) {
    setDonations(
      donations.map((donation) =>
        donation.id === donationId
          ? { ...donation, status: "approved" }
          : donation
      )
    );

    setSuccessMsg("Food request approved successfully!");
  }

  function handleReject(donationId) {
    setDonations(
      donations.map((donation) =>
        donation.id === donationId
          ? {
              ...donation,
              status: "available",
              requestedBy: null,
            }
          : donation
      )
    );

    setSuccessMsg("Food request rejected successfully!");
  }

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            📩 Request Management
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Incoming Food Requests
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Review food donation requests from NGOs and volunteers.
            Approve requests to move forward with your donation,
            or reject them to make the food available again.
          </p>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid sm:grid-cols-2 gap-5">

        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              📩
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Pending Requests
              </p>

              <h3 className="mt-1 text-3xl font-extrabold text-green-900">
                {pendingRequests.length}
              </h3>
            </div>

          </div>

        </div>

        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              🤝
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Requests Displayed
              </p>

              <h3 className="mt-1 text-3xl font-extrabold text-green-900">
                {filteredRequests.length}
              </h3>
            </div>

          </div>

        </div>

      </div>

      {/* SUCCESS MESSAGE */}
      {successMsg && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4"
        >
          <p className="text-sm font-semibold">
            ✅ {successMsg}
          </p>

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

      {/* SEARCH */}
      <div className="bg-white border border-green-100 rounded-2xl p-5 sm:p-6 shadow-sm">

        <label
          htmlFor="requestSearch"
          className="block text-sm font-semibold text-gray-700 mb-3"
        >
          Search Incoming Requests
        </label>

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            id="requestSearch"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by food name or NGO name..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
          />

        </div>

      </div>

      {/* REQUEST LIST */}
      {filteredRequests.length === 0 ? (

        <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto">
            📭
          </div>

          <h3 className="mt-6 text-2xl font-extrabold text-green-950">
            {pendingRequests.length === 0
              ? "No Pending Requests"
              : "No Matching Requests"}
          </h3>

          <p className="mt-4 text-gray-500 max-w-md mx-auto leading-7">
            {pendingRequests.length === 0
              ? "You don't have any pending food requests right now. New requests from NGOs or volunteers will appear here."
              : "No requests match your search. Try searching with another food or NGO name."}
          </p>

          {pendingRequests.length > 0 && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-6 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition"
            >
              Clear Search
            </button>
          )}

        </div>

      ) : (

        <div className="grid xl:grid-cols-2 gap-6">

          {filteredRequests.map((donation) => (

            <div
              key={donation.id}
              className="bg-white border border-green-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300"
            >

              {/* FOOD HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                <div className="w-16 h-16 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                  🍱
                </div>

                <div className="flex-1 min-w-0">

                  <h3 className="text-xl font-extrabold text-green-950 break-words">
                    {donation.foodItems?.[0]?.name || "Food Donation"}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Food Donation Request
                  </p>

                  <div className="mt-3">
                    <StatusBadge status={donation.status} />
                  </div>

                </div>

              </div>

              {/* FOOD DETAILS */}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-xs text-gray-400 font-medium">
                    🍽️ Quantity
                  </p>

                  <p className="mt-2 text-sm font-bold text-gray-800">
                    {donation.totalQuantity || "Not specified"}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-xs text-gray-400 font-medium">
                    🥗 Category
                  </p>

                  <p className="mt-2 text-sm font-bold text-gray-800">
                    {donation.category || "Not specified"}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4 sm:col-span-2">

                  <p className="text-xs text-gray-400 font-medium">
                    📍 Pickup Location
                  </p>

                  <p className="mt-2 text-sm font-bold text-gray-800 break-words">
                    {donation.pickupLocation || "Not specified"}
                  </p>

                </div>

              </div>

              {/* NGO INFORMATION */}
              <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-2xl">
                    🤝
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-green-700 font-medium">
                      Requested By
                    </p>

                    <p className="mt-1 text-base font-bold text-green-950 break-words">
                      {getNgoName(donation.requestedBy)}
                    </p>

                  </div>

                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-7 pt-6 border-t border-gray-100">

                <p className="text-xs text-gray-400 mb-4">
                  Review this request and choose an action.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    type="button"
                    onClick={() => handleApprove(donation.id)}
                    className="flex-1 px-5 py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    ✓ Approve Request
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReject(donation.id)}
                    className="flex-1 px-5 py-3.5 bg-red-50 border border-red-100 text-red-700 font-bold rounded-xl hover:bg-red-100 transition-all duration-300"
                  >
                    ✕ Reject Request
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* INFORMATION CARD */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">💡</span>

          <div>

            <h3 className="font-bold text-amber-900">
              Important Information
            </h3>

            <p className="mt-2 text-sm text-amber-800 leading-7">
              Approving a request changes its status to approved.
              Rejecting a request makes the donation available
              again so another NGO or volunteer can request it.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DonorRequests;