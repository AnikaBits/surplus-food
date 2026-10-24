import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import foodImage from "../assets/img1.jpg"
import impactImage from "../assets/img2.jpg"

function Counter({ end }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const increment = Math.ceil(end / 50)

    const timer = setInterval(() => {
      current += increment

      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [end])

  return <>{count.toLocaleString()}+</>
}

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#how-it-works") {
      const section = document.getElementById("how-it-works");

      if (section) {
        requestAnimationFrame(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      }
    }
  }, [location.hash, location.key]);

  return (
    <div className="min-h-screen bg-[#f8faf6] text-gray-800">

      <Navbar />

      {/* Hero Section */}
     {/* Modern Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100">

  {/* Background Decoration */}
  <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/40 rounded-full blur-3xl"></div>

  <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">

    {/* Left Content */}
    <div className="relative z-10">

      {/* Small Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-green-700 text-sm font-semibold shadow-sm">

        <span>🌱</span>

        Together We Can Make a Difference

      </div>

      {/* Main Heading */}
      <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-950 leading-[1.12] tracking-tight">

        Good Food.

        <br />

        <span className="bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
          Better Purpose.
        </span>

      </h1>

      {/* Description */}
      <p className="mt-7 text-lg text-gray-600 max-w-xl leading-8">

        Turn surplus food into meaningful support.

        FoodShare connects restaurants, hotels, cafeterias,
        households, NGOs and volunteers to make sure
        safe food reaches people who need it.

      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-wrap gap-4">

        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >

          Donate Food

          <span>→</span>

        </Link>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-green-600 text-green-700 font-semibold rounded-xl hover:bg-green-50 hover:-translate-y-1 transition-all duration-300 shadow-sm"
        >

          Find Food

        </Link>

      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-5 max-w-lg">

        {[
          {
            icon: "♻️",
            title: "Less Waste",
            desc: "Save Food"
          },
          {
            icon: "🤝",
            title: "More Sharing",
            desc: "Help Others"
          },
          {
            icon: "🌱",
            title: "Real Impact",
            desc: "Better Future"
          }
        ].map((item, index) => (

          <div
            key={index}
            className="group bg-white/80 backdrop-blur-sm border border-green-100 rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
          >

            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">

              {item.icon}

            </div>

            <h3 className="mt-3 text-xs sm:text-sm font-bold text-green-900">

              {item.title}

            </h3>

            <p className="mt-1 text-xs text-gray-500">

              {item.desc}

            </p>

          </div>

        ))}

      </div>

    </div>

    {/* Right Image */}
    <div className="relative">

      {/* Image Background Glow */}
      <div className="absolute -inset-5 bg-gradient-to-r from-green-300/40 to-emerald-200/40 rounded-[3rem] blur-2xl"></div>

      {/* Main Image */}
      <img
        src={foodImage}
        alt="Volunteers sharing food with people in need"
        className="relative w-full h-[350px] sm:h-[430px] lg:h-[520px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
      />

      {/* Floating Top Card */}
      <div className="absolute top-5 right-3 sm:-right-5 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-xl border border-green-100">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-2xl">

            💚

          </div>

          <div>

            <p className="text-sm font-bold text-green-800">
              Share Happiness
            </p>

            <p className="text-xs text-gray-500">
              Every Meal Matters
            </p>

          </div>

        </div>

      </div>

      {/* Floating Bottom Card */}
      <div className="absolute bottom-5 left-3 sm:-left-5 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-green-100">

        <p className="text-xs text-gray-500 font-medium">

          Together We Can Save

        </p>

        <h3 className="mt-1 text-base sm:text-xl font-extrabold text-green-700">

          Good Food, Not Waste 🌱

        </h3>

      </div>

    </div>

  </div>

</section>


      {/* Introduction */}
     {/* Modern Our Mission Section */}
<section className="relative py-20 lg:py-28 bg-white overflow-hidden">

  {/* Background Decoration */}
  <div className="absolute top-0 right-0 w-80 h-80 bg-green-100/50 rounded-full blur-3xl"></div>

  <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Content */}
      <div>

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">

          <span className="text-green-700 text-sm font-bold tracking-wider uppercase">
            🌿 Our Mission
          </span>

        </div>

        {/* Heading */}
        <h2 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-950 leading-tight">

          From Surplus Food

          <br />

          To Someone

          <br />

          <span className="bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">

            in Need.

          </span>

        </h2>

        {/* Description */}
        <p className="mt-7 text-lg text-gray-600 leading-8 max-w-xl">

          Every day, restaurants, hotels, events and households
          may have safe food left over.

          Instead of throwing it away, FoodShare helps connect
          that food with NGOs and volunteers who can collect
          and distribute it to people who need it most.

        </p>

        {/* Highlight */}
        <div className="mt-8 flex items-start gap-4 bg-green-50 border-l-4 border-green-500 p-5 rounded-r-2xl max-w-lg">

          <div className="text-3xl">
            💚
          </div>

          <div>

            <h3 className="font-bold text-green-900 text-lg">
              Every Meal Matters
            </h3>

            <p className="text-gray-600 text-sm mt-1 leading-6">
              Small acts of kindness can create a big
              difference in someone's life.
            </p>

          </div>

        </div>

        {/* Learn More Button */}
        <Link
          to="/about"
          className="inline-flex items-center gap-3 mt-9 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >

          Learn More

          <span>→</span>

        </Link>

      </div>

      {/* Right Cards */}
      <div className="grid sm:grid-cols-2 gap-5">

        {/* Card 1 */}
        <div className="group bg-gradient-to-br from-green-50 to-white p-7 rounded-3xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">

            🍱

          </div>

          <h3 className="mt-6 text-xl font-bold text-green-950">
            Donate Surplus Food
          </h3>

          <p className="mt-3 text-gray-600 leading-7">
            Share safe surplus food and help reduce food waste
            in your community.
          </p>

          <div className="mt-5 text-green-600 font-semibold text-sm">
            Share Food →
          </div>

        </div>

        {/* Card 2 */}
        <div className="group bg-gradient-to-br from-emerald-50 to-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">

            🔎

          </div>

          <h3 className="mt-6 text-xl font-bold text-green-950">
            Find Available Food
          </h3>

          <p className="mt-3 text-gray-600 leading-7">
            NGOs and volunteers can discover available food
            donations nearby.
          </p>

          <div className="mt-5 text-emerald-600 font-semibold text-sm">
            Discover Food →
          </div>

        </div>

        {/* Card 3 */}
        <div className="group bg-gradient-to-br from-orange-50 to-white p-7 rounded-3xl border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">

            🚚

          </div>

          <h3 className="mt-6 text-xl font-bold text-green-950">
            Collect & Deliver
          </h3>

          <p className="mt-3 text-gray-600 leading-7">
            Coordinate food pickup and deliver meals
            to communities in need.
          </p>

          <div className="mt-5 text-orange-600 font-semibold text-sm">
            Make a Delivery →
          </div>

        </div>

        {/* Card 4 */}
        <div className="group bg-gradient-to-br from-rose-50 to-white p-7 rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">

            ❤️

          </div>

          <h3 className="mt-6 text-xl font-bold text-green-950">
            Create Real Impact
          </h3>

          <p className="mt-3 text-gray-600 leading-7">
            Reduce food waste while bringing hope
            and happiness to people's lives.
          </p>

          <div className="mt-5 text-rose-600 font-semibold text-sm">
            Spread Hope →
          </div>

        </div>

      </div>

    </div>

  </div>

