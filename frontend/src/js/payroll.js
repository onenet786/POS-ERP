import { AppState, formatCurrency, showToast } from './state.js';
import { Api } from './api.js';
import { printEmployeePayslip } from './printService.js';

let employeesList = [];
let attendanceLogs = [];
let payrollHistory = [];

export async function renderPayrollView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">HR, Biometric Attendance & Payroll</h1>
        <p class="page-subtitle">Employee directory, Biometric / QR camera attendance, and automated ledger payroll runs</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-sync-biometric">
          🔄 Sync Biometric Terminal
        </button>
        <button class="btn btn-outline" id="btn-open-qr-scanner">
          📷 QR Badge Scanner
        </button>
        <button class="btn btn-primary" id="btn-process-payroll-modal">
          💵 Process Monthly Payroll
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active payroll-tab-btn" data-tab="employees">Employee Directory</button>
      <button class="btn btn-outline btn-sm payroll-tab-btn" data-tab="attendance">Daily Attendance Log</button>
      <button class="btn btn-outline btn-sm payroll-tab-btn" data-tab="history">Payroll Runs & Payslips</button>
    </div>

    <div id="payroll-tab-content">
      <!-- Loaded dynamically -->
    </div>
  `;

  // Load Data
  await loadPayrollData();

  const renderTab = (tab) => {
    container.querySelectorAll('.payroll-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    const content = document.getElementById('payroll-tab-content');
    if (tab === 'employees') renderEmployeesTab(content);
    else if (tab === 'attendance') renderAttendanceTab(content);
    else renderHistoryTab(content);
  };

  container.querySelectorAll('.payroll-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => renderTab(btn.dataset.tab));
  });

  document.getElementById('btn-sync-biometric')?.addEventListener('click', triggerBiometricSync);
  document.getElementById('btn-open-qr-scanner')?.addEventListener('click', openQrScannerModal);
  document.getElementById('btn-process-payroll-modal')?.addEventListener('click', openProcessPayrollModal);

  renderTab('employees');
}

async function loadPayrollData() {
  try {
    const compId = AppState.activeCompany?.id || 1;
    const [empRes, attRes, payRes] = await Promise.all([
      Api.get(`/payroll/employees?company_id=${compId}`),
      Api.get('/payroll/attendance'),
      Api.get('/payroll/history')
    ]);

    if (empRes.success) employeesList = empRes.employees;
    if (attRes.success) attendanceLogs = attRes.logs;
    if (payRes.success) payrollHistory = payRes.history;
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function renderEmployeesTab(content) {
  content.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Active Employees</h3>
        <button class="btn btn-sm btn-primary" id="btn-add-emp-modal">+ Register Employee</button>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Emp Code</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Tax Deduction</th>
              <th>Net Est.</th>
              <th>QR Badge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${employeesList.map(e => `
              <tr>
                <td><strong>${e.employee_code}</strong></td>
                <td><strong>${e.full_name}</strong></td>
                <td>${e.department}</td>
                <td>${e.designation}</td>
                <td>${formatCurrency(e.base_salary)}</td>
                <td style="color:#34d399;">+${formatCurrency(e.allowances)}</td>
                <td style="color:#f87171;">-${formatCurrency(e.tax_deduction)}</td>
                <td><strong>${formatCurrency(e.base_salary + e.allowances - e.tax_deduction)}</strong></td>
                <td><span class="tag tag-info" style="font-family:monospace;">${e.qr_badge_code}</span></td>
                <td>
                  <button class="btn btn-outline btn-xs btn-print-quick-payslip" data-id="${e.id}">Payslip</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('btn-add-emp-modal')?.addEventListener('click', openAddEmployeeModal);
  content.querySelectorAll('.btn-print-quick-payslip').forEach(btn => {
    btn.addEventListener('click', () => {
      const emp = employeesList.find(x => x.id === parseInt(btn.dataset.id));
      if (emp) {
        printEmployeePayslip({
          employee_code: emp.employee_code,
          employee_name: emp.full_name,
          department: emp.department,
          designation: emp.designation,
          cnic: emp.cnic,
          base_salary: emp.base_salary,
          allowances: emp.allowances,
          tax_deduction: emp.tax_deduction,
          net_salary: emp.base_salary + emp.allowances - emp.tax_deduction,
          month_year: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
        });
      }
    });
  });
}

function renderAttendanceTab(content) {
  content.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Today's Attendance Register</h3>
          <span style="font-size:0.82rem; color:var(--text-muted);">${new Date().toLocaleDateString('en-PK', { dateStyle: 'full' })}</span>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-sm btn-outline" id="btn-manual-punch-modal">⏱️ Manual / GPS Punch</button>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Punch Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${attendanceLogs.map(l => `
              <tr>
                <td><strong>${l.employee_name}</strong></td>
                <td>${l.log_date}</td>
                <td><code>${l.clock_in || '--:--'}</code></td>
                <td><code>${l.clock_out || '--:--'}</code></td>
                <td>
                  <span class="tag ${l.method === 'BIOMETRIC' ? 'tag-info' : l.method === 'QR_SCANNER' ? 'tag-warning' : 'tag-success'}">
                    ${l.method === 'BIOMETRIC' ? '📟 Biometric' : l.method === 'QR_SCANNER' ? '📷 QR Badge' : '📍 Mobile GPS'}
                  </span>
                </td>
                <td>
                  <span class="tag ${l.status === 'PRESENT' ? 'tag-success' : 'tag-warning'}">
                    ${l.status}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('btn-manual-punch-modal')?.addEventListener('click', openManualPunchModal);
}

function renderHistoryTab(content) {
  content.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Payroll Processing History & Ledger Postings</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${payrollHistory.length} Runs Completed</span>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Staff Count</th>
              <th>Gross Salaries</th>
              <th>Tax Deductions</th>
              <th>Net Disbursed</th>
              <th>General Ledger JV</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${payrollHistory.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">
                  No payroll processed yet for this company. Click "Process Monthly Payroll" above to generate.
                </td>
              </tr>
            ` : payrollHistory.map(r => `
              <tr>
                <td><strong>${r.month_year}</strong></td>
                <td>${r.employee_count} Employees</td>
                <td>${formatCurrency(r.total_gross)}</td>
                <td style="color:#f87171;">-${formatCurrency(r.total_deductions)}</td>
                <td><strong style="color:#34d399;">${formatCurrency(r.total_net)}</strong></td>
                <td><span class="tag tag-info">${r.journal_number || 'JV-PAYROLL'}</span></td>
                <td><span class="tag tag-success">${r.status}</span></td>
                <td>
                  <button class="btn btn-outline btn-xs btn-print-all-slips" data-id="${r.id}">Print All Payslips</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  content.querySelectorAll('.btn-print-all-slips').forEach(btn => {
    btn.addEventListener('click', () => {
      const run = payrollHistory.find(x => x.id === parseInt(btn.dataset.id));
      if (run && run.payslips && run.payslips.length > 0) {
        run.payslips.forEach(ps => printEmployeePayslip(ps));
        showToast(`Printed ${run.payslips.length} employee payslips!`, 'success');
      }
    });
  });
}

async function triggerBiometricSync() {
  try {
    showToast('Connecting to TCP/IP Biometric Terminal at 192.168.1.201...', 'info');
    const res = await Api.post('/payroll/biometric/sync', {
      device_ip: '192.168.1.201',
      terminal_name: 'ZK-Teco Biometric Scanner Counter 01'
    });

    if (res.success) {
      showToast(res.message, 'success');
      await loadPayrollData();
      const content = document.getElementById('payroll-tab-content');
      if (content) renderAttendanceTab(content);
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function openQrScannerModal() {
  const modalHtml = `
    <div class="modal-overlay" id="qr-scanner-modal">
      <div class="modal-content" style="max-width: 480px; text-align:center;">
        <div class="modal-header">
          <h3 class="modal-title">Employee QR Badge Scanner</h3>
          <button class="btn-icon btn-sm" id="btn-close-qr-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="border: 2px dashed #38bdf8; border-radius:12px; padding:2rem; background:rgba(14,165,233,0.05); margin-bottom:1.25rem;">
            <div style="font-size:3rem; margin-bottom:0.5rem;">📷</div>
            <div style="font-weight:700; font-size:1.1rem; color:#fff;">Live Camera Ready</div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
              Hold employee badge QR code in front of camera or select badge below:
            </p>
          </div>

          <div class="form-group" style="text-align:left;">
            <label class="form-label">Simulate Badge Scan (or Enter QR Code):</label>
            <select id="select-quick-qr" class="form-control">
              <option value="">-- Choose Employee Badge --</option>
              ${employeesList.map(e => `<option value="${e.qr_badge_code}">${e.full_name} (${e.qr_badge_code})</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-qr">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-qr-scan">Scan & Clock In/Out</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('qr-scanner-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-qr-modal')?.addEventListener('click', close);
  document.getElementById('btn-cancel-qr')?.addEventListener('click', close);

  document.getElementById('btn-confirm-qr-scan')?.addEventListener('click', async () => {
    const qrCode = document.getElementById('select-quick-qr').value;
    if (!qrCode) {
      showToast('Please select or scan an employee badge', 'error');
      return;
    }

    try {
      const res = await Api.post('/payroll/attendance/log', {
        qr_badge_code: qrCode,
        method: 'QR_SCANNER'
      });

      if (res.success) {
        showToast(res.message, 'success');
        await loadPayrollData();
        const content = document.getElementById('payroll-tab-content');
        if (content) renderAttendanceTab(content);
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function openManualPunchModal() {
  const modalHtml = `
    <div class="modal-overlay" id="manual-punch-modal">
      <div class="modal-content" style="max-width: 440px;">
        <div class="modal-header">
          <h3 class="modal-title">Mobile GPS / Manual Attendance Clock</h3>
          <button class="btn-icon btn-sm" id="btn-close-punch-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Select Employee:</label>
            <select id="punch-emp-id" class="form-control">
              ${employeesList.map(e => `<option value="${e.id}">${e.full_name} (${e.department})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Punch Method:</label>
            <select id="punch-method" class="form-control">
              <option value="MOBILE_GPS">📍 Mobile GPS Location Punch</option>
              <option value="MANUAL">✍️ Manual Time Record</option>
              <option value="BIOMETRIC">📟 Terminal Biometric Sync</option>
            </select>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:6px; border:1px solid var(--border-color); font-size:12px; color:var(--text-muted);">
            <div>📍 Detected Coordinates: <strong>31.5204° N, 74.3587° E</strong> (Lahore)</div>
            <div>Time: <strong>${new Date().toLocaleTimeString('en-PK')}</strong></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-punch">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-punch">Record Attendance</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('manual-punch-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-punch-modal')?.addEventListener('click', close);
  document.getElementById('btn-cancel-punch')?.addEventListener('click', close);

  document.getElementById('btn-confirm-punch')?.addEventListener('click', async () => {
    const employee_id = document.getElementById('punch-emp-id').value;
    const method = document.getElementById('punch-method').value;

    try {
      const res = await Api.post('/payroll/attendance/log', {
        employee_id,
        method,
        latitude: 31.5204,
        longitude: 74.3587
      });

      if (res.success) {
        showToast(res.message, 'success');
        await loadPayrollData();
        const content = document.getElementById('payroll-tab-content');
        if (content) renderAttendanceTab(content);
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function openProcessPayrollModal() {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const totalGross = employeesList.reduce((sum, e) => sum + e.base_salary + e.allowances, 0);
  const totalTax = employeesList.reduce((sum, e) => sum + e.tax_deduction, 0);
  const totalNet = totalGross - totalTax;

  const modalHtml = `
    <div class="modal-overlay" id="process-payroll-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Process Monthly Payroll & Post Ledger</h3>
          <button class="btn-icon btn-sm" id="btn-close-payroll-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(14,165,233,0.1); border:1px solid var(--border-bright); padding:1rem; border-radius:8px; text-align:center; margin-bottom:1rem;">
            <div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">Payroll Period</div>
            <div style="font-size:1.6rem; font-weight:800; color:#38bdf8;">${currentMonth}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">Company: ${AppState.activeCompany?.name || 'Bin Ishaq Softs'}</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px; padding:0.75rem; margin-bottom:1rem; font-size:13px;">
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Eligible Employees:</span><strong>${employeesList.length} Active Staff</strong></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Gross Pay & Allowances:</span><span>${formatCurrency(totalGross)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Withholding Tax Deductions:</span><span style="color:#f87171;">-${formatCurrency(totalTax)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-top:1px solid var(--border-color); font-size:15px; font-weight:800; color:#34d399;">
              <span>Net Disbursement (Bank Transfer):</span>
              <span>${formatCurrency(totalNet)}</span>
            </div>
          </div>

          <div style="font-size:12px; color:var(--text-muted); line-height:1.4;">
            ⚡ <strong>Automated Double-Entry Ledger Posting:</strong> Clicking confirm will instantly credit <em>Bank Account (1020)</em> and debit <em>Salaries Expense (5030)</em> with full audit tracking.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-payroll">Cancel</button>
          <button class="btn btn-success" id="btn-confirm-payroll" style="padding:0.75rem 1.5rem;">Confirm & Post to Ledger</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('process-payroll-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-payroll-modal')?.addEventListener('click', close);
  document.getElementById('btn-cancel-payroll')?.addEventListener('click', close);

  document.getElementById('btn-confirm-payroll')?.addEventListener('click', async () => {
    try {
      const res = await Api.post('/payroll/process', {
        company_id: AppState.activeCompany?.id || 1,
        month_year: currentMonth
      });

      if (res.success) {
        showToast(res.message, 'success');
        await loadPayrollData();
        const content = document.getElementById('payroll-tab-content');
        if (content) renderHistoryTab(content);
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function openAddEmployeeModal() {
  const modalHtml = `
    <div class="modal-overlay" id="add-emp-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Register Employee</h3>
          <button class="btn-icon btn-sm" id="btn-close-add-emp">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name:</label>
            <input type="text" id="new-emp-name" class="form-control" placeholder="e.g. Tariq Mehmood" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Employee Code:</label>
              <input type="text" id="new-emp-code" class="form-control" value="EMP-${100 + employeesList.length + 1}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Department:</label>
              <select id="new-emp-dept" class="form-control">
                <option value="Retail POS Operations">Retail POS Operations</option>
                <option value="Store Management">Store Management</option>
                <option value="Finance & Accounts">Finance & Accounts</option>
                <option value="Field Sales Logistics">Field Sales Logistics</option>
                <option value="Manufacturing & BOM">Manufacturing & BOM</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Designation:</label>
              <input type="text" id="new-emp-desig" class="form-control" placeholder="e.g. Branch Supervisor" required />
            </div>
            <div class="form-group">
              <label class="form-label">Base Monthly Salary (Rs):</label>
              <input type="number" id="new-emp-salary" class="form-control" value="45000" required />
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Allowances (Rs):</label>
              <input type="number" id="new-emp-allowance" class="form-control" value="3000" />
            </div>
            <div class="form-group">
              <label class="form-label">Tax Deduction (Rs):</label>
              <input type="number" id="new-emp-tax" class="form-control" value="1000" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-add-emp">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-add-emp">Save Employee</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('add-emp-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-add-emp')?.addEventListener('click', close);
  document.getElementById('btn-cancel-add-emp')?.addEventListener('click', close);

  document.getElementById('btn-confirm-add-emp')?.addEventListener('click', async () => {
    const full_name = document.getElementById('new-emp-name').value.trim();
    const employee_code = document.getElementById('new-emp-code').value.trim();
    const department = document.getElementById('new-emp-dept').value;
    const designation = document.getElementById('new-emp-desig').value.trim();
    const base_salary = Number(document.getElementById('new-emp-salary').value) || 40000;
    const allowances = Number(document.getElementById('new-emp-allowance').value) || 0;
    const tax_deduction = Number(document.getElementById('new-emp-tax').value) || 0;

    if (!full_name || !employee_code) {
      showToast('Name and code are required', 'error');
      return;
    }

    try {
      const res = await Api.post('/payroll/employees', {
        company_id: AppState.activeCompany?.id || 1,
        full_name,
        employee_code,
        department,
        designation,
        base_salary,
        allowances,
        tax_deduction
      });

      if (res.success) {
        showToast('Employee registered successfully!', 'success');
        await loadPayrollData();
        const content = document.getElementById('payroll-tab-content');
        if (content) renderEmployeesTab(content);
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
