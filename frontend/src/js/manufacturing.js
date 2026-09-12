import { formatCurrency, showToast } from './state.js';
import { Api } from './api.js';

export async function renderManufacturingView(container) {
  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Manufacturing & BOM Assembly Orders</h1>
        <p class="page-subtitle">Bill of materials (BOM), multi-component assembly, raw material auto-consumption & cost accounting</p>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
      <!-- Recipes List -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Bill of Materials (BOM) Recipes</h3>
          <span class="tag tag-info">Active Formulas</span>
        </div>
        <div id="mfg-recipes-list">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Executed Assembly Orders -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Completed Assembly Job Orders</h3>
          <span class="tag tag-success">Stock Converted</span>
        </div>
        <div id="mfg-orders-list">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  `;

  await loadManufacturingData();
}

async function loadManufacturingData() {
  const recipesContainer = document.getElementById('mfg-recipes-list');
  const ordersContainer = document.getElementById('mfg-orders-list');

  try {
    const [recipesRes, ordersRes] = await Promise.all([
      Api.get('/manufacturing/recipes'),
      Api.get('/manufacturing/orders')
    ]);

    const recipes = recipesRes.recipes || [];
    const orders = ordersRes.orders || [];

    if (recipesContainer) {
      recipesContainer.innerHTML = recipes.map(r => `
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <div>
              <h4 style="font-size:1.05rem; font-weight:700; color:#38bdf8;">${r.recipe_name}</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">Produces: <strong>${r.output_quantity} unit</strong> of ${r.finished_product_name}</p>
            </div>
            <button class="btn btn-primary btn-sm run-assembly-btn" data-recipe-id="${r.id}" data-recipe-name="${r.recipe_name}">
              ⚙️ Execute Assembly
            </button>
          </div>

          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">
            <em>${r.instructions}</em>
          </p>

          <div style="background:rgba(0,0,0,0.25); border-radius:var(--radius-sm); padding:0.75rem;">
            <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">Required Raw Materials:</div>
            ${r.items.map(item => `
              <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:2px 0;">
                <span>• ${item.name}</span>
                <span style="font-family:var(--font-mono); font-weight:600;">${item.required_quantity} units (${formatCurrency(item.unit_cost)}/ea)</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');

      recipesContainer.querySelectorAll('.run-assembly-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const rId = Number(btn.dataset.recipeId);
          const rName = btn.dataset.recipeName;
          openRunAssemblyModal(rId, rName);
        });
      });
    }

    if (ordersContainer) {
      ordersContainer.innerHTML = `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Finished Product</th>
                <th>Units</th>
                <th>Production Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${o.order_number}</td>
                  <td>${o.finished_product_name}</td>
                  <td style="font-weight:700;">${o.produced_quantity} units</td>
                  <td>${formatCurrency(o.total_production_cost)}</td>
                  <td><span class="tag tag-success">${o.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function openRunAssemblyModal(recipeId, recipeName) {
  const modalHtml = `
    <div class="modal-overlay" id="run-asm-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Execute BOM Production Order</h3>
          <button class="btn-icon btn-sm" id="btn-close-asm-modal">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.9rem; color:var(--text-secondary);">
            Running assembly for recipe: <strong style="color:#38bdf8;">${recipeName}</strong>
          </p>

          <div class="form-group">
            <label class="form-label">Units to Produce:</label>
            <input type="number" id="asm-qty" value="10" min="1" class="form-control" />
          </div>

          <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:0.85rem; border-radius:var(--radius-md); font-size:0.85rem; color:#34d399;">
            ✓ Raw materials will be deducted from inventory automatically.<br/>
            ✓ Finished products will be added to stock.<br/>
            ✓ Double-entry ledger entry will be posted to General Ledger.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-asm">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-asm">Execute & Update Inventory</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('run-asm-modal');
  document.getElementById('btn-close-asm-modal')?.addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-asm')?.addEventListener('click', () => modal.remove());

  document.getElementById('btn-confirm-asm')?.addEventListener('click', async () => {
    const qty = document.getElementById('asm-qty').value;
    try {
      const res = await Api.post('/manufacturing/assemble', {
        bom_recipe_id: recipeId,
        warehouse_id: 1,
        quantity: qty
      });

      if (res.success) {
        showToast(res.message, 'success');
        modal.remove();
        loadManufacturingData();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
