import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function AddFood() {
  const { currentUser, donations, setDonations } = useAuth();

  const initialForm = {
    foodName: "",
    quantity: "",
    category: "Cooked Meal",
    preparationTime: "",
    expiryTime: "",
    pickupLocation: currentUser?.address || "",
    pickupTimeWindow: "",
    foodImage: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newDonation = {
      id: `food${Date.now()}`,
      donorId: currentUser.id,
      foodItems: [
        {
          name: form.foodName,
          quantity: form.quantity,
        },
      ],
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

    setDonations((prev) => [...prev, newDonation]);

    setSuccessMsg("Food donation posted successfully!");

    setForm({
      ...initialForm,
      pickupLocation: currentUser?.address || "",
    });

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  }

  const inputStyle =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300";

  const labelStyle =
    "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">

      {/* WELCOME HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-10 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            🌱 Food Donation Management
          </span>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Share Food, Spread Hope.
          </h1>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Have extra food? Make a difference by sharing it
            with people who need it. Fill out the form below
            to create a new food donation.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">💚</span>

            <div>
              <p className="text-xs text-green-100">
                Welcome back
              </p>

              <p className="font-bold">
                {currentUser?.name || "FoodShare Donor"}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* DONATION FORM */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">

            {/* FORM HEADER */}
            <div className="p-7 sm:p-9 border-b border-gray-100">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                  🍱
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-green-950">
                    Post a New Food Donation
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the details of the food you want to share.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-7 sm:p-9">

              {/* SUCCESS MESSAGE */}
              {successMsg && (
                <div
                  role="status"
                  className="mb-7 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-medium"
                >
                  ✅ {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">

                {/* FOOD INFORMATION */}
                <div>

                  <h3 className="text-lg font-bold text-green-900 mb-5">
                    🥗 Food Information
                  </h3>

                  <div className="space-y-5">

                    <div>
                      <label htmlFor="foodName" className={labelStyle}>
                        Food Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="foodName"
                        type="text"
                        name="foodName"
                        value={form.foodName}
                        onChange={handleChange}
                        placeholder="e.g., Cooked Rice & Chicken"
                        required
                        className={inputStyle}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">

                      <div>
                        <label htmlFor="quantity" className={labelStyle}>
                          Quantity <span className="text-red-500">*</span>
                        </label>

                        <input
                          id="quantity"
                          type="text"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleChange}
                          placeholder="e.g., 20 meals"
                          required
                          className={inputStyle}
                        />
                      </div>

                      <div>
                        <label htmlFor="category" className={labelStyle}>
                          Food Category
                        </label>

                        <select
                          id="category"
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className={inputStyle}
                        >
                          <option>Cooked Meal</option>
                          <option>Bakery</option>
                          <option>Fruits</option>
                          <option>Snacks</option>
                          <option>Other</option>
                        </select>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="border-t border-gray-100"></div>

                {/* FOOD SAFETY */}
                <div>

                  <h3 className="text-lg font-bold text-green-900 mb-5">
                    ⏰ Food Preparation & Safety
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>
                      <label
                        htmlFor="preparationTime"
                        className={labelStyle}
                      >
                        Preparation Time
                      </label>

                      <input
                        id="preparationTime"
                        type="text"
                        name="preparationTime"
                        value={form.preparationTime}
                        onChange={handleChange}
                        placeholder="e.g., 2:00 PM"
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label htmlFor="expiryTime" className={labelStyle}>
                        Expiry Time <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="expiryTime"
                        type="text"
                        name="expiryTime"
                        value={form.expiryTime}
                        onChange={handleChange}
                        placeholder="e.g., 8:00 PM"
                        required
                        className={inputStyle}
                      />
                    </div>

                  </div>

                </div>

                <div className="border-t border-gray-100"></div>

                {/* PICKUP DETAILS */}
                <div>

                  <h3 className="text-lg font-bold text-green-900 mb-5">
                    📍 Pickup Information
                  </h3>

                  <div className="space-y-5">

                    <div>
                      <label
                        htmlFor="pickupLocation"
                        className={labelStyle}
                      >
                        Pickup Location <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="pickupLocation"
                        type="text"
                        name="pickupLocation"
                        value={form.pickupLocation}
                        onChange={handleChange}
                        placeholder="Enter pickup address"
                        required
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pickupTimeWindow"
                        className={labelStyle}
                      >
                        Pickup Time Window
                      </label>

                      <input
                        id="pickupTimeWindow"
                        type="text"
                        name="pickupTimeWindow"
                        value={form.pickupTimeWindow}
                        onChange={handleChange}
                        placeholder="e.g., 6 PM - 8 PM"
                        className={inputStyle}
                      />
                    </div>

                  </div>

                </div>

                <div className="border-t border-gray-100"></div>

                {/* ADDITIONAL DETAILS */}
                <div>

                  <h3 className="text-lg font-bold text-green-900 mb-5">
                    📝 Additional Details
                  </h3>

                  <div className="space-y-5">

                    <div>
                      <label
                        htmlFor="foodImage"
                        className={labelStyle}
                      >
                        Food Image URL
                        <span className="ml-2 text-xs text-gray-400">
                          (Optional)
                        </span>
                      </label>

                      <input
                        id="foodImage"
                        type="url"
                        name="foodImage"
                        value={form.foodImage}
                        onChange={handleChange}
                        placeholder="https://example.com/food.jpg"
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className={labelStyle}
                      >
                        Description
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the food, ingredients, allergens, packaging, etc."
                        rows={5}
                        className={`${inputStyle} resize-none`}
                      />
                    </div>

                  </div>

                </div>

                {/* SUBMIT */}
                <div className="pt-3">

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    🍱 Post Food Donation →
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    Please ensure that the food is safe and suitable
                    for donation.
                  </p>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE INFORMATION */}
        <div className="space-y-6">

          {/* GUIDELINES CARD */}
          <div className="bg-white border border-green-100 rounded-3xl p-7 shadow-sm">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
              📋
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-green-950">
              Donation Guidelines
            </h3>

            <p className="mt-3 text-gray-500 text-sm leading-7">
              Follow these tips to make your donation
              safe and helpful.
            </p>

            <div className="mt-6 space-y-5">

              <div className="flex items-start gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Make sure the food is fresh and safe to consume.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Provide accurate quantity and expiry information.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Mention any known allergens in the description.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Keep the food properly stored until pickup.
                </p>
              </div>

            </div>

          </div>

          {/* IMPACT CARD */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-800 to-emerald-600 rounded-3xl p-7 text-white shadow-lg">

            <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative">

              <div className="text-4xl">
                💚
              </div>

              <h3 className="mt-5 text-2xl font-extrabold">
                Every Meal Matters
              </h3>

              <p className="mt-4 text-green-50/90 text-sm leading-7">
                Your surplus food can help support
                someone in need while reducing food waste.
              </p>

              <div className="mt-7 pt-5 border-t border-white/20">

                <p className="text-sm font-semibold">
                  Share Food. Spread Hope.
                </p>

              </div>

            </div>

          </div>

          {/* QUICK TIP */}
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-7">

            <div className="text-3xl">
              💡
            </div>

            <h3 className="mt-4 text-lg font-bold text-amber-900">
              Quick Tip
            </h3>

            <p className="mt-3 text-sm text-amber-800 leading-7">
              Adding a food image and clear pickup
              instructions can help NGOs understand
              your donation more easily.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddFood;