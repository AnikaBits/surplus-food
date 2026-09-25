import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function MyCollections() {
  const { currentUser, donations, setDonations, users } = useAuth();

  const myCollections = donations.filter((d) => d.requestedBy === currentUser.id);

  function getDonorName(donorId) {
    const donor = users.find((u) => u.id === donorId);
    return donor ? donor.name : "Unknown Donor";
  }

  const statusFlow = ["approved", "picked_up", "on_the_way", "delivered"];

  function advanceStatus(donation) {
    const currentIndex = statusFlow.indexOf(donation.status);
    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) return;

    const nextStatus = statusFlow[currentIndex + 1];
    const updates = { status: nextStatus };
    if (nextStatus === "picked_up") updates.pickedUpAt = new Date().toISOString();
    if (nextStatus === "delivered") updates.deliveredAt = new Date().toISOString();

    setDonations(
      donations.map((d) => (d.id === donation.id ? { ...d, ...updates } : d))
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Collections</h2>

      {myCollections.length === 0 && (
        <p className="text-gray-500">You haven't requested any food yet.</p>
      )}

      <div className="space-y-4">
        {myCollections.map((donation) => {
          const currentIndex = statusFlow.indexOf(donation.status);
          const canAdvance = currentIndex !== -1 && currentIndex < statusFlow.length - 1;

          return (
            <div key={donation.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{donation.foodItems[0]?.name}</h3>
                  <p className="text-sm text-gray-500">From: {getDonorName(donation.donorId)}</p>
                  <p className="text-sm text-gray-500">Quantity: {donation.totalQuantity}</p>
                  <p className="text-sm text-gray-500">📍 {donation.pickupLocation}</p>
                </div>
                <StatusBadge status={donation.status} />
              </div>

              {donation.status === "requested" && (
                <p className="text-xs text-yellow-600 mt-3">Waiting for donor approval...</p>
              )}

              {canAdvance && (
                <button
                  onClick={() => advanceStatus(donation)}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Mark as {statusFlow[currentIndex + 1].replace("_", " ")}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyCollections;