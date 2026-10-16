// src/pages/About.jsx
// মিশ্র ভার্সন: পুরনো হিরো হেডলাইন, ছবির কোলাজ ও Events রাখা হয়েছে,
// বাকিটা নতুন (সমস্যা ও সমাধান, What we do, Live Impact, NGO পার্টনার, টিম, FAQ)।
// থিম: Home-এর মতো হলুদ + গাঢ় সবুজ।
//
// দরকার: components/LiveStats.jsx, utils/time.js, components/Navbar, components/Footer,
//        assets/img3.jpeg, assets/img4.jpeg

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiveStats, { Icon } from "../components/LiveStats";
import { useAuth } from "../context/AuthContext";
import { msRemaining } from "../utils/time";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";

// ========== এখানে নিজের তথ্য বসাও ==========

// Events: সত্যিকারের ইভেন্ট অনুযায়ী নাম, তারিখ ও ছবি বদলাও (কার্ড যোগ/কমানো যাবে)
const EVENTS = [
  { img: img3, title: "Food Campaign at Shristi Orphanage", date: "" },
  { img: img4, title: "Food Campaign at Shristi Orphanage", date: "" },
];

// টিম: নাম, ভূমিকা, ছবি (ছবি ফাঁকা ("") থাকলে হালকা রঙের বক্স দেখাবে)
const TEAM = [
  { name: "", role: "", img: "" },
  { name: "", role: "", img: "" },
  { name: "", role: "", img: "" },
  { name: "", role: "", img: "" },
];

// =========================================

const FONT = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" };

// হলুদ হাইলাইট (পুরনো হিরোর মতো)
function Highlight({ children }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute -inset-x-2 -inset-y-1 bg-[#F2B01E]/70 -rotate-1 rounded-full z-0" aria-hidden="true" />
    </span>
  );
}

function Photo({ src, alt = "", className = "" }) {
  if (src) return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  return <div className={`bg-[#ECE4C8] ${className}`} aria-hidden="true" />;
}

const WHAT_WE_DO = [
  {
    icon: "bowl",
    title: "Post surplus food",
    text: "Donors list what they have, how much, where to collect it and when it expires.",
  },
  {
    icon: "bolt",
    title: "Show the urgent first",
    text: "Food with the least time left rises to the top, so NGOs collect it before it spoils.",
  },
  {
    icon: "truck",
    title: "Track every pickup",
    text: "Each donation moves from approved to picked up, on the way and delivered.",
  },
  {
    icon: "shield",
    title: "Keep it trustworthy",
    text: "An admin reviews every donor and NGO before they can post or collect food.",
  },
];

const FAQ = [
  {
    q: "Who can donate food?",
    a: "Restaurants, hotels, cafeterias, event organisers and households. Register as a donor, and once an admin approves your account you can post food.",
  },
  {
    q: "How do NGOs get approved?",
    a: "Every NGO registration is reviewed by an admin. Until it is approved, the account cannot request food.",
  },
  {
    q: "How do you keep the food safe?",
    a: "Donors add preparation and expiry times, and NGOs can see how much time is left before they request. We ask donors to share only food that is still safe to eat.",
  },
  {
    q: "What happens after an NGO requests food?",
    a: "The donor approves the request. The NGO then marks the food as picked up, on the way and delivered, and records where it was distributed.",
  },
];

