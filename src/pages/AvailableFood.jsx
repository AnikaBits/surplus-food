import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function AvailableFood() {
  const { currentUser, donations, users } = useAuth();
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState("");

  const availableFood = donations.filter(
    (d) =>
      d.status === "available" &&
      d.pickupLocation.toLowerCase().includes(locationFilter.toLowerCase())
  );

  function getDonorName(id) {
    const donor = users.find((u) => u.id === id);
    return donor ? donor.name : "Unknown Donor";
  }

  function handleRequestClick() {
    // Public visitor বা login না করা কেউ Request চাপলে Login পেজে পাঠানো হচ্ছে
    if (!currentUser || currentUser.role !== "ngo") {
      navigate("/login");
      return;
    }
    navigate("/ngo/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#f8faf6]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-green-700 text-center">Available Food</h1>
        <p className="text-center text-gray-600 mt-3">
          Browse surplus food currently available for pickup across the city.
        </p>

        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {availableFood.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No available food listings right now.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {availableFood.map((donation) => (
            <div key={donation.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-green-100">
              <img src={donation.foodImage} alt={donation.foodItems[0]?.name} className="w-full h-44 object-cover" />
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{donation.foodItems[0]?.name}</h3>
                  <StatusBadge status={donation.status} />
                </div>
                <p className="text-sm text-gray-500 mt-2">By: {getDonorName(donation.donorId)}</p>
                <p className="text-sm text-gray-500">Quantity: {donation.totalQuantity}</p>
                <p className="text-sm text-gray-500">📍 {donation.pickupLocation}</p>
                <p className="text-sm text-gray-500">⏰ Until {donation.expiryTime}</p>

                <button
                  onClick={handleRequestClick}
                  className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700"
                >
                  Request Food
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AvailableFood;