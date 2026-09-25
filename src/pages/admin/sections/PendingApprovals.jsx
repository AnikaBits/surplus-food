import { useAuth } from "../../../context/AuthContext";

function PendingApprovals() {
  const { users, approveUser, rejectUser } = useAuth();

  const pendingUsers = users.filter((u) => u.status === "pending");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>

      {pendingUsers.length === 0 && (
        <p className="text-gray-500">No pending registrations right now.</p>
      )}

      <div className="space-y-3">
        {pendingUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.email} • {user.role === "donor" ? `Donor (${user.donorType})` : "NGO/Volunteer"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approveUser(user.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => rejectUser(user.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingApprovals;