import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';
import { printA4TaxInvoice } from './printService.js';
import { openBarcodeScannerModal } from './cameraScanner.js';

export async function renderSalesView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Sales & E-Invoicing Management</h1>
        <p class="page-subtitle">End-to-end sales lifecycle: Quotations, Sales Orders, Challans, Invoices & FBR/ZATCA QR Codes</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-sales-quick-scan" style="display:inline-flex; align-items:center; gap:6px; color:#38bdf8; border-color:rgba(56,189,248,0.4); font-weight:600;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          <span>📷 Scan to Invoice</span>
        </button>
        <button class="btn btn-primary" id="btn-create-invoice-modal">
          + New Sales Invoice
        </button>
      </div>
    </div>

    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active sales-tab-btn" data-tab="invoices">Tax Invoices (E-Invoicing)</button>
      <button class="btn btn-outline btn-sm sales-tab-btn" data-tab="orders">Sales Orders (Field & Web)</button>
      <button class="btn btn-outline btn-sm sales-tab-btn" data-tab="customers">Customer Accounts & Receivables</button>
    </div>

    <div id="sales-tab-content">
      <!-- Dynamic sales tab content -->
    </div>
  `;

  await renderInvoicesTab();
  attachSalesEvents();
}

async function renderInvoicesTab() {
  const container = document.getElementById('sales-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/sales/invoices');
    const invoices = res.invoices || [];

    container.innerHTML = `
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">E-Invoices Registry</h3>
          <span class="tag tag-info">FBR / ZATCA QR Compliant</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Paid Amount</th>
                <th>Balance Due</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${invoices.map(inv => `
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${inv.invoice_number}</td>
                  <td>${inv.invoice_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${inv.customer_name}</td>
                  <td style="font-weight:700;">${formatCurrency(inv.total_amount)}</td>
                  <td>${formatCurrency(inv.paid_amount)}</td>
                  <td style="color:${inv.balance_amount > 0 ? '#f87171' : '#34d399'}; font-weight:700;">${formatCurrency(inv.balance_amount)}</td>
                  <td>
                    <span class="tag ${inv.status === 'PAID' ? 'tag-success' : 'tag-warning'}">${inv.status}</span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm view-einvoice-btn" data-inv-id="${inv.id}">View / Print QR</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.querySelectorAll('.view-einvoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const inv = invoices.find(i => i.id === Number(btn.dataset.invId));
        if (inv) openInvoiceModal(inv);
      });
    });
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function renderOrdersTab() {
  const container = document.getElementById('sales-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/sales/orders');
    const orders = res.orders || [];

    container.innerHTML = `
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Sales Orders (Field Booker & Web)</h3>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Order Date</th>
                <th>Customer</th>
                <th>Booked By</th>
                <th>Total Amount</th>
                <th>Geo Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${o.order_number}</td>
                  <td>${o.order_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${o.customer_name}</td>
                  <td>${o.salesperson_name}</td>
                  <td style="font-weight:700;">${formatCurrency(o.total_amount)}</td>
                  <td>
                    ${o.geo_latitude ? `<span class="tag tag-info">📍 ${Number(o.geo_latitude).toFixed(4)}, ${Number(o.geo_longitude).toFixed(4)}</span>` : '<span style="color:var(--text-muted);">Web Order</span>'}
                  </td>
                  <td><span class="tag tag-success">${o.status}</span></td>
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

function renderCustomersTab() {
  const container = document.getElementById('sales-tab-content');
  if (!container) return;

  container.innerHTML = `
    <div class="glass-panel">
      <div class="panel-header">
        <h3 class="panel-title">Customer Directory & Credit Aging</h3>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Business / Customer Name</th>
              <th>Phone</th>
              <th>Address & City</th>
              <th>Tax ID / NTN</th>
              <th>Credit Limit</th>
              <th>Current Balance Due</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.customers.map(c => `
              <tr>
                <td>
                  <div style="font-weight:700; color:#ffffff;">${c.business_name || c.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${c.name}</div>
                </td>
                <td>${c.phone}</td>
                <td>${c.address}, ${c.city}</td>
                <td style="font-family:var(--font-mono);">${c.tax_number || 'Unregistered'}</td>
                <td>${formatCurrency(c.credit_limit)}</td>
                <td style="font-weight:700; color:${c.current_balance > 0 ? '#f87171' : '#34d399'};">
                  ${formatCurrency(c.current_balance)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function attachSalesEvents() {
  const tabs = document.querySelectorAll('.sales-tab-btn');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      t.classList.add('active');
      const tab = t.dataset.tab;
      if (tab === 'invoices') renderInvoicesTab();
      else if (tab === 'orders') renderOrdersTab();
      else if (tab === 'customers') renderCustomersTab();
    });
  });

  document.getElementById('btn-create-invoice-modal')?.addEventListener('click', openCreateInvoiceModal);
  document.getElementById('btn-sales-quick-scan')?.addEventListener('click', async () => {
    await openCreateInvoiceModal();
    document.getElementById('btn-scan-barcode-invoice')?.click();
  });
}

function openInvoiceModal(inv) {
  const modalHtml = `
    <div class="modal-overlay" id="einvoice-modal">
      <div class="modal-content" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">E-Invoice #${inv.invoice_number}</h3>
          <button class="btn-icon btn-sm" id="btn-close-inv-modal">✕</button>
        </div>
        <div class="modal-body" style="background:#ffffff; color:#0f172a; padding:2rem; border-radius:8px;">
          <!-- Professional Tax Invoice Layout -->
          <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0f172a; padding-bottom:1rem; margin-bottom:1rem;">
            <div>
              <h2 style="font-family:var(--font-heading); color:#0284c7; margin:0;">OneNet Solutions</h2>
              <p style="margin:2px 0; font-size:12px; color:#475569;">OneNet Solutions Enterprise Suite</p>
              <p style="margin:2px 0; font-size:12px; color:#475569;">Muslim Town, Lahore, Pakistan</p>
              <p style="margin:2px 0; font-size:12px; color:#475569;">NTN: 7492019-2 | STRN: 11-22-3344-555</p>
            </div>
            <div style="text-align:right;">
              <h3 style="margin:0; color:#0f172a;">TAX INVOICE</h3>
              <p style="margin:2px 0; font-weight:bold; font-size:14px;">${inv.invoice_number}</p>
              <p style="margin:2px 0; font-size:12px;">Date: ${inv.invoice_date || new Date().toISOString().slice(0, 10)}</p>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; font-size:13px;">
            <div>
              <strong>Billed To:</strong>
              <div>${inv.customer_name}</div>
              <div style="color:#475569;">Payment Status: <strong>${inv.status}</strong></div>
            </div>
            <!-- FBR/ZATCA E-Invoice QR Code -->
            <div style="text-align:center;">
              <img src="${inv.einvoice_qr_code}" alt="E-Invoice QR" style="width:100px; height:100px; border:1px solid #cbd5e1; padding:4px;" />
              <div style="font-size:9px; color:#64748b; margin-top:2px;">FBR/ZATCA Verified</div>
            </div>
          </div>

          <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:1.5rem;">
            <thead>
              <tr style="background:#f1f5f9; border-bottom:1px solid #cbd5e1; text-align:left;">
                <th style="padding:8px;">Description</th>
                <th style="padding:8px; text-align:center;">Qty</th>
                <th style="padding:8px; text-align:right;">Price</th>
                <th style="padding:8px; text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${inv.items.map(item => `
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:8px;">${item.name}</td>
                  <td style="padding:8px; text-align:center;">${item.quantity}</td>
                  <td style="padding:8px; text-align:right;">${item.unit_price.toFixed(2)}</td>
                  <td style="padding:8px; text-align:right; font-weight:bold;">${item.total_price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="display:flex; justify-content:flex-end;">
            <div style="width:260px; font-size:13px;">
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Subtotal:</span><span>${formatCurrency(inv.subtotal)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Sales Tax (18%):</span><span>${formatCurrency(inv.tax_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Discount:</span><span>-${formatCurrency(inv.discount_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:6px 0; border-top:2px solid #0f172a; font-weight:bold; font-size:15px; color:#0284c7;">
                <span>Total Amount:</span><span>${formatCurrency(inv.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-close-inv">Close</button>
          <button class="btn btn-primary" id="btn-print-sales-invoice">🖨️ Print Invoice</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('einvoice-modal');
  document.getElementById('btn-close-inv-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-close-inv')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-print-sales-invoice')?.addEventListener('click', () => printA4TaxInvoice(inv));
}


async function openCreateInvoiceModal() {
  const existing = document.getElementById('create-inv-modal');
  if (existing) existing.remove();

  // Ensure products and customers are loaded
  if (!AppState.products || AppState.products.length === 0) {
    try {
      const pRes = await Api.get('/inventory/products');
      if (pRes.success) AppState.products = pRes.products;
    } catch (e) {
      console.warn('Could not load products:', e);
    }
  }

  if (!AppState.customers || AppState.customers.length === 0) {
    try {
      const cRes = await Api.get('/sales/customers');
      if (cRes.success) AppState.customers = cRes.customers;
    } catch (e) {
      console.warn('Could not load customers:', e);
    }
  }

  const defaultProd = AppState.products[0] || { id: 1, name: 'Standard Product', selling_price: 100, tax_rate: 18 };

  // Multi-line items state
  let invoiceItems = [
    {
      product_id: defaultProd.id,
      quantity: 1,
      unit_price: Number(defaultProd.selling_price) || 100,
      tax_rate: Number(defaultProd.tax_rate) || 18
    }
  ];

  const modalHtml = `
    <div class="modal-overlay" id="create-inv-modal" style="backdrop-filter: blur(8px); z-index:9999;">
      <div class="modal-content" style="max-width: 960px; width: 95%; max-height: 90vh; display:flex; flex-direction:column; padding: 1.75rem; border-radius: 16px; background: var(--bg-card); border: 1px solid var(--border-bright); box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8);">
        <div class="modal-header" style="padding-bottom:1rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(56,189,248,0.12); color:#38bdf8; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:4px;">
              🧾 MULTI-PRODUCT E-INVOICE BUILDER
            </div>
            <h3 class="modal-title" style="font-size:1.35rem; font-weight:800; margin:0;">Generate New Tax E-Invoice</h3>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:3px 0 0 0;">Add multiple items, calculate tax rates, and post automated double-entry ledger entries.</p>
          </div>
          <button class="btn-icon btn-sm" id="btn-close-create-inv" style="border:none; cursor:pointer;">✕</button>
        </div>

        <div class="modal-body" style="overflow-y:auto; padding:1.25rem 0; flex:1;">
          <!-- Top Row: Customer, Warehouse, Date -->
          <div style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Select Customer / Client:</label>
              <select id="new-inv-cust" class="form-control" style="font-size:0.9rem;">
                ${AppState.customers.map(c => `
                  <option value="${c.id}">${c.business_name || c.name} (Balance: ${formatCurrency(c.current_balance || 0)})</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Dispatch Warehouse:</label>
              <select id="new-inv-wh" class="form-control" style="font-size:0.9rem;">
                ${(AppState.warehouses || [{ id: 1, name: 'Central Logistics Hub' }]).map(w => `
                  <option value="${w.id}">${w.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Invoice Date:</label>
              <input type="date" id="new-inv-date" class="form-control" value="${new Date().toISOString().slice(0, 10)}" style="font-size:0.9rem;" />
            </div>
          </div>

          <!-- Product Line Items Section -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:8px;">
            <h4 style="font-size:0.95rem; font-weight:700; margin:0; color:var(--text-main);">
              Invoice Products & Line Items (<span id="inv-item-count">1</span>)
            </h4>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-scan-barcode-invoice" style="display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg, #0284c7, #0369a1); font-weight:700;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <span>📷 Scan Barcode</span>
              </button>
              <button type="button" class="btn btn-outline btn-sm" id="btn-add-line-item" style="color:#38bdf8; border-color:rgba(56,189,248,0.4); font-weight:700;">
                + Add Product Item
              </button>
            </div>
          </div>

          <!-- Products Table -->
          <div style="border:1px solid var(--border-color); border-radius:10px; overflow:hidden; background:var(--bg-input); margin-bottom:1.5rem;">
            <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
              <thead>
                <tr style="background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border-color); text-align:left; color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                  <th style="padding:10px 8px; text-align:center; width:35px;">#</th>
                  <th style="padding:10px 8px;">Product Item</th>
                  <th style="padding:10px 8px; text-align:right; width:125px;">Unit Price (Rs)</th>
                  <th style="padding:10px 8px; text-align:center; width:95px;">Qty</th>
                  <th style="padding:10px 8px; text-align:center; width:90px;">Tax %</th>
                  <th style="padding:10px 8px; text-align:right; width:130px;">Line Total</th>
                  <th style="padding:10px 8px; text-align:center; width:45px;"></th>
                </tr>
              </thead>
              <tbody id="invoice-items-tbody">
                <!-- Dynamically rendered -->
              </tbody>
            </table>
          </div>

          <!-- Invoice Summary & Payment Terms -->
          <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:1.5rem;">
            <div>
              <div class="form-group" style="margin-bottom:0.85rem;">
                <label class="form-label" style="font-size:0.8rem; font-weight:600;">Invoice Notes / Delivery Terms:</label>
                <textarea id="new-inv-notes" class="form-control" rows="2" placeholder="e.g. Standard 30-day payment term. Goods received in sound condition." style="font-size:0.85rem;"></textarea>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
                <div class="form-group" style="margin:0;">
                  <label class="form-label" style="font-size:0.8rem; font-weight:600;">Overall Discount (Rs):</label>
                  <input type="number" id="new-inv-discount" class="form-control" value="0" min="0" style="font-size:0.9rem;" />
                </div>
                <div class="form-group" style="margin:0;">
                  <label class="form-label" style="font-size:0.8rem; font-weight:600;">Amount Received / Paid (Rs):</label>
                  <input type="number" id="new-inv-paid" class="form-control" value="0" min="0" style="font-size:0.9rem; font-weight:700; color:#34d399;" />
                </div>
              </div>
            </div>

            <!-- Calculation Box -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:12px; padding:1.1rem; font-size:0.88rem;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--text-muted);">
                <span>Items Subtotal:</span>
                <span id="inv-calc-subtotal" style="font-weight:600; color:var(--text-main);">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--text-muted);">
                <span>Sales Tax / VAT:</span>
                <span id="inv-calc-tax" style="font-weight:600; color:var(--text-main);">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; color:var(--text-muted);">
                <span>Trade Discount:</span>
                <span id="inv-calc-discount" style="font-weight:600; color:#f87171;">-Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid var(--border-color); font-size:1.05rem; font-weight:800; color:#38bdf8;">
                <span>Net Grand Total:</span>
                <span id="inv-calc-total">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; font-size:0.85rem; color:var(--text-muted);">
                <span>Amount Paid Now:</span>
                <span id="inv-calc-paid" style="font-weight:700; color:#34d399;">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.92rem; font-weight:800; color:#f87171;">
                <span>Balance Due:</span>
                <span id="inv-calc-balance">Rs 0.00</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer" style="padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-outline" id="btn-dismiss-create-inv">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-new-inv" style="font-weight:700; padding:0.75rem 1.5rem; display:flex; align-items:center; gap:8px;">
            <span>Generate & Post Tax Invoice</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('create-inv-modal');

  function calculateTotals() {
    let subtotal = 0;
    let totalTax = 0;

    invoiceItems.forEach(item => {
      const lineSub = Number(item.unit_price || 0) * Number(item.quantity || 0);
      const lineTax = (lineSub * Number(item.tax_rate || 0)) / 100;
      subtotal += lineSub;
      totalTax += lineTax;
    });

    const discount = Number(document.getElementById('new-inv-discount')?.value || 0);
    const grandTotal = Math.max(0, subtotal + totalTax - discount);
    const paid = Number(document.getElementById('new-inv-paid')?.value || 0);
    const balance = Math.max(0, grandTotal - paid);

    const subtotalEl = document.getElementById('inv-calc-subtotal');
    const taxEl = document.getElementById('inv-calc-tax');
    const discountEl = document.getElementById('inv-calc-discount');
    const totalEl = document.getElementById('inv-calc-total');
    const paidEl = document.getElementById('inv-calc-paid');
    const balanceEl = document.getElementById('inv-calc-balance');
    const countEl = document.getElementById('inv-item-count');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (taxEl) taxEl.textContent = formatCurrency(totalTax);
    if (discountEl) discountEl.textContent = `-${formatCurrency(discount)}`;
    if (totalEl) totalEl.textContent = formatCurrency(grandTotal);
    if (paidEl) paidEl.textContent = formatCurrency(paid);
    if (balanceEl) balanceEl.textContent = formatCurrency(balance);
    if (countEl) countEl.textContent = invoiceItems.length;
  }

  function renderItemsTable() {
    const tbody = document.getElementById('invoice-items-tbody');
    if (!tbody) return;

    tbody.innerHTML = invoiceItems.map((item, idx) => {
      const lineSub = Number(item.unit_price || 0) * Number(item.quantity || 0);
      const lineTax = (lineSub * Number(item.tax_rate || 0)) / 100;
      const lineTotal = lineSub + lineTax;

      return `
        <tr data-idx="${idx}" style="border-bottom: 1px solid var(--border-color);">
          <td style="padding: 8px 6px; font-weight:700; color:var(--text-muted); text-align:center;">${idx + 1}</td>
          <td style="padding: 8px 6px;">
            <select class="form-control item-prod-select" data-idx="${idx}" style="font-size:0.85rem; padding:0.4rem 0.6rem;">
              ${AppState.products.map(p => `
                <option value="${p.id}" ${p.id === Number(item.product_id) ? 'selected' : ''}>
                  ${p.name} (Stock: ${p.stock})
                </option>
              `).join('')}
            </select>
          </td>
          <td style="padding: 8px 6px; width: 125px;">
            <input type="number" step="0.01" class="form-control item-price-input" data-idx="${idx}" value="${item.unit_price}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:right;" />
          </td>
          <td style="padding: 8px 6px; width: 95px;">
            <input type="number" min="1" class="form-control item-qty-input" data-idx="${idx}" value="${item.quantity}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:center;" />
          </td>
          <td style="padding: 8px 6px; width: 90px;">
            <input type="number" step="0.1" class="form-control item-tax-input" data-idx="${idx}" value="${item.tax_rate}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:center;" />
          </td>
          <td style="padding: 8px 6px; width: 130px; text-align:right; font-weight:700; color:var(--text-main);">
            ${formatCurrency(lineTotal)}
          </td>
          <td style="padding: 8px 6px; width: 45px; text-align:center;">
            ${invoiceItems.length > 1 ? `
              <button type="button" class="btn-icon btn-sm text-danger btn-remove-item" data-idx="${idx}" title="Remove Item" style="padding:2px 6px; font-size:13px; border:none; background:none; cursor:pointer;">✕</button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');

    // Attach row events
    tbody.querySelectorAll('.item-prod-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const i = Number(e.target.dataset.idx);
        const prod = AppState.products.find(p => p.id === Number(e.target.value));
        if (prod) {
          invoiceItems[i].product_id = prod.id;
          invoiceItems[i].unit_price = Number(prod.selling_price || 0);
          invoiceItems[i].tax_rate = Number(prod.tax_rate || 18);
          renderItemsTable();
          calculateTotals();
        }
      });
    });

    tbody.querySelectorAll('.item-price-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = Number(e.target.dataset.idx);
        invoiceItems[i].unit_price = Number(e.target.value) || 0;
        calculateTotals();
      });
    });

    tbody.querySelectorAll('.item-qty-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = Number(e.target.dataset.idx);
        invoiceItems[i].quantity = Number(e.target.value) || 1;
        calculateTotals();
      });
    });

    tbody.querySelectorAll('.item-tax-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = Number(e.target.dataset.idx);
        invoiceItems[i].tax_rate = Number(e.target.value) || 0;
        calculateTotals();
      });
    });

    tbody.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = Number(e.currentTarget.dataset.idx);
        invoiceItems.splice(i, 1);
        renderItemsTable();
        calculateTotals();
      });
    });
  }

  // Initial table render and calculation
  renderItemsTable();
  calculateTotals();

  // Add line item button
  document.getElementById('btn-add-line-item')?.addEventListener('click', () => {
    const nextProd = AppState.products[invoiceItems.length % AppState.products.length] || defaultProd;
    invoiceItems.push({
      product_id: nextProd.id,
      quantity: 1,
      unit_price: Number(nextProd.selling_price) || 100,
      tax_rate: Number(nextProd.tax_rate) || 18
    });
    renderItemsTable();
    calculateTotals();
  });

  // Camera Barcode Scanner trigger for invoice items
  document.getElementById('btn-scan-barcode-invoice')?.addEventListener('click', () => {
    openBarcodeScannerModal({
      title: 'Invoice Camera Barcode Scanner',
      continuous: true,
      onScan: (barcode, matchedProd) => {
        if (matchedProd) {
          const existing = invoiceItems.find(i => Number(i.product_id) === Number(matchedProd.id));
          if (existing) {
            existing.quantity += 1;
          } else {
            // If the invoice only has 1 initial item and it hasn't been edited, replace it
            if (invoiceItems.length === 1 && Number(invoiceItems[0].product_id) === Number(defaultProd.id) && invoiceItems[0].quantity === 1) {
              invoiceItems[0] = {
                product_id: matchedProd.id,
                quantity: 1,
                unit_price: Number(matchedProd.selling_price || 0),
                tax_rate: Number(matchedProd.tax_rate || 18)
              };
            } else {
              invoiceItems.push({
                product_id: matchedProd.id,
                quantity: 1,
                unit_price: Number(matchedProd.selling_price || 0),
                tax_rate: Number(matchedProd.tax_rate || 18)
              });
            }
          }
          renderItemsTable();
          calculateTotals();
        }
      }
    });
  });

  // Discount and Paid inputs live updates
  document.getElementById('new-inv-discount')?.addEventListener('input', calculateTotals);
  document.getElementById('new-inv-paid')?.addEventListener('input', calculateTotals);

  // Close actions
  document.getElementById('btn-close-create-inv')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-dismiss-create-inv')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Submit invoice
  document.getElementById('btn-submit-new-inv')?.addEventListener('click', async () => {
    const custId = document.getElementById('new-inv-cust').value;
    const discount = document.getElementById('new-inv-discount').value;
    const paid = document.getElementById('new-inv-paid').value;
    const notes = document.getElementById('new-inv-notes')?.value || '';
    const submitBtn = document.getElementById('btn-submit-new-inv');

    if (!invoiceItems || invoiceItems.length === 0) {
      showToast('Please add at least one product line item to the invoice', 'warning');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Generating & Posting Invoice...';
    }

    try {
      const res = await Api.post('/sales/invoices', {
        customer_id: custId,
        items: invoiceItems.map(i => ({
          product_id: Number(i.product_id),
          quantity: Number(i.quantity) || 1,
          unit_price: Number(i.unit_price) || 0,
          tax_rate: Number(i.tax_rate) || 0
        })),
        discount_amount: Number(discount) || 0,
        paid_amount: Number(paid) || 0,
        notes
      });

      if (res.success) {
        showToast(`Invoice ${res.invoice.invoice_number} created with QR Code!`, 'success');
        modal.remove();
        await renderInvoicesTab();
        // Open the generated e-invoice modal with all products and QR code
        openInvoiceModal(res.invoice);
      }
    } catch (err) {
      showToast(err.message, 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Generate & Post Tax Invoice';
      }
    }
  });
}
