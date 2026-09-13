import { AppState, showToast } from './state.js';
import { Api } from './api.js';
import { getHumanReadableLocation } from './mobileBooker.js';

let _activeWatchId = null;
let _lastSentCoords = { lat: 0, lng: 0, time: 0 };

/**
 * Universal Multi-Tier Booker GPS & Location Tracker
 * Tier 1: Fast network/cached geolocation (resolves in < 1s)
 * Tier 2: High-accuracy GPS hardware refinement (±5m to ±15m)
 * Tier 3: Client IP Geolocation fallback (if browser GPS permission is blocked/indoor timeout)
 */
export async function trackBookerLocation(options = { showNotification: false, isManual: false }) {
  const currentUser = AppState.currentUser;
  const isBooker = currentUser?.role_id === 4 || (currentUser?.role_name || '').toLowerCase().includes('booker');
  if (!isBooker && !options.force) return;

  const updateStatusText = (html, color = '#38bdf8') => {
    const el = document.getElementById('gps-status-text');
    if (el) {
      el.innerHTML = html;
      if (color) el.style.color = color;
    }
  };

  updateStatusText(`📡 Acquiring Live Location...`, '#38bdf8');

  // Helper to send location payload to backend API
  const pushLocation = async (lat, lng, accuracy, humanLoc, source = 'GPS') => {
    // Throttle duplicate pings within 3 seconds unless moved > 20 meters
    const now = Date.now();
    const dist = Math.hypot(lat - _lastSentCoords.lat, lng - _lastSentCoords.lng);
    if (dist < 0.0002 && (now - _lastSentCoords.time) < 3000 && !options.isManual) {
      return;
    }
    _lastSentCoords = { lat, lng, time: now };

    AppState.mobileCart.geoLat = lat;
    AppState.mobileCart.geoLng = lng;
    AppState.mobileCart.humanLocation = humanLoc;

    updateStatusText(`
      <div style="font-weight:700; color:#ffffff; line-height:1.35; font-size:0.92rem;">📍 ${humanLoc}</div>
      <div style="font-size:0.75rem; color:#38bdf8; font-family:var(--font-mono); margin-top:4px; display:flex; gap:10px; align-items:center;">
        <span>🛰️ ${source}: <strong>${Number(lat).toFixed(5)}°, ${Number(lng).toFixed(5)}°</strong></span>
        <span style="color:#34d399; font-weight:600;">(±${accuracy}m)</span>
      </div>
    `, '#34d399');

    let batteryLevel = 90;
    if ('getBattery' in navigator) {
      try {
        const b = await navigator.getBattery();
        batteryLevel = Math.round(b.level * 100);
      } catch (_) {}
    }

    const custSelect = document.getElementById('mobile-cust-select');
    const defaultCust = AppState.customers.find(c => c.id !== 1) || AppState.customers[0];
    const custId = custSelect?.value ? Number(custSelect.value) : (defaultCust?.id || 2);
    const cust = AppState.customers.find(c => c.id === custId);
    const shopName = cust ? (cust.business_name || cust.name) : 'Field Route';

    try {
      const res = await Api.post('/sales/booker/location', {
        user_id: currentUser?.id || 4,
        booker_name: currentUser?.full_name || 'Hamza Khan (Field Booker)',
        phone: currentUser?.phone || '+92 300 9876543',
        latitude: lat,
        longitude: lng,
        human_location: humanLoc,
        accuracy: Math.round(accuracy),
        battery_level: batteryLevel,
        status: 'CHECKED_IN',
        shop_id: custId,
        shop_name: shopName,
        address: humanLoc
      });

      if (res?.success) {
        console.log(`[GPS Tracker] Location synced (${source}):`, humanLoc);
        if (options.showNotification || options.isManual) {
          showToast(`✓ Live location verified: ${humanLoc}`, 'success');
        }
      }
    } catch (err) {
      console.warn('[GPS Tracker] Sync notice:', err.message || err);
    }
  };

  let hasResolvedLocation = false;

  // Progressive Fallback Timer: If device GPS hasn't resolved within 2 seconds, trigger IP Geolocation
  const ipFallbackTimer = setTimeout(async () => {
    if (!hasResolvedLocation) {
      console.log('[GPS Tracker] Device GPS taking >2s, initiating fast IP Geolocation fallback...');
      await fallbackIpGeolocation(pushLocation, updateStatusText);
    }
  }, 2000);

  // TIER 1: Fast Network/Cellular Geolocation (high speed, <1s)
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        hasResolvedLocation = true;
        clearTimeout(ipFallbackTimer);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = Math.round(pos.coords.accuracy || 15);
        const human = await getHumanReadableLocation(lat, lng);
        await pushLocation(lat, lng, acc, human, 'Network GPS');
      },
      (err) => {
        console.warn('[GPS] Fast Network Geolocation notice:', err.code, err.message);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );

    // TIER 2: High-Accuracy GPS hardware refinement
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        hasResolvedLocation = true;
        clearTimeout(ipFallbackTimer);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = Math.round(pos.coords.accuracy || 8);
        const human = await getHumanReadableLocation(lat, lng);
        await pushLocation(lat, lng, acc, human, 'Live GPS');
      },
      async (err) => {
        console.warn('[GPS] High accuracy notice:', err.code, err.message);
        if (!hasResolvedLocation) {
          clearTimeout(ipFallbackTimer);
          await fallbackIpGeolocation(pushLocation, updateStatusText);
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  } else {
    clearTimeout(ipFallbackTimer);
    await fallbackIpGeolocation(pushLocation, updateStatusText);
  }
}

