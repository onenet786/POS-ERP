import { query, getMockStore, isPostgresActive } from '../config/db.js';
import { postGeneralJournal } from '../services/ledgerService.js';

export async function getEmployees(req, res) {
  try {
    const { company_id } = req.query;
    if (isPostgresActive()) {
      let q = 'SELECT * FROM employees';
      const params = [];
      if (company_id) {
        q += ' WHERE company_id = $1';
        params.push(company_id);
      }
      q += ' ORDER BY id ASC';
      const result = await query(q, params);
      return res.json({ success: true, employees: result.rows });
    }

    const store = getMockStore();
    let emps = store.employees;
    if (company_id) {
      emps = emps.filter(e => e.company_id === parseInt(company_id));
    }
    res.json({ success: true, employees: emps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createEmployee(req, res) {
  try {
    const {
      company_id,
      employee_code,
      full_name,
      department,
      designation,
      cnic,
      phone,
      email,
      base_salary,
      allowances,
      tax_deduction
    } = req.body;

    if (!employee_code || !full_name || !department) {
      return res.status(400).json({ success: false, message: 'Employee Code, Full Name, and Department are required' });
    }

    const qr_badge_code = `QR-${employee_code}-${full_name.split(' ')[0].toUpperCase()}`;

    if (isPostgresActive()) {
      const result = await query(
        `INSERT INTO employees (company_id, employee_code, full_name, department, designation, cnic, phone, email, base_salary, allowances, tax_deduction, qr_badge_code)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [company_id || 1, employee_code, full_name, department, designation || '', cnic || '', phone || '', email || '', base_salary || 40000, allowances || 0, tax_deduction || 0, qr_badge_code]
      );
      return res.status(201).json({ success: true, employee: result.rows[0], message: 'Employee registered successfully' });
    }

    const store = getMockStore();
    const newEmp = {
      id: store.employees.length + 1,
      company_id: parseInt(company_id) || 1,
      employee_code,
      full_name,
      department,
      designation: designation || 'Staff',
      cnic: cnic || '35201-0000000-0',
      phone: phone || '+92 300 0000000',
      email: email || '',
      base_salary: Number(base_salary) || 40000,
      allowances: Number(allowances) || 0,
      tax_deduction: Number(tax_deduction) || 0,
      status: 'ACTIVE',
      qr_badge_code
    };
    store.employees.push(newEmp);
    res.status(201).json({ success: true, employee: newEmp, message: 'Employee registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getAttendanceLogs(req, res) {
  try {
    const { date, employee_id } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    if (isPostgresActive()) {
      let q = `
        SELECT a.*, e.full_name as employee_name, e.employee_code, e.department
        FROM attendance_logs a
        JOIN employees e ON a.employee_id = e.id
        WHERE a.log_date = $1
      `;
      const params = [targetDate];
      if (employee_id) {
        q += ' AND a.employee_id = $2';
        params.push(employee_id);
      }
      q += ' ORDER BY a.id DESC';
      const result = await query(q, params);
      return res.json({ success: true, logs: result.rows });
    }

    const store = getMockStore();
    let logs = store.attendance_logs.filter(l => l.log_date === targetDate);
    if (employee_id) {
      logs = logs.filter(l => l.employee_id === parseInt(employee_id));
    }
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Check in via Biometric Device / QR Code Badge / Mobile GPS
export async function logAttendance(req, res) {
  try {
    const { employee_id, qr_badge_code, method, latitude, longitude, clock_type } = req.body;
    const store = getMockStore();

    let emp = null;
    if (qr_badge_code) {
      emp = store.employees.find(e => e.qr_badge_code === qr_badge_code || e.employee_code === qr_badge_code);
    } else if (employee_id) {
      emp = store.employees.find(e => e.id === parseInt(employee_id));
    }

    if (!emp) {
      return res.status(404).json({ success: false, message: 'Employee badge or ID not found' });
    }

    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toTimeString().split(' ')[0];

    let existingLog = store.attendance_logs.find(l => l.employee_id === emp.id && l.log_date === today);

    if (!existingLog) {
      existingLog = {
        id: store.attendance_logs.length + 1,
        employee_id: emp.id,
        employee_name: emp.full_name,
        log_date: today,
        clock_in: nowTime,
        clock_out: null,
        method: method || 'BIOMETRIC',
        latitude: latitude || null,
        longitude: longitude || null,
        status: nowTime > '09:15:00' ? 'LATE' : 'PRESENT'
      };
      store.attendance_logs.unshift(existingLog);
    } else {
      existingLog.clock_out = nowTime;
      if (method) existingLog.method = method;
    }

    res.json({
      success: true,
      log: existingLog,
      message: `Attendance marked for ${emp.full_name} (${existingLog.clock_out ? 'Clock-Out' : 'Clock-In'}) via ${method || 'BIOMETRIC'}`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Biometric Hardware Sync Simulation (ZKTeco / Anviz Device Sync)
export async function syncBiometricDevice(req, res) {
  try {
    const { device_ip, terminal_name } = req.body;
    const store = getMockStore();
    const today = new Date().toISOString().split('T')[0];

    let syncedCount = 0;
    store.employees.forEach(emp => {
      const exists = store.attendance_logs.some(l => l.employee_id === emp.id && l.log_date === today);
      if (!exists) {
        store.attendance_logs.unshift({
          id: store.attendance_logs.length + 1,
          employee_id: emp.id,
          employee_name: emp.full_name,
          log_date: today,
          clock_in: '08:58:00',
          clock_out: '17:02:00',
          method: 'BIOMETRIC',
          status: 'PRESENT'
        });
        syncedCount++;
      }
    });

    res.json({
      success: true,
      syncedCount,
      terminal: terminal_name || 'ZK-Teco Biometric Scanner #01',
      device_ip: device_ip || '192.168.1.201',
      message: `Biometric sync completed: ${syncedCount} log records imported successfully.`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// One-Click Automated Payroll Generation & General Ledger Posting
export async function processPayroll(req, res) {
  try {
    const { company_id, month_year } = req.body;
    const store = getMockStore();
    const period = month_year || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    let emps = store.employees;
    if (company_id) {
      emps = emps.filter(e => e.company_id === parseInt(company_id));
    }

    let totalGross = 0;
    let totalDeductions = 0;
    let totalNet = 0;

    const payslips = emps.map(e => {
      const gross = e.base_salary + e.allowances;
      const deductions = e.tax_deduction;
      const net = gross - deductions;

      totalGross += gross;
      totalDeductions += deductions;
      totalNet += net;

      return {
        employee_id: e.id,
        employee_code: e.employee_code,
        employee_name: e.full_name,
        department: e.department,
        designation: e.designation,
        cnic: e.cnic,
        base_salary: e.base_salary,
        allowances: e.allowances,
        tax_deduction: e.tax_deduction,
        net_salary: net,
        month_year: period
      };
    });

    // Automatically post balanced Double-Entry Journal Entry in General Ledger:
    // Debit: Payroll / Salaries Expense (Account 5030)
    // Credit: Bank Al Habib / Cash Drawer (Account 1020 or 1010)
    const journalRes = await postGeneralJournal({
      entry_date: new Date().toISOString().split('T')[0],
      narration: `Automated Payroll Processing for ${period} (${emps.length} Employees)`,
      source_module: 'PAYROLL',
      source_reference: `PAY-${period.replace(/\s+/g, '-')}`,
      lines: [
        {
          account_code: '5030', // Salaries & Wages Expense
          description: `Total Gross Salary & Allowances - ${period}`,
          debit_amount: totalGross,
          credit_amount: 0.00
        },
        {
          account_code: '2020', // Withholding Tax / Tax Payable
          description: `Income Tax Deductions on Payroll - ${period}`,
          debit_amount: 0.00,
          credit_amount: totalDeductions
        },
        {
          account_code: '1020', // Bank Account (Disbursement)
          description: `Net Salary Disbursed to Employees via Bank Transfer - ${period}`,
          debit_amount: 0.00,
          credit_amount: totalNet
        }
      ]
    });

    const runRecord = {
      id: (store.payroll_runs?.length || 0) + 1,
      company_id: parseInt(company_id) || 1,
      month_year: period,
      total_gross: totalGross,
      total_deductions: totalDeductions,
      total_net: totalNet,
      employee_count: emps.length,
      journal_entry_id: journalRes?.journal_entry_id || null,
      journal_number: journalRes?.entry_number || 'JV-PAYROLL',
      status: 'PROCESSED',
      processed_at: new Date().toISOString(),
      payslips
    };

    if (!store.payroll_runs) store.payroll_runs = [];
    store.payroll_runs.unshift(runRecord);

    res.json({
      success: true,
      payroll: runRecord,
      message: `Payroll processed successfully for ${emps.length} employees! Total Net: Rs. ${totalNet.toLocaleString()} posted to General Ledger.`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getPayrollHistory(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, history: store.payroll_runs || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
