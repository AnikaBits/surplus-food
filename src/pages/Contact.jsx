function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-green-700 text-center">
          Contact Us
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Have a question or want to work with us? Send us a message.
        </p>

        <form className="mt-10 bg-white p-8 rounded-xl shadow-sm space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  )
}

export default Contact