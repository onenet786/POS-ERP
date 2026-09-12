#!/usr/bin/env bash
# ==============================================================================
# ApexERP & POS Enterprise - Automated Ubuntu & aaPanel Deployment Script
# ==============================================================================

set -e

echo "=================================================================="
echo "    ApexERP & POS - Ubuntu Dedicated Server Deployment Script     "
echo "=================================================================="

BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${BASE_DIR}/backend/.env"

# 1. Load Configuration from backend/.env
if [ -f "$ENV_FILE" ]; then
    echo "[*] Loading environment settings from backend/.env..."
    set -a
    # Load non-comment, non-empty lines
    source <(grep -v '^#' "$ENV_FILE" | grep -v '^\s*$')
    set +a
else
    echo "[!] backend/.env not found! Creating from backend/.env.example..."
    cp "${BASE_DIR}/backend/.env.example" "$ENV_FILE"
    set -a
    source <(grep -v '^#' "$ENV_FILE" | grep -v '^\s*$')
    set +a
fi

APP_PORT="${PORT:-5010}"
PG_HOST="${PGHOST:-localhost}"
PG_PORT="${PGPORT:-5432}"
PG_USER="${PGUSER:-postgres}"
PG_PASS="${PGPASSWORD:-postgres}"
PG_DB="${PGDATABASE:-bierppos}"

echo "[✓] Configuration Loaded:"
echo "    - Application Port: ${APP_PORT}"
echo "    - PostgreSQL Host: ${PG_HOST}:${PG_PORT}"
echo "    - PostgreSQL User: ${PG_USER}"
echo "    - PostgreSQL Database: ${PG_DB}"

# 2. Verify Node.js
if ! command -v node &> /dev/null; then
    echo "[!] Node.js not detected. Installing Node.js LTS via NodeSource..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
echo "[✓] Node.js $(node -v) and npm $(npm -v) verified."

# 3. Check PM2
if ! command -v pm2 &> /dev/null; then
    echo "[*] Installing PM2 process manager globally..."
    sudo npm install -g pm2
fi
echo "[✓] PM2 process manager active."

# 4. Check PostgreSQL Service on Ubuntu/aaPanel
echo "[*] Checking PostgreSQL service status..."
if command -v systemctl &> /dev/null; then
    if ! systemctl is-active --quiet postgresql; then
        echo "[!] PostgreSQL service is not active. Attempting to start service..."
        sudo systemctl start postgresql || true
        sudo systemctl enable postgresql || true
    fi
    if systemctl is-active --quiet postgresql; then
        echo "[✓] PostgreSQL service is running."
    else
        echo "[!] Note: Could not verify systemctl postgresql service. Checking TCP port..."
    fi
fi

# 5. Install Backend Dependencies
echo "[*] Installing backend dependencies..."
cd "${BASE_DIR}/backend"
npm install --production=false

# 6. Execute Self-Healing Database Migration & Schema Setup
echo "[*] Initializing database and executing migration script..."
node database/migrate.js

# 7. Build Frontend Assets
echo "[*] Building frontend production bundle..."
cd "${BASE_DIR}/frontend"
npm install
npm run build

# 8. Start/Reload via PM2
echo "[*] Starting/reloading ApexERP API server via PM2 on port ${APP_PORT}..."
cd "${BASE_DIR}/backend"
PORT="${APP_PORT}" pm2 start ecosystem.config.cjs --env production --update-env
pm2 save

echo "=================================================================="
echo " [✓] Deployment Complete!                                         "
echo " Backend & Web Service running on: http://127.0.0.1:${APP_PORT}  "
echo "                                                                  "
echo " Next step in aaPanel:                                            "
echo " 1. Website -> Add Site -> set Document Root to:                  "
echo "    ${BASE_DIR}/frontend/dist                                     "
echo " 2. Paste deploy/nginx_aapanel.conf into your Site Config.        "
echo "=================================================================="
