// src/pages/Login.jsx
// নতুন ডিজাইন, লজিক আগের মতোই: login(email, password) → role অনুযায়ী ড্যাশবোর্ডে।
// দরকার: components/AuthLayout.jsx, components/LiveStats.jsx (Icon)

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout, { Field } from "../components/AuthLayout";
import { Icon } from "../components/LiveStats";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    // App.jsx-এর রুট অনুযায়ী: /donor/dashboard, /ngo/dashboard, /admin/dashboard
    navigate(`/${result.user.role}/dashboard`);
  }

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Log in to your FoodShare account."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#0F2E22] underline underline-offset-4 decoration-2 decoration-[#F2B01E] hover:decoration-[#0F2E22]"
          >
            Register
          </Link>
        </>
      }
    >
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#E5322D]/30 bg-[#FFF0EE] px-4 py-3 text-sm text-[#B3231F]"
        >
          <Icon name="ban" className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Email address"
          id="email"
          icon="mail"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Field
          label="Password"
          id="password"
          icon="lock"
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Your password"
          autoComplete="current-password"
          right={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="p-2 rounded-lg text-[#3B4F43] hover:bg-[#F2B01E]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B01E]"
            >
              <Icon name={showPassword ? "eyeoff" : "eye"} className="w-[18px] h-[18px]" />
            </button>
          }
        />

        <button
          type="submit"
          className="w-full rounded-full bg-[#0F2E22] py-3.5 font-semibold text-white shadow-lg shadow-[#0F2E22]/20 hover:bg-[#184230] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22]"
        >
          Log in
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;