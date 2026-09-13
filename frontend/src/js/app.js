import Chart from 'chart.js/auto';
import { AppState, formatCurrency, showToast, hasPermission } from './state.js';
import { Api, RealtimeClient } from './api.js';
import { renderPosView } from './pos.js';
import { renderInventoryView } from './inventory.js';
import { renderSalesView } from './sales.js';
import { renderAccountingView } from './accounting.js';
import { renderManufacturingView } from './manufacturing.js';
import { renderMobileBookerView } from './mobileBooker.js';
import { initCompanyContext } from './company.js';
import { renderUserNavWidget, renderAuthPortal } from './auth.js';
import { renderUsersView } from './users.js';
import { renderPayrollView } from './payroll.js';
import { renderReportsView } from './reports.js';
import { renderBackupView } from './backup.js';
import { openMobileAppModal } from './mobileAppModal.js';

let salesChartInstance = null;
let _isWorkspaceStarted = false;

async function bootstrap() {
  console.log('[OneNet Solutions] Bootstrapping Enterprise Suite...');

  // Authentication Gate Check: If no user session, show Login Portal first
  if (!AppState.currentUser) {
    const appRoot = document.getElementById('app-root');
    if (appRoot) appRoot.style.display = 'none';
    renderAuthPortal(async () => {
      await startWorkspace();
    });
    return;
  }

  await startWorkspace();
}

async function startWorkspace() {
  const appRoot = document.getElementById('app-root');
  if (appRoot) appRoot.style.display = 'flex';

  const authRoot = document.getElementById('auth-root');
  if (authRoot) authRoot.style.display = 'none';

  // Initialize Multi-Company Context & User Session Widget
  await initCompanyContext();
  renderUserNavWidget(async () => {
    // When signed out, show auth portal
    _isWorkspaceStarted = false;
    if (appRoot) appRoot.style.display = 'none';
    renderAuthPortal(async () => {
      await startWorkspace();
    });
  });

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
  if (!_isWorkspaceStarted) {
    RealtimeClient.connect();
    RealtimeClient.subscribe((data) => {
      console.log('[Realtime Event]', data);
      if (data.type === 'POS_SALE') {
        showToast(`⚡ Realtime: Receipt #${data.payload.receipt_number} tendered for ${formatCurrency(data.payload.total_amount)}`, 'info');
        if (AppState.activeModule === 'dashboard') {
          renderDashboardView(document.getElementById('content-viewport'));
        }
      } else if (data.type === 'BOOKER_LOCATION_UPDATE') {
        showToast(`📍 Live GPS: ${data.payload.booker_name} updated location at ${data.payload.current_shop_name || 'Field'}`, 'info');
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

    // Handle URL hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash && AppState.currentUser) navigateTo(hash);
    });

    _isWorkspaceStarted = true;
  }

  // Render initial module
  const initialHash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(initialHash);
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
      if (module) navigateTo(module);
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

  // Mobile App Modal Trigger
  document.getElementById('btn-open-mobile-app-modal')?.addEventListener('click', () => {
    openMobileAppModal();
  });

  // Mobile Off-Canvas Drawer Toggle
  const sidebar = document.getElementById('main-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  const toggleDrawer = () => {
    sidebar?.classList.toggle('drawer-open');
    backdrop?.classList.toggle('active');
  };

  const closeDrawer = () => {
    sidebar?.classList.remove('drawer-open');
    backdrop?.classList.remove('active');
  };

  document.getElementById('btn-mobile-drawer-toggle')?.addEventListener('click', toggleDrawer);
  document.getElementById('btn-mobile-more-nav')?.addEventListener('click', toggleDrawer);
  backdrop?.addEventListener('click', closeDrawer);
}

function navigateTo(moduleName) {
  // Automatically close mobile drawer when navigating
  document.getElementById('main-sidebar')?.classList.remove('drawer-open');
  document.getElementById('sidebar-backdrop')?.classList.remove('active');

  // Check RBAC permission
  if (moduleName !== 'dashboard' && !hasPermission(moduleName, 'view')) {
    showToast(`Access Denied: Your assigned role (${AppState.currentUser?.role_name}) does not have permission to view ${moduleName}`, 'error');
    moduleName = 'dashboard';
  }

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
    case 'payroll':
      renderPayrollView(viewport);
      break;
    case 'reports':
      renderReportsView(viewport);
      break;
    case 'users':
      renderUsersView(viewport);
      break;
    case 'backup':
      renderBackupView(viewport);
      break;
    default:
      renderDashboardView(viewport);
  }
}


