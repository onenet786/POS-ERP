#!/usr/bin/env bash
# ==============================================================================
# ApexERP & POS Enterprise - Automated Git Update Script for aaPanel / Ubuntu
# Run this script whenever you push new changes to your Git repository!
# ==============================================================================

set -e

echo "=================================================================="
echo "    Pulling Latest Updates from Git (origin/main)...             "
echo "=================================================================="

# Move to root directory
cd "$(dirname "$0")/.."

# 1. Clean local package-lock changes & pull latest code from GitHub
git checkout -- frontend/package-lock.json 2>/dev/null || true
git pull origin main

# 2. Rebuild Frontend bundle
echo "[*] Building frontend production bundle..."
cd frontend
npm install --include=dev
npm run build
cd ..

# 3. Update Backend dependencies, run database migrations, and restart PM2
echo "[*] Updating backend dependencies and reloading service..."
cd backend
npm install --production=false
node database/migrate.js || true
pm2 reload ecosystem.config.cjs || pm2 restart ecosystem.config.cjs --env production
cd ..

echo "=================================================================="
echo " [✓] Update Complete & Reloaded with Zero Downtime!              "
echo "=================================================================="
