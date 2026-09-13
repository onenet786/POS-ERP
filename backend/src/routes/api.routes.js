import express from 'express';
import { login, googleLogin, getProfile } from '../controllers/auth.controller.js';
import { getCompanies, updateCompany, createCompany } from '../controllers/company.controller.js';
import { getUsers, createUser, updateUser, getPermissionsMatrix, updatePermissionsMatrix } from '../controllers/users.controller.js';
import {
  getEmployees,
  createEmployee,
  getAttendanceLogs,
  logAttendance,
  syncBiometricDevice,
  processPayroll,
  getPayrollHistory
} from '../controllers/payroll.controller.js';
import { exportDatabaseBackup, restoreDatabaseBackup } from '../controllers/backup.controller.js';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getBatchExpiryReport,
  adjustStock,
  transferStock,
  getStockLedger
} from '../controllers/inventory.controller.js';
import {
  getActiveShift,
  openShift,
  closeShift,
  checkout,
  getTransactions
} from '../controllers/pos.controller.js';
import {
  getSalesOrders,
  createSalesOrder,
  getInvoices,
  createInvoice,
  getCustomers
} from '../controllers/sales.controller.js';
import {
  getChartOfAccounts,
  getJournalEntries,
  createJournalVoucher,
  getFinancialReports
} from '../controllers/accounting.controller.js';
import {
  getRecipes,
  getAssemblyOrders,
  createAssemblyOrder
} from '../controllers/manufacturing.controller.js';
import { getDashboardKPIs } from '../controllers/reports.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public / Auth
router.post('/auth/login', login);
router.post('/auth/google', googleLogin);
router.get('/auth/profile', authenticateToken, getProfile);

// Multi-Company Management
router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.put('/companies/:id', updateCompany);

// Enterprise Security, Users & RBAC Permissions Matrix
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/users/permissions/matrix', getPermissionsMatrix);
router.put('/users/permissions/matrix', updatePermissionsMatrix);

// HR, Biometric / QR Attendance & Payroll
router.get('/payroll/employees', getEmployees);
router.post('/payroll/employees', createEmployee);
router.get('/payroll/attendance', getAttendanceLogs);
router.post('/payroll/attendance/log', logAttendance);
router.post('/payroll/biometric/sync', syncBiometricDevice);
router.post('/payroll/process', processPayroll);
router.get('/payroll/history', getPayrollHistory);

// Database Backup & Restore
router.get('/backup/export', exportDatabaseBackup);
router.post('/backup/restore', restoreDatabaseBackup);

// Dashboard & KPIs
router.get('/reports/dashboard', getDashboardKPIs);

// Inventory & Multi-Warehouse Suite
router.get('/inventory/products', getProducts);
router.post('/inventory/products', createProduct);
router.put('/inventory/products/:id', updateProduct);
router.delete('/inventory/products/:id', deleteProduct);

router.get('/inventory/categories', getCategories);
router.post('/inventory/categories', createCategory);
router.put('/inventory/categories/:id', updateCategory);
router.delete('/inventory/categories/:id', deleteCategory);

router.get('/inventory/warehouses', getWarehouses);
router.post('/inventory/warehouses', createWarehouse);
router.put('/inventory/warehouses/:id', updateWarehouse);
router.delete('/inventory/warehouses/:id', deleteWarehouse);

router.post('/inventory/transfer-stock', transferStock);
router.get('/inventory/ledger', getStockLedger);
router.get('/inventory/batches/expiry', getBatchExpiryReport);
router.post('/inventory/adjust-stock', adjustStock);

// POS Operations
router.get('/pos/shift/active', getActiveShift);
router.post('/pos/shift/open', openShift);
router.post('/pos/shift/close', closeShift);
router.post('/pos/checkout', checkout);
router.get('/pos/transactions', getTransactions);

// Sales & CRM & Field Order Booking
router.get('/sales/orders', getSalesOrders);
router.post('/sales/orders', createSalesOrder);
router.get('/sales/invoices', getInvoices);
router.post('/sales/invoices', createInvoice);
router.get('/sales/customers', getCustomers);

// Double-Entry Accounting
router.get('/accounting/accounts', getChartOfAccounts);
router.get('/accounting/journals', getJournalEntries);
router.post('/accounting/journals', createJournalVoucher);
router.get('/accounting/reports', getFinancialReports);

// Manufacturing & BOM
router.get('/manufacturing/recipes', getRecipes);
router.get('/manufacturing/orders', getAssemblyOrders);
router.post('/manufacturing/assemble', createAssemblyOrder);

export default router;

