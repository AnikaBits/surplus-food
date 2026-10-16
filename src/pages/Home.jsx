// src/pages/Home.jsx
// হলুদ + গাঢ় সবুজ থিম (আগের হলুদ রঙে ফেরা), পাতা ও হার্ট ছাড়া।
// দরকার: utils/time.js, utils/priority.js, components/LiveStats.jsx,
//        assets/img1.jpg, assets/img2.jpg

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveStats, { Icon } from "../components/LiveStats";
import { useAuth } from "../context/AuthContext";
import { msRemaining, urgencyLevel, formatRemaining } from "../utils/time";
import { priorityScore } from "../utils/priority";

import heroImage from "../assets/img1.jpg";
import stepsImage from "../assets/img2.jpg";

const FONT = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" };
const SCRIPT = { fontFamily: "'Caveat', cursive" };

// অর্গানিক ব্লব আকৃতির ছবি
const BLOB_A = { borderRadius: "58% 42% 55% 45% / 48% 55% 45% 52%" };
const BLOB_B = { borderRadius: "45% 55% 42% 58% / 55% 45% 55% 45%" };

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    alt: "Community meal being shared",
    title: "Shared meals",
    text: "Cooked food reaches communities the same day.",
    tint: "bg-[#F2B01E]",
  },
  {
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800",
    alt: "Children eating together",
    title: "Children fed",
    text: "Orphanages and schools get fresh surplus.",
    tint: "bg-[#8FD19E]",
  },
  {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
    alt: "Volunteer handing out food",
    title: "Volunteers on the move",
    text: "Pickups and deliveries by people nearby.",
    tint: "bg-[#FF7A59]",
  },
];

function useNow(interval = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
}

const LEVEL_STYLE = {
  critical: { time: "text-[#FF7A59]", dot: "bg-[#FF7A59]" },
  urgent: { time: "text-[#F2B01E]", dot: "bg-[#F2B01E]" },
  safe: { time: "text-[#8FD19E]", dot: "bg-[#8FD19E]" },
  unknown: { time: "text-[#9DB3A5]", dot: "bg-[#9DB3A5]" },
};

