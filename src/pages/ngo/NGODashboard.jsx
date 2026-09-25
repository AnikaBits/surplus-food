import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import AvailableFoodTab from "./sections/AvailableFoodTab";
import MyCollections from "./sections/MyCollections";
import DistributionLog from "./sections/DistributionLog";
import NgoHistory from "./sections/NgoHistory";
import RateDonor from "./sections/RateDonor";
import NgoProfile from "./sections/NgoProfile";

function NGODashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("availableFood");

  const tabs = [
    { id: "availableFood", label: "Available Food" },
    { id: "myCollections", label: "My Collections" },
    { id: "distributionLog", label: "Distribution Log" },
    { id: "history", label: "History & Stats" },
    { id: "rateDonor", label: "Rate Donor" },
    { id: "profile", label: "Profile" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={currentUser?.image} alt={currentUser?.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-gray-800">{currentUser?.name}</p>
            <p className="text-xs text-gray-500">NGO / Volunteer</p>
          </div>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="w-full mt-8 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">NGO / Volunteer Dashboard</h1>

        {activeTab === "availableFood" && <AvailableFoodTab />}
        {activeTab === "myCollections" && <MyCollections />}
        {activeTab === "distributionLog" && <DistributionLog />}
        {activeTab === "history" && <NgoHistory />}
        {activeTab === "rateDonor" && <RateDonor />}
        {activeTab === "profile" && <NgoProfile />}
      </main>
    </div>
  );
}

export default NGODashboard;