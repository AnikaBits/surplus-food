import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";

function About() {
  const values = [
    {
      icon: "🍱",
      title: "Reduce Food Waste",
      description:
        "We aim to reduce food waste by connecting people who have surplus food with those who can use it.",
      color: "bg-green-100",
    },
    {
      icon: "🤝",
      title: "Connect Communities",
      description:
        "Our platform brings donors, NGOs and volunteers together to support people in need.",
      color: "bg-emerald-100",
    },
    {
      icon: "💚",
      title: "Spread Kindness",
      description:
        "We believe every small act of kindness can create a meaningful difference.",
      color: "bg-rose-100",
    },
    {
      icon: "🌍",
      title: "Build a Better Future",
      description:
        "By sharing resources responsibly, we can work toward a more sustainable community.",
      color: "bg-orange-100",
    },
  ];

  const services = [
    {
      icon: "🥗",
      title: "Surplus Food Sharing",
      description:
        "Donors can share information about available surplus food through the platform.",
    },
    {
      icon: "🏢",
      title: "NGO Connection",
      description:
        "NGOs can connect with food donors and explore available food donations.",
    },
    {
      icon: "🤝",
      title: "Community Support",
      description:
        "FoodShare encourages collaboration between individuals, restaurants, businesses and NGOs.",
    },
    {
      icon: "🌱",
      title: "Food Waste Awareness",
      description:
        "We promote responsible food sharing and awareness about reducing food waste.",
    },
    {
      icon: "🍱",
      title: "Donation Opportunities",
      description:
        "Individuals and organizations can register as donors and participate in food sharing.",
    },
    {
      icon: "💚",
      title: "Meaningful Impact",
      description:
        "Our goal is to help communities make better use of available food resources.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf6] text-gray-800 overflow-hidden">

      <Navbar />

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-600 py-20 lg:py-28">

        {/* Background Decoration */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left Content */}
            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full">

                <span className="text-green-100 text-sm font-semibold">
                  🌱 About FoodShare
                </span>

              </div>

              {/* Heading */}
              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">

                Sharing Food.

                <span className="block mt-2 text-green-200">
                  Spreading Hope.
                </span>

              </h1>

              {/* Description */}
              <p className="mt-7 text-lg text-green-50/90 leading-8 max-w-xl">

                FoodShare is a community-focused platform
                designed to connect surplus food donors
                with NGOs and organizations that can help
                distribute food to people in need.

                Together, we aim to reduce food waste
                and create a more caring community.

              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  to="/register"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-800 font-bold rounded-xl shadow-lg hover:bg-green-50 hover:-translate-y-1 transition-all duration-300"
                >
                  Join Our Mission →
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/70 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </Link>

              </div>

            </div>

            {/* Right Image */}
            <div className="relative">

              <div className="absolute -inset-4 bg-white/15 rounded-[3rem] blur-2xl"></div>

              <img
                src={img3}
                alt="FoodShare community initiative"
                loading="lazy"
                className="relative w-full h-[350px] sm:h-[450px] object-cover rounded-[2.5rem] border-4 border-white/30 shadow-2xl"
              />

              {/* Floating Card */}
              <div className="absolute bottom-5 left-3 right-3 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                    💚
                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Our Purpose
                    </p>

                    <h3 className="text-lg font-bold text-green-900">
                      Good Food. Better Purpose.
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= OUR STORY ================= */}

      <section className="py-20 lg:py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative">

              <div className="absolute -inset-4 bg-green-200/40 rounded-[3rem] blur-2xl"></div>

              <img
                src={img4}
                alt="Community food sharing"
                loading="lazy"
                className="relative w-full h-[350px] sm:h-[480px] object-cover rounded-[2.5rem] shadow-xl"
              />

              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg">

                <p className="text-green-700 font-bold text-lg">
                  🌱 Every Meal Matters
                </p>

              </div>

            </div>

            {/* Content */}
            <div>

              <span className="inline-block px-5 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                Our Story
              </span>

              <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-green-950 leading-tight">

                Why We Created

                <span className="block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                  FoodShare
                </span>

              </h2>

              <p className="mt-6 text-gray-600 text-lg leading-8">

                Every day, usable food may go to waste
                while many people struggle to access
                sufficient meals.

                FoodShare was designed around a simple
                idea: connect people who have extra food
                with organizations that can put it to good use.

              </p>

              <p className="mt-5 text-gray-600 leading-8">

                Our platform aims to make food sharing
                easier by bringing donors and NGOs
                together in one place.

                We believe technology can support
                meaningful community action.

              </p>

              <Link
                to="/register"
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Become a Member →
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= MISSION & VISION ================= */}

      <section className="py-20 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-block px-5 py-2 bg-white border border-green-200 rounded-full text-green-700 text-sm font-bold">
              💚 What Drives Us
            </span>

            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-green-950">
              Our Mission & Vision
            </h2>

            <p className="mt-5 text-gray-600 text-lg leading-8">

              Building stronger communities through
              responsible food sharing and meaningful connections.

            </p>

          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-14">

            {/* Mission */}
            <div className="group bg-white p-8 sm:p-10 rounded-3xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl">
                🎯
              </div>

              <h3 className="mt-7 text-3xl font-extrabold text-green-900">
                Our Mission
              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                To reduce food waste by connecting
                individuals, restaurants and businesses
                with NGOs that can help make use of
                surplus food.

                We aim to encourage responsible sharing
                and community participation.

              </p>

              <div className="mt-7 w-16 h-1 bg-green-500 rounded-full group-hover:w-28 transition-all duration-300"></div>

            </div>

            {/* Vision */}
            <div className="group bg-white p-8 sm:p-10 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl">
                🌍
              </div>

              <h3 className="mt-7 text-3xl font-extrabold text-green-900">
                Our Vision
              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                A future where usable food is valued,
                communities are connected and fewer
                resources are wasted.

                We envision a society where sharing
                surplus food becomes a common
                and meaningful practice.

              </p>

              <div className="mt-7 w-16 h-1 bg-emerald-500 rounded-full group-hover:w-28 transition-all duration-300"></div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= OUR VALUES ================= */}

      <section className="py-20 lg:py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-block px-5 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
              🌱 Our Core Values
            </span>

            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-green-950">
              What We Believe In
            </h2>

            <p className="mt-5 text-gray-600 text-lg leading-8">

              Our values guide the way we approach
              food sharing and community support.

            </p>

          </div>

          {/* Value Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            {values.map((value, index) => (

              <div
                key={index}
                className="group bg-[#f8faf6] p-7 rounded-3xl border border-green-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >

                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center text-3xl`}>

                  {value.icon}

                </div>

                <h3 className="mt-6 text-xl font-bold text-green-900">
                  {value.title}
                </h3>

                <p className="mt-4 text-gray-600 text-sm leading-7">
                  {value.description}
                </p>

                <div className="mt-6 w-10 h-1 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= OUR SERVICES ================= */}

      <section className="py-20 lg:py-28 bg-gradient-to-br from-green-50 to-emerald-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-block px-5 py-2 bg-white border border-green-200 rounded-full text-green-700 text-sm font-bold">
              🍱 What We Do
            </span>

            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-green-950">
              How FoodShare Helps
            </h2>

            <p className="mt-5 text-gray-600 text-lg leading-8">

              FoodShare is designed to make
              food sharing easier, more organized
              and more accessible.

            </p>

          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">

            {services.map((service, index) => (

              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >

                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-green-200 transition-colors">

                  {service.icon}

                </div>

                <h3 className="mt-7 text-xl font-bold text-green-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7 text-sm">
                  {service.description}
                </p>

                <div className="mt-7 w-12 h-1 bg-green-500 rounded-full group-hover:w-24 transition-all duration-300"></div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= COMMUNITY SECTION ================= */}

      <section className="py-20 lg:py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left Content */}
            <div>

              <span className="inline-block px-5 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                🤝 Our Community
              </span>

              <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-green-950 leading-tight">

                Together, We Can

                <span className="block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                  Make a Difference.
                </span>

              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">

                FoodShare brings together people
                who believe in helping others
                and reducing unnecessary food waste.

                Whether you're an individual,
                a restaurant, a business or an NGO,
                you can be part of our mission.

              </p>

              {/* Community Features */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

                  <span className="w-9 h-9 shrink-0 bg-green-100 rounded-full flex items-center justify-center">
                    ✓
                  </span>

                  <p className="text-gray-700 font-medium">
                    Connect with food-sharing communities
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span className="w-9 h-9 shrink-0 bg-green-100 rounded-full flex items-center justify-center">
                    ✓
                  </span>

                  <p className="text-gray-700 font-medium">
                    Support responsible food donations
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span className="w-9 h-9 shrink-0 bg-green-100 rounded-full flex items-center justify-center">
                    ✓
                  </span>

                  <p className="text-gray-700 font-medium">
                    Help reduce food waste
                  </p>

                </div>

              </div>

              <Link
                to="/register"
                className="inline-flex items-center gap-3 mt-9 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Join FoodShare →
              </Link>

            </div>

            {/* Right Image */}
            <div className="relative">

              <div className="absolute -inset-4 bg-green-200/40 rounded-[3rem] blur-2xl"></div>

              <img
                src={img3}
                alt="FoodShare community"
                loading="lazy"
                className="relative w-full h-[380px] sm:h-[500px] object-cover rounded-[2.5rem] shadow-xl"
              />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg">

                <p className="text-green-800 font-bold text-lg">
                  💚 Share Food. Spread Hope.
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Small actions can create meaningful change.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 py-20 lg:py-24">

        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">

          <div className="text-5xl">
            💚
          </div>

          <h2 className="mt-7 text-4xl sm:text-5xl font-extrabold text-white leading-tight">

            Be Part of the Change

          </h2>

          <p className="mt-6 text-lg text-green-50/90 leading-8 max-w-2xl mx-auto">

            Your small contribution can make a meaningful
            difference.

            Join FoodShare and help us build
            a community where good food
            is shared instead of wasted.

          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-green-800 font-bold rounded-xl shadow-xl hover:bg-green-50 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started →
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white/70 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default About;