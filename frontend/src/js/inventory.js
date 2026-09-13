import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';
import { printBarcodeStickers } from './printService.js';

let activeCategoryFilter = 'ALL';
let currentActiveTab = 'stock-list';

export function renderInventoryView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Inventory & Multi-Warehouse Suite</h1>
        <p class="page-subtitle">Master product lifecycle, warehouse hub network, category hierarchy, inter-warehouse transfers & perpetual stock ledger</p>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button class="btn btn-outline" id="btn-open-labels-modal">
          🏷️ Barcode Labels
        </button>
        <button class="btn btn-outline" id="btn-open-transfer-modal">
          🔄 Inter-Warehouse Transfer
        </button>
        <button class="btn btn-outline" id="btn-open-adjust-modal">
          ⚖️ Adjust Stock
        </button>
        <button class="btn btn-primary" id="btn-open-add-product-modal">
          + Add Product
        </button>
      </div>
    </div>

    <!-- INVENTORY TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem; overflow-x:auto;">
      <button class="btn btn-outline btn-sm ${currentActiveTab === 'stock-list' ? 'active' : ''} inv-tab-btn" data-tab="stock-list">📦 Master Catalog & Stock</button>
      <button class="btn btn-outline btn-sm ${currentActiveTab === 'warehouses' ? 'active' : ''} inv-tab-btn" data-tab="warehouses">🏢 Warehouse Hubs & Depots</button>
      <button class="btn btn-outline btn-sm ${currentActiveTab === 'categories' ? 'active' : ''} inv-tab-btn" data-tab="categories">🏷️ Category Manager</button>
      <button class="btn btn-outline btn-sm ${currentActiveTab === 'batches' ? 'active' : ''} inv-tab-btn" data-tab="batches">⏳ Batch & Expiry Radar</button>
      <button class="btn btn-outline btn-sm ${currentActiveTab === 'ledger' ? 'active' : ''} inv-tab-btn" data-tab="ledger">📜 Perpetual Stock Ledger</button>
    </div>

    <div id="inv-tab-content">
      <!-- Dynamic Tab View -->
    </div>
  `;

  attachInventoryHeaderEvents();
  renderCurrentTab();
}

function attachInventoryHeaderEvents() {
  const tabs = document.querySelectorAll('.inv-tab-btn');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(btn => btn.classList.remove('active'));
      t.classList.add('active');
      currentActiveTab = t.dataset.tab;
      renderCurrentTab();
    });
  });

  document.getElementById('btn-open-add-product-modal')?.addEventListener('click', () => openProductModal(null));
  document.getElementById('btn-open-transfer-modal')?.addEventListener('click', openStockTransferModal);
  document.getElementById('btn-open-adjust-modal')?.addEventListener('click', openStockAdjustModal);
  document.getElementById('btn-open-labels-modal')?.addEventListener('click', openBarcodeLabelsModal);
}

function renderCurrentTab() {
  if (currentActiveTab === 'stock-list') renderStockListTab();
  else if (currentActiveTab === 'warehouses') renderWarehousesTab();
  else if (currentActiveTab === 'categories') renderCategoriesTab();
  else if (currentActiveTab === 'batches') renderBatchesTab();
  else if (currentActiveTab === 'ledger') renderStockLedgerTab();
}

/**
 * ============================================================================
 * TAB 1: MASTER CATALOG & STOCK MANAGEMENT
 * ============================================================================
 */
function renderStockListTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  const categories = AppState.categories || [];
  const filteredProducts = activeCategoryFilter === 'ALL'
    ? AppState.products
    : AppState.products.filter(p => String(p.category_id) === String(activeCategoryFilter));

  container.innerHTML = `
    <!-- Category Filter Chips -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1rem; overflow-x:auto; padding-bottom:0.25rem;">
      <button class="chip-btn ${activeCategoryFilter === 'ALL' ? 'active' : ''} cat-filter-chip" data-cat="ALL">
        All Categories (${AppState.products.length})
      </button>
      ${categories.map(c => `
        <button class="chip-btn ${String(activeCategoryFilter) === String(c.id) ? 'active' : ''} cat-filter-chip" data-cat="${c.id}">
          ${c.name}
        </button>
      `).join('')}
    </div>

    <div class="glass-panel">
      <div class="panel-header" style="flex-wrap:wrap; gap:0.75rem;">
        <div>
          <h3 class="panel-title">Master Product Inventory Catalog</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">${filteredProducts.length} Items Listed</span>
        </div>
        <div style="display:flex; gap:0.75rem; align-items:center;">
          <input type="text" id="inv-search" placeholder="Search SKU, Barcode, Name..." class="form-control" style="width:280px;" />
          <button class="btn btn-primary btn-sm" id="btn-tab-add-prod">+ Add Product</button>
        </div>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU / Barcode</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Margin</th>
              <th>Current Stock</th>
              <th>Tracking</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody id="inv-table-body">
            ${filteredProducts.length === 0 ? `
              <tr>
                <td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted);">
                  No products found. Click <strong>+ Add Product</strong> to create one.
                </td>
              </tr>
            ` : filteredProducts.map(p => {
              const margin = p.selling_price > 0 ? (((p.selling_price - p.cost_price) / p.selling_price) * 100).toFixed(1) : 0;
              const isLowStock = Number(p.stock) <= Number(p.reorder_level || 10);
              return `
                <tr id="prod-row-${p.id}">
                  <td>
                    <div style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${p.sku}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${p.barcode || 'No Barcode'}</div>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#ffffff; font-size:0.92rem;">${p.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">UOM: ${p.uom || 'Pcs'} ${p.tax_rate ? `• Tax: ${p.tax_rate}%` : ''}</div>
                  </td>
                  <td><span class="tag tag-info">${p.category_name || 'General'}</span></td>
                  <td>${formatCurrency(p.cost_price)}</td>
                  <td style="font-weight:700; color:#38bdf8;">${formatCurrency(p.selling_price)}</td>
                  <td>
                    <span style="font-size:0.8rem; font-weight:600; color:${margin >= 20 ? '#34d399' : (margin > 0 ? '#fbbf24' : '#f87171')};">
                      ${margin}%
                    </span>
                  </td>
                  <td>
                    <span class="tag ${isLowStock ? 'tag-danger' : 'tag-success'}" title="Reorder alert trigger: ${p.reorder_level || 10}">
                      ${p.stock || 0} ${p.uom || 'Pcs'} ${isLowStock ? '⚠️ Low' : '✓ Good'}
                    </span>
                  </td>
                  <td>
                    ${p.is_batch_tracked ? '<span class="tag tag-warning">Batch & Exp</span>' : '<span style="color:var(--text-muted); font-size:0.8rem;">Standard</span>'}
                  </td>
                  <td style="text-align:right;">
                    <div style="display:inline-flex; gap:0.35rem;">
                      <button class="btn btn-outline btn-xs edit-prod-btn" data-id="${p.id}" title="Edit Product Specs & Pricing">✏️ Edit</button>
                      <button class="btn btn-outline btn-xs quick-add-cart-btn" data-prod-id="${p.id}" title="Send 1 Unit to POS Cart">+ POS</button>
                      <button class="btn btn-outline btn-xs text-danger delete-prod-btn" data-id="${p.id}" title="Deactivate Product">🗑️</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Search filter
  document.getElementById('inv-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#inv-table-body tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(q) ? '' : 'none';
    });
  });

  // Category chip clicks
  document.querySelectorAll('.cat-filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategoryFilter = chip.dataset.cat;
      renderStockListTab();
    });
  });

  // Action listeners
  document.getElementById('btn-tab-add-prod')?.addEventListener('click', () => openProductModal(null));

  document.querySelectorAll('.edit-prod-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = AppState.products.find(p => p.id === Number(btn.dataset.id));
      if (prod) openProductModal(prod);
    });
  });

  document.querySelectorAll('.delete-prod-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = AppState.products.find(p => p.id === Number(btn.dataset.id));
      if (prod) confirmDeleteProduct(prod);
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

/**
 * ============================================================================
 * TAB 2: WAREHOUSE HUBS & DEPOTS MANAGEMENT
 * ============================================================================
 */
async function renderWarehousesTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/inventory/warehouses');
    if (res.success) AppState.warehouses = res.warehouses;
  } catch (err) {
    console.error('Failed to reload warehouses:', err);
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
      <div>
        <h3 style="font-size:1.15rem; font-weight:700;">Multi-Warehouse Network</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Manage physical storage depots, distribution centers and stock allocations</p>
      </div>
      <button class="btn btn-primary" id="btn-add-warehouse">+ Add Storage Hub / Warehouse</button>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
      ${AppState.warehouses.map(w => `
        <div class="glass-panel" style="position:relative; display:flex; flex-direction:column;">
          ${w.is_default ? '<span class="tag tag-info" style="position:absolute; top:1.25rem; right:1.25rem;">Default Hub</span>' : ''}
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.5rem;">
            <span style="font-size:1.5rem;">🏢</span>
            <div>
              <h3 style="font-size:1.15rem; font-weight:700; margin:0;">${w.name}</h3>
              <div style="font-family:var(--font-mono); font-size:0.78rem; color:#38bdf8;">Code: ${w.code}</div>
            </div>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin:0.4rem 0;">📍 ${w.address || 'Address Not Specified'}</p>
          <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:1rem;">📞 ${w.phone || 'No Phone'}</p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; background:rgba(0,0,0,0.2); padding:0.75rem; border-radius:8px; margin-bottom:1.25rem;">
            <div>
              <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Stocked Units</div>
              <div style="font-size:1.1rem; font-weight:700; color:#34d399;">${w.total_stock_units || 0}</div>
            </div>
            <div>
              <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Unique SKUs</div>
              <div style="font-size:1.1rem; font-weight:700; color:#38bdf8;">${w.unique_products_count || 0}</div>
            </div>
          </div>

          <div style="margin-top:auto; display:flex; gap:0.5rem;">
            <button class="btn btn-outline btn-sm edit-wh-btn" data-id="${w.id}" style="flex:1;">✏️ Edit</button>
            <button class="btn btn-outline btn-sm transfer-from-wh-btn" data-id="${w.id}" style="flex:1;">🔄 Dispatch</button>
            ${!w.is_default ? `<button class="btn btn-outline btn-sm text-danger delete-wh-btn" data-id="${w.id}">🗑️</button>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('btn-add-warehouse')?.addEventListener('click', () => openWarehouseModal(null));

  document.querySelectorAll('.edit-wh-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wh = AppState.warehouses.find(w => w.id === Number(btn.dataset.id));
      if (wh) openWarehouseModal(wh);
    });
  });

  document.querySelectorAll('.transfer-from-wh-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openStockTransferModal(Number(btn.dataset.id));
    });
  });

  document.querySelectorAll('.delete-wh-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wh = AppState.warehouses.find(w => w.id === Number(btn.dataset.id));
      if (wh) confirmDeleteWarehouse(wh);
    });
  });
}

/**
 * ============================================================================
 * TAB 3: CATEGORY HIERARCHY & MANAGEMENT
 * ============================================================================
 */
async function renderCategoriesTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/inventory/categories');
    if (res.success) AppState.categories = res.categories;
  } catch (err) {
    console.error('Failed to reload categories:', err);
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
      <div>
        <h3 style="font-size:1.15rem; font-weight:700;">Product Categories Hierarchy</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Organize master product line, tax classification, and POS category chips</p>
      </div>
      <button class="btn btn-primary" id="btn-add-category">+ Add New Category</button>
    </div>

    <div class="glass-panel">
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Assigned Active Products</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.categories.map(c => `
              <tr>
                <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${c.code || 'CAT-' + c.id}</td>
                <td style="font-weight:700; color:#ffffff; font-size:0.95rem;">${c.name}</td>
                <td style="color:var(--text-secondary);">${c.description || 'No description provided'}</td>
                <td>
                  <span class="tag tag-info">${c.product_count || 0} Products</span>
                </td>
                <td style="text-align:right;">
                  <div style="display:inline-flex; gap:0.35rem;">
                    <button class="btn btn-outline btn-xs edit-cat-btn" data-id="${c.id}">✏️ Edit</button>
                    <button class="btn btn-outline btn-xs text-danger delete-cat-btn" data-id="${c.id}">🗑️ Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('btn-add-category')?.addEventListener('click', () => openCategoryModal(null));

  document.querySelectorAll('.edit-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = AppState.categories.find(c => c.id === Number(btn.dataset.id));
      if (cat) openCategoryModal(cat);
    });
  });

  document.querySelectorAll('.delete-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = AppState.categories.find(c => c.id === Number(btn.dataset.id));
      if (cat) confirmDeleteCategory(cat);
    });
  });
}

