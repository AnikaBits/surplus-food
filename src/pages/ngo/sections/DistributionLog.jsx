import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function DistributionLog() {
  const {
    currentUser,
    donations = [],
    setDonations,
  } = useAuth();

  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Delivered food waiting for distribution details
  const readyToLog = donations.filter(
    (d) =>
      d.requestedBy === currentUser?.id &&
      d.status === "delivered" &&
      !d.distribution
  );

  // Already saved distribution records
  const alreadyLogged = donations.filter(
    (d) =>
      d.requestedBy === currentUser?.id &&
      d.distribution
  );

  // Statistics
  const totalDistributions = alreadyLogged.length;

  const pendingLogs = readyToLog.length;

  const totalPeopleHelped = alreadyLogged.reduce(
    (total, donation) =>
      total +
      (Number(donation.distribution?.estimatedPeopleHelped) || 0),
    0
  );

  // Search logged records
  const filteredLogs = alreadyLogged.filter((donation) => {
    const foodName = donation.foodItems?.[0]?.name || "";
    const area = donation.distribution?.area || "";

    const searchText = search.toLowerCase();

    return (
      foodName.toLowerCase().includes(searchText) ||
      area.toLowerCase().includes(searchText)
    );
  });

  function handleChange(donationId, field, value) {
    setFormData((previous) => ({
      ...previous,
      [donationId]: {
        ...previous[donationId],
        [field]: value,
      },
    }));
  }

  function handleSubmit(donationId) {
    const data = formData[donationId];

    const area = data?.area?.trim();
    const peopleHelped = Number(data?.estimatedPeopleHelped);

    if (
      !area ||
      !Number.isInteger(peopleHelped) ||
      peopleHelped <= 0
    ) {
      return;
    }

    const donation = donations.find(
      (item) =>
        item.id === donationId &&
        item.requestedBy === currentUser?.id &&
        item.status === "delivered" &&
        !item.distribution
    );

    if (!donation) return;

    const distributionDetails = {
      area,
      estimatedPeopleHelped: peopleHelped,
      date: new Date().toISOString().split("T")[0],
    };

    setDonations((previousDonations) =>
      previousDonations.map((item) =>
        item.id === donationId &&
        item.requestedBy === currentUser?.id &&
        item.status === "delivered" &&
        !item.distribution
          ? {
              ...item,
              distribution: distributionDetails,
            }
          : item
      )
    );

    setFormData((previous) => {
      const updated = { ...previous };
      delete updated[donationId];
      return updated;
    });

    setSuccessMsg(
      `Distribution log saved for ${
        donation.foodItems?.[0]?.name || "Food Donation"
      }.`
    );
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

  const stats = [
    {
      title: "Total Distributions",
      value: totalDistributions,
      icon: "🚚",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Pending Logs",
      value: pendingLogs,
      icon: "📝",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Estimated People Helped",
      value: totalPeopleHelped,
      icon: "👥",
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
            🚚 Food Distribution Management
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Distribution Log
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Record food distribution activities, track the
            communities you support, and maintain organized
            distribution records.
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
      <div className="grid sm:grid-cols-3 gap-5">

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
                Distribution Saved!
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

      {/* PENDING DISTRIBUTION LOGS */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              📝 Pending Distribution Logs
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add distribution details for delivered food
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-bold">
            {pendingLogs} Pending
          </span>

        </div>

        {readyToLog.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">

            <div className="text-5xl mb-4">
              📭
            </div>

            <h4 className="font-bold text-green-900">
              No Pending Distribution Logs
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Delivered food without a distribution record
              will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {readyToLog.map((donation) => {

              const entry = formData[donation.id] || {};

              return (
                <form
                  key={donation.id}
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(donation.id);
                  }}
                  className="border border-green-100 rounded-2xl overflow-hidden"
                >

                  <div className="bg-green-50 px-5 sm:px-6 py-5 border-b border-green-100">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                        🍱
                      </div>

                      <div className="flex-1">

                        <h4 className="text-lg font-extrabold text-green-950">
                          {donation.foodItems?.[0]?.name ||
                            "Food Donation"}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity:{" "}
                          {donation.totalQuantity || "Not specified"}
                        </p>

                      </div>

                      <span className="self-start px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                        Awaiting Log
                      </span>

                    </div>

                  </div>

                  <div className="p-5 sm:p-6">

                    <div className="grid md:grid-cols-2 gap-5">

                      {/* DISTRIBUTION AREA */}
                      <div>

                        <label
                          htmlFor={`area-${donation.id}`}
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Distribution Area *
                        </label>

                        <input
                          id={`area-${donation.id}`}
                          type="text"
                          required
                          value={entry.area || ""}
                          onChange={(event) =>
                            handleChange(
                              donation.id,
                              "area",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Chattogram"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                        />

                      </div>

                      {/* PEOPLE HELPED */}
                      <div>

                        <label
                          htmlFor={`people-${donation.id}`}
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Estimated People Helped *
                        </label>

                        <input
                          id={`people-${donation.id}`}
                          type="number"
                          min="1"
                          step="1"
                          required
                          value={entry.estimatedPeopleHelped || ""}
                          onChange={(event) =>
                            handleChange(
                              donation.id,
                              "estimatedPeopleHelped",
                              event.target.value
                            )
                          }
                          placeholder="e.g. 50"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
                        />

                      </div>

                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">

                      <p className="text-sm text-blue-800 leading-6">
                        💡 Please enter the distribution area
                        and an estimated number of people helped.
                        This information will be saved in
                        your distribution records.
                      </p>

                    </div>

                    <button
                      type="submit"
                      className="mt-6 w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      💾 Save Distribution Log
                    </button>

                  </div>

                </form>
              );
            })}

          </div>

        )}

      </div>

      {/* LOGGED DISTRIBUTIONS */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              📋 Logged Distributions
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Review your saved food distribution records
            </p>

          </div>

          <div className="w-full lg:w-72">

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search food or area..."
              aria-label="Search distribution records"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

        </div>

        {filteredLogs.length === 0 ? (

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">

            <div className="text-5xl mb-4">
              📂
            </div>

            <h4 className="font-bold text-gray-800">
              {alreadyLogged.length === 0
                ? "No Distribution Records Yet"
                : "No Matching Records"}
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              {alreadyLogged.length === 0
                ? "Saved distribution logs will appear here."
                : "Try searching with another food name or area."}
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredLogs.map((donation) => (

              <div
                key={donation.id}
                className="border border-green-100 rounded-2xl p-5 sm:p-6 hover:bg-green-50/40 transition"
              >

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 shrink-0 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                      🍱
                    </div>

                    <div className="min-w-0">

                      <h4 className="text-lg font-extrabold text-green-950">
                        {donation.foodItems?.[0]?.name ||
                          "Food Donation"}
                      </h4>

                      <p className="mt-2 text-sm text-gray-500">
                        📍 {donation.distribution?.area}
                      </p>

                    </div>

                  </div>

                  <span className="self-start px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                    ✅ Logged
                  </span>

                </div>

                <div className="mt-5 grid sm:grid-cols-3 gap-4">

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-400 font-semibold">
                      Distribution Area
                    </p>

                    <p className="mt-2 text-sm font-bold text-gray-800 break-words">
                      {donation.distribution?.area ||
                        "Not specified"}
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-400 font-semibold">
                      Estimated People Helped
                    </p>

                    <p className="mt-2 text-sm font-bold text-green-800">
                      {donation.distribution?.estimatedPeopleHelped ?? 0}
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-400 font-semibold">
                      Distribution Date
                    </p>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                      {formatDate(donation.distribution?.date)}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* INFORMATION */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💡
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              How Distribution Logging Works
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Once food is marked as delivered in
              My Collections, it becomes available
              for distribution logging. Enter the
              distribution area and estimated people
              helped, then save the record.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DistributionLog;