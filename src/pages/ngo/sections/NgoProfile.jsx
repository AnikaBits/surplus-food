import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function NgoProfile() {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });

  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Keep form synchronized when the logged-in user changes
  useEffect(() => {
    setForm({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
    });

    setIsEditing(false);
    setSaved(false);
  }, [
    currentUser?.id,
    currentUser?.name,
    currentUser?.phone,
    currentUser?.address,
  ]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    // Demo only: changes are not written to AuthContext/database.
    setSaved(true);
    setIsEditing(false);
  }

  function handleReset() {
    setForm({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
    });

    setSaved(false);
    setIsEditing(false);
  }

  const ngoName = currentUser?.name || "FoodShare Partner";

  const displayName = form.name || ngoName;

  const hasChanges =
    form.name !== (currentUser?.name || "") ||
    form.phone !== (currentUser?.phone || "") ||
    form.address !== (currentUser?.address || "");

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            👤 Organization Account
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Organization Profile
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            View your organization details and manage
            your FoodShare profile information.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">
              💚
            </span>

            <div>
              <p className="text-xs text-green-100">
                Your Account
              </p>

              <p className="font-bold">
                NGO / Volunteer Partner
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* PROFILE OVERVIEW */}
      <div className="bg-white border border-green-100 rounded-3xl overflow-hidden shadow-sm">

        {/* COVER */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-green-700 via-emerald-600 to-green-400 relative">

          <div className="absolute top-5 right-6 bg-white/20 border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full">
            🌿 FoodShare Partner
          </div>

        </div>

        <div className="px-6 sm:px-9 pb-8">

          {/* AVATAR */}
          <div className="relative -mt-12 sm:-mt-14 flex flex-col sm:flex-row sm:items-end gap-5">

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-4 border-white bg-green-100 shadow-lg overflow-hidden flex items-center justify-center shrink-0">

              {currentUser?.image ? (
                <img
                  src={currentUser.image}
                  alt={ngoName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl">
                  🏢
                </span>
              )}

            </div>

            <div className="flex-1 sm:pb-2">

              <h3 className="text-2xl sm:text-3xl font-extrabold text-green-950 break-words">
                {displayName}
              </h3>

              <p className="mt-2 text-sm font-semibold text-green-700">
                NGO / Volunteer Organization
              </p>

            </div>

            <div className="sm:pb-2">

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 border border-green-100 rounded-full text-sm font-bold">
                🟢 NGO Account
              </span>

            </div>

          </div>

          {/* PROFILE INFORMATION */}
          <div className="mt-9 grid md:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">

              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                📧
              </div>

              <p className="mt-4 text-xs font-semibold text-gray-500">
                Email Address
              </p>

              <p className="mt-2 text-sm font-bold text-green-950 break-all">
                {currentUser?.email || "Not provided"}
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">

              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                📞
              </div>

              <p className="mt-4 text-xs font-semibold text-gray-500">
                Phone Number
              </p>

              <p className="mt-2 text-sm font-bold text-green-950 break-words">
                {form.phone || "Not provided"}
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">

              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                📍
              </div>

              <p className="mt-4 text-xs font-semibold text-gray-500">
                Organization Address
              </p>

              <p className="mt-2 text-sm font-bold text-green-950 break-words">
                {form.address || "Not provided"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* EDIT PROFILE SECTION */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-9 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              ✏️ Profile Information
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Review or edit your organization details
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                handleReset();
              } else {
                setIsEditing(true);
                setSaved(false);
              }
            }}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition ${
              isEditing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-green-50 text-green-800 hover:bg-green-100"
            }`}
          >
            {isEditing ? "✕ Cancel Editing" : "✏️ Edit Profile"}
          </button>

        </div>

        {/* DEMO NOTICE */}
        <div className="mb-7 bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">

          <div className="flex items-start gap-3">

            <span className="text-xl">
              ℹ️
            </span>

            <div>

              <p className="font-bold text-amber-900 text-sm">
                Demo Profile Editing
              </p>

              <p className="mt-1 text-sm text-amber-800 leading-6">
                Profile changes are currently shown in this
                page only. They are not saved to the
                database or your account.
              </p>

            </div>

          </div>

        </div>

        {/* SUCCESS MESSAGE */}
        {saved && (
          <div
            role="status"
            className="mb-7 bg-green-50 border border-green-200 rounded-2xl p-5"
          >

            <div className="flex items-start gap-3">

              <span className="text-xl">
                ✅
              </span>

              <div>

                <p className="font-bold text-green-900">
                  Changes Applied in Demo!
                </p>

                <p className="mt-1 text-sm text-green-700">
                  Your profile preview has been updated.
                  These changes are not permanently saved.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSave} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            {/* ORGANIZATION NAME */}
            <div>

              <label
                htmlFor="ngoName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Organization Name
              </label>

              <input
                id="ngoName"
                type="text"
                name="name"
                required
                disabled={!isEditing}
                value={form.name}
                onChange={handleChange}
                placeholder="Enter organization name"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-70 disabled:cursor-not-allowed transition"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label
                htmlFor="ngoEmail"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="ngoEmail"
                type="email"
                value={currentUser?.email || ""}
                disabled
                className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />

              <p className="mt-2 text-xs text-gray-400">
                Email address cannot be changed here.
              </p>

            </div>

            {/* PHONE */}
            <div>

              <label
                htmlFor="ngoPhone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="ngoPhone"
                type="tel"
                name="phone"
                value={form.phone}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-70 disabled:cursor-not-allowed transition"
              />

            </div>

            {/* ACCOUNT ROLE */}
            <div>

              <label
                htmlFor="ngoRole"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Account Role
              </label>

              <input
                id="ngoRole"
                type="text"
                value="NGO / Volunteer"
                disabled
                className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />

            </div>

          </div>

          {/* ADDRESS */}
          <div>

            <label
              htmlFor="ngoAddress"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Organization Address
            </label>

            <textarea
              id="ngoAddress"
              name="address"
              rows="4"
              value={form.address}
              disabled={!isEditing}
              onChange={handleChange}
              placeholder="Enter your organization address"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-70 disabled:cursor-not-allowed resize-none transition"
            />

          </div>

          {/* BUTTONS */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 pt-5 border-t border-gray-100">

              <button
                type="submit"
                disabled={!form.name.trim()}
                className="px-8 py-3.5 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                💾 Save Changes (Demo)
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
              >
                🔄 Reset Changes
              </button>

            </div>
          )}

          {!isEditing && (
            <div className="pt-5 border-t border-gray-100">

              <p className="text-sm text-gray-500">
                🔒 Click{" "}
                <span className="font-bold text-green-800">
                  Edit Profile
                </span>{" "}
                to modify your organization information.
              </p>

            </div>
          )}

          {hasChanges && isEditing && (
            <p className="text-sm text-amber-700 font-medium">
              ⚠️ You have unsaved demo changes.
            </p>
          )}

        </form>

      </div>

      {/* INFORMATION CARD */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💚
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              Your Role in FoodShare
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              As an NGO or volunteer partner, you can
              request available food, manage collections,
              record distribution activities, and rate
              donors after successful deliveries.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NgoProfile;