/**
 * ============================================================================
 * TAB 4: BATCH NUMBERS & SHELF EXPIRATION RADAR
 * ============================================================================
 */
async function renderBatchesTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/inventory/batches/expiry');
    const batches = res.batches || [];

    container.innerHTML = `
      <div class="glass-panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Batch Numbers & Shelf Expiration Countdown</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">FIFO / FEFO Regulatory Compliance (Food, Pharma & Beverages)</span>
          </div>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Product SKU & Name</th>
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
                  <td>
                    <div style="font-weight:600; color:#ffffff;">${b.product_name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${b.product_sku}</div>
                  </td>
                  <td>${b.expiry_date}</td>
                  <td style="font-weight:700;">${b.days_until_expiry} days</td>
                  <td style="font-weight:700;">${b.stock} units</td>
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

/**
 * ============================================================================
 * TAB 5: PERPETUAL STOCK MOVEMENT LEDGER (AUDIT TRAIL)
 * ============================================================================
 */
async function renderStockLedgerTab() {
  const container = document.getElementById('inv-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/inventory/ledger');
    const ledger = res.ledger || [];

    container.innerHTML = `
      <div class="glass-panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Perpetual Stock Movement Audit Trail</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">Complete immutable ledger of all Goods In, Goods Out, Transfers & Reconciliations</span>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-refresh-ledger">🔄 Refresh</button>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Transaction Type</th>
                <th>Product SKU / Name</th>
                <th>Warehouse Depot</th>
                <th>Quantity</th>
                <th>Unit Value</th>
                <th>Reference / Notes</th>
              </tr>
            </thead>
            <tbody>
              ${ledger.length === 0 ? `
                <tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No stock movements logged yet.</td></tr>
              ` : ledger.map(l => {
                const isPositive = Number(l.quantity) > 0;
                let typeClass = 'tag-info';
                if (l.transaction_type.includes('TRANSFER')) typeClass = 'tag-warning';
                else if (l.transaction_type === 'SALE' || l.transaction_type === 'POS') typeClass = 'tag-danger';
                else if (l.transaction_type === 'PURCHASE') typeClass = 'tag-success';

                return `
                  <tr>
                    <td style="font-family:var(--font-mono); font-size:0.78rem;">
                      ${l.created_at ? new Date(l.created_at).toLocaleString('en-PK') : 'Just now'}
                    </td>
                    <td><span class="tag ${typeClass}">${l.transaction_type}</span></td>
                    <td>
                      <div style="font-weight:600; color:#fff;">${l.product_name || 'Item #' + l.product_id}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${l.product_sku || ''}</div>
                    </td>
                    <td>${l.warehouse_name || 'Warehouse #' + l.warehouse_id}</td>
                    <td style="font-weight:700; font-family:var(--font-mono); color:${isPositive ? '#34d399' : '#f87171'};">
                      ${isPositive ? '+' : ''}${l.quantity}
                    </td>
                    <td>${formatCurrency(l.unit_cost || 0)}</td>
                    <td style="font-size:0.82rem; color:var(--text-secondary);">${l.notes || l.reference_type || 'Ledger Auto-Post'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('btn-refresh-ledger')?.addEventListener('click', renderStockLedgerTab);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

/**
 * ============================================================================
 * MODAL: CREATE OR EDIT PRODUCT
 * ============================================================================
 */
function openProductModal(product = null) {
  const isEdit = !!product;
  const categories = AppState.categories || [];
  const warehouses = AppState.warehouses || [];

  const modalHtml = `
    <div class="modal-overlay" id="product-crud-modal">
      <div class="modal-content" style="max-width: 620px;">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Edit Product: ' + product.name : 'Create New Product'}</h3>
          <button class="btn-icon btn-sm" id="btn-close-prod-modal">✕</button>
        </div>
        <form id="product-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Product Name *:</label>
              <input type="text" id="prod-form-name" class="form-control" value="${isEdit ? product.name : ''}" placeholder="e.g. Gourmet Dark Chocolate 100g" required />
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">SKU (Stock Keeping Unit) *:</label>
                <input type="text" id="prod-form-sku" class="form-control" value="${isEdit ? product.sku : ''}" placeholder="e.g. SNK-DKCH-100" required />
              </div>
              <div class="form-group">
                <label class="form-label">Barcode (EAN-13 / UPC / Custom):</label>
                <div style="display:flex; gap:0.4rem;">
                  <input type="text" id="prod-form-barcode" class="form-control" value="${isEdit ? (product.barcode || '') : ''}" placeholder="Scan or Auto-generate" />
                  <button type="button" class="btn btn-outline btn-xs" id="btn-gen-barcode" title="Generate Random Barcode">Gen</button>
                </div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Category *:</label>
                <select id="prod-form-category" class="form-control" required>
                  ${categories.map(c => `
                    <option value="${c.id}" ${isEdit && Number(product.category_id) === c.id ? 'selected' : ''}>${c.name}</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Unit of Measure (UOM):</label>
                <select id="prod-form-uom" class="form-control">
                  <option value="Pcs" ${isEdit && product.uom === 'Pcs' ? 'selected' : ''}>Pieces (Pcs)</option>
                  <option value="Box" ${isEdit && product.uom === 'Box' ? 'selected' : ''}>Box / Carton</option>
                  <option value="Pack" ${isEdit && product.uom === 'Pack' ? 'selected' : ''}>Pack</option>
                  <option value="Kg" ${isEdit && product.uom === 'Kg' ? 'selected' : ''}>Kilograms (Kg)</option>
                  <option value="Liter" ${isEdit && product.uom === 'Liter' ? 'selected' : ''}>Liters (Ltr)</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Cost Price (Rs) *:</label>
                <input type="number" id="prod-form-cost" step="0.01" class="form-control" value="${isEdit ? product.cost_price : '100'}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Selling Price (Rs) *:</label>
                <input type="number" id="prod-form-selling" step="0.01" class="form-control" value="${isEdit ? product.selling_price : '150'}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Sales Tax / VAT (%):</label>
                <input type="number" id="prod-form-tax" step="0.1" class="form-control" value="${isEdit ? (product.tax_rate || 0) : '18'}" />
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Low Stock Reorder Alert Level:</label>
                <input type="number" id="prod-form-reorder" class="form-control" value="${isEdit ? (product.reorder_level || 10) : '10'}" />
              </div>
              <div class="form-group" style="justify-content:center;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-top:1.25rem; font-size:0.9rem;">
                  <input type="checkbox" id="prod-form-batch-tracked" ${isEdit && product.is_batch_tracked ? 'checked' : ''} />
                  <span>Enforce Batch & Shelf-Life Expiry</span>
                </label>
              </div>
            </div>

            ${!isEdit ? `
              <!-- Opening Stock for New Products -->
              <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:8px; border:1px solid var(--border-color); margin-top:0.5rem;">
                <h4 style="font-size:0.85rem; text-transform:uppercase; color:#38bdf8; margin-bottom:0.6rem;">Initial Opening Inventory (Optional)</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
                  <div class="form-group">
                    <label class="form-label">Opening Quantity:</label>
                    <input type="number" id="prod-form-initial-stock" class="form-control" value="0" min="0" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Target Warehouse Location:</label>
                    <select id="prod-form-target-wh" class="form-control">
                      ${warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-prod">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btn-save-prod">
              ${isEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('product-crud-modal');

  document.getElementById('btn-close-prod-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-prod')?.addEventListener('click', () => modal.remove());

  document.getElementById('btn-gen-barcode')?.addEventListener('click', () => {
    document.getElementById('prod-form-barcode').value = '896' + Math.floor(100000000 + Math.random() * 900000000);
  });

  document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('prod-form-name').value.trim(),
      sku: document.getElementById('prod-form-sku').value.trim().toUpperCase(),
      barcode: document.getElementById('prod-form-barcode').value.trim(),
      category_id: document.getElementById('prod-form-category').value,
      uom: document.getElementById('prod-form-uom').value,
      cost_price: document.getElementById('prod-form-cost').value,
      selling_price: document.getElementById('prod-form-selling').value,
      tax_rate: document.getElementById('prod-form-tax').value,
      reorder_level: document.getElementById('prod-form-reorder').value,
      is_batch_tracked: document.getElementById('prod-form-batch-tracked').checked
    };

    if (!isEdit) {
      payload.initial_stock = document.getElementById('prod-form-initial-stock')?.value || 0;
      payload.warehouse_id = document.getElementById('prod-form-target-wh')?.value || 1;
    }

    try {
      if (isEdit) {
        const res = await Api.request(`/inventory/products/${product.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        if (res.success) {
          showToast(`Product ${res.product.name} updated successfully!`, 'success');
          modal.remove();
          await refreshAllInventoryData();
          renderStockListTab();
        }
      } else {
        const res = await Api.post('/inventory/products', payload);
        if (res.success) {
          showToast(`Product ${res.product.name} created successfully!`, 'success');
          modal.remove();
          await refreshAllInventoryData();
          renderStockListTab();
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function confirmDeleteProduct(product) {
  if (!confirm(`Are you sure you want to deactivate product: "${product.name}" (${product.sku})?`)) return;

  Api.request(`/inventory/products/${product.id}`, { method: 'DELETE' })
    .then(async res => {
      if (res.success) {
        showToast(res.message || 'Product deactivated', 'info');
        await refreshAllInventoryData();
        renderStockListTab();
      }
    })
    .catch(err => showToast(err.message, 'error'));
}

/**
 * ============================================================================
 * MODAL: CREATE OR EDIT WAREHOUSE
 * ============================================================================
 */
function openWarehouseModal(warehouse = null) {
  const isEdit = !!warehouse;

  const modalHtml = `
    <div class="modal-overlay" id="warehouse-crud-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Edit Warehouse: ' + warehouse.name : 'Create New Warehouse / Branch Depot'}</h3>
          <button class="btn-icon btn-sm" id="btn-close-wh-modal">✕</button>
        </div>
        <form id="wh-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Warehouse Name *:</label>
              <input type="text" id="wh-name" class="form-control" value="${isEdit ? warehouse.name : ''}" placeholder="e.g. Islamabad Regional Fulfillment Hub" required />
            </div>
            <div class="form-group">
              <label class="form-label">Warehouse Code *:</label>
              <input type="text" id="wh-code" class="form-control" value="${isEdit ? warehouse.code : 'WH-ISB-01'}" placeholder="e.g. WH-ISB-01" required />
            </div>
            <div class="form-group">
              <label class="form-label">Address / Location:</label>
              <input type="text" id="wh-address" class="form-control" value="${isEdit ? (warehouse.address || '') : ''}" placeholder="e.g. Plot 42, I-9 Industrial Area, Islamabad" />
            </div>
            <div class="form-group">
              <label class="form-label">Contact Phone:</label>
              <input type="text" id="wh-phone" class="form-control" value="${isEdit ? (warehouse.phone || '') : ''}" placeholder="+92 51 8899001" />
            </div>
            <div class="form-group" style="margin-top:0.5rem;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                <input type="checkbox" id="wh-is-default" ${isEdit && warehouse.is_default ? 'checked' : ''} />
                <span>Set as Default Central Warehouse for Automatic POS Allocation</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-wh">Cancel</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Save Warehouse' : 'Create Warehouse'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('warehouse-crud-modal');

  document.getElementById('btn-close-wh-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-wh')?.addEventListener('click', () => modal.remove());

  document.getElementById('wh-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('wh-name').value.trim(),
      code: document.getElementById('wh-code').value.trim().toUpperCase(),
      address: document.getElementById('wh-address').value.trim(),
      phone: document.getElementById('wh-phone').value.trim(),
      is_default: document.getElementById('wh-is-default').checked
    };

    try {
      if (isEdit) {
        const res = await Api.request(`/inventory/warehouses/${warehouse.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        if (res.success) {
          showToast(`Warehouse ${res.warehouse.name} updated!`, 'success');
          modal.remove();
          renderWarehousesTab();
        }
      } else {
        const res = await Api.post('/inventory/warehouses', payload);
        if (res.success) {
          showToast(`Warehouse ${res.warehouse.name} created!`, 'success');
          modal.remove();
          renderWarehousesTab();
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function confirmDeleteWarehouse(wh) {
  if (!confirm(`Are you sure you want to deactivate warehouse "${wh.name}"?`)) return;

  Api.request(`/inventory/warehouses/${wh.id}`, { method: 'DELETE' })
    .then(res => {
      if (res.success) {
        showToast(res.message, 'info');
        renderWarehousesTab();
      }
    })
    .catch(err => showToast(err.message, 'error'));
}

/**
 * ============================================================================
 * MODAL: CREATE OR EDIT CATEGORY
 * ============================================================================
 */
function openCategoryModal(category = null) {
  const isEdit = !!category;

  const modalHtml = `
    <div class="modal-overlay" id="category-crud-modal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Edit Category: ' + category.name : 'Create New Category'}</h3>
          <button class="btn-icon btn-sm" id="btn-close-cat-modal">✕</button>
        </div>
        <form id="cat-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Category Name *:</label>
              <input type="text" id="cat-name" class="form-control" value="${isEdit ? category.name : ''}" placeholder="e.g. Frozen Foods & Dairy" required />
            </div>
            <div class="form-group">
              <label class="form-label">Category Code:</label>
              <input type="text" id="cat-code" class="form-control" value="${isEdit ? (category.code || '') : ''}" placeholder="e.g. CAT-FRZ" />
            </div>
            <div class="form-group">
              <label class="form-label">Description:</label>
              <textarea id="cat-desc" class="form-control" rows="2" placeholder="Brief description of items in this category...">${isEdit ? (category.description || '') : ''}</textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-cat">Cancel</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Save Category' : 'Create Category'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('category-crud-modal');

  document.getElementById('btn-close-cat-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-cat')?.addEventListener('click', () => modal.remove());

  document.getElementById('cat-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('cat-name').value.trim(),
      code: document.getElementById('cat-code').value.trim().toUpperCase(),
      description: document.getElementById('cat-desc').value.trim()
    };

    try {
      if (isEdit) {
        const res = await Api.request(`/inventory/categories/${category.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        if (res.success) {
          showToast(`Category ${res.category.name} updated!`, 'success');
          modal.remove();
          await refreshAllInventoryData();
          renderCategoriesTab();
        }
      } else {
        const res = await Api.post('/inventory/categories', payload);
        if (res.success) {
          showToast(`Category ${res.category.name} created!`, 'success');
          modal.remove();
          await refreshAllInventoryData();
          renderCategoriesTab();
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function confirmDeleteCategory(cat) {
  if (!confirm(`Are you sure you want to delete category "${cat.name}"? Products in this category will become Uncategorized.`)) return;

  Api.request(`/inventory/categories/${cat.id}`, { method: 'DELETE' })
    .then(async res => {
      if (res.success) {
        showToast(res.message, 'info');
        await refreshAllInventoryData();
        renderCategoriesTab();
      }
    })
    .catch(err => showToast(err.message, 'error'));
}

/**
 * ============================================================================
 * MODAL: INTER-WAREHOUSE STOCK TRANSFER
 * ============================================================================
 */
function openStockTransferModal(defaultFromWhId = null) {
  const warehouses = AppState.warehouses || [];
  const products = AppState.products || [];

  if (warehouses.length < 2) {
    showToast('You must have at least 2 active warehouses to perform inter-warehouse transfers.', 'error');
    return;
  }

  const modalHtml = `
    <div class="modal-overlay" id="transfer-modal">
      <div class="modal-content" style="max-width: 540px;">
        <div class="modal-header">
          <h3 class="modal-title">Inter-Warehouse Stock Transfer</h3>
          <button class="btn-icon btn-sm" id="btn-close-transfer-modal">✕</button>
        </div>
        <form id="transfer-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Select Product to Transfer *:</label>
              <select id="transfer-prod" class="form-control" required>
                ${products.map(p => `
                  <option value="${p.id}">${p.name} (Total Stock: ${p.stock || 0} ${p.uom || 'Pcs'})</option>
                `).join('')}
              </select>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Source Warehouse (From) *:</label>
                <select id="transfer-from-wh" class="form-control" required>
                  ${warehouses.map(w => `
                    <option value="${w.id}" ${defaultFromWhId === w.id ? 'selected' : ''}>${w.name}</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Destination Warehouse (To) *:</label>
                <select id="transfer-to-wh" class="form-control" required>
                  ${warehouses.map((w, idx) => `
                    <option value="${w.id}" ${(!defaultFromWhId && idx === 1) ? 'selected' : (defaultFromWhId && defaultFromWhId !== w.id ? 'selected' : '')}>${w.name}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Transfer Quantity *:</label>
              <input type="number" id="transfer-qty" class="form-control" value="10" min="1" required />
            </div>

            <div class="form-group">
              <label class="form-label">Transfer Reference / Dispatch Vehicle / Driver Notes:</label>
              <input type="text" id="transfer-notes" class="form-control" placeholder="e.g. Transfer via Van LHR-4821 (Driver Tariq)" value="Branch Replenishment Batch #091" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-transfer">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btn-submit-transfer">Dispatch & Transfer Stock</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('transfer-modal');

  document.getElementById('btn-close-transfer-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-transfer')?.addEventListener('click', () => modal.remove());

  document.getElementById('transfer-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prodId = document.getElementById('transfer-prod').value;
    const fromWhId = document.getElementById('transfer-from-wh').value;
    const toWhId = document.getElementById('transfer-to-wh').value;
    const qty = document.getElementById('transfer-qty').value;
    const notes = document.getElementById('transfer-notes').value;

    if (fromWhId === toWhId) {
      showToast('Source and destination warehouses must be different!', 'error');
      return;
    }

    try {
      const res = await Api.post('/inventory/transfer-stock', {
        product_id: prodId,
        from_warehouse_id: fromWhId,
        to_warehouse_id: toWhId,
        quantity: qty,
        notes
      });
      if (res.success) {
        showToast(res.message, 'success');
        modal.remove();
        await refreshAllInventoryData();
        if (currentActiveTab === 'warehouses') renderWarehousesTab();
        else if (currentActiveTab === 'ledger') renderStockLedgerTab();
        else renderStockListTab();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

/**
 * ============================================================================
 * MODAL: STOCK ADJUSTMENT
 * ============================================================================
 */
function openStockAdjustModal() {
  const modalHtml = `
    <div class="modal-overlay" id="adjust-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Inventory Stock Adjustment</h3>
          <button class="btn-icon btn-sm" id="btn-close-adjust-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Select Product:</label>
            <select id="adj-product" class="form-control">
              ${AppState.products.map(p => `<option value="${p.id}">${p.name} (Current: ${p.stock || 0})</option>`).join('')}
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
            <input type="text" id="adj-reason" value="Cycle Count Physical Audit Reconciliation" class="form-control" />
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
        await refreshAllInventoryData();
        renderStockListTab();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

/**
 * ============================================================================
 * MODAL: BARCODE LABELS DESIGNER
 * ============================================================================
 */
function openBarcodeLabelsModal() {
  const p = AppState.products[0] || { name: 'Sample Item', barcode: '896400010101', selling_price: 150 };
  const modalHtml = `
    <div class="modal-overlay" id="barcode-labels-modal">
      <div class="modal-content" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">Barcode Label Designer & Sheet Printing</h3>
          <button class="btn-icon btn-sm" id="btn-close-label-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Select Product for Label Sheet:</label>
            <select id="label-product-picker" class="form-control">
              ${AppState.products.map(prod => `
                <option value="${prod.id}">${prod.name} (${prod.barcode || prod.sku})</option>
              `).join('')}
            </select>
          </div>

          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Preview for thermal adhesive rolls or standard 3x8 A4 label sheets:
          </p>

          <div id="label-sheet-preview" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:10px; padding:15px; background:#ffffff; color:#000000; border-radius:6px; margin:10px 0;">
            ${[1, 2, 3, 4, 5, 6].map(() => `
              <div style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace;">
                <div style="font-weight:bold; font-size:11px;">ONENET SOLUTIONS</div>
                <div style="font-size:10px; margin:2px 0;">${p.name.slice(0, 22)}</div>
                <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
                <div style="font-size:9px;">${p.barcode || p.sku}</div>
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

  document.getElementById('label-product-picker')?.addEventListener('change', (e) => {
    const selected = AppState.products.find(prod => prod.id === Number(e.target.value)) || p;
    const preview = document.getElementById('label-sheet-preview');
    if (preview) {
      preview.innerHTML = [1, 2, 3, 4, 5, 6].map(() => `
        <div style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace;">
          <div style="font-weight:bold; font-size:11px;">ONENET SOLUTIONS</div>
          <div style="font-size:10px; margin:2px 0;">${selected.name.slice(0, 22)}</div>
          <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
          <div style="font-size:9px;">${selected.barcode || selected.sku}</div>
          <div style="font-weight:bold; font-size:12px; margin-top:2px;">${formatCurrency(selected.selling_price)}</div>
        </div>
      `).join('');
    }
  });

  document.getElementById('btn-print-labels')?.addEventListener('click', () => {
    const selId = document.getElementById('label-product-picker')?.value;
    const selected = AppState.products.find(prod => prod.id === Number(selId)) || p;
    printBarcodeStickers(selected, 12);
  });
}

/**
 * Sync fresh inventory state across the application
 */
async function refreshAllInventoryData() {
  try {
    const [prodsRes, catsRes, whsRes] = await Promise.all([
      Api.get('/inventory/products'),
      Api.get('/inventory/categories'),
      Api.get('/inventory/warehouses')
    ]);
    if (prodsRes.success) AppState.products = prodsRes.products;
    if (catsRes.success) AppState.categories = catsRes.categories;
    if (whsRes.success) AppState.warehouses = whsRes.warehouses;
  } catch (err) {
    console.error('Failed refreshing inventory data:', err);
  }
}
