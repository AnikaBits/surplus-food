import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // matches App.jsx's actual route paths: /donor/dashboard, /ngo/dashboard, /admin/dashboard
    navigate(`/${result.user.role}/dashboard`);
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Login to your FoodShare account
        </p>

        {error && (
          <p className="mt-4 text-red-600 text-center text-sm">{error}</p>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold hover:text-green-700">
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login