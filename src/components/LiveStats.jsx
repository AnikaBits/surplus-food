// src/components/LiveStats.jsx
// "Live impact" সেকশন (হলুদ + গাঢ় সবুজ থিম)।
// "LIVE IMPACT" লাল পিলের ভেতরের সাদা ডটটা জরুরি-বাতির মতো একবার জ্বলে, একবার নেভে (লেখা স্থির থাকে)।
// এই ফাইল থেকে `Icon` ও এক্সপোর্ট হয়, Home পেজও এটা ব্যবহার করে।
//
//   import LiveStats, { Icon } from "../components/LiveStats";
//
//   <LiveStats
//     stats={[
//       { icon: "bowl", value: 25, label: "Meals delivered" },
//       { icon: "truck", value: 30, label: "Awaiting pickup" },
//       { icon: "handshake", value: 2, label: "NGO partners" },
//       { icon: "users", value: 40, label: "People reached" },
//     ]}
//     progress={{ percent: 45, label: "Delivered so far" }}
//   />

import { useEffect, useState } from "react";

// ---------- আইকন (সরাসরি SVG, কোনো লাইব্রেরি লাগে না) ----------
const ICONS = {
  bowl: (
    <>
      <path d="M7 21h10" />
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
      <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
      <path d="m13 12 4-4" />
      <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
    </>
  ),
  truck: (
    <>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  check: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  shield: (
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  ),
  bolt: (
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  ),
  star: (
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  flag: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  list: (
    <>
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
      <path d="M3 6h.01" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M8 6h13" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
};

export function Icon({ name, className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

// ---------- চলমান সংখ্যা ----------
function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!end) {
      setCount(0);
      return;
    }
    let current = 0;
    const step = Math.max(1, Math.ceil(end / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [end]);

  return <>{count.toLocaleString()}</>;
}

// হলুদ আর হালকা হলুদ কার্ড পালাক্রমে
const TONES = [
  { card: "bg-[#F2B01E]", ring: "border-[#0F2E22]/30 text-[#0F2E22]", label: "text-[#3D2C00]" },
  { card: "bg-[#FFF1CC]", ring: "border-[#E0A21B] text-[#8A5A00]", label: "text-[#5A4300]" },
  { card: "bg-[#F2B01E]", ring: "border-[#0F2E22]/30 text-[#0F2E22]", label: "text-[#3D2C00]" },
  { card: "bg-[#FFF1CC]", ring: "border-[#E0A21B] text-[#8A5A00]", label: "text-[#5A4300]" },
];

function LiveStats({ stats = [], progress }) {
  const percent = Math.max(0, Math.min(100, progress?.percent ?? 0));

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      {/* ডটের জ্বলা-নেভা অ্যানিমেশন */}
      <style>{`
        @keyframes liveBlink {
          0%, 49%   { opacity: 1;   box-shadow: 0 0 0 3px rgba(255,255,255,.35), 0 0 10px 3px rgba(255,255,255,.9); }
          50%, 100% { opacity: .15; box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        .live-blink { animation: liveBlink 1.2s steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) { .live-blink { animation: none; } }
      `}</style>

      <div className="rounded-[2rem] bg-[#0F2E22] p-5 md:p-7">
        <div className="grid lg:grid-cols-[0.8fr_2.2fr] gap-6 items-center">
          {/* বাঁয়ে: পিল (শুধু ডট জ্বলে) + হেডলাইন */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E5322D] px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white">
              <span className="live-blink w-2.5 h-2.5 rounded-full bg-white" aria-hidden="true" />
              Live impact
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-tight text-white">
              Small actions. <span className="text-[#F2B01E]">Real impact.</span>
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#A9BFB0]">
              Every rescued meal brings us closer to a world with less food waste.
            </p>
          </div>

          {/* ডানে: ৪টা কার্ড */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => {
              const tone = TONES[i % TONES.length];
              return (
                <div key={s.label} className={`relative rounded-2xl ${tone.card} p-4`}>
                  <span
                    className={`w-11 h-11 rounded-full border-2 bg-white/60 flex items-center justify-center ${tone.ring}`}
                  >
                    <Icon name={s.icon} className="w-5 h-5" />
                  </span>
                  <dd className="mt-3 text-4xl font-bold tabular-nums leading-none text-[#0F2E22]">
                    <Counter end={s.value} />
                  </dd>
                  <dt className={`mt-1.5 text-sm leading-snug ${tone.label}`}>{s.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>

        {/* progress bar */}
        {progress && (
          <div className="mt-5 flex items-center gap-3 md:gap-4 rounded-full border border-white/15 bg-white/10 px-4 py-2.5">
            <Icon name="bowl" className="w-5 h-5 shrink-0 text-[#F2B01E]" />
            <span className="text-sm font-medium text-white whitespace-nowrap">{progress.label}</span>
            <div
              className="flex-1 h-2.5 rounded-full bg-white/15 overflow-hidden"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={progress.label}
            >
              <div
                className="h-full rounded-full bg-[#F2B01E] motion-safe:transition-all motion-safe:duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-sm font-semibold tabular-nums text-[#F2B01E]">{percent}%</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default LiveStats;