import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { AppState, showToast, formatCurrency } from './state.js';

let activeScannerInstance = null;
let isTorchOn = false;

/**
 * Play a pleasant hardware POS register scan beep using Web Audio API
 */
export function playScannerBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, ctx.currentTime); // High pitch POS chirp
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // AudioContext blocked before user interaction or unsupported
  }
}

/**
 * Open full-featured Camera Barcode Scanner Modal
 * @param {Object} options
 * @param {Function} options.onScan - callback(barcodeText, matchedProduct)
 * @param {string} options.title - Modal title
 * @param {boolean} options.continuous - Keep scanning multiple items (default true for POS)
 */
export function openBarcodeScannerModal({
  onScan,
  title = 'Smartphone Camera Barcode Scanner',
  continuous = true
}) {
  // Close any existing scanner
  closeBarcodeScannerModal();

  const modalHtml = `
    <div class="modal-overlay" id="global-barcode-scanner-modal" style="z-index: 10050;">
      <div class="modal-content" style="max-width: 480px; width: 95%; padding: 0; overflow: hidden; border: 1px solid var(--border-bright); box-shadow: 0 25px 60px rgba(0,0,0,0.85); background: #080d1a;">
        
        <!-- Header -->
        <div style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: #0c1424;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.25rem;">📷</span>
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: #fff; margin: 0;">${title}</h3>
              <span style="font-size: 0.72rem; color: #38bdf8;">Code 128 • EAN-13 • UPC • QR Code</span>
            </div>
          </div>
          <button class="btn-icon btn-sm" id="btn-close-scanner-modal" style="width: 32px; height: 32px;" title="Close Scanner">✕</button>
        </div>

        <!-- Camera Viewport Box -->
        <div class="scanner-viewport-wrapper" style="position: relative; width: 100%; height: 280px; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <div id="html5-qr-reader-region" style="width: 100%; height: 100%;"></div>

          <!-- Futuristic Laser Reticle Overlay -->
          <div class="scanner-reticle" style="position: absolute; width: 78%; max-width: 280px; height: 150px; pointer-events: none; border: 2px solid rgba(56, 189, 248, 0.4); border-radius: 12px; box-shadow: 0 0 30px rgba(56, 189, 248, 0.25);">
            <!-- Corner Accents -->
            <div style="position: absolute; top: -2px; left: -2px; width: 22px; height: 22px; border-top: 4px solid #38bdf8; border-left: 4px solid #38bdf8; border-top-left-radius: 8px;"></div>
            <div style="position: absolute; top: -2px; right: -2px; width: 22px; height: 22px; border-top: 4px solid #38bdf8; border-right: 4px solid #38bdf8; border-top-right-radius: 8px;"></div>
            <div style="position: absolute; bottom: -2px; left: -2px; width: 22px; height: 22px; border-bottom: 4px solid #38bdf8; border-left: 4px solid #38bdf8; border-bottom-left-radius: 8px;"></div>
            <div style="position: absolute; bottom: -2px; right: -2px; width: 22px; height: 22px; border-bottom: 4px solid #38bdf8; border-right: 4px solid #38bdf8; border-bottom-right-radius: 8px;"></div>
            
            <!-- Animated Red/Cyan Laser Beam -->
            <div class="laser-beam" style="position: absolute; left: 4px; right: 4px; height: 2px; background: linear-gradient(90deg, transparent, #ef4444, #f43f5e, #ef4444, transparent); box-shadow: 0 0 10px #ef4444; animation: laserScan 2s ease-in-out infinite;"></div>
          </div>

          <!-- Camera Controls (Torch & Switch) -->
          <div style="position: absolute; top: 12px; right: 12px; display: flex; gap: 8px; z-index: 10;">
            <button id="btn-toggle-torch" class="btn btn-sm" style="display: none; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 4px 8px; font-size: 11px; border-radius: 20px;">
              🔦 Flash
            </button>
          </div>

          <!-- Guide text badge -->
          <div style="position: absolute; bottom: 12px; font-size: 0.75rem; color: #fff; background: rgba(0,0,0,0.7); backdrop-filter: blur(6px); padding: 4px 14px; border-radius: 20px; pointer-events: none; border: 1px solid rgba(255,255,255,0.15);">
            Point camera at product barcode
          </div>
        </div>

        <!-- Scanned Feedback Banner -->
        <div id="scanner-last-feedback" style="padding: 0.75rem 1.25rem; background: #0f172a; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Status</span>
            <span id="scanner-status-text" style="font-size: 0.88rem; color: #34d399; font-weight: 600;">🟢 Camera ready & searching...</span>
          </div>
          <div id="scanner-count-badge" style="font-size: 0.75rem; padding: 3px 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; color: #38bdf8; font-weight: 700;">
            0 Scanned
          </div>
        </div>

        <!-- Manual Barcode Search & Mode Controls -->
        <div style="padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; background: #080d1a;">
          
          <div style="display: flex; gap: 6px;">
            <input type="text" id="manual-scanner-input" class="form-control" placeholder="Or enter barcode / SKU number..." style="font-family: var(--font-mono); font-size: 0.88rem; padding: 0.6rem 0.85rem;" />
            <button class="btn btn-primary btn-sm" id="btn-submit-manual-barcode" style="white-space: nowrap; padding: 0.6rem 1rem;">
              Add
            </button>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary);">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none;">
              <input type="checkbox" id="chk-continuous-scan" ${continuous ? 'checked' : ''} style="cursor: pointer;" />
              <span>Keep camera open (Continuous scanning)</span>
            </label>
          </div>

          <!-- Quick Test / Demo Barcodes -->
          <div>
            <span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-bottom: 6px; text-transform: uppercase; font-weight: 600;">
              Tap to Test Barcode:
            </span>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;" id="demo-barcode-chips">
              ${AppState.products.slice(0, 5).map(p => `
                <button type="button" class="btn btn-outline btn-xs demo-scan-btn" data-barcode="${p.barcode || p.sku}" style="font-family: var(--font-mono); font-size: 0.72rem; padding: 3px 8px; border-radius: 4px;">
                  ${p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name} (${p.barcode || p.sku})
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 0.85rem 1.25rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; background: #0c1424;">
          <button class="btn btn-outline btn-sm" id="btn-dismiss-scanner-modal">Done / Close</button>
        </div>

      </div>
    </div>

    <style>
      @keyframes laserScan {
        0% { top: 6px; opacity: 0.9; }
        50% { top: calc(100% - 8px); opacity: 1; }
        100% { top: 6px; opacity: 0.9; }
      }
      #html5-qr-reader-region video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  let scanCount = 0;
  let lastScannedCode = null;
  let lastScannedTime = 0;

  const modal = document.getElementById('global-barcode-scanner-modal');
  const manualInput = document.getElementById('manual-scanner-input');
  const btnManual = document.getElementById('btn-submit-manual-barcode');
  const statusText = document.getElementById('scanner-status-text');
  const countBadge = document.getElementById('scanner-count-badge');
  const chkContinuous = document.getElementById('chk-continuous-scan');
  const btnTorch = document.getElementById('btn-toggle-torch');

  // Process a successfully decoded barcode
  const handleDecodedCode = (decodedText) => {
    if (!decodedText) return;
    const cleanCode = decodedText.trim();
    const now = Date.now();

    // Debounce duplicate reads of same barcode within 1.6s
    if (cleanCode === lastScannedCode && (now - lastScannedTime) < 1600) {
      return;
    }

    lastScannedCode = cleanCode;
    lastScannedTime = now;

    // Trigger audio beep & vibration
    playScannerBeep();
    if (navigator.vibrate) {
      navigator.vibrate(80);
    }

    // Match in AppState
    const matched = AppState.products.find(p =>
      p.barcode === cleanCode ||
      p.sku.toLowerCase() === cleanCode.toLowerCase()
    );

    scanCount++;
    if (countBadge) countBadge.textContent = `${scanCount} Scanned`;

    if (matched) {
      if (statusText) {
        statusText.innerHTML = `✅ Added: <b>${matched.name}</b> (${formatCurrency(matched.selling_price)})`;
        statusText.style.color = '#34d399';
      }
      showToast(`Scanned: ${matched.name}`, 'success');
      if (onScan) onScan(cleanCode, matched);
    } else {
      if (statusText) {
        statusText.innerHTML = `⚠️ Unrecognized Barcode: <span style="font-family:monospace;">${cleanCode}</span>`;
        statusText.style.color = '#fbbf24';
      }
      showToast(`Barcode not in inventory: ${cleanCode}`, 'warning');
      if (onScan) onScan(cleanCode, null);
    }

    // If single-scan mode (continuous unchecked), close automatically
    if (!chkContinuous.checked) {
      closeBarcodeScannerModal();
    }
  };

  // Setup html5-qrcode
  try {
    const html5QrCode = new Html5Qrcode("html5-qr-reader-region", {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.QR_CODE
      ],
      verbose: false
    });

    activeScannerInstance = html5QrCode;

    const qrConfig = {
      fps: 20,
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const w = Math.floor(viewfinderWidth * 0.85);
        const h = Math.floor(Math.min(w * 0.55, viewfinderHeight * 0.65));
        return { width: Math.max(w, 200), height: Math.max(h, 110) };
      },
      aspectRatio: 1.333333
    };

    html5QrCode.start(
      { facingMode: "environment" },
      qrConfig,
      (decodedText) => {
        handleDecodedCode(decodedText);
      },
      (error) => {
        // Continuous frame analysis error - normal, ignore
      }
    ).then(() => {
      // Check torch capability
      try {
        if (html5QrCode.getRunningTrackCameraCapabilities) {
          const caps = html5QrCode.getRunningTrackCameraCapabilities();
          if (caps && typeof caps.torchFeature === 'function' && caps.torchFeature().isSupported()) {
            btnTorch.style.display = 'inline-flex';
            btnTorch.addEventListener('click', () => {
              isTorchOn = !isTorchOn;
              caps.torchFeature().apply(isTorchOn);
              btnTorch.style.background = isTorchOn ? '#eab308' : 'rgba(0,0,0,0.65)';
              btnTorch.style.color = isTorchOn ? '#000' : '#fff';
            });
          }
        }
      } catch (e) {
        // Torch not supported on this device/browser
      }
    }).catch(err => {
      console.log('[Camera Scanner] Camera stream notice:', err.message || err);
      if (statusText) {
        statusText.innerHTML = `ℹ️ Camera access standby (Desktop or Permission needed). Use demo buttons or manual entry below.`;
        statusText.style.color = '#94a3b8';
      }
    });

  } catch (err) {
    console.error('[Camera Scanner] Setup error:', err);
  }

  // Manual Barcode Input button & Enter key
  const submitManual = () => {
    const val = manualInput.value.trim();
    if (!val) return;
    handleDecodedCode(val);
    manualInput.value = '';
    manualInput.focus();
  };

  btnManual?.addEventListener('click', submitManual);
  manualInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitManual();
    }
  });

  // Demo test buttons
  modal.querySelectorAll('.demo-scan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.barcode;
      handleDecodedCode(code);
    });
  });

  // Close handlers
  document.getElementById('btn-close-scanner-modal')?.addEventListener('click', closeBarcodeScannerModal);
  document.getElementById('btn-dismiss-scanner-modal')?.addEventListener('click', closeBarcodeScannerModal);
}

/**
 * Close and safely terminate active camera video stream
 */
export async function closeBarcodeScannerModal() {
  const modal = document.getElementById('global-barcode-scanner-modal');
  if (activeScannerInstance) {
    try {
      if (activeScannerInstance.isScanning) {
        await activeScannerInstance.stop();
      }
      activeScannerInstance.clear();
    } catch (e) {
      console.warn('[Camera Scanner] Error shutting down stream:', e);
    }
    activeScannerInstance = null;
  }

  if (modal) {
    modal.remove();
  }
}