async function renderDashboardView(container) {
  try {
    const res = await Api.get('/reports/dashboard');
    const { kpis, low_stock_items, expiring_batches, sales_trend, active_booker_locations } = res;
    const bookers = active_booker_locations || [];

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Executive Command Center</h1>
          <p class="page-subtitle">Unified metrics, revenue velocity, cash positions, fleet tracking & inventory intelligence</p>
        </div>
        <div style="display:flex; gap:0.75rem;">
          <button class="btn btn-outline" id="btn-dashboard-gps-track" style="display:inline-flex; align-items:center; gap:6px; color:#38bdf8; border-color:rgba(56,189,248,0.4);">
            🛰️ Live Booker GPS
          </button>
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
            <span class="kpi-title">Field Bookers Online</span>
            <div class="kpi-icon-wrapper" style="background:rgba(56,189,248,0.12); color:#38bdf8;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
            </div>
          </div>
          <div class="kpi-value" style="color:#38bdf8;">${kpis.active_bookers_count || bookers.length} Active</div>
          <div class="kpi-footer positive">🟢 Real-time GPS tracking active</div>
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

      <!-- LIVE FIELD ORDER BOOKERS & GPS FLEET TRACKING SECTION -->
      <div class="glass-panel" id="section-booker-fleet-tracking" style="margin-bottom: 1.75rem; border: 1px solid rgba(56, 189, 248, 0.35); box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45); background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(8, 12, 20, 0.95));">
        <div class="panel-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.35rem;">🛰️</span>
              <h3 class="panel-title" style="margin:0; font-size:1.2rem; font-weight:800; letter-spacing:-0.02em;">Live Field Order Bookers & GPS Fleet Tracking</h3>
              <span class="tag tag-success" style="display:inline-flex; align-items:center; gap:5px; font-weight:700;">
                <span class="status-dot-pulse" style="width:7px; height:7px;"></span>
                <span>${bookers.length} Active in Field</span>
              </span>
            </div>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:4px 0 0 0;">
              Real-time salesperson GPS coordinates, geo-fenced shop check-ins, battery levels & route map
            </p>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn btn-outline btn-sm" id="btn-refresh-booker-gps" style="color:#38bdf8; border-color:rgba(56,189,248,0.4);">
              🔄 Refresh GPS
            </button>
            <button class="btn btn-primary btn-sm" id="btn-open-booker-app-dash" style="background:linear-gradient(135deg, #0284c7, #0369a1); font-weight:700;">
              📱 Order Booker PWA
            </button>
          </div>
        </div>

        <!-- BOOKERS LIVE CARDS GRID -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap:1.25rem; margin-top:1.25rem;" id="dashboard-bookers-grid">
          ${bookers.map(b => `
            <div class="booker-live-card" style="background: rgba(17, 24, 39, 0.75); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 12px; padding: 1.25rem; display:flex; flex-direction:column; gap:0.85rem; position:relative; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
              
              <!-- Header with Avatar and Status -->
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, #0ea5e9, #6366f1); display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff; font-size:1.05rem; box-shadow:0 0 15px rgba(14,165,233,0.4); border: 2px solid rgba(255,255,255,0.2);">
                    ${b.booker_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 style="font-size:0.98rem; font-weight:700; color:#fff; margin:0;">${b.booker_name}</h4>
                    <span style="font-size:0.75rem; color:#38bdf8; font-family:var(--font-mono);">${b.phone || '+92 300 9876543'}</span>
                  </div>
                </div>
                <span class="tag ${b.status === 'CHECKED_IN' ? 'tag-success' : (b.status === 'IN_TRANSIT' ? 'tag-info' : 'tag-warning')}" style="font-weight:700;">
                  ${b.status === 'CHECKED_IN' ? '📍 Checked-in at Shop' : (b.status === 'IN_TRANSIT' ? `🚗 In Transit (${b.speed || 15} km/h)` : '⏸️ Active')}
                </span>
              </div>

              <!-- Shop Visited / Location Info -->
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Target Shop / Check-in:</span>
                  <span style="font-size:0.78rem; color:#34d399; font-weight:700;">🏪 ${b.current_shop_name || 'Retail Market'}</span>
                </div>
                <div style="font-size:0.8rem; color:#cbd5e1; line-height:1.35;">
                  ${b.address || 'Commercial Field Route'}
                </div>
              </div>

              <!-- GPS Coordinates & Telemetry -->
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; font-size:0.78rem;">
                <div style="background:rgba(0,0,0,0.25); padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.05);">
                  <span style="color:var(--text-muted); font-size:0.7rem; display:block; font-weight:600;">GPS Coordinates:</span>
                  <span style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">
                    ${Number(b.latitude).toFixed(4)}°, ${Number(b.longitude).toFixed(4)}°
                  </span>
                </div>
                <div style="background:rgba(0,0,0,0.25); padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:space-between;">
                  <div>
                    <span style="color:var(--text-muted); font-size:0.7rem; display:block; font-weight:600;">Battery:</span>
                    <span style="font-weight:700; color:${b.battery_level > 20 ? '#34d399' : '#f87171'};">🔋 ${b.battery_level}%</span>
                  </div>
                  <div style="text-align:right;">
                    <span style="color:var(--text-muted); font-size:0.7rem; display:block; font-weight:600;">Accuracy:</span>
                    <span style="font-weight:600; color:#94a3b8;">±${b.accuracy || 10}m</span>
                  </div>
                </div>
              </div>

              <!-- Actions: Google Maps & Open Route -->
              <div style="display:flex; gap:8px; margin-top:2px;">
                <a href="https://www.google.com/maps?q=${b.latitude},${b.longitude}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="flex:1; display:flex; align-items:center; justify-content:center; gap:6px; text-decoration:none; color:#38bdf8; border-color:rgba(56,189,248,0.3); font-size:0.8rem; font-weight:600;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          `).join('')}
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

    document.getElementById('btn-refresh-booker-gps')?.addEventListener('click', async () => {
      showToast('Refreshing field booker GPS telemetries...', 'info');
      await renderDashboardView(container);
      showToast('Field booker GPS locations updated', 'success');
    });

    document.getElementById('btn-open-booker-app-dash')?.addEventListener('click', () => {
      navigateTo('mobile_booker');
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
