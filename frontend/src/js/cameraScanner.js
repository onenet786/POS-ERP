import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';
import { AppState, showToast, formatCurrency } from './state.js';

let activeCodeReader = null;
let activeMediaStream = null;
let isTorchActive = false;

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
    osc.frequency.setValueAtTime(1760, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // AudioContext blocked before user interaction
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
  // Clean up any previously opened scanner
  closeBarcodeScannerModal();

  const modalHtml = `
    <div class="modal-overlay" id="global-barcode-scanner-modal" style="z-index: 10050;">
      <div class="modal-content" style="max-width: 480px; width: 95%; padding: 0; overflow: hidden; border: 1px solid var(--border-bright); box-shadow: 0 25px 60px rgba(0,0,0,0.85); background: #080d1a;">
        
        <!-- Header -->
        <div style="padding: 0.85rem 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: #0c1424;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">📷</span>
            <div>
              <h3 style="font-size: 1rem; font-weight: 700; color: #fff; margin: 0;">${title}</h3>
              <span style="font-size: 0.72rem; color: #38bdf8;">Code 128 • EAN-13 • UPC • QR Code</span>
            </div>
          </div>
          <button class="btn-icon btn-sm" id="btn-close-scanner-modal" style="width: 32px; height: 32px;" title="Close Scanner">✕</button>
        </div>

        <!-- Camera Viewport Box -->
        <div class="scanner-viewport-wrapper" style="position: relative; width: 100%; height: 280px; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          
          <!-- Native Video Element with required attributes for iOS Safari & Android Chrome -->
          <video 
            id="scanner-live-video" 
            autoplay 
            playsinline 
            muted 
            style="width: 100%; height: 100%; object-fit: cover; display: block; background: #000;">
          </video>

          <!-- Futuristic Laser Reticle Overlay -->
          <div class="scanner-reticle" id="scanner-reticle-box" style="position: absolute; width: 78%; max-width: 280px; height: 140px; pointer-events: none; border: 2px solid rgba(56, 189, 248, 0.4); border-radius: 12px; box-shadow: 0 0 30px rgba(56, 189, 248, 0.25);">
            <!-- Corner Accents -->
            <div style="position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid #38bdf8; border-left: 4px solid #38bdf8; border-top-left-radius: 8px;"></div>
            <div style="position: absolute; top: -2px; right: -2px; width: 20px; height: 20px; border-top: 4px solid #38bdf8; border-right: 4px solid #38bdf8; border-top-right-radius: 8px;"></div>
            <div style="position: absolute; bottom: -2px; left: -2px; width: 20px; height: 20px; border-bottom: 4px solid #38bdf8; border-left: 4px solid #38bdf8; border-bottom-left-radius: 8px;"></div>
            <div style="position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid #38bdf8; border-right: 4px solid #38bdf8; border-bottom-right-radius: 8px;"></div>
            
            <!-- Animated Red/Cyan Laser Beam -->
            <div class="laser-beam" style="position: absolute; left: 4px; right: 4px; height: 2px; background: linear-gradient(90deg, transparent, #ef4444, #f43f5e, #ef4444, transparent); box-shadow: 0 0 12px #ef4444; animation: laserScan 2s ease-in-out infinite;"></div>
          </div>

          <!-- Camera Controls (Torch & Switch) -->
          <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; z-index: 10;">
            <button id="btn-toggle-torch" class="btn btn-sm" style="display: none; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 4px 10px; font-size: 11px; border-radius: 20px;">
              🔦 Flash
            </button>
            <button id="btn-switch-cam" class="btn btn-sm" style="display: none; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 4px 10px; font-size: 11px; border-radius: 20px;">
              🔄 Flip
            </button>
          </div>

          <!-- Permission / Standby overlay (hidden by default) -->
          <div id="scanner-permission-overlay" style="display: none; position: absolute; inset: 0; background: rgba(8, 13, 26, 0.94); backdrop-filter: blur(8px); z-index: 20; padding: 1.5rem; text-align: center; flex-direction: column; align-items: center; justify-content: center;">
            <span style="font-size: 2.2rem; margin-bottom: 8px;">🔒</span>
            <h4 style="font-size: 1rem; color: #fff; font-weight: 700; margin-bottom: 6px;">Camera Access Needed</h4>
            <p style="font-size: 0.78rem; color: #94a3b8; line-height: 1.4; margin-bottom: 12px; max-width: 320px;">
              Please allow camera access in your browser. If prompted, tap <b>"Allow"</b>.
            </p>
            <button id="btn-grant-permission" class="btn btn-primary btn-sm" style="padding: 0.6rem 1.25rem;">
              📷 Allow Camera Access
            </button>
          </div>

          <!-- Guide text badge -->
          <div id="scanner-guide-badge" style="position: absolute; bottom: 10px; font-size: 0.75rem; color: #fff; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); padding: 4px 14px; border-radius: 20px; pointer-events: none; border: 1px solid rgba(255,255,255,0.15); z-index: 5;">
            Align barcode inside laser reticle
          </div>
        </div>

        <!-- Scanned Feedback Banner -->
        <div id="scanner-last-feedback" style="padding: 0.75rem 1.25rem; background: #0f172a; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
          <div id="scanner-status-wrapper" style="flex: 1; padding-right: 8px;">
            <div id="scanner-status-text" style="font-size: 0.85rem; color: #34d399; font-weight: 600;">
              🟢 Ready
            </div>
          </div>
          <div id="scanner-count-badge" style="font-size: 0.75rem; padding: 3px 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; color: #38bdf8; font-weight: 700; white-space: nowrap;">
            0 Scanned
          </div>
        </div>

        <!-- Manual Barcode Search & Mode Controls -->
        <div style="padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; background: #080d1a;">
          
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
        <div style="padding: 0.75rem 1.25rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; background: #0c1424;">
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
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  let scanCount = 0;
  let lastScannedCode = null;
  let lastScannedTime = 0;
  let availableDevices = [];
  let currentDeviceIndex = 0;
  let nativeDetectorLoop = null;

  const modal = document.getElementById('global-barcode-scanner-modal');
  const videoElement = document.getElementById('scanner-live-video');
  const permOverlay = document.getElementById('scanner-permission-overlay');
  const btnGrantPerm = document.getElementById('btn-grant-permission');
  const manualInput = document.getElementById('manual-scanner-input');
  const btnManual = document.getElementById('btn-submit-manual-barcode');
  const statusText = document.getElementById('scanner-status-text');
  const countBadge = document.getElementById('scanner-count-badge');
  const chkContinuous = document.getElementById('chk-continuous-scan');
  const btnTorch = document.getElementById('btn-toggle-torch');
  const btnSwitchCam = document.getElementById('btn-switch-cam');

  // Process a successfully decoded barcode
  const handleDecodedCode = (decodedText) => {
    if (!decodedText) return;
    const cleanCode = String(decodedText).trim();
    if (!cleanCode) return;

    const now = Date.now();
    // Debounce duplicate reads of same barcode within 1.6s
    if (cleanCode === lastScannedCode && (now - lastScannedTime) < 1600) {
      return;
    }

    lastScannedCode = cleanCode;
    lastScannedTime = now;

    // Audio & haptic feedback
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

    if (!chkContinuous.checked) {
      closeBarcodeScannerModal();
    }
  };

  // Hardware-accelerated BarcodeDetector loop (Chrome Android / Samsung Internet)
  const startNativeBarcodeDetectorLoop = () => {
    if (!('BarcodeDetector' in window)) return;
    try {
      const barcodeDetector = new window.BarcodeDetector({
        formats: ['code_128', 'ean_13', 'ean_8', 'qr_code', 'upc_a', 'upc_e', 'code_39']
      });

      const detectFrame = async () => {
        if (!videoElement || videoElement.readyState < 2) {
          nativeDetectorLoop = requestAnimationFrame(detectFrame);
          return;
        }
        try {
          const barcodes = await barcodeDetector.detect(videoElement);
          if (barcodes && barcodes.length > 0) {
            handleDecodedCode(barcodes[0].rawValue);
          }
        } catch (e) {
          // ignore frame errors
        }
        nativeDetectorLoop = requestAnimationFrame(detectFrame);
      };

      nativeDetectorLoop = requestAnimationFrame(detectFrame);
    } catch (e) {
      console.log('[Native BarcodeDetector] Notice:', e.message);
    }
  };

  // Launch Camera with Direct MediaStream + ZXing
  const startScanner = async (specificDeviceId = null) => {
    try {
      permOverlay.style.display = 'none';
      statusText.innerHTML = `🔄 Starting camera...`;
      statusText.style.color = '#38bdf8';

      // 1. Direct standard getUserMedia to immediately trigger permission and display video
      const constraints = {
        video: specificDeviceId 
          ? { deviceId: { exact: specificDeviceId } }
          : { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      activeMediaStream = stream;

      videoElement.srcObject = stream;
      videoElement.setAttribute('playsinline', 'true');
      videoElement.setAttribute('muted', 'true');
      await videoElement.play();

      statusText.innerHTML = `🟢 Live camera feed active`;
      statusText.style.color = '#34d399';

      // 2. Torch control
      try {
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        if (capabilities.torch) {
          btnTorch.style.display = 'inline-flex';
          btnTorch.onclick = async () => {
            isTorchActive = !isTorchActive;
            await track.applyConstraints({ advanced: [{ torch: isTorchActive }] });
            btnTorch.style.background = isTorchActive ? '#eab308' : 'rgba(0,0,0,0.7)';
            btnTorch.style.color = isTorchActive ? '#000' : '#fff';
          };
        }
      } catch (tErr) {
        // Torch unsupported on device
      }

      // 3. Enumerate cameras for Flip button
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        availableDevices = devices.filter(d => d.kind === 'videoinput');
        if (availableDevices.length > 1) {
          btnSwitchCam.style.display = 'inline-flex';
          btnSwitchCam.onclick = async () => {
            currentDeviceIndex = (currentDeviceIndex + 1) % availableDevices.length;
            stopMediaStream();
            await startScanner(availableDevices[currentDeviceIndex].deviceId);
          };
        }
      } catch (e) {
        // Enumerate error
      }

      // 4. Start ZXing Reader on the video element
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.CODE_128,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.CODE_39,
        BarcodeFormat.QR_CODE
      ]);

      const codeReader = new BrowserMultiFormatReader(hints);
      activeCodeReader = codeReader;

      // Decode continuously from video element
      codeReader.decodeFromVideoElement(videoElement, (result, error) => {
        if (result) {
          handleDecodedCode(result.getText());
        }
      });

      // Also run native BarcodeDetector if browser supports it
      startNativeBarcodeDetectorLoop();

    } catch (err) {
      console.warn('[Camera Scanner] getUserMedia failed:', err);
      const errMsg = String(err.message || err.name || err);

      if (/NotAllowedError|permission|denied/i.test(errMsg)) {
        permOverlay.style.display = 'flex';
        statusText.innerHTML = `
          <span style="color:#ef4444; font-weight:700;">🔒 Camera Permission Required</span>
        `;
      } else if (/NotFoundError|device/i.test(errMsg)) {
        statusText.innerHTML = `
          <div style="color:#fbbf24; font-weight:700;">📷 No Camera Detected</div>
          <div style="font-size:0.75rem; color:#94a3b8;">Use manual entry or test chips below.</div>
        `;
      } else {
        statusText.innerHTML = `
          <div style="color:#fbbf24; font-weight:600;">⚠️ Camera standby</div>
          <button id="btn-retry-stream" class="btn btn-primary btn-xs" style="margin-top:4px;">Tap to Start Camera</button>
        `;
        document.getElementById('btn-retry-stream')?.addEventListener('click', () => startScanner());
      }
    }
  };

  const stopMediaStream = () => {
    if (nativeDetectorLoop) {
      cancelAnimationFrame(nativeDetectorLoop);
      nativeDetectorLoop = null;
    }
    if (activeCodeReader) {
      try { activeCodeReader.reset(); } catch (e) {}
      activeCodeReader = null;
    }
    if (activeMediaStream) {
      try {
        activeMediaStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      activeMediaStream = null;
    }
    if (videoElement) {
      videoElement.srcObject = null;
    }
  };

  // Launch camera immediately
  startScanner();

  // Retry from permission overlay
  btnGrantPerm?.addEventListener('click', () => {
    startScanner();
  });

  // Manual input
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

  // Demo chips
  modal.querySelectorAll('.demo-scan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.barcode;
      handleDecodedCode(code);
    });
  });

  // Close handlers
  const cleanup = () => {
    stopMediaStream();
    modal.remove();
  };

  document.getElementById('btn-close-scanner-modal')?.addEventListener('click', cleanup);
  document.getElementById('btn-dismiss-scanner-modal')?.addEventListener('click', cleanup);
}

/**
 * Close and safely terminate active camera video stream
 */
export function closeBarcodeScannerModal() {
  const modal = document.getElementById('global-barcode-scanner-modal');
  if (activeCodeReader) {
    try { activeCodeReader.reset(); } catch (e) {}
    activeCodeReader = null;
  }
  if (activeMediaStream) {
    try {
      activeMediaStream.getTracks().forEach(t => t.stop());
    } catch (e) {}
    activeMediaStream = null;
  }
  if (modal) {
    modal.remove();
  }
}
