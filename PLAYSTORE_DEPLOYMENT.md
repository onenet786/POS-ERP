# 🚀 Bin Ishaq Softs - Google Play Store Publishing Guide

This guide walks you through generating the **Google Play Store App Bundle (`.aab`)** and **Direct APK (`.apk`)** for **Bin Ishaq Softs Enterprise Suite** (`com.binishaqsoft.bierppos`), so your customers and field agents can download and install it directly from the **Google Play Store**!

---

## 🏗️ Step 1: Generate the Android App Bundle (`.aab`) and `.apk`

The project is pre-configured with Google's official **Trusted Web Activity (TWA)** engine via **Bubblewrap CLI**.

### Option A: On Windows (PowerShell)
```powershell
cd android
./build_playstore_bundle.ps1
```

### Option B: On Linux / Ubuntu Server / macOS
```bash
cd android
chmod +x build_playstore_bundle.sh
./build_playstore_bundle.sh
```

### Or Directly via Command Line (1 Command):
```bash
npx -y @bubblewrap/cli build --manifest=android/twa-manifest.json
```

This generates:
1. **`app-release-bundle.aab`**: The signed Android App Bundle to upload to **Google Play Console**.
2. **`app-release-signed.apk`**: A standalone `.apk` you can distribute directly to customers or sideload on Android devices.

---

## 📱 Step 2: Google Play Console Setup

1. Go to the [Google Play Console](https://play.google.com/console).
2. Click **Create App**:
   - **App Name**: `Bin Ishaq Softs ERP & POS`
   - **Default Language**: English (or Urdu / your target language)
   - **App or Game**: App
   - **Free or Paid**: Free (or your business model)
   - Accept the Developer Program Policies and US Export Laws.

---

## 🎨 Step 3: Store Listing Assets

In Google Play Console under **Store presence > Main store listing**:

- **Short description**:
  > Complete Cloud ERP, Touch POS, Multi-Company Accounting & Field Sales Order Booker.
- **Full description**:
  > Bin Ishaq Softs Enterprise Suite is an all-in-one business management mobile application. Features include:
  > - Touch Point of Sale (POS) with Camera & Barcode Scanner
  > - Field Sales Order Booker with Live GPS Fleet Tracking
  > - Multi-Company Cloud Accounting & Financial Ledgers
  > - Inventory, Multi-Warehouse Hubs & Batch Expiry Tracking
  > - Offline Support with local database synchronization
  > - Thermal Slip & A4 Professional Invoicing
- **App Icon**: Upload `frontend/public/icon-512.png` (512x512 PNG).
- **Screenshots**: Take 2 to 8 phone screenshots directly from the mobile app view.

---

## 📦 Step 4: Upload the App Bundle (`.aab`)

1. Go to **Release > Production** (or **Closed Testing** first).
2. Click **Create new release**.
3. Under **App bundles**, upload `app-release-bundle.aab`.
4. Enter Release notes (e.g., `Initial release of Bin Ishaq Softs ERP & POS Enterprise Suite`).
5. Click **Next** and **Save**.

---

## 🔒 Step 5: Digital Asset Links Verification (Zero URL Bar)

Your application already includes the Digital Asset Links configuration at:
`https://bierppos.binishaqsoft.com/.well-known/assetlinks.json`

When the app runs from the Play Store on Android, Android will automatically verify this link and run the application in **pure full-screen standalone native mode** without any browser address bar!

---

## 📲 Alternative: Direct Customer PWA Installation

Customers do not even need to wait for Play Store review! They can also install it instantly:
1. Open `https://bierppos.binishaqsoft.com` on their phone browser (Chrome/Edge/Samsung Internet).
2. Open the left menu (`☰`) and tap **"📲 Install Android App"**.
3. The app is added directly to their Android phone home screen with native icon, offline support, and full-screen display!
