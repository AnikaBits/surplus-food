import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function TransactionTrail() {
  const { donations = [], users = [] } = useAuth();

  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  // Find user name using ID
  function getUserName(id) {
    const user = users.find((u) => String(u.id) === String(id));
    return user ? user.name : "—";
  }

  // Get food name
  function getFoodName(donation) {
    return donation.foodItems?.[0]?.name || "Food Donation";
  }

  // Format date safely
  function formatDate(date) {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleString();
  }

  // Statistics
  const totalDonations = donations.length;

  const deliveredDonations = donations.filter(
    (donation) => donation.status === "delivered"
  ).length;

  const distributedDonations = donations.filter(
    (donation) => !!donation.distribution
  ).length;

  const activeDonations = donations.filter(
    (donation) =>
      ["requested", "approved", "picked_up", "on_the_way"].includes(
        donation.status
      )
  ).length;

  // Search donations
  const filteredDonations = donations.filter((donation) => {
    const searchText = search.toLowerCase().trim();

    const foodName = getFoodName(donation).toLowerCase();

    const donationId = String(donation.id).toLowerCase();

    const donorName = getUserName(
      donation.donorId
    ).toLowerCase();

    return (
      foodName.includes(searchText) ||
      donationId.includes(searchText) ||
      donorName.includes(searchText)
    );
  });

  // Preserve selection while donations update
  const selected = donations.find(
    (donation) =>
      String(donation.id) ===
      String(selectedId ?? donations[0]?.id)
  );

  // Transaction steps
  const steps = selected
    ? [
        {
          label: "Donor Posted",
          icon: "🍱",
          done: true,
          detail: getUserName(selected.donorId),
        },
        {
          label: "Requested by NGO",
          icon: "🏢",
          done: !!selected.requestedBy,
          detail: selected.requestedBy
            ? getUserName(selected.requestedBy)
            : "Awaiting NGO request",
        },
        {
          label: "Donor Approved",
          icon: "✅",
          done: [
            "approved",
            "picked_up",
            "on_the_way",
            "delivered",
          ].includes(selected.status),
          detail: [
            "approved",
            "picked_up",
            "on_the_way",
            "delivered",
          ].includes(selected.status)
            ? "Donation request approved"
            : "Awaiting donor approval",
        },
        {
          label: "Picked Up",
          icon: "📦",
          done: [
            "picked_up",
            "on_the_way",
            "delivered",
          ].includes(selected.status),
          detail: selected.pickedUpAt
            ? formatDate(selected.pickedUpAt)
            : "Pickup not recorded",
        },
        {
          label: "Delivered",
          icon: "🚚",
          done: selected.status === "delivered",
          detail: selected.deliveredAt
            ? formatDate(selected.deliveredAt)
            : "Delivery not recorded",
        },
        {
          label: "Distributed",
          icon: "💚",
          done: !!selected.distribution,
          detail: selected.distribution
            ? `${
                selected.distribution.area || "Area not specified"
              } — ~${selected.distribution.estimatedPeopleHelped ?? "—"} people`
            : "Distribution not recorded",
        },
      ]
    : [];

  const completedSteps = steps.filter(
    (step) => step.done
  ).length;

  const progressPercentage = selected
    ? Math.round((completedSteps / steps.length) * 100)
    : 0;

  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: "🍱",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Active Transactions",
      value: activeDonations,
      icon: "🔄",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Delivered",
      value: deliveredDonations,
      icon: "🚚",
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Distributed",
      value: distributedDonations,
      icon: "💚",
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
            🔄 Donation Activity Tracking
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Transaction Trail
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Track the complete journey of food donations,
            from the moment a donor posts food to its
            final distribution to people in need.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              🌍
            </span>

            <div>

              <p className="text-xs text-green-100">
                FoodShare Tracking System
              </p>

              <p className="font-bold">
                {totalDonations} Donation Records
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

      {/* DONATION SELECTOR */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        <div className="mb-6">

          <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
            🔍 Select a Donation
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Choose a donation record to view its
            complete transaction history.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* SEARCH */}
          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search food, donor or donation ID..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* SELECT */}
          <select
            value={selected?.id ?? ""}
            onChange={(event) =>
              setSelectedId(event.target.value)
            }
            disabled={donations.length === 0}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition disabled:opacity-50"
          >

            {donations.length === 0 ? (

              <option value="">
                No donations available
              </option>

            ) : filteredDonations.length === 0 ? (

              <option value="">
                No matching donations
              </option>

            ) : (

              filteredDonations.map((donation) => (

                <option
                  key={donation.id}
                  value={donation.id}
                >
                  {getFoodName(donation)} — {donation.id}
                </option>

              ))

            )}

          </select>

        </div>

        {search && (
          <p className="mt-3 text-xs text-gray-500">
            {filteredDonations.length} matching donation(s)
          </p>
        )}

      </div>

      {/* EMPTY STATE */}
      {!selected ? (

        <div className="bg-white border border-green-100 rounded-3xl p-10 sm:p-14 text-center shadow-sm">

          <div className="text-5xl mb-5">
            📭
          </div>

          <h3 className="text-xl font-extrabold text-green-900">
            No Donation Selected
          </h3>

          <p className="mt-3 text-sm text-gray-500 leading-7">
            Donation transaction details will appear
            here when records are available.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* TRANSACTION TIMELINE */}
          <div className="xl:col-span-2 bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

            {/* TITLE */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">

              <div>

                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                  Donation #{selected.id}
                </span>

                <h3 className="mt-4 text-2xl font-extrabold text-green-950">
                  {getFoodName(selected)}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Complete Donation Journey
                </p>

              </div>

              <StatusBadge status={selected.status} />

            </div>

            {/* PROGRESS */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-9">

              <div className="flex items-center justify-between gap-4 mb-3">

                <span className="font-bold text-green-900 text-sm">
                  Journey Progress
                </span>

                <span className="text-sm font-extrabold text-green-700">
                  {completedSteps} / {steps.length} Steps
                </span>

              </div>

              <div className="w-full h-3 bg-green-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-xs text-gray-500">
                {progressPercentage}% of tracked steps completed
              </p>

            </div>

            {/* TIMELINE */}
            <div className="relative">

              {steps.map((step, index) => (

                <div
                  key={step.label}
                  className="relative flex gap-5"
                >

                  {/* ICON AND LINE */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 border-2 ${
                        step.done
                          ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-100"
                          : "bg-gray-100 border-gray-200 text-gray-400"
                      }`}
                    >
                      {step.done ? "✓" : step.icon}
                    </div>

                    {index < steps.length - 1 && (

                      <div
                        className={`w-1 min-h-12 flex-1 my-2 rounded-full ${
                          step.done
                            ? "bg-green-300"
                            : "bg-gray-200"
                        }`}
                      />

                    )}

                  </div>

                  {/* STEP DETAILS */}
                  <div
                    className={`flex-1 min-w-0 ${
                      index < steps.length - 1
                        ? "pb-9"
                        : "pb-2"
                    }`}
                  >

                    <div className="flex flex-wrap items-center gap-3">

                      <h4
                        className={`font-extrabold ${
                          step.done
                            ? "text-green-950"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </h4>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          step.done
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {step.done ? "Completed" : "Pending"}
                      </span>

                    </div>

                    {step.detail && (

                      <p className="mt-2 text-sm text-gray-500 break-words">
                        {step.detail}
                      </p>

                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* DONATION SUMMARY */}
          <div className="space-y-6">

            {/* DONATION INFORMATION */}
            <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">

              <h3 className="text-lg font-extrabold text-green-950 mb-6">
                📦 Donation Details
              </h3>

              <div className="space-y-5">

                <div>

                  <p className="text-xs font-semibold text-gray-400">
                    Food Item
                  </p>

                  <p className="mt-2 font-bold text-gray-800">
                    {getFoodName(selected)}
                  </p>

                </div>

                <div className="border-t border-gray-100" />

                <div>

                  <p className="text-xs font-semibold text-gray-400">
                    Donation ID
                  </p>

                  <p className="mt-2 font-bold text-gray-800 break-all">
                    {selected.id}
                  </p>

                </div>

                <div className="border-t border-gray-100" />

                <div>

                  <p className="text-xs font-semibold text-gray-400">
                    Total Quantity
                  </p>

                  <p className="mt-2 font-bold text-green-700">
                    {selected.totalQuantity ?? "—"}
                  </p>

                </div>

                <div className="border-t border-gray-100" />

                <div>

                  <p className="text-xs font-semibold text-gray-400">
                    Current Status
                  </p>

                  <div className="mt-2">
                    <StatusBadge status={selected.status} />
                  </div>

                </div>

              </div>

            </div>

            {/* PARTICIPANTS */}
            <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">

              <h3 className="text-lg font-extrabold text-green-950 mb-6">
                👥 Participants
              </h3>

              <div className="space-y-5">

                <div className="flex items-start gap-3">

                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                    👤
                  </div>

                  <div>

                    <p className="text-xs text-gray-400 font-semibold">
                      Food Donor
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {getUserName(selected.donorId)}
                    </p>

                  </div>

                </div>

                <div className="border-t border-gray-100" />

                <div className="flex items-start gap-3">

                  <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                    🏢
                  </div>

                  <div>

                    <p className="text-xs text-gray-400 font-semibold">
                      NGO / Volunteer
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {selected.requestedBy
                        ? getUserName(selected.requestedBy)
                        : "Not Requested Yet"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* DISTRIBUTION DETAILS */}
            {selected.distribution && (

              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">

                <h3 className="text-lg font-extrabold text-green-950 mb-5">
                  💚 Distribution Impact
                </h3>

                <div className="space-y-4">

                  <div>

                    <p className="text-xs font-semibold text-gray-500">
                      Distribution Area
                    </p>

                    <p className="mt-2 font-bold text-green-800">
                      {selected.distribution.area || "—"}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-gray-500">
                      Estimated People Helped
                    </p>

                    <p className="mt-2 text-2xl font-extrabold text-green-700">
                      {selected.distribution.estimatedPeopleHelped ?? "—"}
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

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
              Understanding the Transaction Trail
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              The timeline shows the recorded stages of
              a food donation: posting, NGO request,
              donor approval, pickup, delivery, and
              distribution. Completed steps are marked
              in green, while remaining steps are shown
              in gray. This page is for monitoring
              donation activity and does not change
              donation statuses.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TransactionTrail;