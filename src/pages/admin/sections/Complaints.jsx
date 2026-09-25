import { useState } from "react";

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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Complaints / Reports</h2>

      <div className="space-y-3">
        {complaints.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{c.subject}</p>
              <p className="text-xs text-gray-500">From: {c.from} • {c.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  c.status === "resolved" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {c.status}
              </span>
              {c.status === "open" && (
                <button
                  onClick={() => resolveComplaint(c.id)}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;