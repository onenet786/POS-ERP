const geocodeCache = new Map();

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

  // 1. OpenStreetMap Nominatim
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${numLat}&lon=${numLng}&format=json&accept-language=en`;
    const res = await fetch(nomUrl, {
      headers: { 'User-Agent': 'BinIshaqSoftsERP/2.0 (info@binishaqsoft.com)' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.address) {
        const a = data.address;

        // Extract road if valid
        const road = a.road || '';

        // Extract true local area (neighborhood, suburb, town, village)
        let local = a.town || a.suburb || a.neighbourhood || a.village || a.quarter || '';

        // Check for erroneous OSM residential society tags (e.g., Al-Rehman Garden Phase-7 falsely tagged in Batapur)
        let society = a.residential || '';
        if (society.includes('Al-Rehman Garden') && (local.includes('Batapur') || a.postcode === '53400' || (numLat > 31.55 && numLng > 74.45))) {
          society = ''; // Filter out false tag
        }

        // Clean City / District
        const city = a.city || a.city_district?.replace(' District', '') || a.county?.replace(' District', '') || a.municipality?.replace(' Tehsil', '') || '';
        const state = a.state || '';
        const country = a.country || '';

        const parts = [];
        if (road && road !== local && !road.toLowerCase().includes('unnamed')) parts.push(road);
        if (society) parts.push(society);
        if (local && !parts.includes(local)) parts.push(local);
        if (city && !parts.includes(city)) parts.push(city);
        if (state && !parts.includes(state)) parts.push(state);
        if (country && !parts.includes(country)) parts.push(country);

        const result = parts.filter(Boolean).join(', ');
        if (result.length > 0) {
          geocodeCache.set(cacheKey, result);
          return result;
        }
      }
      if (data.display_name) {
        let cleaned = data.display_name;
        if (cleaned.includes('Al-Rehman Garden Phase-7') && cleaned.includes('Batapur')) {
          cleaned = cleaned.replace('Al-Rehman Garden Phase-7, ', '');
        }
        const result = cleaned.split(',').slice(0, 4).join(', ').trim();
        geocodeCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (err) {
    // Fall through to fallback provider
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
