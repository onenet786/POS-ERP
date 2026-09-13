import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const { Pool } = pg;

let pool = null;
let isPgAvailable = false;

// In-memory fallback state initialized with rich seed data for local dev & offline resilience
const mockStore = {
  roles: [
    { id: 1, name: 'Super Admin', description: 'Full system access' },
    { id: 2, name: 'Store Manager', description: 'Store & inventory manager' },
    { id: 3, name: 'Cashier', description: 'POS billing and checkout' },
    { id: 4, name: 'Field Sales Booker', description: 'Mobile order booker' }
  ],
  users: [
    { id: 1, username: 'admin', email: 'admin@apexerppos.com', password_hash: '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', full_name: 'System Administrator', role_id: 1, role_name: 'Super Admin', is_active: true },
    { id: 2, username: 'manager', email: 'manager@apexerppos.com', password_hash: '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', full_name: 'Zainab Fatima', role_id: 2, role_name: 'Store Manager', is_active: true },
    { id: 3, username: 'cashier1', email: 'cashier1@apexerppos.com', password_hash: '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', full_name: 'Ali Raza', role_id: 3, role_name: 'Cashier', is_active: true },
    { id: 4, username: 'booker1', email: 'booker1@apexerppos.com', password_hash: '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', full_name: 'Hamza Khan', role_id: 4, role_name: 'Field Sales Booker', is_active: true }
  ],
  warehouses: [
    { id: 1, code: 'WH-MAIN', name: 'Central Logistics Warehouse', address: 'Plot 45, Industrial Area, Sector 7', phone: '+92 300 1112233', is_default: true, is_active: true },
    { id: 2, code: 'WH-OUTLET1', name: 'Retail Branch 1 - Mega Mall', address: 'Shop 12-B, Mega Mall', phone: '+92 300 2223344', is_default: false, is_active: true },
    { id: 3, code: 'WH-OUTLET2', name: 'Retail Branch 2 - Commercial Market', address: 'Plaza 8, Main Blvd', phone: '+92 300 3334455', is_default: false, is_active: true }
  ],
  categories: [
    { id: 1, name: 'Beverages & Soft Drinks', code: 'CAT-BEV' },
    { id: 2, name: 'Snacks & Packaged Food', code: 'CAT-SNK' },
    { id: 3, name: 'Electronics & Accessories', code: 'CAT-ELE' },
    { id: 4, name: 'Personal Care & Hygiene', code: 'CAT-PER' },
    { id: 5, name: 'Raw Materials & Components', code: 'CAT-RAW' }
  ],
  products: [
    { id: 1, sku: 'BEV-PEPSI-500', barcode: '896400010101', name: 'Pepsi Cola 500ml Bottle', category_id: 1, category_name: 'Beverages & Soft Drinks', uom: 'Pcs', cost_price: 75.00, selling_price: 100.00, tax_rate: 18.00, stock: 470, reorder_level: 50, is_batch_tracked: true, is_manufactured: false },
    { id: 2, sku: 'BEV-COKE-1500', barcode: '896400010102', name: 'Coca Cola 1.5 Liter Bottle', category_id: 1, category_name: 'Beverages & Soft Drinks', uom: 'Pcs', cost_price: 170.00, selling_price: 220.00, tax_rate: 18.00, stock: 200, reorder_level: 30, is_batch_tracked: true, is_manufactured: false },
    { id: 3, sku: 'BEV-RED-BULL', barcode: '896400010103', name: 'Red Bull Energy Drink 250ml Can', category_id: 1, category_name: 'Beverages & Soft Drinks', uom: 'Pcs', cost_price: 340.00, selling_price: 420.00, tax_rate: 18.00, stock: 150, reorder_level: 20, is_batch_tracked: true, is_manufactured: false },
    { id: 4, sku: 'SNK-LAYS-MASALA', barcode: '896400020101', name: 'Lays Wavy Masala Chips 65g', category_id: 2, category_name: 'Snacks & Packaged Food', uom: 'Pcs', cost_price: 70.00, selling_price: 100.00, tax_rate: 18.00, stock: 400, reorder_level: 40, is_batch_tracked: true, is_manufactured: false },
    { id: 5, sku: 'SNK-OREO-12', barcode: '896400020102', name: 'Oreo Chocolate Sandwich Cookies Pack', category_id: 2, category_name: 'Snacks & Packaged Food', uom: 'Pcs', cost_price: 120.00, selling_price: 160.00, tax_rate: 18.00, stock: 250, reorder_level: 25, is_batch_tracked: true, is_manufactured: false },
    { id: 6, sku: 'ELE-ANKER-CABLE', barcode: '896400030101', name: 'Anker Type-C Fast Charging Cable 1.2m', category_id: 3, category_name: 'Electronics & Accessories', uom: 'Pcs', cost_price: 950.00, selling_price: 1550.00, tax_rate: 18.00, stock: 60, reorder_level: 15, is_batch_tracked: false, is_manufactured: false },
    { id: 7, sku: 'ELE-PWR-10000', barcode: '896400030102', name: 'Xiaomi 10000mAh Power Bank Ultra-Slim', category_id: 3, category_name: 'Electronics & Accessories', uom: 'Pcs', cost_price: 3200.00, selling_price: 4800.00, tax_rate: 18.00, stock: 35, reorder_level: 10, is_batch_tracked: false, is_manufactured: false },
    { id: 8, sku: 'PER-DOVE-SOAP', barcode: '896400040101', name: 'Dove Beauty Cream Soap Bar 135g', category_id: 4, category_name: 'Personal Care & Hygiene', uom: 'Pcs', cost_price: 160.00, selling_price: 230.00, tax_rate: 18.00, stock: 180, reorder_level: 35, is_batch_tracked: true, is_manufactured: false },
    { id: 9, sku: 'RAW-GIFT-BOX', barcode: '896400050101', name: 'Luxury Gift Packing Rigid Box', category_id: 5, category_name: 'Raw Materials & Components', uom: 'Pcs', cost_price: 250.00, selling_price: 350.00, tax_rate: 0.00, stock: 100, reorder_level: 30, is_batch_tracked: false, is_manufactured: false },
    { id: 10, sku: 'MFG-CORP-HAMPER', barcode: '896400050102', name: 'Executive Corporate Gift Hamper (Pack)', category_id: 2, category_name: 'Snacks & Packaged Food', uom: 'Box', cost_price: 1200.00, selling_price: 2100.00, tax_rate: 18.00, stock: 25, reorder_level: 10, is_batch_tracked: false, is_manufactured: true }
  ],
  product_batches: [
    { id: 1, product_id: 1, batch_number: 'BATCH-P500-24A', expiry_date: '2026-12-31', cost_price: 75.00, selling_price: 100.00, stock: 470 },
    { id: 2, product_id: 2, batch_number: 'BATCH-C15-24B', expiry_date: '2026-11-30', cost_price: 170.00, selling_price: 220.00, stock: 200 },
    { id: 3, product_id: 3, batch_number: 'BATCH-RB-24C', expiry_date: '2027-04-15', cost_price: 340.00, selling_price: 420.00, stock: 150 },
    { id: 4, product_id: 4, batch_number: 'BATCH-LM-24D', expiry_date: '2026-10-25', cost_price: 70.00, selling_price: 100.00, stock: 400 },
    { id: 5, product_id: 5, batch_number: 'BATCH-OR-24E', expiry_date: '2026-12-15', cost_price: 120.00, selling_price: 160.00, stock: 250 },
    { id: 6, product_id: 8, batch_number: 'BATCH-DS-24F', expiry_date: '2027-08-30', cost_price: 160.00, selling_price: 230.00, stock: 180 }
  ],
  customers: [
    { id: 1, name: 'Walk-in Retail Customer', business_name: 'General Counter Sale', phone: '+92 300 0000000', email: 'walkin@pos.local', address: 'Store Counter', city: 'Karachi', tax_number: 'N/A', credit_limit: 0.00, current_balance: 0.00, geo_latitude: 24.8607, geo_longitude: 67.0011 },
    { id: 2, name: 'Tariq Mehmood', business_name: 'Al-Madina Super Store', phone: '+92 321 4455667', email: 'almadina@store.pk', address: 'Shop 4-A, Block 6, Gulshan-e-Iqbal', city: 'Karachi', tax_number: 'STRN-9847281', credit_limit: 100000.00, current_balance: 34500.00, geo_latitude: 24.9207, geo_longitude: 67.0928 },
    { id: 3, name: 'Kamran Aslam', business_name: 'Green Mart & Pharmacy', phone: '+92 333 7788990', email: 'greenmart@pk.com', address: 'Lane 3, DHA Phase 5', city: 'Karachi', tax_number: 'STRN-5544332', credit_limit: 250000.00, current_balance: 68000.00, geo_latitude: 24.8211, geo_longitude: 67.0654 },
    { id: 4, name: 'Nadeem Sheikh', business_name: 'Crown Departmental Store', phone: '+92 345 8899001', email: 'crown@stores.pk', address: 'Commercial Ave, Clifton', city: 'Karachi', tax_number: 'STRN-1122334', credit_limit: 150000.00, current_balance: 40000.00, geo_latitude: 24.8138, geo_longitude: 67.0300 }
  ],
  vendors: [
    { id: 1, name: 'Beverage Distributors Corp', company_name: 'PepsiCo Regional Supply', phone: '+92 21 35050505', email: 'orders@pepsidist.pk', address: 'Korangi Industrial Area', city: 'Karachi', current_balance: 95000.00 },
    { id: 2, name: 'Snack Foods Wholesale Ltd', company_name: 'Continental Biscuits & Snacks', phone: '+92 21 34949494', email: 'sales@cblsnack.pk', address: 'SITE Industrial Area', city: 'Karachi', current_balance: 65000.00 },
    { id: 3, name: 'Prime Tech Importers', company_name: 'Shenzhen-Pak Tech Link', phone: '+92 21 32424242', email: 'tech@primelink.com', address: 'Saddar Electronics Market', city: 'Karachi', current_balance: 50000.00 }
  ],
  chart_of_accounts: [
    { id: 1010, code: '1010', name: 'Main Cash Drawer / Cash in Hand', type: 'Asset', normal_balance: 'Debit', current_balance: 45000.00 },
    { id: 1020, code: '1020', name: 'Bank Al Habib - Current A/C', type: 'Asset', normal_balance: 'Debit', current_balance: 320000.00 },
    { id: 1030, code: '1030', name: 'Meezan Bank - Business A/C', type: 'Asset', normal_balance: 'Debit', current_balance: 185000.00 },
    { id: 1040, code: '1040', name: 'Digital Wallet / Stripe / POS Merchant', type: 'Asset', normal_balance: 'Debit', current_balance: 28000.00 },
    { id: 1200, code: '1200', name: 'Accounts Receivable (Trade Debtors)', type: 'Asset', normal_balance: 'Debit', current_balance: 142500.00 },
    { id: 1300, code: '1300', name: 'Merchandise Inventory Asset', type: 'Asset', normal_balance: 'Debit', current_balance: 520000.00 },
    { id: 1350, code: '1350', name: 'Raw Materials Inventory', type: 'Asset', normal_balance: 'Debit', current_balance: 110000.00 },
    { id: 2010, code: '2010', name: 'Accounts Payable (Trade Creditors)', type: 'Liability', normal_balance: 'Credit', current_balance: 210000.00 },
    { id: 2020, code: '2020', name: 'Sales Tax / VAT / GST Payable', type: 'Liability', normal_balance: 'Credit', current_balance: 34500.00 },
    { id: 3010, code: '3010', name: 'Owner Capital / Retained Earnings', type: 'Equity', normal_balance: 'Credit', current_balance: 936000.00 },
    { id: 4010, code: '4010', name: 'POS Retail Sales Revenue', type: 'Revenue', normal_balance: 'Credit', current_balance: 385000.00 },
    { id: 4020, code: '4020', name: 'B2B Wholesale Sales Revenue', type: 'Revenue', normal_balance: 'Credit', current_balance: 490000.00 },
    { id: 5010, code: '5010', name: 'Cost of Goods Sold (COGS)', type: 'Expense', normal_balance: 'Debit', current_balance: 510000.00 },
    { id: 5020, code: '5020', name: 'Store Rent & Maintenance', type: 'Expense', normal_balance: 'Debit', current_balance: 75000.00 },
    { id: 5030, code: '5030', name: 'Salaries & Staff Wages', type: 'Expense', normal_balance: 'Debit', current_balance: 95000.00 }
  ],
  journal_entries: [
    {
      id: 1,
      entry_number: 'JV-2026-001',
      date: new Date().toISOString().split('T')[0],
      reference: 'POS-001',
      narration: 'Daily POS Sales Revenue Closing',
      source_document: 'POS_SALE',
      lines: [
        { account_id: 1010, account_name: 'Main Cash Drawer', debit: 24500.00, credit: 0.00 },
        { account_id: 4010, account_name: 'POS Retail Sales Revenue', debit: 0.00, credit: 20762.71 },
        { account_id: 2020, account_name: 'Sales Tax / VAT / GST Payable', debit: 0.00, credit: 3737.29 }
      ]
    }
  ],
  pos_registers: [
    { id: 1, name: 'Counter 01 - Express Lane', warehouse_id: 2, receipt_prefix: 'POS1-', is_active: true },
    { id: 2, name: 'Counter 02 - Grocery POS', warehouse_id: 2, receipt_prefix: 'POS2-', is_active: true },
    { id: 3, name: 'Warehouse Direct Counter', warehouse_id: 1, receipt_prefix: 'WH1-', is_active: true }
  ],
  pos_shifts: [
    { id: 1, register_id: 1, register_name: 'Counter 01 - Express Lane', cashier_id: 3, cashier_name: 'Ali Raza', opening_time: new Date().toISOString(), opening_cash: 5000.00, expected_cash: 23500.00, actual_cash: 0.00, status: 'OPEN' }
  ],
  pos_transactions: [
    {
      id: 1,
      receipt_number: 'POS1-202609-0001',
      shift_id: 1,
      customer_id: 1,
      customer_name: 'Walk-in Retail Customer',
      subtotal: 1000.00,
      discount_amount: 50.00,
      tax_amount: 171.00,
      total_amount: 1121.00,
      paid_amount: 1200.00,
      change_amount: 79.00,
      payment_method: 'CASH',
      items: [
        { product_id: 1, name: 'Pepsi Cola 500ml Bottle', quantity: 5, unit_price: 100.00, total_price: 500.00 },
        { product_id: 4, name: 'Lays Wavy Masala Chips 65g', quantity: 5, unit_price: 100.00, total_price: 500.00 }
      ],
      created_at: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  sales_orders: [
    {
      id: 1,
      order_number: 'SO-2026-0042',
      order_date: new Date().toISOString().split('T')[0],
      customer_id: 2,
      customer_name: 'Al-Madina Super Store',
      salesperson_id: 4,
      salesperson_name: 'Hamza Khan (Field Booker)',
      warehouse_id: 1,
      warehouse_name: 'Central Logistics Warehouse',
      status: 'CONFIRMED',
      subtotal: 15400.00,
      tax_amount: 2772.00,
      discount_amount: 500.00,
      total_amount: 17672.00,
      geo_latitude: 24.9207,
      geo_longitude: 67.0928,
      items: [
        { product_id: 1, name: 'Pepsi Cola 500ml Bottle', quantity: 100, unit_price: 90.00, total_price: 9000.00 },
        { product_id: 4, name: 'Lays Wavy Masala Chips 65g', quantity: 70, unit_price: 90.00, total_price: 6300.00 }
      ]
    }
  ],
  sales_invoices: [
    {
      id: 1,
      invoice_number: 'INV-2026-0108',
      invoice_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      customer_id: 2,
      customer_name: 'Al-Madina Super Store',
      subtotal: 15400.00,
      tax_amount: 2772.00,
      discount_amount: 500.00,
      total_amount: 17672.00,
      paid_amount: 5000.00,
      balance_amount: 12672.00,
      status: 'PARTIALLY_PAID',
      einvoice_qr_code: 'data:image/svg+xml;utf8,<svg ... />',
      items: [
        { product_id: 1, name: 'Pepsi Cola 500ml Bottle', quantity: 100, unit_price: 90.00, total_price: 9000.00 }
      ]
    }
  ],
  bom_recipes: [
    {
      id: 1,
      finished_product_id: 10,
      finished_product_name: 'Executive Corporate Gift Hamper (Pack)',
      recipe_name: 'Corporate Gift Hamper Assembly Recipe',
      output_quantity: 1.00,
      instructions: 'Pack 1 luxury rigid box with 2 chilled Red Bull cans and 2 Oreo packs with silk festive ribbon.',
      items: [
        { raw_product_id: 9, name: 'Luxury Gift Packing Rigid Box', required_quantity: 1, unit_cost: 250.00 },
        { raw_product_id: 3, name: 'Red Bull Energy Drink 250ml Can', required_quantity: 2, unit_cost: 340.00 },
        { raw_product_id: 5, name: 'Oreo Chocolate Sandwich Cookies Pack', required_quantity: 2, unit_cost: 120.00 }
      ]
    }
  ],
  assembly_orders: [
    {
      id: 1,
      order_number: 'ASM-2026-0005',
      bom_recipe_id: 1,
      finished_product_name: 'Executive Corporate Gift Hamper (Pack)',
      warehouse_id: 1,
      planned_quantity: 20,
      produced_quantity: 20,
      status: 'COMPLETED',
      execution_date: new Date().toISOString().split('T')[0],
      total_production_cost: 23400.00
    }
  ],
  companies: [
    {
      id: 1,
      name: 'OneNet Solutions',
      legal_name: 'OneNet Solutions Enterprise Suite (Head Office)',
      tax_id: 'NTN-7492019-2',
      strn: 'STRN-11-22-3344-555',
      phone: '+92 42 30000001',
      email: 'info@onenetsolutions.com',
      address: 'Muslim Town, Lahore, Pakistan',
      city: 'Lahore',
      currency: 'PKR',
      is_active: true
    },
    {
      id: 2,
      name: 'OneNet Retail Mart',
      legal_name: 'OneNet Retail & Superstore Division',
      tax_id: 'NTN-7492019-3',
      strn: 'STRN-22-33-4455-666',
      phone: '+92 21 35050505',
      email: 'retail@onenetsolutions.com',
      address: 'Shop 12-B, Mega Mall, Clifton',
      city: 'Karachi',
      currency: 'PKR',
      is_active: true
    },
    {
      id: 3,
      name: 'OneNet Wholesale',
      legal_name: 'OneNet Wholesale & Regional Distribution',
      tax_id: 'NTN-7492019-4',
      strn: 'STRN-33-44-5566-777',
      phone: '+92 51 2223344',
      email: 'wholesale@onenetsolutions.com',
      address: 'Sector I-9 Industrial Area',
      city: 'Islamabad',
      currency: 'PKR',
      is_active: true
    }
  ],
  user_company_access: [
    { user_id: 1, company_ids: [1, 2, 3] },
    { user_id: 2, company_ids: [1, 2] },
    { user_id: 3, company_ids: [2] },
    { user_id: 4, company_ids: [1] }
  ],
  booker_locations: [
    {
      id: 1,
      user_id: 4,
      booker_name: 'Hamza Khan (Field Booker)',
      phone: '+92 300 9876543',
      latitude: 24.8607,
      longitude: 67.0011,
      accuracy: 6.5,
      battery_level: 88,
      speed: 12.4,
      status: 'CHECKED_IN',
      current_shop_id: 2,
      current_shop_name: 'Al-Madina Superstore',
      address: 'Shop 14, Commercial Market, Main Blvd, Karachi',
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 5,
      booker_name: 'Tariq Mehmood (North Route Booker)',
      phone: '+92 321 4455667',
      latitude: 31.5204,
      longitude: 74.3587,
      accuracy: 8.0,
      battery_level: 74,
      speed: 26.8,
      status: 'IN_TRANSIT',
      current_shop_id: 1,
      current_shop_name: 'Metro Cash & Carry Hub',
      address: 'Near Liberty Roundabout, Gulberg III, Lahore',
      updated_at: new Date(Date.now() - 4 * 60 * 1000).toISOString()
    }
  ],
  permissions_matrix: {
    'Super Admin': {
      pos: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      inventory: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      sales: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      accounting: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      manufacturing: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      mobile_booker: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      payroll: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      backup: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      reports: ['view', 'create', 'edit', 'delete', 'approve', 'export'],
      users: ['view', 'create', 'edit', 'delete', 'approve', 'export']
    },
    'Store Manager': {
      pos: ['view', 'create', 'edit', 'export'],
      inventory: ['view', 'create', 'edit', 'approve', 'export'],
      sales: ['view', 'create', 'edit', 'export'],
      accounting: ['view'],
      manufacturing: ['view', 'create', 'edit'],
      mobile_booker: ['view', 'create'],
      payroll: ['view'],
      backup: ['view'],
      reports: ['view', 'export'],
      users: ['view']
    },
    'Cashier': {
      pos: ['view', 'create'],
      inventory: ['view'],
      sales: ['view', 'create'],
      accounting: [],
      manufacturing: [],
      mobile_booker: [],
      payroll: [],
      backup: [],
      reports: ['view'],
      users: []
    },
    'Field Sales Booker': {
      pos: [],
      inventory: ['view'],
      sales: ['view', 'create'],
      accounting: [],
      manufacturing: [],
      mobile_booker: ['view', 'create', 'edit'],
      payroll: [],
      backup: [],
      reports: [],
      users: []
    }
  },
  employees: [
    {
      id: 1,
      company_id: 1,
      employee_code: 'EMP-101',
      full_name: 'Muhammad Ali Raza',
      department: 'Retail POS Operations',
      designation: 'Senior Cashier & Terminal Lead',
      cnic: '35201-1234567-1',
      phone: '+92 300 1234567',
      email: 'ali.raza@onenet.local',
      base_salary: 48000.00,
      allowances: 3500.00,
      tax_deduction: 1200.00,
      status: 'ACTIVE',
      qr_badge_code: 'QR-EMP-101-ALI'
    },
    {
      id: 2,
      company_id: 1,
      employee_code: 'EMP-102',
      full_name: 'Zainab Fatima',
      department: 'Store Management',
      designation: 'Operations & Store Manager',
      cnic: '35201-7654321-2',
      phone: '+92 321 9876543',
      email: 'zainab@onenet.local',
      base_salary: 85000.00,
      allowances: 8000.00,
      tax_deduction: 4500.00,
      status: 'ACTIVE',
      qr_badge_code: 'QR-EMP-102-ZAINAB'
    },
    {
      id: 3,
      company_id: 1,
      employee_code: 'EMP-103',
      full_name: 'Hamza Khan',
      department: 'Field Sales Logistics',
      designation: 'Mobile Order Booking Officer',
      cnic: '35201-5544332-3',
      phone: '+92 333 4455667',
      email: 'hamza@onenet.local',
      base_salary: 42000.00,
      allowances: 5000.00,
      tax_deduction: 1000.00,
      status: 'ACTIVE',
      qr_badge_code: 'QR-EMP-103-HAMZA'
    },
    {
      id: 4,
      company_id: 1,
      employee_code: 'EMP-104',
      full_name: 'Bilal Tariq',
      department: 'Finance & Accounts',
      designation: 'Senior Accountant',
      cnic: '35201-9988776-4',
      phone: '+92 345 6677889',
      email: 'bilal.acc@onenet.local',
      base_salary: 65000.00,
      allowances: 4000.00,
      tax_deduction: 2500.00,
      status: 'ACTIVE',
      qr_badge_code: 'QR-EMP-104-BILAL'
    }
  ],
  attendance_logs: [
    {
      id: 1,
      employee_id: 1,
      employee_name: 'Muhammad Ali Raza',
      log_date: new Date().toISOString().split('T')[0],
      clock_in: '08:55:00',
      clock_out: '17:05:00',
      method: 'BIOMETRIC',
      status: 'PRESENT'
    },
    {
      id: 2,
      employee_id: 2,
      employee_name: 'Zainab Fatima',
      log_date: new Date().toISOString().split('T')[0],
      clock_in: '09:02:00',
      clock_out: '18:15:00',
      method: 'QR_SCANNER',
      status: 'PRESENT'
    },
    {
      id: 3,
      employee_id: 3,
      employee_name: 'Hamza Khan',
      log_date: new Date().toISOString().split('T')[0],
      clock_in: '09:30:00',
      clock_out: '17:00:00',
      method: 'MOBILE_GPS',
      status: 'LATE'
    },
    {
      id: 4,
      employee_id: 4,
      employee_name: 'Bilal Tariq',
      log_date: new Date().toISOString().split('T')[0],
      clock_in: '08:50:00',
      clock_out: '17:00:00',
      method: 'BIOMETRIC',
      status: 'PRESENT'
    }
  ],
  payroll_runs: []
};

// Initialize PostgreSQL Connection Pool
export async function initDb() {
  const config = {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432'),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'bierppos',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
  };

  try {
    pool = new Pool(config);
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    isPgAvailable = true;
    console.log(`[DB] Successfully connected to PostgreSQL at ${config.host}:${config.port}/${config.database}`);
  } catch (err) {
    isPgAvailable = false;
    console.log(`[DB] Notice: PostgreSQL instance not detected locally (${err.message}).`);
    console.log(`[DB] Seamlessly active in High-Fidelity Enterprise Engine Mode with full in-memory seed data.`);
    console.log(`[DB] When deploying to aaPanel on Ubuntu, it will connect natively to your server PostgreSQL!`);
  }
}

export async function query(text, params = []) {
  if (isPgAvailable && pool) {
    return pool.query(text, params);
  }
  // If in fallback mode, mockStore is directly accessed by service layers
  return { rows: [], rowCount: 0 };
}

export function getMockStore() {
  return mockStore;
}

export function isPostgresActive() {
  return isPgAvailable;
}

export async function withTransaction(callback) {
  if (isPgAvailable && pool) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } else {
    // In mock mode, execute callback with mock context
    return await callback({ query });
  }
}
