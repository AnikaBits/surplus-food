import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

const STATUSES = ["available", "requested", "approved", "picked_up", "on_the_way", "delivered"];

function AllDonations() {
  const { donations, users } = useAuth();
  const [status, setStatus] = useState("all");

  function getUserName(id) {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "—";
  }

  const visible = donations.filter((d) => status === "all" || d.status === status);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#3B4F43]">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-full border border-[#0F2E22]/20 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2B01E]"
          >
            <option value="all">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>

        <p className="text-sm text-[#3B4F43] ml-auto tabular-nums">
          {visible.length} of {donations.length} donations
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF6DB] text-[#5A4300] text-left">
              <tr>
                <th className="p-3.5 font-semibold">Food</th>
                <th className="p-3.5 font-semibold">Donor</th>
                <th className="p-3.5 font-semibold">Volunteer / NGO</th>
                <th className="p-3.5 font-semibold">Quantity</th>
                <th className="p-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((d) => (
                <tr key={d.id} className="border-t border-[#0F2E22]/10 hover:bg-[#F6F7F2]">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      {d.foodImage && (
                        <img src={d.foodImage} alt="" className="w-10 h-10 rounded-lg object-cover bg-[#ECE4C8]" />
                      )}
                      <span className="font-medium">{d.foodItems?.[0]?.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5">{getUserName(d.donorId)}</td>
                  <td className="p-3.5 text-[#3B4F43]">{d.requestedBy ? getUserName(d.requestedBy) : "—"}</td>
                  <td className="p-3.5 tabular-nums">{d.totalQuantity}</td>
                  <td className="p-3.5">
                    <StatusBadge status={d.status} />
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#3B4F43]">
                    No donations with this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllDonations;