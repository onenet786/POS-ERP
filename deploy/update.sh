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

# 1. Pull latest code from GitHub
git pull origin main

# 2. Update Backend dependencies and restart PM2
echo "[*] Updating backend dependencies and reloading service..."
cd backend
npm install --production=false
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs --env production

# 3. Rebuild Frontend bundle
echo "[*] Rebuilding frontend assets..."
cd ../frontend
npm install
npm run build

echo "=================================================================="
echo " [✓] Update Complete & Reloaded with Zero Downtime!              "
echo "=================================================================="
