import { useEffect, useState } from "react";
import {
  fetchNearbyRestaurants,
  getUserLocation,
  DEFAULT_CENTER,
} from "../../../services/restaurantApi";

function NearbyRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const center = await getUserLocation();
        setUsedFallback(
          center.lat === DEFAULT_CENTER.lat && center.lng === DEFAULT_CENTER.lng
        );
        const list = await fetchNearbyRestaurants(center.lat, center.lng);
        setRestaurants(list);
      } catch (err) {
        setError("Could not load nearby restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const nearest = restaurants.length > 0 ? restaurants[0] : null;
  const withPhone = restaurants.filter((r) => r.phone).length;

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-900 via-green-700 to-emerald-500 px-7 py-9 sm:px-10 shadow-lg">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
          📍 OpenStreetMap • Real Places
        </span>

        <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
          Nearby Restaurants
        </h2>

        <p className="mt-3 max-w-xl text-sm sm:text-base leading-7 text-green-50/90">
          Discover real restaurants, cafes and bakeries around you. Visit or
          contact them and invite them to join FoodShare as food donors.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 px-5 py-3">
          <span className="text-2xl">💚</span>
          <div>
            <p className="text-xs text-green-100">Potential Donor Partners</p>
            <p className="text-sm font-bold text-white">
              {loading ? "Searching..." : `${restaurants.length} Places Found Nearby`}
            </p>
          </div>
        </div>
      </section>

      {/* SAFETY NOTE */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm leading-6 text-amber-800">
        ⚠️ These are real places from OpenStreetMap. They are <strong>not</strong>{" "}
        FoodShare partners yet — please contact and verify a restaurant before
        collecting any food from them. Food can only be received through
        registered, admin-approved donors.
      </div>

      {usedFallback && !loading && (
        <p className="text-sm text-gray-500">
          📍 Showing restaurants near GEC Circle, Chattogram (location access is off).
        </p>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">🍽️</div>
          <p className="mt-4 text-sm text-gray-500">Places Found</p>
          <p className="mt-1 text-2xl font-extrabold text-green-950">
            {loading ? "..." : restaurants.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">🧭</div>
          <p className="mt-4 text-sm text-gray-500">Nearest Place</p>
          <p className="mt-1 text-2xl font-extrabold text-green-950">
            {nearest ? `${nearest.distanceKm.toFixed(1)} km` : "—"}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">📞</div>
          <p className="mt-4 text-sm text-gray-500">With Phone Number</p>
          <p className="mt-1 text-2xl font-extrabold text-green-950">
            {loading ? "..." : withPhone}
          </p>
        </div>
      </div>

      {/* STATES */}
      {loading && (
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-8 text-center text-gray-500">
          Finding real restaurants near you...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-8 text-center text-gray-500">
          No restaurants found within 3 km of this location.
        </div>
      )}

      {/* RESTAURANT CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start gap-3">
              <h3 className="font-bold text-green-950">{r.name}</h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 capitalize whitespace-nowrap">
                {r.type.replace("_", " ")}
              </span>
            </div>

            <div className="mt-3 space-y-1.5 text-sm text-gray-500">
              {r.cuisine && (
                <p className="capitalize">
                  🍽️ {r.cuisine.replaceAll(";", ", ").replaceAll("_", " ")}
                </p>
              )}
              {r.address && <p>📍 {r.address}</p>}
              {r.phone && (
                <p>
                  📞{" "}
                  <a href={`tel:${r.phone}`} className="text-green-700 font-medium hover:underline">
                    {r.phone}
                  </a>
                </p>
              )}
              {r.openingHours && <p>⏰ {r.openingHours}</p>}
            </div>

            <p className="mt-3 text-sm font-bold text-green-800">
              {r.distanceKm.toFixed(1)} km away
            </p>

            <div className="flex gap-2 mt-4">
              <a
                href={`https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lng}#map=18/${r.lat}/${r.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-gradient-to-r from-green-700 to-emerald-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                View on Map
              </a>
              {r.website && (
                <a
                  href={r.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center border border-green-600 text-green-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50 transition"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default NearbyRestaurants;
