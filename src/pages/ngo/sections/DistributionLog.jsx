import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function DistributionLog() {
  const { currentUser, donations, setDonations } = useAuth();

  const readyToLog = donations.filter(
    (d) => d.requestedBy === currentUser.id && d.status === "delivered" && !d.distribution
  );
  const alreadyLogged = donations.filter(
    (d) => d.requestedBy === currentUser.id && d.distribution
  );

  const [formData, setFormData] = useState({});

  function handleChange(donationId, field, value) {
    setFormData((prev) => ({
      ...prev,
      [donationId]: { ...prev[donationId], [field]: value },
    }));
  }

  function handleSubmit(donationId) {
    const data = formData[donationId];
    if (!data?.area || !data?.estimatedPeopleHelped) return;

    setDonations(
      donations.map((d) =>
        d.id === donationId
          ? {
              ...d,
              distribution: {
                area: data.area,
                estimatedPeopleHelped: Number(data.estimatedPeopleHelped),
                date: new Date().toISOString().split("T")[0],
              },
            }
          : d
      )
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Distribution Log</h2>

      {readyToLog.length === 0 && alreadyLogged.length === 0 && (
        <p className="text-gray-500">Nothing to log yet — deliver some food first.</p>
      )}

      {readyToLog.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">Pending Log Entry</h3>
          <div className="space-y-4">
            {readyToLog.map((donation) => (
              <div key={donation.id} className="bg-white rounded-xl shadow-sm p-4">
                <p className="font-medium text-gray-800 mb-3">{donation.foodItems[0]?.name}</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Distribution area"
                    onChange={(e) => handleChange(donation.id, "area", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Estimated people helped"
                    onChange={(e) => handleChange(donation.id, "estimatedPeopleHelped", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => handleSubmit(donation.id)}
                    className="bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                  >
                    Save Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alreadyLogged.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Logged Distributions</h3>
          <div className="space-y-2">
            {alreadyLogged.map((d) => (
              <div key={d.id} className="bg-white rounded-lg shadow-sm p-3 text-sm">
                <p className="font-medium">{d.foodItems[0]?.name}</p>
                <p className="text-gray-500">
                  Distributed in {d.distribution.area} — helped ~{d.distribution.estimatedPeopleHelped} people on {d.distribution.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DistributionLog;