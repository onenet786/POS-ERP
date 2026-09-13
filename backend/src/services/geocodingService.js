const geocodeCache = new Map();

export function normalizeAddress(a, displayName = '') {
  if (!a) {
    if (!displayName) return 'Field Location Identified';
    let clean = displayName
      .replace(/Al-Rehman Garden Phase-7/gi, 'Al Rehman Garden')
      .replace(/Al-Rehman/gi, 'Al Rehman');
    return clean.split(',').slice(0, 4).join(', ').trim();
  }

  // 1. House number / Building
  const houseNumber = a.house_number || a.street_number || '';

  // 2. Road / Street
  let road = a.road || '';
  if (road.toLowerCase().includes('unnamed')) road = '';

  // 3. Society / Neighborhood / Suburb
  let neighborhood = a.residential || a.suburb || a.neighbourhood || a.quarter || '';
  neighborhood = neighborhood.replace(/Al-Rehman/gi, 'Al Rehman');
  if (neighborhood.includes('Al Rehman Garden')) {
    neighborhood = 'Al Rehman Garden';
  }

  // 4. Town / Locality (omit redundant tehsil if major society is already identified)
  let town = a.town || a.village || '';
  if (neighborhood && (neighborhood.includes('Garden') || neighborhood.includes('Town') || neighborhood.includes('DHA') || neighborhood.includes('Gulberg') || neighborhood.includes('Model'))) {
    town = '';
  }

  // 5. Metropolitan City / District
  let city = a.city || '';
  if (!city && a.county) city = a.county.replace(/\s+(District|Division)/gi, '').trim();
  if (!city && a.city_district) city = a.city_district.replace(/\s+District/gi, '').trim();
  if (!city && a.municipality) city = a.municipality.replace(/\s+Tehsil/gi, '').trim();

  // 6. Province / State
  const state = a.state || '';

  // 7. Country
  const country = a.country || '';

  const parts = [];
  if (houseNumber) parts.push(houseNumber);
  if (road && !parts.includes(road) && road !== neighborhood) parts.push(road);
  if (neighborhood && !parts.includes(neighborhood)) parts.push(neighborhood);
  if (town && !parts.includes(town) && town !== city) parts.push(town);
  if (city && !parts.includes(city)) parts.push(city);
  if (state && !parts.includes(state)) parts.push(state);
  if (country && !parts.includes(country)) parts.push(country);

  return parts.filter(Boolean).join(', ');
}

export async function reverseGeocodeCoordinates(lat, lng) {
  if (!lat || !lng) return 'Field Location Identified';
  const numLat = Number(lat);
  const numLng = Number(lng);
  if (isNaN(numLat) || isNaN(numLng)) return 'Field Location Identified';

  // Cache key rounded to ~11 meters
  const cacheKey = `${numLat.toFixed(4)},${numLng.toFixed(4)}`;
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  // 1. OpenStreetMap Nominatim with Address Details
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${numLat}&lon=${numLng}&format=json&accept-language=en&addressdetails=1`;
    const res = await fetch(nomUrl, {
      headers: { 'User-Agent': 'BinIshaqSoftsERP/2.0 (info@binishaqsoft.com)' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const normalized = normalizeAddress(data.address, data.display_name);
      if (normalized && normalized !== 'Field Location Identified') {
        geocodeCache.set(cacheKey, normalized);
        return normalized;
      }
    }
  } catch (err) {
    // Fall through to secondary provider
  }

  // 2. BigDataCloud API
  try {
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${numLat}&longitude=${numLng}&localityLanguage=en`;
    const bdcRes = await fetch(bdcUrl, { signal: AbortSignal.timeout(3500) });
    if (bdcRes.ok) {
      const b = await bdcRes.json();
      const parts = [];
      if (b.locality && b.locality !== b.city) parts.push(b.locality);
      if (b.city) parts.push(b.city);
      if (b.principalSubdivision && b.principalSubdivision !== b.city) parts.push(b.principalSubdivision);
      if (b.countryName) parts.push(b.countryName);
      if (parts.length > 0) {
        const result = parts.join(', ');
        geocodeCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (_) {}

  // 3. Fallback format with coordinates
  const fallback = `Field Location (${numLat.toFixed(4)}°, ${numLng.toFixed(4)}°)`;
  return fallback;
}
