export const AppState = {
  currentUser: JSON.parse(localStorage.getItem('onenet_user') || 'null'),
  activeCompany: JSON.parse(localStorage.getItem('onenet_active_company') || 'null') || {
    id: 1,
    name: 'Bin Ishaq Softs',
    legal_name: 'Bin Ishaq Softs Enterprise Suite (Head Office)',
    address: 'Muslim Town, Lahore, Pakistan',
    phone: '+92 42 30000001',
    tax_id: 'NTN-7492019-2',
    strn: 'STRN-11-22-3344-555',
    currency: 'PKR'
  },
  companies: [],
  permissionsMatrix: {},
  activeModule: 'dashboard', // dashboard, pos, inventory, sales, accounting, manufacturing, mobile_booker, payroll, reports, users, backup
  products: [],
  categories: [],
  warehouses: [],
  customers: [],
  activeShift: null,

  // POS State
  posCart: {
    items: [],
    customerId: 1,
    discountAmount: 0,
    paymentMethod: 'CASH',
    paidAmount: 0
  },

  // Field Sales Mobile Booker State
  mobileCart: {
    items: [],
    customerId: 2,
    geoLat: null,
    geoLng: null
  }
};

export function hasPermission(module, action = 'view') {
  if (!AppState.currentUser) return false;
  const rawRole = String(AppState.currentUser.role_name || '').trim();
  const roleLower = rawRole.toLowerCase();

  // Super Admin / Admin roles have unrestricted master permissions
  if (
    roleLower === 'super admin' ||
    roleLower === 'admin' ||
    roleLower === 'administrator' ||
    AppState.currentUser.role_id === 1
  ) {
    return true;
  }

  // Find matching role in permissionsMatrix (case-insensitive with common aliases)
  const matrixKeys = Object.keys(AppState.permissionsMatrix || {});
  const matchedRoleKey =
    matrixKeys.find(k => k.toLowerCase() === roleLower) ||
    matrixKeys.find(k => {
      const kl = k.toLowerCase();
      if (roleLower.includes('manager') && kl.includes('manager')) return true;
      if (roleLower.includes('cashier') && kl.includes('cashier')) return true;
      if (roleLower.includes('booker') && kl.includes('booker')) return true;
      if (roleLower.includes('accountant') && kl.includes('accountant')) return true;
      return false;
    });

  const matrix = matchedRoleKey ? AppState.permissionsMatrix[matchedRoleKey] : null;
  if (!matrix) {
    // Safe role-based defaults if matrix is empty or role not yet mapped
    if (roleLower.includes('manager')) {
      return ['dashboard', 'pos', 'inventory', 'sales', 'reports'].includes(module);
    }
    if (roleLower.includes('cashier')) {
      if (module === 'pos') return true;
      if (module === 'sales' && action === 'view') return true;
      return false;
    }
    if (roleLower.includes('booker')) {
      if (module === 'mobile_booker') return true;
      if (module === 'inventory' && action === 'view') return true;
      return false;
    }
    if (roleLower.includes('accountant')) {
      return ['dashboard', 'accounting', 'sales', 'inventory', 'reports'].includes(module);
    }
    return false;
  }

  const modulePerms = matrix[module] || [];
  return modulePerms.includes(action);
}

export function formatCurrency(amount) {
  const val = Number(amount) || 0;
  return 'Rs. ' + val.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Track active and recent toasts for intelligent throttling and de-duplication
const _recentToastCache = new Map();
const MAX_CONCURRENT_TOASTS = 3;

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container || !message) return;

  const now = Date.now();
  // De-duplicate identical messages within 4 seconds
  const lastSeen = _recentToastCache.get(message);
  if (lastSeen && (now - lastSeen) < 4000) {
    return;
  }
  _recentToastCache.set(message, now);

  // Clean stale entries from cache
  if (_recentToastCache.size > 25) {
    for (const [msg, ts] of _recentToastCache.entries()) {
      if (now - ts > 10000) _recentToastCache.delete(msg);
    }
  }

  // Prevent UI flooding by removing older toasts when max threshold reached
  while (container.children.length >= MAX_CONCURRENT_TOASTS) {
    container.firstElementChild.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span style="flex:1; line-height:1.35;">${message}</span>
    <button class="toast-dismiss-btn" style="background:transparent; border:none; color:inherit; opacity:0.6; cursor:pointer; font-size:14px; padding:0 0 0 8px; line-height:1;" title="Dismiss">✕</button>
  `;

  const dismiss = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  };

  toast.querySelector('.toast-dismiss-btn')?.addEventListener('click', dismiss);

  container.appendChild(toast);
  setTimeout(dismiss, 3200);
}
