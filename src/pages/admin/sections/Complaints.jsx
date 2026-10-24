import { useState } from "react";

// Demo complaints only.
// No complaint submission form or backend is connected yet.
const dummyComplaints = [
  {
    id: 1,
    from: "Hope Foundation",
    subject: "Food quality issue",
    status: "open",
    date: "2026-09-19",
  },
  {
    id: 2,
    from: "Rahim Uddin",
    subject: "Volunteer did not show up",
    status: "resolved",
    date: "2026-09-17",
  },
];

function Complaints() {
  const [complaints, setComplaints] = useState(dummyComplaints);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ==========================================
  // EXISTING RESOLVE FUNCTIONALITY
  // ==========================================

  function resolveComplaint(id) {
    setComplaints((previousComplaints) =>
      previousComplaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: "resolved" }
          : complaint
      )
    );
  }

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalComplaints = complaints.length;

  const openComplaints = complaints.filter(
    (complaint) => complaint.status === "open"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "resolved"
  ).length;

  // ==========================================
  // SEARCH AND FILTER
  // ==========================================

  const filteredComplaints = complaints.filter((complaint) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchText) ||
      complaint.from.toLowerCase().includes(searchText) ||
      String(complaint.id).includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  // ==========================================
  // DATE FORMAT
  // ==========================================

  function formatDate(date) {
    if (!date) return "—";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // ==========================================
  // STATISTICS CARDS
  // ==========================================

  const stats = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      icon: "📋",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Open Complaints",
      value: openComplaints,
      icon: "⚠️",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Resolved Complaints",
      value: resolvedComplaints,
      icon: "✅",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
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
            🛡️ Community Safety Center
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Complaints & Reports
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Review reported issues, monitor complaint
            statuses, and manage community concerns
            to help maintain a safe and reliable
            FoodShare platform.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              💚
            </span>

            <div>

              <p className="text-xs text-green-100">
                Community Reports
              </p>

              <p className="font-bold">
                {totalComplaints} Total Complaints
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

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

      {/* ======================================
          COMPLAINT MANAGEMENT
      ====================================== */}

      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* SECTION HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              📋 Complaint Records
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search, review, and resolve reported issues.
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold">
            {filteredComplaints.length} Reports Found
          </span>

        </div>

        {/* ======================================
            SEARCH AND FILTER
        ====================================== */}

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
              placeholder="Search by subject, reporter or ID..."
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
              All Complaints
            </option>

            <option value="open">
              Open Complaints
            </option>

            <option value="resolved">
              Resolved Complaints
            </option>

          </select>

        </div>

        {/* ======================================
            COMPLAINT LIST
        ====================================== */}

        {filteredComplaints.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-10 sm:p-14 text-center">

            <div className="text-5xl mb-5">
              🔍
            </div>

            <h4 className="text-xl font-extrabold text-green-900">
              No Complaints Found
            </h4>

            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-7">
              No complaint records match your
              current search or selected filter.
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

          <div className="space-y-5">

            {filteredComplaints.map((complaint) => {

              const isResolved =
                complaint.status === "resolved";

              return (

                <div
                  key={complaint.id}
                  className="group bg-white border border-gray-200 hover:border-green-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-all duration-300"
                >

                  {/* TOP SECTION */}

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                    {/* COMPLAINT DETAILS */}

                    <div className="flex items-start gap-4 min-w-0">

                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                          isResolved
                            ? "bg-green-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {isResolved ? "✅" : "⚠️"}
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                            Report #{complaint.id}
                          </span>

                          <span
                            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                              isResolved
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {isResolved
                              ? "✓ Resolved"
                              : "● Open"}
                          </span>

                        </div>

                        <h4 className="mt-4 text-lg sm:text-xl font-extrabold text-green-950 break-words">
                          {complaint.subject}
                        </h4>

                        <p className="mt-2 text-sm text-gray-500 leading-6">
                          {isResolved
                            ? "This complaint has been marked as resolved."
                            : "This complaint is awaiting review or resolution."}
                        </p>

                      </div>

                    </div>

                    {/* RESOLVE BUTTON */}

                    <div className="shrink-0">

                      {!isResolved ? (

                        <button
                          type="button"
                          onClick={() =>
                            resolveComplaint(complaint.id)
                          }
                          className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-700 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition shadow-sm"
                        >
                          ✓ Mark as Resolved
                        </button>

                      ) : (

                        <span className="inline-flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold">
                          ✓ Complaint Resolved
                        </span>

                      )}

                    </div>

                  </div>

                  {/* DIVIDER */}

                  <div className="border-t border-gray-100 my-6" />

                  {/* BOTTOM INFORMATION */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* REPORTED BY */}

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                        👤
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold text-gray-400">
                          Reported By
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800 break-words">
                          {complaint.from}
                        </p>

                      </div>

                    </div>

                    {/* DATE */}

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                        📅
                      </div>

                      <div>

                        <p className="text-xs font-semibold text-gray-400">
                          Report Date
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {formatDate(complaint.date)}
                        </p>

                      </div>

                    </div>

                    {/* STATUS */}

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg shrink-0">
                        🛡️
                      </div>

                      <div>

                        <p className="text-xs font-semibold text-gray-400">
                          Current Status
                        </p>

                        <p
                          className={`mt-1 text-sm font-bold ${
                            isResolved
                              ? "text-green-700"
                              : "text-orange-700"
                          }`}
                        >
                          {isResolved ? "Resolved" : "Open"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

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
              Complaint Management Guidelines
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Admins can review complaint records,
              search reports, filter by status,
              and mark open complaints as resolved.
              Resolved complaints remain visible
              for monitoring purposes.
            </p>

            <p className="mt-3 text-xs text-gray-500 leading-6">
              Demo Mode: Complaint records are currently
              stored in local component state. Changes
              are not saved to a backend and will reset
              when the page is refreshed or this
              component is remounted.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Complaints;