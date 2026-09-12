import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';

let localOfflineOrders = JSON.parse(localStorage.getItem('apexerppos_offline_orders') || '[]');

export function renderMobileBookerView(container) {
  container.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; padding-bottom: 70px;">
      <!-- Mobile App Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <span class="tag tag-info" style="font-size:0.75rem;">Field Booker PWA</span>
          <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:700; margin-top:4px;">Mobile Order Booker</h2>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-camera-scanner">
          📷 Scan Barcode
        </button>
      </div>

      <!-- GPS Geo-Location Card -->
      <div class="glass-panel" style="margin-bottom:1rem; padding:1rem; border-color:rgba(56,189,248,0.3);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Sales Rep GPS Tagging</div>
            <div id="gps-status-text" style="font-weight:600; font-size:0.9rem; color:#38bdf8;">📍 Acquiring GPS Coordinates...</div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-refresh-gps">Check-in</button>
        </div>
      </div>

      <!-- Customer Selector -->
      <div class="glass-panel" style="margin-bottom:1rem; padding:1rem;">
        <label class="form-label">Select Shop / Customer:</label>
        <select id="mobile-cust-select" class="form-control" style="font-size:0.95rem;">
          ${AppState.customers.map(c => `
            <option value="${c.id}">${c.business_name || c.name} - ${c.city}</option>
          `).join('')}
        </select>
        <div id="cust-balance-preview" style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
          Outstanding Balance: <strong style="color:#f87171;">${formatCurrency(AppState.customers[1]?.current_balance || 0)}</strong>
        </div>
      </div>

      <!-- Product Catalog Cards -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <h3 style="font-size:1.05rem; font-weight:700;">Catalog</h3>
        <span style="font-size:0.8rem; color:var(--text-muted);"><span id="mobile-cart-count">0</span> items selected</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.5rem;" id="mobile-prods-list">
        ${AppState.products.map(p => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div>
              <div style="font-weight:600; font-size:0.92rem; color:#ffffff;">${p.name}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${p.sku} | In Stock: ${p.stock}</div>
              <div style="font-weight:700; color:#38bdf8; font-size:1rem; margin-top:2px;">${formatCurrency(p.selling_price)}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn btn-outline btn-sm mobile-add-btn" data-prod-id="${p.id}" style="padding:0.4rem 0.85rem; font-weight:700;">
                + Add
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Mobile Checkout Footer -->
      <div style="position:fixed; bottom:0; left:0; right:0; background:var(--bg-surface); border-top:1px solid var(--border-color); padding:1rem; backdrop-filter:blur(16px); z-index:900;">
        <div style="max-width:600px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted);">Total Order:</div>
            <div id="mobile-order-total" style="font-family:var(--font-heading); font-size:1.3rem; font-weight:800; color:#38bdf8;">Rs. 0.00</div>
          </div>
          <button class="btn btn-success" id="btn-submit-mobile-order" style="padding:0.75rem 1.5rem; font-size:0.95rem;">
            Confirm & Dispatch Order
          </button>
        </div>
      </div>
    </div>
  `;

  acquireGps();
  attachMobileEvents();
}

function acquireGps() {
  const text = document.getElementById('gps-status-text');
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        AppState.mobileCart.geoLat = pos.coords.latitude;
        AppState.mobileCart.geoLng = pos.coords.longitude;
        if (text) text.innerHTML = `📍 GPS Verified: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      },
      () => {
        // Fallback default coordinates (Karachi Store Area)
        AppState.mobileCart.geoLat = 24.8607;
        AppState.mobileCart.geoLng = 67.0011;
        if (text) text.innerHTML = `📍 GPS Tagged: 24.8607° N, 67.0011° E (Store)`;
      }
    );
  } else {
    AppState.mobileCart.geoLat = 24.8607;
    AppState.mobileCart.geoLng = 67.0011;
    if (text) text.innerHTML = `📍 GPS Tagged: 24.8607° N, 67.0011° E`;
  }
}

