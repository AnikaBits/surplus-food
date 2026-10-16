import { useState } from "react";
import { Icon } from "../../../components/LiveStats";

// এখনো Complaint submit করার কোনো ফর্ম অন্য কোথাও নেই বলে,
// এখানে কিছু dummy complaint লোকালভাবে রাখা হলো demo এর জন্য।
const dummyComplaints = [
  { id: 1, from: "Hope Foundation", subject: "Food quality issue", status: "open", date: "2026-09-19" },
  { id: 2, from: "Rahim Uddin", subject: "Volunteer did not show up", status: "resolved", date: "2026-09-17" },
];

function Complaints() {
  const [complaints, setComplaints] = useState(dummyComplaints);

  function resolveComplaint(id) {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status: "resolved" } : c)));
  }

  const openCount = complaints.filter((c) => c.status === "open").length;
  const resolvedCount = complaints.length - openCount;

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap gap-3 mb-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF1CC] border border-[#F2B01E] px-4 py-1.5 text-sm font-semibold text-[#5A4300] tabular-nums">
          <span className="w-2 h-2 rounded-full bg-[#E5322D]" aria-hidden="true" />
          {openCount} open
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#DDF2E2] px-4 py-1.5 text-sm font-semibold text-[#2F7A55] tabular-nums">
          <Icon name="check" className="w-4 h-4" />
          {resolvedCount} resolved
        </span>
      </div>

      <div className="space-y-3">
        {complaints.map((c) => {
          const isOpen = c.status === "open";
          return (
            <div
              key={c.id}
              className={`bg-white rounded-2xl border shadow-sm p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 ${
                isOpen ? "border-[#0F2E22]/10 border-l-[#F2B01E]" : "border-[#0F2E22]/10 border-l-[#8FD19E]"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                    isOpen ? "bg-[#FFE9A8] text-[#8A5A00]" : "bg-[#DDF2E2] text-[#2F7A55]"
                  }`}
                >
                  <Icon name="flag" className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[#14231B]">{c.subject}</p>
                  <p className="text-sm text-[#3B4F43]">
                    From {c.from}, {c.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold rounded-full px-3 py-1 capitalize ${
                    isOpen ? "bg-[#FFE9A8] text-[#8A5A00]" : "bg-[#DDF2E2] text-[#2F7A55]"
                  }`}
                >
                  {c.status}
                </span>
                {isOpen && (
                  <button
                    onClick={() => resolveComplaint(c.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F2E22] text-white text-sm font-semibold hover:bg-[#184230] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22]"
                  >
                    <Icon name="check" className="w-4 h-4" />
                    Resolve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Complaints;