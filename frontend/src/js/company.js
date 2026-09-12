import { AppState, showToast } from './state.js';
import { Api } from './api.js';

export async function initCompanyContext() {
  try {
    const res = await Api.get('/companies');
    if (res.success && res.companies.length > 0) {
      AppState.companies = res.companies;
      // If no active company or active not in list, pick first assigned or first company
      const assigned = AppState.currentUser?.assigned_companies || [1];
      const found = res.companies.find(c => c.id === AppState.activeCompany?.id && assigned.includes(c.id));
      if (found) {
        AppState.activeCompany = found;
      } else {
        AppState.activeCompany = res.companies.find(c => assigned.includes(c.id)) || res.companies[0];
      }
      localStorage.setItem('onenet_active_company', JSON.stringify(AppState.activeCompany));
    }
  } catch (err) {
    console.warn('Could not fetch companies:', err);
  }
  renderCompanySwitcher();
}

export function renderCompanySwitcher() {
  const container = document.getElementById('company-switcher-container');
  if (!container) return;

  const current = AppState.activeCompany || { id: 1, name: 'OneNet Solutions' };
  const assigned = AppState.currentUser?.assigned_companies || [1, 2, 3];
  const accessibleCompanies = AppState.companies.filter(c => assigned.includes(c.id));

  container.innerHTML = `
    <div class="company-dropdown-wrapper">
      <div class="company-badge-btn" id="btn-toggle-company-menu" title="Switch Company Context">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-4"></path><path d="M9 9h1"></path><path d="M9 13h1"></path><path d="M9 17h1"></path></svg>
        <span class="active-comp-name">${current.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="company-dropdown-menu" id="company-dropdown-menu" style="display:none;">
        <div class="company-menu-header">
          <span>Active Company Context</span>
          <button class="btn-xs btn-outline" id="btn-edit-active-company" title="Edit Company Settings">✏️ Settings</button>
        </div>
        <div class="company-list-items">
          ${accessibleCompanies.map(c => `
            <div class="company-menu-item ${c.id === current.id ? 'active' : ''}" data-id="${c.id}">
              <div class="company-item-title">${c.name}</div>
              <div class="company-item-city">${c.city} | ${c.tax_id || 'NTN Active'}</div>
            </div>
          `).join('')}
        </div>
        ${AppState.currentUser?.role_name === 'Super Admin' ? `
          <div class="company-menu-footer">
            <button class="btn btn-xs btn-primary" id="btn-create-company-modal" style="width:100%;">+ Add New Company Branch</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  const toggleBtn = document.getElementById('btn-toggle-company-menu');
  const menu = document.getElementById('company-dropdown-menu');

  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      if (menu) menu.style.display = 'none';
    }
  });

  menu?.querySelectorAll('.company-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const cid = parseInt(item.dataset.id);
      const target = AppState.companies.find(c => c.id === cid);
      if (target) {
        AppState.activeCompany = target;
        localStorage.setItem('onenet_active_company', JSON.stringify(target));
        showToast(`Switched active company to: ${target.name}`, 'success');
        renderCompanySwitcher();
      }
    });
  });

  document.getElementById('btn-edit-active-company')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu) menu.style.display = 'none';
    openEditCompanyModal(AppState.activeCompany);
  });

  document.getElementById('btn-create-company-modal')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu) menu.style.display = 'none';
    openCreateCompanyModal();
  });
}

