export const AppState = {
  currentUser: {
    id: 1,
    username: 'admin',
    full_name: 'System Administrator',
    role_name: 'Super Admin'
  },
  activeModule: 'dashboard', // dashboard, pos, inventory, sales, accounting, manufacturing, mobile_booker
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
