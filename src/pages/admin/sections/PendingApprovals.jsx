import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function PendingApprovals() {
  const { users = [], approveUser, rejectUser } = useAuth();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Pending users
  const pendingUsers = users.filter(
    (user) => user.status === "pending"
  );

  // Statistics
  const totalPending = pendingUsers.length;

  const pendingDonors = pendingUsers.filter(
    (user) => user.role === "donor"
  ).length;

  const pendingNGOs = pendingUsers.filter(
    (user) => user.role === "ngo"
  ).length;

  // Search and filter
  const filteredUsers = pendingUsers.filter((user) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      (user.name || "").toLowerCase().includes(searchText) ||
      (user.email || "").toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "all" ||
      (filter === "donor" && user.role === "donor") ||
      (filter === "ngo" && user.role !== "donor");

    return matchesSearch && matchesFilter;
  });

  function getRoleLabel(user) {
    if (user.role === "donor") {
      return user.donorType
        ? `Donor (${user.donorType})`
        : "Food Donor";
    }

    return "NGO / Volunteer";
  }

  function handleApprove(userId) {
    approveUser(userId);
  }

  function handleReject(userId) {
    rejectUser(userId);
  }

  const stats = [
    {
      title: "Total Pending",
      value: totalPending,
      icon: "⏳",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Pending Donors",
      value: pendingDonors,
      icon: "🍱",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Pending NGOs",
      value: pendingNGOs,
      icon: "🏢",
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
            🛡️ Admin Verification Center
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Pending Approvals
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Review new account registrations and manage
            approval requests to maintain a safe and
            trusted FoodShare community.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              📋
            </span>

            <div>

              <p className="text-xs text-green-100">
                Awaiting Review
              </p>

              <p className="font-bold">
                {totalPending} Pending Registration
                {totalPending !== 1 ? "s" : ""}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

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

      {/* APPROVAL MANAGEMENT */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* SECTION TITLE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              👥 Registration Requests
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Review and manage new user registrations
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-bold">
            {filteredUsers.length} Requests
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* FILTER */}
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
          >
            <option value="all">All Registrations</option>
            <option value="donor">Food Donors</option>
            <option value="ngo">NGO / Volunteers</option>
          </select>

        </div>

        {/* EMPTY STATE */}
        {filteredUsers.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-10 sm:p-14 text-center">

            <div className="text-5xl mb-5">
              {pendingUsers.length === 0 ? "🎉" : "🔍"}
            </div>

            <h4 className="text-xl font-extrabold text-green-900">
              {pendingUsers.length === 0
                ? "All Caught Up!"
                : "No Matching Registrations"}
            </h4>

            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-7">

              {pendingUsers.length === 0
                ? "There are no pending registration requests right now. New requests will appear here."
                : "No pending users match your search or selected filter."}

            </p>

            {pendingUsers.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
                className="mt-6 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition"
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="space-y-5">

            {filteredUsers.map((user) => (

              <div
                key={user.id}
                className="border border-green-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
              >

                {/* USER HEADER */}
                <div className="bg-gradient-to-r from-green-50 to-white px-5 sm:px-6 py-5">

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    {/* AVATAR */}
                    <div className="w-16 h-16 rounded-2xl bg-green-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">

                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">
                          {user.role === "donor" ? "👤" : "🏢"}
                        </span>
                      )}

                    </div>

                    {/* USER NAME */}
                    <div className="flex-1 min-w-0">

                      <h4 className="text-lg sm:text-xl font-extrabold text-green-950 break-words">
                        {user.name || "Unnamed User"}
                      </h4>

                      <p className="mt-2 text-sm text-gray-500 break-all">
                        📧 {user.email || "No email provided"}
                      </p>

                    </div>

                    {/* STATUS BADGE */}
                    <span className="self-start inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      ⏳ Pending Review
                    </span>

                  </div>

                </div>

                {/* USER DETAILS */}
                <div className="px-5 sm:px-6 py-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                    {/* ROLE */}
                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-gray-400">
                        Account Type
                      </p>

                      <p className="mt-2 font-bold text-green-900 break-words">
                        {getRoleLabel(user)}
                      </p>

                    </div>

                    {/* PHONE */}
                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs font-semibold text-gray-400">
                        Phone Number
                      </p>

                      <p className="mt-2 font-bold text-gray-800 break-words">
                        {user.phone || "Not provided"}
                      </p>

                    </div>

                    {/* ADDRESS */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">

                      <p className="text-xs font-semibold text-gray-400">
                        Address
                      </p>

                      <p className="mt-2 font-bold text-gray-800 break-words">
                        {user.address || "Not provided"}
                      </p>

                    </div>

                    {/* TRACED LOCATION */}
                    {user.osmId && (

                      <div className="bg-green-50 border border-green-100 rounded-xl p-4 sm:col-span-2">

                        <p className="text-xs font-semibold text-gray-400">
                          Restaurant Location
                        </p>

                        <p className="mt-2 font-bold text-green-800">
                          ✓ Traced on OpenStreetMap
                        </p>

                        <a
                          href={`https://www.openstreetmap.org/?mlat=${user.lat}&mlon=${user.lng}#map=18/${user.lat}/${user.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-sm font-bold text-green-700 hover:text-green-900 hover:underline transition"
                        >
                          📍 View location on map →
                        </a>

                      </div>

                    )}

                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-100">

                    <button
                      type="button"
                      onClick={() => handleApprove(user.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300"
                    >
                      <span>✓</span>
                      Approve Registration
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(user.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-red-50 text-red-700 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition"
                    >
                      <span>✕</span>
                      Reject Registration
                    </button>

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
              Registration Approval Guidelines
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Review each user's registration details
              before making a decision. Approved users
              can access the platform according to their
              assigned roles. Rejected registrations
              are handled by the existing account
              management system.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PendingApprovals;
