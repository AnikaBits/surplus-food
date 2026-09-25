// ============================================================
// NEW FILE — src/pages/donor/sections/AddFood.jsx
// ============================================================
// Feature List এর "Add Food" — নতুন food donation post করার ফর্ম।
// এখানে সব required field আছে: food items, quantity, prep/expiry
// time, pickup location/window, image, description.
// ============================================================

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function AddFood() {
  const { currentUser, donations, setDonations } = useAuth();

  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    category: "Cooked Meal",
    preparationTime: "",
    expiryTime: "",
    pickupLocation: currentUser?.address || "",
    pickupTimeWindow: "",
    foodImage: "",
    description: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newDonation = {
      id: `food${Date.now()}`,
      donorId: currentUser.id,
      foodItems: [{ name: form.foodName, quantity: form.quantity }],
      totalQuantity: form.quantity,
      category: form.category,
      preparationTime: form.preparationTime,
      expiryTime: form.expiryTime,
      pickupLocation: form.pickupLocation,
      pickupTimeWindow: form.pickupTimeWindow,
      description: form.description,
      foodImage:
        form.foodImage ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      status: "available",
      requestedBy: null,
      pickedUpAt: null,
      deliveredAt: null,
      distribution: null,
      createdAt: new Date().toISOString(),
    };

    setDonations([...donations, newDonation]);
    setSuccessMsg("Food donation posted successfully!");

    setForm({
      foodName: "",
      quantity: "",
      category: "Cooked Meal",
      preparationTime: "",
      expiryTime: "",
      pickupLocation: currentUser?.address || "",
      pickupTimeWindow: "",
      foodImage: "",
      description: "",
    });

    setTimeout(() => setSuccessMsg(""), 3000);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Post a New Food Donation</h2>

      {successMsg && (
        <p className="mb-4 text-green-600 text-sm font-medium">{successMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="foodName"
          value={form.foodName}
          onChange={handleChange}
          placeholder="Food Name (e.g., Cooked Rice & Chicken)"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity (e.g., 20 meals)"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          >
            <option>Cooked Meal</option>
            <option>Bakery</option>
            <option>Fruits</option>
            <option>Snacks</option>
            <option>Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="preparationTime"
            value={form.preparationTime}
            onChange={handleChange}
            placeholder="Preparation Time (e.g., 2:00 PM)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
          <input
            type="text"
            name="expiryTime"
            value={form.expiryTime}
            onChange={handleChange}
            placeholder="Expiry Time (e.g., 8:00 PM)"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <input
          type="text"
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />

        <input
          type="text"
          name="pickupTimeWindow"
          value={form.pickupTimeWindow}
          onChange={handleChange}
          placeholder="Pickup Time Window (e.g., 6 PM - 8 PM)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />

        <input
          type="text"
          name="foodImage"
          value={form.foodImage}
          onChange={handleChange}
          placeholder="Food Image URL (optional)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (veg/non-veg, allergens, etc.)"
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Post Donation
        </button>
      </form>
    </div>
  );
}

export default AddFood;