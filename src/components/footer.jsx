function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="grid md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-green-400">
              FoodShare
            </h2>

            <p className="mt-3 text-gray-400">
              Connecting surplus food with people in need
              and helping create a world with less food waste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <div className="mt-3 space-y-2 text-gray-400">
              <p>Home</p>
              <p>About</p>
              <p>How It Works</p>
              <p>Contact</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Contact Us
            </h3>

            <div className="mt-3 space-y-2 text-gray-400">
              <p>Email: foodshare@example.com</p>
              <p>Phone: +880 1234-567890</p>
              <p>Chattogram, Bangladesh</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          © 2026 FoodShare. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer