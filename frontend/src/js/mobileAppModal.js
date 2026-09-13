import QRCode from 'qrcode';
import { showToast } from './state.js';

export async function openMobileAppModal() {
  const existing = document.getElementById('mobile-app-install-modal');
  if (existing) existing.remove();

  const mobileUrl = `${window.location.origin}/#mobile_booker`;
  let qrCodeDataUrl = '';

  try {
    qrCodeDataUrl = await QRCode.toDataURL(mobileUrl, {
      width: 240,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
  }

  const modalHtml = `
    <div class="modal-overlay" id="mobile-app-install-modal" style="backdrop-filter: blur(8px); z-index:99999;">
      <div class="modal-content" style="max-width: 580px; padding: 2rem; border: 1px solid var(--border-bright); background: var(--bg-card); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); border-radius: 16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(56,189,248,0.12); color:#38bdf8; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:6px;">
              📱 TRUE MOBILE PWA CLIENT
            </div>
            <h2 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; margin:0; color:var(--text-main);">
              OneNet Mobile Sales & Order Booker
            </h2>
            <p style="font-size:0.85rem; color:var(--text-muted); margin:4px 0 0 0;">
              Zero-install progressive web application for Android, iPhone, iPad and handheld POS.
            </p>
          </div>
          <button class="btn-icon" id="btn-close-mobile-app-modal" style="border:none; font-size:1.2rem; cursor:pointer;">✕</button>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
          <div style="background:#ffffff; padding:10px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.3); margin-bottom:0.75rem;">
            ${qrCodeDataUrl ? `<img src="${qrCodeDataUrl}" alt="Scan Mobile App QR Code" style="width:190px; height:190px; display:block;" />` : '<div style="width:190px; height:190px; display:flex; align-items:center; justify-content:center;">Generating QR...</div>'}
          </div>
          <span style="font-size:0.85rem; font-weight:700; color:var(--text-main);">
            Scan with your Phone's Camera to open instantly
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-top:2px; word-break:break-all;">
            ${mobileUrl}
          </span>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
          <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1rem;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
              <span style="font-size:1.2rem;">🤖</span>
              <strong style="font-size:0.88rem; color:var(--text-main);">Android (Chrome)</strong>
            </div>
            <ol style="margin:0; padding-left:1.1rem; font-size:0.78rem; color:var(--text-muted); line-height:1.5;">
              <li>Open URL in <b>Google Chrome</b></li>
              <li>Tap the <b>3 dots (⋮)</b> top right</li>
              <li>Tap <b>"Install App"</b> or <b>"Add to Home screen"</b></li>
              <li>Launches full-screen with offline support</li>
            </ol>
          </div>

          <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1rem;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
              <span style="font-size:1.2rem;">🍏</span>
              <strong style="font-size:0.88rem; color:var(--text-main);">Apple iOS (Safari)</strong>
            </div>
            <ol style="margin:0; padding-left:1.1rem; font-size:0.78rem; color:var(--text-muted); line-height:1.5;">
              <li>Open URL in <b>Safari</b></li>
              <li>Tap the <b>Share button (⎋)</b> bottom center</li>
              <li>Scroll down and tap <b>"Add to Home Screen"</b></li>
              <li>Enjoy standalone app experience</li>
            </ol>
          </div>
        </div>

        <div style="background:rgba(56,189,248,0.06); border:1px solid rgba(56,189,248,0.2); border-radius:10px; padding:0.85rem; margin-bottom:1.5rem;">
          <div style="font-size:0.8rem; font-weight:700; color:#38bdf8; margin-bottom:4px;">✨ Built-in Mobile Capabilities:</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.75rem; color:var(--text-muted);">
            <span>✓ Offline IndexedDB Storage</span>
            <span>•</span>
            <span>✓ Camera Barcode / QR Scanner</span>
            <span>•</span>
            <span>✓ GPS Location Verification</span>
            <span>•</span>
            <span>✓ Thermal Receipt Slip Share</span>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-outline" id="btn-copy-mobile-url" style="font-size:0.85rem;">
            📋 Copy Mobile URL
          </button>
          <button class="btn btn-primary" id="btn-launch-mobile-booker-now" style="font-size:0.85rem; font-weight:700;">
            🚀 Open Booker in Browser
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('mobile-app-install-modal');

  document.getElementById('btn-close-mobile-app-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.getElementById('btn-copy-mobile-url')?.addEventListener('click', () => {
    navigator.clipboard.writeText(mobileUrl).then(() => {
      showToast('Mobile URL copied to clipboard!', 'success');
    });
  });

  document.getElementById('btn-launch-mobile-booker-now')?.addEventListener('click', () => {
    modal.remove();
    window.location.hash = '#mobile_booker';
  });
}
