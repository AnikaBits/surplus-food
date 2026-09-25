// ============================================================
// NEW FILE — src/pages/donor/sections/DonationHistory.jsx
// ============================================================
// Feature List এর "Donation History & Stats" — মোট donation,
// মোট meals দান করা হয়েছে তার সংখ্যা কার্ড আকারে।
// ============================================================

import { useAuth } from "../../../context/AuthContext";

function DonationHistory() {
  const { currentUser, donations } = useAuth();

  const myDonations = donations.filter((d) => d.donorId === currentUser.id);
  const completedDonations = myDonations.filter(
    (d) => d.status === "delivered"
  );

  const totalDonations = myDonations.length;
  const totalMeals = myDonations.reduce((sum, d) => {
    const num = parseInt(d.totalQuantity) || 0;
    return sum + num;
  }, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Donation History & Stats</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-700">
            {totalDonations}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Donations</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{totalMeals}</p>
          <p className="text-sm text-gray-500 mt-1">Total Meals Donated</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-700">
            {completedDonations.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Completed Deliveries</p>
        </div>
      </div>

      <h3 className="font-semibold text-gray-700 mb-3">Past Donations</h3>
      <div className="space-y-2">
        {myDonations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-lg shadow-sm p-3 flex justify-between text-sm"
          >
            <span>{d.foodItems[0]?.name}</span>
            <span className="text-gray-500">{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonationHistory;