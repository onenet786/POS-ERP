import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';

export function renderPosView(container) {
  container.innerHTML = `
    <div class="pos-container">
      <!-- LEFT: Product Grid & Search -->
      <div class="pos-product-catalog">
        <div class="pos-top-bar">
          <div class="pos-search-input-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="pos-search-barcode" placeholder="Scan Barcode or Search Product [SKU, Name] (Press Enter to add)..." autofocus autocomplete="off" />
          </div>
          <button class="btn btn-outline btn-sm" id="btn-shift-mgmt">
            <span id="shift-status-pill" class="tag tag-success">Shift Active</span>
          </button>
        </div>

        <div class="category-filter-chips" id="pos-category-chips">
          <button class="chip-btn active" data-cat="all">All Items</button>
          ${AppState.categories.map(c => `
            <button class="chip-btn" data-cat="${c.id}">${c.name}</button>
          `).join('')}
        </div>

        <div class="pos-product-grid" id="pos-grid-items">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- RIGHT: Active POS Cart -->
      <div class="pos-cart-panel">
        <div class="cart-header">
          <div>
            <h3 style="font-size:1.05rem; font-weight:700;">Active Register Cart</h3>
            <span style="font-size:0.75rem; color:var(--text-muted);" id="active-cart-reg-name">Counter 01 - Express Lane</span>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-clear-cart" title="Clear Cart">Clear</button>
        </div>

        <div class="cart-customer-select">
          <label style="font-size:0.75rem; color:var(--text-muted); display:block; margin-bottom:4px;">Customer Account:</label>
          <select id="pos-customer-dropdown">
            ${AppState.customers.map(c => `
              <option value="${c.id}">${c.business_name || c.name} (${c.phone})</option>
            `).join('')}
          </select>
        </div>

        <div class="cart-items-list" id="pos-cart-items-list">
          <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px; opacity:0.5;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <p style="font-size:0.9rem;">Cart is empty. Scan barcode or tap products on the left.</p>
          </div>
        </div>

        <div class="cart-summary-footer">
          <div class="summary-line">
            <span>Subtotal:</span>
            <span id="pos-subtotal">Rs. 0.00</span>
          </div>
          <div class="summary-line">
            <span>Sales Tax / VAT (18%):</span>
            <span id="pos-tax">Rs. 0.00</span>
          </div>
          <div class="summary-line">
            <span>Discount (Rs):</span>
            <input type="number" id="pos-discount-input" value="0" min="0" style="width:75px; text-align:right; padding:2px 6px; background:rgba(255,255,255,0.05); border:1px solid var(--border-color); color:var(--text-main); border-radius:4px;" />
          </div>
          <div class="summary-line total">
            <span>Total Payable:</span>
            <span id="pos-total-payable" style="color:#38bdf8;">Rs. 0.00</span>
          </div>

          <div class="cart-actions-row">
            <button class="btn btn-outline" id="btn-hold-cart" title="Hold Order (F4)">
              Hold (F4)
            </button>
            <button class="btn btn-primary" id="btn-pay-now" style="font-size:1rem; padding:0.85rem;" title="Checkout (F2)">
              Pay & Print (F2)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden Printable Area for Direct Thermal Print -->
    <div id="printable-receipt-area" style="display:none;"></div>
  `;

  renderProductGrid('all');
  attachPosEvents();
}

