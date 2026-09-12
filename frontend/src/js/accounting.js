import { formatCurrency, showToast } from './state.js';
import { Api } from './api.js';

export async function renderAccountingView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Double-Entry Financial Suite & General Ledger</h1>
        <p class="page-subtitle">Automated ledger postings, chart of accounts, trial balance, P&L and balance sheet</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-primary" id="btn-new-jv-modal">
          + Manual Journal Voucher
        </button>
      </div>
    </div>

    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active acc-tab-btn" data-tab="journals">General Journal Entries (JV)</button>
      <button class="btn btn-outline btn-sm acc-tab-btn" data-tab="coa">Chart of Accounts</button>
      <button class="btn btn-outline btn-sm acc-tab-btn" data-tab="reports">Financial Statements (P&L, Balance Sheet)</button>
    </div>

    <div id="acc-tab-content">
      <!-- Dynamic accounting content -->
    </div>
  `;

  await renderJournalsTab();
  attachAccountingEvents();
}

async function renderJournalsTab() {
  const container = document.getElementById('acc-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/accounting/journals');
    const entries = res.entries || [];

    container.innerHTML = `
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Automated General Ledger Postings</h3>
          <span class="tag tag-success">Double-Entry Balanced</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Entry #</th>
                <th>Date</th>
                <th>Source / Ref</th>
                <th>Narration</th>
                <th>Debit / Credit Breakdown</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(jv => `
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${jv.entry_number}</td>
                  <td>${jv.date}</td>
                  <td>
                    <span class="tag tag-info">${jv.source_document || 'MANUAL'}</span>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${jv.reference || ''}</div>
                  </td>
                  <td style="color:var(--text-secondary); max-width:280px;">${jv.narration}</td>
                  <td>
                    <div style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; font-family:var(--font-mono); font-size:0.8rem;">
                      ${jv.lines.map(line => `
                        <div style="display:flex; justify-content:space-between; margin:2px 0;">
                          <span style="color:${line.debit > 0 ? '#38bdf8' : '#cbd5e1'};">
                            ${line.debit > 0 ? 'Dr.' : '   Cr.'} ${line.account_name}
                          </span>
                          <span style="font-weight:700;">
                            ${line.debit > 0 ? formatCurrency(line.debit) : formatCurrency(line.credit)}
                          </span>
                        </div>
                      `).join('')}
                    </div>
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

async function renderCoaTab() {
  const container = document.getElementById('acc-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/accounting/accounts');
    const accounts = res.accounts || [];

    const grouped = {
      Asset: accounts.filter(a => a.type === 'Asset'),
      Liability: accounts.filter(a => a.type === 'Liability'),
      Equity: accounts.filter(a => a.type === 'Equity'),
      Revenue: accounts.filter(a => a.type === 'Revenue'),
      Expense: accounts.filter(a => a.type === 'Expense')
    };

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
        ${Object.entries(grouped).map(([type, accList]) => `
          <div class="glass-panel">
            <div class="panel-header">
              <h3 class="panel-title">${type} Accounts</h3>
              <span class="tag tag-info">${accList.length} Accounts</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${accList.map(a => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--radius-sm);">
                  <div>
                    <span style="font-family:var(--font-mono); font-size:0.78rem; color:#38bdf8; font-weight:700; margin-right:6px;">${a.code}</span>
                    <span style="font-size:0.86rem; font-weight:500;">${a.name}</span>
                  </div>
                  <span style="font-family:var(--font-heading); font-weight:700; font-size:0.95rem; color:#ffffff;">
                    ${formatCurrency(a.current_balance)}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function renderReportsTab() {
  const container = document.getElementById('acc-tab-content');
  if (!container) return;

  try {
    const res = await Api.get('/accounting/reports');
    const { trial_balance, profit_and_loss, balance_sheet } = res;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <!-- Profit & Loss -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Income Statement (Profit & Loss)</h3>
            <span class="tag tag-success">Live YTD</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
            <div style="font-weight:700; color:#34d399; margin-bottom:4px;">REVENUE</div>
            ${profit_and_loss.revenues.map(r => `
              <div style="display:flex; justify-content:space-between;">
                <span>${r.name}</span>
                <span>${formatCurrency(r.current_balance)}</span>
              </div>
            `).join('')}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Gross Revenue:</span>
              <span style="color:#34d399;">${formatCurrency(profit_and_loss.total_revenue)}</span>
            </div>

            <div style="font-weight:700; color:#f87171; margin-top:10px; margin-bottom:4px;">EXPENSES & COGS</div>
            ${profit_and_loss.expenses.map(e => `
              <div style="display:flex; justify-content:space-between;">
                <span>${e.name}</span>
                <span>${formatCurrency(e.current_balance)}</span>
              </div>
            `).join('')}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Expenses:</span>
              <span style="color:#f87171;">${formatCurrency(profit_and_loss.total_expense)}</span>
            </div>

            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; border-top:2px solid var(--border-bright); padding-top:8px; margin-top:8px; color:#38bdf8;">
              <span>NET OPERATING PROFIT:</span>
              <span>${formatCurrency(profit_and_loss.net_profit)}</span>
            </div>
          </div>
        </div>

        <!-- Balance Sheet -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Balance Sheet</h3>
            <span class="tag tag-info">A = L + E</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
            <div style="font-weight:700; color:#38bdf8;">TOTAL ASSETS</div>
            ${balance_sheet.assets.map(a => `
              <div style="display:flex; justify-content:space-between;">
                <span>${a.name}</span>
                <span>${formatCurrency(a.current_balance)}</span>
              </div>
            `).join('')}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Assets:</span>
              <span style="color:#38bdf8;">${formatCurrency(balance_sheet.total_assets)}</span>
            </div>

            <div style="font-weight:700; color:#fbbf24; margin-top:10px;">LIABILITIES & EQUITY</div>
            ${balance_sheet.liabilities.map(l => `
              <div style="display:flex; justify-content:space-between;">
                <span>${l.name}</span>
                <span>${formatCurrency(l.current_balance)}</span>
              </div>
            `).join('')}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Liabilities & Equity:</span>
              <span style="color:#fbbf24;">${formatCurrency(balance_sheet.total_liabilities_and_equity || balance_sheet.total_equity_and_liabilities)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function attachAccountingEvents() {
  const tabs = document.querySelectorAll('.acc-tab-btn');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      t.classList.add('active');
      const tab = t.dataset.tab;
      if (tab === 'journals') renderJournalsTab();
      else if (tab === 'coa') renderCoaTab();
      else if (tab === 'reports') renderReportsTab();
    });
  });

  document.getElementById('btn-new-jv-modal')?.addEventListener('click', openManualJvModal);
}

function openManualJvModal() {
  const modalHtml = `
    <div class="modal-overlay" id="manual-jv-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Post Manual Journal Voucher</h3>
          <button class="btn-icon btn-sm" id="btn-close-jv">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Reference / Slip #:</label>
            <input type="text" id="jv-ref" value="BANK-DEP-092" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">Narration:</label>
            <input type="text" id="jv-narration" value="Cash deposit from store counter to Bank Al Habib current account" class="form-control" />
          </div>

          <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:600; font-size:0.85rem; margin-bottom:8px;">Balanced Double-Entry Line 1 (Debit):</div>
            <div style="display:grid; grid-template-columns:2fr 1fr; gap:8px;">
              <select id="jv-debit-acc" class="form-control">
                <option value="1020">Bank Al Habib - Current A/C (1020)</option>
                <option value="1010">Main Cash Drawer (1010)</option>
                <option value="5020">Store Rent & Maintenance (5020)</option>
              </select>
              <input type="number" id="jv-debit-amt" value="15000" class="form-control" placeholder="Debit Amount" />
            </div>

            <div style="font-weight:600; font-size:0.85rem; margin-top:12px; margin-bottom:8px;">Balanced Double-Entry Line 2 (Credit):</div>
            <div style="display:grid; grid-template-columns:2fr 1fr; gap:8px;">
              <select id="jv-credit-acc" class="form-control">
                <option value="1010">Main Cash Drawer (1010)</option>
                <option value="1020">Bank Al Habib - Current A/C (1020)</option>
                <option value="2010">Accounts Payable (2010)</option>
              </select>
              <input type="number" id="jv-credit-amt" value="15000" class="form-control" placeholder="Credit Amount" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-jv">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-jv">Post Journal Voucher</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('manual-jv-modal');
  document.getElementById('btn-close-jv')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-jv')?.addEventListener('click', () => modal.remove());

  document.getElementById('btn-submit-jv')?.addEventListener('click', async () => {
    const ref = document.getElementById('jv-ref').value;
    const narration = document.getElementById('jv-narration').value;
    const drAcc = Number(document.getElementById('jv-debit-acc').value);
    const drAmt = Number(document.getElementById('jv-debit-amt').value);
    const crAcc = Number(document.getElementById('jv-credit-acc').value);
    const crAmt = Number(document.getElementById('jv-credit-amt').value);

    if (drAmt !== crAmt) {
      showToast('Debits and Credits must balance exactly!', 'error');
      return;
    }

    try {
      const res = await Api.post('/accounting/journals', {
        reference: ref,
        narration,
        lines: [
          { accountId: drAcc, debit: drAmt, credit: 0 },
          { accountId: crAcc, debit: 0, credit: crAmt }
        ]
      });

      if (res.success) {
        showToast('Journal Voucher posted to General Ledger!', 'success');
        modal.remove();
        renderJournalsTab();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
