export const AppState = {
  currentUser: JSON.parse(localStorage.getItem('onenet_user') || 'null'),
  activeCompany: JSON.parse(localStorage.getItem('onenet_active_company') || 'null') || {
    id: 1,
    name: 'OneNet Solutions',
    legal_name: 'OneNet Solutions Enterprise Suite (Head Office)',
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
  const role = AppState.currentUser.role_name || 'Cashier';
  if (role === 'Super Admin') return true;
  const matrix = AppState.permissionsMatrix[role];
  if (!matrix) return true; // default permit if not loaded yet
  const modulePerms = matrix[module] || [];
  return modulePerms.includes(action);
}

export function formatCurrency(amount) {
  const val = Number(amount) || 0;
  return 'Rs. ' + val.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
