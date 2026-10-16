import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";
import { Icon } from "../../../components/LiveStats";

const ROLE_FILTERS = [
  { id: "all", label: "All" },
  { id: "donor", label: "Donors" },
  { id: "ngo", label: "NGOs" },
];

function AllUsers() {
  const { users, toggleBlockUser } = useAuth();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const nonAdminUsers = users.filter((u) => u.role !== "admin");

  const visible = nonAdminUsers.filter((u) => {
    const matchesRole = role === "all" || u.role === role;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative w-full sm:w-72">
          <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3B4F43]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            aria-label="Search users"
            className="w-full rounded-full border border-[#0F2E22]/20 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2B01E]"
          />
        </div>

        <div className="flex gap-1.5" role="group" aria-label="Filter by role">
          {ROLE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setRole(f.id)}
              aria-pressed={role === f.id}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                role === f.id
                  ? "bg-[#0F2E22] text-white"
                  : "bg-white border border-[#0F2E22]/15 text-[#3B4F43] hover:bg-[#FFF6DB]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-[#3B4F43] ml-auto tabular-nums">
          {visible.length} of {nonAdminUsers.length} users
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF6DB] text-[#5A4300] text-left">
              <tr>
                <th className="p-3.5 font-semibold">Name</th>
                <th className="p-3.5 font-semibold">Role</th>
                <th className="p-3.5 font-semibold">Email</th>
                <th className="p-3.5 font-semibold">Status</th>
                <th className="p-3.5 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((user) => (
                <tr key={user.id} className="border-t border-[#0F2E22]/10 hover:bg-[#F6F7F2]">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={user.image} alt="" className="w-9 h-9 rounded-full object-cover bg-[#ECE4C8]" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`text-xs font-semibold rounded-full px-2.5 py-1 capitalize ${
                        user.role === "donor" ? "bg-[#FFE9A8] text-[#8A5A00]" : "bg-[#DDF2E2] text-[#2F7A55]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#3B4F43]">{user.email}</td>
                  <td className="p-3.5">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-3.5">
                    {user.status !== "pending" && (
                      <button
                        onClick={() => toggleBlockUser(user.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                          user.status === "blocked"
                            ? "bg-[#DDF2E2] text-[#2F7A55] hover:bg-[#C7EBD0]"
                            : "bg-[#FFE0D8] text-[#C42A26] hover:bg-[#FFCFC3]"
                        }`}
                      >
                        <Icon name={user.status === "blocked" ? "check" : "ban"} className="w-3.5 h-3.5" />
                        {user.status === "blocked" ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#3B4F43]">
                    No users match this search.
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

export default AllUsers;