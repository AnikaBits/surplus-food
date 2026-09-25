// ============================================================
// NEW FILE — src/pages/donor/sections/DonorRequests.jsx
// ============================================================
// Feature List এর "Requests" — কোন NGO/volunteer request করেছে
// তার list, Approve/Reject করার বাটন।
// ============================================================

import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge";

function DonorRequests() {
  const { currentUser, donations, setDonations, users } = useAuth();

  // শুধু "requested" status এর donation গুলোই এখানে দেখানো হবে
  const pendingRequests = donations.filter(
    (d) => d.donorId === currentUser.id && d.status === "requested"
  );

  function getNgoName(ngoId) {
    const ngo = users.find((u) => u.id === ngoId);
    return ngo ? ngo.name : "Unknown NGO";
  }

  function handleApprove(donationId) {
    setDonations(
      donations.map((d) =>
        d.id === donationId ? { ...d, status: "approved" } : d
      )
    );
  }

  function handleReject(donationId) {
    setDonations(
      donations.map((d) =>
        d.id === donationId
          ? { ...d, status: "available", requestedBy: null }
          : d
      )
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>

      {pendingRequests.length === 0 && (
        <p className="text-gray-500">No pending requests right now.</p>
      )}

      <div className="space-y-4">
        {pendingRequests.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                {donation.foodItems[0]?.name} ({donation.totalQuantity})
              </h3>
              <p className="text-sm text-gray-500">
                Requested by:{" "}
                <span className="font-medium text-gray-700">
                  {getNgoName(donation.requestedBy)}
                </span>
              </p>
              <StatusBadge status={donation.status} />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(donation.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(donation.id)}
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

export default DonorRequests;