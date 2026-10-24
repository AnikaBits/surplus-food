import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import AvailableFoodTab from "./sections/AvailableFoodTab";
import MyCollections from "./sections/MyCollections";
import DistributionLog from "./sections/DistributionLog";
import NgoHistory from "./sections/NgoHistory";
import RateDonor from "./sections/RateDonor";
import NgoProfile from "./sections/NgoProfile";
import NearbyRestaurants from "./sections/NearbyRestaurants";

function NGODashboard() {
const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("availableFood");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    {
      id: "availableFood",
      label: "Available Food",
      icon: "🍱",
      description: "Browse available food donations",
    },
    {
      id: "nearbyRestaurants",
      label: "Nearby Restaurants",
      icon: "📍",
      description: "Find real restaurants near you",
    },
    {
      id: "myCollections",
      label: "My Collections",
      icon: "📦",
      description: "Manage your food collections",
    },
    {
      id: "distributionLog",
      label: "Distribution Log",
      icon: "🚚",
      description: "Track food distribution activities",
    },
    {
      id: "history",
      label: "History & Stats",
      icon: "📊",
      description: "Review your collection history",
    },
    {
      id: "rateDonor",
      label: "Rate Donor",
      icon: "⭐",
      description: "Share feedback about donors",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "👤",
      description: "View and manage your profile",
    },
  ];

  const activeTabInfo =
    tabs.find((tab) => tab.id === activeTab) || tabs[0];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    setSidebarOpen(false);
  }

  const ngoName = currentUser?.name || "FoodShare Partner";

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
                  NGO / Volunteer Portal
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

        {/* USER PROFILE */}
        <div className="px-5 py-6">

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-green-100 flex items-center justify-center shrink-0">

                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={ngoName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">👤</span>
                )}

              </div>

              <div className="min-w-0">

                <p className="font-bold text-green-950 text-sm truncate">
                  {ngoName}
                </p>

                <p className="text-xs text-green-700 mt-1">
                  NGO / Volunteer
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 pb-5">

          <p className="px-4 mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Main Menu
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

                <span>
                  {tab.label}
                </span>

                {activeTab === tab.id && (
                  <span className="ml-auto">
                    →
                  </span>
                )}

              </button>

            ))}

          </nav>

        </div>

        {/* SIDEBAR FOOTER */}
        <div className="p-5 border-t border-green-100">

          <div className="bg-green-50 rounded-xl p-4 mb-4">

            <p className="text-xs font-bold text-green-800">
              💚 FoodShare Community
            </p>

            <p className="mt-2 text-xs text-gray-500 leading-5">
              Connecting surplus food with people who need it.
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
                  NGO / Volunteer Dashboard
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
                  {ngoName}
                </p>

                <p className="text-xs text-gray-400">
                  FoodShare Partner
                </p>

              </div>

              <div className="w-11 h-11 rounded-full bg-green-100 border-2 border-green-200 overflow-hidden flex items-center justify-center">

                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={ngoName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">👤</span>
                )}

              </div>

            </div>

          </div>

        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-5 sm:p-8 lg:p-10">

          <div className="max-w-7xl mx-auto space-y-8">

            {/* ACTIVE SECTION CONTENT */}
            <div>

              {activeTab === "availableFood" && (
                <AvailableFoodTab />
              )}

              {activeTab === "nearbyRestaurants" && (
                <NearbyRestaurants />
              )}

              {activeTab === "myCollections" && (
                <MyCollections />
              )}

              {activeTab === "distributionLog" && (
                <DistributionLog />
              )}

              {activeTab === "history" && (
                <NgoHistory />
              )}

              {activeTab === "rateDonor" && (
                <RateDonor />
              )}

              {activeTab === "profile" && (
                <NgoProfile />
              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default NGODashboard;
