import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function RateDonor() {
  const {
    currentUser,
    donations = [],
    setDonations,
    users = [],
  } = useAuth();

  const [ratings, setRatings] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Delivered donations waiting for rating
  const deliveredUnrated = donations.filter(
    (donation) =>
      donation.requestedBy === currentUser?.id &&
      donation.status === "delivered" &&
      !donation.rating
  );

  // Already rated donations
  const alreadyRated = donations.filter(
    (donation) =>
      donation.requestedBy === currentUser?.id &&
      donation.status === "delivered" &&
      Boolean(donation.rating)
  );

  const totalDelivered =
    deliveredUnrated.length + alreadyRated.length;

  const totalRated = alreadyRated.length;
  const pendingRatings = deliveredUnrated.length;

  const averageRating =
    totalRated > 0
      ? (
          alreadyRated.reduce(
            (sum, donation) =>
              sum + Number(donation.rating || 0),
            0
          ) / totalRated
        ).toFixed(1)
      : "0.0";

  function getDonorName(donorId) {
    const donor = users.find((user) => user.id === donorId);

    return donor ? donor.name : "Unknown Donor";
  }

  function getDonor(donorId) {
    return users.find((user) => user.id === donorId);
  }

  function handleRatingChange(donationId, star) {
    setRatings((previous) => ({
      ...previous,
      [donationId]: star,
    }));
  }

  function handleHover(donationId, star) {
    setHoveredRatings((previous) => ({
      ...previous,
      [donationId]: star,
    }));
  }

  function clearHover(donationId) {
    setHoveredRatings((previous) => ({
      ...previous,
      [donationId]: 0,
    }));
  }

  function getRatingMessage(rating) {
    switch (Number(rating)) {
      case 1:
        return "Needs Improvement";
      case 2:
        return "Fair Experience";
      case 3:
        return "Good Experience";
      case 4:
        return "Very Good Experience";
      case 5:
        return "Excellent Experience!";
      default:
        return "Select a rating to share your experience";
    }
  }

  function submitRating(donationId) {
    const rating = Number(ratings[donationId]);

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return;
    }

    const donation = donations.find(
      (item) =>
        item.id === donationId &&
        item.requestedBy === currentUser?.id &&
        item.status === "delivered" &&
        !item.rating
    );

    if (!donation) return;

    setDonations(
      donations.map((item) =>
        item.id === donationId
          ? {
              ...item,
              rating,
            }
          : item
      )
    );

    setRatings((previous) => {
      const updated = { ...previous };
      delete updated[donationId];
      return updated;
    });

    setSuccessMessage(
      `Your rating for ${getDonorName(
        donation.donorId
      )} has been submitted successfully!`
    );
  }

  const stats = [
    {
      title: "Total Deliveries",
      value: totalDelivered,
      icon: "📦",
      bg: "bg-green-100",
      color: "text-green-800",
    },
    {
      title: "Pending Ratings",
      value: pendingRatings,
      icon: "⭐",
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Completed Ratings",
      value: totalRated,
      icon: "✅",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "Average Rating",
      value: `${averageRating} / 5`,
      icon: "🌟",
      bg: "bg-yellow-100",
      color: "text-yellow-700",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl p-7 sm:p-9 text-white shadow-lg">

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-sm font-semibold">
            ⭐ Donor Feedback & Appreciation
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
            Rate Donor
          </h2>

          <p className="mt-4 text-green-50/90 max-w-2xl leading-7">
            Share your experience with food donors,
            recognize their contributions, and help
            build a trustworthy FoodShare community.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 bg-white/15 px-5 py-3 rounded-xl">

            <span className="text-2xl">💚</span>

            <div>
              <p className="text-xs text-green-100">
                Community Appreciation
              </p>

              <p className="font-bold">
                {totalRated} Donor Ratings Submitted
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >

            <div
              className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>

            <p className="mt-5 text-sm font-semibold text-gray-500">
              {stat.title}
            </p>

            <h3
              className={`mt-2 text-2xl sm:text-3xl font-extrabold ${stat.color}`}
            >
              {stat.value}
            </h3>

          </div>
        ))}

      </div>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div
          role="status"
          className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start justify-between gap-4"
        >

          <div className="flex items-start gap-3">

            <span className="text-xl">✅</span>

            <div>
              <p className="font-bold text-green-800">
                Rating Submitted!
              </p>

              <p className="mt-1 text-sm text-green-700">
                {successMessage}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="text-green-700 font-bold"
            aria-label="Dismiss message"
          >
            ✕
          </button>

        </div>
      )}

      {/* PENDING RATINGS */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              ⭐ Pending Donor Ratings
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Rate donors after completing food deliveries
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-bold">
            {pendingRatings} Pending
          </span>

        </div>

        {deliveredUnrated.length === 0 ? (

          <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center">

            <div className="text-5xl mb-4">
              🎉
            </div>

            <h4 className="font-bold text-green-900 text-lg">
              All Caught Up!
            </h4>

            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-6">
              You have no delivered food donations
              waiting for a rating.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {deliveredUnrated.map((donation) => {

              const donor = getDonor(donation.donorId);

              const selectedRating =
                ratings[donation.id] || 0;

              const hoveredRating =
                hoveredRatings[donation.id] || 0;

              const displayRating =
                hoveredRating || selectedRating;

              return (
                <div
                  key={donation.id}
                  className="border border-green-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
                >

                  {/* DONOR DETAILS */}
                  <div className="bg-green-50 px-5 sm:px-6 py-5">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                      <div className="w-14 h-14 rounded-full bg-green-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">

                        {donor?.image ? (
                          <img
                            src={donor.image}
                            alt={getDonorName(donation.donorId)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">👤</span>
                        )}

                      </div>

                      <div className="flex-1 min-w-0">

                        <h4 className="text-lg font-extrabold text-green-950">
                          {getDonorName(donation.donorId)}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          Food Donor
                        </p>

                      </div>

                      <span className="self-start px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                        ✅ Delivered
                      </span>

                    </div>

                  </div>

                  {/* RATING CONTENT */}
                  <div className="p-5 sm:p-7">

                    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 mb-7">

                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        🍱
                      </div>

                      <div>

                        <p className="text-xs text-gray-400 font-semibold">
                          Donated Food
                        </p>

                        <h5 className="mt-1 font-bold text-gray-800">
                          {donation.foodItems?.[0]?.name ||
                            "Food Donation"}
                        </h5>

                      </div>

                    </div>

                    <div className="text-center">

                      <h5 className="text-lg font-bold text-green-950">
                        How was your experience?
                      </h5>

                      <p className="mt-2 text-sm text-gray-500">
                        Select a star rating from 1 to 5
                      </p>

                      {/* INTERACTIVE STARS */}
                      <div
                        className="flex items-center justify-center gap-2 sm:gap-3 mt-6"
                        onMouseLeave={() =>
                          clearHover(donation.id)
                        }
                      >

                        {[1, 2, 3, 4, 5].map((star) => (

                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              handleRatingChange(
                                donation.id,
                                star
                              )
                            }
                            onMouseEnter={() =>
                              handleHover(
                                donation.id,
                                star
                              )
                            }
                            aria-label={`Rate ${star} out of 5 stars`}
                            aria-pressed={selectedRating === star}
                            className={`text-4xl sm:text-5xl transition-all duration-200 hover:scale-125 ${
                              displayRating >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </button>

                        ))}

                      </div>

                      <p className="mt-5 text-sm font-bold text-green-800">
                        {getRatingMessage(
                          selectedRating
                        )}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          submitRating(donation.id)
                        }
                        disabled={!selectedRating}
                        className={`mt-7 w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                          selectedRating
                            ? "bg-gradient-to-r from-green-700 to-emerald-500 text-white hover:shadow-lg"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        ⭐ Submit Rating
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

      {/* PREVIOUSLY SUBMITTED RATINGS */}
      <div className="bg-white border border-green-100 rounded-3xl p-6 sm:p-8 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
              ✅ Previously Submitted Ratings
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Review ratings you have already submitted
            </p>

          </div>

          <span className="self-start px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold">
            {totalRated} Rated
          </span>

        </div>

        {alreadyRated.length === 0 ? (

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">

            <div className="text-5xl mb-4">
              📭
            </div>

            <h4 className="font-bold text-gray-800">
              No Ratings Submitted Yet
            </h4>

            <p className="mt-3 text-sm text-gray-500">
              Your submitted donor ratings will appear here.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-5">

            {alreadyRated.map((donation) => (

              <div
                key={donation.id}
                className="border border-green-100 rounded-2xl p-5 sm:p-6 hover:bg-green-50/40 transition"
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl shrink-0">
                    👤
                  </div>

                  <div className="min-w-0">

                    <h4 className="font-extrabold text-green-950">
                      {getDonorName(donation.donorId)}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      {donation.foodItems?.[0]?.name ||
                        "Food Donation"}
                    </p>

                  </div>

                </div>

                <div className="mt-5 pt-5 border-t border-gray-100">

                  <div
                    className="flex items-center gap-1 text-2xl"
                    aria-label={`${donation.rating} out of 5 stars`}
                  >

                    {[1, 2, 3, 4, 5].map((star) => (

                      <span
                        key={star}
                        className={
                          Number(donation.rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>

                    ))}

                  </div>

                  <p className="mt-3 text-sm font-bold text-green-800">
                    {getRatingMessage(donation.rating)}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* INFORMATION */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <span className="text-2xl">
            💡
          </span>

          <div>

            <h3 className="font-bold text-green-900">
              Why Your Ratings Matter
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-7">
              Your ratings help recognize food donors
              and encourage positive contributions
              to the FoodShare community.
              You can rate a donor after the food
              delivery has been completed.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RateDonor;