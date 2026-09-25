import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function RateDonor() {
  const { currentUser, donations, setDonations, users } = useAuth();

  const deliveredUnrated = donations.filter(
    (d) => d.requestedBy === currentUser.id && d.status === "delivered" && !d.rating
  );

  const [ratings, setRatings] = useState({});

  function getDonorName(donorId) {
    const donor = users.find((u) => u.id === donorId);
    return donor ? donor.name : "Unknown";
  }

  function submitRating(donationId) {
    const rating = ratings[donationId];
    if (!rating) return;

    setDonations(
      donations.map((d) => (d.id === donationId ? { ...d, rating } : d))
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rate Donor</h2>

      {deliveredUnrated.length === 0 && (
        <p className="text-gray-500">No deliveries pending feedback.</p>
      )}

      <div className="space-y-4">
        {deliveredUnrated.map((donation) => (
          <div key={donation.id} className="bg-white rounded-xl shadow-sm p-4">
            <p className="font-medium text-gray-800">
              {donation.foodItems[0]?.name} — from {getDonorName(donation.donorId)}
            </p>

            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatings((prev) => ({ ...prev, [donation.id]: star }))}
                  className={`text-2xl ${
                    (ratings[donation.id] || 0) >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <button
              onClick={() => submitRating(donation.id)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
            >
              Submit Rating
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RateDonor;