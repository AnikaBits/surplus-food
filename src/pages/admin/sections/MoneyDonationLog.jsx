import { useAuth } from "../../../context/AuthContext";

function MoneyDonationLog() {
  const { moneyDonations, users } = useAuth();

  function getDonorName(id) {
    const donor = users.find((u) => u.id === id);
    return donor ? donor.name : "Unknown";
  }

  const total = moneyDonations.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Money Donation Log</h2>

      <p className="mb-4 text-lg font-semibold text-green-700">Total Collected: ৳{total}</p>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-3">Donor</th>
              <th className="p-3">Method</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {moneyDonations.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="p-3">{getDonorName(p.donorId)}</td>
                <td className="p-3">{p.method}</td>
                <td className="p-3 font-semibold text-green-700">৳{p.amount}</td>
                <td className="p-3 text-gray-500">{new Date(p.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MoneyDonationLog;