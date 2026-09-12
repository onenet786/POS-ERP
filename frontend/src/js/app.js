import Chart from 'chart.js/auto';
import { AppState, formatCurrency, showToast } from './state.js';
import { Api, RealtimeClient } from './api.js';
import { renderPosView } from './pos.js';
import { renderInventoryView } from './inventory.js';
import { renderSalesView } from './sales.js';
import { renderAccountingView } from './accounting.js';
import { renderManufacturingView } from './manufacturing.js';
import { renderMobileBookerView } from './mobileBooker.js';

let salesChartInstance = null;

async function bootstrap() {
  console.log('[ApexERP] Bootstrapping Application...');

  // Initialize Data
  try {
    const [prodsRes, catsRes, whsRes, custsRes] = await Promise.all([
      Api.get('/inventory/products'),
      Api.get('/inventory/categories'),
      Api.get('/inventory/warehouses'),
      Api.get('/sales/customers')
    ]);

    if (prodsRes.success) AppState.products = prodsRes.products;
    if (catsRes.success) AppState.categories = catsRes.categories;
    if (whsRes.success) AppState.warehouses = whsRes.warehouses;
    if (custsRes.success) AppState.customers = custsRes.customers;
  } catch (err) {
    console.error('Initial data load error:', err);
  }

  // Connect Real-Time WebSocket
  RealtimeClient.connect();
  RealtimeClient.subscribe((data) => {
    console.log('[Realtime Event]', data);
    if (data.type === 'POS_SALE') {
      showToast(`⚡ Realtime: Receipt #${data.payload.receipt_number} tendered for ${formatCurrency(data.payload.total_amount)}`, 'info');
      if (AppState.activeModule === 'dashboard') {
        renderDashboardView(document.getElementById('content-viewport'));
      }
    } else if (data.type === 'MANUFACTURING_COMPLETED') {
      showToast(`⚙️ Assembly Completed: ${data.payload.quantity} units of ${data.payload.product}`, 'success');
    }
  });

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('[PWA] Service Worker registered'))
      .catch(e => console.warn('[PWA] Service Worker registration failed:', e));
  }

  // Attach Navigation Listeners
  attachNavigation();

  // Render initial module
  navigateTo('dashboard');
}

function attachNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const module = item.dataset.module;
      navigateTo(module);
    });
  });

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const module = item.dataset.module;
      navigateTo(module);
    });
  });

  // Theme Toggle
  document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', next);
    showToast(`Switched to ${next} theme`, 'info');
  });

  // Global Fullscreen Toggle
  document.getElementById('btn-fullscreen-toggle')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}

function navigateTo(moduleName) {
  AppState.activeModule = moduleName;

  // Update active classes
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.module === moduleName);
  });
  document.querySelectorAll('.mobile-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.module === moduleName);
  });

  const viewport = document.getElementById('content-viewport');
  if (!viewport) return;

  viewport.innerHTML = '';

  switch (moduleName) {
    case 'dashboard':
      renderDashboardView(viewport);
      break;
    case 'pos':
      renderPosView(viewport);
      break;
    case 'inventory':
      renderInventoryView(viewport);
      break;
    case 'sales':
      renderSalesView(viewport);
      break;
    case 'accounting':
      renderAccountingView(viewport);
      break;
    case 'manufacturing':
      renderManufacturingView(viewport);
      break;
    case 'mobile_booker':
      renderMobileBookerView(viewport);
      break;
    default:
      renderDashboardView(viewport);
  }
}

