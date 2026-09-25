// ============================================================
// MODIFIED FILE — src/pages/donor/DonorDashboard.jsx
// ============================================================
// আগে এটা শুধু ৩টা placeholder card দেখাতো। এখন এটা একটা
// "container" — বাম পাশে ট্যাব মেনু (Add Food, My Donations,
// Requests, History, Donate Funds, Profile), ক্লিক করলে ডান
// পাশে সেই section এর component দেখাবে।
// ============================================================

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import AddFood from "./sections/AddFood";
import MyDonations from "./sections/MyDonations";
import DonorRequests from "./sections/DonorRequests";
import DonationHistory from "./sections/DonationHistory";
import DonateFunds from "./sections/DonateFunds";
import DonorProfile from "./sections/DonorProfile";

function DonorDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("addFood");

  const tabs = [
    { id: "addFood", label: "Add Food" },
    { id: "myDonations", label: "My Donations" },
    { id: "requests", label: "Requests" },
    { id: "history", label: "Donation History" },
    { id: "donateFunds", label: "Donate Funds" },
    { id: "profile", label: "Profile" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <img
            src={currentUser?.image}
            alt={currentUser?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser?.donorType} Donor
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full mt-8 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Donor Dashboard
        </h1>

        {activeTab === "addFood" && <AddFood />}
        {activeTab === "myDonations" && <MyDonations />}
        {activeTab === "requests" && <DonorRequests />}
        {activeTab === "history" && <DonationHistory />}
        {activeTab === "donateFunds" && <DonateFunds />}
        {activeTab === "profile" && <DonorProfile />}
      </main>
    </div>
  );
}

export default DonorDashboard;