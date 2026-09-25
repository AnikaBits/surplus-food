// ============================================================
// NEW FILE — src/pages/donor/sections/MyDonations.jsx
// ============================================================
// Feature List এর "My Donations" — নিজের donation list, এবং
// কোন volunteer/NGO সেটা নিয়েছে তা দেখানো।
// ============================================================

import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function MyDonations() {
  const { currentUser, donations, users } = useAuth();

  const myDonations = donations.filter((d) => d.donorId === currentUser.id);

  function getNgoName(ngoId) {
    if (!ngoId) return null;
    const ngo = users.find((u) => u.id === ngoId);
    return ngo ? ngo.name : "Unknown";
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Donations</h2>

      {myDonations.length === 0 && (
        <p className="text-gray-500">You haven't posted any donations yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {myDonations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <img
              src={donation.foodImage}
              alt={donation.foodItems[0]?.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">
                  {donation.foodItems[0]?.name}
                </h3>
                <StatusBadge status={donation.status} />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Quantity: {donation.totalQuantity}
              </p>
              <p className="text-sm text-gray-500">
                Pickup: {donation.pickupLocation}
              </p>

              {donation.requestedBy && (
                <p className="text-sm mt-2 text-green-700 font-medium">
                  Claimed by: {getNgoName(donation.requestedBy)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyDonations;