// src/pages/Register.jsx
// নতুন ডিজাইন, লজিক আগের মতোই: validate → register({...}) → /login-এ পাঠানো।
// role এখন দুটো বড় কার্ডে বাছা যায়, donorType তিনটা পিলে।
// দরকার: components/AuthLayout.jsx, components/LiveStats.jsx (Icon)

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout, { Field } from "../components/AuthLayout";
import { Icon } from "../components/LiveStats";

const ROLES = [
  { id: "donor", icon: "bowl", title: "Donor", text: "I have food to give" },
  { id: "ngo", icon: "handshake", title: "NGO / Volunteer", text: "I collect and deliver food" },
];

const DONOR_TYPES = [
  { id: "individual", label: "Individual" },
  { id: "restaurant", label: "Restaurant" },
  { id: "business", label: "Business" },
];

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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function choose(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

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
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);
    setTimeout(() => navigate("/login"), 1500);
  }

  const toggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? "Hide passwords" : "Show passwords"}
      className="p-2 rounded-lg text-[#3B4F43] hover:bg-[#F2B01E]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B01E]"
    >
      <Icon name={showPassword ? "eyeoff" : "eye"} className="w-[18px] h-[18px]" />
    </button>
  );

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Join FoodShare and make surplus food count."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#0F2E22] underline underline-offset-4 decoration-2 decoration-[#F2B01E] hover:decoration-[#0F2E22]"
          >
            Log in
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
      {success && (
        <div
          role="status"
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#2F7A55]/30 bg-[#E6F6EA] px-4 py-3 text-sm text-[#1F5C45]"
        >
          <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* role বাছাই */}
        <fieldset>
          <legend className="block text-sm font-medium text-[#0F2E22] mb-1.5">I am joining as</legend>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => {
              const selected = form.role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => choose("role", r.id)}
                  aria-pressed={selected}
                  className={`text-left rounded-2xl border-2 p-3.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22] ${
                    selected
                      ? "border-[#F2B01E] bg-[#FFF6DB]"
                      : "border-[#0F2E22]/15 bg-white hover:border-[#F2B01E]/60"
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      selected ? "bg-[#0F2E22] text-[#F2B01E]" : "bg-[#ECE4C8] text-[#5A4300]"
                    }`}
                  >
                    <Icon name={r.icon} className="w-[18px] h-[18px]" />
                  </span>
                  <span className="mt-2 block font-semibold text-sm text-[#0F2E22]">{r.title}</span>
                  <span className="block text-xs text-[#3B4F43]">{r.text}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* donorType (শুধু donor হলে) */}
        {form.role === "donor" && (
          <fieldset>
            <legend className="block text-sm font-medium text-[#0F2E22] mb-1.5">Donor type</legend>
            <div className="flex flex-wrap gap-2">
              {DONOR_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => choose("donorType", t.id)}
                  aria-pressed={form.donorType === t.id}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22] ${
                    form.donorType === t.id
                      ? "bg-[#0F2E22] text-white"
                      : "bg-white border border-[#0F2E22]/20 text-[#3B4F43] hover:bg-[#FFF6DB]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <Field
          label="Full name"
          id="name"
          icon="user"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name or organisation"
          autoComplete="name"
        />

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

        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Password"
            id="password"
            icon="lock"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            autoComplete="new-password"
          />
          <Field
            label="Confirm password"
            id="confirmPassword"
            icon="lock"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat it"
            autoComplete="new-password"
            right={toggle}
          />
        </div>

        <p className="text-xs text-[#3B4F43] leading-5">
          New accounts are reviewed by an admin before you can post or request food.
        </p>

        <button
          type="submit"
          className="w-full rounded-full bg-[#0F2E22] py-3.5 font-semibold text-white shadow-lg shadow-[#0F2E22]/20 hover:bg-[#184230] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22]"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;