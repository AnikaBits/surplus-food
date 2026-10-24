import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function DonorProfile() {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });

  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Keep the form in sync when the logged-in user changes
  useEffect(() => {
    setForm({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
    });

    setSaved(false);
    setIsEditing(false);
  }, [currentUser]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    // Demo only — does not update AuthContext or database
    setSaved(true);
    setIsEditing(false);
  }

  function handleCancel() {
    setForm({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
    });

    setIsEditing(false);
    setSaved(false);
  }

  const donorName = currentUser?.name || "FoodShare Donor";

  const donorType = currentUser?.donorType
    ? `${currentUser.donorType} Donor`
    : "Food Donor";

  const inputStyle =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300";

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            👤 Account Settings
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            My Profile
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            View your personal information and manage your
            FoodShare donor profile.
          </p>

        </div>

      </div>

      {/* PROFILE OVERVIEW */}
      <div className="bg-white border border-green-100 rounded-3xl shadow-sm overflow-hidden">

        {/* COVER */}
        <div className="h-28 sm:h-36 bg-gradient-to-r from-green-700 via-emerald-600 to-green-400 relative">

          <div className="absolute top-5 right-6 text-white/20 text-6xl">
            🌿
          </div>

        </div>

        <div className="px-6 sm:px-9 pb-8">

          {/* AVATAR */}
          <div className="-mt-12 relative flex flex-col sm:flex-row sm:items-end gap-5">

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-green-100 shadow-lg overflow-hidden flex items-center justify-center shrink-0">

              {currentUser?.image ? (
                <img
                  src={currentUser.image}
                  alt={donorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl">
                  👤
                </span>
              )}

            </div>

            <div className="sm:pb-1 min-w-0">

              <h3 className="text-2xl sm:text-3xl font-extrabold text-green-950 break-words">
                {donorName}
              </h3>

              <p className="mt-2 text-gray-500 text-sm break-all">
                {currentUser?.email || "No email available"}
              </p>

              <span className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold capitalize">
                💚 {donorType}
              </span>

            </div>

          </div>

          {/* PROFILE SUMMARY */}
          <div className="mt-8 pt-7 border-t border-gray-100 grid sm:grid-cols-3 gap-5">

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="text-xs font-semibold text-green-600">
                Account Role
              </p>

              <p className="mt-2 font-bold text-green-950 capitalize">
                {currentUser?.role || "Donor"}
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="text-xs font-semibold text-green-600">
                Donor Type
              </p>

              <p className="mt-2 font-bold text-green-950 capitalize">
                {currentUser?.donorType || "Not specified"}
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="text-xs font-semibold text-green-600">
                Account Status
              </p>

              <p className="mt-2 font-bold text-green-950 capitalize">
                {currentUser?.status || "Not specified"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* PERSONAL INFORMATION */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* MAIN FORM */}
        <div className="lg:col-span-2">

          <div className="bg-white border border-green-100 rounded-3xl shadow-sm overflow-hidden">

            {/* FORM HEADER */}
            <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                  📝
                </div>

                <div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your donor account details
                  </p>

                </div>

              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setSaved(false);
                    setIsEditing(true);
                  }}
                  className="px-5 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl font-semibold text-sm hover:bg-green-100 transition"
                >
                  ✏️ Edit Profile
                </button>
              )}

            </div>

            <div className="p-6 sm:p-8">

              {/* DEMO SUCCESS */}
              {saved && (
                <div
                  role="status"
                  className="mb-7 bg-green-50 border border-green-200 rounded-2xl p-5"
                >

                  <p className="font-bold text-green-800">
                    ✅ Demo profile changes recorded in this form.
                  </p>

                  <p className="mt-2 text-sm text-green-700">
                    Changes are not saved to your account or database.
                    Reloading the page will restore the original information.
                  </p>

                </div>
              )}

              <form
                onSubmit={handleSave}
                className="space-y-6"
              >

                {/* FULL NAME */}
                <div>

                  <label
                    htmlFor="profileName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="profileName"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                    className={`${inputStyle} ${
                      !isEditing
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label
                    htmlFor="profileEmail"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="profileEmail"
                    type="email"
                    value={currentUser?.email || ""}
                    disabled
                    readOnly
                    className={`${inputStyle} opacity-75 cursor-not-allowed`}
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Your email address cannot be changed here.
                  </p>

                </div>

                {/* PHONE */}
                <div>

                  <label
                    htmlFor="profilePhone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="profilePhone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className={`${inputStyle} ${
                      !isEditing
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  />

                </div>

                {/* ADDRESS */}
                <div>

                  <label
                    htmlFor="profileAddress"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Address
                  </label>

                  <textarea
                    id="profileAddress"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    rows={4}
                    className={`${inputStyle} resize-none ${
                      !isEditing
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  />

                </div>

                {/* BUTTONS */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-3">

                    <button
                      type="submit"
                      className="flex-1 px-6 py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      💚 Save Demo Changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>

                  </div>
                )}

              </form>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ACCOUNT DETAILS */}
          <div className="bg-white border border-green-100 rounded-3xl p-7 shadow-sm">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
              👤
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-green-950">
              Account Details
            </h3>

            <div className="mt-6 space-y-5">

              <div className="pb-4 border-b border-gray-100">

                <p className="text-xs text-gray-400">
                  Account Name
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-800 break-words">
                  {donorName}
                </p>

              </div>

              <div className="pb-4 border-b border-gray-100">

                <p className="text-xs text-gray-400">
                  Email Address
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-800 break-all">
                  {currentUser?.email || "Not available"}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Account Type
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-800 capitalize">
                  {donorType}
                </p>

              </div>

            </div>

          </div>

          {/* COMMUNITY CARD */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-800 to-emerald-600 rounded-3xl p-7 text-white shadow-lg">

            <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative">

              <div className="text-4xl">
                🌱
              </div>

              <h3 className="mt-5 text-2xl font-extrabold">
                Thank You for Being a Donor!
              </h3>

              <p className="mt-4 text-sm text-green-50/90 leading-7">
                Your participation helps build a community
                focused on reducing food waste and sharing
                resources with people in need.
              </p>

              <div className="mt-6 pt-5 border-t border-white/20">

                <p className="text-sm font-semibold">
                  Together, We Make a Difference.
                </p>

              </div>

            </div>

          </div>

          {/* DEMO NOTICE */}
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-7">

            <div className="text-3xl">
              ⚠️
            </div>

            <h3 className="mt-4 text-lg font-bold text-amber-900">
              Profile Editing Notice
            </h3>

            <p className="mt-3 text-sm text-amber-800 leading-7">
              Profile editing is currently a demo feature.
              Changes are stored only in this form's local state
              and are not saved permanently.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DonorProfile;