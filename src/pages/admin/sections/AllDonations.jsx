import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function AllDonations() {
  const { donations, users } = useAuth();

  function getUserName(id) {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "—";
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Donations Overview</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-3">Food</th>
              <th className="p-3">Donor</th>
              <th className="p-3">Volunteer/NGO</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-t border-gray-100">
                <td className="p-3">{d.foodItems[0]?.name}</td>
                <td className="p-3">{getUserName(d.donorId)}</td>
                <td className="p-3">{d.requestedBy ? getUserName(d.requestedBy) : "—"}</td>
                <td className="p-3">{d.totalQuantity}</td>
                <td className="p-3"><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDonations;