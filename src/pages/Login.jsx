import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  // Handle login
  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Redirect user based on role
    navigate(`/${result.user.role}/dashboard`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 sm:px-6 py-10">

      {/* Main Login Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE - BRANDING */}
        <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-500 text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden">

          {/* Background Decorations */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"></div>

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

              Good Food.

              <br />

              <span className="text-green-200">
                Better Purpose.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 text-green-50/90 text-lg leading-8 max-w-md">

              Every meal matters.

              Join our mission to reduce food waste,
              connect communities and make sure
              surplus food reaches people who need it.

            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 shrink-0 bg-white/15 rounded-xl flex items-center justify-center text-2xl">

                  🍱

                </div>

                <div>
                  <h3 className="font-bold">
                    Reduce Food Waste
                  </h3>

                  <p className="text-sm text-green-100 mt-1">
                    Give surplus food a meaningful purpose.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 shrink-0 bg-white/15 rounded-xl flex items-center justify-center text-2xl">

                  🤝

                </div>

                <div>
                  <h3 className="font-bold">
                    Connect Communities
                  </h3>

                  <p className="text-sm text-green-100 mt-1">
                    Bring donors and NGOs together.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">

                <div className="w-12 h-12 shrink-0 bg-white/15 rounded-xl flex items-center justify-center text-2xl">

                  💚

                </div>

                <div>
                  <h3 className="font-bold">
                    Create Real Impact
                  </h3>

                  <p className="text-sm text-green-100 mt-1">
                    Make a difference with every donation.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Text */}
          <p className="relative z-10 mt-12 text-sm text-green-100">

            🌍 Together, we can build a better future.

          </p>

        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-center">

          {/* Small Badge */}
          <div className="inline-flex self-start items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">

            <span className="text-green-700 text-sm font-semibold">
              🌿 Welcome to FoodShare
            </span>

          </div>

          {/* Heading */}
          <h2 className="mt-7 text-3xl sm:text-4xl font-extrabold text-green-950">

            Welcome Back!

          </h2>

          <p className="mt-3 text-gray-500 leading-7">

            Login to your account and continue making
            a difference in your community.

          </p>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
            >

              ⚠️ {error}

            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-9 space-y-6"
          >

            {/* Email Field */}
            <div>

              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
              />

            </div>

            {/* Password Field */}
            <div>

              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="w-full px-5 py-4 pr-20 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                />

                {/* Show / Hide Password */}
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              Login to FoodShare →

            </button>

          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-8">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-green-700 font-bold hover:text-green-900 transition"
            >

              Create Account

            </Link>

          </p>

          {/* Back Home */}
          <div className="mt-7 text-center">

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

export default Login;