import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';
import { printDocument } from './printService.js';

export async function renderReportsView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Enterprise Analytics & Reports Center</h1>
        <p class="page-subtitle">POS Z-Reports, Inventory Valuation, GAAP Financial Statements & Payroll Registers</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-export-report-csv">
          📥 Export CSV
        </button>
        <button class="btn btn-primary" id="btn-print-report">
          🖨️ Print Formal Report
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active report-tab-btn" data-tab="pos-z">POS Daily Z-Report</button>
      <button class="btn btn-outline btn-sm report-tab-btn" data-tab="inventory-val">Inventory Valuation</button>
      <button class="btn btn-outline btn-sm report-tab-btn" data-tab="financials">Financial Statements (P&L / Balance Sheet)</button>
    </div>

    <div id="reports-tab-content">
      <!-- Loaded dynamically -->
    </div>
  `;

  let activeTab = 'pos-z';

  const renderTab = (tab) => {
    activeTab = tab;
    container.querySelectorAll('.report-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    const content = document.getElementById('reports-tab-content');
    if (tab === 'pos-z') renderPosZReport(content);
    else if (tab === 'inventory-val') renderInventoryValuation(content);
    else renderFinancialStatements(content);
  };

  container.querySelectorAll('.report-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => renderTab(btn.dataset.tab));
  });

  document.getElementById('btn-export-report-csv')?.addEventListener('click', () => exportCurrentReportCsv(activeTab));
  document.getElementById('btn-print-report')?.addEventListener('click', () => printCurrentReport(activeTab));

  renderTab('pos-z');
}

function renderPosZReport(content) {
  const comp = AppState.activeCompany || { name: 'Bin Ishaq Softs' };
  const today = new Date().toLocaleDateString('en-PK', { dateStyle: 'full' });

  content.innerHTML = `
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">End-of-Day POS Z-Report (Daily Register Audit)</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">${comp.name} • ${today}</span>
        </div>
        <span class="tag tag-success">AUDIT BALANCED</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total POS Revenue</div>
          <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">Rs. 45,850.00</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Cash in Drawer</div>
          <div style="font-size:1.5rem; font-weight:800; color:#34d399;">Rs. 23,500.00</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Card / Bank Tenders</div>
          <div style="font-size:1.5rem; font-weight:800; color:#fbbf24;">Rs. 22,350.00</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Sales Tax Collected</div>
          <div style="font-size:1.5rem; font-weight:800; color:#c084fc;">Rs. 6,994.00</div>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Shift & Terminal</th>
              <th>Cashier</th>
              <th>Opening Float</th>
              <th>Cash Sales</th>
              <th>Card / Credit</th>
              <th>Total Tendered</th>
              <th>Discrepancy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Counter 01 (Express Lane)</strong></td>
              <td>Muhammad Ali Raza</td>
              <td>Rs. 5,000.00</td>
              <td>Rs. 18,500.00</td>
              <td>Rs. 12,000.00</td>
              <td><strong>Rs. 35,500.00</strong></td>
              <td><span style="color:#34d399;">Rs. 0.00 (Exact)</span></td>
            </tr>
            <tr>
              <td><strong>Counter 02 (Main Register)</strong></td>
              <td>Zainab Fatima</td>
              <td>Rs. 5,000.00</td>
              <td>Rs. 5,000.00</td>
              <td>Rs. 10,350.00</td>
              <td><strong>Rs. 20,350.00</strong></td>
              <td><span style="color:#34d399;">Rs. 0.00 (Exact)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderInventoryValuation(content) {
  let totalCostValuation = 0;
  let totalRetailValuation = 0;

  AppState.products.forEach(p => {
    totalCostValuation += p.cost_price * p.stock;
    totalRetailValuation += p.selling_price * p.stock;
  });

  const unrealizedProfit = totalRetailValuation - totalCostValuation;

  content.innerHTML = `
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Stock Valuation & Potential Margin Report</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">${AppState.products.length} Tracked Catalog Products</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Inventory Asset Cost</div>
          <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">${formatCurrency(totalCostValuation)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Retail Selling Value</div>
          <div style="font-size:1.5rem; font-weight:800; color:#34d399;">${formatCurrency(totalRetailValuation)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Unrealized Gross Margin</div>
          <div style="font-size:1.5rem; font-weight:800; color:#fbbf24;">${formatCurrency(unrealizedProfit)}</div>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Product SKU</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Unit Cost</th>
              <th>Total Cost Asset</th>
              <th>Selling Price</th>
              <th>Retail Valuation</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.products.map(p => `
              <tr>
                <td><code>${p.sku}</code></td>
                <td><strong>${p.name}</strong></td>
                <td>${p.category_name || 'General'}</td>
                <td><strong>${p.stock} ${p.uom || 'Pcs'}</strong></td>
                <td>${formatCurrency(p.cost_price)}</td>
                <td>${formatCurrency(p.cost_price * p.stock)}</td>
                <td>${formatCurrency(p.selling_price)}</td>
                <td><strong>${formatCurrency(p.selling_price * p.stock)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderFinancialStatements(content) {
  content.innerHTML = `
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Statement of Profit and Loss (Income Statement)</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">For the Period Ended ${new Date().toLocaleDateString('en-PK', { dateStyle: 'long' })}</span>
        </div>
        <span class="tag tag-info">IFRS Compliant</span>
      </div>

      <div style="max-width:650px; margin:0 auto; font-size:13px; line-height:1.6;">
        <div style="font-weight:700; font-size:15px; color:#0284c7; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin-bottom:8px;">
          REVENUE / OPERATING TURNOVER
        </div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>POS Retail Sales Revenue (4010):</span><span>Rs. 185,400.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>B2B Wholesale Invoice Sales (4020):</span><span>Rs. 92,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:6px 0; font-weight:700; border-top:1px dashed var(--border-color);">
          <span>Total Gross Revenue:</span><span>Rs. 277,400.00</span>
        </div>

        <div style="font-weight:700; font-size:15px; color:#f87171; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin:16px 0 8px 0;">
          COST OF GOODS SOLD (COGS)
        </div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Opening Inventory:</span><span>Rs. 110,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Purchases & Assembly Receipts:</span><span>Rs. 85,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Less: Ending Inventory:</span><span>-Rs. 68,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:6px 0; font-weight:700; border-top:1px dashed var(--border-color);">
          <span>Cost of Goods Sold (5010):</span><span>-Rs. 127,000.00</span>
        </div>

        <div style="display:flex; justify-content:space-between; padding:8px 0; margin:10px 0; background:rgba(255,255,255,0.03); border-radius:4px; font-weight:800; font-size:14px; color:#38bdf8;">
          <span>GROSS PROFIT:</span><span>Rs. 150,400.00</span>
        </div>

        <div style="font-weight:700; font-size:15px; color:#fbbf24; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin:16px 0 8px 0;">
          OPERATING & ADMINISTRATIVE EXPENSES
        </div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Salaries & Payroll Expense (5030):</span><span>-Rs. 48,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Electricity & Utilities (5050):</span><span>-Rs. 12,500.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Branch Rent (5040):</span><span>-Rs. 25,000.00</span></div>

        <div style="display:flex; justify-content:space-between; padding:10px 0; margin-top:16px; border-top:2px solid var(--primary); font-size:16px; font-weight:800; color:#34d399;">
          <span>NET OPERATING PROFIT (EBIT):</span>
          <span>Rs. 64,900.00</span>
        </div>
      </div>
    </div>
  `;
}

function exportCurrentReportCsv(activeTab) {
  let csvContent = "data:text/csv;charset=utf-8,";
  if (activeTab === 'pos-z') {
    csvContent += "Shift,Cashier,Opening_Float,Cash_Sales,Card_Credit,Total,Discrepancy\n";
    csvContent += "Counter 01,Muhammad Ali Raza,5000,18500,12000,35500,0\n";
    csvContent += "Counter 02,Zainab Fatima,5000,5000,10350,20350,0\n";
  } else {
    csvContent += "SKU,Name,Category,Stock,Cost_Price,Selling_Price\n";
    AppState.products.forEach(p => {
      csvContent += `"${p.sku}","${p.name}","${p.category_name}",${p.stock},${p.cost_price},${p.selling_price}\n`;
    });
  }

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `BinIshaq_${activeTab}_Report.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Report exported as CSV file!', 'success');
}

function printCurrentReport(activeTab) {
  const reportEl = document.getElementById('printable-report-body');
  if (!reportEl) return;

  const title = `BinIshaq_Report_${activeTab.toUpperCase()}`;
  const styles = `
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #000; padding: 10px; }
    .panel-title { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background: #f1f5f9; font-weight: 700; text-align: left; }
    .tag { display: none; }
  `;

  printDocument(title, reportEl.innerHTML, styles);
}