function About() {
  const { donations = [], users = [] } = useAuth();

  // Home-এর মতো একই আসল সংখ্যা
  const qty = (d) => parseInt(d.totalQuantity, 10) || 0;
  const now = Date.now();
  const mealsDelivered = donations.filter((d) => d.status === "delivered").reduce((s, d) => s + qty(d), 0);
  const mealsWaiting = donations
    .filter((d) => d.status === "available" && (msRemaining(d, now) ?? 1) > 0)
    .reduce((s, d) => s + qty(d), 0);
  const approvedNgos = users.filter((u) => u.role === "ngo" && u.status === "approved");
  const peopleReached = donations.reduce((s, d) => s + (d.distribution?.estimatedPeopleHelped || 0), 0);
  const totalMeals = donations.reduce((s, d) => s + qty(d), 0);
  const deliveredPercent = totalMeals ? Math.round((mealsDelivered / totalMeals) * 100) : 0;

  const stats = [
    { icon: "bowl", value: mealsDelivered, label: "Meals delivered" },
    { icon: "truck", value: mealsWaiting, label: "Awaiting pickup" },
    { icon: "handshake", value: approvedNgos.length, label: "NGO partners" },
    { icon: "users", value: peopleReached, label: "People reached" },
  ];

  const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2E22]";

  return (
    <div className="min-h-screen bg-[#F6F7F2] text-[#14231B] overflow-x-hidden" style={FONT}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&display=swap');`}</style>

      <Navbar />

      {/* ============ HERO (পুরনো হেডলাইন রাখা) ============ */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-[#0F2E22]">
            Empowering <Highlight>Communities,</Highlight>
            <br />
            Nourishing Futures
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#3B4F43] max-w-lg">
            FoodShare connects people who have food to spare with the NGOs and
            volunteers who can get it to those who need it, before it spoils.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className={`inline-flex items-center px-7 py-3 rounded-full bg-[#0F2E22] text-white font-semibold hover:bg-[#184230] transition shadow-lg shadow-[#0F2E22]/20 ${focus}`}
            >
              Join us
            </Link>
            <Link
              to="/available-food"
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F2B01E] text-[#0F2E22] font-semibold hover:bg-[#FFC53D] transition ${focus}`}
            >
              <Icon name="search" className="w-4 h-4" />
              Find food
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#F2B01E]" aria-hidden="true" />
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900"
            alt="Children sharing food"
            className="relative w-full h-[320px] object-cover rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* ============ সমস্যা ও সমাধান + কোলাজ (পুরনো কোলাজ রাখা) ============ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0F2E22]">
              The problem is <Highlight>timing,</Highlight>
              <br />
              not shortage
            </h2>
            <p className="mt-6 text-[#3B4F43] leading-7 max-w-lg">
              Cooked food spoils within hours. By the time a donor finds an NGO
              by phone, the food may already be too old to share. Most of the
              loss happens in that gap.
            </p>
            <p className="mt-3 text-[#3B4F43] leading-7 max-w-lg">
              FoodShare closes it. Donors post food with an expiry time, NGOs see
              the most urgent listings first, and each pickup is tracked until
              it is delivered.
            </p>
          </div>

          {/* কোলাজ */}
          <div className="relative h-[400px] max-w-md mx-auto lg:max-w-none w-full">
            <img
              src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600"
              alt="Kids eating"
              className="absolute top-0 right-0 w-[55%] h-[55%] object-cover rounded-2xl shadow-lg z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600"
              alt="Volunteer"
              className="absolute top-[38%] left-0 w-[55%] h-[55%] object-cover rounded-2xl shadow-lg z-20"
            />
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
              alt="Community meal"
              className="absolute bottom-0 right-[8%] w-[48%] h-[45%] object-cover rounded-2xl shadow-lg z-30"
            />
            <span className="absolute -top-3 left-6 w-20 h-20 rounded-full bg-[#F2B01E]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO (পুরনো Services-এর বদলে) ============ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F2E22]">
          What <Highlight>we do</Highlight>
        </h2>
        <p className="mt-4 text-[#3B4F43] max-w-xl">
          Four things, done simply, so surplus food reaches people while it is still good.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHAT_WE_DO.map((w, i) => (
            <div key={w.title} className="bg-white rounded-2xl p-5 shadow-sm">
              <span className="w-12 h-12 rounded-full bg-[#0F2E22] text-[#F2B01E] flex items-center justify-center">
                <Icon name={w.icon} className="w-5 h-5" />
              </span>
              <p className="mt-4 text-xs font-semibold text-[#9A6B00] tabular-nums">0{i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{w.title}</h3>
              <p className="mt-1.5 text-sm text-[#3B4F43] leading-6">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ LIVE IMPACT ============ */}
      <LiveStats stats={stats} progress={{ percent: deliveredPercent, label: "Delivered so far" }} />

      {/* ============ NGO পার্টনার (আসল ডেটা, না থাকলে লুকানো) ============ */}
      {approvedNgos.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F2E22]">
            Our <Highlight>NGO partners</Highlight>
          </h2>

          <ul className="mt-8 flex flex-wrap gap-3">
            {approvedNgos.map((ngo) => (
              <li
                key={ngo.id}
                className="flex items-center gap-3 bg-white rounded-full pl-2 pr-5 py-2 shadow-sm border border-[#0F2E22]/10"
              >
                {ngo.image ? (
                  <img src={ngo.image} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-[#ECE4C8]" aria-hidden="true" />
                )}
                <span className="font-medium text-sm">{ngo.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ============ EVENTS (পুরনো ডিজাইন রাখা) ============ */}
      {EVENTS.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F2E22]">
            Our <Highlight>events</Highlight>
          </h2>
          <p className="mt-4 text-[#3B4F43]">Moments from the field.</p>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENTS.map((e, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group h-[280px] shadow-md">
                <img
                  src={e.img}
                  alt={e.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 motion-safe:transition motion-safe:duration-500"
                />
                <div className="absolute inset-0 bg-[#0F2E22]/55 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-white font-bold text-lg leading-snug">{e.title}</h3>
                  {e.date && <p className="mt-1 text-sm text-[#F2B01E]">{e.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ TEAM ============ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F2E22]">
            The <Highlight>team</Highlight> behind it
          </h2>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((m, i) => (
              <div key={i} className="bg-[#F6F7F2] rounded-2xl p-3">
                <Photo src={m.img} alt={m.name} className="w-full h-48 rounded-xl" />
                <div className="px-1 pt-3 pb-1">
                  <p className="font-semibold">{m.name || "Name"}</p>
                  <p className="text-sm text-[#3B4F43]">{m.role || "Role"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F2E22]">
          Questions <Highlight>people ask</Highlight>
        </h2>

        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-[#0F2E22]/15 bg-white open:bg-[#FFF6DB] open:border-[#F2B01E] p-5"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[#0F2E22] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#0F2E22] text-[#F2B01E] flex items-center justify-center motion-safe:transition-transform group-open:rotate-90">
                  <Icon name="arrow" className="w-3.5 h-3.5" />
                </span>
              </summary>
              <p className="mt-3 text-sm text-[#3B4F43] leading-6">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0F2E22] px-6 md:px-10 py-10">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F2E22]/85" aria-hidden="true" />

          <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-6 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F2B01E]">Join us</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Got food, or time to give?</h2>
              <p className="mt-3 text-sm md:text-base text-[#DCE9E0] leading-7 max-w-lg">
                Post surplus food, collect it for people in need, or help deliver
                it. Everyone has a part to play.
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
                to="/contact"
                className="inline-flex items-center px-7 py-3 rounded-full border-2 border-white/80 text-white font-semibold hover:bg-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;