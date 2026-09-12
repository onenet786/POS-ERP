import { getMockStore } from '../config/db.js';
import { LedgerService } from '../services/ledgerService.js';
import { broadcastEvent } from '../server.js';

export async function getRecipes(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, recipes: store.bom_recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getAssemblyOrders(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, orders: store.assembly_orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createAssemblyOrder(req, res) {
  try {
    const { bom_recipe_id, warehouse_id, quantity } = req.body;
    const store = getMockStore();

    const recipe = store.bom_recipes.find(r => r.id === Number(bom_recipe_id));
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'BOM recipe not found' });
    }

    const qty = Number(quantity) || 1;
    let totalCost = 0;

    // Check raw material stock & deduct
    for (const item of recipe.items) {
      const needed = item.required_quantity * qty;
      const rawProd = store.products.find(p => p.id === item.raw_product_id);
      if (rawProd) {
        if (rawProd.stock < needed) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for raw material: ${rawProd.name} (Requires ${needed}, Available ${rawProd.stock})`
          });
        }
        rawProd.stock -= needed;
        totalCost += (item.unit_cost * needed);
      }
    }

    // Increase finished product stock
    const finishedProd = store.products.find(p => p.id === recipe.finished_product_id);
    if (finishedProd) {
      finishedProd.stock += qty;
    }

    const order_number = `ASM-${new Date().getFullYear()}-${String(store.assembly_orders.length + 1).padStart(4, '0')}`;

    const newAssembly = {
      id: store.assembly_orders.length + 1,
      order_number,
      bom_recipe_id: recipe.id,
      finished_product_name: recipe.finished_product_name,
      warehouse_id: Number(warehouse_id) || 1,
      planned_quantity: qty,
      produced_quantity: qty,
      status: 'COMPLETED',
      execution_date: new Date().toISOString().split('T')[0],
      total_production_cost: totalCost
    };

    store.assembly_orders.unshift(newAssembly);

    // Automated Double-Entry Ledger Posting for Manufacturing conversion!
    await LedgerService.postAssemblyOrder(newAssembly);

    broadcastEvent('MANUFACTURING_COMPLETED', {
      order_number,
      product: recipe.finished_product_name,
      quantity: qty
    });

    res.json({
      success: true,
      message: `Successfully assembled ${qty} units of ${recipe.finished_product_name}`,
      assembly: newAssembly
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