</section>


      {/* How FoodShare Works */}
    {/* Modern How FoodShare Works Section */}
<section
  id="how-it-works"
  className="relative scroll-mt-24 py-20 lg:py-28 bg-gradient-to-b from-green-50 via-[#f8fcf6] to-white overflow-hidden"
>

  {/* Background Decoration */}
  <div className="absolute top-10 left-0 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>

  <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto">

      <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-green-200 rounded-full shadow-sm">

        <span className="text-green-700 text-sm font-bold uppercase tracking-widest">
          🌿 Simple & Meaningful
        </span>

      </div>

      <h2 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-950 leading-tight">

        How FoodShare

        <span className="block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
          Works
        </span>

      </h2>

      <p className="mt-6 text-lg text-gray-600 leading-8">

        Our platform makes it easy to move surplus food from donors
        to people who need it through NGOs and volunteers.

        Follow these four simple steps to make a difference.

      </p>

    </div>

    {/* Timeline */}
    <div className="relative mt-20">

      {/* Connecting Line - Desktop */}
      <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] border-t-2 border-dashed border-green-300"></div>

      {/* Steps Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

        {[
          {
            step: "01",
            icon: "🍱",
            title: "Donor Posts Food",
            description:
              "Restaurants, hotels, cafeterias or individuals post safe surplus food with quantity and pickup details.",
            color: "green"
          },
          {
            step: "02",
            icon: "🔎",
            title: "NGO Finds Food",
            description:
              "NGOs and volunteers explore available donations and request food based on community needs.",
            color: "emerald"
          },
          {
            step: "03",
            icon: "✅",
            title: "Request Approved",
            description:
              "The donor reviews food requests and confirms the suitable NGO or volunteer for collection.",
            color: "orange"
          },
          {
            step: "04",
            icon: "🚚",
            title: "Food Is Delivered",
            description:
              "Food is collected and delivered to people and communities who need it most.",
            color: "rose"
          }
        ].map((item) => (

          <div
            key={item.step}
            className="group relative flex flex-col items-center text-center"
          >

            {/* Step Icon */}
            <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-white rounded-full border-8 border-green-100 shadow-lg group-hover:scale-110 group-hover:border-green-200 transition-all duration-300">

              <span className="text-4xl">
                {item.icon}
              </span>

            </div>

            {/* Step Card */}
            <div className="w-full flex-1 mt-8 bg-white border border-green-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              {/* Step Number */}
              <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-extrabold tracking-widest">

                STEP {item.step}

              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-bold text-green-950">

                {item.title}

              </h3>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 leading-7">

                {item.description}

              </p>

              {/* Decorative Bottom Line */}
              <div className="mt-6 mx-auto w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full group-hover:w-20 transition-all duration-300"></div>

            </div>

          </div>

        ))}

      </div>

    </div>

    {/* Bottom Message */}
    <div className="mt-16 text-center">

      <p className="text-gray-600 text-lg">

        💚 Every small contribution can create a meaningful impact.

      </p>

      <Link
        to="/register"
        className="inline-flex items-center gap-3 mt-7 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >

        Start Sharing Food

        <span>→</span>

      </Link>

    </div>

  </div>

