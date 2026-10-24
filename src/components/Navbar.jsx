import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Available Food", path: "/available-food" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-300">

              <span className="text-white text-2xl">
                🌱
              </span>

            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-green-800">
                Food<span className="text-green-500">Share</span>
              </h1>

              <p className="text-[10px] tracking-widest text-gray-500 uppercase">
                Share Food • Spread Hope
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-semibold transition-colors duration-300 group ${
                    isActive && !link.path.includes("#")
                      ? "text-green-700"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                {link.name}

                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}

          </div>

          {/* Desktop Authentication */}
          <div className="hidden lg:flex items-center gap-4">

            <Link
              to="/login"
              className="text-green-700 font-semibold hover:text-green-500 transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started →
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-green-700 text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden pb-6 pt-3 border-t border-green-100">

            <div className="flex flex-col gap-4">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium hover:text-green-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-3 pt-4 border-t border-gray-100">

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-2 border border-green-600 text-green-700 rounded-lg font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold"
                >
                  Register
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;