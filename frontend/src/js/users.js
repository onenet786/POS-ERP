import { AppState, showToast } from './state.js';
import { Api } from './api.js';

let systemUsers = [];
let permissionsMatrix = {};

const MODULES_LIST = [
  { key: 'pos', name: '⚡ Point of Sale (POS)' },
  { key: 'inventory', name: '📦 Inventory & Warehouses' },
  { key: 'sales', name: '🧾 Sales & E-Invoicing' },
  { key: 'accounting', name: '📚 Accounting & Ledgers' },
  { key: 'manufacturing', name: '⚙️ Manufacturing & BOM' },
  { key: 'mobile_booker', name: '📱 Mobile Order Booker' },
  { key: 'payroll', name: '👥 HR, Attendance & Payroll' },
  { key: 'reports', name: '📊 Enterprise Reports' },
  { key: 'backup', name: '💾 Database Backup & Restore' },
  { key: 'users', name: '🛡️ User Accounts & Security' }
];

const ACTIONS_LIST = ['view', 'create', 'edit', 'delete', 'approve', 'export'];

export async function renderUsersView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Enterprise Security & RBAC</h1>
        <p class="page-subtitle">User Accounts, Company Grants & Customizable Module Permissions Matrix</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-save-matrix">
          💾 Save Permissions Matrix
        </button>
        <button class="btn btn-primary" id="btn-create-user-modal">
          + Add New User Account
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active users-tab-btn" data-tab="accounts">User Accounts & Roles</button>
      <button class="btn btn-outline btn-sm users-tab-btn" data-tab="matrix">Module Permissions Matrix</button>
    </div>

    <div id="users-tab-content">
      <!-- Loaded dynamically -->
    </div>
  `;

  // Fetch users & permissions
  try {
    const [usersRes, matrixRes] = await Promise.all([
      Api.get('/users'),
      Api.get('/users/permissions/matrix')
    ]);

    if (usersRes.success) systemUsers = usersRes.users;
    if (matrixRes.success) {
      permissionsMatrix = matrixRes.matrix;
      AppState.permissionsMatrix = matrixRes.matrix;
    }
  } catch (err) {
    showToast(err.message, 'error');
  }

  const renderTab = (tab) => {
    container.querySelectorAll('.users-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    const content = document.getElementById('users-tab-content');
    if (tab === 'accounts') {
      renderAccountsTab(content);
    } else {
      renderMatrixTab(content);
    }
  };

  container.querySelectorAll('.users-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => renderTab(btn.dataset.tab));
  });

  document.getElementById('btn-create-user-modal')?.addEventListener('click', openCreateUserModal);
  document.getElementById('btn-save-matrix')?.addEventListener('click', savePermissionsMatrix);

  renderTab('accounts');
}

function renderAccountsTab(content) {
  content.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">System User Accounts</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${systemUsers.length} Active Accounts</span>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Assigned Role</th>
              <th>Company Access Grants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${systemUsers.map(u => {
              const companyNames = (u.company_ids || [1]).map(cid => {
                const comp = AppState.companies.find(c => c.id === cid);
                return comp ? comp.name : `Company #${cid}`;
              }).join(', ');

              return `
                <tr>
                  <td><strong>#${u.id}</strong></td>
                  <td><strong>${u.full_name}</strong></td>
                  <td><code>${u.username}</code></td>
                  <td>${u.email}</td>
                  <td><span class="tag tag-info">${u.role_name || 'Cashier'}</span></td>
                  <td><span style="font-size:11px; color:#38bdf8;">${companyNames}</span></td>
                  <td>
                    <span class="tag ${u.is_active ? 'tag-success' : 'tag-danger'}">
                      ${u.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-xs btn-edit-user" data-id="${u.id}">Edit / Access</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  content.querySelectorAll('.btn-edit-user').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = systemUsers.find(x => x.id === parseInt(btn.dataset.id));
      if (u) openEditUserModal(u);
    });
  });
}

function renderMatrixTab(content) {
  const roles = Object.keys(permissionsMatrix);

  content.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Customizable Module Permissions Matrix</h3>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
            Click on any permission tag to grant or revoke specific module privileges per user role.
          </p>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="min-width: 200px;">Module & Feature</th>
              ${roles.map(r => `<th style="text-align:center;">${r}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${MODULES_LIST.map(mod => `
              <tr>
                <td><strong>${mod.name}</strong></td>
                ${roles.map(r => {
                  const perms = permissionsMatrix[r]?.[mod.key] || [];
                  const isSuper = r === 'Super Admin';

                  return `
                    <td style="text-align:center;">
                      <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:3px;">
                        ${ACTIONS_LIST.map(act => {
                          const has = perms.includes(act) || isSuper;
                          return `
                            <span 
                              class="matrix-tag ${has ? 'active' : 'inactive'} ${isSuper ? 'locked' : ''}" 
                              data-role="${r}" 
                              data-mod="${mod.key}" 
                              data-act="${act}"
                              title="${has ? 'Granted: click to revoke' : 'Revoked: click to grant'}"
                            >
                              ${act.slice(0, 3).toUpperCase()}
                            </span>
                          `;
                        }).join('')}
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  content.querySelectorAll('.matrix-tag:not(.locked)').forEach(tag => {
    tag.addEventListener('click', () => {
      const r = tag.dataset.role;
      const m = tag.dataset.mod;
      const a = tag.dataset.act;

      if (!permissionsMatrix[r]) permissionsMatrix[r] = {};
      if (!permissionsMatrix[r][m]) permissionsMatrix[r][m] = [];

      const idx = permissionsMatrix[r][m].indexOf(a);
      if (idx > -1) {
        permissionsMatrix[r][m].splice(idx, 1);
        tag.classList.remove('active');
        tag.classList.add('inactive');
      } else {
        permissionsMatrix[r][m].push(a);
        tag.classList.remove('inactive');
        tag.classList.add('active');
      }
    });
  });
}

async function savePermissionsMatrix() {
  try {
    const res = await Api.put('/users/permissions/matrix', { matrix: permissionsMatrix });
    if (res.success) {
      AppState.permissionsMatrix = permissionsMatrix;
      showToast('Module Permissions Matrix saved successfully!', 'success');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function openCreateUserModal() {
  const modalHtml = `
    <div class="modal-overlay" id="user-create-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Register New User Account</h3>
          <button class="btn-icon btn-sm" id="btn-close-create-user">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name:</label>
            <input type="text" id="new-user-fullname" class="form-control" placeholder="e.g. Asim Raza" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Username:</label>
              <input type="text" id="new-user-name" class="form-control" placeholder="e.g. asim.raza" required />
            </div>
            <div class="form-group">
              <label class="form-label">Role Assignment:</label>
              <select id="new-user-role" class="form-control">
                <option value="Cashier">Cashier</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Senior Accountant">Senior Accountant</option>
                <option value="Field Sales Booker">Field Sales Booker</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Email Address:</label>
              <input type="email" id="new-user-email" class="form-control" placeholder="asim@onenetsolutions.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Login Password:</label>
              <input type="password" id="new-user-pass" class="form-control" placeholder="••••••••" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Granted Companies / Branches:</label>
            <div style="display:flex; flex-direction:column; gap:6px; padding:8px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px;">
              ${AppState.companies.map(c => `
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                  <input type="checkbox" class="chk-new-comp-access" value="${c.id}" checked />
                  <span>${c.name} (${c.city})</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-create-user">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-create-user">Create Account</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('user-create-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-create-user')?.addEventListener('click', close);
  document.getElementById('btn-cancel-create-user')?.addEventListener('click', close);

  document.getElementById('btn-confirm-create-user')?.addEventListener('click', async () => {
    const full_name = document.getElementById('new-user-fullname').value.trim();
    const username = document.getElementById('new-user-name').value.trim();
    const email = document.getElementById('new-user-email').value.trim();
    const password = document.getElementById('new-user-pass').value;
    const role_name = document.getElementById('new-user-role').value;

    const company_ids = [];
    modal.querySelectorAll('.chk-new-comp-access:checked').forEach(chk => {
      company_ids.push(parseInt(chk.value));
    });

    if (!full_name || !username || !email || !password) {
      showToast('All fields are required', 'error');
      return;
    }

    try {
      const res = await Api.post('/users', {
        full_name,
        username,
        email,
        password,
        role_name,
        company_ids
      });

      if (res.success) {
        showToast('User created successfully!', 'success');
        systemUsers.push(res.user);
        renderAccountsTab(document.getElementById('users-tab-content'));
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function openEditUserModal(user) {
  const modalHtml = `
    <div class="modal-overlay" id="user-edit-modal">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header">
          <h3 class="modal-title">Edit User Account: ${user.full_name}</h3>
          <button class="btn-icon btn-sm" id="btn-close-edit-user">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name:</label>
            <input type="text" id="edit-user-fullname" class="form-control" value="${user.full_name || ''}" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Role:</label>
              <select id="edit-user-role" class="form-control">
                <option value="Cashier" ${user.role_name === 'Cashier' ? 'selected' : ''}>Cashier</option>
                <option value="Store Manager" ${user.role_name === 'Store Manager' ? 'selected' : ''}>Store Manager</option>
                <option value="Senior Accountant" ${user.role_name === 'Senior Accountant' ? 'selected' : ''}>Senior Accountant</option>
                <option value="Field Sales Booker" ${user.role_name === 'Field Sales Booker' ? 'selected' : ''}>Field Sales Booker</option>
                <option value="Super Admin" ${user.role_name === 'Super Admin' ? 'selected' : ''}>Super Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Account Status:</label>
              <select id="edit-user-status" class="form-control">
                <option value="true" ${user.is_active ? 'selected' : ''}>Active</option>
                <option value="false" ${!user.is_active ? 'selected' : ''}>Disabled</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Reset Password (leave blank to keep current):</label>
            <input type="password" id="edit-user-pass" class="form-control" placeholder="New Password..." />
          </div>
          <div class="form-group">
            <label class="form-label">Granted Companies / Branches:</label>
            <div style="display:flex; flex-direction:column; gap:6px; padding:8px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px;">
              ${AppState.companies.map(c => {
                const checked = (user.company_ids || [1]).includes(c.id) ? 'checked' : '';
                return `
                  <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" class="chk-edit-comp-access" value="${c.id}" ${checked} />
                    <span>${c.name} (${c.city})</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-edit-user">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-edit-user">Save Changes</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('user-edit-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-edit-user')?.addEventListener('click', close);
  document.getElementById('btn-cancel-edit-user')?.addEventListener('click', close);

  document.getElementById('btn-confirm-edit-user')?.addEventListener('click', async () => {
    const full_name = document.getElementById('edit-user-fullname').value.trim();
    const role_name = document.getElementById('edit-user-role').value;
    const is_active = document.getElementById('edit-user-status').value === 'true';
    const password = document.getElementById('edit-user-pass').value;

    const company_ids = [];
    modal.querySelectorAll('.chk-edit-comp-access:checked').forEach(chk => {
      company_ids.push(parseInt(chk.value));
    });

    try {
      const res = await Api.put(`/users/${user.id}`, {
        full_name,
        role_name,
        is_active,
        password: password || undefined,
        company_ids
      });

      if (res.success) {
        showToast('User account updated successfully!', 'success');
        user.full_name = full_name;
        user.role_name = role_name;
        user.is_active = is_active;
        user.company_ids = company_ids;
        renderAccountsTab(document.getElementById('users-tab-content'));
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