function BoardRow({ donation, now }) {
  const ms = msRemaining(donation, now);
  const level = urgencyLevel(ms);
  const style = LEVEL_STYLE[level] || LEVEL_STYLE.unknown;

  return (
    <li className="grid grid-cols-[6.5rem_1fr] items-center gap-x-3 py-2.5 border-t border-white/10">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${style.dot} ${
            level === "critical" ? "motion-safe:animate-pulse" : ""
          }`}
          aria-hidden="true"
        />
        <span className={`text-lg font-semibold tabular-nums ${style.time}`}>
          {formatRemaining(ms)}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm text-[#EAF4EE] font-medium truncate">{donation.foodItems?.[0]?.name}</p>
        <p className="text-xs text-[#9DB3A5] truncate">
          {donation.totalQuantity} from {donation.pickupLocation}
        </p>
      </div>
    </li>
  );
}

function Home() {
  const { donations = [], users = [] } = useAuth();
  const now = useNow();

  const rescuable = donations
    .filter((d) => d.status === "available" && (msRemaining(d, now) ?? 1) > 0)
    .sort((a, b) => priorityScore(b, now) - priorityScore(a, now));

  const boardRows = rescuable.slice(0, 3);

  const qty = (d) => parseInt(d.totalQuantity, 10) || 0;
  const mealsDelivered = donations.filter((d) => d.status === "delivered").reduce((s, d) => s + qty(d), 0);
  const mealsWaiting = rescuable.reduce((s, d) => s + qty(d), 0);
  const activeNgos = users.filter((u) => u.role === "ngo" && u.status === "approved").length;
  const peopleReached = donations.reduce((s, d) => s + (d.distribution?.estimatedPeopleHelped || 0), 0);
  const totalMeals = donations.reduce((s, d) => s + qty(d), 0);
  const deliveredPercent = totalMeals ? Math.round((mealsDelivered / totalMeals) * 100) : 0;

  const stats = [
    { icon: "bowl", value: mealsDelivered, label: "Meals delivered" },
    { icon: "truck", value: mealsWaiting, label: "Awaiting pickup" },
    { icon: "handshake", value: activeNgos, label: "NGO partners" },
    { icon: "users", value: peopleReached, label: "People reached" },
  ];

  const steps = [
    { icon: "bowl", title: "Donor posts food", text: "Quantity, pickup spot and expiry time.", ring: "bg-[#FFE9A8] text-[#8A5A00]", top: "border-[#F2B01E]" },
    { icon: "search", title: "NGO claims it", text: "Soonest-to-expire food shows first.", ring: "bg-[#DDF2E2] text-[#2F7A55]", top: "border-[#8FD19E]" },
    { icon: "check", title: "Donor approves", text: "Confirms who is coming to collect.", ring: "bg-[#FFE0D8] text-[#D2542F]", top: "border-[#FF7A59]" },
    { icon: "truck", title: "Food is delivered", text: "Picked up, on the way, delivered.", ring: "bg-[#0F2E22] text-[#F2B01E]", top: "border-[#0F2E22]" },
  ];

  const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22]";

  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#14231B] overflow-x-hidden" style={FONT}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Caveat:wght@600&display=swap');`}</style>

      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-16 grid lg:grid-cols-[1fr_1.05fr] gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9A6B00]">
              Reduce food waste • Feed communities
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-[#0F2E22]">
              Good food has a clock on it.
            </h1>

            <p className="mt-5 text-base leading-7 text-[#3B4F43] max-w-lg">
              Restaurants, hotels and homes post what they can't use. NGOs and
              volunteers collect it before it spoils and deliver it to people
              who are hungry today.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/register"
                className={`inline-flex items-center px-7 py-3 rounded-full bg-[#0F2E22] text-white font-semibold hover:bg-[#184230] transition shadow-lg shadow-[#0F2E22]/20 ${focus}`}
              >
                Start donating
              </Link>
              <Link
                to="/available-food"
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F2B01E] text-[#0F2E22] font-semibold hover:bg-[#FFC53D] transition ${focus}`}
              >
                <Icon name="search" className="w-4 h-4" />
                Find food
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#3B4F43]">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="shield" className="w-4 h-4 text-[#2F7A55]" /> Safe, 3h+
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="bolt" className="w-4 h-4 text-[#E0A21B]" /> Urgent, 1 to 3h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" className="w-4 h-4 text-[#E2724A]" /> Critical, under 1h
              </span>
            </div>
          </div>

          {/* ব্লব ছবি + Rescue Board */}
          <div className="relative">
            <span className="absolute -top-4 -right-4 w-[92%] h-[92%] bg-[#F2B01E]" style={BLOB_B} aria-hidden="true" />
            <span className="absolute -bottom-3 left-8 w-32 h-32 rounded-full bg-[#FFE0D8]" aria-hidden="true" />
            <img
              src={heroImage}
              alt="Surplus food being shared"
              className="relative w-full h-[280px] lg:h-[330px] object-cover shadow-xl"
              style={BLOB_A}
            />

            <p
              className="hidden xl:block absolute -right-6 top-2 text-3xl leading-8 text-[#0F2E22] -rotate-6"
              style={SCRIPT}
              aria-hidden="true"
            >
              Share Food
              <br />
              Share Hope
            </p>

            <div
              className="absolute -bottom-10 left-2 right-2 sm:right-auto sm:-left-6 sm:w-80 bg-[#0F2E22] rounded-2xl p-4 shadow-2xl ring-4 ring-[#F6F7F2]"
              aria-live="polite"
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <h2 className="text-sm font-semibold text-[#EAF4EE]">Waiting for rescue</h2>
                <Link to="/available-food" className="text-xs font-semibold text-[#F2B01E] hover:underline underline-offset-4">
                  See all
                </Link>
              </div>

              {boardRows.length === 0 ? (
                <p className="border-t border-white/10 pt-2.5 text-xs text-[#9DB3A5]">
                  Nothing is waiting right now. New posts appear here with a countdown.
                </p>
              ) : (
                <ul>
                  {boardRows.map((d) => (
                    <BoardRow key={d.id} donation={d} now={now} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ LIVE IMPACT ============ */}
      <div className="mt-6">
        <LiveStats stats={stats} progress={{ percent: deliveredPercent, label: "Delivered so far" }} />
      </div>

      {/* ============ HOW IT WORKS ============ */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <div className="relative max-w-md mx-auto lg:max-w-none w-full">
          <span className="absolute -bottom-3 -left-3 w-[92%] h-[92%] bg-[#F2B01E]" style={BLOB_A} aria-hidden="true" />
          <span className="absolute -top-3 right-4 w-24 h-24 rounded-full bg-[#FFE0D8]" aria-hidden="true" />
          <img
            src={stepsImage}
            alt="Food being packed for delivery"
            className="relative w-full h-[260px] lg:h-[300px] object-cover shadow-lg"
            style={BLOB_B}
          />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9A6B00]">How it works</p>
          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-[#0F2E22] leading-tight">
            From a kitchen to a plate, before the food turns.
          </h2>

          <ol className="mt-6 grid sm:grid-cols-2 gap-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`bg-white rounded-2xl p-4 border-t-4 ${s.top} shadow-sm flex gap-3 items-start`}
              >
                <span className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${s.ring}`}>
                  <Icon name={s.icon} className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#0F2E22]/50 tabular-nums">Step {i + 1}</p>
                  <h3 className="font-semibold leading-snug text-[#14231B]">{s.title}</h3>
                  <p className="mt-0.5 text-sm text-[#3B4F43] leading-5">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ GALLERY: Where the food ends up ============ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0F2E22] leading-tight">
            Where the food ends up.
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {GALLERY.map((g) => (
              <figure key={g.title} className="relative">
                <div className={`absolute -bottom-2 -right-2 w-full h-full rounded-3xl ${g.tint}`} aria-hidden="true" />
                <div className="relative h-60 rounded-3xl overflow-hidden group">
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-12 bg-gradient-to-t from-[#0F2E22] via-[#0F2E22]/60 to-transparent">
                    <p className="font-semibold text-white">{g.title}</p>
                    <p className="text-xs text-[#DCE9E0]">{g.text}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MISSION BANNER (ছবির ব্যাকগ্রাউন্ড) ============ */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0F2E22] px-6 md:px-10 py-9 md:py-10">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F2E22]/85" aria-hidden="true" />

          <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-6 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F2B01E]">Our mission</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">From surplus to support.</h2>
              <p className="mt-3 text-sm md:text-base text-[#DCE9E0] leading-7 max-w-lg">
                We rescue good food from restaurants, cafes and events and deliver
                it to NGOs, families and communities in need.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                to="/register"
                className="inline-flex items-center px-7 py-3 rounded-full bg-[#F2B01E] text-[#0F2E22] font-semibold hover:bg-[#FFC53D] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Donate food
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-7 py-3 rounded-full border-2 border-white/80 text-white font-semibold hover:bg-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;