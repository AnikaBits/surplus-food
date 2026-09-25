// ============================================================
// NEW FILE — src/components/ProtectedRoute.jsx
// ============================================================
// এটা যেকোনো dashboard route কে "wrap" করবে, যাতে:
//   - যে login করেনি, সে সরাসরি URL দিয়ে dashboard এ ঢুকতে না পারে
//   - Donor যেন ভুলেও Admin/NGO dashboard এ ঢুকতে না পারে
// App.jsx এ এটা ব্যবহার হবে (নিচে দেখানো হয়েছে কীভাবে)
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // localStorage থেকে data লোড হওয়ার সময় কিছু না দেখানো

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== allowedRole) {
    // ভুল role এর কেউ ঢুকতে চাইলে তার নিজের dashboard এ পাঠিয়ে দেওয়া হচ্ছে
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />;
  }

  return children;
}

export default ProtectedRoute;