</section>
      {/* What Can You Share */}
     {/* Modern Food Categories Section */}
<section className="relative py-20 lg:py-28 bg-white overflow-hidden">

  {/* Background Decoration */}
  <div className="absolute top-0 right-0 w-80 h-80 bg-green-100/40 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto">

      <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-50 border border-green-200 rounded-full">

        <span className="text-green-700 text-sm font-bold uppercase tracking-widest">
          🌿 Every Day Is Different
        </span>

      </div>

      <h2 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-950 leading-tight">

        Share Any Safe,

        <span className="block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
          Surplus Food
        </span>

      </h2>

      <p className="mt-6 text-lg text-gray-600 leading-8">

        You don't need to follow a fixed food list.
        Share whatever safe and suitable surplus food is available
        from your restaurant, hotel, cafeteria, event or home.

      </p>

    </div>

    {/* Food Category Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {[
        {
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=85",
          icon: "🍛",
          title: "Cooked Meals",
          description: "Freshly prepared meals ready to be shared with people in need."
        },
        {
          image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=85",
          icon: "🍚",
          title: "Rice & Curry",
          description: "Delicious rice, curry and homemade dishes that can bring happiness."
        },
        {
          image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=85",
          icon: "🥪",
          title: "Snacks & Fast Food",
          description: "Sandwiches, snacks and other ready-to-eat food items."
        },
        {
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=85",
          icon: "🍞",
          title: "Bakery Items",
          description: "Fresh bread, cakes and other bakery products ready for sharing."
        },
        {
          image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=85",
          icon: "🍱",
          title: "Event Surplus",
          description: "Safe surplus food from weddings, events and social gatherings."
        },
        {
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=85",
          icon: "🥫",
          title: "Other Food",
          description: "Other safe and suitable food items that can help communities."
        }
      ].map((item) => (

        <div
          key={item.title}
          className="group bg-white rounded-3xl overflow-hidden border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >

          {/* Food Image */}
          <div className="relative h-60 overflow-hidden">

            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Icon Badge */}
            <div className="absolute bottom-4 left-5 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg">

              {item.icon}

            </div>

          </div>

          {/* Card Content */}
          <div className="p-7">

            <h3 className="text-2xl font-bold text-green-950 group-hover:text-green-600 transition-colors duration-300">

              {item.title}

            </h3>

            <p className="mt-3 text-gray-600 text-sm leading-7">

              {item.description}

            </p>

            {/* Decorative Line */}
            <div className="mt-6 w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full group-hover:w-24 transition-all duration-300"></div>

          </div>

        </div>

      ))}

    </div>

    {/* Bottom Message */}
    <div className="mt-14 text-center">

      <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-7">

        These are examples only. Donors can describe the actual
        surplus food available when creating a donation.

      </p>

      <Link
        to="/register"
        className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >

        Donate Your Food →

      </Link>

    </div>

  </div>

