const OVERPASS_URLS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

export const DEFAULT_CENTER = { lat: 22.3592, lng: 91.8208 };

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function fetchNearbyFromNominatim(lat, lng, radiusMeters) {
  const latDelta = radiusMeters / 111320;
  const lngDelta = radiusMeters / (111320 * Math.cos((lat * Math.PI) / 180));
  const viewbox = [
    lng - lngDelta,
    lat + latDelta,
    lng + lngDelta,
    lat - latDelta,
  ].join(",");

  const amenities = ["restaurant", "cafe", "fast_food", "bakery"];

  const results = await Promise.all(
    amenities.map(async (amenity) => {
      const url = `https://nominatim.openstreetmap.org/search?amenity=${amenity}&viewbox=${viewbox}&bounded=1&format=json&addressdetails=1&extratags=1&limit=50`;
      const res = await fetchWithTimeout(url, {
        headers: { "Accept-Language": "en" },
      });
      if (!res.ok) throw new Error("Nominatim search failed");
      return res.json();
    })
  );

  const seen = new Set();
  const places = [];

  for (const list of results) {
    for (const p of list) {
      const key = `${p.osm_type}-${p.osm_id}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const tags = p.extratags || {};
      const addr = p.address || {};
      const placeLat = parseFloat(p.lat);
      const placeLng = parseFloat(p.lon);
      const dist = distanceKm(lat, lng, placeLat, placeLng);

      if (dist > radiusMeters / 1000 + 0.1) continue;

      places.push({
        id: `osm-${p.osm_id}`,
        name: p.name || p.display_name.split(",")[0],
        type: p.type,
        cuisine: tags.cuisine || null,
        phone: tags.phone || tags["contact:phone"] || null,
        website: tags.website || tags["contact:website"] || null,
        openingHours: tags.opening_hours || null,
        address:
          [addr.road, addr.suburb || addr.neighbourhood, addr.city || addr.town]
            .filter(Boolean)
            .join(", ") || p.display_name,
        lat: placeLat,
        lng: placeLng,
        distanceKm: dist,
      });
    }
  }

  return places.sort((a, b) => a.distanceKm - b.distanceKm);
}

async function queryOverpass(query) {
  let lastError = null;

  for (const url of OVERPASS_URLS) {
    try {
      const res = await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "data=" + encodeURIComponent(query),
      });
      if (!res.ok) throw new Error("Overpass server busy");
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Could not load restaurants. Please try again.");
}

async function fetchNearbyFromOverpass(lat, lng, radiusMeters) {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|cafe|fast_food|bakery"](around:${radiusMeters},${lat},${lng});
      way["amenity"~"restaurant|cafe|fast_food|bakery"](around:${radiusMeters},${lat},${lng});
    );
    out center;
  `;

  const data = await queryOverpass(query);

  return data.elements
    .map((place) => {
      const placeLat = place.lat ?? place.center?.lat;
      const placeLng = place.lon ?? place.center?.lon;
      const tags = place.tags || {};
      return {
        id: `osm-${place.id}`,
        name: tags.name || "Unnamed place",
        type: tags.amenity,
        cuisine: tags.cuisine || null,
        phone: tags.phone || tags["contact:phone"] || null,
        website: tags.website || tags["contact:website"] || null,
        openingHours: tags.opening_hours || null,
        address:
          [tags["addr:street"], tags["addr:suburb"], tags["addr:city"]]
            .filter(Boolean)
            .join(", ") || null,
        lat: placeLat,
        lng: placeLng,
        distanceKm: distanceKm(lat, lng, placeLat, placeLng),
      };
    })
    .filter((r) => r.name !== "Unnamed place")
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export async function fetchNearbyRestaurants(lat, lng, radiusMeters = 3000) {
  try {
    return await fetchNearbyFromNominatim(lat, lng, radiusMeters);
  } catch (err) {
    return await fetchNearbyFromOverpass(lat, lng, radiusMeters);
  }
}

export function getUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_CENTER);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(DEFAULT_CENTER),
      { timeout: 8000 }
    );
  });
}

export async function searchRestaurantsByName(name) {
  const q = encodeURIComponent(`${name}, Chattogram, Bangladesh`);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1&limit=10`,
    { headers: { "Accept-Language": "en" } }
  );

  if (!res.ok) throw new Error("Search failed. Please try again.");

  const data = await res.json();
  const places = data.filter(
    (p) => p.class === "amenity" || p.class === "tourism"
  );
  const list = places.length > 0 ? places : data;

  return list.map((place) => ({
    osmId: place.osm_id,
    name: place.name || place.display_name.split(",")[0],
    address: place.display_name,
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
    type: place.type,
  }));
}
