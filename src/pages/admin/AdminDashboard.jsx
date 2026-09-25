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

  const tabs = [
    { id: "pendingApprovals", label: "Pending Approvals" },
    { id: "allUsers", label: "All Users" },
    { id: "allDonations", label: "All Donations" },
    { id: "transactionTrail", label: "Transaction Trail" },
    { id: "analytics", label: "Analytics" },
    { id: "complaints", label: "Complaints" },
    { id: "moneyLog", label: "Money Donation Log" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={currentUser?.image} alt="Admin" className="w-10 h-10 rounded-full" />
          <p className="font-semibold text-gray-800">{currentUser?.name}</p>
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
        <h1 className="text-2xl font-bold text-green-700 mb-6">Admin Dashboard</h1>

        {activeTab === "pendingApprovals" && <PendingApprovals />}
        {activeTab === "allUsers" && <AllUsers />}
        {activeTab === "allDonations" && <AllDonations />}
        {activeTab === "transactionTrail" && <TransactionTrail />}
        {activeTab === "analytics" && <AnalyticsDashboard />}
        {activeTab === "complaints" && <Complaints />}
        {activeTab === "moneyLog" && <MoneyDonationLog />}
      </main>
    </div>
  );
}

export default AdminDashboard;