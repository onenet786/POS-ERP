-- ============================================================================
-- ApexERP & POS Enterprise - Comprehensive PostgreSQL Database Schema
-- Production Ready for Ubuntu / aaPanel PostgreSQL Instance
-- ============================================================================

-- Enable UUID Extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS, ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    module VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    description TEXT,
    CONSTRAINT uq_perm UNIQUE(module, action)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    role_id INT REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CHART OF ACCOUNTS & DOUBLE-ENTRY GENERAL LEDGER
CREATE TYPE account_type AS ENUM ('Asset', 'Liability', 'Equity', 'Revenue', 'Expense');
CREATE TYPE normal_balance AS ENUM ('Debit', 'Credit');

CREATE TABLE IF NOT EXISTS chart_of_accounts (
    id SERIAL PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    type account_type NOT NULL,
    normal_balance normal_balance NOT NULL,
    parent_id INT REFERENCES chart_of_accounts(id),
    is_reconciliation BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    current_balance NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journal_entries (
    id SERIAL PRIMARY KEY,
    entry_number VARCHAR(50) NOT NULL UNIQUE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    reference VARCHAR(100),
    narration TEXT,
    source_document VARCHAR(50), -- e.g., 'POS_SALE', 'SALES_INVOICE', 'PURCHASE_BILL', 'ASSEMBLY'
    source_id INT,
    is_posted BOOLEAN DEFAULT TRUE,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journal_lines (
    id SERIAL PRIMARY KEY,
    journal_entry_id INT NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    account_id INT NOT NULL REFERENCES chart_of_accounts(id),
    debit NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    credit NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    memo TEXT,
    CONSTRAINT chk_debit_credit CHECK (
        (debit > 0 AND credit = 0) OR
        (credit > 0 AND debit = 0) OR
        (debit = 0 AND credit = 0)
    )
);

-- 3. WAREHOUSES, CATEGORIES & PRODUCTS
CREATE TABLE IF NOT EXISTS warehouses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(30),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(30) UNIQUE,
    parent_id INT REFERENCES categories(id),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(60) NOT NULL UNIQUE,
    barcode VARCHAR(60) UNIQUE,
    name VARCHAR(200) NOT NULL,
    category_id INT REFERENCES categories(id),
    uom VARCHAR(20) DEFAULT 'Pcs', -- Unit of Measure
    cost_price NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    selling_price NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    tax_rate NUMERIC(5, 2) DEFAULT 0.00, -- e.g. 18.00%
    reorder_level INT DEFAULT 10,
    is_batch_tracked BOOLEAN DEFAULT FALSE,
    is_manufactured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Batch and Expiry tracking
CREATE TABLE IF NOT EXISTS product_batches (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    batch_number VARCHAR(60) NOT NULL,
    manufacturing_date DATE,
    expiry_date DATE NOT NULL,
    cost_price NUMERIC(15, 2),
    selling_price NUMERIC(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_product_batch UNIQUE (product_id, batch_number)
);

-- Stock Ledger (Perpetual Inventory Tracking)
CREATE TABLE IF NOT EXISTS stock_ledger (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    batch_id INT REFERENCES product_batches(id),
    quantity NUMERIC(12, 2) NOT NULL, -- Positive for in, Negative for out
    unit_cost NUMERIC(15, 2) NOT NULL,
    total_cost NUMERIC(15, 2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL, -- 'PURCHASE', 'SALE', 'POS', 'TRANSFER_IN', 'TRANSFER_OUT', 'ADJUSTMENT', 'ASSEMBLY'
    reference_type VARCHAR(50),
    reference_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CUSTOMERS, VENDORS & CONTACTS
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    business_name VARCHAR(150),
    phone VARCHAR(30),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(60),
    tax_number VARCHAR(50), -- NTN / VAT / GST / ZATCA
    credit_limit NUMERIC(15, 2) DEFAULT 0.00,
    opening_balance NUMERIC(15, 2) DEFAULT 0.00,
    current_balance NUMERIC(15, 2) DEFAULT 0.00,
    geo_latitude NUMERIC(10, 7),
    geo_longitude NUMERIC(10, 7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    phone VARCHAR(30),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(60),
    tax_number VARCHAR(50),
    opening_balance NUMERIC(15, 2) DEFAULT 0.00,
    current_balance NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. POINT OF SALE (POS) REGISTERS & SHIFTS
CREATE TABLE IF NOT EXISTS pos_registers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    warehouse_id INT REFERENCES warehouses(id),
    receipt_prefix VARCHAR(10) DEFAULT 'POS-',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pos_shifts (
    id SERIAL PRIMARY KEY,
    register_id INT NOT NULL REFERENCES pos_registers(id),
    cashier_id INT NOT NULL REFERENCES users(id),
    opening_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closing_time TIMESTAMP WITH TIME ZONE,
    opening_cash NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    expected_cash NUMERIC(15, 2) DEFAULT 0.00,
    actual_cash NUMERIC(15, 2) DEFAULT 0.00,
    cash_difference NUMERIC(15, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'OPEN', -- 'OPEN', 'CLOSED'
    notes TEXT
);

CREATE TABLE IF NOT EXISTS pos_transactions (
    id SERIAL PRIMARY KEY,
    shift_id INT NOT NULL REFERENCES pos_shifts(id),
    receipt_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT REFERENCES customers(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    cashier_id INT NOT NULL REFERENCES users(id),
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(15, 2) DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_amount NUMERIC(15, 2) NOT NULL,
    paid_amount NUMERIC(15, 2) NOT NULL,
    change_amount NUMERIC(15, 2) DEFAULT 0.00,
    payment_status VARCHAR(20) DEFAULT 'PAID', -- 'PAID', 'PARTIAL', 'CREDIT'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pos_transaction_items (
    id SERIAL PRIMARY KEY,
    pos_transaction_id INT NOT NULL REFERENCES pos_transactions(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    batch_id INT REFERENCES product_batches(id),
    quantity NUMERIC(12, 2) NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    discount NUMERIC(15, 2) DEFAULT 0.00,
    tax_rate NUMERIC(5, 2) DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_price NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS pos_payments (
    id SERIAL PRIMARY KEY,
    pos_transaction_id INT NOT NULL REFERENCES pos_transactions(id) ON DELETE CASCADE,
    payment_method VARCHAR(30) NOT NULL, -- 'CASH', 'CARD', 'ONLINE', 'STORE_CREDIT'
    amount NUMERIC(15, 2) NOT NULL,
    reference_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. SALES MANAGEMENT & E-INVOICING
CREATE TABLE IF NOT EXISTS sales_orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    customer_id INT NOT NULL REFERENCES customers(id),
    salesperson_id INT REFERENCES users(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    status VARCHAR(30) DEFAULT 'CONFIRMED', -- 'DRAFT', 'CONFIRMED', 'DELIVERED', 'CANCELLED'
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    discount_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    geo_latitude NUMERIC(10, 7),
    geo_longitude NUMERIC(10, 7),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales_order_items (
    id SERIAL PRIMARY KEY,
    sales_order_id INT NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    batch_id INT REFERENCES product_batches(id),
    quantity NUMERIC(12, 2) NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    tax_rate NUMERIC(5, 2) DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_price NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery_challans (
    id SERIAL PRIMARY KEY,
    challan_number VARCHAR(50) NOT NULL UNIQUE,
    sales_order_id INT REFERENCES sales_orders(id),
    customer_id INT NOT NULL REFERENCES customers(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    delivery_date DATE NOT NULL DEFAULT CURRENT_DATE,
    vehicle_number VARCHAR(50),
    driver_name VARCHAR(100),
    status VARCHAR(30) DEFAULT 'DISPATCHED', -- 'DISPATCHED', 'DELIVERED', 'RETURNED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales_invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    customer_id INT NOT NULL REFERENCES customers(id),
    sales_order_id INT REFERENCES sales_orders(id),
    delivery_challan_id INT REFERENCES delivery_challans(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    subtotal NUMERIC(15, 2) NOT NULL,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    discount_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_amount NUMERIC(15, 2) NOT NULL,
    paid_amount NUMERIC(15, 2) DEFAULT 0.00,
    balance_amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'UNPAID', -- 'UNPAID', 'PARTIALLY_PAID', 'PAID', 'OVERDUE'
    einvoice_qr_code TEXT, -- Base64 TLV or FBR/ZATCA compliant payload
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales_invoice_items (
    id SERIAL PRIMARY KEY,
    sales_invoice_id INT NOT NULL REFERENCES sales_invoices(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    batch_id INT REFERENCES product_batches(id),
    quantity NUMERIC(12, 2) NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    tax_rate NUMERIC(5, 2) DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_price NUMERIC(15, 2) NOT NULL
);

-- 7. PURCHASES & VENDOR PAYABLES
CREATE TABLE IF NOT EXISTS purchase_orders (
    id SERIAL PRIMARY KEY,
    po_number VARCHAR(50) NOT NULL UNIQUE,
    po_date DATE NOT NULL DEFAULT CURRENT_DATE,
    vendor_id INT NOT NULL REFERENCES vendors(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    status VARCHAR(30) DEFAULT 'ORDERED', -- 'DRAFT', 'ORDERED', 'RECEIVED', 'CANCELLED'
    total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchase_order_items (
    id SERIAL PRIMARY KEY,
    purchase_order_id INT NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    quantity NUMERIC(12, 2) NOT NULL,
    unit_cost NUMERIC(15, 2) NOT NULL,
    total_cost NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS goods_receipts (
    id SERIAL PRIMARY KEY,
    grn_number VARCHAR(50) NOT NULL UNIQUE,
    purchase_order_id INT REFERENCES purchase_orders(id),
    vendor_id INT NOT NULL REFERENCES vendors(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    receipt_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchase_bills (
    id SERIAL PRIMARY KEY,
    bill_number VARCHAR(50) NOT NULL UNIQUE,
    vendor_id INT NOT NULL REFERENCES vendors(id),
    goods_receipt_id INT REFERENCES goods_receipts(id),
    bill_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    subtotal NUMERIC(15, 2) NOT NULL,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_amount NUMERIC(15, 2) NOT NULL,
    paid_amount NUMERIC(15, 2) DEFAULT 0.00,
    balance_amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'UNPAID',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchase_bill_items (
    id SERIAL PRIMARY KEY,
    purchase_bill_id INT NOT NULL REFERENCES purchase_bills(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    batch_id INT REFERENCES product_batches(id),
    quantity NUMERIC(12, 2) NOT NULL,
    unit_cost NUMERIC(15, 2) NOT NULL,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    total_cost NUMERIC(15, 2) NOT NULL
);

-- 8. MANUFACTURING & BILL OF MATERIALS (BOM)
CREATE TABLE IF NOT EXISTS bom_recipes (
    id SERIAL PRIMARY KEY,
    finished_product_id INT NOT NULL REFERENCES products(id),
    recipe_name VARCHAR(100) NOT NULL,
    output_quantity NUMERIC(12, 2) NOT NULL DEFAULT 1.00,
    instructions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bom_items (
    id SERIAL PRIMARY KEY,
    bom_recipe_id INT NOT NULL REFERENCES bom_recipes(id) ON DELETE CASCADE,
    raw_product_id INT NOT NULL REFERENCES products(id),
    required_quantity NUMERIC(12, 2) NOT NULL,
    unit_cost NUMERIC(15, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS assembly_orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    bom_recipe_id INT NOT NULL REFERENCES bom_recipes(id),
    warehouse_id INT NOT NULL REFERENCES warehouses(id),
    planned_quantity NUMERIC(12, 2) NOT NULL,
    produced_quantity NUMERIC(12, 2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'PLANNED', -- 'PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
    execution_date DATE DEFAULT CURRENT_DATE,
    total_production_cost NUMERIC(15, 2) DEFAULT 0.00,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    module VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    record_id INT,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_stock_ledger_prod_wh ON stock_ledger(product_id, warehouse_id);
CREATE INDEX IF NOT EXISTS idx_journal_lines_account ON journal_lines(account_id);
CREATE INDEX IF NOT EXISTS idx_pos_transactions_receipt ON pos_transactions(receipt_number);
CREATE INDEX IF NOT EXISTS idx_pos_transactions_created ON pos_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_sales_invoices_customer ON sales_invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_purchase_bills_vendor ON purchase_bills(vendor_id);
