function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-3xl font-bold text-green-700">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Manage the FoodShare platform.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="mt-2 text-gray-600">
            Manage registered users.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Donations</h2>
          <p className="mt-2 text-gray-600">
            Manage food donations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Requests</h2>
          <p className="mt-2 text-gray-600">
            Manage food requests.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="mt-2 text-gray-600">
            View platform statistics.
          </p>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard