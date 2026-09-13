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
PORT=5010
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_2026

# PostgreSQL credentials on your aaPanel dedicated server
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_actual_postgres_password
PGDATABASE=bierppos

COMPANY_NAME="Bin Ishaq Softs"
COMPANY_ADDRESS="Muslim Town, Lahore, Pakistan"
COMPANY_TAX_ID="NTN-7492019-2"
COMPANY_PHONE="+92 42 30000001"
CURRENCY="PKR"
```
*(Press `Ctrl + O` then `Enter` to save, and `Ctrl + X` to exit `nano`).*

#### Step 3: Run the Automated Installation Script
```bash
chmod +x deploy/aapanel_setup.sh deploy/update.sh
./deploy/aapanel_setup.sh
```
This automated script will:
- Check Node.js and PM2.
- Verify PostgreSQL service (`/etc/init.d/pgsql`).
- Auto-create the `bierppos` database in PostgreSQL.
- Run the schema (`schema.sql`) and seed data (`seed.sql`).
- Install all dependencies.
- Build the production frontend bundle into `frontend/dist`.
- Start the backend PM2 cluster service (`apexerppos-api`) on port `5010`.

---

### Part 3: Attaching Your Domain & Node.js Settings in aaPanel

There are two straightforward ways to connect your domain name (e.g., `erp.yourdomain.com`) and manage Node.js in aaPanel:

---

#### 🌐 Method A: Using aaPanel "Node project" Manager (Recommended GUI Method)

aaPanel has a dedicated **Node project** manager that handles domain binding, process supervision, and reverse proxying with one click:

1. **DNS Setup**:
   - In your domain DNS registrar (Cloudflare, Namecheap, GoDaddy, etc.), add an **A Record**:
     - **Name / Host**: `erp` (or `@` for root domain)
     - **Value / IPv4**: Your Ubuntu Server IP address
     - **TTL**: Automatic (or 5 minutes)

2. **Open aaPanel Node Project Manager**:
   - In the aaPanel left sidebar, click **Website**.
   - At the top tabs, click **Node project** (tabs are: *PHP project | Java project | Node project | Go project*).
   - If Node.js is not yet installed in aaPanel, click **Install Node version** $\to$ choose **v20.x** or **v24.x**.

3. **Add the Node Project**:
   - Click **Add Node Project**:
     - **Project directory**: `/www/wwwroot/POS-ERP/backend`
     - **Project name**: `POS-ERP`
     - **Run Opt**: Select `start` (or enter `src/server.js`)
     - **Port**: `5010`
     - **Run user**: `www` (or `root`)
     - **Node version**: Select your installed Node.js version
     - **Domain name**: Enter your domain (e.g. `erp.yourdomain.com`)
   - Click **Submit**. aaPanel will automatically start the Node process and create the Nginx reverse proxy!

4. **Enable SSL (HTTPS)**:
   - In the Node project list, click your project's domain name or click **Settings** $\to$ **SSL**.
   - Select **Let's Encrypt** $\to$ Check your domain $\to$ Click **Apply**.
   - Once issued, turn on **Force HTTPS**.

---

#### 🌐 Method B: Using aaPanel Standard Website + Nginx Reverse Proxy (Advanced / PM2 Method)

If you ran `./deploy/aapanel_setup.sh`, the backend is already managed by **PM2** on port `5010`. You can route your domain directly via aaPanel's standard website manager:

1. **Add Website in aaPanel**:
   - In aaPanel sidebar $\to$ **Website** $\to$ click **Add Site**.
   - **Domain**: `erp.yourdomain.com` (your actual domain or subdomain).
   - **Document Root**: `/www/wwwroot/POS-ERP/frontend/dist`
   - **FTP / Database**: None / Leave as is.
   - **PHP version**: `Static` (or any PHP version).
   - Click **Submit**.

2. **Apply SSL Certificate**:
   - In the Website list, click **Settings** for your site.
   - Go to the **SSL** tab $\to$ Select **Let's Encrypt** $\to$ Click **Apply**.
   - Toggle **Force HTTPS** to ON.

3. **Apply the Nginx Reverse Proxy Configuration**:
   - Still in Website **Settings**, click the **Config** tab on the left menu.
   - Replace the configuration with the contents of **[`deploy/nginx_aapanel.conf`](file:///f:/Git-Hub/POS-ERP/deploy/nginx_aapanel.conf)**:
     - Make sure `server_name` has your domain (`erp.yourdomain.com`).
     - Make sure the upstream target is `127.0.0.1:5010`.
   - Click **Save**.

4. **Firewall & Security in aaPanel**:
   - In aaPanel sidebar $\to$ click **Security**:
     - Ensure Port **80** (HTTP) and Port **443** (HTTPS) are **Open / Allowed**.
     - Port **5010** does **NOT** need to be opened in your external firewall, because Nginx acts as the secure internal reverse-proxy to `127.0.0.1:5010`!

Your ApexERP & POS Enterprise is now live and secured at `https://erp.yourdomain.com`!

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
