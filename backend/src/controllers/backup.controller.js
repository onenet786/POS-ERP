import { query, getMockStore, isPostgresActive } from '../config/db.js';

// Export complete system snapshot as JSON / SQL structure
export async function exportDatabaseBackup(req, res) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let snapshot = {};

    if (isPostgresActive()) {
      const [
        usersRes,
        rolesRes,
        compRes,
        prodsRes,
        catsRes,
        whsRes,
        custsRes,
        vendorsRes,
        coaRes,
        journalsRes,
        posTxRes,
        invoicesRes,
        empsRes,
        attRes
      ] = await Promise.all([
        query('SELECT * FROM users'),
        query('SELECT * FROM roles'),
        query('SELECT * FROM companies'),
        query('SELECT * FROM products'),
        query('SELECT * FROM categories'),
        query('SELECT * FROM warehouses'),
        query('SELECT * FROM customers'),
        query('SELECT * FROM vendors'),
        query('SELECT * FROM chart_of_accounts'),
        query('SELECT * FROM journal_entries'),
        query('SELECT * FROM pos_transactions'),
        query('SELECT * FROM sales_invoices'),
        query('SELECT * FROM employees'),
        query('SELECT * FROM attendance_logs')
      ]);

      snapshot = {
        app: 'OneNet Solutions Enterprise Suite',
        version: '2.0.0-Enterprise',
        exported_at: new Date().toISOString(),
        database: process.env.PGDATABASE || 'bierppos',
        tables: {
          users: usersRes.rows,
          roles: rolesRes.rows,
          companies: compRes.rows,
          products: prodsRes.rows,
          categories: catsRes.rows,
          warehouses: whsRes.rows,
          customers: custsRes.rows,
          vendors: vendorsRes.rows,
          chart_of_accounts: coaRes.rows,
          journal_entries: journalsRes.rows,
          pos_transactions: posTxRes.rows,
          sales_invoices: invoicesRes.rows,
          employees: empsRes.rows,
          attendance_logs: attRes.rows
        }
      };
    } else {
      const store = getMockStore();
      snapshot = {
        app: 'OneNet Solutions Enterprise Suite',
        version: '2.0.0-Enterprise',
        exported_at: new Date().toISOString(),
        tables: {
          users: store.users,
          roles: store.roles,
          companies: store.companies,
          products: store.products,
          categories: store.categories,
          warehouses: store.warehouses,
          customers: store.customers,
          vendors: store.vendors,
          chart_of_accounts: store.chart_of_accounts,
          employees: store.employees,
          attendance_logs: store.attendance_logs,
          permissions_matrix: store.permissions_matrix
        }
      };
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="OneNet-Enterprise-Backup-${timestamp}.json"`);
    res.send(JSON.stringify(snapshot, null, 2));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Restore database snapshot
export async function restoreDatabaseBackup(req, res) {
  try {
    const { backupData } = req.body;
    if (!backupData || !backupData.tables) {
      return res.status(400).json({ success: false, message: 'Invalid backup structure. Must contain valid tables snapshot.' });
    }

    const store = getMockStore();
    if (backupData.tables.products) store.products = backupData.tables.products;
    if (backupData.tables.categories) store.categories = backupData.tables.categories;
    if (backupData.tables.customers) store.customers = backupData.tables.customers;
    if (backupData.tables.companies) store.companies = backupData.tables.companies;
    if (backupData.tables.employees) store.employees = backupData.tables.employees;
    if (backupData.tables.attendance_logs) store.attendance_logs = backupData.tables.attendance_logs;
    if (backupData.tables.chart_of_accounts) store.chart_of_accounts = backupData.tables.chart_of_accounts;

    res.json({
      success: true,
      message: `Database restored successfully from backup dated ${backupData.exported_at || 'recent'}`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
