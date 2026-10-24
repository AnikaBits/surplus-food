import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notice, setNotice] = useState("");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (notice) {
      setNotice("");
    }
  }

  // Demo form submission
  function handleSubmit(e) {
    e.preventDefault();

    setNotice(
      "This contact form is currently a demo. Your message has not been sent yet."
    );
  }

  const inputStyle =
    "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300";

  const labelStyle =
    "block text-sm font-semibold text-gray-700 mb-2";

  return (
  <div className="min-h-screen bg-[#f8faf6] text-gray-800">

    {/* NAVBAR */}
    <Navbar />

    {/* HERO SECTION */}
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-600 py-20 lg:py-28">

        {/* Background Decorations */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full">

            <span className="text-green-100 text-sm font-semibold tracking-wide">
              💚 We're Here to Help
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">

            Let's Get

            <span className="block text-green-200">
              In Touch.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-green-50/90 max-w-2xl mx-auto leading-8">

            Have a question, suggestion or idea?

            We'd love to hear from you. Connect with FoodShare
            and help us build a community where good food
            never goes to waste.

          </p>

          {/* Back Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white/15 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/25 transition-all duration-300"
          >

            ← Back to Homepage

          </Link>

        </div>

      </section>

      {/* CONTACT SECTION */}
      <section className="relative py-20 lg:py-28">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section Heading */}
          <div className="text-center mb-14">

            <span className="inline-block px-5 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">

              🌱 Contact FoodShare

            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-green-950">

              We'd Love to Hear From You

            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-7">

              Whether you're a donor, an NGO or someone who
              wants to support our mission, we're happy to connect.

            </p>

          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* LEFT SIDE - CONTACT INFORMATION */}
            <div className="lg:col-span-2 space-y-6">

              {/* Information Heading */}
              <div>

                <h3 className="text-2xl font-extrabold text-green-950">

                  Contact Information

                </h3>

                <p className="mt-3 text-gray-600 leading-7">

                  FoodShare is working to connect people,
                  reduce food waste and support communities.

                </p>

              </div>

              {/* Info Card 1 */}
              <div className="group bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">

                    ✉️

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-green-900">
                      Email Support
                    </h4>

                    <p className="mt-2 text-sm text-gray-600 leading-6">

                      For email inquiries, please use the
                      official contact details provided by
                      the FoodShare team.

                    </p>

                  </div>

                </div>

              </div>

              {/* Info Card 2 */}
              <div className="group bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 shrink-0 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">

                    📍

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-green-900">
                      Our Community
                    </h4>

                    <p className="mt-2 text-sm text-gray-600 leading-6">

                      FoodShare connects food donors
                      and NGOs through a shared platform.

                    </p>

                  </div>

                </div>

              </div>

              {/* Info Card 3 */}
              <div className="group bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 shrink-0 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">

                    🤝

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-green-900">
                      Partnership Opportunities
                    </h4>

                    <p className="mt-2 text-sm text-gray-600 leading-6">

                      Interested in joining as a donor,
                      restaurant, business or NGO?
                      We'd love to work together.

                    </p>

                  </div>

                </div>

              </div>

              {/* Community Card */}
              <div className="relative overflow-hidden bg-gradient-to-r from-green-800 to-emerald-600 rounded-3xl p-7 text-white shadow-lg">

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative">

                  <div className="text-4xl">
                    💚
                  </div>

                  <h3 className="mt-4 text-xl font-bold">

                    Be Part of Something Good

                  </h3>

                  <p className="mt-3 text-green-50/90 text-sm leading-6">

                    Join our growing community and
                    help turn surplus food into hope.

                  </p>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-all duration-300"
                  >

                    Join FoodShare →

                  </Link>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <div className="lg:col-span-3">

              <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-9 lg:p-10 shadow-xl">

                {/* Form Header */}
                <div className="mb-8">

                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl text-3xl">

                    📝

                  </div>

                  <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-green-950">

                    Send Us a Message

                  </h3>

                  <p className="mt-3 text-gray-500 leading-7">

                    Fill out the form below to preview
                    the contact experience.

                  </p>

                </div>

                {/* Demo Notice */}
                {notice && (
                  <div
                    role="status"
                    className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-4 rounded-xl text-sm leading-6"
                  >

                    ℹ️ {notice}

                  </div>
                )}

                {/* Contact Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">

                    {/* Name */}
                    <div>

                      <label
                        htmlFor="contact-name"
                        className={labelStyle}
                      >
                        Full Name
                      </label>

                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        className={inputStyle}
                      />

                    </div>

                    {/* Email */}
                    <div>

                      <label
                        htmlFor="contact-email"
                        className={labelStyle}
                      >
                        Email Address
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className={inputStyle}
                      />

                    </div>

                  </div>

                  {/* Subject */}
                  <div>

                    <label
                      htmlFor="contact-subject"
                      className={labelStyle}
                    >
                      Subject
                    </label>

                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className={inputStyle}
                    >

                      <option value="">
                        Select a subject
                      </option>

                      <option value="general">
                        General Inquiry
                      </option>

                      <option value="donation">
                        Food Donation
                      </option>

                      <option value="ngo">
                        NGO Partnership
                      </option>

                      <option value="support">
                        Technical Support
                      </option>

                      <option value="feedback">
                        Feedback & Suggestions
                      </option>

                    </select>

                  </div>

                  {/* Message */}
                  <div>

                    <label
                      htmlFor="contact-message"
                      className={labelStyle}
                    >
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Write your message here..."
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className={`${inputStyle} resize-none`}
                    ></textarea>

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    Preview Message Submission →

                  </button>

                  {/* Privacy Note */}
                  <p className="text-center text-xs text-gray-500 leading-6">

                    This is a demo form. Messages are not
                    sent or saved yet.

                  </p>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ SECTION */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">

        <div className="max-w-5xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-12">

            <span className="inline-block px-5 py-2 bg-white border border-green-200 rounded-full text-green-700 text-sm font-bold">

              ❓ Frequently Asked Questions

            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-green-950">

              How Can We Help?

            </h2>

            <p className="mt-4 text-gray-600">

              Here are some common questions about FoodShare.

            </p>

          </div>

          {/* FAQ Cards */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* FAQ 1 */}
            <div className="bg-white p-7 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">

              <h3 className="text-lg font-bold text-green-900">

                🍱 How can I donate food?

              </h3>

              <p className="mt-3 text-gray-600 leading-7">

                Register as a donor, access your dashboard
                and follow the available steps to share
                surplus food.

              </p>

            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-7 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">

              <h3 className="text-lg font-bold text-green-900">

                🤝 How can an NGO join FoodShare?

              </h3>

              <p className="mt-3 text-gray-600 leading-7">

                Choose NGO / Volunteer during registration.
                Your account may require approval before
                accessing NGO features.

              </p>

            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-7 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">

              <h3 className="text-lg font-bold text-green-900">

                🌱 What is FoodShare's mission?

              </h3>

              <p className="mt-3 text-gray-600 leading-7">

                FoodShare aims to reduce food waste
                by connecting surplus food donors
                with organizations that can help
                distribute food to people in need.

              </p>

            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-7 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">

              <h3 className="text-lg font-bold text-green-900">

                💚 Who can become a food donor?

              </h3>

              <p className="mt-3 text-gray-600 leading-7">

                Individuals, restaurants and businesses
                can select their donor type
                during registration.

              </p>

            </div>

          </div>

        </div>

           </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Contact;