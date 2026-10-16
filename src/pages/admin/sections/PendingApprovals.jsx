import { useAuth } from "../../../context/AuthContext";
import { Icon } from "../../../components/LiveStats";

function PendingApprovals() {
  const { users, approveUser, rejectUser } = useAuth();

  const pendingUsers = users.filter((u) => u.status === "pending");

  if (pendingUsers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm p-10 text-center max-w-xl">
        <span className="mx-auto w-14 h-14 rounded-full bg-[#DDF2E2] text-[#2F7A55] flex items-center justify-center">
          <Icon name="check" className="w-6 h-6" />
        </span>
        <h2 className="mt-4 text-lg font-semibold text-[#0F2E22]">All caught up</h2>
        <p className="mt-1 text-sm text-[#3B4F43]">No pending registrations right now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-3xl">
      {pendingUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-2xl border border-[#0F2E22]/10 shadow-sm p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img src={user.image} alt="" className="w-12 h-12 rounded-full object-cover bg-[#ECE4C8]" />
            <div className="min-w-0">
              <p className="font-semibold text-[#14231B] truncate">{user.name}</p>
              <p className="text-sm text-[#3B4F43] truncate">{user.email}</p>
              <span
                className={`inline-block mt-1 text-xs font-semibold rounded-full px-2.5 py-0.5 ${
                  user.role === "donor" ? "bg-[#FFE9A8] text-[#8A5A00]" : "bg-[#DDF2E2] text-[#2F7A55]"
                }`}
              >
                {user.role === "donor" ? `Donor (${user.donorType})` : "NGO / Volunteer"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => approveUser(user.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F2E22] text-white text-sm font-semibold hover:bg-[#184230] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22]"
            >
              <Icon name="check" className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => rejectUser(user.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#E5322D]/40 text-[#C42A26] text-sm font-semibold hover:bg-[#FFF0EE] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5322D]"
            >
              <Icon name="x" className="w-4 h-4" />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingApprovals;