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
        <div class="panel-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 class="panel-title">Sales Orders (Field Booker & Web)</h3>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:3px 0 0 0;">Convert booked field orders directly into official Tax E-Invoices with 1-click</p>
          </div>
          <span class="tag tag-info">${orders.length} Total Orders</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Order Date</th>
                <th>Customer</th>
                <th>Booked By</th>
                <th>Items Booked</th>
                <th>Total Amount</th>
                <th>Geo Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${o.order_number}</td>
                  <td>${o.order_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${o.customer_name}</td>
                  <td>${o.salesperson_name}</td>
                  <td>
                    ${o.items && o.items.length > 0 ? `
                      <span title="${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}" style="cursor:help; border-bottom:1px dashed rgba(255,255,255,0.3); font-size:0.82rem;">
                        📦 ${o.items.length} item(s) (${o.items.reduce((s, i) => s + Number(i.quantity), 0)} pcs)
                      </span>
                    ` : '<span style="color:var(--text-muted); font-size:0.8rem;">General items</span>'}
                  </td>
                  <td style="font-weight:700; color:#34d399;">${formatCurrency(o.total_amount)}</td>
                  <td>
                    ${o.geo_latitude ? `<a href="https://www.google.com/maps?q=${o.geo_latitude},${o.geo_longitude}" target="_blank" rel="noopener noreferrer" class="tag tag-info" style="text-decoration:none; font-size:0.75rem;">📍 ${Number(o.geo_latitude).toFixed(4)}°, ${Number(o.geo_longitude).toFixed(4)}°</a>` : '<span style="color:var(--text-muted); font-size:0.75rem;">Web Order</span>'}
                  </td>
                  <td>
                    <span class="tag ${o.status === 'INVOICED' ? 'tag-success' : (o.status === 'CONFIRMED' ? 'tag-info' : 'tag-warning')}" style="font-weight:700;">
                      ${o.status === 'INVOICED' ? '✓ Invoiced' : o.status}
                    </span>
                  </td>
                  <td>
                    ${o.status === 'INVOICED' ? `
                      <span style="font-size:0.75rem; color:#34d399; font-weight:700; background:rgba(52,211,153,0.12); padding:3px 8px; border-radius:4px; border:1px solid rgba(52,211,153,0.25); display:inline-flex; align-items:center; gap:4px;">
                        ✓ Invoiced
                      </span>
                    ` : `
                      <button class="btn btn-primary btn-sm btn-convert-order-inv" data-order-id="${o.id}" style="font-size:0.78rem; padding:4px 10px; font-weight:700; background:linear-gradient(135deg, #0284c7, #0369a1); display:inline-flex; align-items:center; gap:5px; box-shadow:0 2px 8px rgba(2,132,199,0.35);">
                        <span>🧾 Convert to Invoice</span>
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-convert-order-inv').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = Number(btn.dataset.orderId);
        const order = orders.find(o => o.id === orderId);
        if (order) {
          openCreateInvoiceModal(order);
        }
      });
    });
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
              <h2 style="font-family:var(--font-heading); color:#0284c7; margin:0;">${AppState.activeCompany?.name || 'Bin Ishaq Softs'}</h2>
              <p style="margin:2px 0; font-size:12px; color:#475569;">${AppState.activeCompany?.legal_name || 'Bin Ishaq Softs Enterprise Suite'}</p>
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


export async function openCreateInvoiceModal(order = null) {
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

  // Multi-line items state: prefill from booked order if provided!
  let invoiceItems = [];
  if (order && order.items && order.items.length > 0) {
    invoiceItems = order.items.map(item => ({
      product_id: Number(item.product_id),
      quantity: Number(item.quantity) || 1,
      unit_price: Number(item.unit_price) || 0,
      tax_rate: Number(item.tax_rate) !== undefined ? Number(item.tax_rate) : 18
    }));
  } else {
    invoiceItems = [
      {
        product_id: defaultProd.id,
        quantity: 1,
        unit_price: Number(defaultProd.selling_price) || 100,
        tax_rate: Number(defaultProd.tax_rate) || 18
      }
    ];
  }

  const selectedCustomerId = order ? Number(order.customer_id) : (AppState.customers[0]?.id || 2);
  const initialCustomer = AppState.customers.find(c => c.id === selectedCustomerId) || AppState.customers[0];

  const modalHtml = `
    <div class="modal-overlay" id="create-inv-modal" style="backdrop-filter: blur(12px); z-index:9999; background:rgba(3, 7, 18, 0.82);">
      <div class="modal-content" style="max-width: 1060px; width: 96%; max-height: 92vh; height: auto; display:flex; flex-direction:column; padding: 1.25rem 1.5rem; border-radius: 18px; background: linear-gradient(180deg, #0f172a 0%, #090e17 100%); border: 1px solid rgba(56, 189, 248, 0.35); box-shadow: 0 25px 70px -10px rgba(0,0,0,0.9), 0 0 35px rgba(14,165,233,0.12); overflow:hidden;">
        
        <!-- MODAL HEADER -->
        <div class="modal-header" style="padding:0 0 0.85rem 0; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:${order ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.12)'}; color:${order ? '#34d399' : '#38bdf8'}; border:1px solid ${order ? 'rgba(16,185,129,0.3)' : 'rgba(56,189,248,0.25)'}; padding:3px 10px; border-radius:20px; font-size:0.72rem; font-weight:800; letter-spacing:0.04em; margin-bottom:4px;">
              ${order ? `⚡ BOOKED FIELD ORDER CONVERSION • #${order.order_number}` : '🧾 COMMERCIAL TAX E-INVOICE BUILDER'}
            </div>
            <h3 class="modal-title" style="font-size:1.3rem; font-weight:800; margin:0; color:#ffffff; letter-spacing:-0.02em;">
              ${order ? `Convert Order #${order.order_number} to Official Tax Invoice` : 'Generate New Tax Sales E-Invoice'}
            </h3>
            <p style="font-size:0.8rem; color:#94a3b8; margin:2px 0 0 0;">
              ${order ? `Pre-filled from field order booked by <strong style="color:#38bdf8;">${order.salesperson_name || 'Booker'}</strong> for <strong style="color:#ffffff;">${order.customer_name}</strong>. Verify line items, payment terms & post directly to ledgers.` : 'Add products, verify customer credit standing, calculate FBR/ZATCA sales taxes, and post automated double-entry ledger vouchers.'}
            </p>
          </div>
          <button class="btn-icon btn-sm" id="btn-close-create-inv" style="border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#94a3b8; border-radius:8px; width:30px; height:30px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; transition:all 0.15s ease;">✕</button>
        </div>

        <div class="modal-body custom-scrollbar" style="padding:1rem 0; display:flex; flex-direction:column; gap:1rem; flex:1 1 auto; overflow-y:auto; min-height:0;">
          
          <!-- TOP LOGISTICS & CUSTOMER STRIP -->
          <div style="display:grid; grid-template-columns: 1.8fr 1.1fr 1fr; gap:1rem; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1rem 1.25rem;">
            
            <!-- Customer Selection & Credit Status -->
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.8rem; color:#cbd5e1; text-transform:uppercase; letter-spacing:0.04em;">
                Target Customer / Client Shop:
              </label>
              <select id="new-inv-cust" class="form-control" style="font-size:0.9rem; font-weight:600; background:#1e293b; border-color:rgba(56,189,248,0.3); color:#ffffff; padding:0.55rem 0.75rem;">
                ${AppState.customers.map(c => `
                  <option value="${c.id}" ${c.id === selectedCustomerId ? 'selected' : ''}>
                    ${c.business_name || c.name} (${c.city || 'Karachi'})
                  </option>
                `).join('')}
              </select>
              
              <!-- Live Credit Health Pill -->
              <div id="customer-credit-pill" style="margin-top:6px; font-size:0.76rem; display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span style="color:#94a3b8;">Due Balance: <strong id="pill-cust-balance" style="color:${(initialCustomer?.current_balance || 0) > 0 ? '#f87171' : '#34d399'};">${formatCurrency(initialCustomer?.current_balance || 0)}</strong></span>
                <span style="color:#475569;">•</span>
                <span style="color:#94a3b8;">Credit Limit: <strong style="color:#e2e8f0;">${formatCurrency(initialCustomer?.credit_limit || 100000)}</strong></span>
                <span style="color:#475569;">•</span>
                <span id="pill-cust-avail" class="tag tag-success" style="font-size:0.68rem; font-weight:700;">Credit Available</span>
              </div>
            </div>

            <!-- Dispatch Warehouse -->
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.8rem; color:#cbd5e1; text-transform:uppercase; letter-spacing:0.04em;">
                Dispatch Stock Hub:
              </label>
              <select id="new-inv-wh" class="form-control" style="font-size:0.9rem; font-weight:600; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff; padding:0.55rem 0.75rem;">
                ${(AppState.warehouses || [{ id: 1, name: 'Central Logistics Hub' }, { id: 2, name: 'Faisalabad Regional Depot' }]).map(w => `
                  <option value="${w.id}">${w.name}</option>
                `).join('')}
              </select>
              <div style="margin-top:6px; font-size:0.75rem; color:#38bdf8;">
                📦 Stock will be deducted automatically upon posting
              </div>
            </div>

            <!-- Invoice & Terms Date -->
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.8rem; color:#cbd5e1; text-transform:uppercase; letter-spacing:0.04em;">
                Invoice Date:
              </label>
              <input type="date" id="new-inv-date" class="form-control" value="${new Date().toISOString().slice(0, 10)}" style="font-size:0.9rem; font-weight:600; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff; padding:0.55rem 0.75rem;" />
              <div style="margin-top:6px; font-size:0.75rem; color:#94a3b8;">
                Standard Net-30 Payment Term
              </div>
            </div>
          </div>

          <!-- PRODUCTS & LINE ITEMS TOOLBAR -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <h4 style="font-size:1.05rem; font-weight:800; margin:0; color:#ffffff; display:flex; align-items:center; gap:8px;">
                <span>📦 Billable Products & Line Items</span>
                <span id="inv-item-count" style="font-size:0.75rem; font-weight:700; color:#38bdf8; background:rgba(56,189,248,0.12); padding:2px 8px; border-radius:12px; border:1px solid rgba(56,189,248,0.25);">
                  ${invoiceItems.length} Products
                </span>
              </h4>
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-scan-barcode-invoice" style="display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg, #0284c7, #0369a1); font-weight:700; padding:0.45rem 0.9rem; box-shadow:0 2px 8px rgba(2,132,199,0.35);">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <span>📷 Scan Barcode</span>
              </button>
              <button type="button" class="btn btn-outline btn-sm" id="btn-add-line-item" style="color:#38bdf8; border-color:rgba(56,189,248,0.4); font-weight:700; padding:0.45rem 0.9rem; display:inline-flex; align-items:center; gap:6px;">
                <span>+ Add Product Item</span>
              </button>
            </div>
          </div>

          <!-- PRODUCTS TABLE CONTAINER (FULLY VISIBLE & SCROLLABLE WITH STICKY HEADER) -->
          <div class="custom-scrollbar" style="border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; max-height: 230px; min-height: 120px; overflow-y: auto; overflow-x: auto; background: rgba(15, 23, 42, 0.85); box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);">
            <table style="width:100%; border-collapse:separate; border-spacing:0; min-width:820px; font-size:0.85rem;">
              <thead style="position: sticky; top: 0; z-index: 10; background: #1e293b; box-shadow: 0 2px 6px rgba(0,0,0,0.35);">
                <tr style="border-bottom: 2px solid rgba(56,189,248,0.3); text-align:left; color:#94a3b8; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">
                  <th style="padding:12px 10px; text-align:center; width:45px;">#</th>
                  <th style="padding:12px 10px;">Product Item & Stock</th>
                  <th style="padding:12px 10px; text-align:right; width:140px;">Unit Rate (Rs)</th>
                  <th style="padding:12px 10px; text-align:center; width:105px;">Qty</th>
                  <th style="padding:12px 10px; text-align:center; width:95px;">GST Tax %</th>
                  <th style="padding:12px 10px; text-align:right; width:140px;">Line Total</th>
                  <th style="padding:12px 10px; text-align:center; width:45px;"></th>
                </tr>
              </thead>
              <tbody id="invoice-items-tbody">
                <!-- Dynamically rendered -->
              </tbody>
            </table>
          </div>

          <!-- INVOICE SUMMARY, PAYMENT TERMS & LEDGER IMPACT -->
          <div style="display:grid; grid-template-columns: 1.15fr 1fr; gap:1.25rem;">
            
            <!-- Left Column: Payment Terms & Remarks -->
            <div style="display:flex; flex-direction:column; gap:0.9rem;">
              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:0.8rem; font-weight:700; color:#cbd5e1; text-transform:uppercase; letter-spacing:0.04em;">
                  Payment Terms / Settlement Method:
                </label>
                <select id="new-inv-terms" class="form-control" style="font-size:0.88rem; font-weight:600; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff; padding:0.5rem 0.75rem;">
                  <option value="CREDIT">🏢 B2B Credit Account (Accounts Receivable - Net 30 Days)</option>
                  <option value="COD">💵 Cash on Delivery (COD Receipt)</option>
                  <option value="BANK">🏦 Immediate Bank Transfer / Cheque</option>
                </select>
              </div>

              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:0.8rem; font-weight:700; color:#cbd5e1; text-transform:uppercase; letter-spacing:0.04em;">
                  Invoice Delivery Notes & Dispatch Remarks:
                </label>
                <textarea id="new-inv-notes" class="form-control" rows="2" placeholder="e.g. Dispatched via route vehicle #3. Standard 30-day payment term." style="font-size:0.85rem; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff; resize:none;">${order ? `Converted from Field Order #${order.order_number}${order.salesperson_name ? ` (Booked by ${order.salesperson_name})` : ''}` : ''}</textarea>
              </div>

              <!-- Discount and Paid Inputs with Quick Action Pills -->
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
                <div class="form-group" style="margin:0;">
                  <label class="form-label" style="font-size:0.78rem; font-weight:700; color:#cbd5e1;">Overall Trade Discount (Rs):</label>
                  <input type="number" id="new-inv-discount" class="form-control" value="${order ? (Number(order.discount_amount) || 0) : 0}" min="0" style="font-size:0.9rem; font-weight:700; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#f87171;" />
                </div>
                <div class="form-group" style="margin:0;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <label class="form-label" style="font-size:0.78rem; font-weight:700; color:#cbd5e1; margin:0;">Amount Paid Now (Rs):</label>
                    <button type="button" id="btn-quick-full-credit" style="background:none; border:none; color:#38bdf8; font-size:0.72rem; font-weight:700; cursor:pointer; text-decoration:underline;">Full Credit</button>
                  </div>
                  <input type="number" id="new-inv-paid" class="form-control" value="0" min="0" style="font-size:0.9rem; font-weight:700; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#34d399;" />
                </div>
              </div>
            </div>

            <!-- Right Column: Financial Calculation Card -->
            <div style="background: linear-gradient(180deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 14px; padding: 1.25rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px;">
                  <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase; color:#94a3b8; letter-spacing:0.05em;">Financial Breakdown</span>
                  <span class="tag tag-info" style="font-size:0.68rem; font-weight:800; display:inline-flex; align-items:center; gap:4px;">
                    <span>✓ FBR/ZATCA Sync</span>
                  </span>
                </div>

                <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.85rem; color:#94a3b8;">
                  <span>Gross Items Subtotal:</span>
                  <span id="inv-calc-subtotal" style="font-weight:700; color:#ffffff; font-family:var(--font-mono);">Rs 0.00</span>
                </div>

                <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.85rem; color:#94a3b8;">
                  <span>Sales Tax / GST (18%):</span>
                  <span id="inv-calc-tax" style="font-weight:700; color:#ffffff; font-family:var(--font-mono);">Rs 0.00</span>
                </div>

                <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.85rem; color:#94a3b8;">
                  <span>Trade Discount:</span>
                  <span id="inv-calc-discount" style="font-weight:700; color:#f87171; font-family:var(--font-mono);">-Rs 0.00</span>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:baseline; padding:10px 0; border-top:1px solid rgba(255,255,255,0.1); border-bottom:1px solid rgba(255,255,255,0.1);">
                  <div>
                    <span style="font-size:0.92rem; font-weight:800; color:#ffffff; display:block;">Net Grand Total:</span>
                    <span style="font-size:0.72rem; color:#94a3b8;">Payable by client</span>
                  </div>
                  <span id="inv-calc-total" style="font-size:1.35rem; font-weight:900; color:#38bdf8; font-family:var(--font-mono); letter-spacing:-0.02em;">Rs 0.00</span>
                </div>

                <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:0.85rem; color:#94a3b8;">
                  <span>Amount Paid Upfront:</span>
                  <span id="inv-calc-paid" style="font-weight:700; color:#34d399; font-family:var(--font-mono);">Rs 0.00</span>
                </div>

                <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.92rem; font-weight:800;">
                  <span style="color:#cbd5e1;">Balance Due (To AR Ledger):</span>
                  <span id="inv-calc-balance" style="color:#f87171; font-family:var(--font-mono);">Rs 0.00</span>
                </div>
              </div>

              <!-- General Ledger Posting Chip -->
              <div style="margin-top:12px; padding:8px 10px; background:rgba(0,0,0,0.35); border-radius:8px; border:1px solid rgba(255,255,255,0.06); font-size:0.72rem; color:#94a3b8; line-height:1.4;">
                <strong style="color:#38bdf8;">📒 Auto-GL Posting:</strong> DR 1200 (Accounts Receivable) • CR 4020 (Sales Revenue) • CR 2020 (Tax Payable)
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL FOOTER (PINNED AT BOTTOM) -->
        <div class="modal-footer" style="padding:0.85rem 0 0 0; border-top:1px solid rgba(255,255,255,0.08); display:flex; justify-content:flex-end; align-items:center; gap:0.75rem; flex-shrink:0;">
          <button class="btn btn-outline" id="btn-dismiss-create-inv" style="padding:0.6rem 1.25rem; font-weight:600;">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-new-inv" style="font-weight:800; padding:0.65rem 1.75rem; display:flex; align-items:center; gap:8px; background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%); box-shadow:0 4px 18px rgba(2,132,199,0.45); font-size:0.92rem;">
            <span id="btn-submit-text">Generate & Post Tax Invoice</span>
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
    let totalUnits = 0;

    invoiceItems.forEach(item => {
      const qty = Number(item.quantity || 0);
      const lineSub = Number(item.unit_price || 0) * qty;
      const lineTax = (lineSub * Number(item.tax_rate || 0)) / 100;
      subtotal += lineSub;
      totalTax += lineTax;
      totalUnits += qty;
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
    const submitTextEl = document.getElementById('btn-submit-text');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (taxEl) taxEl.textContent = formatCurrency(totalTax);
    if (discountEl) discountEl.textContent = `-${formatCurrency(discount)}`;
    if (totalEl) totalEl.textContent = formatCurrency(grandTotal);
    if (paidEl) paidEl.textContent = formatCurrency(paid);
    if (balanceEl) balanceEl.textContent = formatCurrency(balance);
    if (countEl) countEl.textContent = `${invoiceItems.length} Products (${totalUnits} Units Total)`;
    if (submitTextEl) submitTextEl.textContent = `Generate & Post Tax Invoice (${formatCurrency(grandTotal)})`;
  }

  function updateCustomerCreditPill() {
    const custId = Number(document.getElementById('new-inv-cust')?.value);
    const cust = AppState.customers.find(c => c.id === custId);
    if (!cust) return;

    const balanceEl = document.getElementById('pill-cust-balance');
    const availEl = document.getElementById('pill-cust-avail');
    const balance = Number(cust.current_balance || 0);
    const limit = Number(cust.credit_limit || 100000);

    if (balanceEl) {
      balanceEl.textContent = formatCurrency(balance);
      balanceEl.style.color = balance > 0 ? '#f87171' : '#34d399';
    }

    if (availEl) {
      if (balance >= limit) {
        availEl.className = 'tag tag-danger';
        availEl.textContent = '⚠️ Credit Limit Reached';
      } else {
        availEl.className = 'tag tag-success';
        availEl.textContent = `Available: ${formatCurrency(limit - balance)}`;
      }
    }
  }

  function renderItemsTable() {
    const tbody = document.getElementById('invoice-items-tbody');
    if (!tbody) return;

    tbody.innerHTML = invoiceItems.map((item, idx) => {
      const qty = Number(item.quantity || 0);
      const lineSub = Number(item.unit_price || 0) * qty;
      const lineTax = (lineSub * Number(item.tax_rate || 0)) / 100;
      const lineTotal = lineSub + lineTax;

      return `
        <tr class="invoice-item-row" data-idx="${idx}" style="border-bottom: 1px solid rgba(255,255,255,0.06); transition:background 0.15s ease;">
          <td style="padding: 10px 8px; text-align:center;">
            <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:50%; background:rgba(56,189,248,0.12); color:#38bdf8; font-weight:800; font-size:0.75rem; border:1px solid rgba(56,189,248,0.25);">
              ${idx + 1}
            </span>
          </td>
          <td style="padding: 10px 8px;">
            <select class="form-control item-prod-select" data-idx="${idx}" style="font-size:0.88rem; font-weight:600; padding:0.5rem 0.65rem; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff;">
              ${AppState.products.map(p => `
                <option value="${p.id}" ${p.id === Number(item.product_id) ? 'selected' : ''}>
                  ${p.name} • Stock: ${p.stock}
                </option>
              `).join('')}
            </select>
          </td>
          <td style="padding: 10px 8px; width: 140px;">
            <div style="position:relative; display:flex; align-items:center;">
              <span style="position:absolute; left:8px; font-size:0.72rem; color:#94a3b8; font-weight:700; pointer-events:none;">Rs</span>
              <input type="number" step="0.01" class="form-control item-price-input" data-idx="${idx}" value="${item.unit_price}" style="font-size:0.88rem; padding:0.48rem 0.65rem 0.48rem 26px; text-align:right; font-weight:700; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff; font-family:var(--font-mono);" />
            </div>
          </td>
          <td style="padding: 10px 8px; width: 105px;">
            <input type="number" min="1" class="form-control item-qty-input" data-idx="${idx}" value="${item.quantity}" style="font-size:0.9rem; padding:0.48rem 0.5rem; text-align:center; font-weight:800; background:#1e293b; border-color:rgba(56,189,248,0.25); color:#ffffff; font-family:var(--font-mono);" />
          </td>
          <td style="padding: 10px 8px; width: 95px;">
            <div style="position:relative; display:flex; align-items:center;">
              <input type="number" step="0.1" class="form-control item-tax-input" data-idx="${idx}" value="${item.tax_rate}" style="font-size:0.88rem; padding:0.48rem 18px 0.48rem 0.5rem; text-align:center; font-weight:700; background:#1e293b; border-color:rgba(255,255,255,0.15); color:#ffffff;" />
              <span style="position:absolute; right:8px; font-size:0.75rem; color:#94a3b8; font-weight:700; pointer-events:none;">%</span>
            </div>
          </td>
          <td style="padding: 10px 8px; width: 140px; text-align:right;">
            <div style="font-weight:900; font-size:0.95rem; color:#34d399; font-family:var(--font-mono);">${formatCurrency(lineTotal)}</div>
            <div style="font-size:0.7rem; color:#94a3b8;">Tax: ${formatCurrency(lineTax)}</div>
          </td>
          <td style="padding: 10px 8px; width: 45px; text-align:center;">
            ${invoiceItems.length > 1 ? `
              <button type="button" class="btn-remove-item" data-idx="${idx}" title="Remove this line item" style="width:30px; height:30px; border-radius:8px; border:1px solid rgba(239,68,68,0.3); background:rgba(239,68,68,0.1); color:#f87171; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:all 0.15s ease;">
                ✕
              </button>
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
  updateCustomerCreditPill();

  // Customer dropdown change listener
  document.getElementById('new-inv-cust')?.addEventListener('change', updateCustomerCreditPill);

  // Quick button: Full Credit (Rs 0)
  document.getElementById('btn-quick-full-credit')?.addEventListener('click', () => {
    const paidInp = document.getElementById('new-inv-paid');
    if (paidInp) {
      paidInp.value = 0;
      calculateTotals();
    }
  });

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
    const submitTextEl = document.getElementById('btn-submit-text');

    if (!invoiceItems || invoiceItems.length === 0) {
      showToast('Please add at least one product line item to the invoice', 'warning');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      if (submitTextEl) submitTextEl.textContent = 'Generating & Posting Invoice...';
    }

    try {
      const res = await Api.post('/sales/invoices', {
        order_id: order ? order.id : null,
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
        if (order) {
          showToast(`Order #${order.order_number} converted into Tax Invoice #${res.invoice.invoice_number}!`, 'success');
        } else {
          showToast(`Invoice ${res.invoice.invoice_number} created with QR Code!`, 'success');
        }
        modal.remove();
        
        // Refresh whichever tab or view is active
        if (AppState.activeModule === 'sales') {
          const activeTab = document.querySelector('.sales-tab-btn.active')?.dataset.tab;
          if (activeTab === 'orders') {
            await renderOrdersTab();
          } else {
            await renderInvoicesTab();
          }
        } else if (AppState.activeModule === 'dashboard') {
          renderDashboardView(document.getElementById('content-viewport'));
        }

        // Open the generated e-invoice modal with all products and QR code
        openInvoiceModal(res.invoice);
      }
    } catch (err) {
      showToast(err.message, 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        calculateTotals();
      }
    }
  });
}
