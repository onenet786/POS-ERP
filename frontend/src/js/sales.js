import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';

export async function renderSalesView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Sales & E-Invoicing Management</h1>
        <p class="page-subtitle">End-to-end sales lifecycle: Quotations, Sales Orders, Challans, Invoices & FBR/ZATCA QR Codes</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
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
              <h2 style="font-family:var(--font-heading); color:#0284c7; margin:0;">APEX COMMERCIAL ENTERPRISE</h2>
              <p style="margin:2px 0; font-size:12px; color:#475569;">Plot 45, Industrial Area, Sector 7, Karachi</p>
              <p style="margin:2px 0; font-size:12px; color:#475569;">NTN: 7492019-2 | STRN: 11-22-3344-555</p>
            </div>
            <div style="text-align:right;">
              <h3 style="margin:0; color:#0f172a;">TAX INVOICE</h3>
              <p style="margin:2px 0; font-weight:bold; font-size:14px;">${inv.invoice_number}</p>
              <p style="margin:2px 0; font-size:12px;">Date: ${inv.invoice_date}</p>
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
          <button class="btn btn-primary" onclick="window.print()">🖨️ Print Invoice</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('einvoice-modal');
  document.getElementById('btn-close-inv-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-close-inv')?.addEventListener('click', () => modal.remove());
}

function openCreateInvoiceModal() {
  const modalHtml = `
    <div class="modal-overlay" id="create-inv-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Generate New E-Invoice</h3>
          <button class="btn-icon btn-sm" id="btn-close-create-inv">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Customer:</label>
            <select id="new-inv-cust" class="form-control">
              ${AppState.customers.map(c => `<option value="${c.id}">${c.business_name || c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Product Item:</label>
            <select id="new-inv-prod" class="form-control">
              ${AppState.products.map(p => `<option value="${p.id}">${p.name} - ${formatCurrency(p.selling_price)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Quantity:</label>
            <input type="number" id="new-inv-qty" value="50" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">Cash Advance / Paid Amount:</label>
            <input type="number" id="new-inv-paid" value="2000" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-create-inv">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-new-inv">Generate Invoice</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('create-inv-modal');
  document.getElementById('btn-close-create-inv')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-dismiss-create-inv')?.addEventListener('click', () => modal.remove());

  document.getElementById('btn-submit-new-inv')?.addEventListener('click', async () => {
    const custId = document.getElementById('new-inv-cust').value;
    const prodId = document.getElementById('new-inv-prod').value;
    const qty = document.getElementById('new-inv-qty').value;
    const paid = document.getElementById('new-inv-paid').value;

    const prod = AppState.products.find(p => p.id === Number(prodId));

    try {
      const res = await Api.post('/sales/invoices', {
        customer_id: custId,
        items: [{ product_id: prod.id, quantity: qty, unit_price: prod.selling_price }],
        discount_amount: 0,
        paid_amount: paid
      });

      if (res.success) {
        showToast(`Invoice ${res.invoice.invoice_number} created with QR Code!`, 'success');
        modal.remove();
        renderInvoicesTab();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