export function openEditCompanyModal(comp) {
  const modalHtml = `
    <div class="modal-overlay" id="company-edit-modal">
      <div class="modal-content" style="max-width: 580px;">
        <div class="modal-header">
          <h3 class="modal-title">Company Profile & Invoicing Branding</h3>
          <button class="btn-icon btn-sm" id="btn-close-comp-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Company Brand Display Name:</label>
            <input type="text" id="comp-name" class="form-control" value="${comp.name || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Full Legal Entity Name:</label>
            <input type="text" id="comp-legal-name" class="form-control" value="${comp.legal_name || ''}" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">NTN / Tax Registration ID:</label>
              <input type="text" id="comp-tax-id" class="form-control" value="${comp.tax_id || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sales Tax STRN:</label>
              <input type="text" id="comp-strn" class="form-control" value="${comp.strn || ''}" />
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Official Phone:</label>
              <input type="text" id="comp-phone" class="form-control" value="${comp.phone || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Official Email:</label>
              <input type="email" id="comp-email" class="form-control" value="${comp.email || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Business Address (Printed on Invoices & Thermal Slips):</label>
            <input type="text" id="comp-address" class="form-control" value="${comp.address || ''}" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">City:</label>
              <input type="text" id="comp-city" class="form-control" value="${comp.city || 'Lahore'}" />
            </div>
            <div class="form-group">
              <label class="form-label">Base Currency:</label>
              <input type="text" id="comp-curr" class="form-control" value="${comp.currency || 'PKR'}" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-comp">Cancel</button>
          <button class="btn btn-primary" id="btn-save-comp">Save Changes</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('company-edit-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-comp-modal')?.addEventListener('click', close);
  document.getElementById('btn-cancel-comp')?.addEventListener('click', close);

  document.getElementById('btn-save-comp')?.addEventListener('click', async () => {
    const payload = {
      name: document.getElementById('comp-name').value.trim(),
      legal_name: document.getElementById('comp-legal-name').value.trim(),
      tax_id: document.getElementById('comp-tax-id').value.trim(),
      strn: document.getElementById('comp-strn').value.trim(),
      phone: document.getElementById('comp-phone').value.trim(),
      email: document.getElementById('comp-email').value.trim(),
      address: document.getElementById('comp-address').value.trim(),
      city: document.getElementById('comp-city').value.trim(),
      currency: document.getElementById('comp-curr').value.trim()
    };

    try {
      const res = await Api.put(`/companies/${comp.id}`, payload);
      if (res.success) {
        showToast('Company profile updated successfully!', 'success');
        Object.assign(comp, payload);
        localStorage.setItem('onenet_active_company', JSON.stringify(comp));
        renderCompanySwitcher();
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

export function openCreateCompanyModal() {
  const modalHtml = `
    <div class="modal-overlay" id="company-create-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Register New Company / Branch</h3>
          <button class="btn-icon btn-sm" id="btn-close-create-comp">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Company / Branch Name:</label>
            <input type="text" id="new-comp-name" class="form-control" placeholder="e.g. OneNet Solutions Multan" required />
          </div>
          <div class="form-group">
            <label class="form-label">Legal Name:</label>
            <input type="text" id="new-comp-legal" class="form-control" placeholder="e.g. OneNet Multan Regional Branch Ltd" />
          </div>
          <div class="form-group">
            <label class="form-label">City:</label>
            <input type="text" id="new-comp-city" class="form-control" placeholder="e.g. Multan" />
          </div>
          <div class="form-group">
            <label class="form-label">Address:</label>
            <input type="text" id="new-comp-address" class="form-control" placeholder="e.g. Mall Plaza, Cantt" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-create-comp">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-create-comp">Create Branch</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('company-create-modal');
  const close = () => modal?.remove();
  document.getElementById('btn-close-create-comp')?.addEventListener('click', close);
  document.getElementById('btn-cancel-create-comp')?.addEventListener('click', close);

  document.getElementById('btn-confirm-create-comp')?.addEventListener('click', async () => {
    const name = document.getElementById('new-comp-name').value.trim();
    if (!name) {
      showToast('Company name is required', 'error');
      return;
    }

    try {
      const res = await Api.post('/companies', {
        name,
        legal_name: document.getElementById('new-comp-legal').value.trim(),
        city: document.getElementById('new-comp-city').value.trim(),
        address: document.getElementById('new-comp-address').value.trim()
      });

      if (res.success) {
        showToast(`Created branch: ${res.company.name}`, 'success');
        AppState.companies.push(res.company);
        if (AppState.currentUser) {
          AppState.currentUser.assigned_companies.push(res.company.id);
        }
        renderCompanySwitcher();
        close();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