/**
 * TIER 3: Multi-Provider IP Geolocation Fallback
 * Resolves city and coordinates from connection network IP when device GPS is unavailable or blocked
 */
async function fallbackIpGeolocation(pushLocation, updateStatusText) {
  updateStatusText(`🌐 Detecting city via network IP...`, '#fbbf24');

  // Provider 1: freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json');
    if (res.ok) {
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        const lat = Number(data.latitude);
        const lng = Number(data.longitude);
        const city = data.cityName || 'Faisalabad';
        const region = data.regionName || 'Punjab';
        const country = data.countryName || 'Pakistan';
        const humanLoc = `${city}, ${region}, ${country}`;
        await pushLocation(lat, lng, 500, humanLoc, 'Network IP');
        return;
      }
    }
  } catch (err) {
    console.warn('[IP Geolocation Provider 1 Notice]', err.message || err);
  }

  // Provider 2: ipwho.is
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.latitude && data.longitude) {
        const lat = Number(data.latitude);
        const lng = Number(data.longitude);
        const city = data.city || 'Faisalabad';
        const region = data.region || 'Punjab';
        const country = data.country || 'Pakistan';
        const humanLoc = `${city}, ${region}, ${country}`;
        await pushLocation(lat, lng, 500, humanLoc, 'Network IP');
        return;
      }
    }
  } catch (err) {
    console.warn('[IP Geolocation Provider 2 Notice]', err.message || err);
  }

  // Provider 3: ipapi.co
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        const lat = Number(data.latitude);
        const lng = Number(data.longitude);
        const city = data.city || 'Faisalabad';
        const region = data.region || 'Punjab';
        const country = data.country_name || 'Pakistan';
        const humanLoc = `${city}, ${region}, ${country}`;
        await pushLocation(lat, lng, 500, humanLoc, 'Network IP');
        return;
      }
    }
  } catch (err) {
    console.warn('[IP Geolocation Provider 3 Notice]', err.message || err);
  }

  updateStatusText(`⚠️ Please tap Check-in to enable location`, '#fbbf24');
}

/**
 * Start Continuous Live Background GPS Watching
 */
export function startContinuousTracking() {
  if (_activeWatchId !== null || !('geolocation' in navigator)) return;

  const isBooker = AppState.currentUser?.role_id === 4 || (AppState.currentUser?.role_name || '').toLowerCase().includes('booker');
  if (!isBooker) return;

  _activeWatchId = navigator.geolocation.watchPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const acc = Math.round(pos.coords.accuracy || 10);
      const human = await getHumanReadableLocation(lat, lng);

      const custSelect = document.getElementById('mobile-cust-select');
      const defaultCust = AppState.customers.find(c => c.id !== 1) || AppState.customers[0];
      const custId = custSelect?.value ? Number(custSelect.value) : (defaultCust?.id || 2);
      const cust = AppState.customers.find(c => c.id === custId);
      const shopName = cust ? (cust.business_name || cust.name) : 'Field Route';

      Api.post('/sales/booker/location', {
        user_id: AppState.currentUser?.id || 4,
        booker_name: AppState.currentUser?.full_name || 'Hamza Khan (Field Booker)',
        phone: AppState.currentUser?.phone || '+92 300 9876543',
        latitude: lat,
        longitude: lng,
        human_location: human,
        accuracy: acc,
        status: 'IN_TRANSIT',
        shop_id: custId,
        shop_name: shopName,
        address: human
      }).catch(() => {});
    },
    (err) => {
      console.warn('[GPS Watcher Notice]', err.message);
    },
    { enableHighAccuracy: true, maximumAge: 30000, timeout: 30000 }
  );

  console.log('[GPS Tracker] Continuous GPS tracking active (Watch ID:', _activeWatchId, ')');
}

export function stopContinuousTracking() {
  if (_activeWatchId !== null && 'geolocation' in navigator) {
    navigator.geolocation.clearWatch(_activeWatchId);
    _activeWatchId = null;
    console.log('[GPS Tracker] Continuous GPS tracking stopped');
  }
}
