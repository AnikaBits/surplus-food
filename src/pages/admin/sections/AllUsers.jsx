import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function AllUsers() {
  const { users = [], toggleBlockUser } = useAuth();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Exclude admin accounts
  const nonAdminUsers = users.filter(
    (user) => user.role !== "admin"
  );

  // Statistics
  const totalUsers = nonAdminUsers.length;

  const totalDonors = nonAdminUsers.filter(
    (user) => user.role === "donor"
  ).length;

  const totalNGOs = nonAdminUsers.filter(
    (user) => user.role === "ngo"
  ).length;

  const blockedUsers = nonAdminUsers.filter(
    (user) => user.status === "blocked"
  ).length;

  // Search and filter
  const filteredUsers = nonAdminUsers.filter((user) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      (user.name || "")
        .toLowerCase()
        .includes(searchText) ||
      (user.email || "")
        .toLowerCase()
        .includes(searchText);

    const matchesRole =
      roleFilter === "all" ||
      user.role === roleFilter;

    const matchesStatus =
      statusFilter === "all" ||
      user.status === statusFilter;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });

  function getRoleLabel(user) {
    if (user.role === "donor") {
      return user.donorType
        ? `Donor (${user.donorType})`
        : "Food Donor";
    }

    if (user.role === "ngo") {
      return "NGO / Volunteer";
    }

    return user.role || "Unknown";
  }

  function handleToggleBlock(userId) {
    toggleBlockUser(userId);
  }

  function clearFilters() {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
  }

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: "👥",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Food Donors",
      value: totalDonors,
      icon: "🍱",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "NGO / Volunteers",
      value: totalNGOs,
      icon: "🏢",
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: "🔒",
      bg: "bg-red-100",
      color: "text-red-700",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            👥 User Management Center
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            All Users
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            View registered users, monitor account
            statuses, and manage access to the
            FoodShare platform.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              🌍
            </span>

            <div>

              <p className="text-xs text-green-100">
                Registered Community
              </p>

              <p className="font-bold">
                {totalUsers} Total Users
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

      {/* USERS MANAGEMENT */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              📋 Registered Users
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search, filter, and manage user accounts
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold">
            {filteredUsers.length} Users Found
          </span>

        </div>

        {/* SEARCH AND FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-7">

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
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* ROLE FILTER */}
          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value)
            }
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
          >
            <option value="all">All Roles</option>
            <option value="donor">Food Donors</option>
            <option value="ngo">NGO / Volunteers</option>
          </select>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="blocked">Blocked</option>
          </select>

        </div>

        {/* USERS TABLE */}
        {filteredUsers.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-10 sm:p-14 text-center">

            <div className="text-5xl mb-5">
              🔍
            </div>

            <h4 className="text-xl font-extrabold text-green-900">
              No Users Found
            </h4>

            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-7">
              No registered users match your
              search or selected filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="overflow-x-auto rounded-2xl border border-green-100">

            <table className="w-full min-w-[800px] text-sm">

              {/* TABLE HEADER */}
              <thead className="bg-green-50 text-green-900">

                <tr>

                  <th className="px-6 py-5 text-left font-bold">
                    User
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Role
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Email
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Status
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Action
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-gray-100">

                {filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="hover:bg-green-50/50 transition"
                  >

                    {/* USER */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 bg-green-100 rounded-full overflow-hidden flex items-center justify-center shrink-0">

                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name || "User"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl">
                              👤
                            </span>
                          )}

                        </div>

                        <div>

                          <p className="font-bold text-green-950">
                            {user.name || "Unnamed User"}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            FoodShare Member
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-5">

                      <span className="inline-flex px-3 py-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold">
                        {getRoleLabel(user)}
                      </span>

                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-5 text-gray-600">

                      <span className="break-all">
                        {user.email || "Not provided"}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">

                      <StatusBadge status={user.status} />

                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-5">

                      {user.status !== "pending" ? (

                        <button
                          type="button"
                          onClick={() =>
                            handleToggleBlock(user.id)
                          }
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                            user.status === "blocked"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >

                          {user.status === "blocked"
                            ? "🔓 Unblock"
                            : "🔒 Block"}

                        </button>

                      ) : (

                        <span className="text-xs text-gray-400 font-medium">
                          Awaiting Approval
                        </span>

                      )}

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
              User Management Guidelines
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Admins can monitor registered donors
              and NGO accounts, review their statuses,
              and block or unblock accounts when needed.
              Pending registrations must be reviewed
              through the Pending Approvals section.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AllUsers;