async function renderDashboardView(container) {
  try {
    const res = await Api.get('/reports/dashboard');
    const { kpis, low_stock_items, expiring_batches, sales_trend } = res;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Executive Command Center</h1>
          <p class="page-subtitle">Unified metrics, revenue velocity, cash positions & inventory intelligence</p>
        </div>
        <div style="display:flex; gap:0.75rem;">
          <button class="btn btn-primary" id="btn-quick-pos-launch">
            ⚡ Open POS Register
          </button>
        </div>
      </div>

      <!-- KPI METRIC CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Today's POS Sales</span>
            <div class="kpi-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value">${formatCurrency(kpis.today_pos_sales)}</div>
          <div class="kpi-footer positive">↑ 18.4% vs yesterday's register closing</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Cash in Hand & Drawer</span>
            <div class="kpi-icon-wrapper" style="background:rgba(16,185,129,0.12); color:#34d399;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${formatCurrency(kpis.cash_in_hand)}</div>
          <div class="kpi-footer">Reconciled in Main Vault</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Total Trade Receivables</span>
            <div class="kpi-icon-wrapper" style="background:rgba(245,158,11,0.12); color:#fbbf24;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${formatCurrency(kpis.total_receivables)}</div>
          <div class="kpi-footer warning">Across 4 active B2B customer accounts</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Stock & Batch Alerts</span>
            <div class="kpi-icon-wrapper" style="background:rgba(239,68,68,0.12); color:#f87171;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
          </div>
          <div class="kpi-value" style="color:#f87171;">${kpis.low_stock_count} Low / ${kpis.expiring_batches_count} Exp</div>
          <div class="kpi-footer danger">Requires replenishment & rotation</div>
        </div>
      </div>

      <!-- CHART & SUMMARY GRID -->
      <div class="dashboard-grid-2col">
        <!-- Sales Velocity Trend Chart -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Revenue Velocity Trend (POS vs B2B Wholesale)</h3>
            <span class="tag tag-info">Last 7 Days</span>
          </div>
          <div style="height: 280px; position: relative;">
            <canvas id="salesTrendChart"></canvas>
          </div>
        </div>

        <!-- Quick Financial Health Snapshot -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Treasury & Working Capital</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Bank Balances (Total):</div>
                <div style="font-size:1.15rem; font-weight:700; color:#38bdf8;">${formatCurrency(kpis.bank_balance)}</div>
              </div>
              <span class="tag tag-success">2 Active A/Cs</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Accounts Payable (Vendors):</div>
                <div style="font-size:1.15rem; font-weight:700; color:#fbbf24;">${formatCurrency(kpis.total_payables)}</div>
              </div>
              <span class="tag tag-warning">Trade Creditors</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Total Inventory Asset Valuation:</div>
                <div style="font-size:1.15rem; font-weight:700; color:#34d399;">${formatCurrency(kpis.total_stock_value)}</div>
              </div>
              <span class="tag tag-info">Weighted Avg</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LOW STOCK & EXPIRING BATCHES TABLES -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Low Stock Reorder Alert</h3>
            <span class="tag tag-danger">${low_stock_items.length} Items</span>
          </div>
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Reorder Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${low_stock_items.map(item => `
                  <tr>
                    <td><strong>${item.name}</strong><br/><span style="font-size:0.75rem; color:var(--text-muted);">${item.sku}</span></td>
                    <td style="color:#f87171; font-weight:700;">${item.stock} ${item.uom || 'Pcs'}</td>
                    <td>${item.reorder_level} units</td>
                    <td><button class="btn btn-outline btn-sm" onclick="alert('Purchase Requisition PO created!')">+ PO</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Batch Expiry Radar (Next 60 Days)</h3>
            <span class="tag tag-warning">${expiring_batches.length} Batches</span>
          </div>
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Batch Code</th>
                  <th>Expiry Date</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                ${expiring_batches.map(b => `
                  <tr>
                    <td style="font-family:var(--font-mono); font-weight:700; color:#fbbf24;">${b.batch_number}</td>
                    <td>${b.expiry_date}</td>
                    <td style="font-weight:700;">${b.stock} units</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-quick-pos-launch')?.addEventListener('click', () => {
      navigateTo('pos');
    });

    // Render Chart.js
    renderSalesChart(sales_trend);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderSalesChart(trendData) {
  const canvas = document.getElementById('salesTrendChart');
  if (!canvas) return;

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  salesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: trendData.map(d => d.day),
      datasets: [
        {
          label: 'POS Retail Sales (Rs)',
          data: trendData.map(d => d.pos),
          backgroundColor: 'rgba(14, 165, 233, 0.75)',
          borderRadius: 6
        },
        {
          label: 'B2B Wholesale Invoices (Rs)',
          data: trendData.map(d => d.wholesale),
          backgroundColor: 'rgba(99, 102, 241, 0.75)',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#cbd5e1', font: { family: 'Inter', size: 12 } }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#94a3b8',
            callback: (v) => 'Rs ' + (v / 1000) + 'k'
          }
        }
      }
    }
  });
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', bootstrap);

// Clean up print container after print dialog closes
window.addEventListener('afterprint', () => {
  const printArea = document.getElementById('printable-receipt-area');
  if (printArea) {
    printArea.innerHTML = '';
    printArea.className = '';
  }
});