function renderProductGrid(filterCat = 'all', searchQuery = '') {
  const grid = document.getElementById('pos-grid-items');
  if (!grid) return;

  let list = AppState.products;

  if (filterCat !== 'all') {
    list = list.filter(p => String(p.category_id) === String(filterCat));
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.barcode && p.barcode.includes(q))
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
        <p>No products match current filter</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-touch-card" data-product-id="${p.id}">
      <span class="card-barcode-sku">${p.barcode || p.sku}</span>
      <h4 class="card-product-name">${p.name}</h4>
      <div class="card-meta-row">
        <span class="card-price">${formatCurrency(p.selling_price)}</span>
        <span class="card-stock-pill ${p.stock <= p.reorder_level ? 'tag-danger' : ''}">${p.stock} ${p.uom || 'Pcs'}</span>
      </div>
    </div>
  `).join('');

  // Attach card click handlers
  grid.querySelectorAll('.product-touch-card').forEach(card => {
    card.addEventListener('click', () => {
      const pid = Number(card.dataset.productId);
      const prod = AppState.products.find(p => p.id === pid);
      if (prod) {
        addToCart(prod);
      }
    });
  });
}

function attachPosEvents() {
  const searchInput = document.getElementById('pos-search-barcode');
  const catChips = document.querySelectorAll('.chip-btn');
  const btnClear = document.getElementById('btn-clear-cart');
  const btnPay = document.getElementById('btn-pay-now');
  const discountInput = document.getElementById('pos-discount-input');
  const btnShift = document.getElementById('btn-shift-mgmt');

  // Fast Barcode scanning & search
  searchInput?.addEventListener('input', (e) => {
    const activeChip = document.querySelector('.chip-btn.active')?.dataset.cat || 'all';
    renderProductGrid(activeChip, e.target.value);
  });

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = searchInput.value.trim();
      if (!val) return;

      // Exact barcode or SKU match
      const matched = AppState.products.find(p => p.barcode === val || p.sku.toLowerCase() === val.toLowerCase());
      if (matched) {
        addToCart(matched);
        searchInput.value = '';
        renderProductGrid('all');
      } else {
        showToast(`No product with barcode: ${val}`, 'error');
      }
    }
  });

  // Category chip clicks
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderProductGrid(chip.dataset.cat, searchInput?.value || '');
    });
  });

  // Discount input
  discountInput?.addEventListener('input', (e) => {
    AppState.posCart.discountAmount = Number(e.target.value) || 0;
    updateCartTotals();
  });

  // Clear Cart
  btnClear?.addEventListener('click', () => {
    AppState.posCart.items = [];
    AppState.posCart.discountAmount = 0;
    if (discountInput) discountInput.value = '0';
    renderCart();
  });

  // Checkout Payment Modal Trigger
  btnPay?.addEventListener('click', () => {
    if (AppState.posCart.items.length === 0) {
      showToast('Please add items to cart first!', 'error');
      return;
    }
    openPaymentModal();
  });

  // Shift Management Modal
  btnShift?.addEventListener('click', () => {
    openShiftModal();
  });

  // Global Keyboard Shortcuts (F2 Checkout, F4 Hold, Escape)
  window.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
  if (AppState.activeModule !== 'pos') return;

  if (e.key === 'F2') {
    e.preventDefault();
    document.getElementById('btn-pay-now')?.click();
  } else if (e.key === 'F4') {
    e.preventDefault();
    showToast('Order held in memory tab', 'info');
  }
}

export function addToCart(product) {
  const existing = AppState.posCart.items.find(i => i.product_id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    AppState.posCart.items.push({
      product_id: product.id,
      name: product.name,
      sku: product.sku,
      unit_price: Number(product.selling_price),
      tax_rate: Number(product.tax_rate || 18.0),
      quantity: 1
    });
  }

  showToast(`Added: ${product.name}`, 'success');
  renderCart();
}

function renderCart() {
  const container = document.getElementById('pos-cart-items-list');
  if (!container) return;

  if (AppState.posCart.items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <p style="font-size:0.9rem;">Cart is empty. Scan barcode or tap products.</p>
      </div>
    `;
    updateCartTotals();
    return;
  }

  container.innerHTML = AppState.posCart.items.map((item, idx) => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-unit-price">${formatCurrency(item.unit_price)} × ${item.quantity}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" data-cart-idx="${idx}" data-action="decrease">-</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" data-cart-idx="${idx}" data-action="increase">+</button>
      </div>
      <div class="cart-item-total">
        ${formatCurrency(item.unit_price * item.quantity)}
      </div>
      <button style="background:none; border:none; color:var(--danger); cursor:pointer; padding:4px;" data-cart-idx="${idx}" data-action="delete" title="Remove">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = Number(btn.dataset.cartIdx);
      const action = btn.dataset.action;
      if (action === 'increase') {
        AppState.posCart.items[idx].quantity += 1;
      } else if (action === 'decrease') {
        AppState.posCart.items[idx].quantity -= 1;
        if (AppState.posCart.items[idx].quantity <= 0) {
          AppState.posCart.items.splice(idx, 1);
        }
      } else if (action === 'delete') {
        AppState.posCart.items.splice(idx, 1);
      }
      renderCart();
    });
  });

  updateCartTotals();
}

function updateCartTotals() {
  let subtotal = 0;
  let tax = 0;

  for (const item of AppState.posCart.items) {
    const lineSub = item.unit_price * item.quantity;
    const lineTax = (lineSub * item.tax_rate) / 100;
    subtotal += lineSub;
    tax += lineTax;
  }

  const discount = AppState.posCart.discountAmount || 0;
  const total = Math.max(0, subtotal - discount + tax);

  const elSub = document.getElementById('pos-subtotal');
  const elTax = document.getElementById('pos-tax');
  const elTotal = document.getElementById('pos-total-payable');

  if (elSub) elSub.textContent = formatCurrency(subtotal);
  if (elTax) elTax.textContent = formatCurrency(tax);
  if (elTotal) elTotal.textContent = formatCurrency(total);

  return { subtotal, tax, discount, total };
}

// Payment Tender Modal with Quick Cash buttons & Split Tender
function openPaymentModal() {
  const { subtotal, tax, discount, total } = updateCartTotals();

  const modalHtml = `
    <div class="modal-overlay" id="payment-modal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 class="modal-title">Complete POS Tender</h3>
          <button class="btn-icon btn-sm" id="btn-close-pay-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(14,165,233,0.1); border:1px solid var(--border-bright); padding:1rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Payable</div>
            <div style="font-family:var(--font-heading); font-size:2.2rem; font-weight:800; color:#38bdf8;">${formatCurrency(total)}</div>
          </div>

          <div class="form-group">
            <label class="form-label">Tender Method:</label>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem;">
              <button class="btn btn-outline tender-method-btn active" data-method="CASH">💵 Cash</button>
              <button class="btn btn-outline tender-method-btn" data-method="CARD">💳 Card</button>
              <button class="btn btn-outline tender-method-btn" data-method="STORE_CREDIT">📑 Credit</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Amount Tendered / Received:</label>
            <input type="number" id="tender-amount-input" value="${total}" min="${total}" class="form-control" style="font-size:1.3rem; font-weight:700; text-align:right;" />
          </div>

          <!-- Quick Cash Amount Shortcuts -->
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="${total}">Exact</button>
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="${Math.ceil(total / 500) * 500}">Round 500</button>
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="${Math.ceil(total / 1000) * 1000}">Round 1000</button>
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="5000">5,000</button>
          </div>

          <div style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:rgba(0,0,0,0.2); border-radius:var(--radius-md);">
            <span style="font-size:0.9rem; color:var(--text-muted);">Change Due:</span>
            <span id="tender-change-due" style="font-family:var(--font-mono); font-weight:700; font-size:1.1rem; color:#34d399;">Rs. 0.00</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-pay">Cancel</button>
          <button class="btn btn-success" id="btn-confirm-checkout" style="padding:0.75rem 1.5rem;">Confirm & Print Receipt</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('payment-modal');
  const tenderInput = document.getElementById('tender-amount-input');
  const changeDueEl = document.getElementById('tender-change-due');
  let selectedMethod = 'CASH';

  function updateChange() {
    const paid = Number(tenderInput?.value) || 0;
    const change = Math.max(0, paid - total);
    if (changeDueEl) changeDueEl.textContent = formatCurrency(change);
  }

  tenderInput?.addEventListener('input', updateChange);

  modal?.querySelectorAll('.tender-method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.tender-method-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMethod = btn.dataset.method;
    });
  });

  modal?.querySelectorAll('.quick-cash-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tenderInput.value = btn.dataset.val;
      updateChange();
    });
  });

  const closeModal = () => modal?.remove();
  document.getElementById('btn-close-pay-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-pay')?.addEventListener('click', closeModal);

  document.getElementById('btn-confirm-checkout')?.addEventListener('click', async () => {
    const paid = Number(tenderInput.value) || total;
    if (paid < total && selectedMethod === 'CASH') {
      showToast('Received cash cannot be less than total payable', 'error');
      return;
    }

    try {
      const custId = document.getElementById('pos-customer-dropdown')?.value || 1;
      const res = await Api.post('/pos/checkout', {
        customer_id: custId,
        warehouse_id: 2,
        items: AppState.posCart.items,
        discount_amount: discount,
        payment_method: selectedMethod,
        paid_amount: paid
      });

      if (res.success) {
        showToast(`Transaction ${res.transaction.receipt_number} completed!`, 'success');
        closeModal();

        // Print thermal slip
        printThermalReceipt(res.transaction);

        // Reset POS cart
        AppState.posCart.items = [];
        AppState.posCart.discountAmount = 0;
        renderCart();

        // Refresh inventory in state
        const updatedProds = await Api.get('/inventory/products');
        if (updatedProds.success) AppState.products = updatedProds.products;
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

// Direct 80mm/58mm Thermal Print Slip Generator
function printThermalReceipt(transaction) {
  const printArea = document.getElementById('printable-receipt-area');
  if (!printArea) return;

  const now = new Date(transaction.created_at).toLocaleString('en-PK');

  printArea.innerHTML = `
    <div class="thermal-receipt">
      <div class="receipt-center">
        <h3 style="margin:0; font-size:16px;">APEX COMMERCIAL</h3>
        <p style="margin:2px 0;">Plot 45, Industrial Area, Sector 7</p>
        <p style="margin:2px 0;">Tel: +92 21 35050505 | NTN: 7492019-2</p>
        <p style="margin:2px 0; font-weight:bold;">POS RETAIL SALES SLIP</p>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-row">
        <span>Receipt:</span>
        <span class="receipt-bold">${transaction.receipt_number}</span>
      </div>
      <div class="receipt-row">
        <span>Date:</span>
        <span>${now}</span>
      </div>
      <div class="receipt-row">
        <span>Cashier:</span>
        <span>Counter 01 / Ali</span>
      </div>
      <div class="receipt-row">
        <span>Customer:</span>
        <span>${transaction.customer_name || 'Walk-in'}</span>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-row receipt-bold">
        <span style="flex:2;">ITEM</span>
        <span style="flex:1; text-align:center;">QTY</span>
        <span style="flex:1; text-align:right;">PRICE</span>
      </div>

      ${transaction.items.map(i => `
        <div class="receipt-row">
          <span style="flex:2;">${i.name}</span>
          <span style="flex:1; text-align:center;">${i.quantity}</span>
          <span style="flex:1; text-align:right;">${(i.unit_price * i.quantity).toFixed(2)}</span>
        </div>
      `).join('')}

      <div class="receipt-divider"></div>

      <div class="receipt-row">
        <span>Subtotal:</span>
        <span>${transaction.subtotal.toFixed(2)}</span>
      </div>
      <div class="receipt-row">
        <span>Discount:</span>
        <span>-${transaction.discount_amount.toFixed(2)}</span>
      </div>
      <div class="receipt-row">
        <span>Sales Tax / VAT (18%):</span>
        <span>${transaction.tax_amount.toFixed(2)}</span>
      </div>
      <div class="receipt-row receipt-bold" style="font-size:14px; margin-top:4px;">
        <span>NET TOTAL:</span>
        <span>Rs. ${transaction.total_amount.toFixed(2)}</span>
      </div>
      <div class="receipt-row">
        <span>Payment Method:</span>
        <span>${transaction.payment_method}</span>
      </div>
      <div class="receipt-row">
        <span>Amount Paid:</span>
        <span>Rs. ${transaction.paid_amount.toFixed(2)}</span>
      </div>
      <div class="receipt-row">
        <span>Change Returned:</span>
        <span>Rs. ${transaction.change_amount.toFixed(2)}</span>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-center" style="margin-top:10px;">
        <p style="font-size:11px; margin:2px 0;">FBR / ZATCA E-Invoice Verified</p>
        <p style="font-size:10px; margin:2px 0;">Thank you for shopping with us!</p>
        <p style="font-size:9px; margin-top:6px; color:#555;">Software: ApexERP Cloud</p>
      </div>
    </div>
  `;

  // Trigger browser print
  window.print();
}

function openShiftModal() {
  const modalHtml = `
    <div class="modal-overlay" id="shift-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Cash Register Shift Management</h3>
          <button class="btn-icon btn-sm" id="btn-close-shift-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div class="summary-line"><span>Active Register:</span><strong>Counter 01 - Express Lane</strong></div>
            <div class="summary-line"><span>Cashier In-Charge:</span><strong>Ali Raza</strong></div>
            <div class="summary-line"><span>Opening Float:</span><strong>Rs. 5,000.00</strong></div>
            <div class="summary-line"><span>Expected Cash in Drawer:</span><strong style="color:#38bdf8;">Rs. 23,500.00</strong></div>
          </div>

          <div class="form-group">
            <label class="form-label">Physical Cash Count at Closing:</label>
            <input type="number" id="shift-counted-cash" value="23500" class="form-control" />
          </div>

          <div class="form-group">
            <label class="form-label">Shift Handover Notes:</label>
            <textarea id="shift-notes" class="form-control" rows="2" placeholder="Float balanced, credit slips filed..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-shift">Cancel</button>
          <button class="btn btn-danger" id="btn-close-shift-confirm">Reconcile & Close Shift</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('shift-modal');
  document.getElementById('btn-close-shift-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-dismiss-shift')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-close-shift-confirm')?.addEventListener('click', async () => {
    const counted = document.getElementById('shift-counted-cash').value;
    const notes = document.getElementById('shift-notes').value;
    try {
      const res = await Api.post('/pos/shift/close', { actual_cash: counted, notes });
      if (res.success) {
        showToast('Shift reconciled and closed successfully', 'success');
        modal.remove();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
