import { useAuth } from "../../../context/AuthContext";

function NgoHistory() {
  const { currentUser, donations } = useAuth();

  const myCollections = donations.filter((d) => d.requestedBy === currentUser.id);
  const totalCollected = myCollections.length;
  const totalDelivered = myCollections.filter((d) => d.status === "delivered").length;
  const totalPeopleHelped = myCollections.reduce(
    (sum, d) => sum + (d.distribution?.estimatedPeopleHelped || 0),
    0
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">History & Stats</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{totalCollected}</p>
          <p className="text-sm text-gray-500 mt-1">Total Food Collected</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{totalDelivered}</p>
          <p className="text-sm text-gray-500 mt-1">Total Distributed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{totalPeopleHelped}</p>
          <p className="text-sm text-gray-500 mt-1">People Helped</p>
        </div>
      </div>

      <div className="space-y-2">
        {myCollections.map((d) => (
          <div key={d.id} className="bg-white rounded-lg shadow-sm p-3 flex justify-between text-sm">
            <span>{d.foodItems[0]?.name}</span>
            <span className="text-gray-500">{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NgoHistory;