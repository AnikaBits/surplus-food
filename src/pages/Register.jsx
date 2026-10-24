import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { searchRestaurantsByName } from "../services/restaurantApi";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "donor",
    donorType: "individual",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [placeQuery, setPlaceQuery] = useState("");
  const [placeResults, setPlaceResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeSearching, setPlaceSearching] = useState(false);
  const [placeError, setPlaceError] = useState("");

  const isRestaurantDonor =
    form.role === "donor" && form.donorType === "restaurant";

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  // Search the restaurant's real place on OpenStreetMap
  async function handlePlaceSearch() {
    if (!placeQuery.trim()) return;

    setPlaceSearching(true);
    setPlaceError("");
    setPlaceResults([]);

    try {
      const results = await searchRestaurantsByName(placeQuery);
      setPlaceResults(results);

      if (results.length === 0) {
        setPlaceError(
          "No matching place found. You can still register manually — the admin will verify your restaurant."
        );
      }
    } catch (err) {
      setPlaceError(
        "Search failed. You can still register manually below."
      );
    } finally {
      setPlaceSearching(false);
    }
  }

  function handleSelectPlace(place) {
    setSelectedPlace(place);
    setForm((prev) => ({ ...prev, name: place.name }));
    setPlaceResults([]);
    setPlaceError("");
  }

  // Handle registration
  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("সব ঘর পূরণ করুন।");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("পাসওয়ার্ড মিলছে না।");
      return;
    }

    const result = register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      donorType: form.role === "donor" ? form.donorType : undefined,
      restaurantPlace:
        isRestaurantDonor && selectedPlace ? selectedPlace : undefined,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  // Common input style
  const inputStyle =
    "w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300";

  const labelStyle =
    "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 sm:px-6 py-10">

      {/* Main Register Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE - BRANDING */}
        <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-500 text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden">

          {/* Background Decorations */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20">

                🌱

              </div>

              <div>
                <h2 className="text-2xl font-extrabold">
                  FoodShare
                </h2>

                <p className="text-xs text-green-100">
                  Share Food. Spread Hope.
                </p>
              </div>

            </Link>

            {/* Main Heading */}
            <h1 className="mt-14 text-4xl sm:text-5xl font-extrabold leading-tight">

              Be the Reason

              <br />

              <span className="text-green-200">
                Someone Smiles.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 text-green-50/90 text-lg leading-8 max-w-md">

              Join FoodShare and become part of a community
              dedicated to reducing food waste and helping
              people in need.

              Together, we can turn surplus food into hope.

            </p>

            {/* Benefits */}
            <div className="mt-10 space-y-4">

              {/* Benefit 1 */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 shrink-0 bg-white/15 rounded-xl flex items-center justify-center text-2xl">

                  🍱

                </div>

                <div>

                  <h3 className="font-bold">
                    Share Surplus Food
                  </h3>

                  <p className="text-sm text-green-100 mt-1">
                    Help reduce food waste through donations.
                  </p>

                </div>

              </div>

              {/* Benefit 2 */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 shrink-0 bg-white/15 rounded-xl flex items-center justify-center text-2xl">

                  🤝

                </div>

                <div>

                  <h3 className="font-bold">
                    Connect With NGOs
                  </h3>

                  <p className="text-sm text-green-100 mt-1">
                    Work together to support communities.
                  </p>

                </div>

              </div>

              {/* Benefit 3 */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 shrink-0 bg-white/15 rounded-xl flex items-center justify-center text-2xl">

                  💚

                </div>

                <div>

                  <h3 className="font-bold">
                    Make a Difference
                  </h3>

                  <p className="text-sm text-green-100 mt-1">
                    Every small contribution creates impact.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Message */}
          <p className="relative z-10 mt-12 text-sm text-green-100">

            🌍 Together, let's create a world with less waste.

          </p>

        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">

          {/* Badge */}
          <div className="inline-flex self-start items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">

            <span className="text-green-700 text-sm font-semibold">
              🌿 Join Our Community
            </span>

          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-green-950">

            Create Account

          </h2>

          <p className="mt-3 text-gray-500 leading-7">

            Start your journey with FoodShare and
            make a positive impact today.

          </p>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
            >

              ⚠️ {error}

            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              role="status"
              className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm"
            >

              ✅ {success}

            </div>
          )}

          {/* Register Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* Full Name */}
            <div>

              <label
                htmlFor="register-name"
                className={labelStyle}
              >
                Full Name
              </label>

              <input
                id="register-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputStyle}
              />

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="register-email"
                className={labelStyle}
              >
                Email Address
              </label>

              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputStyle}
              />

            </div>

            {/* Role Selection */}
            <div>

              <label
                htmlFor="register-role"
                className={labelStyle}
              >
                Register As
              </label>

              <select
                id="register-role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className={inputStyle}
              >

                <option value="donor">
                  🍱 Donor
                </option>

                <option value="ngo">
                  🤝 NGO / Volunteer
                </option>

              </select>

            </div>

            {/* Donor Type - Only for Donor */}
            {form.role === "donor" && (
              <div>

                <label
                  htmlFor="register-donor-type"
                  className={labelStyle}
                >
                  Donor Type
                </label>

                <select
                  id="register-donor-type"
                  name="donorType"
                  value={form.donorType}
                  onChange={handleChange}
                  className={inputStyle}
                >

                  <option value="individual">
                    Individual
                  </option>

                  <option value="restaurant">
                    Restaurant
                  </option>

                  <option value="business">
                    Business
                  </option>

                </select>

              </div>
            )}

            {/* Find Restaurant - Only for Restaurant Donors */}
            {isRestaurantDonor && (
              <div className="bg-green-50/70 border border-green-100 rounded-2xl p-5 space-y-4">

                <div>

                  <label
                    htmlFor="register-place-search"
                    className={labelStyle}
                  >
                    📍 Find Your Restaurant on the Map
                  </label>

                  <p className="text-xs text-gray-500 leading-5">
                    Search your restaurant's real name and select it.
                    This helps the admin verify your restaurant faster.
                  </p>

                </div>

                {selectedPlace ? (

                  <div className="bg-white border-2 border-green-500 rounded-xl p-4">

                    <p className="font-bold text-green-950">
                      ✅ {selectedPlace.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1 leading-5">
                      {selectedPlace.address}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedPlace(null)}
                      className="mt-3 text-xs font-bold text-red-600 hover:text-red-800 transition"
                    >
                      Remove — search again
                    </button>

                  </div>

                ) : (

                  <>

                    <div className="flex gap-2">

                      <input
                        id="register-place-search"
                        type="text"
                        value={placeQuery}
                        onChange={(e) => setPlaceQuery(e.target.value)}
                        placeholder="Your restaurant's name"
                        className={`${inputStyle.replace("bg-gray-50", "bg-white")} !py-3 text-sm`}
                      />

                      <button
                        type="button"
                        onClick={handlePlaceSearch}
                        disabled={placeSearching}
                        className="shrink-0 px-5 bg-gradient-to-r from-green-700 to-emerald-500 text-white text-sm font-bold rounded-xl shadow hover:shadow-lg transition disabled:opacity-60"
                      >
                        {placeSearching ? "Searching..." : "Search"}
                      </button>

                    </div>

                    {placeError && (
                      <p className="text-xs text-gray-500 leading-5">
                        {placeError}
                      </p>
                    )}

                    {placeResults.length > 0 && (
                      <div className="space-y-2">

                        {placeResults.map((place) => (

                          <button
                            key={place.osmId}
                            type="button"
                            onClick={() => handleSelectPlace(place)}
                            className="w-full text-left bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-green-500 hover:shadow transition"
                          >

                            <p className="font-semibold text-gray-800 text-sm">
                              {place.name}
                            </p>

                            <p className="text-xs text-gray-500 mt-0.5 leading-5">
                              {place.address}
                            </p>

                          </button>

                        ))}

                      </div>
                    )}

                    <p className="text-xs text-gray-400 leading-5">
                      Not on the map? No problem — complete the form
                      normally and the admin will verify you manually.
                    </p>

                  </>

                )}

              </div>
            )}

            {/* Password */}
            <div>

              <label
                htmlFor="register-password"
                className={labelStyle}
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={`${inputStyle} pr-20`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-700 hover:text-green-900"
                >

                  {showPassword ? "Hide" : "Show"}

                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label
                htmlFor="register-confirm-password"
                className={labelStyle}
              >
                Confirm Password
              </label>

              <div className="relative">

                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={`${inputStyle} pr-20`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-700 hover:text-green-900"
                >

                  {showConfirmPassword ? "Hide" : "Show"}

                </button>

              </div>

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={Boolean(success)}
              className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              Create FoodShare Account →

            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-7">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-green-700 font-bold hover:text-green-900 transition"
            >

              Login Here

            </Link>

          </p>

          {/* Back to Homepage */}
          <div className="mt-6 text-center">

            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-green-700 transition"
            >

              ← Back to Homepage

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
