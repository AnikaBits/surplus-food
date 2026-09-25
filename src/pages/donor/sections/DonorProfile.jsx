// ============================================================
// NEW FILE — src/pages/donor/sections/DonorProfile.jsx
// ============================================================
// Feature List এর "Profile" — নিজের তথ্য দেখা/edit করা।
// ============================================================

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function DonorProfile() {
  const { currentUser, users, setDonations, donations } = useAuth(); 
  // ⚠️ নোট: users update করার জন্য AuthContext এ updateUserProfile
  // ফাংশনটা এখনো নেই — নিচে editMode শুধু local state এ থাকবে,
  // চাইলে পরে AuthContext এ setUsers এক্সপোর্ট করে এটাকে permanent
  // save করা যাবে।

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {saved && (
        <p className="mb-4 text-green-600 text-sm font-medium">
          Profile updated (demo — not yet saved permanently)
        </p>
      )}

      <form
        onSubmit={handleSave}
        className="bg-white rounded-xl shadow-sm p-6 space-y-4"
      >
        <div className="flex items-center gap-4 mb-2">
          <img
            src={currentUser?.image}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="font-semibold">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser?.donorType} Donor
            </p>
          </div>
        </div>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
        <input
          type="text"
          value={currentUser?.email}
          disabled
          className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2.5 text-gray-500"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default DonorProfile;