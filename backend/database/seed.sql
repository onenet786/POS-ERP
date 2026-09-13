-- ============================================================================
-- ApexERP & POS Enterprise - Seed Data & Initial Configuration
-- ============================================================================

-- 1. ROLES
INSERT INTO roles (id, name, description) VALUES
(1, 'Super Admin', 'Full system access and configurations'),
(2, 'Store Manager', 'Store management, inventory, purchases, and reporting'),
(3, 'Cashier', 'POS billing, returns, and daily shift management'),
(4, 'Field Sales Booker', 'Mobile order booking, customer visits, geo-tagging')
ON CONFLICT (id) DO NOTHING;

-- 2. USERS (Default password for admin is: Admin@123456 -> bcrypt hash)
-- Hash generated for: Admin@123456
INSERT INTO users (id, username, email, password_hash, full_name, role_id, is_active) VALUES
(1, 'admin', 'admin@apexerppos.com', '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', 'System Administrator', 1, TRUE),
(2, 'manager', 'manager@apexerppos.com', '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', 'Zainab Fatima (Manager)', 2, TRUE),
(3, 'cashier1', 'cashier1@apexerppos.com', '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', 'Ali Raza (Cashier)', 3, TRUE),
(4, 'booker1', 'booker1@apexerppos.com', '$2a$10$i0eP5yqY07ZtBf6l7k0DbuQzW9KzC1uS/x4b8XN3c0V9kGv7D4U8a', 'Hamza Khan (Field Booker)', 4, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. STANDARD GAAP/IFRS CHART OF ACCOUNTS
INSERT INTO chart_of_accounts (id, code, name, type, normal_balance, is_reconciliation, current_balance) VALUES
-- ASSETS (1000 - 1999)
(1010, '1010', 'Main Cash Drawer / Cash in Hand', 'Asset', 'Debit', TRUE, 45000.00),
(1020, '1020', 'Bank Al Habib - Current A/C', 'Asset', 'Debit', TRUE, 320000.00),
(1030, '1030', 'Meezan Bank - Business A/C', 'Asset', 'Debit', TRUE, 185000.00),
(1040, '1040', 'Digital Wallet / Stripe / POS Merchant', 'Asset', 'Debit', TRUE, 28000.00),
(1200, '1200', 'Accounts Receivable (Trade Debtors)', 'Asset', 'Debit', FALSE, 142500.00),
(1300, '1300', 'Merchandise Inventory Asset', 'Asset', 'Debit', FALSE, 520000.00),
(1350, '1350', 'Raw Materials Inventory', 'Asset', 'Debit', FALSE, 110000.00),
(1500, '1500', 'Store & POS Equipment', 'Asset', 'Debit', FALSE, 85000.00),

-- LIABILITIES (2000 - 2999)
(2010, '2010', 'Accounts Payable (Trade Creditors)', 'Liability', 'Credit', FALSE, 210000.00),
(2020, '2020', 'Sales Tax / VAT / GST Payable', 'Liability', 'Credit', FALSE, 34500.00),
(2030, '2030', 'Accrued Salaries & Utilities', 'Liability', 'Credit', FALSE, 65000.00),

-- EQUITY (3000 - 3999)
(3010, '3010', 'Owner Capital / Retained Earnings', 'Equity', 'Credit', FALSE, 936000.00),

-- REVENUE (4000 - 4999)
(4010, '4010', 'POS Retail Sales Revenue', 'Revenue', 'Credit', FALSE, 385000.00),
(4020, '4020', 'B2B Wholesale Sales Revenue', 'Revenue', 'Credit', FALSE, 490000.00),
(4050, '4050', 'Sales Discounts Allowed', 'Revenue', 'Debit', FALSE, 12000.00),

-- EXPENSES (5000 - 5999)
(5010, '5010', 'Cost of Goods Sold (COGS)', 'Expense', 'Debit', FALSE, 510000.00),
(5020, '5020', 'Store Rent & Maintenance', 'Expense', 'Debit', FALSE, 75000.00),
(5030, '5030', 'Salaries & Staff Wages', 'Expense', 'Debit', FALSE, 95000.00),
(5040, '5040', 'Electricity & Utilities', 'Expense', 'Debit', FALSE, 22000.00),
(5050, '5050', 'Freight & Delivery Expenses', 'Expense', 'Debit', FALSE, 14000.00)
ON CONFLICT (id) DO NOTHING;

-- 4. WAREHOUSES & LOCATIONS
INSERT INTO warehouses (id, code, name, address, phone, is_default) VALUES
(1, 'WH-MAIN', 'Central Logistics Warehouse', 'Plot 45, Industrial Area, Sector 7', '+92 300 1112233', TRUE),
(2, 'WH-OUTLET1', 'Retail Branch 1 - Mega Mall', 'Shop 12-B, First Floor, Mega Mall', '+92 300 2223344', FALSE),
(3, 'WH-OUTLET2', 'Retail Branch 2 - Commercial Market', 'Plaza 8, Main Boulevard', '+92 300 3334455', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 5. PRODUCT CATEGORIES
INSERT INTO categories (id, name, code, description) VALUES
(1, 'Beverages & Soft Drinks', 'CAT-BEV', 'Cold beverages, juices, soft drinks and water'),
(2, 'Snacks & Packaged Food', 'CAT-SNK', 'Biscuits, chips, chocolates, and cookies'),
(3, 'Electronics & Accessories', 'CAT-ELE', 'Cables, chargers, power banks, and smart devices'),
(4, 'Personal Care & Hygiene', 'CAT-PER', 'Soaps, shampoos, hygiene and sanitizers'),
(5, 'Raw Materials & Components', 'CAT-RAW', 'Assembling and manufacturing components')
ON CONFLICT (id) DO NOTHING;

-- 6. PRODUCTS & INVENTORY ITEMS
INSERT INTO products (id, sku, barcode, name, category_id, uom, cost_price, selling_price, tax_rate, reorder_level, is_batch_tracked, is_manufactured) VALUES
(1, 'BEV-PEPSI-500', '896400010101', 'Pepsi Cola 500ml Bottle', 1, 'Pcs', 75.00, 100.00, 18.00, 50, TRUE, FALSE),
(2, 'BEV-COKE-1500', '896400010102', 'Coca Cola 1.5 Liter Bottle', 1, 'Pcs', 170.00, 220.00, 18.00, 30, TRUE, FALSE),
(3, 'BEV-RED-BULL',   '896400010103', 'Red Bull Energy Drink 250ml Can', 1, 'Pcs', 340.00, 420.00, 18.00, 20, TRUE, FALSE),
(4, 'SNK-LAYS-MASALA','896400020101', 'Lays Wavy Masala Chips 65g', 2, 'Pcs', 70.00, 100.00, 18.00, 40, TRUE, FALSE),
(5, 'SNK-OREO-12',    '896400020102', 'Oreo Chocolate Sandwich Cookies Pack', 2, 'Pcs', 120.00, 160.00, 18.00, 25, TRUE, FALSE),
(6, 'ELE-ANKER-CABLE','896400030101', 'Anker Type-C Fast Charging Cable 1.2m', 3, 'Pcs', 950.00, 1550.00, 18.00, 15, FALSE, FALSE),
(7, 'ELE-PWR-10000',  '896400030102', 'Xiaomi 10000mAh Power Bank Ultra-Slim', 3, 'Pcs', 3200.00, 4800.00, 18.00, 10, FALSE, FALSE),
(8, 'PER-DOVE-SOAP',  '896400040101', 'Dove Beauty Cream Soap Bar 135g', 4, 'Pcs', 160.00, 230.00, 18.00, 35, TRUE, FALSE),
(9, 'RAW-GIFT-BOX',   '896400050101', 'Luxury Gift Packing Rigid Box', 5, 'Pcs', 250.00, 350.00, 0.00, 30, FALSE, FALSE),
(10,'MFG-CORP-HAMPER','896400050102', 'Executive Corporate Gift Hamper (Pack)', 2, 'Box', 1200.00, 2100.00, 18.00, 10, FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 7. PRODUCT BATCHES & EXPIRY TRACKING
INSERT INTO product_batches (id, product_id, batch_number, manufacturing_date, expiry_date, cost_price, selling_price) VALUES
(1, 1, 'BATCH-P500-24A', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '180 days', 75.00, 100.00),
(2, 2, 'BATCH-C15-24B',  CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE + INTERVAL '150 days', 170.00, 220.00),
(3, 3, 'BATCH-RB-24C',   CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '300 days', 340.00, 420.00),
(4, 4, 'BATCH-LM-24D',   CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '90 days', 70.00, 100.00),
(5, 5, 'BATCH-OR-24E',   CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '120 days', 120.00, 160.00),
(6, 8, 'BATCH-DS-24F',   CURRENT_DATE - INTERVAL '45 days', CURRENT_DATE + INTERVAL '400 days', 160.00, 230.00)
ON CONFLICT (id) DO NOTHING;

-- 8. INITIAL STOCK LEDGER
INSERT INTO stock_ledger (product_id, warehouse_id, batch_id, quantity, unit_cost, total_cost, transaction_type) VALUES
(1, 1, 1, 350.00, 75.00, 26250.00, 'PURCHASE'),
(1, 2, 1, 120.00, 75.00, 9000.00, 'TRANSFER_IN'),
(2, 1, 2, 200.00, 170.00, 34000.00, 'PURCHASE'),
(3, 1, 3, 150.00, 340.00, 51000.00, 'PURCHASE'),
(4, 1, 4, 400.00, 70.00, 28000.00, 'PURCHASE'),
(5, 1, 5, 250.00, 120.00, 30000.00, 'PURCHASE'),
(6, 1, NULL, 60.00, 950.00, 57000.00, 'PURCHASE'),
(7, 1, NULL, 35.00, 3200.00, 112000.00, 'PURCHASE'),
(8, 1, 6, 180.00, 160.00, 28800.00, 'PURCHASE'),
(9, 1, NULL, 100.00, 250.00, 25000.00, 'PURCHASE'),
(10, 1, NULL, 25.00, 1200.00, 30000.00, 'ASSEMBLY')
ON CONFLICT DO NOTHING;

-- 9. CUSTOMERS & GPS COORDINATES (FOR FIELD BOOKER APP)
INSERT INTO customers (id, name, business_name, phone, email, address, city, tax_number, credit_limit, current_balance, geo_latitude, geo_longitude) VALUES
(1, 'Walk-in Retail Customer', 'General Counter Sale', '+92 300 0000000', 'walkin@pos.local', 'Store Counter', 'Karachi', 'N/A', 0.00, 0.00, 24.8607, 67.0011),
(2, 'Tariq Mehmood', 'Al-Madina Super Store', '+92 321 4455667', 'almadina@store.pk', 'Shop 4-A, Block 6, Gulshan-e-Iqbal', 'Karachi', 'STRN-9847281', 100000.00, 34500.00, 24.9207, 67.0928),
(3, 'Kamran Aslam', 'Green Mart & Pharmacy', '+92 333 7788990', 'greenmart@pk.com', 'Lane 3, DHA Phase 5', 'Karachi', 'STRN-5544332', 250000.00, 68000.00, 24.8211, 67.0654),
(4, 'Nadeem Sheikh', 'Crown Departmental Store', '+92 345 8899001', 'crown@stores.pk', 'Commercial Avenue, Clifton', 'Karachi', 'STRN-1122334', 150000.00, 40000.00, 24.8138, 67.0300)
ON CONFLICT (id) DO NOTHING;

-- 10. VENDORS & SUPPLIERS
INSERT INTO vendors (id, name, company_name, phone, email, address, city, current_balance) VALUES
(1, 'Beverage Distributors Corp', 'PepsiCo Regional Supply', '+92 21 35050505', 'orders@pepsidist.pk', 'Korangi Industrial Area', 'Karachi', 95000.00),
(2, 'Snack Foods Wholesale Ltd', 'Continental Biscuits & Snacks', '+92 21 34949494', 'sales@cblsnack.pk', 'SITE Industrial Area', 'Karachi', 65000.00),
(3, 'Prime Tech Importers', 'Shenzhen-Pak Tech Link', '+92 21 32424242', 'tech@primelink.com', 'Saddar Electronics Market', 'Karachi', 50000.00)
ON CONFLICT (id) DO NOTHING;

-- 11. POS REGISTERS & ACTIVE SHIFT
INSERT INTO pos_registers (id, name, warehouse_id, receipt_prefix, is_active) VALUES
(1, 'Counter 01 - Express Lane', 2, 'POS1-', TRUE),
(2, 'Counter 02 - Grocery POS', 2, 'POS2-', TRUE),
(3, 'Warehouse Direct Counter', 1, 'WH1-', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO pos_shifts (id, register_id, cashier_id, opening_cash, expected_cash, actual_cash, status) VALUES
(1, 1, 3, 5000.00, 18500.00, 0.00, 'OPEN')
ON CONFLICT (id) DO NOTHING;

-- 12. BILL OF MATERIALS (BOM) FOR MANUFACTURING / ASSEMBLY
-- "Executive Corporate Gift Hamper (Pack)" is assembled from:
-- 1x Luxury Gift Packing Rigid Box + 2x Red Bull + 2x Oreo Cookies
INSERT INTO bom_recipes (id, finished_product_id, recipe_name, output_quantity, instructions) VALUES
(1, 10, 'Corporate Gift Hamper Assembly Recipe', 1.00, 'Assemble 1 rigid box, inspect lining, insert 2 chilled Red Bull cans and 2 Oreo cookie packs with festive ribbon.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO bom_items (bom_recipe_id, raw_product_id, required_quantity, unit_cost) VALUES
(1, 9, 1.00, 250.00),  -- 1x Box
(1, 3, 2.00, 340.00),  -- 2x Red Bull
(1, 5, 2.00, 120.00);  -- 2x Oreo

-- 13. COMPANIES (MULTI-COMPANY EDITION)
INSERT INTO companies (id, name, legal_name, tax_id, strn, phone, email, address, city, currency, is_active) VALUES
(1, 'OneNet Solutions', 'OneNet Solutions Enterprise Suite (Head Office)', 'NTN-7492019-2', 'STRN-11-22-3344-555', '+92 42 30000001', 'info@onenetsolutions.com', 'Muslim Town, Lahore, Pakistan', 'Lahore', 'PKR', TRUE),
(2, 'OneNet Retail Mart', 'OneNet Retail & Superstore Division', 'NTN-7492019-3', 'STRN-22-33-4455-666', '+92 21 35050505', 'retail@onenetsolutions.com', 'Shop 12-B, Mega Mall, Clifton', 'Karachi', 'PKR', TRUE),
(3, 'OneNet Wholesale', 'OneNet Wholesale & Regional Distribution', 'NTN-7492019-4', 'STRN-33-44-5566-777', '+92 51 2223344', 'wholesale@onenetsolutions.com', 'Sector I-9 Industrial Area', 'Islamabad', 'PKR', TRUE)
ON CONFLICT (id) DO NOTHING;

-- User Company Grants
INSERT INTO user_company_access (user_id, company_id, is_default) VALUES
(1, 1, TRUE),
(1, 2, FALSE),
(1, 3, FALSE),
(2, 1, TRUE),
(2, 2, FALSE),
(3, 2, TRUE),
(4, 1, TRUE)
ON CONFLICT (user_id, company_id) DO NOTHING;

-- 14. HR & PAYROLL EMPLOYEES
INSERT INTO employees (id, company_id, employee_code, full_name, department, designation, cnic, phone, email, base_salary, allowances, tax_deduction, status, qr_badge_code) VALUES
(1, 1, 'EMP-101', 'Muhammad Ali Raza', 'Retail POS Operations', 'Senior Cashier & Terminal Lead', '35201-1234567-1', '+92 300 1234567', 'ali.raza@onenet.local', 48000.00, 3500.00, 1200.00, 'ACTIVE', 'QR-EMP-101-ALI'),
(2, 1, 'EMP-102', 'Zainab Fatima', 'Store Management', 'Operations & Store Manager', '35201-7654321-2', '+92 321 9876543', 'zainab@onenet.local', 85000.00, 8000.00, 4500.00, 'ACTIVE', 'QR-EMP-102-ZAINAB'),
(3, 1, 'EMP-103', 'Hamza Khan', 'Field Sales Logistics', 'Mobile Order Booking Officer', '35201-5544332-3', '+92 333 4455667', 'hamza@onenet.local', 42000.00, 5000.00, 1000.00, 'ACTIVE', 'QR-EMP-103-HAMZA'),
(4, 1, 'EMP-104', 'Bilal Tariq', 'Finance & Accounts', 'Senior Accountant', '35201-9988776-4', '+92 345 6677889', 'bilal.acc@onenet.local', 65000.00, 4000.00, 2500.00, 'ACTIVE', 'QR-EMP-104-BILAL')
ON CONFLICT (id) DO NOTHING;

-- 15. BOOKER LIVE LOCATIONS
INSERT INTO booker_locations (id, user_id, booker_name, phone, latitude, longitude, accuracy, battery_level, speed, status, current_shop_id, current_shop_name, address, updated_at) VALUES
(1, 4, 'Hamza Khan (Field Booker)', '+92 300 9876543', 24.8607, 67.0011, 10.5, 88, 12.4, 'CHECKED_IN', 1, 'Metro Cash & Carry Hub', 'Plot 54, Commercial Avenue, Phase 2, Karachi', CURRENT_TIMESTAMP),
(2, 3, 'Tariq Mehmood (North Route Booker)', '+92 321 4455667', 31.5204, 74.3587, 8.2, 74, 26.8, 'IN_TRANSIT', 2, 'Al-Madina Superstore', 'Near Liberty Roundabout, Gulberg III, Lahore', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Restart sequences to avoid primary key conflicts on future inserts
SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 1)) FROM users;
SELECT setval(pg_get_serial_sequence('roles', 'id'), coalesce(max(id), 1)) FROM roles;
SELECT setval(pg_get_serial_sequence('chart_of_accounts', 'id'), coalesce(max(id), 1)) FROM chart_of_accounts;
SELECT setval(pg_get_serial_sequence('warehouses', 'id'), coalesce(max(id), 1)) FROM warehouses;
SELECT setval(pg_get_serial_sequence('categories', 'id'), coalesce(max(id), 1)) FROM categories;
SELECT setval(pg_get_serial_sequence('products', 'id'), coalesce(max(id), 1)) FROM products;
SELECT setval(pg_get_serial_sequence('product_batches', 'id'), coalesce(max(id), 1)) FROM product_batches;
SELECT setval(pg_get_serial_sequence('customers', 'id'), coalesce(max(id), 1)) FROM customers;
SELECT setval(pg_get_serial_sequence('vendors', 'id'), coalesce(max(id), 1)) FROM vendors;
SELECT setval(pg_get_serial_sequence('pos_registers', 'id'), coalesce(max(id), 1)) FROM pos_registers;
SELECT setval(pg_get_serial_sequence('pos_shifts', 'id'), coalesce(max(id), 1)) FROM pos_shifts;
SELECT setval(pg_get_serial_sequence('bom_recipes', 'id'), coalesce(max(id), 1)) FROM bom_recipes;
SELECT setval(pg_get_serial_sequence('companies', 'id'), coalesce(max(id), 1)) FROM companies;
SELECT setval(pg_get_serial_sequence('employees', 'id'), coalesce(max(id), 1)) FROM employees;
SELECT setval(pg_get_serial_sequence('booker_locations', 'id'), coalesce(max(id), 1)) FROM booker_locations;


