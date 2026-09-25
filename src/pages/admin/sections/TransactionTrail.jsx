import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function TransactionTrail() {
  const { donations, users } = useAuth();
  const [selectedId, setSelectedId] = useState(donations[0]?.id || null);

  function getUserName(id) {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "—";
  }

  const selected = donations.find((d) => d.id === selectedId);

  const steps = selected
    ? [
        { label: "Donor Posted", done: true, detail: getUserName(selected.donorId) },
        { label: "Requested by NGO", done: !!selected.requestedBy, detail: selected.requestedBy ? getUserName(selected.requestedBy) : "—" },
        { label: "Donor Approved", done: ["approved", "picked_up", "on_the_way", "delivered"].includes(selected.status) },
        { label: "Picked Up", done: ["picked_up", "on_the_way", "delivered"].includes(selected.status), detail: selected.pickedUpAt },
        { label: "Delivered", done: selected.status === "delivered", detail: selected.deliveredAt },
        { label: "Distributed", done: !!selected.distribution, detail: selected.distribution ? `${selected.distribution.area} — ~${selected.distribution.estimatedPeopleHelped} people` : "—" },
      ]
    : [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Full Transaction Trail</h2>

      <select
        value={selectedId || ""}
        onChange={(e) => setSelectedId(e.target.value)}
        className="mb-6 border border-gray-300 rounded-lg px-4 py-2.5"
      >
        {donations.map((d) => (
          <option key={d.id} value={d.id}>
            {d.foodItems[0]?.name} — {d.id}
          </option>
        ))}
      </select>

      {selected && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-800">{selected.foodItems[0]?.name}</h3>
            <StatusBadge status={selected.status} />
          </div>

          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.done ? "✓" : i + 1}
                </span>
                <div>
                  <p className={`text-sm font-medium ${step.done ? "text-gray-800" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                  {step.detail && <p className="text-xs text-gray-500">{step.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTrail;