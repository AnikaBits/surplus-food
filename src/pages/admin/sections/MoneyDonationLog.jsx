import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function MoneyDonationLog() {
  const { moneyDonations = [], users = [] } = useAuth();

  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  // ==========================================
  // GET DONOR NAME
  // ==========================================

  function getDonorName(id) {
    const donor = users.find(
      (user) => String(user.id) === String(id)
    );

    return donor ? donor.name : "Unknown";
  }

  // ==========================================
  // FORMAT MONEY
  // ==========================================

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-BD", {
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  }

  // ==========================================
  // FORMAT DATE
  // ==========================================

  function formatDate(date) {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalAmount = moneyDonations.reduce(
    (sum, payment) =>
      sum + (Number(payment.amount) || 0),
    0
  );

  const totalTransactions = moneyDonations.length;

  const uniqueDonors = new Set(
    moneyDonations
      .map((payment) => payment.donorId)
      .filter((id) => id !== null && id !== undefined)
  ).size;

  const averageDonation =
    totalTransactions > 0
      ? totalAmount / totalTransactions
      : 0;

  // ==========================================
  // PAYMENT METHODS
  // ==========================================

  const paymentMethods = [
    ...new Set(
      moneyDonations
        .map((payment) => payment.method)
        .filter(Boolean)
    ),
  ];

  // ==========================================
  // SEARCH AND FILTER
  // ==========================================

  const filteredDonations = moneyDonations.filter(
    (payment) => {
      const searchText = search.toLowerCase().trim();

      const donorName = getDonorName(
        payment.donorId
      ).toLowerCase();

      const paymentId = String(
        payment.id ?? ""
      ).toLowerCase();

      const matchesSearch =
        donorName.includes(searchText) ||
        paymentId.includes(searchText);

      const matchesMethod =
        methodFilter === "all" ||
        payment.method === methodFilter;

      return matchesSearch && matchesMethod;
    }
  );

  function clearFilters() {
    setSearch("");
    setMethodFilter("all");
  }

  // ==========================================
  // STATISTICS CARDS
  // ==========================================

  const stats = [
    {
      title: "Total Recorded Amount",
      value: `৳${formatMoney(totalAmount)}`,
      icon: "💰",
      bg: "bg-green-100",
      color: "text-green-800",
      description: "Sum of recorded donations",
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: "🧾",
      bg: "bg-blue-100",
      color: "text-blue-700",
      description: "Monetary donation records",
    },
    {
      title: "Unique Donors",
      value: uniqueDonors,
      icon: "👥",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
      description: "Distinct donor IDs",
    },
    {
      title: "Average Donation",
      value: `৳${formatMoney(averageDonation)}`,
      icon: "📊",
      bg: "bg-orange-100",
      color: "text-orange-700",
      description: "Average recorded amount",
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
            💰 Financial Donation Overview
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Money Donation Log
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            View monetary donation records,
            explore donor contributions, and
            monitor recorded payment methods
            across the FoodShare platform.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-3xl">
              💚
            </span>

            <div>

              <p className="text-xs text-green-100">
                Total Recorded Donations
              </p>

              <p className="text-2xl font-extrabold">
                ৳{formatMoney(totalAmount)}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
              className={`mt-2 text-2xl sm:text-3xl font-extrabold break-words ${stat.color}`}
            >
              {stat.value}
            </h3>

            <p className="mt-3 text-xs text-gray-400">
              {stat.description}
            </p>

          </div>

        ))}

      </div>

      {/* ======================================
          TRANSACTION RECORDS
      ====================================== */}

      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        {/* SECTION HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              🧾 Monetary Donation Records
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Search and review recorded
              monetary contributions.
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold">
            {filteredDonations.length} Records Found
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
              placeholder="Search by donor name or transaction ID..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
            />

          </div>

          {/* PAYMENT METHOD FILTER */}

          <select
            value={methodFilter}
            onChange={(event) =>
              setMethodFilter(event.target.value)
            }
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
          >

            <option value="all">
              All Payment Methods
            </option>

            {paymentMethods.map((method) => (

              <option key={method} value={method}>
                {method}
              </option>

            ))}

          </select>

        </div>

        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {filteredDonations.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-10 sm:p-14 text-center">

            <div className="text-5xl mb-5">
              {moneyDonations.length === 0 ? "📭" : "🔍"}
            </div>

            <h4 className="text-xl font-extrabold text-green-900">
              {moneyDonations.length === 0
                ? "No Monetary Donations Yet"
                : "No Matching Records"}
            </h4>

            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-7">

              {moneyDonations.length === 0
                ? "Monetary donation records will appear here when they are added to the application."
                : "No records match your search or selected payment method."}

            </p>

            {moneyDonations.length > 0 && (

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition"
              >
                Clear Filters
              </button>

            )}

          </div>

        ) : (

          /* ======================================
              TRANSACTION TABLE
          ====================================== */

          <div className="overflow-x-auto rounded-2xl border border-green-100">

            <table className="w-full min-w-[760px] text-sm">

              {/* TABLE HEADER */}

              <thead className="bg-green-50 text-green-900">

                <tr>

                  <th className="px-6 py-5 text-left font-bold">
                    Donor
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Payment Method
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Amount
                  </th>

                  <th className="px-6 py-5 text-left font-bold">
                    Date
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody className="divide-y divide-gray-100">

                {filteredDonations.map((payment) => (

                  <tr
                    key={payment.id}
                    className="hover:bg-green-50/50 transition"
                  >

                    {/* DONOR */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl shrink-0">
                          👤
                        </div>

                        <div>

                          <p className="font-bold text-green-950">
                            {getDonorName(payment.donorId)}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            FoodShare Contributor
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* PAYMENT METHOD */}

                    <td className="px-6 py-5">

                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold">

                        💳 {payment.method || "Unknown"}

                      </span>

                    </td>

                    {/* AMOUNT */}

                    <td className="px-6 py-5">

                      <span className="text-lg font-extrabold text-green-700">
                        ৳{formatMoney(payment.amount)}
                      </span>

                    </td>

                    {/* DATE */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-gray-600">

                        <span className="text-lg">
                          📅
                        </span>

                        <span className="font-medium">
                          {formatDate(payment.date)}
                        </span>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ======================================
          PAYMENT METHOD SUMMARY
      ====================================== */}

      {paymentMethods.length > 0 && (

        <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

          <div className="mb-7">

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              💳 Payment Method Summary
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Overview of recorded donations
              grouped by payment method.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

            {paymentMethods.map((method) => {

              const methodDonations = moneyDonations.filter(
                (payment) => payment.method === method
              );

              const methodTotal = methodDonations.reduce(
                (sum, payment) =>
                  sum + (Number(payment.amount) || 0),
                0
              );

              return (

                <div
                  key={method}
                  className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6"
                >

                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                    💳
                  </div>

                  <h4 className="mt-5 font-extrabold text-green-950">
                    {method}
                  </h4>

                  <p className="mt-2 text-2xl font-extrabold text-green-700">
                    ৳{formatMoney(methodTotal)}
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    {methodDonations.length} Recorded Transactions
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      )}

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
              About Monetary Donation Records
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              This section displays monetary
              donation records currently available
              in the application. Admins can review
              donor names, payment methods,
              recorded amounts, and donation dates.
            </p>

            <p className="mt-3 text-xs text-gray-500 leading-6">
              Demo Mode: These records do not
              confirm that real payments have
              been processed or verified.
              This page is for viewing and
              monitoring records only.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MoneyDonationLog;