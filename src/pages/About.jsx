// src/pages/About.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ===== কাউন্টার =====
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(end / 60);

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

// ===== ডট প্যাটার্ন ডেকোরেশন =====
function DotPattern({ className = "", cols = 6, rows = 6 }) {
  return (
    <div
      className={`grid gap-1.5 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 6px)` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-green-600/60"></span>
      ))}
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative px-6 pt-16 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Text */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-[#1e3d2a]">
              Empowering{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Communities,</span>
                <span className="absolute -inset-x-2 -inset-y-1 bg-yellow-300/70 -rotate-1 rounded-full z-0"></span>
              </span>
              <br />
              Nourishing Futures
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg">
              Join us in the fight against hunger for a brighter tomorrow
            </p>

            <Link
              to="/register"
              className="inline-block mt-8 px-7 py-3 bg-yellow-300 text-[#1e3d2a] font-semibold rounded-md hover:bg-yellow-400 transition shadow-sm"
            >
              Join Us
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <DotPattern className="absolute -top-6 -right-4 z-0" cols={7} rows={6} />
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900"
              alt="Children sharing food"
              className="relative z-10 w-full h-[380px] object-cover rounded-2xl shadow-xl"
            />
            <DotPattern className="absolute -bottom-6 -left-4 z-0" cols={5} rows={5} />
          </div>
        </div>
      </section>

      {/* ================= DONATION CARD ================= */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-[#1e3d2a] rounded-xl shadow-lg">
            <DotPattern
              className="absolute -top-3 -left-3 bg-white p-2 rounded-full"
              cols={4}
              rows={4}
            />

            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 gap-4 items-center">
              <div className="md:pl-6">
                <h3 className="text-white font-semibold text-lg">
                  Donate. Help people who are in need.
                </h3>
              </div>

              <div className="md:px-6 py-4 md:py-0">
                <p className="text-xs uppercase tracking-widest text-green-300">
                  Donation amount
                </p>
                <p className="mt-1 text-2xl font-bold text-white">
                  ৳5,100
                </p>
              </div>

              <div className="md:pl-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-green-300">
                    Paid up
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Quarterly
                  </p>
                </div>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-yellow-300 text-[#1e3d2a] font-semibold rounded-md hover:bg-yellow-400 transition text-sm whitespace-nowrap"
                >
                  Donate now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Text */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1e3d2a]">
              See what we have{" "}
              <span className="relative inline-block">
                <span className="relative z-10">achieved</span>
                <span className="absolute -inset-x-2 -inset-y-1 bg-yellow-300/70 -rotate-1 rounded-full z-0"></span>
              </span>
              <br />
              with your help
            </h2>

            <p className="mt-6 text-gray-600 leading-8 max-w-lg">
              Since our inception, we have touched the lives of{" "}
              <span className="font-semibold text-[#1e3d2a]">
                <Counter end={1000} />+
              </span>{" "}
              children and families. Through the generosity of our donors and
              the dedication of our volunteers, we have been able to serve{" "}
              <span className="font-semibold text-[#1e3d2a]">
                <Counter end={45} />K
              </span>{" "}
              meals and establish{" "}
              <span className="font-semibold text-[#1e3d2a]">
                <Counter end={12} />+
              </span>{" "}
              community kitchens. These accomplishments fuel our determination
              to do even more.
            </p>

            <Link
              to="/register"
              className="inline-block mt-8 px-6 py-3 bg-[#1e3d2a] text-white font-semibold rounded-md hover:bg-[#2a5238] transition"
            >
              Join Us
            </Link>
          </div>

          {/* Right Image Collage */}
          <div className="relative h-[520px]">
            <DotPattern className="absolute top-0 right-0 z-0" cols={6} rows={5} />

            <img
              src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600"
              alt="Kids eating"
              className="absolute top-0 right-0 w-[55%] h-[55%] object-cover rounded-xl shadow-lg z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600"
              alt="Volunteer"
              className="absolute top-[38%] left-0 w-[55%] h-[55%] object-cover rounded-xl shadow-lg z-20"
            />
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
              alt="Community meal"
              className="absolute bottom-0 right-[8%] w-[48%] h-[45%] object-cover rounded-xl shadow-lg z-30"
            />
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative px-6 py-20 bg-[#f7faf7]">
        <DotPattern className="absolute top-10 right-10 opacity-60" cols={5} rows={6} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3d2a]">
              Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10">services</span>
                <span className="absolute -inset-x-2 -inset-y-1 bg-yellow-300/70 -rotate-1 rounded-full z-0"></span>
              </span>
            </h2>
            <p className="mt-3 text-gray-600">
              become a volunteer and contribute
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Meal Programs",
                desc: "The primary service is the provision of regular, nutritious meals to children who are underprivileged or at risk of malnutrition.",
              },
              {
                title: "Community Kitchens",
                desc: "Some NGOs establish community kitchens where volunteers prepare meals for children in need. This not-for-profit organization provides meals to children in need.",
              },
              {
                title: "School Feeding Programs",
                desc: "Collaborating with schools to provide meals to students is a common approach. This helps ensure that children receive proper nutrition.",
              },
              {
                title: "Health And Wellness",
                desc: "Beyond just providing food, the NGO may engage in health and wellness initiatives, such as organizing health camps.",
              },
              {
                title: "Emergency Food Relief",
                desc: "In times of crisis, such as natural disasters or conflicts, the NGO may organize emergency food relief efforts.",
              },
              {
                title: "Nutritional Support",
                desc: "The NGO may offer nutritional support and education to ensure that the meals provided are balanced and meet the needs of the communities.",
              },
            ].map((s, i) => (
              <div key={i} className="group">
                {/* Simple line-based icon substitute */}
                <div className="w-12 h-12 rounded-full border-2 border-[#1e3d2a] flex items-center justify-center text-[#1e3d2a] font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#1e3d2a]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
                <button className="mt-4 text-sm font-semibold text-[#1e3d2a] border-b border-[#1e3d2a]/40 hover:border-[#1e3d2a] transition pb-0.5">
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="relative px-6 py-20">
        <DotPattern className="absolute top-10 right-10 opacity-60" cols={5} rows={6} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3d2a]">
              Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Events</span>
                <span className="absolute -inset-x-2 -inset-y-1 bg-yellow-300/70 -rotate-1 rounded-full z-0"></span>
              </span>
            </h2>
            <p className="mt-3 text-gray-600">
              that bought smiles on faces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                img: img3,
                title: "Food Campaign at Shristi Orphanage",
                active: false,
              },
              {
                img: img4,
                title: "Food Campaign at Shristi Orphanage",
                active: true,
              },
              {
                img: img3,
                title: "Food Campaign at Shristi Orphanage",
                active: false,
              },
              
             
            ].map((e, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden group h-[300px] shadow-md"
              >
                <img
                  src={e.img}
                  alt={e.title}
                  className={`w-full h-full object-cover transition duration-500 ${
                    e.active
                      ? "grayscale-0"
                      : "grayscale group-hover:grayscale-0"
                  }`}
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-white font-bold text-lg leading-snug">
                    {e.title}
                  </h3>
                  <button className="mt-4 px-4 py-2 bg-yellow-300 text-[#1e3d2a] text-sm font-semibold rounded-md hover:bg-yellow-400 transition">
                    View event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}

export default About;