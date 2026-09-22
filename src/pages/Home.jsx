import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
  return (
    <div className="min-h-screen bg-[#f8faf6] text-gray-800">

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#edf6e8]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-green-700 font-semibold uppercase tracking-[3px] text-sm">
              FoodShare
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-bold text-[#214d2b] leading-tight">
              Good Food.
              <br />
              <span className="text-green-600">
                Better Purpose.
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-8">
              Turn surplus food into meaningful support. FoodShare connects
              restaurants, hotels, cafeterias, households, NGOs and volunteers
              to make sure safe food reaches people who need it.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="px-7 py-3.5 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
              >
                Donate Food →
              </Link>

              <Link
                to="/"
                className="px-7 py-3.5 border border-green-700 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition"
              >
                Find Food
              </Link>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-5">

              <div>
                <div className="text-3xl">♻️</div>
                <p className="mt-2 font-semibold">
                  Less Waste
                </p>
                <p className="text-sm text-gray-500">
                  Save surplus food
                </p>
              </div>

              <div>
                <div className="text-3xl">🤝</div>
                <p className="mt-2 font-semibold">
                  More Sharing
                </p>
                <p className="text-sm text-gray-500">
                  Support communities
                </p>
              </div>

              <div>
                <div className="text-3xl">🌱</div>
                <p className="mt-2 font-semibold">
                  Real Impact
                </p>
                <p className="text-sm text-gray-500">
                  Build sustainability
                </p>
              </div>

            </div>
          </div>

          <div className="relative">

            <div className="absolute -inset-5 bg-green-300/30 rounded-[2rem] blur-2xl"></div>

           <img
  src={foodImage}
  alt="FoodShare"
  className="relative w-full h-[500px] object-cover rounded-[2rem] shadow-2xl"
/>

            <div className="absolute left-6 bottom-6 bg-white rounded-xl shadow-xl p-5">
              <p className="text-sm text-gray-500">
                Together we can save
              </p>

              <p className="text-2xl font-bold text-green-700">
                Good Food, Not Waste
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <p className="text-green-600 font-semibold uppercase tracking-widest text-sm">
              Our Mission
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#214d2b] leading-tight">
              From Surplus Food
              <br />
              To Someone in Need.
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Every day, restaurants, hotels, events and households may have
              safe food left over. Instead of throwing it away, FoodShare
              helps connect that food with NGOs and volunteers who can collect
              and distribute it.
            </p>

            <Link
              to="/about"
              className="inline-block mt-7 px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Learn More →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">

            <div className="bg-[#f5faf2] p-7 rounded-2xl border border-green-100 hover:shadow-lg transition">
              <div className="text-4xl">🍱</div>
              <h3 className="mt-4 text-xl font-bold">
                Donate Surplus Food
              </h3>
              <p className="mt-3 text-gray-600">
                Post whatever safe surplus food is available.
              </p>
            </div>

            <div className="bg-[#f5faf2] p-7 rounded-2xl border border-green-100 hover:shadow-lg transition">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 text-xl font-bold">
                Find Available Food
              </h3>
              <p className="mt-3 text-gray-600">
                NGOs and volunteers can discover nearby donations.
              </p>
            </div>

            <div className="bg-[#f5faf2] p-7 rounded-2xl border border-green-100 hover:shadow-lg transition">
              <div className="text-4xl">🚚</div>
              <h3 className="mt-4 text-xl font-bold">
                Collect & Deliver
              </h3>
              <p className="mt-3 text-gray-600">
                Coordinate pickup and deliver food to communities.
              </p>
            </div>

            <div className="bg-[#f5faf2] p-7 rounded-2xl border border-green-100 hover:shadow-lg transition">
              <div className="text-4xl">❤️</div>
              <h3 className="mt-4 text-xl font-bold">
                Create Impact
              </h3>
              <p className="mt-3 text-gray-600">
                Reduce food waste while helping people in need.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* How FoodShare Works */}
      <section className="py-20 bg-[#f3f8ef]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-green-600 font-semibold uppercase tracking-widest text-sm">
              Simple & Meaningful
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#214d2b]">
              How FoodShare Works
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              Our platform makes it easy to move surplus food from donors
              to people who need it through trusted NGOs and volunteers.
            </p>

          </div>

          <div className="relative mt-14">

            <div className="hidden md:block absolute top-12 left-[13%] right-[13%] border-t-2 border-dashed border-green-300"></div>

            <div className="grid md:grid-cols-4 gap-8 relative">

              <div className="text-center">
                <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border-8 border-white shadow-md text-4xl">
                  🍱
                </div>

                <span className="inline-block mt-5 text-sm font-bold text-green-600">
                  STEP 01
                </span>

                <h3 className="mt-2 text-xl font-bold">
                  Donor Posts Food
                </h3>

                <p className="mt-3 text-gray-600">
                  A restaurant, hotel, cafeteria or individual posts
                  available surplus food with quantity and pickup details.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border-8 border-white shadow-md text-4xl">
                  🔎
                </div>

                <span className="inline-block mt-5 text-sm font-bold text-green-600">
                  STEP 02
                </span>

                <h3 className="mt-2 text-xl font-bold">
                  NGO Finds Food
                </h3>

                <p className="mt-3 text-gray-600">
                  NGOs or volunteers browse available donations and
                  request food based on their needs.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border-8 border-white shadow-md text-4xl">
                  ✅
                </div>

                <span className="inline-block mt-5 text-sm font-bold text-green-600">
                  STEP 03
                </span>

                <h3 className="mt-2 text-xl font-bold">
                  Request Approved
                </h3>

                <p className="mt-3 text-gray-600">
                  The donor reviews the request and confirms the
                  suitable NGO or volunteer for collection.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border-8 border-white shadow-md text-4xl">
                  🚚
                </div>

                <span className="inline-block mt-5 text-sm font-bold text-green-600">
                  STEP 04
                </span>

                <h3 className="mt-2 text-xl font-bold">
                  Food Is Delivered
                </h3>

                <p className="mt-3 text-gray-600">
                  The food is collected and delivered to people
                  or communities who need it.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* What Can You Share */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-green-600 font-semibold uppercase tracking-widest text-sm">
              Every Day Is Different
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#214d2b]">
              Share Any Safe, Surplus Food
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              You don't need to follow a fixed food list. Share whatever
              safe and suitable surplus food is available from your
              restaurant, hotel, cafeteria, event or home.
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-12">

            {[
              ["🍛", "Cooked Meals"],
              ["🍚", "Rice & Curry"],
              ["🥪", "Snacks & Fast Food"],
              ["🍞", "Bakery Items"],
              ["🍱", "Event Surplus"],
              ["🥫", "Other Food"]
            ].map(([icon, title]) => (
              <div
                key={title}
                className="group bg-[#f8fbf6] border border-green-100 rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-lg transition"
              >
                <div className="text-5xl">
                  {icon}
                </div>

                <h3 className="mt-4 font-semibold text-gray-800">
                  {title}
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  Example
                </p>
              </div>
            ))}

          </div>

          <p className="text-center mt-8 text-gray-500 text-sm">
            These are examples only. Donors can describe the actual
            surplus food available when creating a donation.
          </p>

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
<section className="py-12 bg-[#f3f8ef]">
  <div className="max-w-6xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-10 items-center">

      {/* Image */}
      <div className="relative">
        <div className="absolute -inset-3 bg-green-200/40 rounded-[1.5rem] blur-xl"></div>

        <img
          src={impactImage}
          alt="Food sharing"
          className="relative w-full h-[330px] object-cover rounded-[1.5rem] shadow-lg"
        />

        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md">
          <p className="text-xs text-gray-500">
            Every donation matters
          </p>

          <p className="text-lg font-bold text-green-700 mt-1">
            Good Food. Shared With Purpose. ❤️
          </p>
        </div>
      </div>

      {/* Information */}
      <div>

        <p className="text-green-600 font-semibold uppercase tracking-widest text-xs">
          Our Impact
        </p>

        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#214d2b] leading-tight">
          Together, We Make
          <br />
          <span className="text-green-600">
            A Difference.
          </span>
        </h2>

        <p className="mt-4 text-gray-600 leading-7 max-w-xl text-sm">
          FoodShare brings donors, NGOs and volunteers together to
          make sure safe surplus food does not go to waste. Every
          donation can become a meal and every small action can create
          a meaningful impact in the community.
        </p>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 gap-3 mt-6">

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="text-2xl font-bold text-green-700">
              <Counter end={5000} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Meals Saved
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="text-2xl font-bold text-green-700">
              <Counter end={250} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Food Donors
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="text-2xl font-bold text-green-700">
              <Counter end={80} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              NGO Partners
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="text-2xl font-bold text-green-700">
              <Counter end={1200} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              People Helped
            </p>
          </div>

        </div>

        {/* Button */}
        <Link
          to="/register"
          className="inline-block mt-6 px-6 py-3 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition shadow-md"
        >
          Be Part of the Change →
        </Link>

      </div>

    </div>

  </div>
</section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#edf6e8] py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="text-5xl">
            🌱
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#214d2b]">
            Have Extra Food?
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto leading-8">
            Don't let good food go to waste. Post your surplus food
            and help someone in your community.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 px-8 py-4 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition shadow-lg"
          >
            Start Donating Today →
          </Link>

        </div>

      </section>


      {/* Newsletter */}
      <section className="bg-[#214d2b] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Stay Connected With FoodShare
          </h2>

          <p className="mt-3 text-green-100">
            Get updates about food sharing and community impact.
          </p>

          <form className="mt-7 flex flex-col sm:flex-row max-w-xl mx-auto gap-3">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-lg outline-none bg-white text-gray-800"
            />

            <button
              type="submit"
              className="px-7 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition"
            >
              Subscribe
            </button>

          </form>

        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Home