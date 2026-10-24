import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import AddFood from "./sections/AddFood";
import MyDonations from "./sections/MyDonations";
import DonorRequests from "./sections/DonorRequests";
import DonationHistory from "./sections/DonationHistory";
import DonateFunds from "./sections/DonateFunds";
import DonorProfile from "./sections/DonorProfile";

function DonorDashboard() {
  const { currentUser, logout, donations = [] } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("addFood");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    {
      id: "addFood",
      label: "Add Food",
      icon: "🍱",
      description: "Share surplus food",
    },
    {
      id: "myDonations",
      label: "My Donations",
      icon: "📦",
      description: "Manage your donations",
    },
    {
      id: "requests",
      label: "Requests",
      icon: "📩",
      description: "Review food requests",
    },
    {
      id: "history",
      label: "Donation History",
      icon: "📋",
      description: "View past donations",
    },
    {
      id: "donateFunds",
      label: "Donate Funds",
      icon: "💚",
      description: "Support our mission",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "👤",
      description: "Manage your account",
    },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    setSidebarOpen(false);
  }

  // Calculate statistics using the logged-in donor's data
  const myDonations = donations.filter(
    (donation) => donation.donorId === currentUser?.id
  );

  const totalDonations = myDonations.length;

  const activeDonations = myDonations.filter(
    (donation) => donation.status === "available"
  ).length;

  const completedDonations = myDonations.filter(
    (donation) =>
      donation.status === "completed" ||
      donation.status === "delivered"
  ).length;

  const pendingRequests = myDonations.filter(
    (donation) =>
      donation.status === "requested" ||
      donation.status === "pending"
  ).length;

  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: "🍱",
      bg: "bg-green-100",
      color: "text-green-700",
    },
    {
      title: "Active Donations",
      value: activeDonations,
      icon: "🌱",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: "📩",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Completed Donations",
      value: completedDonations,
      icon: "✅",
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
  ];

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-[#f6f9f6]">

      {/* MOBILE HEADER */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-green-100 px-5 py-4 shadow-sm">

        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">
              🌱
            </div>

            <span className="text-xl font-extrabold text-green-900">
              FoodShare
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            className="w-11 h-11 bg-green-50 text-green-800 rounded-xl flex items-center justify-center text-2xl"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>

        </div>

      </header>

      <div className="flex min-h-screen">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50
            w-[280px] h-screen
            bg-white border-r border-green-100
            flex flex-col
            shadow-xl lg:shadow-none
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >

          {/* BRAND */}
          <div className="px-7 py-7 border-b border-green-100">

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-md">
                🌱
              </div>

              <div>

                <h2 className="text-2xl font-extrabold text-green-900">
                  FoodShare
                </h2>

                <p className="text-xs text-gray-400 font-medium">
                  Donor Dashboard
                </p>

              </div>

            </Link>

          </div>

          {/* DONOR PROFILE */}
          <div className="px-5 pt-6">

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4">

              <div className="flex items-center gap-3">

                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={currentUser?.name || "Donor"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "D"}
                  </div>
                )}

                <div className="min-w-0">

                  <p className="font-bold text-green-950 truncate">
                    {currentUser?.name || "FoodShare Donor"}
                  </p>

                  <p className="text-xs text-gray-500 capitalize mt-1">
                    {currentUser?.donorType || "Food"} Donor
                  </p>

                </div>

              </div>

              <div className="mt-4 flex items-center gap-2">

                <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                <span className="text-xs text-green-700 font-semibold">
                  Donor Account
                </span>

              </div>

            </div>

          </div>

          {/* NAVIGATION */}
          <div className="flex-1 overflow-y-auto px-4 py-6">

            <p className="px-4 mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Main Menu
            </p>

            <nav className="space-y-2">

              {tabs.map((tab) => (

                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                  className={`
                    group w-full flex items-center gap-4
                    px-4 py-3.5 rounded-xl
                    text-sm font-semibold
                    transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-green-700 to-emerald-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                    }
                  `}
                >

                  <span className="text-xl">
                    {tab.icon}
                  </span>

                  <span className="flex-1 text-left">
                    {tab.label}
                  </span>

                  {activeTab === tab.id && (
                    <span className="text-white">
                      →
                    </span>
                  )}

                </button>

              ))}

            </nav>

          </div>

          {/* SIDEBAR FOOTER */}
          <div className="p-5 border-t border-green-100">

            <div className="bg-green-50 rounded-2xl p-4 mb-4">

              <p className="text-sm font-bold text-green-900">
                💚 Make Every Meal Count
              </p>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                Your generosity helps build a better community.
              </p>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300"
            >
              <span className="text-lg">🚪</span>
              Logout
            </button>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-5 sm:p-7 lg:p-10">

          <div className="max-w-[1500px] mx-auto">

            {/* PAGE TOP BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

              <div>

                <p className="text-sm text-green-700 font-semibold">
                  Dashboard / {activeTabInfo?.label}
                </p>

                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-green-950">
                  Donor Dashboard
                </h1>

                <p className="mt-2 text-gray-500 text-sm">
                  Manage your donations and make a difference.
                </p>

              </div>

              <div className="hidden sm:flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-green-100 shadow-sm">

                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                  👋
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Welcome back
                  </p>

                  <p className="text-sm font-bold text-green-900">
                    {currentUser?.name || "Donor"}
                  </p>

                </div>

              </div>

            </div>

            {/* OVERVIEW SECTION */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 mb-8 shadow-lg">

              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative">

                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-white text-xs font-semibold">
                  🌱 FoodShare Donor Community
                </span>

                <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
                  Hello, {currentUser?.name?.split(" ")[0] || "Donor"}! 👋
                </h2>

                <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
                  Welcome to your donation dashboard.
                  Track your contributions, manage food requests
                  and continue making a positive impact.
                </p>

              </div>

            </div>

            {/* STATISTICS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-9">

              {stats.map((stat, index) => (

                <div
                  key={index}
                  className="group bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="flex items-center justify-between">

                    <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>

                    <span className="text-green-500 text-lg">
                      ↗
                    </span>

                  </div>

                  <p className="mt-6 text-sm font-semibold text-gray-500">
                    {stat.title}
                  </p>

                  <h3 className={`mt-2 text-4xl font-extrabold ${stat.color}`}>
                    {stat.value}
                  </h3>

                  <p className="mt-3 text-xs text-gray-400">
                    Your donation activity
                  </p>

                </div>

              ))}

            </div>

            {/* ACTIVE SECTION HEADER */}
            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                {activeTabInfo?.icon}
              </div>

              <div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-green-950">
                  {activeTabInfo?.label}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {activeTabInfo?.description}
                </p>

              </div>

            </div>

            {/* SECTION CONTENT */}
            <div className="pb-10">

              {activeTab === "addFood" && <AddFood />}

              {activeTab === "myDonations" && <MyDonations />}

              {activeTab === "requests" && <DonorRequests />}

              {activeTab === "history" && <DonationHistory />}

              {activeTab === "donateFunds" && <DonateFunds />}

              {activeTab === "profile" && <DonorProfile />}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default DonorDashboard;