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

if [ ! -f "$ENV_FILE" ]; then
    echo "[!] backend/.env not found! Creating from backend/.env.example..."
    cp "${BASE_DIR}/backend/.env.example" "$ENV_FILE"
fi

# Safe environment variable extraction (works regardless of quotes or unquoted spaces)
get_env_val() {
    local key="$1"
    local default_val="$2"
    local raw_val
    raw_val=$(grep -E "^[[:space:]]*${key}=" "$ENV_FILE" 2>/dev/null | tail -n 1 | cut -d '=' -f2- | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^["'"'"']//' -e 's/["'"'"']$//')
    if [ -n "$raw_val" ]; then
        echo "$raw_val"
    else
        echo "$default_val"
    fi
}

APP_PORT=$(get_env_val "PORT" "5010")
PG_HOST=$(get_env_val "PGHOST" "localhost")
PG_PORT=$(get_env_val "PGPORT" "5432")
PG_USER=$(get_env_val "PGUSER" "postgres")
PG_PASS=$(get_env_val "PGPASSWORD" "postgres")
PG_DB=$(get_env_val "PGDATABASE" "bierppos")

echo "[✓] Configuration Loaded:"
echo "    - Application Port:    ${APP_PORT}"
echo "    - PostgreSQL Host:     ${PG_HOST}:${PG_PORT}"
echo "    - PostgreSQL User:     ${PG_USER}"
echo "    - PostgreSQL Database: ${PG_DB}"

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
    npm install -g pm2 || sudo npm install -g pm2
fi
echo "[✓] PM2 process manager active."

# 3. Check PostgreSQL Service on Ubuntu / aaPanel
echo "[*] Verifying PostgreSQL service..."
# In aaPanel, PostgreSQL is commonly named 'pgsql' or managed via /etc/init.d/pgsql
if [ -f "/etc/init.d/pgsql" ]; then
    /etc/init.d/pgsql status >/dev/null 2>&1 || /etc/init.d/pgsql start >/dev/null 2>&1 || true
elif [ -f "/etc/init.d/postgresql" ]; then
    /etc/init.d/postgresql status >/dev/null 2>&1 || /etc/init.d/postgresql start >/dev/null 2>&1 || true
elif command -v systemctl &> /dev/null; then
    if systemctl list-unit-files 2>/dev/null | grep -q "pgsql.service"; then
        systemctl is-active --quiet pgsql || systemctl start pgsql 2>/dev/null || true
    elif systemctl list-unit-files 2>/dev/null | grep -q "postgresql.service"; then
        systemctl is-active --quiet postgresql || systemctl start postgresql 2>/dev/null || true
    fi
fi

# Check if port 5432 is listening
if command -v nc &> /dev/null && nc -z -w2 "$PG_HOST" "$PG_PORT" 2>/dev/null; then
    echo "[✓] PostgreSQL is listening on ${PG_HOST}:${PG_PORT}."
elif command -v ss &> /dev/null && ss -tuln | grep -q ":${PG_PORT} "; then
    echo "[✓] PostgreSQL port :${PG_PORT} is active."
else
    echo "[!] Notice: PostgreSQL port :${PG_PORT} check passed to migration runner."
fi

# 4. Install Backend Dependencies
echo "[*] Installing backend dependencies..."
cd "${BASE_DIR}/backend"
npm install --production=false

# 5. Execute Self-Healing Database Migration & Schema Setup
echo "[*] Initializing database and executing migration script..."
node database/migrate.js

# 6. Build Frontend Assets
echo "[*] Building frontend production bundle..."
cd "${BASE_DIR}/frontend"
npm install
npm run build

# 7. Start/Reload via PM2
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
