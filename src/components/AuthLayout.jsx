// src/components/AuthLayout.jsx
// Login ও Register পেজের একই চেহারা: বাঁয়ে ছবির ওপর গাঢ় সবুজ প্যানেল, ডানে ফর্ম।
// Field: লেবেল + আইকনসহ ইনপুট (দুই পেজেই ব্যবহার হয়)।

import { Link } from "react-router-dom";
import { Icon } from "./LiveStats";

const FONT = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" };

const POINTS = [
  { icon: "bolt", text: "Food closest to expiring is shown first" },
  { icon: "shield", text: "Every donor and NGO is approved by an admin" },
  { icon: "route", text: "Follow each pickup until it is delivered" },
];

export function Field({ label, id, icon, right, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#0F2E22] mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#3B4F43]/70 pointer-events-none"
          />
        )}
        <input
          id={id}
          {...inputProps}
          className={`w-full rounded-xl border border-[#0F2E22]/20 bg-white py-3 text-sm text-[#14231B] placeholder:text-[#3B4F43]/50 focus:outline-none focus:ring-2 focus:ring-[#F2B01E] focus:border-[#F2B01E] ${
            icon ? "pl-11" : "pl-4"
          } ${right ? "pr-12" : "pr-4"}`}
        />
        {right && <div className="absolute right-2 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
    </div>
  );
}

function AuthLayout({ heading, subheading, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#14231B] grid lg:grid-cols-[0.9fr_1.1fr]" style={FONT}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&display=swap');`}</style>

      {/* ============ বাঁ পাশ: ছবি + বার্তা (বড় স্ক্রিনে) ============ */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0F2E22] p-10 text-white">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F2E22]/85" aria-hidden="true" />
        <span className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#F2B01E]/20" aria-hidden="true" />

        <Link
          to="/"
          className="relative text-2xl font-bold tracking-tight w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B01E]"
        >
          Food<span className="text-[#F2B01E]">Share</span>
        </Link>

        <div className="relative">
          <h2 className="text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight">
            Good food has a clock on it.
          </h2>
          <p className="mt-4 max-w-md text-[#DCE9E0] leading-7">
            Join the people who make sure surplus food reaches a plate before it spoils.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-full bg-[#F2B01E] text-[#0F2E22] flex items-center justify-center">
                  <Icon name={p.icon} className="w-5 h-5" />
                </span>
                <span className="text-sm text-[#EAF4EE]">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-[#A9BFB0]">Save food. Serve people. Reduce waste.</p>
      </aside>

      {/* ============ ডান পাশ: ফর্ম ============ */}
      <main className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/"
            className="lg:hidden inline-block mb-8 text-2xl font-bold tracking-tight text-[#0F2E22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B01E]"
          >
            Food<span className="text-[#E0A21B]">Share</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F2E22]">{heading}</h1>
          <p className="mt-2 text-[#3B4F43]">{subheading}</p>

          <div className="mt-8">{children}</div>

          {footer && <p className="mt-8 text-center text-sm text-[#3B4F43]">{footer}</p>}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;