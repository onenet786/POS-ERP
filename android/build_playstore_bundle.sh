#!/usr/bin/env bash
# ==============================================================================
# Bin Ishaq Softs Enterprise Suite - Google Play Store AAB & APK Build Script
# Uses Google's official Bubblewrap CLI (Trusted Web Activity - TWA)
# ==============================================================================

set -e

echo "=================================================================="
echo "    Bin Ishaq Softs - Building Google Play Store Package          "
echo "=================================================================="

cd "$(dirname "$0")"

# 1. Check if Node.js is installed
if ! command -v npx &> /dev/null; then
    echo "[!] Error: Node.js and npx are required to build the Android package."
    exit 1
fi

# 2. Build Android App Bundle (.aab) & APK using Bubblewrap
echo "[*] Initializing Bubblewrap build for com.binishaqsoft.bierppos..."
npx -y @bubblewrap/cli build

echo "=================================================================="
echo " [✓] Build Complete!                                             "
echo " Files generated in android/ directory:                          "
echo "  - app-release-bundle.aab (Upload this to Google Play Console)   "
echo "  - app-release-signed.apk (Direct installation APK for testing)  "
echo "=================================================================="
