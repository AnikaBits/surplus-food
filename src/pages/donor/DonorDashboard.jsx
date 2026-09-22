function DonorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-3xl font-bold text-green-700">
        Donor Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to your FoodShare donor dashboard.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">My Donations</h2>
          <p className="mt-2 text-gray-600">
            Manage your food donations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Requests</h2>
          <p className="mt-2 text-gray-600">
            View requests for your donations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">Donation History</h2>
          <p className="mt-2 text-gray-600">
            See your previous donations.
          </p>
        </div>

      </div>

    </div>
  )
}

export default DonorDashboard