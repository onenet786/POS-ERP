import express from 'express';
import { login, getProfile } from '../controllers/auth.controller.js';
import {
  getProducts,
  createProduct,
  getCategories,
  getWarehouses,
  getBatchExpiryReport,
  adjustStock
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
router.get('/auth/profile', authenticateToken, getProfile);

// Dashboard & KPIs
router.get('/reports/dashboard', getDashboardKPIs);

// Inventory
router.get('/inventory/products', getProducts);
router.post('/inventory/products', createProduct);
router.get('/inventory/categories', getCategories);
router.get('/inventory/warehouses', getWarehouses);
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
