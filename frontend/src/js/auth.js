import { AppState, showToast } from './state.js';
import { Api } from './api.js';

export function renderUserNavWidget() {
  const container = document.getElementById('user-profile-widget-container');
  if (!container) return;

  const user = AppState.currentUser;

  if (!user) {
    container.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-open-login-modal">
        🔑 Sign In
      </button>
    `;
    document.getElementById('btn-open-login-modal')?.addEventListener('click', openLoginModal);
    return;
  }

  container.innerHTML = `
    <div class="user-nav-dropdown">
      <div class="user-pill-btn" id="btn-toggle-user-menu">
        <div class="user-avatar-circle">${user.full_name.charAt(0)}</div>
        <div class="user-info-text">
          <span class="user-name">${user.full_name.split(' ')[0]}</span>
          <span class="user-role-badge">${user.role_name}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="user-menu-dropdown" id="user-menu-dropdown" style="display:none;">
        <div class="user-menu-info">
          <strong>${user.full_name}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${user.email || user.username}</div>
          <div style="font-size:10px; margin-top:2px; color:#38bdf8;">Role: ${user.role_name}</div>
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
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      if (menu) menu.style.display = 'none';
    }
  });

  document.getElementById('btn-switch-account')?.addEventListener('click', () => {
    if (menu) menu.style.display = 'none';
    openLoginModal();
  });

  document.getElementById('btn-logout-session')?.addEventListener('click', () => {
    localStorage.removeItem('onenet_token');
    localStorage.removeItem('onenet_user');
    AppState.currentUser = null;
    showToast('Signed out successfully', 'info');
    renderUserNavWidget();
    openLoginModal();
  });
}

export function openLoginModal() {
  const existing = document.getElementById('login-modal');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="modal-overlay" id="login-modal" style="backdrop-filter: blur(8px);">
      <div class="modal-content" style="max-width: 440px; padding: 2rem; border: 1px solid var(--border-bright); background: rgba(15, 23, 42, 0.95); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="text-align:center; margin-bottom:1.5rem;">
          <div class="brand-logo-icon" style="margin: 0 auto 0.75rem auto; width: 48px; height: 48px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><polygon points="12 2 2 22 22 22 12 2"></polygon></svg>
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; color:#fff; margin:0;">OneNet Solutions</h2>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">Enterprise Suite • Sign In to Your Station</p>
        </div>

        <!-- Google OAuth One-Click SSO Simulation -->
        <button class="btn btn-outline" id="btn-google-sso" style="width:100%; display:flex; justify-content:center; align-items:center; gap:0.75rem; padding:0.75rem; background:rgba(255,255,255,0.05); margin-bottom:1.25rem;">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span style="font-weight:600; font-size:0.9rem;">Continue with Google SSO</span>
        </button>

        <div style="display:flex; align-items:center; margin:1rem 0; color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">
          <div style="flex:1; height:1px; background:var(--border-color);"></div>
          <span style="padding:0 0.75rem;">Or Database Credentials</span>
          <div style="flex:1; height:1px; background:var(--border-color);"></div>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label">Username or Email:</label>
            <input type="text" id="login-username" class="form-control" value="admin" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password:</label>
            <input type="password" id="login-password" class="form-control" value="Admin@123456" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.85rem; font-weight:700; margin-top:0.75rem;">
            Sign In to Enterprise
          </button>
        </form>

        <!-- Fast Role Switcher Shortcuts -->
        <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.5rem; text-align:center;">Fast Demo Stations:</div>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.4rem;">
            <button class="btn btn-outline btn-xs demo-role-btn" data-user="admin" data-role="Super Admin">👑 Super Admin</button>
            <button class="btn btn-outline btn-xs demo-role-btn" data-user="cashier1" data-role="Cashier">⚡ POS Cashier</button>
            <button class="btn btn-outline btn-xs demo-role-btn" data-user="manager" data-role="Store Manager">📦 Store Manager</button>
            <button class="btn btn-outline btn-xs demo-role-btn" data-user="booker1" data-role="Field Sales Booker">📱 Field Booker</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('login-modal');

  // Handle standard submit
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    try {
      const res = await Api.post('/auth/login', { username, password });
      if (res.success) {
        handleAuthSuccess(res);
        modal.remove();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Handle Google SSO
  document.getElementById('btn-google-sso')?.addEventListener('click', async () => {
    try {
      const res = await Api.post('/auth/google', {
        email: 'director@onenetsolutions.com',
        name: 'Enterprise Executive (Google SSO)',
        google_id: 'goog-123456'
      });
      if (res.success) {
        showToast('Google Enterprise SSO Authentication Verified!', 'success');
        handleAuthSuccess(res);
        modal.remove();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Handle Fast Demo Role Clicks
  modal.querySelectorAll('.demo-role-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const u = btn.dataset.user;
      try {
        const res = await Api.post('/auth/login', { username: u, password: 'Admin@123456' });
        if (res.success) {
          handleAuthSuccess(res);
          modal.remove();
        }
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });
}

function handleAuthSuccess(res) {
  localStorage.setItem('onenet_token', res.token);
  localStorage.setItem('onenet_user', JSON.stringify(res.user));
  AppState.currentUser = res.user;
  showToast(`Welcome back, ${res.user.full_name}! (${res.user.role_name})`, 'success');
  renderUserNavWidget();
}
