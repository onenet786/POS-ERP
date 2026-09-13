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
        const place = a.residential || a.suburb || a.neighbourhood || a.road || a.commercial || a.village || a.town || '';
        const city = a.city || a.town || a.county || a.municipality || '';
        const state = a.state || '';
        const country = a.country || '';
        const parts = [place, city, state, country].filter(p => p && p.trim().length > 0);
        const unique = parts.filter((item, pos, arr) => !pos || item !== arr[pos - 1]);
        if (unique.length > 0) {
          const result = unique.join(', ');
          geocodeCache.set(cacheKey, result);
          return result;
        }
      }
      if (data.display_name) {
        const result = data.display_name.split(',').slice(0, 3).join(', ').trim();
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