function attachMobileEvents() {
  document.getElementById('btn-refresh-gps')?.addEventListener('click', () => {
    acquireGps();
    showToast('Shop visit GPS coordinates updated', 'success');
  });

  document.querySelectorAll('.mobile-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = Number(btn.dataset.prodId);
      const prod = AppState.products.find(p => p.id === pid);
      if (prod) {
        const existing = AppState.mobileCart.items.find(i => i.product_id === prod.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          AppState.mobileCart.items.push({
            product_id: prod.id,
            name: prod.name,
            unit_price: Number(prod.selling_price),
            tax_rate: Number(prod.tax_rate || 18.0),
            quantity: 1
          });
        }
        updateMobileCartSummary();
        showToast(`Added: ${prod.name}`, 'info');
      }
    });
  });

  document.getElementById('btn-camera-scanner')?.addEventListener('click', openCameraScannerModal);

  document.getElementById('btn-submit-mobile-order')?.addEventListener('click', async () => {
    if (AppState.mobileCart.items.length === 0) {
      showToast('Please add products to the mobile order first', 'error');
      return;
    }

    const custId = document.getElementById('mobile-cust-select')?.value || 2;
    const payload = {
      customer_id: custId,
      items: AppState.mobileCart.items,
      geo_latitude: AppState.mobileCart.geoLat,
      geo_longitude: AppState.mobileCart.geoLng,
      notes: 'Booked via Mobile Order Booker PWA'
    };

    try {
      const res = await Api.post('/sales/orders', payload);
      if (res.success) {
        showToast(`Order ${res.order.order_number} successfully booked!`, 'success');
        AppState.mobileCart.items = [];
        updateMobileCartSummary();
      }
    } catch (err) {
      // Offline support: store in queue!
      localOfflineOrders.push(payload);
      localStorage.setItem('apexerppos_offline_orders', JSON.stringify(localOfflineOrders));
      showToast('Offline Mode: Order queued locally and will sync when online!', 'warning');
      AppState.mobileCart.items = [];
      updateMobileCartSummary();
    }
  });
}

function updateMobileCartSummary() {
  const countEl = document.getElementById('mobile-cart-count');
  const totalEl = document.getElementById('mobile-order-total');

  let total = 0;
  let count = 0;

  for (const item of AppState.mobileCart.items) {
    count += item.quantity;
    const sub = item.unit_price * item.quantity;
    const tax = (sub * item.tax_rate) / 100;
    total += (sub + tax);
  }

  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

// Smartphone Camera Barcode Scanner Simulator & Live Video
function openCameraScannerModal() {
  const modalHtml = `
    <div class="modal-overlay" id="camera-scanner-modal">
      <div class="modal-content" style="max-width:440px; text-align:center;">
        <div class="modal-header">
          <h3 class="modal-title">Smartphone Camera Scanner</h3>
          <button class="btn-icon btn-sm" id="btn-close-camera">✕</button>
        </div>
        <div class="modal-body">
          <div style="position:relative; width:100%; height:240px; background:#000000; border-radius:12px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
            <video id="camera-stream-video" autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>
            <!-- Target Reticle -->
            <div style="position:absolute; width:180px; height:120px; border:2px solid #38bdf8; border-radius:8px; box-shadow:0 0 20px rgba(56,189,248,0.5);"></div>
            <div style="position:absolute; bottom:10px; font-size:11px; color:#ffffff; background:rgba(0,0,0,0.6); padding:3px 10px; border-radius:12px;">Align Barcode inside reticle</div>
          </div>

          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:8px;">
            Point your smartphone camera at a product barcode or select a demo barcode below:
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center;">
            ${AppState.products.slice(0, 4).map(p => `
              <button class="btn btn-outline btn-sm sim-scan-btn" data-barcode="${p.barcode}">
                ${p.name.slice(0, 15)} (${p.barcode})
              </button>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-camera">Close Camera</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('camera-scanner-modal');
  const video = document.getElementById('camera-stream-video');

  // Attempt real camera stream
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (video) video.srcObject = stream;
      })
      .catch(err => {
        console.log('[Camera] Simulated preview (camera permission or desktop):', err.message);
      });
  }

  const cleanup = () => {
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
    }
    modal.remove();
  };

  document.getElementById('btn-close-camera')?.addEventListener('click', cleanup);
  document.getElementById('btn-dismiss-camera')?.addEventListener('click', cleanup);

  modal.querySelectorAll('.sim-scan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bCode = btn.dataset.barcode;
      const matched = AppState.products.find(p => p.barcode === bCode);
      if (matched) {
        AppState.mobileCart.items.push({
          product_id: matched.id,
          name: matched.name,
          unit_price: Number(matched.selling_price),
          tax_rate: Number(matched.tax_rate || 18.0),
          quantity: 1
        });
        updateMobileCartSummary();
        showToast(`Camera Scanned: ${matched.name}`, 'success');
        cleanup();
      }
    });
  });
}
