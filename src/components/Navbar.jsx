import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-700"
        >
          FoodShare
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-green-600"
          >
            About
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-green-600"
          >
            How It Works
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-green-600"
          >
            Available Food
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-green-600"
          >
            Contact
          </Link>

        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-4 py-2 text-green-700 font-medium hover:text-green-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar