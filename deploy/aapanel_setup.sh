#!/usr/bin/env bash
# ==============================================================================
# ApexERP & POS Enterprise - Automated Ubuntu & aaPanel Deployment Script
# ==============================================================================

set -e

echo "=================================================================="
echo "    ApexERP & POS - Ubuntu dedicated server deployment script    "
echo "=================================================================="

# 1. Verify Node.js
if ! command -v node &> /dev/null; then
    echo "[!] Node.js not detected. Installing Node.js LTS via NodeSource..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "[✓] Node.js $(node -v) and npm $(npm -v) verified."

# 2. Check PM2
if ! command -v pm2 &> /dev/null; then
    echo "[*] Installing PM2 process manager globally..."
    sudo npm install -g pm2
fi
echo "[✓] PM2 process manager active."

# 3. Setup PostgreSQL Database
DB_NAME="apexerppos"
DB_USER="postgres"

echo "[*] Checking PostgreSQL database: ${DB_NAME}..."
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME};"

echo "[✓] Database ${DB_NAME} ready."

# 4. Install Backend Dependencies
echo "[*] Installing backend dependencies..."
cd "$(dirname "$0")/../backend"
npm install --production=false

# 5. Execute Database Schema & Seed Data
echo "[*] Executing database schema and seed data migration..."
node database/migrate.js

# 6. Build Frontend Assets
echo "[*] Building frontend production bundle..."
cd "../frontend"
npm install
npm run build

# 7. Start/Reload via PM2
echo "[*] Starting/reloading ApexERP API server via PM2..."
cd "../backend"
pm2 start ecosystem.config.cjs --env production
pm2 save

echo "=================================================================="
echo " [✓] Deployment Complete!                                         "
echo " Server running on http://127.0.0.1:5000                          "
echo " aaPanel website reverse-proxy configuration:                     "
echo " Paste deploy/nginx_aapanel.conf into your aaPanel website config."
echo "=================================================================="
