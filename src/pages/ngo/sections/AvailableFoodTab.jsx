import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function AvailableFoodTab() {
  const { currentUser, donations, setDonations, users } = useAuth();
  const [locationFilter, setLocationFilter] = useState("");

  const availableFood = donations.filter(
    (d) =>
      d.status === "available" &&
      d.pickupLocation.toLowerCase().includes(locationFilter.toLowerCase())
  );

  function getDonorName(donorId) {
    const donor = users.find((u) => u.id === donorId);
    return donor ? donor.name : "Unknown Donor";
  }

  function handleRequest(donationId) {
    setDonations(
      donations.map((d) =>
        d.id === donationId
          ? { ...d, status: "requested", requestedBy: currentUser.id }
          : d
      )
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Food</h2>

      <input
        type="text"
        placeholder="Filter by location..."
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="mb-4 w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2.5"
      />

      {availableFood.length === 0 && (
        <p className="text-gray-500">No available food listings right now.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableFood.map((donation) => (
          <div key={donation.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <img src={donation.foodImage} alt={donation.foodItems[0]?.name} className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{donation.foodItems[0]?.name}</h3>
                <StatusBadge status={donation.status} />
              </div>
              <p className="text-sm text-gray-500 mt-1">By: {getDonorName(donation.donorId)}</p>
              <p className="text-sm text-gray-500">Quantity: {donation.totalQuantity}</p>
              <p className="text-sm text-gray-500">📍 {donation.pickupLocation}</p>
              <p className="text-sm text-gray-500">⏰ Until {donation.expiryTime}</p>

              <button
                onClick={() => handleRequest(donation.id)}
                className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
              >
                Request Food
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableFoodTab;