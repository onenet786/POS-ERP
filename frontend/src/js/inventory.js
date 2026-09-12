import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';

export function renderInventoryView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Inventory & Multi-Warehouse Center</h1>
        <p class="page-subtitle">Real-time stock ledger, batch/expiry controls, warehouse transfers & barcode printing</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-open-labels-modal">
          🏷️ Barcode Labels
        </button>
        <button class="btn btn-primary" id="btn-open-adjust-modal">
          + Adjust Stock
        </button>
      </div>
    </div>

    <!-- Inventory Tabs -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active inv-tab-btn" data-tab="stock-list">All Products & Stock</button>
      <button class="btn btn-outline btn-sm inv-tab-btn" data-tab="batches">Batch & Expiry Tracker</button>
      <button class="btn btn-outline btn-sm inv-tab-btn" data-tab="warehouses">Warehouse Locations</button>
    </div>

    <div id="inv-tab-content">
      <!-- Dynamic tab content -->
    </div>
  `;

  renderStockListTab();
  attachInventoryEvents();
}

function renderStockListTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  container.innerHTML = `
    <div class="glass-panel">
      <div class="panel-header">
        <h3 class="panel-title">Master Product Catalog</h3>
        <div style="display:flex; gap:0.5rem;">
          <input type="text" id="inv-search" placeholder="Search SKU, barcode, name..." class="form-control" style="width:260px;" />
        </div>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU / Barcode</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Stock Status</th>
              <th>Batch Tracked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="inv-table-body">
            ${AppState.products.map(p => `
              <tr>
                <td>
                  <div style="font-family:var(--font-mono); font-weight:600; color:var(--text-main);">${p.sku}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${p.barcode || 'N/A'}</div>
                </td>
                <td style="font-weight:600; color:#ffffff;">${p.name}</td>
                <td><span class="tag tag-info">${p.category_name || 'General'}</span></td>
                <td>${formatCurrency(p.cost_price)}</td>
                <td style="font-weight:700; color:#38bdf8;">${formatCurrency(p.selling_price)}</td>
                <td>
                  <span class="tag ${p.stock <= p.reorder_level ? 'tag-danger' : 'tag-success'}">
                    ${p.stock} ${p.uom || 'Pcs'} ${p.stock <= p.reorder_level ? '(Low Stock)' : ''}
                  </span>
                </td>
                <td>${p.is_batch_tracked ? '<span class="tag tag-warning">Batch & Exp</span>' : 'Standard'}</td>
                <td>
                  <button class="btn btn-outline btn-sm quick-add-cart-btn" data-prod-id="${p.id}">+ POS</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('inv-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#inv-table-body tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(q) ? '' : 'none';
    });
  });

  document.querySelectorAll('.quick-add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = AppState.products.find(prod => prod.id === Number(btn.dataset.prodId));
      if (p) {
        AppState.posCart.items.push({
          product_id: p.id,
          name: p.name,
          sku: p.sku,
          unit_price: Number(p.selling_price),
          tax_rate: Number(p.tax_rate || 18.0),
          quantity: 1
        });
        showToast(`Sent ${p.name} to POS register cart!`, 'success');
      }
    });
  });
}

async function renderBatchesTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/inventory/batches/expiry');
    const batches = res.batches || [];

    container.innerHTML = `
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Batch Numbers & Shelf Expiration Countdown</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">FIFO / FEFO Enforcement</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Product</th>
                <th>Expiry Date</th>
                <th>Days Remaining</th>
                <th>Stock Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${batches.map(b => `
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${b.batch_number}</td>
                  <td>${b.product_name}</td>
                  <td>${b.expiry_date}</td>
                  <td style="font-weight:700;">${b.days_until_expiry} days</td>
                  <td>${b.stock} units</td>
                  <td>
                    <span class="tag ${b.status === 'EXPIRED' ? 'tag-danger' : (b.status === 'EXPIRING_SOON' ? 'tag-warning' : 'tag-success')}">
                      ${b.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderWarehousesTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  container.innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.25rem;">
      ${AppState.warehouses.map(w => `
        <div class="glass-panel" style="position:relative;">
          ${w.is_default ? '<span class="tag tag-info" style="position:absolute; top:1.25rem; right:1.25rem;">Default Hub</span>' : ''}
          <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:0.4rem;">${w.name}</h3>
          <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">Code: ${w.code}</div>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:0.5rem;">📍 ${w.address}</p>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">📞 ${w.phone}</p>
          <button class="btn btn-outline btn-sm" style="width:100%;">View Warehouse Stock Matrix</button>
        </div>
      `).join('')}
    </div>
  `;
}

function attachInventoryEvents() {
  const tabs = document.querySelectorAll('.inv-tab-btn');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(btn => btn.classList.remove('active'));
      t.classList.add('active');
      const tab = t.dataset.tab;
      if (tab === 'stock-list') renderStockListTab();
      else if (tab === 'batches') renderBatchesTab();
      else if (tab === 'warehouses') renderWarehousesTab();
    });
  });

  document.getElementById('btn-open-adjust-modal')?.addEventListener('click', openStockAdjustModal);
  document.getElementById('btn-open-labels-modal')?.addEventListener('click', openBarcodeLabelsModal);
}

function openStockAdjustModal() {
  const modalHtml = `
    <div class="modal-overlay" id="adjust-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Inventory Stock Adjustment</h3>
          <button class="btn-icon btn-sm" id="btn-close-adjust-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Select Product:</label>
            <select id="adj-product" class="form-control">
              ${AppState.products.map(p => `<option value="${p.id}">${p.name} (Current: ${p.stock})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Warehouse Location:</label>
            <select id="adj-warehouse" class="form-control">
              ${AppState.warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Adjustment Quantity (+ to Add, - to Deduct):</label>
            <input type="number" id="adj-qty" value="10" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">Reason / Reference:</label>
            <input type="text" id="adj-reason" value="Cycle Count Reconciliation" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-adjust">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-adjust">Apply Adjustment</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('adjust-modal');
  document.getElementById('btn-close-adjust-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-dismiss-adjust')?.addEventListener('click', () => modal.remove());

  document.getElementById('btn-confirm-adjust')?.addEventListener('click', async () => {
    const prodId = document.getElementById('adj-product').value;
    const whId = document.getElementById('adj-warehouse').value;
    const qty = document.getElementById('adj-qty').value;
    const reason = document.getElementById('adj-reason').value;

    try {
      const res = await Api.post('/inventory/adjust-stock', {
        product_id: prodId,
        warehouse_id: whId,
        quantity: qty,
        reason
      });
      if (res.success) {
        showToast(res.message, 'success');
        modal.remove();
        const p = AppState.products.find(prod => prod.id === Number(prodId));
        if (p) p.stock += Number(qty);
        renderStockListTab();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function openBarcodeLabelsModal() {
  const p = AppState.products[0];
  const modalHtml = `
    <div class="modal-overlay" id="barcode-labels-modal">
      <div class="modal-content" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">Barcode Label Designer & Sheet Printing</h3>
          <button class="btn-icon btn-sm" id="btn-close-label-modal">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.88rem; color:var(--text-secondary);">
            Generate thermal stickers or standard 3x8 A4 label sheets with barcode and retail price:
          </p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; padding:15px; background:#ffffff; color:#000000; border-radius:6px; margin:10px 0;">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <div style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace;">
                <div style="font-weight:bold; font-size:11px;">APEX RETAIL</div>
                <div style="font-size:10px; margin:2px 0;">${p.name.slice(0, 22)}</div>
                <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
                <div style="font-size:9px;">${p.barcode}</div>
                <div style="font-weight:bold; font-size:12px; margin-top:2px;">${formatCurrency(p.selling_price)}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-label">Close</button>
          <button class="btn btn-primary" id="btn-print-labels">🖨️ Print Label Sheet</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('barcode-labels-modal');
  document.getElementById('btn-close-label-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-dismiss-label')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-print-labels')?.addEventListener('click', () => printBarcodeSheet(p));
}

function printBarcodeSheet(p) {
  const printArea = document.getElementById('printable-receipt-area');
  if (!printArea) return;

  printArea.className = 'barcode-sheet-print';
  printArea.innerHTML = Array.from({ length: 12 }).map(() => `
    <div class="barcode-sticker" style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace; page-break-inside:avoid;">
      <div style="font-weight:bold; font-size:11px;">OneNet Solutions</div>
      <div style="font-size:10px; margin:2px 0;">${p.name.slice(0, 22)}</div>
      <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
      <div style="font-size:9px;">${p.barcode || 'N/A'}</div>
      <div style="font-weight:bold; font-size:12px; margin-top:2px;">${formatCurrency(p.selling_price)}</div>
    </div>
  `).join('');

  setTimeout(() => {
    window.print();
  }, 120);
}
