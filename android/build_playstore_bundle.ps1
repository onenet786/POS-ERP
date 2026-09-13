# ==============================================================================
# OneNet Solutions ERP - Google Play Store AAB & APK Build Script (PowerShell)
# Uses Google's official Bubblewrap CLI (Trusted Web Activity - TWA)
# ==============================================================================

Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "    OneNet Solutions - Building Google Play Store Package         " -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan

Set-Location $PSScriptRoot

# Verify npx
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Error: Node.js and npx are required." -ForegroundColor Red
    exit 1
}

Write-Host "[*] Launching Bubblewrap build for com.binishaqsoft.bierppos..." -ForegroundColor Yellow
npx -y @bubblewrap/cli build

Write-Host "==================================================================" -ForegroundColor Green
Write-Host " [✓] Build Complete!" -ForegroundColor Green
Write-Host "  - Upload app-release-bundle.aab to Google Play Console" -ForegroundColor Green
Write-Host "  - Use app-release-signed.apk for direct phone installation" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
