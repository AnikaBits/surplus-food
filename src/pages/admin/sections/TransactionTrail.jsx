import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";
import { Icon } from "../../../components/LiveStats";

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
        { label: "Donor posted", done: true, detail: getUserName(selected.donorId) },
        {
          label: "Requested by NGO",
          done: !!selected.requestedBy,
          detail: selected.requestedBy ? getUserName(selected.requestedBy) : "Waiting for a request",
        },
        {
          label: "Donor approved",
          done: ["approved", "picked_up", "on_the_way", "delivered"].includes(selected.status),
        },
        {
          label: "Picked up",
          done: ["picked_up", "on_the_way", "delivered"].includes(selected.status),
          detail: selected.pickedUpAt ? new Date(selected.pickedUpAt).toLocaleString() : undefined,
        },
        {
          label: "Delivered",
          done: selected.status === "delivered",
          detail: selected.deliveredAt ? new Date(selected.deliveredAt).toLocaleString() : undefined,
        },
        {
          label: "Distributed",
          done: !!selected.distribution,
          detail: selected.distribution
            ? `${selected.distribution.area}, about ${selected.distribution.estimatedPeopleHelped} people`
            : undefined,
        },
      ]
    : [];

  const doneCount = steps.filter((s) => s.done).length;

  if (donations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm p-10 text-center max-w-xl">
        <p className="text-[#3B4F43]">No donations to trace yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <label className="block text-sm font-medium text-[#3B4F43]">
        Choose a donation
        <select
          value={selectedId || ""}
          onChange={(e) => setSelectedId(e.target.value)}
          className="mt-1.5 block w-full sm:w-96 rounded-full border border-[#0F2E22]/20 bg-white px-4 py-2.5 text-sm text-[#14231B] focus:outline-none focus:ring-2 focus:ring-[#F2B01E]"
        >
          {donations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.foodItems?.[0]?.name} ({d.id})
            </option>
          ))}
        </select>
      </label>

      {selected && (
        <div className="mt-5 bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F2E22] px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{selected.foodItems?.[0]?.name}</h2>
              <p className="text-sm text-[#A9BFB0] tabular-nums">
                {doneCount} of {steps.length} steps complete
              </p>
            </div>
            <StatusBadge status={selected.status} />
          </div>

          <ol className="p-5 sm:p-6">
            {steps.map((step, i) => (
              <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && (
                  <span
                    className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${
                      step.done && steps[i + 1].done ? "bg-[#0F2E22]" : "bg-[#0F2E22]/15"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done ? "bg-[#F2B01E] text-[#0F2E22]" : "bg-[#ECE4C8] text-[#8A7A4A]"
                  }`}
                >
                  {step.done ? <Icon name="check" className="w-4 h-4" /> : i + 1}
                </span>
                <div className="pt-1">
                  <p className={`text-sm font-semibold ${step.done ? "text-[#14231B]" : "text-[#8A8F8A]"}`}>
                    {step.label}
                  </p>
                  {step.detail && <p className="text-sm text-[#3B4F43] mt-0.5">{step.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default TransactionTrail;