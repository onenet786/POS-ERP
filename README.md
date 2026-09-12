# ApexERP & POS Enterprise

> **Next-Generation Cloud Accounting, Multi-Warehouse Inventory, High-Speed POS & Field Sales Mobile App**  
> Architected for **Node.js**, **PostgreSQL**, and seamless deployment on **Ubuntu Dedicated Servers with aaPanel**.

---

## 🌟 Executive Comparison: Splendid Accounts vs ApexERP & POS

| Feature Domain | Splendid Accounts (Reference Video) | ApexERP & POS Enterprise |
| :--- | :--- | :--- |
| **Technology Stack** | Dated architecture, separate micro-tools, slower polling | **Node.js LTS, PostgreSQL 14+, WebSockets, Vite, Modern CSS Design Tokens** |
| **Point of Sale (POS)** | Basic cashier interface with simple keyboard billing | **Dual-mode Touch + Barcode Scanner, Split Tender (Cash/Card/Credit), 58mm/80mm Thermal Receipt Generator, Shift Reconciliation (X/Z Reports), Hotkeys (`F1-F12`)** |
| **Mobile Experience** | 3 fragmented apps (Splendid Invoices, Order Booker, Tracking) | **Unified Progressive Web App (PWA) + Native Wrapper Support, GPS Geolocation Shop Tagging, Built-in Smartphone Camera Barcode Scanner, Offline Order Queueing** |
| **Double-Entry Accounting**| Requires manual journal entries for various processes | **100% Automated Real-Time Ledger Posting: POS sales, invoices, and manufacturing orders auto-generate balanced debits and credits with zero manual effort** |
| **Inventory & Batches** | Basic batch list | **Multi-Warehouse Matrix, FIFO/FEFO Shelf-Life Radar, Automated Low-Stock Reorder Signals, Printable Barcode Sheet Designer** |
| **Manufacturing** | Standard light assembly | **BOM Recipe Engine with dynamic component consumption, scrap recording, finished product valuation & automated accounting entries** |
| **E-Invoicing Compliance**| Regional support | **Built-in FBR (Pakistan) & ZATCA (Saudi Arabia) Phase 2 Compliant QR Code Generator** |
| **Hosting & aaPanel** | Proprietary closed cloud | **100% Self-Hosted on Dedicated Ubuntu Server via aaPanel (Nginx Reverse Proxy + PM2 Cluster + PostgreSQL)** |

---

## 🏗️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                            APEX ERP & POS ECOSYSTEM                               |
+-----------------------------------------------------------------------------------+
|  [ Web Admin ERP Portal ]    [ High-Speed Web POS ]     [ Field Order Booker PWA ]|
|  - Financial Analytics       - Barcode Scanner Listener - Geo-tagged Shop Visits  |
|  - Inventory & Warehouses    - Split Tender Payments    - Offline Catalog & Queue |
|  - Manufacturing & BOM       - 58/80mm Thermal Receipt  - Camera Barcode Scanner  |
+-----------------------------------------------------------------------------------+
                                        │ (REST APIs + WebSocket Stream)
                                        ▼
+-----------------------------------------------------------------------------------+
|                       NODE.JS ENTERPRISE BACKEND SERVICE                          |
|  - Express & Clean Controller/Service Architecture                                |
|  - JWT Authentication & Role-Based Access Control (Super Admin, Cashier, Booker)  |
|  - Real-Time WebSocket Broadcast Engine (Live POS sales, low-stock radar)         |
|  - Double-Entry Automated Posting Service (Dr == Cr balance assertion)            |
+-----------------------------------------------------------------------------------+
                                        │ (Connection Pool & ACID Transactions)
                                        ▼
+-----------------------------------------------------------------------------------+
|                        POSTGRESQL RELATIONAL DATABASE                             |
|  - Chart of Accounts, General Ledger & Journal Lines                              |
|  - Warehouses, Products, Batches, Serials, Stock Ledger                           |
|  - Sales Orders, Delivery Challans, Invoices, POS Register Shifts                 |
|  - BOM Recipes, Assembly Orders, Customers & Vendors                              |
+-----------------------------------------------------------------------------------+
```

---

## 🚀 Quick Start (Local Development)

### 1. Start the Backend API Service:
```bash
cd backend
npm install
npm start
```
*The server starts on port `5000`. If PostgreSQL is available, it connects to PostgreSQL; otherwise, it seamlessly boots in High-Fidelity Engine mode with full seed data.*

### 2. Start the Frontend Web App:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🖥️ Ubuntu Dedicated Server with aaPanel Deployment Guide

### Prerequisites on your Server:
1. **Ubuntu 20.04 / 22.04 LTS** with **aaPanel** installed.
2. **PostgreSQL** installed in aaPanel (via aaPanel App Store or `apt-get install postgresql`).
3. **Node.js Project Manager** (or PM2) installed in aaPanel App Store.

---

### Step 1: Clone or Copy Project to Server
Place the code into `/www/wwwroot/POS-ERP`:
```bash
cd /www/wwwroot
git clone <your-repo-url> POS-ERP
cd POS-ERP
```

### Step 2: Configure Environment Variables
Edit `/www/wwwroot/POS-ERP/backend/.env`:
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_enterprise_jwt_key_2026

# Your aaPanel PostgreSQL Database Credentials:
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_actual_postgres_password
PGDATABASE=apexerppos

COMPANY_NAME=Apex Commercial Enterprise
COMPANY_ADDRESS=Plot 45, Industrial Area, Karachi, Pakistan
COMPANY_TAX_ID=NTN-7492019-2
CURRENCY=PKR
```

### Step 3: Run Automated aaPanel Setup Script
```bash
chmod +x deploy/aapanel_setup.sh
./deploy/aapanel_setup.sh
```
*This script automatically creates the `apexerppos` database, executes `schema.sql` and `seed.sql`, builds the frontend bundle, and registers the application in PM2!*

### Step 4: Configure aaPanel Website & Nginx Reverse Proxy
1. In aaPanel dashboard, go to **Website** $\to$ **Add Site**.
2. Enter your domain (e.g. `erp.yourdomain.com`).
3. Set **Site Directory** to `/www/wwwroot/POS-ERP/frontend/dist`.
4. Click **Settings** on your website:
   - Go to **SSL** $\to$ Apply for free **Let's Encrypt** SSL Certificate.
   - Go to **Config** (or **Reverse Proxy**) and paste the contents of **[`deploy/nginx_aapanel.conf`](file:///f:/Git-Hub/POS-ERP/deploy/nginx_aapanel.conf)**.
5. Click **Save**.

Your ERP is now live with full HTTPS, WebSocket real-time synchronization, and native PostgreSQL persistence!

---

## 📱 Mobile PWA Installation (Android & iOS)

ApexERP is designed as a zero-friction **Progressive Web App**:
- **Android**: Open `https://erp.yourdomain.com` in Google Chrome $\to$ Tap the three dots $\to$ **"Install App"** (or **"Add to Home screen"**).
- **iOS (iPhone/iPad)**: Open `https://erp.yourdomain.com` in Safari $\to$ Tap the Share button $\to$ **"Add to Home Screen"**.
- Features available on mobile:
  - **GPS Shop Tagging**: Logs latitude and longitude when booking sales orders.
  - **Camera Barcode Scanner**: Uses the device camera directly on the shop floor.
  - **Offline Resilience**: Automatically caches catalog and queues orders during cellular dropouts.

---

## 🔑 Default Seed Credentials & Accounts

| Username | Password | Role | Permissions |
| :--- | :--- | :--- | :--- |
| `admin` | `Admin@123456` | **Super Admin** | Full access to Ledgers, POS, BOM, Settings |
| `manager` | `Admin@123456` | **Store Manager** | Inventory, Purchase Orders, Warehouses |
| `cashier1`| `Admin@123456` | **Cashier** | Point of Sale, Receipt printing, Shift balancing |
| `booker1` | `Admin@123456` | **Field Sales Booker** | Mobile Order Booker, Customer visits |

---

## 📊 Database Schema Summary
- `chart_of_accounts`, `journal_entries`, `journal_lines`: GAAP/IFRS General Ledger
- `warehouses`, `categories`, `products`, `product_batches`, `stock_ledger`: Multi-warehouse perpetual inventory
- `pos_registers`, `pos_shifts`, `pos_transactions`, `pos_payments`: Register shifts and split payments
- `sales_orders`, `sales_invoices`, `delivery_challans`: Full sales lifecycle & QR e-invoicing
- `bom_recipes`, `bom_items`, `assembly_orders`: Bill of Materials & assembly production
