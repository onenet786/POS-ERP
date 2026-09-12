# ApexERP & POS Enterprise

> **Next-Generation Cloud Accounting, Multi-Warehouse Inventory, High-Speed POS & Field Sales Mobile App**  
> Architected for **Node.js**, **PostgreSQL**, and seamless deployment on **Ubuntu Dedicated Servers with aaPanel**.  
> Repository: `https://github.com/onenet786/POS-ERP.git`

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

## 📦 Step-by-Step Installation Guide Using Git

### Part 1: Push from Local Computer to GitHub

1. Open your terminal in `f:\Git-Hub\POS-ERP`.
2. Ensure you are on the `main` branch:
   ```bash
   git branch
   # If needed: git checkout -b main
   ```
3. Push the codebase to your GitHub repository:
   ```bash
   git push origin main
   ```
   *(If your remote branch requires authentication, sign in with your GitHub account or Personal Access Token).*

---

### Part 2: First-Time Installation on Ubuntu Server with aaPanel

Log in to your Ubuntu dedicated server via SSH or the built-in **aaPanel Terminal** (`Terminal` tab on aaPanel sidebar).

#### Step 1: Clone Repository into aaPanel Web Root
```bash
# Navigate to aaPanel websites root directory
cd /www/wwwroot

# Clone your repository
git clone https://github.com/onenet786/POS-ERP.git POS-ERP

# Enter the project directory
cd /www/wwwroot/POS-ERP
```

#### Step 2: Configure Environment Variables
Copy `.env.example` to create your server production `.env`:
```bash
cp backend/.env.example backend/.env
nano backend/.env
```
Update your database configuration in `backend/.env` with your aaPanel PostgreSQL credentials:
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_2026

# PostgreSQL credentials on your aaPanel dedicated server
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
*(Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit `nano`).*

#### Step 3: Run the Automated Installation Script
```bash
chmod +x deploy/aapanel_setup.sh deploy/update.sh
./deploy/aapanel_setup.sh
```
This automated script will:
- Check Node.js and PM2.
- Create the `apexerppos` database in PostgreSQL (if not already existing).
- Run the schema (`schema.sql`) and seed data (`seed.sql`).
- Install all dependencies.
- Build the production frontend bundle into `frontend/dist`.
- Start the backend PM2 cluster service (`apexerppos-api`) on port `5000`.

#### Step 4: Configure aaPanel Website & Nginx Reverse Proxy
1. In your **aaPanel dashboard**, click **Website** $\to$ **Add Site**.
2. Fill in:
   - **Domain**: `erp.yourdomain.com` (or your server IP / domain).
   - **Document Root**: `/www/wwwroot/POS-ERP/frontend/dist`
   - **FTP / Database**: Leave as is (since PostgreSQL is managed separately).
3. Click **Submit**.
4. In the website list, click **Settings** for the newly created site:
   - **SSL Tab**: Apply for a free **Let's Encrypt** certificate and enable **Force HTTPS**.
   - **Config Tab (or Reverse Proxy)**: Open `deploy/nginx_aapanel.conf` from this repo, copy its contents, paste into your aaPanel website configuration editor, and replace `erp.yourdomain.com` with your real domain.
   - Click **Save**.

Your ApexERP & POS Enterprise is now live at `https://erp.yourdomain.com`!

---

### Part 3: Deploying Future Updates via Git (One-Command)

Whenever you push code updates, new features, or bug fixes to GitHub from your development machine:
```bash
# On your local machine:
git add .
git commit -m "feat: your update message"
git push origin main
```

To deploy the update on your live Ubuntu server with zero downtime:
```bash
# On your server terminal:
cd /www/wwwroot/POS-ERP
./deploy/update.sh
```
The script will pull latest commits, update dependencies, reload the PM2 cluster with zero downtime, and rebuild the frontend!

---

### Part 4: Automated Continuous Deployment (GitHub Webhook in aaPanel)

If you want your server to automatically update whenever you push to GitHub:
1. In aaPanel, go to **App Store** $\to$ search for **WebHook** $\to$ Install.
2. Open WebHook, click **Add Hook**:
   - **Name**: `ApexERP Auto-Deploy`
   - **Shell Script**:
     ```bash
     cd /www/wwwroot/POS-ERP
     ./deploy/update.sh
     ```
3. aaPanel will generate a Webhook URL (e.g. `https://your-server-ip:8888/hook?access_key=...`).
4. In your GitHub repository (`https://github.com/onenet786/POS-ERP`):
   - Go to **Settings** $\to$ **Webhooks** $\to$ **Add webhook**.
   - Paste the aaPanel Webhook URL into **Payload URL**.
   - Content type: `application/json`.
   - Select **Just the push event** $\to$ **Add webhook**.

Now every `git push` automatically rebuilds and reloads your live server!

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
