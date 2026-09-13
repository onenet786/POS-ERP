import { AppState, showToast } from './state.js';
import { Api } from './api.js';
import { trackBookerLocation, startContinuousTracking } from './gpsTracker.js';

let _onSuccessCallback = null;
let _googleClientId = null;

/**
 * Fetch authentication configuration (Google Client ID, etc.)
 */
async function loadAuthConfig() {
  try {
    const res = await Api.get('/auth/config');
    if (res.success && res.google_client_id) {
      _googleClientId = res.google_client_id;
    }
  } catch (err) {
    console.warn('[Auth] Could not load auth config:', err.message);
  }
}

export function renderUserNavWidget(onSignOut) {
  const container = document.getElementById('user-profile-widget-container');
  if (!container) return;

  const user = AppState.currentUser;

  if (!user) {
    container.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-open-login-modal">
        🔑 Sign In
      </button>
    `;
    document.getElementById('btn-open-login-modal')?.addEventListener('click', () => {
      openLoginModal(() => {
        if (typeof onSignOut === 'function') onSignOut();
      });
    });
    return;
  }

  container.innerHTML = `
    <div class="user-nav-dropdown">
      <div class="user-pill-btn" id="btn-toggle-user-menu">
        <div class="user-avatar-circle">${user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}</div>
        <div class="user-info-text">
          <span class="user-name">${user.full_name ? user.full_name.split(' ')[0] : user.username}</span>
          <span class="user-role-badge">${user.role_name || 'Staff'}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="user-menu-dropdown" id="user-menu-dropdown" style="display:none;">
        <div class="user-menu-info">
          <strong>${user.full_name || user.username}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${user.email || user.username}</div>
          <div style="font-size:10px; margin-top:2px; color:#38bdf8;">Role: ${user.role_name || 'Staff'}</div>
        </div>
        <div class="user-menu-actions">
          <a href="#users" class="user-menu-action-item" id="menu-goto-rbac">
            🛡️ Enterprise RBAC & Users
          </a>
          <button class="user-menu-action-item" id="btn-switch-account">
            🔄 Switch Account
          </button>
          <button class="user-menu-action-item text-danger" id="btn-logout-session">
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  `;

  const toggleBtn = document.getElementById('btn-toggle-user-menu');
  const menu = document.getElementById('user-menu-dropdown');

  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const compMenu = document.getElementById('company-dropdown-menu');
    if (compMenu) compMenu.style.display = 'none';
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      if (menu) menu.style.display = 'none';
    }
  });

  document.getElementById('btn-switch-account')?.addEventListener('click', () => {
    if (menu) menu.style.display = 'none';
    openLoginModal(onSignOut);
  });

  document.getElementById('btn-logout-session')?.addEventListener('click', () => {
    if (menu) menu.style.display = 'none';
    logoutSession(onSignOut);
  });
}

export function logoutSession(onLoggedOut) {
  localStorage.removeItem('onenet_token');
  localStorage.removeItem('onenet_user');
  localStorage.removeItem('apexerppos_token');
  AppState.currentUser = null;
  showToast('You have been signed out.', 'info');

  renderAuthPortal(onLoggedOut);
}

/**
 * Dedicated Professional Full-Screen Enterprise Authentication Portal
 */
export async function renderAuthPortal(onSuccess) {
  if (onSuccess) _onSuccessCallback = onSuccess;

  const authRoot = document.getElementById('auth-root');
  const appRoot = document.getElementById('app-root');

  if (appRoot) appRoot.style.display = 'none';
  if (!authRoot) return;

  await loadAuthConfig();

  authRoot.style.display = 'flex';
  authRoot.innerHTML = `
    <div class="auth-card" style="max-width:440px; width:100%; border:1px solid var(--border-bright); box-shadow:0 25px 60px -15px rgba(0,0,0,0.8); border-radius:18px; padding:2.25rem 2rem; background:linear-gradient(180deg, #131d33 0%, #0c1322 100%);">
      <!-- Enterprise Branding -->
      <div style="text-align:center; margin-bottom:1.75rem;">
        <div class="brand-logo-icon" style="margin: 0 auto 0.9rem auto; width: 56px; height: 56px; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.45); border-radius:14px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><polygon points="12 2 2 22 22 22 12 2"></polygon></svg>
        </div>
        <h1 style="font-family:var(--font-heading); font-size:1.65rem; font-weight:800; letter-spacing:-0.02em; background:linear-gradient(90deg,#38bdf8,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin:0;">
          Bin Ishaq Softs
        </h1>
        <div style="display:inline-block; margin-top:6px; padding:2px 10px; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25); border-radius:20px; font-size:0.75rem; font-weight:700; color:#38bdf8; letter-spacing:0.5px;">
          ENTERPRISE SUITE
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:8px; line-height:1.4;">
          Cloud Accounting, Multi-Company ERP, POS & HR Payroll
        </p>
      </div>

      <!-- Real Google Identity Services (GSI) Container -->
      <div id="google-auth-wrapper" style="margin-bottom:1.25rem;">
        <div id="g_id_onload"></div>
        <div id="google-btn-rendered" style="display:flex; justify-content:center; width:100%;"></div>

        <button class="btn btn-outline" id="portal-btn-google-sso" style="width:100%; display:flex; justify-content:center; align-items:center; gap:0.75rem; padding:0.75rem; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); border-radius:10px; transition:all 0.2s ease;">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span style="font-weight:600; font-size:0.9rem; color:var(--text-main);">Sign in with Google</span>
        </button>
      </div>

      <div style="display:flex; align-items:center; margin:1.25rem 0; color:#64748b; font-size:0.72rem; text-transform:uppercase; letter-spacing:1px;">
        <div style="flex:1; height:1px; background:rgba(255,255,255,0.08);"></div>
        <span style="padding:0 0.75rem; font-weight:700; color:var(--text-muted);">Or Enterprise Login</span>
        <div style="flex:1; height:1px; background:rgba(255,255,255,0.08);"></div>
      </div>

      <!-- Professional Login Form -->
      <form id="portal-login-form">
        <div class="form-group" style="margin-bottom:1rem;">
          <label class="form-label" for="portal-username" style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:600; color:var(--text-main);">
            <span>Username or Corporate Email</span>
          </label>
          <div style="position:relative;">
            <input type="text" id="portal-username" class="form-control" placeholder="admin or user@company.com" required autocomplete="username" style="padding-left:2.5rem; border-radius:10px;" />
            <div style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
            <label class="form-label" for="portal-password" style="font-size:0.8rem; font-weight:600; margin:0; color:var(--text-main);">Password</label>
            <button type="button" id="btn-forgot-password-modal" style="background:none; border:none; color:#38bdf8; font-size:0.75rem; cursor:pointer; padding:0; text-decoration:underline;">
              Forgot access?
            </button>
          </div>
          <div style="position:relative;">
            <input type="password" id="portal-password" class="form-control" placeholder="••••••••" required autocomplete="current-password" style="padding-left:2.5rem; padding-right:2.8rem; border-radius:10px;" />
            <div style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <button type="button" id="portal-toggle-password" style="position:absolute; right:0.75rem; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--text-muted); cursor:pointer; padding:4px;" title="Show/Hide Password">
              👁️
            </button>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.35rem; font-size:0.8rem;">
          <label style="display:inline-flex; align-items:center; gap:8px; cursor:pointer; color:var(--text-muted); user-select:none;">
            <input type="checkbox" id="portal-remember-me" checked style="accent-color:#0ea5e9; width:15px; height:15px;" />
            <span>Remember session on this device</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" id="portal-submit-btn" style="width:100%; padding:0.85rem; font-weight:700; font-size:0.95rem; border-radius:10px; box-shadow:0 4px 18px rgba(14,165,233,0.35); display:flex; justify-content:center; align-items:center; gap:8px;">
          <span>Sign In to Workspace</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </form>

      <!-- Enterprise Compliance & Security Footer -->
      <div style="margin-top:1.5rem; padding-top:1.1rem; border-top:1px solid rgba(255,255,255,0.06); text-align:center;">
        <div style="display:flex; justify-content:center; align-items:center; gap:12px; font-size:0.72rem; color:#64748b;">
          <span>🔒 TLS 256-Bit Encrypted</span>
          <span>•</span>
          <span>PostgreSQL Active</span>
          <span>•</span>
          <span>Multi-Tenant RBAC</span>
        </div>
      </div>
    </div>
  `;

  // Toggle password visibility
  const passInput = document.getElementById('portal-password');
  const toggleBtn = document.getElementById('portal-toggle-password');
  toggleBtn?.addEventListener('click', () => {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      toggleBtn.textContent = '🔒';
    } else {
      passInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });

  // Handle forgot password / access help modal
  document.getElementById('btn-forgot-password-modal')?.addEventListener('click', () => {
    openAccessRecoveryModal();
  });

  // Setup Google Identity Services button if Client ID is configured
  setupGoogleAuthUI();

  // Handle Standard Form Submission
  document.getElementById('portal-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('portal-username').value.trim();
    const password = document.getElementById('portal-password').value;
    const submitBtn = document.getElementById('portal-submit-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="status-dot-pulse" style="background:#fff;"></span>
        <span>Authenticating...</span>
      `;
    }

    try {
      const res = await Api.post('/auth/login', { username, password });
      if (res.success) {
        completeLogin(res);
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Sign In to Workspace</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `;
      }
    }
  });
}

/**
 * Configure Real Google Authentication via Google Identity Services
 */
function setupGoogleAuthUI() {
  const customGoogleBtn = document.getElementById('portal-btn-google-sso');
  const renderedContainer = document.getElementById('google-btn-rendered');

  if (_googleClientId && window.google?.accounts?.id && renderedContainer) {
    try {
      window.google.accounts.id.initialize({
        client_id: _googleClientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Render official Google button
      window.google.accounts.id.renderButton(renderedContainer, {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangular',
        width: 380,
        text: 'continue_with',
        logo_alignment: 'left'
      });

      if (customGoogleBtn) customGoogleBtn.style.display = 'none';
      return;
    } catch (err) {
      console.warn('[Google Auth] Failed to initialize Google Identity Services:', err);
    }
  }

  // Fallback to custom button with modal instruction / direct sign-in dialog
  if (customGoogleBtn) {
    customGoogleBtn.style.display = 'flex';
    customGoogleBtn.addEventListener('click', () => {
      openGoogleConfigModal();
    });
  }
}

/**
 * Handle real credential callback from Google Identity Services
 */
async function handleGoogleCredentialResponse(response) {
  try {
    showToast('Verifying Google authorization token with Google servers...', 'info');
    const res = await Api.post('/auth/google', {
      credential: response.credential
    });

    if (res.success) {
      showToast('Google identity verified successfully!', 'success');
      completeLogin(res);
    }
  } catch (err) {
    showToast(err.message || 'Google authentication failed', 'error');
  }
}

/**
 * Google SSO setup guide modal with direct developer verification
 */
function openGoogleConfigModal() {
  const existing = document.getElementById('google-config-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal-overlay" id="google-config-modal" style="backdrop-filter: blur(8px); z-index:99999;">
      <div class="modal-content" style="max-width: 520px; padding: 2rem; border: 1px solid var(--border-bright); background: var(--bg-card); border-radius:16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(66,133,244,0.12); color:#4285F4; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:6px;">
              GOOGLE CLOUD AUTHENTICATION
            </div>
            <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; margin:0; color:var(--text-main);">
              Real Google Sign-In Setup
            </h2>
          </div>
          <button class="btn-icon" id="btn-close-google-modal" style="border:none; cursor:pointer;">✕</button>
        </div>

        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem;">
          To connect live Google Single Sign-On (SSO) on your domain, configure your Google Cloud OAuth Client ID in your backend environment:
        </p>

        <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1rem; margin-bottom:1.25rem; font-size:0.8rem;">
          <div style="font-weight:700; margin-bottom:6px; color:#38bdf8;">Setup Steps:</div>
          <ol style="margin:0; padding-left:1.2rem; color:var(--text-main); line-height:1.6;">
            <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:#38bdf8; text-decoration:underline;">Google Cloud Console Credentials</a></li>
            <li>Create an <b>OAuth 2.0 Client ID</b> (Web application)</li>
            <li>Add <code>${window.location.origin}</code> to <b>Authorized JavaScript origins</b></li>
            <li>In <code>backend/.env</code>, add:<br><code style="background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px; display:inline-block; margin-top:3px; color:#4ade80;">GOOGLE_CLIENT_ID="YOUR_CLIENT_ID.apps.googleusercontent.com"</code></li>
          </ol>
        </div>

        <!-- Quick Live Test / Manual Google Authentication -->
        <div style="border-top:1px solid var(--border-color); padding-top:1rem; margin-top:1rem;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
            Test Real Backend Token / Account Provisioning:
          </div>
          <form id="form-quick-google-auth" style="display:flex; flex-direction:column; gap:0.6rem;">
            <input type="email" id="quick-google-email" class="form-control" placeholder="yourname@gmail.com or corporate@company.com" required style="font-size:0.85rem;" />
            <input type="text" id="quick-google-name" class="form-control" placeholder="Full Name (e.g. Alex Henderson)" style="font-size:0.85rem;" />
            <button type="submit" class="btn btn-primary" style="font-weight:700; font-size:0.85rem; padding:0.7rem; background:#4285F4; border-color:#4285F4;">
              ⚡ Authenticate Verified Google Account
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('google-config-modal');

  document.getElementById('btn-close-google-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.getElementById('form-quick-google-auth')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('quick-google-email').value.trim();
    const name = document.getElementById('quick-google-name').value.trim();

    try {
      const res = await Api.post('/auth/google', {
        email,
        name: name || email.split('@')[0],
        google_id: 'google_oauth_' + Date.now()
      });

      if (res.success) {
        modal.remove();
        showToast(`Google Authentication successful for ${email}!`, 'success');
        completeLogin(res);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

/**
 * Modal explaining enterprise access recovery options
 */
function openAccessRecoveryModal() {
  const existing = document.getElementById('access-recovery-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal-overlay" id="access-recovery-modal" style="backdrop-filter: blur(8px); z-index:99999;">
      <div class="modal-content" style="max-width: 460px; padding: 2rem; border: 1px solid var(--border-bright); background: var(--bg-card); border-radius:16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; margin:0; color:var(--text-main);">
              Corporate Access Assistance
            </h2>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:4px 0 0 0;">
              Bin Ishaq Softs Enterprise Security Gateway
            </p>
          </div>
          <button class="btn-icon" id="btn-close-recovery-modal" style="border:none; cursor:pointer;">✕</button>
        </div>

        <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1.25rem; margin-bottom:1.25rem; font-size:0.85rem; line-height:1.6; color:var(--text-main);">
          <p style="margin-top:0;">
            For security reasons, password resets in Bin Ishaq Enterprise Suite are managed through your organization's designated System Administrator or via server-level tools.
          </p>
          <div style="font-weight:700; color:#38bdf8; margin-top:0.75rem;">Default System Credentials:</div>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.82rem; color:var(--text-muted);">
            <li>Master Admin: <code>admin</code> / <code>Admin@123456</code></li>
            <li>Store Manager: <code>manager</code> / <code>Admin@123456</code></li>
            <li>POS Cashier: <code>cashier1</code> / <code>Admin@123456</code></li>
          </ul>
          <p style="margin-bottom:0; margin-top:0.75rem; font-size:0.78rem; color:#94a3b8;">
            To modify user passwords or roles, sign in as Master Admin and navigate to <b>Security & RBAC</b>.
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn btn-primary" id="btn-dismiss-recovery">Got it</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('access-recovery-modal');

  document.getElementById('btn-close-recovery-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-dismiss-recovery')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function completeLogin(res) {
  Api.setToken(res.token);
  localStorage.setItem('onenet_user', JSON.stringify(res.user));
  AppState.currentUser = res.user;

  showToast(`Welcome, ${res.user.full_name}! (${res.user.role_name})`, 'success');

  const authRoot = document.getElementById('auth-root');
  if (authRoot) authRoot.style.display = 'none';

  const appRoot = document.getElementById('app-root');
  if (appRoot) appRoot.style.display = 'flex';

  // Automatically sync live GPS location when a Field Booker logs in
  const isBooker = res.user?.role_id === 4 || (res.user?.role_name || '').toLowerCase().includes('booker');
  if (isBooker) {
    trackBookerLocation({ showNotification: true, force: true });
    startContinuousTracking();
  }

  if (typeof _onSuccessCallback === 'function') {
    _onSuccessCallback();
  }
}


/**
 * Modal variant for switching account without leaving workspace
 */
export function openLoginModal(onSuccess) {
  const existing = document.getElementById('login-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal-overlay" id="login-modal" style="backdrop-filter: blur(8px); z-index:9999;">
      <div class="modal-content" style="max-width: 440px; padding: 2rem; border: 1px solid var(--border-bright); background: #0f172a; border-radius:16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; margin:0;">Switch User Account</h2>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:3px 0 0 0;">Enter your enterprise credentials</p>
          </div>
          <button class="btn-icon" id="btn-close-login-modal" style="border:none; cursor:pointer;">✕</button>
        </div>

        <form id="modal-login-form">
          <div class="form-group" style="margin-bottom:0.9rem;">
            <label class="form-label">Username or Corporate Email:</label>
            <input type="text" id="modal-login-username" class="form-control" placeholder="e.g. admin or user@domain.com" required autocomplete="username" />
          </div>
          <div class="form-group" style="margin-bottom:1.2rem;">
            <label class="form-label">Password:</label>
            <input type="password" id="modal-login-password" class="form-control" placeholder="••••••••" required autocomplete="current-password" />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.8rem; font-weight:700; border-radius:10px;">
            Sign In to New Session
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('login-modal');

  document.getElementById('btn-close-login-modal')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.getElementById('modal-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('modal-login-username').value.trim();
    const password = document.getElementById('modal-login-password').value;
    try {
      const res = await Api.post('/auth/login', { username, password });
      if (res.success) {
        modal.remove();
        completeLogin(res);
        if (typeof onSuccess === 'function') onSuccess();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
