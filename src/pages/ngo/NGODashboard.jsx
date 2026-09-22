function NGODashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-3xl font-bold text-green-700">
        NGO / Volunteer Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Find surplus food and manage your requests.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Available Food</h2>
          <p className="mt-2 text-gray-600">
            Browse available food donations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">My Requests</h2>
          <p className="mt-2 text-gray-600">
            Track your food requests.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">History</h2>
          <p className="mt-2 text-gray-600">
            View completed pickups and deliveries.
          </p>
        </div>

      </div>

    </div>
  )
}

export default NGODashboard