</section>


      {/* Impact */}
      {/* <section className="py-20 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <p className="text-green-200 font-semibold uppercase tracking-widest text-sm">
              Our Impact
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              Together, We Make a Difference.
            </h2>

            <p className="mt-4 text-green-100">
              Every donation can become someone's meal.
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

            <div className="text-center bg-green-700/50 border border-green-600 rounded-2xl p-8">
              <div className="text-4xl font-bold">
                <Counter end={5000} />
              </div>

              <p className="mt-2 text-green-100">
                Meals Saved
              </p>
            </div>

            <div className="text-center bg-green-700/50 border border-green-600 rounded-2xl p-8">
              <div className="text-4xl font-bold">
                <Counter end={250} />
              </div>

              <p className="mt-2 text-green-100">
                Food Donors
              </p>
            </div>

            <div className="text-center bg-green-700/50 border border-green-600 rounded-2xl p-8">
              <div className="text-4xl font-bold">
                <Counter end={80} />
              </div>

              <p className="mt-2 text-green-100">
                NGO Partners
              </p>
            </div>

            <div className="text-center bg-green-700/50 border border-green-600 rounded-2xl p-8">
              <div className="text-4xl font-bold">
                <Counter end={1200} />
              </div>

              <p className="mt-2 text-green-100">
                People Helped
              </p>
            </div>

          </div>

        </div>
      </section> */}
       {/* Impact Section */}

{/* Impact Section */}
{/* Modern Our Impact Section */}
<section className="relative py-20 lg:py-28 bg-gradient-to-br from-green-50 via-[#f5faf2] to-emerald-50 overflow-hidden">

  {/* Background Decorations */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>

  <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Side - Image */}
      <div className="relative">

        {/* Image Glow */}
        <div className="absolute -inset-5 bg-gradient-to-r from-green-300/40 to-emerald-200/40 rounded-[3rem] blur-2xl"></div>

        {/* Main Image */}
        <img
          src={impactImage}
          alt="Food sharing and community support"
          loading="lazy"
          className="relative w-full h-[350px] sm:h-[450px] lg:h-[560px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
        />

        {/* Floating Bottom Card */}
        <div className="absolute bottom-5 left-3 right-3 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-green-100">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">

              💚

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Every Donation Matters
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-green-800 mt-1">
                Good Food. Shared With Purpose.
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Right Side - Content */}
      <div>

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-green-200 rounded-full shadow-sm">

          <span className="text-green-700 text-sm font-bold uppercase tracking-widest">
            🌱 Our Impact
          </span>

        </div>

        {/* Heading */}
        <h2 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-950 leading-tight">

          Together, We Make

          <span className="block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">

            A Difference.

          </span>

        </h2>

        {/* Description */}
        <p className="mt-6 text-lg text-gray-600 leading-8">

          FoodShare brings donors, NGOs and volunteers together
          to make sure safe surplus food does not go to waste.

          Every donation can become a meal, and every small
          action can create a meaningful impact in the community.

        </p>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mt-10">

          {/* Card 1 */}
          <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">

              🍱

            </div>

            <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold text-green-700">

              <Counter end={5000} />

            </h3>

            <p className="mt-2 text-sm font-medium text-gray-600">

              Meals Saved

            </p>

            <div className="mt-4 w-10 h-1 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>

          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">

              🤝

            </div>

            <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold text-emerald-700">

              <Counter end={250} />

            </h3>

            <p className="mt-2 text-sm font-medium text-gray-600">

              Food Donors

            </p>

            <div className="mt-4 w-10 h-1 bg-emerald-500 rounded-full group-hover:w-20 transition-all duration-300"></div>

          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">

              🏢

            </div>

            <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold text-orange-600">

              <Counter end={80} />

            </h3>

            <p className="mt-2 text-sm font-medium text-gray-600">

              NGO Partners

            </p>

            <div className="mt-4 w-10 h-1 bg-orange-400 rounded-full group-hover:w-20 transition-all duration-300"></div>

          </div>

          {/* Card 4 */}
          <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-2xl">

              ❤️

            </div>

            <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold text-rose-600">

              <Counter end={1200} />

            </h3>

            <p className="mt-2 text-sm font-medium text-gray-600">

              People Helped

            </p>

            <div className="mt-4 w-10 h-1 bg-rose-400 rounded-full group-hover:w-20 transition-all duration-300"></div>

          </div>

        </div>

        {/* Demo Data Note */}
        <p className="mt-4 text-xs text-gray-500">
          Illustrative statistics for demonstration purposes.
        </p>

        {/* Button */}
        <Link
          to="/register"
          className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >

          Be Part of the Change

          <span>→</span>

        </Link>

      </div>

    </div>

  </div>

