// src/pages/admin/AdminDashboard.jsx
// নতুন ডিজাইন: গাঢ় সবুজ সাইডবার (আইকন + pending ব্যাজ), হলুদ active ট্যাব,
// ওপরে পেজের শিরোনাম। লজিক আগের মতোই।
// দরকার: components/LiveStats.jsx (Icon এক্সপোর্ট, নতুন আইকনসহ)

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/LiveStats";

import PendingApprovals from "./sections/PendingApprovals";
import AllUsers from "./sections/AllUsers";
import AllDonations from "./sections/AllDonations";
import TransactionTrail from "./sections/TransactionTrail";
import AnalyticsDashboard from "./sections/AnalyticsDashboard";
import Complaints from "./sections/Complaints";
import MoneyDonationLog from "./sections/MoneyDonationLog";

const FONT = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" };

const TABS = [
  { id: "pendingApprovals", label: "Pending approvals", icon: "clock", desc: "Review new donors and NGOs before they can use the platform." },
  { id: "allUsers", label: "All users", icon: "users", desc: "Every donor and NGO account. Block or unblock when needed." },
  { id: "allDonations", label: "All donations", icon: "list", desc: "Every food listing and where it stands right now." },
  { id: "transactionTrail", label: "Transaction trail", icon: "route", desc: "Follow one donation from the donor's kitchen to the last plate." },
  { id: "analytics", label: "Analytics", icon: "chart", desc: "How much food is moving, and where it goes." },
  { id: "complaints", label: "Complaints", icon: "flag", desc: "Reports from donors and NGOs waiting for a response." },
  { id: "moneyLog", label: "Money donation log", icon: "wallet", desc: "Every fund donation received through the platform." },
];

function AdminDashboard() {
  const { currentUser, logout, users = [] } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pendingApprovals");

  const pendingCount = users.filter((u) => u.status === "pending").length;
  const active = TABS.find((t) => t.id === activeTab);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const views = {
    pendingApprovals: <PendingApprovals />,
    allUsers: <AllUsers />,
    allDonations: <AllDonations />,
    transactionTrail: <TransactionTrail />,
    analytics: <AnalyticsDashboard />,
    complaints: <Complaints />,
    moneyLog: <MoneyDonationLog />,
  };

  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#14231B] flex flex-col lg:flex-row" style={FONT}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&display=swap');`}</style>

      {/* ============ সাইডবার ============ */}
      <aside className="lg:w-64 lg:shrink-0 bg-[#0F2E22] text-white p-4 lg:p-5 lg:sticky lg:top-0 lg:h-screen flex flex-col">
        <div className="flex items-center gap-3 lg:mb-6">
          <img
            src={currentUser?.image}
            alt=""
            className="w-11 h-11 rounded-full object-cover bg-white/10 ring-2 ring-[#F2B01E]"
          />
          <div className="min-w-0">
            <p className="font-semibold truncate">{currentUser?.name}</p>
            <span className="inline-block mt-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-[#F2B01E] text-[#0F2E22] px-2 py-0.5">
              Admin
            </span>
          </div>
        </div>

        <nav className="mt-4 lg:mt-0 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0" aria-label="Admin sections">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B01E] ${
                  isActive
                    ? "bg-[#F2B01E] text-[#0F2E22]"
                    : "text-[#CFE0D5] hover:bg-white/10"
                }`}
              >
                <Icon name={tab.icon} className="w-[18px] h-[18px] shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.id === "pendingApprovals" && pendingCount > 0 && (
                  <span
                    className={`ml-auto text-[11px] font-bold rounded-full px-2 py-0.5 ${
                      isActive ? "bg-[#0F2E22] text-[#F2B01E]" : "bg-[#E5322D] text-white"
                    }`}
                  >
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-3 lg:mt-auto flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#FFB4A8] hover:bg-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B01E]"
        >
          <Icon name="logout" className="w-[18px] h-[18px]" />
          Logout
        </button>
      </aside>

      {/* ============ মূল অংশ ============ */}
      <main className="flex-1 min-w-0 p-5 md:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F2E22]">{active.label}</h1>
            <p className="mt-1 text-sm text-[#3B4F43] max-w-xl">{active.desc}</p>
          </div>

          {pendingCount > 0 && activeTab !== "pendingApprovals" && (
            <button
              onClick={() => setActiveTab("pendingApprovals")}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFF1CC] border border-[#F2B01E] px-4 py-2 text-sm font-semibold text-[#5A4300] hover:bg-[#FFE9A8] transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#E5322D]" aria-hidden="true" />
              {pendingCount} waiting for approval
            </button>
          )}
        </header>

        {views[activeTab]}
      </main>
    </div>
  );
}

export default AdminDashboard;