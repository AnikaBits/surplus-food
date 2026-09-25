import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function AllUsers() {
  const { users, toggleBlockUser } = useAuth();

  const nonAdminUsers = users.filter((u) => u.role !== "admin");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {nonAdminUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-100">
                <td className="p-3 flex items-center gap-2">
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                  {user.name}
                </td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 text-gray-500">{user.email}</td>
                <td className="p-3"><StatusBadge status={user.status} /></td>
                <td className="p-3">
                  {user.status !== "pending" && (
                    <button
                      onClick={() => toggleBlockUser(user.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        user.status === "blocked"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {user.status === "blocked" ? "Unblock" : "Block"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;