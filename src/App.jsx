// ============================================================
// MODIFIED FILE — src/App.jsx (এটা আগের version থেকে আরেকটু বদলেছে)
// ============================================================
// নতুন যোগ হয়েছে: ProtectedRoute দিয়ে dashboard routes wrap করা
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute" // NEW

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AvailableFood from "./pages/AvailableFood" // NEW import
import DonorDashboard from "./pages/donor/DonorDashboard"
import NGODashboard from "./pages/ngo/NGODashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/available-food" element={<AvailableFood />} /> {/* NEW */}

          {/* MODIFIED: এখন ProtectedRoute দিয়ে wrap করা */}
          <Route
            path="/donor/dashboard"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ngo/dashboard"
            element={
              <ProtectedRoute allowedRole="ngo">
                <NGODashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App