</section>

      {/* CTA */}
     {/* Modern CTA Section */}
<section className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 py-20 lg:py-28">

  {/* Background Decorations */}
  <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

  <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

  <div className="relative max-w-5xl mx-auto px-6 text-center">

    {/* Icon */}
    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">

      <span className="text-5xl">🌱</span>

    </div>

    {/* Badge */}
    <div className="mt-7">

      <span className="inline-block px-5 py-2 bg-white/15 border border-white/20 rounded-full text-green-50 text-sm font-semibold tracking-wide">

        💚 Small Actions, Big Impact

      </span>

    </div>

    {/* Heading */}
    <h2 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">

      Have Extra Food?

      <span className="block mt-3 text-green-200">
        Share It. Spread Hope.
      </span>

    </h2>

    {/* Description */}
    <p className="mt-7 text-lg text-green-50/90 max-w-2xl mx-auto leading-8">

      Don't let good food go to waste. Your surplus food
      can bring happiness and support to someone in need.

      Join FoodShare and make a meaningful difference
      in your community.

    </p>

    {/* Buttons */}
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

      <Link
        to="/register"
        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-green-800 font-bold rounded-xl shadow-xl hover:bg-green-50 hover:-translate-y-1 transition-all duration-300"
      >

        Start Donating Today

        <span>→</span>

      </Link>

      <Link
        to="/about"
        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/70 text-white font-semibold rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
      >

        Learn More

      </Link>

    </div>

    {/* Bottom Message */}
    <p className="mt-10 text-green-100 text-sm">

      🍱 Save Food &nbsp; • &nbsp; 🤝 Help People &nbsp; • &nbsp; 🌍 Protect Our Planet

    </p>

  </div>

</section>


      {/* Newsletter */}
   {/* Modern Newsletter Section */}
<section className="relative bg-[#123b28] py-16 lg:py-20 overflow-hidden">

  {/* Background Decoration */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

  <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

  <div className="relative max-w-5xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-10 items-center">

      {/* Left Content */}
      <div className="text-center lg:text-left">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/20 rounded-2xl text-3xl">

          ✉️

        </div>

        {/* Heading */}
        <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-white leading-tight">

          Stay Connected

          <span className="block text-green-300">
            With FoodShare
          </span>

        </h2>

        {/* Description */}
        <p className="mt-4 text-green-100/80 leading-7 max-w-lg mx-auto lg:mx-0">

          Be part of a community that cares.

          Stay informed about food sharing, sustainability
          and the positive impact we can create together.

        </p>

      </div>

      {/* Right Newsletter Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 shadow-xl">

        <h3 className="text-xl font-bold text-white">

          Join Our Community 💚

        </h3>

        <p className="mt-2 text-sm text-green-100/80 leading-6">

          Newsletter subscription will be available soon.

        </p>

        {/* Newsletter Input - Preview Only */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">

          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address for newsletter"
            disabled
            className="w-full min-w-0 flex-1 px-5 py-4 rounded-xl bg-white/80 text-gray-700 placeholder-gray-500 outline-none cursor-not-allowed"
          />

          <button
            type="button"
            disabled
            className="px-6 py-4 bg-green-500/60 text-white font-semibold rounded-xl cursor-not-allowed whitespace-nowrap"
          >

            Coming Soon

          </button>

        </div>

        {/* Bottom Note */}
        <p className="mt-5 text-xs text-green-100/70">

          🌱 We're preparing a better way to keep you updated.

        </p>

      </div>

    </div>

  </div>

</section>

      <Footer />

    </div>
  )
}

export default Home