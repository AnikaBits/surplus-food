import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import PendingApprovals from "./sections/PendingApprovals";
import AllUsers from "./sections/AllUsers";
import AllDonations from "./sections/AllDonations";
import TransactionTrail from "./sections/TransactionTrail";
import AnalyticsDashboard from "./sections/AnalyticsDashboard";
import Complaints from "./sections/Complaints";
import MoneyDonationLog from "./sections/MoneyDonationLog";

function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("pendingApprovals");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    {
      id: "pendingApprovals",
      label: "Pending Approvals",
      icon: "⏳",
      description: "Review and manage pending user approvals",
    },
    {
      id: "allUsers",
      label: "All Users",
      icon: "👥",
      description: "View and manage registered platform users",
    },
    {
      id: "allDonations",
      label: "All Donations",
      icon: "🍱",
      description: "Monitor food donations across the platform",
    },
    {
      id: "transactionTrail",
      label: "Transaction Trail",
      icon: "🔄",
      description: "Track food donation and collection activities",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📊",
      description: "Explore platform statistics and insights",
    },
    {
      id: "complaints",
      label: "Complaints",
      icon: "📩",
      description: "Review and manage reported complaints",
    },
    {
      id: "moneyLog",
      label: "Money Donation Log",
      icon: "💰",
      description: "Review recorded monetary donations",
    },
  ];

  const activeTabInfo =
    tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const adminName = currentUser?.name || "FoodShare Admin";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f5faf6] flex">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-72 shrink-0
          bg-white border-r border-green-100
          flex flex-col shadow-lg md:shadow-none
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* BRAND */}
        <div className="px-6 py-7 border-b border-green-100">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-md">
                🌿
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-green-900">
                  FoodShare
                </h2>

                <p className="text-xs text-gray-400 font-medium">
                  Admin Control Panel
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500 text-xl"
              aria-label="Close sidebar"
            >
              ✕
            </button>

          </div>

        </div>

        {/* ADMIN PROFILE */}
        <div className="px-5 py-6">

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-green-100 flex items-center justify-center shrink-0">

                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={adminName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">🛡️</span>
                )}

              </div>

              <div className="min-w-0">

                <p className="font-bold text-green-950 text-sm truncate">
                  {adminName}
                </p>

                <p className="text-xs text-green-700 mt-1">
                  Platform Administrator
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 pb-5">

          <p className="px-4 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Administration
          </p>

          <nav className="space-y-2">

            {tabs.map((tab) => (

              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                aria-current={
                  activeTab === tab.id ? "page" : undefined
                }
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-700 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                }`}
              >

                <span className="text-xl">
                  {tab.icon}
                </span>

                <span className="text-left">
                  {tab.label}
                </span>

                {activeTab === tab.id && (
                  <span className="ml-auto">→</span>
                )}

              </button>

            ))}

          </nav>

        </div>

        {/* SIDEBAR FOOTER */}
        <div className="p-5 border-t border-green-100">

          <div className="bg-green-50 rounded-xl p-4 mb-4">

            <p className="text-xs font-bold text-green-800">
              💚 FoodShare Administration
            </p>

            <p className="mt-2 text-xs text-gray-500 leading-5">
              Managing a safer and more connected
              food-sharing community.
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-red-50 text-red-700 rounded-xl text-sm font-bold hover:bg-red-100 transition"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0">

        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-green-100 px-5 sm:px-8 py-4">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4 min-w-0">

              {/* MOBILE MENU */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden w-11 h-11 shrink-0 flex items-center justify-center bg-green-50 text-green-800 rounded-xl text-2xl"
                aria-label="Open sidebar"
              >
                ☰
              </button>

              <div className="min-w-0">

                <p className="text-xs text-gray-400 font-semibold">
                  FoodShare Administration
                </p>

                <h1 className="text-lg sm:text-2xl font-extrabold text-green-950 truncate">
                  {activeTabInfo.label}
                </h1>

              </div>

            </div>

            {/* HEADER PROFILE */}
            <div className="flex items-center gap-3 shrink-0">

              <div className="hidden sm:block text-right">

                <p className="text-sm font-bold text-green-950 max-w-40 truncate">
                  {adminName}
                </p>

                <p className="text-xs text-gray-400">
                  Administrator
                </p>

              </div>

              <div className="w-11 h-11 rounded-full bg-green-100 border-2 border-green-200 overflow-hidden flex items-center justify-center">

                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={adminName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🛡️</span>
                )}

              </div>

            </div>

          </div>

        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-5 sm:p-8 lg:p-10">

          <div className="max-w-7xl mx-auto space-y-7">

            {/* SECTION INTRO */}
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                {activeTabInfo.icon}
              </div>

              <div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-green-950">
                  {activeTabInfo.label}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {activeTabInfo.description}
                </p>

              </div>

            </div>

            {/* ACTIVE SECTION */}
            <div>

              {activeTab === "pendingApprovals" && (
                <PendingApprovals />
              )}

              {activeTab === "allUsers" && (
                <AllUsers />
              )}

              {activeTab === "allDonations" && (
                <AllDonations />
              )}

              {activeTab === "transactionTrail" && (
                <TransactionTrail />
              )}

              {activeTab === "analytics" && (
                <AnalyticsDashboard />
              )}

              {activeTab === "complaints" && (
                <Complaints />
              )}

              {activeTab === "moneyLog" && (
                <MoneyDonationLog />
              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;